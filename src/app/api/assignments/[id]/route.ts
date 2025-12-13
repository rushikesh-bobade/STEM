import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { assignments, submissions, lessons, user } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid assignment ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const assignmentId = parseInt(id);

    // Get assignment with lesson details
    const assignmentResult = await db
      .select({
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
      })
      .from(assignments)
      .innerJoin(lessons, eq(assignments.lessonId, lessons.id))
      .where(eq(assignments.id, assignmentId))
      .limit(1);

    if (assignmentResult.length === 0) {
      return NextResponse.json(
        { error: 'Assignment not found', code: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    const assignment = assignmentResult[0];

    // Determine if user is instructor/admin
    const isInstructorOrAdmin = currentUser.role === 'instructor' || currentUser.role === 'admin';

    // Get submissions based on user role
    let submissionsResult;

    if (isInstructorOrAdmin) {
      // Instructors/admins see all submissions
      submissionsResult = await db
        .select({
          id: submissions.id,
          assignmentId: submissions.assignmentId,
          userId: submissions.userId,
          fileUrl: submissions.fileUrl,
          notes: submissions.notes,
          score: submissions.score,
          feedback: submissions.feedback,
          status: submissions.status,
          submittedAt: submissions.submittedAt,
          gradedAt: submissions.gradedAt,
          student: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })
        .from(submissions)
        .innerJoin(user, eq(submissions.userId, user.id))
        .where(eq(submissions.assignmentId, assignmentId));
    } else {
      // Students only see their own submission
      submissionsResult = await db
        .select({
          id: submissions.id,
          assignmentId: submissions.assignmentId,
          userId: submissions.userId,
          fileUrl: submissions.fileUrl,
          notes: submissions.notes,
          score: submissions.score,
          feedback: submissions.feedback,
          status: submissions.status,
          submittedAt: submissions.submittedAt,
          gradedAt: submissions.gradedAt,
          student: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        })
        .from(submissions)
        .innerJoin(user, eq(submissions.userId, user.id))
        .where(
          and(
            eq(submissions.assignmentId, assignmentId),
            eq(submissions.userId, currentUser.id)
          )
        );
    }

    const response = {
      id: assignment.id,
      lessonId: assignment.lessonId,
      title: assignment.title,
      description: assignment.description,
      dueDate: assignment.dueDate,
      maxScore: assignment.maxScore,
      createdAt: assignment.createdAt,
      lesson: assignment.lesson,
      submissions: submissionsResult,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('GET assignment error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}