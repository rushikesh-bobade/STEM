import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { submissions, assignments, lessons, modules, courses, user } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    // Get and validate submission ID
    const { id } = await params;
    const submissionId = parseInt(id);
    if (isNaN(submissionId)) {
      return NextResponse.json(
        { error: 'Valid submission ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Get request body
    const body = await request.json();
    const { score, feedback, status } = body;

    // Validate required fields
    if (score === undefined || score === null) {
      return NextResponse.json(
        { error: 'Score is required', code: 'MISSING_SCORE' },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required', code: 'MISSING_STATUS' },
        { status: 400 }
      );
    }

    // Validate score is numeric
    const numericScore = parseInt(score);
    if (isNaN(numericScore)) {
      return NextResponse.json(
        { error: 'Score must be a valid number', code: 'INVALID_SCORE_FORMAT' },
        { status: 400 }
      );
    }

    // Validate status
    if (status !== 'graded' && status !== 'resubmit') {
      return NextResponse.json(
        { error: 'Status must be either "graded" or "resubmit"', code: 'INVALID_STATUS' },
        { status: 400 }
      );
    }

    // Check if submission exists and get assignment details
    const submissionData = await db
      .select({
        submission: submissions,
        assignment: assignments,
        lesson: lessons,
        module: modules,
        course: courses,
      })
      .from(submissions)
      .innerJoin(assignments, eq(submissions.assignmentId, assignments.id))
      .innerJoin(lessons, eq(assignments.lessonId, lessons.id))
      .innerJoin(modules, eq(lessons.moduleId, modules.id))
      .innerJoin(courses, eq(modules.courseId, courses.id))
      .where(eq(submissions.id, submissionId))
      .limit(1);

    if (submissionData.length === 0) {
      return NextResponse.json(
        { error: 'Submission not found', code: 'SUBMISSION_NOT_FOUND' },
        { status: 404 }
      );
    }

    const { assignment, course } = submissionData[0];

    // Validate score is within range (0 to maxScore)
    if (numericScore < 0) {
      return NextResponse.json(
        { error: 'Score cannot be negative', code: 'SCORE_OUT_OF_RANGE' },
        { status: 400 }
      );
    }

    if (assignment.maxScore && numericScore > assignment.maxScore) {
      return NextResponse.json(
        { 
          error: `Score cannot exceed maximum score of ${assignment.maxScore}`, 
          code: 'SCORE_EXCEEDS_MAX' 
        },
        { status: 400 }
      );
    }

    // Get current user's role
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.id, currentUser.id))
      .limit(1);

    if (userData.length === 0) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const userRole = userData[0].role;

    // Authorization check
    const allowedRoles = ['admin', 'content_admin', 'instructor'];
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { error: 'Only instructors, admins, and content admins can grade submissions', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    // If user is an instructor, verify they teach this course
    if (userRole === 'instructor') {
      if (course.instructorId !== currentUser.id) {
        return NextResponse.json(
          { error: 'You are not authorized to grade submissions for this course', code: 'INSTRUCTOR_NOT_AUTHORIZED' },
          { status: 403 }
        );
      }
    }

    // Update submission
    const updated = await db
      .update(submissions)
      .set({
        score: numericScore,
        feedback: feedback || null,
        status,
        gradedAt: new Date(),
      })
      .where(eq(submissions.id, submissionId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update submission', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}