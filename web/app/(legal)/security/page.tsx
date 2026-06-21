import type { Metadata } from "next";
import { Prose } from "@/components/ui";

export const metadata: Metadata = {
  title: "Security",
  description: "How Craftly approaches security and how to report vulnerabilities.",
  alternates: { canonical: "/security" },
  robots: { index: true, follow: true },
};

export default function SecurityPage() {
  return (
    <Prose>
      <h1>Security</h1>
      <p>
        <strong>Last updated:</strong> January 1, 2026
      </p>
      <p>
        Craftly takes security seriously. This page describes our approach to
        security and how to report vulnerabilities.
      </p>

      <h2>Our Approach</h2>
      <ul>
        <li>
          <strong>HTTPS everywhere.</strong> All traffic to and from
          craftlyrobot.com is encrypted via TLS 1.3.
        </li>
        <li>
          <strong>Security headers.</strong> We set HSTS, X-Frame-Options,
          X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers
          on all responses.
        </li>
        <li>
          <strong>Content Security Policy.</strong> We use a strict CSP to
          prevent cross-site scripting and content injection.
        </li>
        <li>
          <strong>Bot protection.</strong> Public forms are protected by
          Cloudflare Turnstile.
        </li>
        <li>
          <strong>Rate limiting.</strong> API endpoints enforce rate limits to
          prevent abuse.
        </li>
        <li>
          <strong>Server-side validation.</strong> All user input is validated
          on the server, never trusting the client.
        </li>
        <li>
          <strong>Secret management.</strong> Secrets are stored in environment
          variables, never in code or client bundles.
        </li>
        <li>
          <strong>Dependency scanning.</strong> We audit dependencies for known
          vulnerabilities via Dependabot and pnpm audit.
        </li>
      </ul>

      <h2>Data Handling</h2>
      <p>
        We collect minimal personal data (see our{" "}
        <a href="/privacy">Privacy Policy</a>). Data is stored securely and
        access is restricted to authorized personnel only.
      </p>

      <h2>Reporting a Vulnerability</h2>
      <p>
        If you believe you&apos;ve found a security vulnerability in Craftly,
        please report it responsibly:
      </p>
      <ol>
        <li>
          Email us at{" "}
          <a href="mailto:security@craftlyrobot.com">security@craftlyrobot.com</a>
        </li>
        <li>Include a description of the vulnerability and steps to reproduce</li>
        <li>Do not publicly disclose the vulnerability until we&apos;ve had time to respond</li>
      </ol>
      <p>
        We acknowledge all vulnerability reports within 48 hours and provide a
        timeline for fix within 5 business days. We credit responsible
        disclosure in our security advisories (with your permission).
      </p>

      <h2>Bounty Program</h2>
      <p>
        We do not currently offer a monetary bounty program, but we recognize
        and credit responsible disclosure. This may change as we grow.
      </p>

      <h2>Scope</h2>
      <p>The following are in scope for vulnerability reports:</p>
      <ul>
        <li>craftlyrobot.com and all subdomains</li>
        <li>Craftly products (Craftly Robot, Hello, Workspace, Agent Console)</li>
        <li>Our public API endpoints</li>
      </ul>
      <p>The following are out of scope:</p>
      <ul>
        <li>Self-XSS (attacks requiring the user to paste code into their own console)</li>
        <li>Rate-limiting or denial-of-service via automated tools</li>
        <li>Social engineering attacks</li>
        <li>Physical attacks</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For non-security inquiries, use our{" "}
        <a href="/about/contact">contact form</a>. For security reports only,
        email{" "}
        <a href="mailto:security@craftlyrobot.com">security@craftlyrobot.com</a>.
      </p>
    </Prose>
  );
}
