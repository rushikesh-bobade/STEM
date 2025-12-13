import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courseReviews } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    // Validate ID
    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { rating, reviewText } = body;

    // Validate at least one field is provided
    if (rating === undefined && reviewText === undefined) {
      return NextResponse.json(
        { 
          error: 'At least one field (rating or reviewText) must be provided', 
          code: 'NO_FIELDS_PROVIDED' 
        },
        { status: 400 }
      );
    }

    // Validate rating if provided
    if (rating !== undefined) {
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return NextResponse.json(
          { 
            error: 'Rating must be an integer between 1 and 5', 
            code: 'INVALID_RATING' 
          },
          { status: 400 }
        );
      }
    }

    // Check if review exists
    const existingReview = await db.select()
      .from(courseReviews)
      .where(eq(courseReviews.id, parseInt(id)))
      .limit(1);

    if (existingReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Authorization check - verify review belongs to authenticated user
    if (existingReview[0].userId !== user.id) {
      return NextResponse.json(
        { 
          error: 'You do not have permission to update this review', 
          code: 'FORBIDDEN' 
        },
        { status: 403 }
      );
    }

    // Prepare update data
    const updateData: any = {
      updatedAt: new Date()
    };

    if (rating !== undefined) {
      updateData.rating = rating;
    }

    if (reviewText !== undefined) {
      updateData.reviewText = reviewText;
    }

    // Update review
    const updated = await db.update(courseReviews)
      .set(updateData)
      .where(
        and(
          eq(courseReviews.id, parseInt(id)),
          eq(courseReviews.userId, user.id)
        )
      )
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Failed to update review', code: 'UPDATE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error: any) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authentication check
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'AUTHENTICATION_REQUIRED' },
        { status: 401 }
      );
    }

    // Validate ID
    const id = params.id;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if review exists
    const existingReview = await db.select()
      .from(courseReviews)
      .where(eq(courseReviews.id, parseInt(id)))
      .limit(1);

    if (existingReview.length === 0) {
      return NextResponse.json(
        { error: 'Review not found', code: 'REVIEW_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Authorization check - verify review belongs to authenticated user
    if (existingReview[0].userId !== user.id) {
      return NextResponse.json(
        { 
          error: 'You do not have permission to delete this review', 
          code: 'FORBIDDEN' 
        },
        { status: 403 }
      );
    }

    // Delete review
    const deleted = await db.delete(courseReviews)
      .where(
        and(
          eq(courseReviews.id, parseInt(id)),
          eq(courseReviews.userId, user.id)
        )
      )
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: 'Failed to delete review', code: 'DELETE_FAILED' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Review deleted successfully', 
        review: deleted[0] 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
}