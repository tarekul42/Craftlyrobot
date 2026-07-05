import { prisma } from "@/lib/prisma-client";
import { devModeGuard } from "@/lib/dev-mode";

export { prisma };

interface SaveSuccess {
  id: string;
}

interface SaveError {
  code: "DB_UNAVAILABLE" | "UNIQUE_CONSTRAINT" | "UNKNOWN";
  message: string;
}

type SaveResult = SaveSuccess | SaveError;

function isPrismaUniqueConstraintError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: unknown }).code === "P2002"
  );
}

function saveError(err: unknown, entity: string): SaveError {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[db] Save ${entity} failed:`, message);
  if (isPrismaUniqueConstraintError(err)) {
    return {
      code: "UNIQUE_CONSTRAINT",
      message: `This ${entity} already exists.`,
    };
  }
  return { code: "UNKNOWN", message: "An unexpected error occurred." };
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
}): Promise<SaveResult> {
  if (devModeGuard("db")) {
    console.log("[db] (dev mode — not saved)", data.fullName);
    return {
      code: "DB_UNAVAILABLE",
      message: "Database not available in dev mode.",
    };
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
    return saveError(err, "application");
  }
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
}): Promise<SaveResult> {
  if (devModeGuard("db")) {
    console.log("[db] (dev mode — not saved)", data.name);
    return {
      code: "DB_UNAVAILABLE",
      message: "Database not available in dev mode.",
    };
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
    return saveError(err, "contact message");
  }
}
