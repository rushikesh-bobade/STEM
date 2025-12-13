import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cartItems, courses, products } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { itemType, itemId, quantity } = body;

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    // Validate required fields
    if (!itemType) {
      return NextResponse.json({ 
        error: "itemType is required",
        code: "MISSING_ITEM_TYPE" 
      }, { status: 400 });
    }

    if (!itemId) {
      return NextResponse.json({ 
        error: "itemId is required",
        code: "MISSING_ITEM_ID" 
      }, { status: 400 });
    }

    // Validate itemId is a valid integer
    const parsedItemId = parseInt(itemId);
    if (isNaN(parsedItemId)) {
      return NextResponse.json({ 
        error: "itemId must be a valid integer",
        code: "INVALID_ITEM_ID" 
      }, { status: 400 });
    }

    // Validate quantity is a positive integer
    const parsedQuantity = quantity !== undefined ? parseInt(quantity) : 1;
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      return NextResponse.json({ 
        error: "quantity must be a positive integer",
        code: "INVALID_QUANTITY" 
      }, { status: 400 });
    }

    // Check if item already exists in user's cart
    const existingItem = await db.select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, user.id),
          eq(cartItems.itemType, itemType),
          eq(cartItems.itemId, parsedItemId)
        )
      )
      .limit(1);

    if (existingItem.length > 0) {
      // Update existing cart item by adding quantity
      const updatedQuantity = existingItem[0].quantity + parsedQuantity;
      const updated = await db.update(cartItems)
        .set({
          quantity: updatedQuantity
        })
        .where(
          and(
            eq(cartItems.id, existingItem[0].id),
            eq(cartItems.userId, user.id)
          )
        )
        .returning();

      return NextResponse.json(updated[0], { status: 200 });
    } else {
      // Create new cart item
      const newItem = await db.insert(cartItems)
        .values({
          userId: user.id,
          itemType,
          itemId: parsedItemId,
          quantity: parsedQuantity,
          addedAt: new Date()
        })
        .returning();

      return NextResponse.json(newItem[0], { status: 201 });
    }
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get all cart items for the user
    const userCartItems = await db.select()
      .from(cartItems)
      .where(eq(cartItems.userId, user.id))
      .orderBy(desc(cartItems.addedAt));

    // Fetch item details for each cart item
    const itemsWithDetails = await Promise.all(
      userCartItems.map(async (cartItem) => {
        let itemDetails = null;

        if (cartItem.itemType === 'course') {
          const courseDetails = await db.select({
            title: courses.title,
            price: courses.price,
            thumbnailUrl: courses.thumbnailUrl
          })
            .from(courses)
            .where(eq(courses.id, cartItem.itemId))
            .limit(1);

          if (courseDetails.length > 0) {
            itemDetails = courseDetails[0];
          }
        } else if (cartItem.itemType === 'product') {
          const productDetails = await db.select({
            name: products.name,
            price: products.price,
            imageUrl: products.imageUrl
          })
            .from(products)
            .where(eq(products.id, cartItem.itemId))
            .limit(1);

          if (productDetails.length > 0) {
            itemDetails = productDetails[0];
          }
        }

        return {
          ...cartItem,
          itemDetails
        };
      })
    );

    // Calculate total cart value
    const totalValue = itemsWithDetails.reduce((sum, item) => {
      const price = item.itemDetails?.price || 0;
      return sum + (price * item.quantity);
    }, 0);

    return NextResponse.json({
      items: itemsWithDetails,
      totalValue
    }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Delete all cart items for the user
    const deleted = await db.delete(cartItems)
      .where(eq(cartItems.userId, user.id))
      .returning();

    return NextResponse.json({
      message: "Cart cleared successfully",
      deletedCount: deleted.length
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}