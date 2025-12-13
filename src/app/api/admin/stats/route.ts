import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, courses, enrollments, orders, submissions } from '@/db/schema';
import { eq, sql, count, sum, gte, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const currentUser = await getCurrentUser(request);
    if (!currentUser) {
      return NextResponse.json({ 
        error: 'Authentication required',
        code: 'AUTHENTICATION_REQUIRED' 
      }, { status: 401 });
    }

    // Admin role verification
    if (currentUser.role !== 'admin') {
      return NextResponse.json({ 
        error: 'Access denied. Admin role required.',
        code: 'FORBIDDEN' 
      }, { status: 403 });
    }

    // Calculate date 30 days ago for recent statistics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total users count
    const totalUsersResult = await db.select({ count: count() }).from(user);
    const totalUsers = totalUsersResult[0]?.count || 0;

    // Users by role
    const usersByRoleResult = await db.select({
      role: user.role,
      count: count()
    })
    .from(user)
    .groupBy(user.role);

    const usersByRole = {
      student: 0,
      instructor: 0,
      admin: 0,
      content_admin: 0
    };

    usersByRoleResult.forEach(row => {
      if (row.role && row.role in usersByRole) {
        usersByRole[row.role as keyof typeof usersByRole] = row.count;
      }
    });

    // Total courses count
    const totalCoursesResult = await db.select({ count: count() }).from(courses);
    const totalCourses = totalCoursesResult[0]?.count || 0;

    // Courses by status
    const coursesByStatusResult = await db.select({
      status: courses.status,
      count: count()
    })
    .from(courses)
    .groupBy(courses.status);

    const coursesByStatus = {
      draft: 0,
      published: 0,
      archived: 0
    };

    coursesByStatusResult.forEach(row => {
      if (row.status && row.status in coursesByStatus) {
        coursesByStatus[row.status as keyof typeof coursesByStatus] = row.count;
      }
    });

    // Total enrollments count
    const totalEnrollmentsResult = await db.select({ count: count() }).from(enrollments);
    const totalEnrollments = totalEnrollmentsResult[0]?.count || 0;

    // Active enrollments (completedAt is null)
    const activeEnrollmentsResult = await db.select({ count: count() })
      .from(enrollments)
      .where(sql`${enrollments.completedAt} IS NULL`);
    const activeEnrollments = activeEnrollmentsResult[0]?.count || 0;

    // Completed enrollments (completedAt is not null)
    const completedEnrollmentsResult = await db.select({ count: count() })
      .from(enrollments)
      .where(sql`${enrollments.completedAt} IS NOT NULL`);
    const completedEnrollments = completedEnrollmentsResult[0]?.count || 0;

    // Total revenue (sum of totalAmount from completed orders)
    const totalRevenueResult = await db.select({ 
      total: sum(orders.totalAmount) 
    })
    .from(orders)
    .where(eq(orders.status, 'completed'));
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    // Pending orders count
    const pendingOrdersResult = await db.select({ count: count() })
      .from(orders)
      .where(eq(orders.status, 'pending'));
    const pendingOrders = pendingOrdersResult[0]?.count || 0;

    // Completed orders count
    const completedOrdersResult = await db.select({ count: count() })
      .from(orders)
      .where(eq(orders.status, 'completed'));
    const completedOrders = completedOrdersResult[0]?.count || 0;

    // Total submissions count
    const totalSubmissionsResult = await db.select({ count: count() }).from(submissions);
    const totalSubmissions = totalSubmissionsResult[0]?.count || 0;

    // Submissions by status
    const submissionsByStatusResult = await db.select({
      status: submissions.status,
      count: count()
    })
    .from(submissions)
    .groupBy(submissions.status);

    const submissionsByStatus = {
      pending: 0,
      graded: 0,
      resubmit: 0
    };

    submissionsByStatusResult.forEach(row => {
      if (row.status && row.status in submissionsByStatus) {
        submissionsByStatus[row.status as keyof typeof submissionsByStatus] = row.count;
      }
    });

    // Recent enrollments (last 30 days)
    const recentEnrollmentsResult = await db.select({ count: count() })
      .from(enrollments)
      .where(gte(enrollments.enrolledAt, thirtyDaysAgo));
    const recentEnrollments = recentEnrollmentsResult[0]?.count || 0;

    // Recent courses (last 30 days)
    const recentCoursesResult = await db.select({ count: count() })
      .from(courses)
      .where(gte(courses.createdAt, thirtyDaysAgo));
    const recentCourses = recentCoursesResult[0]?.count || 0;

    // Compile statistics
    const statistics = {
      totalUsers,
      usersByRole,
      totalCourses,
      coursesByStatus,
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      totalRevenue: Number(totalRevenue),
      pendingOrders,
      completedOrders,
      totalSubmissions,
      submissionsByStatus,
      recentEnrollments,
      recentCourses
    };

    return NextResponse.json(statistics, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      code: 'INTERNAL_SERVER_ERROR' 
    }, { status: 500 });
  }
}