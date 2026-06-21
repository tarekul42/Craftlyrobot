/**
 * Database utility — Prisma client singleton.
 *
 * Setup:
 *   1. Install Prisma: cd web && bun add @prisma/client && bun add -D prisma
 *   2. Set DATABASE_URL in .env.local
 *   3. Run: bunx prisma db push (or bunx prisma migrate dev)
 *
 * The schema is in web/prisma/schema.prisma.
 *
 * In development (no DATABASE_URL), all methods throw with a helpful message.
 * This lets the site run without a database for content-only work.
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma client singleton.
 * Prevents multiple instances in development (Next.js hot reload).
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Save an application to the database.
 */
export async function saveApplication(data: {
  fullName: string;
  email: string;
  whatsapp: string;
  role: string;
  department: string;
  commitment: string;
  skills: string[];
  portfolio?: string;
  whyCraftly: string;
  ip: string;
}): Promise<{ id: string } | null> {
  if (!process.env.DATABASE_URL) {
    console.log("[db] (dev mode — not saved)", data.fullName);
    return null;
  }

  try {
    const application = await prisma.application.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        role: data.role,
        department: data.department,
        commitment: data.commitment,
        skills: data.skills,
        portfolio: data.portfolio || null,
        whyCraftly: data.whyCraftly,
        ipAddress: data.ip,
        status: "pending",
      },
    });
    return { id: application.id };
  } catch (err) {
    console.error("[db] Save application failed:", err);
    return null;
  }
}

/**
 * Save a contact message to the database.
 */
export async function saveContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
}): Promise<{ id: string } | null> {
  if (!process.env.DATABASE_URL) {
    console.log("[db] (dev mode — not saved)", data.name);
    return null;
  }

  try {
    const contact = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        ipAddress: data.ip,
        status: "new",
      },
    });
    return { id: contact.id };
  } catch (err) {
    console.error("[db] Save contact failed:", err);
    return null;
  }
}
