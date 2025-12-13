import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { lessons, modules, courses, user } from '@/db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const moduleId = searchParams.get('moduleId');

    // Single lesson by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const lesson = await db
        .select()
        .from(lessons)
        .where(eq(lessons.id, parseInt(id)))
        .limit(1);

      if (lesson.length === 0) {
        return NextResponse.json(
          { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
          { status: 404 }
        );
      }

      // Parse attachments JSON
      const lessonData = {
        ...lesson[0],
        attachments: lesson[0].attachments ? JSON.parse(lesson[0].attachments as string) : null
      };

      return NextResponse.json(lessonData, { status: 200 });
    }

    // List lessons - require moduleId
    if (!moduleId) {
      return NextResponse.json(
        { error: 'moduleId is required', code: 'MODULE_ID_REQUIRED' },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(moduleId))) {
      return NextResponse.json(
        { error: 'Valid moduleId is required', code: 'INVALID_MODULE_ID' },
        { status: 400 }
      );
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const lessonsList = await db
      .select()
      .from(lessons)
      .where(eq(lessons.moduleId, parseInt(moduleId)))
      .orderBy(asc(lessons.orderIndex))
      .limit(limit)
      .offset(offset);

    // Parse attachments JSON for each lesson
    const lessonsWithParsedAttachments = lessonsList.map(lesson => ({
      ...lesson,
      attachments: lesson.attachments ? JSON.parse(lesson.attachments as string) : null
    }));

    return NextResponse.json(lessonsWithParsedAttachments, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { moduleId, title, description, videoUrl, notes, attachments, durationMinutes, orderIndex, isFree } = body;

    // Validate required fields
    if (!moduleId || isNaN(parseInt(moduleId))) {
      return NextResponse.json(
        { error: 'Valid moduleId is required', code: 'MODULE_ID_REQUIRED' },
        { status: 400 }
      );
    }

    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'title is required', code: 'TITLE_REQUIRED' },
        { status: 400 }
      );
    }

    if (orderIndex === undefined || orderIndex === null || isNaN(parseInt(orderIndex))) {
      return NextResponse.json(
        { error: 'orderIndex is required', code: 'ORDER_INDEX_REQUIRED' },
        { status: 400 }
      );
    }

    // Check authorization - verify user is instructor of course, admin, or content_admin
    const moduleData = await db
      .select({
        courseId: modules.courseId
      })
      .from(modules)
      .where(eq(modules.id, parseInt(moduleId)))
      .limit(1);

    if (moduleData.length === 0) {
      return NextResponse.json(
        { error: 'Module not found', code: 'MODULE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const courseData = await db
      .select({
        instructorId: courses.instructorId
      })
      .from(courses)
      .where(eq(courses.id, moduleData[0].courseId))
      .limit(1);

    if (courseData.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const isInstructor = courseData[0].instructorId === currentUser.id;
    const isAdmin = currentUser.role === 'admin';
    const isContentAdmin = currentUser.role === 'content_admin';

    if (!isInstructor && !isAdmin && !isContentAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized to create lesson', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    // Prepare lesson data
    const lessonData: any = {
      moduleId: parseInt(moduleId),
      title: title.trim(),
      orderIndex: parseInt(orderIndex),
      isFree: isFree ?? false,
      createdAt: new Date()
    };

    if (description) lessonData.description = description.trim();
    if (videoUrl) lessonData.videoUrl = videoUrl.trim();
    if (notes) lessonData.notes = notes.trim();
    if (attachments) lessonData.attachments = JSON.stringify(attachments);
    if (durationMinutes !== undefined && durationMinutes !== null) {
      lessonData.durationMinutes = parseInt(durationMinutes);
    }

    const newLesson = await db
      .insert(lessons)
      .values(lessonData)
      .returning();

    // Parse attachments for response
    const responseLesson = {
      ...newLesson[0],
      attachments: newLesson[0].attachments ? JSON.parse(newLesson[0].attachments as string) : null
    };

    return NextResponse.json(responseLesson, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, description, videoUrl, notes, attachments, durationMinutes, orderIndex, isFree } = body;

    // Check if lesson exists and get module info for authorization
    const lessonData = await db
      .select({
        id: lessons.id,
        moduleId: lessons.moduleId
      })
      .from(lessons)
      .where(eq(lessons.id, parseInt(id)))
      .limit(1);

    if (lessonData.length === 0) {
      return NextResponse.json(
        { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check authorization - verify user is instructor of course, admin, or content_admin
    const moduleData = await db
      .select({
        courseId: modules.courseId
      })
      .from(modules)
      .where(eq(modules.id, lessonData[0].moduleId))
      .limit(1);

    if (moduleData.length === 0) {
      return NextResponse.json(
        { error: 'Module not found', code: 'MODULE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const courseData = await db
      .select({
        instructorId: courses.instructorId
      })
      .from(courses)
      .where(eq(courses.id, moduleData[0].courseId))
      .limit(1);

    if (courseData.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const isInstructor = courseData[0].instructorId === currentUser.id;
    const isAdmin = currentUser.role === 'admin';
    const isContentAdmin = currentUser.role === 'content_admin';

    if (!isInstructor && !isAdmin && !isContentAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized to update lesson', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData: any = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : null;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl ? videoUrl.trim() : null;
    if (notes !== undefined) updateData.notes = notes ? notes.trim() : null;
    if (attachments !== undefined) updateData.attachments = attachments ? JSON.stringify(attachments) : null;
    if (durationMinutes !== undefined) updateData.durationMinutes = durationMinutes !== null ? parseInt(durationMinutes) : null;
    if (orderIndex !== undefined) updateData.orderIndex = parseInt(orderIndex);
    if (isFree !== undefined) updateData.isFree = isFree;

    const updatedLesson = await db
      .update(lessons)
      .set(updateData)
      .where(eq(lessons.id, parseInt(id)))
      .returning();

    if (updatedLesson.length === 0) {
      return NextResponse.json(
        { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Parse attachments for response
    const responseLesson = {
      ...updatedLesson[0],
      attachments: updatedLesson[0].attachments ? JSON.parse(updatedLesson[0].attachments as string) : null
    };

    return NextResponse.json(responseLesson, { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Only admin and content_admin can delete
    const isAdmin = currentUser.role === 'admin';
    const isContentAdmin = currentUser.role === 'content_admin';

    if (!isAdmin && !isContentAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized to delete lesson. Only admin or content_admin can delete lessons', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    // Check if lesson exists
    const lessonData = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, parseInt(id)))
      .limit(1);

    if (lessonData.length === 0) {
      return NextResponse.json(
        { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deletedLesson = await db
      .delete(lessons)
      .where(eq(lessons.id, parseInt(id)))
      .returning();

    if (deletedLesson.length === 0) {
      return NextResponse.json(
        { error: 'Lesson not found', code: 'LESSON_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Parse attachments for response
    const responseLesson = {
      ...deletedLesson[0],
      attachments: deletedLesson[0].attachments ? JSON.parse(deletedLesson[0].attachments as string) : null
    };

    return NextResponse.json(
      {
        message: 'Lesson deleted successfully',
        lesson: responseLesson
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}