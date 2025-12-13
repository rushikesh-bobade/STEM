import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, enrollments, courses } from '@/db/schema';
import { eq, like, or, desc, and, sql } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED' 
      }, { status: 401 });
    }

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ 
        error: 'Access denied. Admin role required.',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single user details with statistics
    if (id) {
      const userData = await db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
        .from(user)
        .where(eq(user.id, id))
        .limit(1);

      if (userData.length === 0) {
        return NextResponse.json({ 
          error: 'User not found',
          code: 'USER_NOT_FOUND' 
        }, { status: 404 });
      }

      // Get enrollment count
      const enrollmentCount = await db.select({ count: sql<number>`count(*)` })
        .from(enrollments)
        .where(eq(enrollments.userId, id));

      // Get course creation count
      const courseCount = await db.select({ count: sql<number>`count(*)` })
        .from(courses)
        .where(eq(courses.instructorId, id));

      return NextResponse.json({
        ...userData[0],
        statistics: {
          enrollmentCount: Number(enrollmentCount[0]?.count || 0),
          courseCount: Number(courseCount[0]?.count || 0),
        }
      }, { status: 200 });
    }

    // List users with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const roleFilter = searchParams.get('role');
    const search = searchParams.get('search');

    let query = db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }).from(user);

    const conditions = [];

    // Role filter
    if (roleFilter && ['student', 'admin', 'content_admin', 'instructor'].includes(roleFilter)) {
      conditions.push(eq(user.role, roleFilter));
    }

    // Search filter
    if (search) {
      const searchTerm = `%${search}%`;
      conditions.push(
        or(
          like(user.name, searchTerm),
          like(user.email, searchTerm)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const users = await query
      .orderBy(desc(user.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}