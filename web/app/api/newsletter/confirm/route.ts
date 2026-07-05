import { prisma } from "@/lib/db";
import {
  jsonBadRequest,
  jsonOk,
  jsonMethodNotAllowed,
} from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return jsonBadRequest("Missing confirmation token.");
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { token },
    });

    if (!subscriber) {
      return jsonBadRequest("Invalid or expired confirmation link.");
    }

    if (subscriber.status === "confirmed") {
      return jsonOk(
        { confirmed: true, alreadyConfirmed: true },
        { route: "newsletter-confirm" },
      );
    }

    if (subscriber.tokenExpiresAt && subscriber.tokenExpiresAt < new Date()) {
      return jsonBadRequest(
        "Confirmation link has expired. Please sign up again.",
      );
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: { status: "confirmed", tokenExpiresAt: null },
    });

    return jsonOk(
      { confirmed: true, alreadyConfirmed: false },
      { route: "newsletter-confirm" },
    );
  } catch (err) {
    console.error("[newsletter-confirm] Error:", err);
    return jsonBadRequest("Failed to confirm subscription.");
  }
}

export function GET() {
  return jsonMethodNotAllowed(["POST"]);
}
