import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const VALID_ROLES = ['student', 'instructor', 'content_admin', 'admin'] as const;
type UserRole = typeof VALID_ROLES[number];

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestingUser = await getCurrentUser(request);
    if (!requestingUser) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    if (requestingUser.role !== 'admin') {
      return NextResponse.json(
        { 
          error: 'Only administrators can change user roles',
          code: 'INSUFFICIENT_PERMISSIONS' 
        },
        { status: 403 }
      );
    }

    const targetUserId = params.id;
    if (!targetUserId || targetUserId.trim() === '') {
      return NextResponse.json(
        { error: 'Valid user ID is required', code: 'INVALID_USER_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { role } = body;

    if (!role) {
      return NextResponse.json(
        { error: 'Role is required', code: 'MISSING_ROLE' },
        { status: 400 }
      );
    }

    if (!VALID_ROLES.includes(role as UserRole)) {
      return NextResponse.json(
        { 
          error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}`,
          code: 'INVALID_ROLE' 
        },
        { status: 400 }
      );
    }

    if (targetUserId === requestingUser.id) {
      return NextResponse.json(
        { 
          error: 'Cannot change your own role',
          code: 'SELF_ROLE_CHANGE_FORBIDDEN' 
        },
        { status: 403 }
      );
    }

    const targetUser = await db.select()
      .from(user)
      .where(eq(user.id, targetUserId))
      .limit(1);

    if (targetUser.length === 0) {
      return NextResponse.json(
        { error: 'Target user not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    const updatedUser = await db.update(user)
      .set({
        role: role,
        updatedAt: new Date()
      })
      .where(eq(user.id, targetUserId))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update user role', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedUser[0], { status: 200 });

  } catch (error) {
    console.error('PUT /api/admin/users/[id]/role error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}