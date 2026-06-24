import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const RETENTION_DAYS = 90;

async function cleanup() {
  console.log(`[cleanup] Starting IP address data retention cleanup (${RETENTION_DAYS} day threshold)...`);

  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);

  const [applications, contacts, earlyAccess, expiredTokens] = await Promise.all([
    prisma.application.updateMany({
      where: { createdAt: { lt: cutoff } },
      data: { ipAddress: "[redacted]" },
    }),
    prisma.contactMessage.updateMany({
      where: { createdAt: { lt: cutoff } },
      data: { ipAddress: "[redacted]" },
    }),
    prisma.earlyAccessSignup.updateMany({
      where: { createdAt: { lt: cutoff } },
      data: { ipAddress: "[redacted]" },
    }),
    prisma.newsletterSubscriber.deleteMany({
      where: {
        tokenExpiresAt: { lt: new Date() },
        status: "pending",
      },
    }),
  ]);

  console.log(`[cleanup] Redacted IPs on ${applications.count} applications`);
  console.log(`[cleanup] Redacted IPs on ${contacts.count} contact messages`);
  console.log(`[cleanup] Redacted IPs on ${earlyAccess.count} early-access signups`);
  console.log(`[cleanup] Deleted ${expiredTokens.count} expired pending newsletter tokens`);

  await prisma.$disconnect();
}

cleanup().catch((err) => {
  console.error("[cleanup] Failed:", err);
  process.exit(1);
});
