import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { submissions, assignments, user, lessons, modules, courses } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const assignmentId = searchParams.get('assignmentId');
    const filterUserId = searchParams.get('userId');
    const status = searchParams.get('status');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Get current user's role
    const userRecord = await db.select()
      .from(user)
      .where(eq(user.id, currentUser.id))
      .limit(1);

    if (userRecord.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userRole = userRecord[0].role;

    // Build base query conditions based on role
    let conditions = [];

    if (userRole === 'student') {
      // Students only see their own submissions
      conditions.push(eq(submissions.userId, currentUser.id));
    } else if (userRole === 'instructor') {
      // Instructors see submissions for courses they teach
      // We need to join through assignments -> lessons -> modules -> courses
      const instructorCourses = await db.select({ courseId: courses.id })
        .from(courses)
        .where(eq(courses.instructorId, currentUser.id));

      if (instructorCourses.length === 0) {
        // Instructor has no courses, return empty array
        return NextResponse.json([]);
      }

      const courseIds = instructorCourses.map(c => c.courseId);

      // Get all assignments for instructor's courses
      const instructorAssignments = await db.select({ assignmentId: assignments.id })
        .from(assignments)
        .innerJoin(lessons, eq(assignments.lessonId, lessons.id))
        .innerJoin(modules, eq(lessons.moduleId, modules.id))
        .where(sql`${modules.courseId} IN ${courseIds}`);

      if (instructorAssignments.length === 0) {
        return NextResponse.json([]);
      }

      const assignmentIds = instructorAssignments.map(a => a.assignmentId);
      conditions.push(sql`${submissions.assignmentId} IN ${assignmentIds}`);
    }
    // For admin and content_admin roles, no base conditions (see all submissions)

    // Apply additional filters
    if (assignmentId) {
      const assignmentIdInt = parseInt(assignmentId);
      if (isNaN(assignmentIdInt)) {
        return NextResponse.json({ 
          error: 'Invalid assignmentId',
          code: 'INVALID_ASSIGNMENT_ID' 
        }, { status: 400 });
      }
      conditions.push(eq(submissions.assignmentId, assignmentIdInt));
    }

    if (filterUserId) {
      // Only instructors and admins can filter by userId
      if (userRole === 'student') {
        return NextResponse.json({ 
          error: 'Students cannot filter by userId',
          code: 'UNAUTHORIZED_FILTER' 
        }, { status: 403 });
      }
      conditions.push(eq(submissions.userId, filterUserId));
    }

    if (status) {
      if (!['pending', 'graded', 'resubmit'].includes(status)) {
        return NextResponse.json({ 
          error: 'Invalid status. Must be: pending, graded, or resubmit',
          code: 'INVALID_STATUS' 
        }, { status: 400 });
      }
      conditions.push(eq(submissions.status, status));
    }

    // Build the query
    let query = db.select({
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
      // Assignment details
      assignmentTitle: assignments.title,
      assignmentDescription: assignments.description,
      assignmentDueDate: assignments.dueDate,
      assignmentMaxScore: assignments.maxScore,
      // Student info
      studentName: user.name,
      studentEmail: user.email,
      // Course context
      lessonTitle: lessons.title,
      moduleTitle: modules.title,
      courseTitle: courses.title,
    })
      .from(submissions)
      .innerJoin(assignments, eq(submissions.assignmentId, assignments.id))
      .innerJoin(user, eq(submissions.userId, user.id))
      .innerJoin(lessons, eq(assignments.lessonId, lessons.id))
      .innerJoin(modules, eq(lessons.moduleId, modules.id))
      .innerJoin(courses, eq(modules.courseId, courses.id));

    // Apply conditions
    if (conditions.length > 0) {
      query = query.where(conditions.length === 1 ? conditions[0] : and(...conditions));
    }

    // Apply ordering and pagination
    const results = await query
      .orderBy(desc(submissions.submittedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET submissions error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}