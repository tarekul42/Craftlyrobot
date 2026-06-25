import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const PRISMA_GLOBAL = Symbol.for("prisma-global");

const globalForPrisma = globalThis as {
  [PRISMA_GLOBAL]?: PrismaClient;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return new PrismaClient({ log: ["error"] });
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("connection_limit", "5");
  url.searchParams.set("pool_timeout", "10");

  const adapter = new PrismaPg({ connectionString: url.toString() });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma =
  globalForPrisma[PRISMA_GLOBAL] ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma[PRISMA_GLOBAL] = prisma;
}

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
