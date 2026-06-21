import type { Metadata } from "next";
import { Prose } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Craftly collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <Prose>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated:</strong> January 1, 2026
        <br />
        <strong>Effective date:</strong> January 1, 2026
      </p>
      <p>
        This Privacy Policy describes how Craftly (&quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares your
        information when you visit craftlyrobot.com or use our products.
      </p>

      <h2>Information We Collect</h2>

      <h3>Information You Provide</h3>
      <p>
        When you contact us, apply to contribute, or sign up for updates, we
        collect:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your WhatsApp number (if provided)</li>
        <li>The content of your message or application</li>
        <li>Skills, role preferences, and portfolio links (if applying)</li>
      </ul>

      <h3>Automatically Collected Information</h3>
      <p>When you visit our website, we automatically collect:</p>
      <ul>
        <li>Your IP address</li>
        <li>Browser type and version</li>
        <li>Pages visited and time spent</li>
        <li>Referring URL</li>
        <li>Approximate location (country level, derived from IP)</li>
      </ul>
      <p>
        We use privacy-friendly analytics (Plausible) that do not use cookies
        and do not track you across other websites.
      </p>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Respond to your inquiries and applications</li>
        <li>Review your contributor application</li>
        <li>Send you updates (if you&apos;ve subscribed)</li>
        <li>Improve our website and products</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>How We Share Your Information</h2>
      <p>
        We do not sell your personal information. We share your information
        only:
      </p>
      <ul>
        <li>
          With service providers who help us operate (e.g., email delivery,
          hosting)
        </li>
        <li>When required by law</li>
        <li>In connection with a merger, acquisition, or sale of assets</li>
        <li>With your consent</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use minimal cookies. Our analytics (Plausible) is cookieless. We may
        use Cloudflare Turnstile for bot protection, which may set a cookie
        necessary for its function.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain your information for as long as necessary to provide our
        services and comply with legal obligations. Application data is retained
        for 12 months. Contact form data is retained for 6 months.
      </p>

      <h2>Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Object to our processing of your information</li>
        <li>Request data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>
      <p>
        To exercise these rights, email us at{" "}
        <a href="mailto:privacy@craftlyrobot.com">privacy@craftlyrobot.com</a>.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable measures to protect your information, including HTTPS
        encryption, secure server infrastructure, and access controls. However,
        no method of transmission over the internet is 100% secure.
      </p>

      <h2>Children&apos;s Privacy</h2>
      <p>
        Our website is not directed to children under 13. We do not knowingly
        collect personal information from children under 13.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of significant changes by posting the new policy on this page and
        updating the &quot;Last updated&quot; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email us at{" "}
        <a href="mailto:privacy@craftlyrobot.com">privacy@craftlyrobot.com</a>{" "}
        or use our <a href="/about/contact">contact form</a>.
      </p>
    </Prose>
  );
}
