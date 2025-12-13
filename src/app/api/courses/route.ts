import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courses, user } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to ensure unique slug
async function ensureUniqueSlug(baseSlug: string, excludeId?: number): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await db.select()
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1);
    
    if (existing.length === 0 || (excludeId && existing[0].id === excludeId)) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// Helper function to check user authorization
async function checkUserAuthorization(userId: string, requiredRoles: string[]): Promise<{ authorized: boolean; userRole?: string }> {
  const userRecord = await db.select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);
  
  if (userRecord.length === 0) {
    return { authorized: false };
  }
  
  const userRole = userRecord[0].role;
  return {
    authorized: requiredRoles.includes(userRole),
    userRole
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Single course by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }
      
      const course = await db.select()
        .from(courses)
        .where(eq(courses.id, parseInt(id)))
        .limit(1);
      
      if (course.length === 0) {
        return NextResponse.json({ 
          error: 'Course not found',
          code: 'COURSE_NOT_FOUND' 
        }, { status: 404 });
      }
      
      return NextResponse.json(course[0], { status: 200 });
    }
    
    // List courses with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    
    let conditions = [eq(courses.status, 'published')];
    
    if (category) {
      conditions.push(eq(courses.category, category));
    }
    
    if (level) {
      if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
        return NextResponse.json({ 
          error: "Invalid level. Must be: beginner, intermediate, or advanced",
          code: "INVALID_LEVEL" 
        }, { status: 400 });
      }
      conditions.push(eq(courses.level, level));
    }
    
    if (search) {
      const searchCondition = or(
        like(courses.title, `%${search}%`),
        like(courses.description, `%${search}%`)
      );
      conditions.push(searchCondition!);
    }
    
    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
    
    const results = await db.select()
      .from(courses)
      .where(whereClause)
      .orderBy(desc(courses.createdAt))
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
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED' 
      }, { status: 401 });
    }
    
    // Check authorization
    const { authorized, userRole } = await checkUserAuthorization(
      currentUser.id, 
      ['admin', 'content_admin', 'instructor']
    );
    
    if (!authorized) {
      return NextResponse.json({ 
        error: 'Insufficient permissions. Only admin, content_admin, or instructor can create courses',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }
    
    const body = await request.json();
    
    // Security check: reject if instructorId provided in body
    if ('instructorId' in body || 'instructor_id' in body) {
      return NextResponse.json({ 
        error: "Instructor ID cannot be provided in request body",
        code: "INSTRUCTOR_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }
    
    const { title, description, category, level, price, thumbnailUrl, videoUrl, durationHours, status } = body;
    
    // Validate required fields
    if (!title) {
      return NextResponse.json({ 
        error: "Title is required",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }
    
    if (!description) {
      return NextResponse.json({ 
        error: "Description is required",
        code: "MISSING_DESCRIPTION" 
      }, { status: 400 });
    }
    
    if (!category) {
      return NextResponse.json({ 
        error: "Category is required",
        code: "MISSING_CATEGORY" 
      }, { status: 400 });
    }
    
    if (!level) {
      return NextResponse.json({ 
        error: "Level is required",
        code: "MISSING_LEVEL" 
      }, { status: 400 });
    }
    
    if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json({ 
        error: "Invalid level. Must be: beginner, intermediate, or advanced",
        code: "INVALID_LEVEL" 
      }, { status: 400 });
    }
    
    if (price === undefined || price === null) {
      return NextResponse.json({ 
        error: "Price is required",
        code: "MISSING_PRICE" 
      }, { status: 400 });
    }
    
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json({ 
        error: "Price must be a positive number (in cents)",
        code: "INVALID_PRICE" 
      }, { status: 400 });
    }
    
    // Validate status if provided
    if (status && !['draft', 'published', 'archived'].includes(status)) {
      return NextResponse.json({ 
        error: "Invalid status. Must be: draft, published, or archived",
        code: "INVALID_STATUS" 
      }, { status: 400 });
    }
    
    // Generate unique slug
    const baseSlug = generateSlug(title);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);
    
    // Create course with instructorId from authenticated user
    const newCourse = await db.insert(courses)
      .values({
        title: title.trim(),
        slug: uniqueSlug,
        description: description.trim(),
        instructorId: currentUser.id,
        category: category.trim(),
        level,
        price,
        thumbnailUrl: thumbnailUrl?.trim() || null,
        videoUrl: videoUrl?.trim() || null,
        durationHours: durationHours || null,
        status: status || 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return NextResponse.json(newCourse[0], { status: 201 });
    
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED' 
      }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    const courseId = parseInt(id);
    
    // Get existing course
    const existingCourse = await db.select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);
    
    if (existingCourse.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found',
        code: 'COURSE_NOT_FOUND' 
      }, { status: 404 });
    }
    
    // Check authorization - must be instructor of the course, admin, or content_admin
    const { userRole } = await checkUserAuthorization(currentUser.id, ['admin', 'content_admin', 'instructor']);
    
    const isInstructor = existingCourse[0].instructorId === currentUser.id;
    const isAuthorized = userRole === 'admin' || userRole === 'content_admin' || isInstructor;
    
    if (!isAuthorized) {
      return NextResponse.json({ 
        error: 'Insufficient permissions. Only the course instructor, admin, or content_admin can update this course',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }
    
    const body = await request.json();
    
    // Security check: reject if instructorId provided in body
    if ('instructorId' in body || 'instructor_id' in body) {
      return NextResponse.json({ 
        error: "Instructor ID cannot be modified",
        code: "INSTRUCTOR_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }
    
    const { title, description, category, level, price, thumbnailUrl, videoUrl, durationHours, status } = body;
    
    // Validate level if provided
    if (level && !['beginner', 'intermediate', 'advanced'].includes(level)) {
      return NextResponse.json({ 
        error: "Invalid level. Must be: beginner, intermediate, or advanced",
        code: "INVALID_LEVEL" 
      }, { status: 400 });
    }
    
    // Validate status if provided
    if (status && !['draft', 'published', 'archived'].includes(status)) {
      return NextResponse.json({ 
        error: "Invalid status. Must be: draft, published, or archived",
        code: "INVALID_STATUS" 
      }, { status: 400 });
    }
    
    // Validate price if provided
    if (price !== undefined && price !== null) {
      if (typeof price !== 'number' || price < 0) {
        return NextResponse.json({ 
          error: "Price must be a positive number (in cents)",
          code: "INVALID_PRICE" 
        }, { status: 400 });
      }
    }
    
    // Build update object
    const updates: any = {
      updatedAt: new Date()
    };
    
    if (title !== undefined) {
      updates.title = title.trim();
      // Regenerate slug if title changed
      const baseSlug = generateSlug(title);
      updates.slug = await ensureUniqueSlug(baseSlug, courseId);
    }
    
    if (description !== undefined) updates.description = description.trim();
    if (category !== undefined) updates.category = category.trim();
    if (level !== undefined) updates.level = level;
    if (price !== undefined) updates.price = price;
    if (thumbnailUrl !== undefined) updates.thumbnailUrl = thumbnailUrl?.trim() || null;
    if (videoUrl !== undefined) updates.videoUrl = videoUrl?.trim() || null;
    if (durationHours !== undefined) updates.durationHours = durationHours || null;
    if (status !== undefined) updates.status = status;
    
    const updatedCourse = await db.update(courses)
      .set(updates)
      .where(eq(courses.id, courseId))
      .returning();
    
    return NextResponse.json(updatedCourse[0], { status: 200 });
    
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED' 
      }, { status: 401 });
    }
    
    // Check authorization - only admin or content_admin can delete
    const { authorized } = await checkUserAuthorization(
      currentUser.id, 
      ['admin', 'content_admin']
    );
    
    if (!authorized) {
      return NextResponse.json({ 
        error: 'Insufficient permissions. Only admin or content_admin can delete courses',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }
    
    const courseId = parseInt(id);
    
    // Check if course exists
    const existingCourse = await db.select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);
    
    if (existingCourse.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found',
        code: 'COURSE_NOT_FOUND' 
      }, { status: 404 });
    }
    
    // Delete course (cascade will handle related records)
    const deletedCourse = await db.delete(courses)
      .where(eq(courses.id, courseId))
      .returning();
    
    return NextResponse.json({
      message: 'Course deleted successfully',
      course: deletedCourse[0]
    }, { status: 200 });
    
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}