import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTH_REQUIRED' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Validate ID format
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const cartItemId = parseInt(id);

    // Check if cart item exists and belongs to user
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.id, cartItemId))
      .limit(1);

    if (existingItem.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found', code: 'CART_ITEM_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Authorization check - verify ownership
    if (existingItem[0].userId !== user.id) {
      return NextResponse.json(
        { 
          error: 'You do not have permission to delete this cart item',
          code: 'FORBIDDEN'
        },
        { status: 403 }
      );
    }

    // Delete the cart item (user-scoped)
    const deleted = await db
      .delete(cartItems)
      .where(and(eq(cartItems.id, cartItemId), eq(cartItems.userId, user.id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete cart item', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Cart item removed successfully',
      item: deleted[0]
    });

  } catch (error) {
    console.error('DELETE cart item error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}