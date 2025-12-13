import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { user, session, account, verification } from "@/db/schema";
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
}

export async function getCurrentUser(request: NextRequest): Promise<CurrentUser | null> {
  try {
    // Try to get user ID from header (for testing/development)
    const userIdFromHeader = request.headers.get('X-User-Id');
    
    if (userIdFromHeader) {
      const userRecord = await db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified
      })
      .from(user)
      .where(eq(user.id, userIdFromHeader))
      .limit(1);

      if (userRecord.length > 0) {
        return userRecord[0];
      }
    }

    // Try to get session token from cookie
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return null;
    }

    // Extract session token from cookies
    const sessionToken = extractSessionToken(cookieHeader);
    if (!sessionToken) {
      return null;
    }

    // Verify session and get user
    const sessionRecord = await db.select({
      userId: session.userId,
      expiresAt: session.expiresAt
    })
    .from(session)
    .where(eq(session.token, sessionToken))
    .limit(1);

    if (sessionRecord.length === 0) {
      return null;
    }

    // Check if session is expired
    if (sessionRecord[0].expiresAt < new Date()) {
      return null;
    }

    // Get user details
    const userRecord = await db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified
    })
    .from(user)
    .where(eq(user.id, sessionRecord[0].userId))
    .limit(1);

    if (userRecord.length === 0) {
      return null;
    }

    return userRecord[0];
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
}

function extractSessionToken(cookieHeader: string): string | null {
  // Look for better-auth session cookie
  const cookies = cookieHeader.split(';').map(c => c.trim());
  
  for (const cookie of cookies) {
    if (cookie.startsWith('better-auth.session_token=')) {
      return cookie.split('=')[1];
    }
    // Also check for common session cookie names
    if (cookie.startsWith('session=') || cookie.startsWith('auth_session=')) {
      return cookie.split('=')[1];
    }
  }
  
  return null;
}