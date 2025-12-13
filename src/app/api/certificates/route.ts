import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { certificates, courses, enrollments, user } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const userCertificates = await db
      .select({
        id: certificates.id,
        certificateCode: certificates.certificateCode,
        issuedAt: certificates.issuedAt,
        verificationUrl: certificates.verificationUrl,
        course: {
          id: courses.id,
          title: courses.title,
          instructorId: courses.instructorId,
        },
      })
      .from(certificates)
      .innerJoin(courses, eq(certificates.courseId, courses.id))
      .where(eq(certificates.userId, currentUser.id))
      .orderBy(desc(certificates.issuedAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(userCertificates, { status: 200 });
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
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }

    if (!courseId) {
      return NextResponse.json(
        { error: 'courseId is required', code: 'MISSING_COURSE_ID' },
        { status: 400 }
      );
    }

    const courseIdInt = parseInt(courseId);
    if (isNaN(courseIdInt)) {
      return NextResponse.json(
        { error: 'Invalid courseId', code: 'INVALID_COURSE_ID' },
        { status: 400 }
      );
    }

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

    const enrollment = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.userId, currentUser.id),
          eq(enrollments.courseId, courseIdInt)
        )
      )
      .limit(1);

    if (enrollment.length === 0) {
      return NextResponse.json(
        { error: 'Not enrolled in this course', code: 'NOT_ENROLLED' },
        { status: 403 }
      );
    }

    const userEnrollment = enrollment[0];
    const isCompleted =
      userEnrollment.completedAt !== null ||
      userEnrollment.progressPercentage === 100;

    if (!isCompleted) {
      return NextResponse.json(
        {
          error: 'Course not completed. Complete the course to receive a certificate',
          code: 'COURSE_NOT_COMPLETED',
        },
        { status: 400 }
      );
    }

    const existingCertificate = await db
      .select()
      .from(certificates)
      .where(
        and(
          eq(certificates.userId, currentUser.id),
          eq(certificates.courseId, courseIdInt)
        )
      )
      .limit(1);

    if (existingCertificate.length > 0) {
      return NextResponse.json(
        {
          error: 'Certificate already exists for this course',
          code: 'CERTIFICATE_ALREADY_EXISTS',
        },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const certificateCode = `CERT-${courseIdInt}-${currentUser.id}-${timestamp}`;
    const verificationUrl = `/api/certificates/verify/${certificateCode}`;

    const newCertificate = await db
      .insert(certificates)
      .values({
        userId: currentUser.id,
        courseId: courseIdInt,
        certificateCode: certificateCode,
        issuedAt: new Date(),
        verificationUrl: verificationUrl,
      })
      .returning();

    return NextResponse.json(newCertificate[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}