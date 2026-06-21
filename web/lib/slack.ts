/**
 * Slack notification utility.
 *
 * Sends messages to a Slack channel via incoming webhook.
 * Requires SLACK_WEBHOOK_URL in environment.
 * In development (no webhook URL), messages are logged to console.
 */

interface SlackMessage {
  /** Channel to post to (overrides default webhook channel) */
  channel?: string;
  /** Message text */
  text: string;
  /** Optional emoji icon */
  icon_emoji?: string;
  /** Optional blocks for rich formatting (see Slack Block Kit) */
  blocks?: unknown[];
}

/**
 * Send a message to Slack via webhook.
 * In development (no webhook URL), logs to console.
 */
export async function sendSlackMessage(
  message: SlackMessage,
): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[slack] (dev mode — not actually sent)", message.text);
    return true;
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: message.text,
        channel: message.channel,
        icon_emoji: message.icon_emoji,
        blocks: message.blocks,
      }),
    });

    if (!res.ok) {
      console.error("[slack] Send failed:", await res.text());
      return false;
    }

    return true;
  } catch (err) {
    console.error("[slack] Error:", err);
    return false;
  }
}

/**
 * Notify the team about a new application.
 */
export async function notifyApplicationReceived(data: {
  fullName: string;
  email: string;
  role: string;
  department: string;
  commitment: string;
  skillsCount: number;
}): Promise<void> {
  await sendSlackMessage({
    text: `🚀 New application from ${data.fullName}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*New application received*\n\n*Name:* ${data.fullName}\n*Email:* ${data.email}\n*Role:* ${data.role}\n*Department:* ${data.department}\n*Commitment:* ${data.commitment}\n*Skills:* ${data.skillsCount} listed`,
        },
      },
    ],
  });
}

/**
 * Notify the team about a new contact message.
 */
export async function notifyContactReceived(data: {
  name: string;
  email: string;
  subject: string;
}): Promise<void> {
  await sendSlackMessage({
    text: `📧 New contact message from ${data.name}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*New contact message*\n\n*From:* ${data.name} (${data.email})\n*Subject:* ${data.subject}`,
        },
      },
    ],
  });
}
