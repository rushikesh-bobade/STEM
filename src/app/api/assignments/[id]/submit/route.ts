import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { submissions, assignments, lessons, modules, courses, enrollments } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const assignmentId = params.id;
    if (!assignmentId || isNaN(parseInt(assignmentId))) {
      return NextResponse.json(
        { error: 'Valid assignment ID is required', code: 'INVALID_ASSIGNMENT_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { fileUrl, notes } = body;

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED'
        },
        { status: 400 }
      );
    }

    // Validate fileUrl is provided
    if (!fileUrl || typeof fileUrl !== 'string' || fileUrl.trim().length === 0) {
      return NextResponse.json(
        { error: 'File URL is required', code: 'MISSING_FILE_URL' },
        { status: 400 }
      );
    }

    // Validate assignment exists
    const assignment = await db
      .select()
      .from(assignments)
      .where(eq(assignments.id, parseInt(assignmentId)))
      .limit(1);

    if (assignment.length === 0) {
      return NextResponse.json(
        { error: 'Assignment not found', code: 'ASSIGNMENT_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Get the course this assignment belongs to (via lesson -> module -> course)
    const lessonData = await db
      .select({
        courseId: courses.id,
      })
      .from(lessons)
      .innerJoin(modules, eq(lessons.moduleId, modules.id))
      .innerJoin(courses, eq(modules.courseId, courses.id))
      .where(eq(lessons.id, assignment[0].lessonId))
      .limit(1);

    if (lessonData.length === 0) {
      return NextResponse.json(
        { error: 'Course not found for this assignment', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const courseId = lessonData[0].courseId;

    // Verify user is enrolled in the course
    const enrollment = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.userId, user.id),
          eq(enrollments.courseId, courseId)
        )
      )
      .limit(1);

    if (enrollment.length === 0) {
      return NextResponse.json(
        {
          error: 'You must be enrolled in this course to submit assignments',
          code: 'NOT_ENROLLED'
        },
        { status: 403 }
      );
    }

    // Check if user already has a submission for this assignment
    const existingSubmission = await db
      .select()
      .from(submissions)
      .where(
        and(
          eq(submissions.assignmentId, parseInt(assignmentId)),
          eq(submissions.userId, user.id)
        )
      )
      .limit(1);

    // If submission exists
    if (existingSubmission.length > 0) {
      const currentStatus = existingSubmission[0].status;

      // Prevent resubmission if already graded (unless marked for resubmission)
      if (currentStatus === 'graded') {
        return NextResponse.json(
          {
            error: 'Assignment has already been graded. Resubmission not allowed.',
            code: 'ALREADY_GRADED'
          },
          { status: 403 }
        );
      }

      // Allow update if status is 'pending' or 'resubmit'
      if (currentStatus === 'pending' || currentStatus === 'resubmit') {
        const updated = await db
          .update(submissions)
          .set({
            fileUrl: fileUrl.trim(),
            notes: notes ? notes.trim() : null,
            submittedAt: new Date(),
            status: 'pending',
            score: null,
            feedback: null,
            gradedAt: null,
          })
          .where(eq(submissions.id, existingSubmission[0].id))
          .returning();

        return NextResponse.json(updated[0], { status: 200 });
      }
    }

    // Create new submission
    const newSubmission = await db
      .insert(submissions)
      .values({
        assignmentId: parseInt(assignmentId),
        userId: user.id,
        fileUrl: fileUrl.trim(),
        notes: notes ? notes.trim() : null,
        submittedAt: new Date(),
        status: 'pending',
        score: null,
        feedback: null,
        gradedAt: null,
      })
      .returning();

    return NextResponse.json(newSubmission[0], { status: 201 });
  } catch (error) {
    console.error('POST submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}