import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { enrollments, courses, user, lessons, modules, lessonProgress } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single enrollment with detailed progress
    if (id) {
      const enrollmentId = parseInt(id);
      if (isNaN(enrollmentId)) {
        return NextResponse.json({ 
          error: 'Valid enrollment ID is required',
          code: 'INVALID_ID' 
        }, { status: 400 });
      }

      // Get enrollment with course details
      const enrollment = await db.select({
        id: enrollments.id,
        userId: enrollments.userId,
        courseId: enrollments.courseId,
        enrolledAt: enrollments.enrolledAt,
        completedAt: enrollments.completedAt,
        progressPercentage: enrollments.progressPercentage,
        lastAccessedLessonId: enrollments.lastAccessedLessonId,
        course: {
          id: courses.id,
          title: courses.title,
          slug: courses.slug,
          description: courses.description,
          instructorId: courses.instructorId,
          category: courses.category,
          level: courses.level,
          price: courses.price,
          thumbnailUrl: courses.thumbnailUrl,
          durationHours: courses.durationHours,
          status: courses.status,
        }
      })
        .from(enrollments)
        .innerJoin(courses, eq(enrollments.courseId, courses.id))
        .where(
          and(
            eq(enrollments.id, enrollmentId),
            eq(enrollments.userId, currentUser.id)
          )
        )
        .limit(1);

      if (enrollment.length === 0) {
        // Check if enrollment exists but belongs to different user (for admin override)
        if (currentUser.role === 'admin' || currentUser.role === 'instructor') {
          const anyEnrollment = await db.select({
            id: enrollments.id,
            userId: enrollments.userId,
            courseId: enrollments.courseId,
            enrolledAt: enrollments.enrolledAt,
            completedAt: enrollments.completedAt,
            progressPercentage: enrollments.progressPercentage,
            lastAccessedLessonId: enrollments.lastAccessedLessonId,
            course: {
              id: courses.id,
              title: courses.title,
              slug: courses.slug,
              description: courses.description,
              instructorId: courses.instructorId,
              category: courses.category,
              level: courses.level,
              price: courses.price,
              thumbnailUrl: courses.thumbnailUrl,
              durationHours: courses.durationHours,
              status: courses.status,
            }
          })
            .from(enrollments)
            .innerJoin(courses, eq(enrollments.courseId, courses.id))
            .where(eq(enrollments.id, enrollmentId))
            .limit(1);

          if (anyEnrollment.length === 0) {
            return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
          }

          // Get progress data
          const courseModules = await db.select()
            .from(modules)
            .where(eq(modules.courseId, anyEnrollment[0].courseId));

          const moduleIds = courseModules.map(m => m.id);
          
          let totalLessons = 0;
          let completedLessons = 0;

          if (moduleIds.length > 0) {
            const courseLessons = await db.select()
              .from(lessons)
              .where(sql`${lessons.moduleId} IN ${moduleIds}`);

            totalLessons = courseLessons.length;

            if (totalLessons > 0) {
              const lessonIds = courseLessons.map(l => l.id);
              const progress = await db.select()
                .from(lessonProgress)
                .where(
                  and(
                    eq(lessonProgress.userId, anyEnrollment[0].userId),
                    sql`${lessonProgress.lessonId} IN ${lessonIds}`,
                    eq(lessonProgress.completed, true)
                  )
                );

              completedLessons = progress.length;
            }
          }

          return NextResponse.json({
            ...anyEnrollment[0],
            progress: {
              totalLessons,
              completedLessons,
              completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
            }
          }, { status: 200 });
        }

        return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
      }

      // Get progress data for the user's enrollment
      const courseModules = await db.select()
        .from(modules)
        .where(eq(modules.courseId, enrollment[0].courseId));

      const moduleIds = courseModules.map(m => m.id);
      
      let totalLessons = 0;
      let completedLessons = 0;

      if (moduleIds.length > 0) {
        const courseLessons = await db.select()
          .from(lessons)
          .where(sql`${lessons.moduleId} IN ${moduleIds}`);

        totalLessons = courseLessons.length;

        if (totalLessons > 0) {
          const lessonIds = courseLessons.map(l => l.id);
          const progress = await db.select()
            .from(lessonProgress)
            .where(
              and(
                eq(lessonProgress.userId, currentUser.id),
                sql`${lessonProgress.lessonId} IN ${lessonIds}`,
                eq(lessonProgress.completed, true)
              )
            );

          completedLessons = progress.length;
        }
      }

      return NextResponse.json({
        ...enrollment[0],
        progress: {
          totalLessons,
          completedLessons,
          completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        }
      }, { status: 200 });
    }

    // List user's enrollments with pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const userEnrollments = await db.select({
      id: enrollments.id,
      enrolledAt: enrollments.enrolledAt,
      completedAt: enrollments.completedAt,
      progressPercentage: enrollments.progressPercentage,
      lastAccessedLessonId: enrollments.lastAccessedLessonId,
      course: {
        id: courses.id,
        title: courses.title,
        slug: courses.slug,
        thumbnailUrl: courses.thumbnailUrl,
        instructorId: courses.instructorId,
        durationHours: courses.durationHours,
      }
    })
      .from(enrollments)
      .innerJoin(courses, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, currentUser.id))
      .orderBy(desc(enrollments.enrolledAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(userEnrollments, { status: 200 });

  } catch (error) {
    console.error('GET enrollments error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { courseId } = body;

    // Validate required field
    if (!courseId) {
      return NextResponse.json({ 
        error: "Course ID is required",
        code: "MISSING_COURSE_ID" 
      }, { status: 400 });
    }

    // Validate courseId is a valid integer
    const parsedCourseId = parseInt(courseId);
    if (isNaN(parsedCourseId)) {
      return NextResponse.json({ 
        error: "Valid course ID is required",
        code: "INVALID_COURSE_ID" 
      }, { status: 400 });
    }

    // Check if course exists and is published
    const course = await db.select()
      .from(courses)
      .where(eq(courses.id, parsedCourseId))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json({ 
        error: "Course not found",
        code: "COURSE_NOT_FOUND" 
      }, { status: 404 });
    }

    if (course[0].status !== 'published') {
      return NextResponse.json({ 
        error: "Course is not available for enrollment",
        code: "COURSE_NOT_PUBLISHED" 
      }, { status: 403 });
    }

    // Check if user is already enrolled
    const existingEnrollment = await db.select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.userId, currentUser.id),
          eq(enrollments.courseId, parsedCourseId)
        )
      )
      .limit(1);

    if (existingEnrollment.length > 0) {
      return NextResponse.json({ 
        error: "You are already enrolled in this course",
        code: "ALREADY_ENROLLED" 
      }, { status: 400 });
    }

    // For now, allow free courses only or skip payment check as per requirements
    // In production, you would check payment status here
    if (course[0].price && course[0].price > 0) {
      // TODO: Implement payment verification
      // For now, we'll allow enrollment for demonstration purposes
    }

    // Create enrollment
    const newEnrollment = await db.insert(enrollments)
      .values({
        userId: currentUser.id,
        courseId: parsedCourseId,
        enrolledAt: new Date(),
        completedAt: null,
        progressPercentage: 0,
        lastAccessedLessonId: null,
      })
      .returning();

    return NextResponse.json(newEnrollment[0], { status: 201 });

  } catch (error) {
    console.error('POST enrollment error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}