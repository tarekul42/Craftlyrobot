import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("==> Seeding database...");

  const existingApp = await prisma.application.findFirst();
  if (existingApp) {
    console.log("==> Database already has data, skipping seed.");
    return;
  }

  await prisma.application.create({
    data: {
      fullName: "Test User",
      email: "test@example.com",
      whatsapp: "+8801700000000",
      role: "frontend",
      department: "engineering",
      commitment: "10h",
      skills: ["React", "TypeScript", "Tailwind CSS"],
      whyCraftly: "I want to build the future of agent-based computing.",
      ipAddress: "127.0.0.1",
      status: "pending",
    },
  });

  await prisma.contactMessage.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      subject: "Partnership inquiry",
      message: "I'd like to explore partnership opportunities with Craftly.",
      ipAddress: "127.0.0.1",
      status: "new",
    },
  });

  await prisma.newsletterSubscriber.create({
    data: {
      email: "test@example.com",
      status: "confirmed",
      token: crypto.randomBytes(32).toString("hex"),
    },
  });

  await prisma.earlyAccessSignup.create({
    data: {
      phoneNumber: "+8801700000000",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("==> Seed complete (4 records created).");
}

main()
  .catch((e) => {
    console.error("==> Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
