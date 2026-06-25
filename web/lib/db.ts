import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const PRISMA_GLOBAL = Symbol.for("prisma-global");

const globalForPrisma = globalThis as {
  [PRISMA_GLOBAL]?: PrismaClient;
};

function createPrismaClient(): PrismaClient {
  const log =
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"];

  if (!process.env.DATABASE_URL) {
    return new PrismaClient({ log: log as [] }) as unknown as PrismaClient;
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("connection_limit", "5");
  url.searchParams.set("pool_timeout", "10");

  const adapter = new PrismaPg({ connectionString: url.toString() });

  return new PrismaClient({ adapter, log: log as [] }) as unknown as PrismaClient;
}

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma[PRISMA_GLOBAL]) {
    globalForPrisma[PRISMA_GLOBAL] = createPrismaClient();
  }
  return globalForPrisma[PRISMA_GLOBAL]!;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return Reflect.get(getPrismaClient(), prop);
  },
});

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
