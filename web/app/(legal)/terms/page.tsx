import type { Metadata } from "next";
import { Prose } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Craftly's website and products.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <Prose>
      <h1>Terms of Service</h1>
      <p>
        <strong>Last updated:</strong> January 1, 2026
        <br />
        <strong>Effective date:</strong> January 1, 2026
      </p>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use
        of craftlyrobot.com and any Craftly products (collectively, the
        &quot;Services&quot;).
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing or using the Services, you agree to be bound by these
        Terms. If you do not agree, do not use the Services.
      </p>

      <h2>Eligibility</h2>
      <p>
        You must be at least 13 years old to use the Services. By using the
        Services, you represent that you meet this requirement.
      </p>

      <h2>Use of Services</h2>
      <p>You agree to:</p>
      <ul>
        <li>Use the Services only for lawful purposes</li>
        <li>Not interfere with or disrupt the Services</li>
        <li>
          Not attempt to gain unauthorized access to any part of the Services
        </li>
        <li>
          Not use automated systems to access the Services in a way that sends
          more requests than a human reasonably could
        </li>
        <li>
          Provide accurate information when submitting forms or applications
        </li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        The Services and their original content, features, and functionality are
        owned by Craftly and are protected by international copyright,
        trademark, and other intellectual property laws.
      </p>

      <h2>User Content</h2>
      <p>
        When you submit content to us (e.g., a contributor application, a
        message via the contact form), you grant us a non-exclusive, worldwide,
        royalty-free license to use, reproduce, and process that content for the
        purpose of providing the Services.
      </p>

      <h2>Contributor Applications</h2>
      <p>
        Submitting a contributor application does not guarantee acceptance.
        Craftly reserves the right to accept or reject applications at its
        discretion, and to terminate contributor relationships at any time.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The Services are provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, whether express or implied. We do not
        guarantee that the Services will be uninterrupted, error-free, or
        secure.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Craftly shall not be liable for
        any indirect, incidental, special, consequential, or punitive damages,
        or any loss of profits or revenues, arising from your use of the
        Services.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold Craftly harmless from any claims,
        damages, losses, and expenses arising from your use of the Services or
        your violation of these Terms.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may modify these Terms at any time. We will post the modified Terms
        on this page and update the &quot;Last updated&quot; date. Your
        continued use of the Services after changes constitutes acceptance of
        the modified Terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of Bangladesh, without regard to
        its conflict of law provisions.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email us at{" "}
        <a href="mailto:hello@craftlyrobot.com">hello@craftlyrobot.com</a>.
      </p>
    </Prose>
  );
}
