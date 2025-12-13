import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { lessonProgress, lessons, modules, enrollments } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const lessonId = params.id;

    if (!lessonId || isNaN(parseInt(lessonId))) {
      return NextResponse.json(
        { error: 'Valid lesson ID is required', code: 'INVALID_LESSON_ID' },
        { status: 400 }
      );
    }

    const lessonIdInt = parseInt(lessonId);

    // Check if lesson exists
    const lesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonIdInt))
      .limit(1);

    if (lesson.length === 0) {
      return NextResponse.json(
        { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Get progress record for this user and lesson
    const progress = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, user.id),
          eq(lessonProgress.lessonId, lessonIdInt)
        )
      )
      .limit(1);

    // If no progress record exists, return default
    if (progress.length === 0) {
      return NextResponse.json({
        lessonId: lessonIdInt,
        userId: user.id,
        completed: false,
        timeSpentSeconds: 0,
        lastPositionSeconds: 0,
        completedAt: null,
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json(progress[0]);
  } catch (error) {
    console.error('GET lesson progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const lessonId = params.id;

    if (!lessonId || isNaN(parseInt(lessonId))) {
      return NextResponse.json(
        { error: 'Valid lesson ID is required', code: 'INVALID_LESSON_ID' },
        { status: 400 }
      );
    }

    const lessonIdInt = parseInt(lessonId);

    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }

    const { completed, lastPositionSeconds, timeSpentSeconds } = body;

    // Check if lesson exists
    const lesson = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonIdInt))
      .limit(1);

    if (lesson.length === 0) {
      return NextResponse.json(
        { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if progress record exists
    const existingProgress = await db
      .select()
      .from(lessonProgress)
      .where(
        and(
          eq(lessonProgress.userId, user.id),
          eq(lessonProgress.lessonId, lessonIdInt)
        )
      )
      .limit(1);

    let updatedProgress;

    if (existingProgress.length > 0) {
      // Update existing record
      const currentProgress = existingProgress[0];
      const wasCompleted = currentProgress.completed;
      const isNowCompleted = completed !== undefined ? completed : wasCompleted;

      const updateData: {
        completed?: boolean;
        lastPositionSeconds?: number;
        timeSpentSeconds?: number;
        completedAt?: Date | null;
        updatedAt: Date;
      } = {
        updatedAt: new Date(),
      };

      if (completed !== undefined) {
        updateData.completed = completed;
      }

      if (lastPositionSeconds !== undefined) {
        updateData.lastPositionSeconds = lastPositionSeconds;
      }

      if (timeSpentSeconds !== undefined) {
        updateData.timeSpentSeconds = timeSpentSeconds;
      }

      // If completed is set to true and wasn't before, set completedAt
      if (isNowCompleted && !wasCompleted) {
        updateData.completedAt = new Date();
      }

      const updated = await db
        .update(lessonProgress)
        .set(updateData)
        .where(
          and(
            eq(lessonProgress.userId, user.id),
            eq(lessonProgress.lessonId, lessonIdInt)
          )
        )
        .returning();

      updatedProgress = updated[0];
    } else {
      // Insert new progress record
      const insertData = {
        userId: user.id,
        lessonId: lessonIdInt,
        completed: completed ?? false,
        lastPositionSeconds: lastPositionSeconds ?? 0,
        timeSpentSeconds: timeSpentSeconds ?? 0,
        completedAt: completed ? new Date() : null,
        updatedAt: new Date(),
      };

      const inserted = await db
        .insert(lessonProgress)
        .values(insertData)
        .returning();

      updatedProgress = inserted[0];
    }

    // Recalculate course progress percentage
    // Get moduleId from lesson
    const lessonWithModule = await db
      .select({ moduleId: lessons.moduleId })
      .from(lessons)
      .where(eq(lessons.id, lessonIdInt))
      .limit(1);

    if (lessonWithModule.length > 0) {
      const moduleId = lessonWithModule[0].moduleId;

      // Get courseId from module
      const moduleWithCourse = await db
        .select({ courseId: modules.courseId })
        .from(modules)
        .where(eq(modules.id, moduleId))
        .limit(1);

      if (moduleWithCourse.length > 0) {
        const courseId = moduleWithCourse[0].courseId;

        // Get all lessons in this course
        const allCourseLessons = await db
          .select({ id: lessons.id })
          .from(lessons)
          .innerJoin(modules, eq(lessons.moduleId, modules.id))
          .where(eq(modules.courseId, courseId));

        const totalLessons = allCourseLessons.length;

        if (totalLessons > 0) {
          // Count completed lessons for this user in this course
          const completedLessons = await db
            .select({ count: sql<number>`count(*)` })
            .from(lessonProgress)
            .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
            .innerJoin(modules, eq(lessons.moduleId, modules.id))
            .where(
              and(
                eq(lessonProgress.userId, user.id),
                eq(modules.courseId, courseId),
                eq(lessonProgress.completed, true)
              )
            );

          const completedCount = completedLessons[0]?.count ?? 0;

          // Calculate progress percentage
          const progressPercentage = Math.round(
            (completedCount / totalLessons) * 100
          );

          // Update enrollment record
          const enrollmentUpdateData: {
            progressPercentage: number;
            completedAt?: Date;
          } = {
            progressPercentage,
          };

          // If progress is 100%, set completedAt
          if (progressPercentage === 100) {
            enrollmentUpdateData.completedAt = new Date();
          }

          await db
            .update(enrollments)
            .set(enrollmentUpdateData)
            .where(
              and(
                eq(enrollments.userId, user.id),
                eq(enrollments.courseId, courseId)
              )
            );
        }
      }
    }

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error('POST lesson progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}