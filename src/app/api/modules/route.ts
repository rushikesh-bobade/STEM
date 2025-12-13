import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { modules, courses, user } from '@/db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const courseId = searchParams.get('courseId');

    // Single module by ID
    if (id) {
      const moduleId = parseInt(id);
      if (isNaN(moduleId)) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const module = await db
        .select()
        .from(modules)
        .where(eq(modules.id, moduleId))
        .limit(1);

      if (module.length === 0) {
        return NextResponse.json(
          { error: 'Module not found', code: 'MODULE_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(module[0], { status: 200 });
    }

    // List modules by course ID
    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId query parameter is required', code: 'COURSE_ID_REQUIRED' },
        { status: 400 }
      );
    }

    const courseIdInt = parseInt(courseId);
    if (isNaN(courseIdInt)) {
      return NextResponse.json(
        { error: 'Valid courseId is required', code: 'INVALID_COURSE_ID' },
        { status: 400 }
      );
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const results = await db
      .select()
      .from(modules)
      .where(eq(modules.courseId, courseIdInt))
      .orderBy(asc(modules.orderIndex))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
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
    const { courseId, title, description, orderIndex } = body;

    // Validate required fields
    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId is required', code: 'MISSING_COURSE_ID' },
        { status: 400 }
      );
    }

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'title is required and must be a non-empty string', code: 'MISSING_TITLE' },
        { status: 400 }
      );
    }

    if (orderIndex === undefined || orderIndex === null) {
      return NextResponse.json(
        { error: 'orderIndex is required', code: 'MISSING_ORDER_INDEX' },
        { status: 400 }
      );
    }

    const courseIdInt = parseInt(courseId);
    const orderIndexInt = parseInt(orderIndex);

    if (isNaN(courseIdInt)) {
      return NextResponse.json(
        { error: 'Valid courseId is required', code: 'INVALID_COURSE_ID' },
        { status: 400 }
      );
    }

    if (isNaN(orderIndexInt)) {
      return NextResponse.json(
        { error: 'Valid orderIndex is required', code: 'INVALID_ORDER_INDEX' },
        { status: 400 }
      );
    }

    // Check if course exists
    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseIdInt))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json(
        { error: 'Course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check authorization: user must be instructor of the course or admin/content_admin
    const isInstructor = course[0].instructorId === currentUser.id;
    const isAdmin = currentUser.role === 'admin' || currentUser.role === 'content_admin';

    if (!isInstructor && !isAdmin) {
      return NextResponse.json(
        { error: 'You are not authorized to create modules for this course', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    // Create module
    const newModule = await db
      .insert(modules)
      .values({
        courseId: courseIdInt,
        title: title.trim(),
        description: description ? description.trim() : null,
        orderIndex: orderIndexInt,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json(newModule[0], { status: 201 });
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

    const moduleId = parseInt(id);

    // Check if module exists
    const existingModule = await db
      .select()
      .from(modules)
      .where(eq(modules.id, moduleId))
      .limit(1);

    if (existingModule.length === 0) {
      return NextResponse.json(
        { error: 'Module not found', code: 'MODULE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Get course to check authorization
    const course = await db
      .select()
      .from(courses)
      .where(eq(courses.id, existingModule[0].courseId))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json(
        { error: 'Associated course not found', code: 'COURSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check authorization: user must be instructor of the course or admin/content_admin
    const isInstructor = course[0].instructorId === currentUser.id;
    const isAdmin = currentUser.role === 'admin' || currentUser.role === 'content_admin';

    if (!isInstructor && !isAdmin) {
      return NextResponse.json(
        { error: 'You are not authorized to update this module', code: 'UNAUTHORIZED' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, description, orderIndex } = body;

    // Build update object with only provided fields
    const updates: Partial<{
      title: string;
      description: string | null;
      orderIndex: number;
    }> = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return NextResponse.json(
          { error: 'title must be a non-empty string', code: 'INVALID_TITLE' },
          { status: 400 }
        );
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      updates.description = description ? description.trim() : null;
    }

    if (orderIndex !== undefined) {
      const orderIndexInt = parseInt(orderIndex);
      if (isNaN(orderIndexInt)) {
        return NextResponse.json(
          { error: 'Valid orderIndex is required', code: 'INVALID_ORDER_INDEX' },
          { status: 400 }
        );
      }
      updates.orderIndex = orderIndexInt;
    }

    // Update module
    const updatedModule = await db
      .update(modules)
      .set(updates)
      .where(eq(modules.id, moduleId))
      .returning();

    return NextResponse.json(updatedModule[0], { status: 200 });
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

    // Only admin and content_admin can delete modules
    if (currentUser.role !== 'admin' && currentUser.role !== 'content_admin') {
      return NextResponse.json(
        { error: 'You are not authorized to delete modules', code: 'UNAUTHORIZED' },
        { status: 403 }
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

    const moduleId = parseInt(id);

    // Check if module exists
    const existingModule = await db
      .select()
      .from(modules)
      .where(eq(modules.id, moduleId))
      .limit(1);

    if (existingModule.length === 0) {
      return NextResponse.json(
        { error: 'Module not found', code: 'MODULE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Delete module (cascade will delete related lessons)
    const deleted = await db
      .delete(modules)
      .where(eq(modules.id, moduleId))
      .returning();

    return NextResponse.json(
      {
        message: 'Module deleted successfully',
        module: deleted[0],
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