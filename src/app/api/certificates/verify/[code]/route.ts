import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { certificates, courses, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;

    // Validate code parameter
    if (!code) {
      return NextResponse.json(
        { 
          error: 'Certificate code is required',
          code: 'MISSING_CODE'
        },
        { status: 400 }
      );
    }

    // Query certificate with joins to get student and course information
    const result = await db
      .select({
        certificateCode: certificates.certificateCode,
        issuedAt: certificates.issuedAt,
        verificationUrl: certificates.verificationUrl,
        studentName: user.name,
        studentEmail: user.email,
        courseId: courses.id,
        courseTitle: courses.title,
      })
      .from(certificates)
      .innerJoin(user, eq(certificates.userId, user.id))
      .innerJoin(courses, eq(certificates.courseId, courses.id))
      .where(eq(certificates.certificateCode, code))
      .limit(1);

    // Check if certificate exists
    if (result.length === 0) {
      return NextResponse.json(
        { 
          error: 'Certificate not found or invalid',
          code: 'CERTIFICATE_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const certificate = result[0];

    // Return certificate verification information
    return NextResponse.json({
      valid: true,
      certificateCode: certificate.certificateCode,
      issuedAt: certificate.issuedAt,
      student: {
        name: certificate.studentName,
        email: certificate.studentEmail,
      },
      course: {
        id: certificate.courseId,
        title: certificate.courseTitle,
      },
      verificationUrl: certificate.verificationUrl,
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}