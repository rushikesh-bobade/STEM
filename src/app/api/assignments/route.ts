import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { assignments, lessons, modules, courses, enrollments } from '@/db/schema';
import { eq, and, desc, asc, inArray } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const lessonId = searchParams.get('lessonId');
    const courseId = searchParams.get('courseId');
    const userId = searchParams.get('userId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Single assignment by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const assignment = await db.select({
        id: assignments.id,
        lessonId: assignments.lessonId,
        title: assignments.title,
        description: assignments.description,
        dueDate: assignments.dueDate,
        maxScore: assignments.maxScore,
        createdAt: assignments.createdAt,
        lesson: {
          id: lessons.id,
          title: lessons.title,
          moduleId: lessons.moduleId,
        }
      })
        .from(assignments)
        .leftJoin(lessons, eq(assignments.lessonId, lessons.id))
        .where(eq(assignments.id, parseInt(id)))
        .limit(1);

      if (assignment.length === 0) {
        return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
      }

      return NextResponse.json(assignment[0], { status: 200 });
    }

    // List assignments with filters
    let query = db.select({
      id: assignments.id,
      lessonId: assignments.lessonId,
      title: assignments.title,
      description: assignments.description,
      dueDate: assignments.dueDate,
      maxScore: assignments.maxScore,
      createdAt: assignments.createdAt,
      lesson: {
        id: lessons.id,
        title: lessons.title,
        moduleId: lessons.moduleId,
      },
      module: {
        id: modules.id,
        courseId: modules.courseId,
      },
      course: {
        id: courses.id,
        title: courses.title,
      }
    })
      .from(assignments)
      .leftJoin(lessons, eq(assignments.lessonId, lessons.id))
      .leftJoin(modules, eq(lessons.moduleId, modules.id))
      .leftJoin(courses, eq(modules.courseId, courses.id))
      .$dynamic();

    // Filter by lessonId
    if (lessonId) {
      query = query.where(eq(assignments.lessonId, parseInt(lessonId)));
    }

    // Filter by courseId
    if (courseId) {
      const modulesInCourse = await db.select({ id: modules.id })
        .from(modules)
        .where(eq(modules.courseId, parseInt(courseId)));

      if (modulesInCourse.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const lessonsInModules = await db.select({ id: lessons.id })
        .from(lessons)
        .where(inArray(lessons.moduleId, modulesInCourse.map(m => m.id)));

      if (lessonsInModules.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      query = query.where(inArray(assignments.lessonId, lessonsInModules.map(l => l.id)));
    }

    // Filter by userId (enrolled courses)
    if (userId) {
      const userEnrollments = await db.select({ courseId: enrollments.courseId })
        .from(enrollments)
        .where(eq(enrollments.userId, userId));

      if (userEnrollments.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const enrolledCourseIds = userEnrollments.map(e => e.courseId);
      const modulesInEnrolledCourses = await db.select({ id: modules.id })
        .from(modules)
        .where(inArray(modules.courseId, enrolledCourseIds));

      if (modulesInEnrolledCourses.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const lessonsInEnrolledModules = await db.select({ id: lessons.id })
        .from(lessons)
        .where(inArray(lessons.moduleId, modulesInEnrolledCourses.map(m => m.id)));

      if (lessonsInEnrolledModules.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      query = query.where(inArray(assignments.lessonId, lessonsInEnrolledModules.map(l => l.id)));
    }

    const results = await query
      .orderBy(asc(assignments.dueDate))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, title, description, dueDate, maxScore } = body;

    // Validate required fields
    if (!lessonId) {
      return NextResponse.json({ 
        error: "Lesson ID is required",
        code: "MISSING_LESSON_ID" 
      }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    // Verify lesson exists and get course info
    const lesson = await db.select({
      id: lessons.id,
      moduleId: lessons.moduleId,
    })
      .from(lessons)
      .where(eq(lessons.id, parseInt(lessonId)))
      .limit(1);

    if (lesson.length === 0) {
      return NextResponse.json({ 
        error: 'Lesson not found',
        code: 'LESSON_NOT_FOUND' 
      }, { status: 404 });
    }

    // Get module to find courseId
    const module = await db.select({
      id: modules.id,
      courseId: modules.courseId,
    })
      .from(modules)
      .where(eq(modules.id, lesson[0].moduleId))
      .limit(1);

    if (module.length === 0) {
      return NextResponse.json({ 
        error: 'Module not found',
        code: 'MODULE_NOT_FOUND' 
      }, { status: 404 });
    }

    // Get course to check authorization
    const course = await db.select({
      id: courses.id,
      instructorId: courses.instructorId,
    })
      .from(courses)
      .where(eq(courses.id, module[0].courseId))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found',
        code: 'COURSE_NOT_FOUND' 
      }, { status: 404 });
    }

    // Check authorization: admin, content_admin, or course instructor
    const isAdmin = user.role === 'admin' || user.role === 'content_admin';
    const isInstructor = course[0].instructorId === user.id;

    if (!isAdmin && !isInstructor) {
      return NextResponse.json({ 
        error: 'Unauthorized to create assignments for this course',
        code: 'UNAUTHORIZED' 
      }, { status: 403 });
    }

    // Create assignment
    const newAssignment = await db.insert(assignments)
      .values({
        lessonId: parseInt(lessonId),
        title: title.trim(),
        description: description?.trim() || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        maxScore: maxScore ? parseInt(maxScore) : null,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json(newAssignment[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Get existing assignment
    const existingAssignment = await db.select({
      id: assignments.id,
      lessonId: assignments.lessonId,
    })
      .from(assignments)
      .where(eq(assignments.id, parseInt(id)))
      .limit(1);

    if (existingAssignment.length === 0) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    // Get lesson and module to find course
    const lesson = await db.select({
      id: lessons.id,
      moduleId: lessons.moduleId,
    })
      .from(lessons)
      .where(eq(lessons.id, existingAssignment[0].lessonId))
      .limit(1);

    if (lesson.length === 0) {
      return NextResponse.json({ 
        error: 'Lesson not found',
        code: 'LESSON_NOT_FOUND' 
      }, { status: 404 });
    }

    const module = await db.select({
      id: modules.id,
      courseId: modules.courseId,
    })
      .from(modules)
      .where(eq(modules.id, lesson[0].moduleId))
      .limit(1);

    if (module.length === 0) {
      return NextResponse.json({ 
        error: 'Module not found',
        code: 'MODULE_NOT_FOUND' 
      }, { status: 404 });
    }

    const course = await db.select({
      id: courses.id,
      instructorId: courses.instructorId,
    })
      .from(courses)
      .where(eq(courses.id, module[0].courseId))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found',
        code: 'COURSE_NOT_FOUND' 
      }, { status: 404 });
    }

    // Check authorization
    const isAdmin = user.role === 'admin' || user.role === 'content_admin';
    const isInstructor = course[0].instructorId === user.id;

    if (!isAdmin && !isInstructor) {
      return NextResponse.json({ 
        error: 'Unauthorized to update this assignment',
        code: 'UNAUTHORIZED' 
      }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, dueDate, maxScore } = body;

    const updates: any = {};

    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description?.trim() || null;
    if (dueDate !== undefined) updates.dueDate = dueDate ? new Date(dueDate) : null;
    if (maxScore !== undefined) updates.maxScore = maxScore ? parseInt(maxScore) : null;

    const updatedAssignment = await db.update(assignments)
      .set(updates)
      .where(eq(assignments.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedAssignment[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check authorization: only admin or content_admin can delete
    const isAdmin = user.role === 'admin' || user.role === 'content_admin';

    if (!isAdmin) {
      return NextResponse.json({ 
        error: 'Unauthorized to delete assignments',
        code: 'UNAUTHORIZED' 
      }, { status: 403 });
    }

    // Check if assignment exists
    const existingAssignment = await db.select()
      .from(assignments)
      .where(eq(assignments.id, parseInt(id)))
      .limit(1);

    if (existingAssignment.length === 0) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    const deleted = await db.delete(assignments)
      .where(eq(assignments.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: 'Assignment deleted successfully',
      deleted: deleted[0] 
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}