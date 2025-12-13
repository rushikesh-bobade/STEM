import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, orderItems, courses, user } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    // Single order by ID
    if (orderId) {
      const id = parseInt(orderId);
      if (isNaN(id)) {
        return NextResponse.json({ 
          error: 'Valid order ID is required',
          code: 'INVALID_ID'
        }, { status: 400 });
      }

      const order = await db.select()
        .from(orders)
        .where(and(
          eq(orders.id, id),
          eq(orders.userId, currentUser.id)
        ))
        .limit(1);

      if (order.length === 0) {
        return NextResponse.json({ 
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND'
        }, { status: 404 });
      }

      const items = await db.select()
        .from(orderItems)
        .where(eq(orderItems.orderId, id));

      return NextResponse.json({
        ...order[0],
        items
      }, { status: 200 });
    }

    // List all orders for user with pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const userOrders = await db.select()
      .from(orders)
      .where(eq(orders.userId, currentUser.id))
      .orderBy(desc(orders.createdAt))
      .limit(limit)
      .offset(offset);

    // Get order items for all orders
    const ordersWithItems = await Promise.all(
      userOrders.map(async (order) => {
        const items = await db.select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));

        return {
          ...order,
          items
        };
      })
    );

    return NextResponse.json(ordersWithItems, { status: 200 });

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

    const body = await request.json();
    
    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { items, paymentMethod } = body;

    // Validate items array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ 
        error: 'Items array is required and cannot be empty',
        code: 'ITEMS_REQUIRED'
      }, { status: 400 });
    }

    // Validate and verify each item
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const { itemType, itemId, itemName, price, quantity } = item;

      if (!itemType || !itemId || !itemName || price === undefined || !quantity) {
        return NextResponse.json({ 
          error: 'Each item must have itemType, itemId, itemName, price, and quantity',
          code: 'INVALID_ITEM_DATA'
        }, { status: 400 });
      }

      if (typeof price !== 'number' || price < 0) {
        return NextResponse.json({ 
          error: 'Item price must be a non-negative number',
          code: 'INVALID_PRICE'
        }, { status: 400 });
      }

      if (typeof quantity !== 'number' || quantity < 1) {
        return NextResponse.json({ 
          error: 'Item quantity must be at least 1',
          code: 'INVALID_QUANTITY'
        }, { status: 400 });
      }

      // Verify course exists and price matches if itemType is 'course'
      if (itemType === 'course') {
        const course = await db.select()
          .from(courses)
          .where(eq(courses.id, parseInt(itemId)))
          .limit(1);

        if (course.length === 0) {
          return NextResponse.json({ 
            error: `Course with ID ${itemId} not found`,
            code: 'COURSE_NOT_FOUND'
          }, { status: 400 });
        }

        if (course[0].price !== price) {
          return NextResponse.json({ 
            error: `Price mismatch for course ${itemId}. Expected ${course[0].price}, got ${price}`,
            code: 'PRICE_MISMATCH'
          }, { status: 400 });
        }
      }

      totalAmount += price * quantity;
      validatedItems.push({
        itemType,
        itemId: parseInt(itemId),
        itemName,
        price,
        quantity
      });
    }

    // Create order
    const newOrder = await db.insert(orders)
      .values({
        userId: currentUser.id,
        totalAmount,
        status: 'pending',
        paymentMethod: paymentMethod || null,
        createdAt: new Date(),
        completedAt: null
      })
      .returning();

    if (newOrder.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to create order',
        code: 'ORDER_CREATION_FAILED'
      }, { status: 500 });
    }

    const orderId = newOrder[0].id;

    // Insert order items
    const insertedItems = await db.insert(orderItems)
      .values(
        validatedItems.map(item => ({
          orderId,
          itemType: item.itemType,
          itemId: item.itemId,
          itemName: item.itemName,
          price: item.price,
          quantity: item.quantity
        }))
      )
      .returning();

    return NextResponse.json({
      ...newOrder[0],
      items: insertedItems
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}