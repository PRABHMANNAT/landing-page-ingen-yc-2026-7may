import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_EMAIL = process.env.WAITLIST_TO_EMAIL || "adidogra07@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "iNGEN Waitlist <onboarding@resend.dev>";

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "fakeinbox.com",
  "sharklasers.com",
  "dispostable.com",
  "maildrop.cc",
  "mintemail.com",
  "mohmal.com",
  "spambox.us",
  "tempinbox.com",
  "tempr.email",
  "throwaway.email",
]);

const EMAIL_RE =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/;

function validateEmail(raw: string): {
  ok: boolean;
  reason?: string;
  email?: string;
} {
  const email = (raw || "").trim().toLowerCase();
  if (!email) return { ok: false, reason: "Email is required." };
  if (email.length > 254) return { ok: false, reason: "Email is too long." };
  if (!EMAIL_RE.test(email))
    return { ok: false, reason: "Please enter a valid email address." };
  const domain = email.split("@")[1];
  if (
    !domain ||
    domain.includes("..") ||
    domain.startsWith("-") ||
    domain.endsWith("-")
  )
    return { ok: false, reason: "Please enter a valid email address." };
  if (DISPOSABLE_DOMAINS.has(domain))
    return { ok: false, reason: "Disposable email addresses aren't allowed." };
  return { ok: true, email };
}

async function fetchGoogleUserInfo(
  accessToken: string
): Promise<{ email: string; email_verified: boolean; name?: string } | null> {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      email?: string;
      email_verified?: boolean;
      name?: string;
    };
    if (!data.email) return null;
    return {
      email: data.email,
      email_verified: !!data.email_verified,
      name: data.name,
    };
  } catch {
    return null;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return c;
    }
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const payload = (body || {}) as {
    type?: string;
    email?: string;
    access_token?: string;
  };

  let email: string | null = null;
  let source: "email" | "google" = "email";
  let displayName: string | undefined;

  if (payload.type === "google") {
    if (!payload.access_token || typeof payload.access_token !== "string") {
      return NextResponse.json(
        { ok: false, error: "Missing Google access token." },
        { status: 400 }
      );
    }
    const info = await fetchGoogleUserInfo(payload.access_token);
    if (!info) {
      return NextResponse.json(
        { ok: false, error: "Couldn't verify your Google sign-in." },
        { status: 400 }
      );
    }
    if (!info.email_verified) {
      return NextResponse.json(
        { ok: false, error: "Your Google email isn't verified." },
        { status: 400 }
      );
    }
    email = info.email.toLowerCase();
    displayName = info.name;
    source = "google";
  } else {
    if (!payload.email || typeof payload.email !== "string") {
      return NextResponse.json(
        { ok: false, error: "Please provide an email address." },
        { status: 400 }
      );
    }
    const v = validateEmail(payload.email);
    if (!v.ok || !v.email) {
      return NextResponse.json(
        { ok: false, error: v.reason ?? "Invalid email." },
        { status: 400 }
      );
    }
    email = v.email;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[waitlist] Email service is not configured."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn’t save your request right now. Please try again later or contact contact@ingenworkspace.com.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const safeEmail = escapeHtml(email);
  const safeName = displayName ? escapeHtml(displayName) : null;
  const sourceLabel =
    source === "google" ? "Continue with Google" : "Continue with Email";
  const timestamp = new Date().toISOString();

  const subject = `[iNGEN Waitlist] New ${source} signup: ${email}`;
  const html = `<!doctype html>
<html>
<body style="margin:0;padding:24px;background:#FCF9F4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1D161D;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid rgba(0,0,0,0.06);border-radius:14px;padding:24px;">
    <h2 style="margin:0 0 6px;font-size:18px;">New iNGEN waitlist signup</h2>
    <p style="margin:0 0 18px;color:#5A5A5A;font-size:13px;">Forwarded from ingen.</p>
    <table style="border-collapse:collapse;font-size:14px;width:100%;">
      <tr>
        <td style="padding:6px 14px 6px 0;color:#666;width:90px;">Email</td>
        <td><a href="mailto:${safeEmail}" style="color:#EA7659;text-decoration:none;">${safeEmail}</a></td>
      </tr>
      <tr>
        <td style="padding:6px 14px 6px 0;color:#666;">Source</td>
        <td>${sourceLabel}</td>
      </tr>
      ${
        safeName
          ? `<tr><td style="padding:6px 14px 6px 0;color:#666;">Name</td><td>${safeName}</td></tr>`
          : ""
      }
      <tr>
        <td style="padding:6px 14px 6px 0;color:#666;">Time</td>
        <td>${timestamp}</td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  const text = [
    "New iNGEN waitlist signup",
    `Email: ${email}`,
    `Source: ${sourceLabel}`,
    displayName ? `Name: ${displayName}` : null,
    `Time: ${timestamp}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });
    if ((result as { error?: unknown }).error) {
      console.error("[waitlist] Resend returned error:", result);
      return NextResponse.json(
        { ok: false, error: "Couldn't send the notification email." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[waitlist] Resend send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Couldn't send the notification email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, email, source });
}

