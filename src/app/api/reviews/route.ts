import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { courseReviews, courses, user, enrollments } from '@/db/schema';
import { eq, and, desc, or } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authentication required
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED'
      }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, rating, reviewText } = body;

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    // Validate required fields
    if (!courseId) {
      return NextResponse.json({ 
        error: 'courseId is required',
        code: 'MISSING_COURSE_ID'
      }, { status: 400 });
    }

    if (!rating) {
      return NextResponse.json({ 
        error: 'rating is required',
        code: 'MISSING_RATING'
      }, { status: 400 });
    }

    // Validate courseId is valid integer
    const parsedCourseId = parseInt(courseId);
    if (isNaN(parsedCourseId)) {
      return NextResponse.json({ 
        error: 'courseId must be a valid integer',
        code: 'INVALID_COURSE_ID'
      }, { status: 400 });
    }

    // Validate rating is integer between 1 and 5
    const parsedRating = parseInt(rating);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json({ 
        error: 'rating must be an integer between 1 and 5',
        code: 'INVALID_RATING'
      }, { status: 400 });
    }

    // Verify course exists
    const course = await db.select()
      .from(courses)
      .where(eq(courses.id, parsedCourseId))
      .limit(1);

    if (course.length === 0) {
      return NextResponse.json({ 
        error: 'Course not found',
        code: 'COURSE_NOT_FOUND'
      }, { status: 404 });
    }

    // Check user is enrolled in the course
    const enrollment = await db.select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.userId, currentUser.id),
          eq(enrollments.courseId, parsedCourseId)
        )
      )
      .limit(1);

    if (enrollment.length === 0) {
      return NextResponse.json({ 
        error: 'You must be enrolled in this course to leave a review',
        code: 'NOT_ENROLLED'
      }, { status: 403 });
    }

    // Check for existing review
    const existingReview = await db.select()
      .from(courseReviews)
      .where(
        and(
          eq(courseReviews.userId, currentUser.id),
          eq(courseReviews.courseId, parsedCourseId)
        )
      )
      .limit(1);

    if (existingReview.length > 0) {
      return NextResponse.json({ 
        error: 'You have already reviewed this course',
        code: 'DUPLICATE_REVIEW'
      }, { status: 400 });
    }

    // Create review
    const newReview = await db.insert(courseReviews)
      .values({
        userId: currentUser.id,
        courseId: parsedCourseId,
        rating: parsedRating,
        reviewText: reviewText?.trim() || null,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    return NextResponse.json(newReview[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    const userId = searchParams.get('userId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Require either courseId or userId filter
    if (!courseId && !userId) {
      return NextResponse.json({ 
        error: 'courseId or userId is required',
        code: 'MISSING_FILTER'
      }, { status: 400 });
    }

    // Build where condition based on provided filter
    let whereCondition;
    
    if (courseId) {
      const parsedCourseId = parseInt(courseId);
      if (isNaN(parsedCourseId)) {
        return NextResponse.json({ 
          error: 'courseId must be a valid integer',
          code: 'INVALID_COURSE_ID'
        }, { status: 400 });
      }
      whereCondition = eq(courseReviews.courseId, parsedCourseId);
    }

    if (userId) {
      if (typeof userId !== 'string' || userId.trim() === '') {
        return NextResponse.json({ 
          error: 'userId must be a valid string',
          code: 'INVALID_USER_ID'
        }, { status: 400 });
      }
      whereCondition = eq(courseReviews.userId, userId);
    }

    // If both provided, use AND condition
    if (courseId && userId) {
      const parsedCourseId = parseInt(courseId);
      whereCondition = and(
        eq(courseReviews.courseId, parsedCourseId),
        eq(courseReviews.userId, userId)
      );
    }

    // Query with joins to include user and course details
    const reviews = await db.select({
      id: courseReviews.id,
      userId: courseReviews.userId,
      courseId: courseReviews.courseId,
      rating: courseReviews.rating,
      reviewText: courseReviews.reviewText,
      createdAt: courseReviews.createdAt,
      updatedAt: courseReviews.updatedAt,
      user: {
        id: user.id,
        name: user.name,
        image: user.image
      },
      course: {
        id: courses.id,
        title: courses.title,
        thumbnailUrl: courses.thumbnailUrl
      }
    })
    .from(courseReviews)
    .innerJoin(user, eq(courseReviews.userId, user.id))
    .innerJoin(courses, eq(courseReviews.courseId, courses.id))
    .where(whereCondition)
    .orderBy(desc(courseReviews.createdAt))
    .limit(limit)
    .offset(offset);

    return NextResponse.json(reviews);

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}