import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses, modules, lessons, user } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid course ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    const courseId = parseInt(id);

    // Fetch course by ID
    const courseResult = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (courseResult.length === 0) {
      return NextResponse.json(
        { 
          error: 'Course not found',
          code: 'COURSE_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    const course = courseResult[0];

    // Fetch instructor details
    let instructor = null;
    if (course.instructorId) {
      const instructorResult = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email
        })
        .from(user)
        .where(eq(user.id, course.instructorId))
        .limit(1);

      if (instructorResult.length > 0) {
        instructor = instructorResult[0];
      }
    }

    // Fetch all modules for this course, ordered by orderIndex
    const courseModules = await db
      .select()
      .from(modules)
      .where(eq(modules.courseId, courseId))
      .orderBy(asc(modules.orderIndex));

    // For each module, fetch all lessons ordered by orderIndex
    const modulesWithLessons = await Promise.all(
      courseModules.map(async (module) => {
        const moduleLessons = await db
          .select()
          .from(lessons)
          .where(eq(lessons.moduleId, module.id))
          .orderBy(asc(lessons.orderIndex));

        return {
          ...module,
          lessons: moduleLessons
        };
      })
    );

    // Construct the nested response
    const response = {
      ...course,
      instructor,
      modules: modulesWithLessons
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('GET course with modules error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}