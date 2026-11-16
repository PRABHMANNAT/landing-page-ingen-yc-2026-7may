"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Logo from "@/components/Logo";
import PolicyLinks from "@/components/PolicyLinks";
import GlobeErrorBoundary from "@/components/ui/GlobeErrorBoundary";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: {
              access_token?: string;
              error?: string;
              error_description?: string;
            }) => void;
            error_callback?: (err: { type?: string; message?: string }) => void;
          }) => { requestAccessToken: (overrides?: Record<string, unknown>) => void };
        };
      };
    };
  }
}

type GoogleTokenClient = {
  requestAccessToken: (overrides?: Record<string, unknown>) => void;
};

type Mode = "signup" | "login" | "waitlist";

const DISPOSABLE_EMAIL_DOMAINS = new Set([
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

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/;

function validateEmail(raw: string): { ok: boolean; reason?: string } {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, reason: "Please enter your email address." };
  if (email.length > 254) return { ok: false, reason: "Email is too long." };
  if (!EMAIL_REGEX.test(email))
    return { ok: false, reason: "Please enter a valid email address." };
  const domain = email.split("@")[1];
  if (!domain || domain.includes("..") || domain.startsWith("-") || domain.endsWith("-"))
    return { ok: false, reason: "Please enter a valid email address." };
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain))
    return { ok: false, reason: "Disposable email addresses aren't allowed." };
  return { ok: true };
}

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

type Chip = {
  label: string;
  cls: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const chips: Chip[] = [
  { label: "Prabh just got placed",            cls: "chip-mint",     top: "10%",    left: "4%"  },
  { label: "Aren is hiring-ready",             cls: "chip-amber",    top: "16%",    right: "4%" },
  { label: "Maya matched with a recruiter",    cls: "chip-lavender", bottom: "18%", right: "4%" },
  { label: "Riya mapped her AI engineer path", cls: "chip-yellow",   bottom: "8%",  left: "4%"  },
];

const integrations: { name: string; domain: string }[] = [
  { name: "LinkedIn",   domain: "linkedin.com" },
  { name: "GitHub",     domain: "github.com" },
  { name: "Glassdoor",  domain: "glassdoor.com" },
  { name: "Indeed",     domain: "indeed.com" },
  { name: "Wellfound",  domain: "wellfound.com" },
  { name: "Lever",      domain: "lever.co" },
  { name: "Greenhouse", domain: "greenhouse.io" },
  { name: "Slack",      domain: "slack.com" },
  { name: "Notion",     domain: "notion.so" },
  { name: "Workday",    domain: "workday.com" },
  { name: "Calendly",   domain: "calendly.com" },
  { name: "Coursera",   domain: "coursera.org" },
];

function buildArcs() {
  const colors = ["#ffffff", "#cfcfcf", "#9aa0a6"];
  const pick = () => colors[Math.floor(Math.random() * colors.length)];
  return [
    { order: 1, startLat: 28.6139, startLng: 77.209,  endLat: 51.5072, endLng: -0.1276,    arcAlt: 0.3, color: pick() },
    { order: 1, startLat: 40.7128, startLng: -74.006, endLat: 35.6762, endLng: 139.6503,   arcAlt: 0.4, color: pick() },
    { order: 2, startLat: 37.7749, startLng: -122.4194, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.5, color: pick() },
    { order: 2, startLat: -33.8688, startLng: 151.2093, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.4, color: pick() },
    { order: 3, startLat: 52.52,   startLng: 13.405,  endLat: 1.3521,  endLng: 103.8198,   arcAlt: 0.3, color: pick() },
    { order: 3, startLat: 19.0760, startLng: 72.8777, endLat: 48.8566, endLng: 2.3522,     arcAlt: 0.4, color: pick() },
    { order: 4, startLat: -22.9068, startLng: -43.1729, endLat: 40.7128, endLng: -74.006,  arcAlt: 0.5, color: pick() },
    { order: 4, startLat: 55.7558, startLng: 37.6173, endLat: 1.3521,  endLng: 103.8198,   arcAlt: 0.4, color: pick() },
  ];
}

function AuthGlobe() {
  const { globeConfig, sampleArcs } = useMemo(
    () => ({
      globeConfig: {
        pointSize: 3,
        // light-black ocean sphere
        globeColor: "#2A2A2E",
        showAtmosphere: true,
        // soft white atmospheric glow
        atmosphereColor: "#ffffff",
        atmosphereAltitude: 0.14,
        emissive: "#1A1A1F",
        emissiveIntensity: 0.18,
        shininess: 0.9,
        // continents in pure white
        polygonColor: "rgba(255,255,255,1)",
        ambientLight: "#ffffff",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 1600,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.7,
      },
      sampleArcs: buildArcs(),
    }),
    []
  );

  return (
    <div
      className="relative mx-auto"
      style={{ width: "clamp(240px, 26vw, 320px)", aspectRatio: "1 / 1" }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 via-transparent to-black/10 blur-2xl" />
      <div className="absolute inset-0 [&>div]:!w-full [&>div]:!h-full [&_canvas]:!w-full [&_canvas]:!h-full">
        <GlobeErrorBoundary fallback={
          <img src="/editorial/globe-recruiter.webp" alt="" width={620} height={620}
            className="h-full w-full object-contain grayscale" />
        }>
          <World data={sampleArcs} globeConfig={globeConfig} />
        </GlobeErrorBoundary>
      </div>

      {chips.map((c) => (
        <div
          key={c.label}
          className={`chip ${c.cls} absolute whitespace-nowrap shadow-sm z-10 !text-[10px] !px-2 !py-[3px] !gap-1.5`}
          style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right }}
        >
          <span>{c.label}</span>
          <span className="opacity-50">×</span>
        </div>
      ))}
    </div>
  );
}

function IntegrationLogo({ name, domain }: { name: string; domain: string }) {
  return (
    <div className="flex items-center gap-2 px-5 shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
        alt={name}
        width={20}
        height={20}
        loading="lazy"
        className="w-[20px] h-[20px] object-contain rounded-sm"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />
      <span className="text-[13px] font-medium text-brand-ink/80 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

function IntegrationsMarquee() {
  const loop = [...integrations, ...integrations];
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white px-3 sm:px-4 pt-4 pb-3.5 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div
        className="text-center label-mono text-brand-ink/75 whitespace-nowrap mb-5"
        style={{ fontSize: "clamp(8.5px, 1.05vw, 10.5px)", letterSpacing: "0.12em" }}
      >
        Connects with the tools you already use
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10"
          style={{
            background:
              "linear-gradient(to left, #ffffff 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div className="flex w-max animate-marquee">
          {loop.map((it, i) => (
            <IntegrationLogo key={`${it.domain}-${i}`} name={it.name} domain={it.domain} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProviderButton({
  children,
  icon,
  onClick,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group relative w-full flex items-center justify-center gap-3 h-11 rounded-md border border-black/10 bg-white text-[14px] font-medium text-brand-ink shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-brand-ink/40 hover:bg-black/[0.02] hover:shadow-[0_6px_16px_-8px_rgba(29,22,29,0.25)] active:translate-y-0 active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      <span className="inline-flex transition-transform duration-200 ease-out group-hover:scale-110">
        {icon}
      </span>
      <span className="transition-colors duration-200 group-hover:text-brand-ink">{children}</span>
    </button>
  );
}

const GoogleIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
    <path
      fill="#4285F4"
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
    />
    <path
      fill="#FBBC05"
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
    />
  </svg>
);

const EmailIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#1d161d" strokeWidth="1.6" />
    <path
      d="M3.5 6.5L12 13L20.5 6.5"
      stroke="#1d161d"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

function WaitlistPanel() {
  const [view, setView] = useState<"choices" | "email">("choices");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [confirmedEmail, setConfirmedEmail] = useState<string | null>(null);
  const googleClientRef = useRef<GoogleTokenClient | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const submitWaitlist = useCallback(
    async (payload:
      | { type: "email"; email: string }
      | { type: "google"; access_token: string }
    ) => {
      setError(null);
      setStatus("submitting");
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          email?: string;
          error?: string;
        };
        if (!res.ok || !data.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          setStatus("idle");
          return;
        }
        setConfirmedEmail(data.email || (payload.type === "email" ? payload.email : null));
        setStatus("success");
      } catch {
        setError("Network error. Please try again.");
        setStatus("idle");
      }
    },
    []
  );

  useEffect(() => {
    if (!googleClientId || typeof window === "undefined") return;

    const initialize = () => {
      if (!window.google?.accounts?.oauth2) return;
      googleClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: googleClientId,
        scope: "openid email profile",
        callback: (response) => {
          if (response.error || !response.access_token) {
            setStatus("idle");
            if (response.error && response.error !== "popup_closed_by_user") {
              setError(response.error_description || "Google sign-in failed.");
            }
            return;
          }
          submitWaitlist({ type: "google", access_token: response.access_token });
        },
        error_callback: (err) => {
          setStatus("idle");
          if (err?.type && err.type !== "popup_closed") {
            setError(err.message || "Google sign-in failed.");
          }
        },
      });
      setGoogleReady(true);
    };

    const existing = document.getElementById("google-identity-services");
    if (existing) {
      initialize();
      return;
    }
    const script = document.createElement("script");
    script.id = "google-identity-services";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initialize;
    document.head.appendChild(script);
  }, [googleClientId, submitWaitlist]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const result = validateEmail(email);
    if (!result.ok) {
      setError(result.reason ?? "Please enter a valid email address.");
      return;
    }
    submitWaitlist({ type: "email", email: email.trim().toLowerCase() });
  };

  const handleGoogleClick = () => {
    if (status === "submitting") return;
    if (!googleClientId) {
      setError(
        "Google sign-in isn't configured yet. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID."
      );
      return;
    }
    if (!googleClientRef.current) {
      setError("Google sign-in is still loading. Try again in a moment.");
      return;
    }
    setError(null);
    googleClientRef.current.requestAccessToken();
  };

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-[380px] text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/10">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7"
              stroke="#6c5ce7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-[20px] text-brand-ink">You&apos;re on the list</h3>
        <p className="mt-2 text-[14px] text-brand-ink/70">
          We&apos;ll email{" "}
          <span className="font-medium text-brand-ink">
            {confirmedEmail || "your email"}
          </span>{" "}
          as soon as your spot opens.
        </p>
        <button
          type="button"
          onClick={() => {
            setEmail("");
            setConfirmedEmail(null);
            setStatus("idle");
            setView("choices");
          }}
          className="mt-5 text-[13px] font-medium text-brand-purple hover:underline"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[380px] flex flex-col gap-2.5">
      {view === "choices" && (
        <>
          <ProviderButton
            icon={GoogleIcon}
            onClick={handleGoogleClick}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Joining…" : "Continue with Google"}
          </ProviderButton>
          <ProviderButton
            icon={EmailIcon}
            onClick={() => setView("email")}
            disabled={status === "submitting"}
          >
            Continue with Email
          </ProviderButton>
          {error && (
            <p className="text-center text-[12px] text-red-600 mt-1">{error}</p>
          )}
          {googleClientId && !googleReady && (
            <p className="text-center text-[11px] text-brand-ink/50 mt-1">
              Loading Google sign-in…
            </p>
          )}
        </>
      )}

      {view === "email" && (
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2.5" noValidate>
          <label htmlFor="waitlist-email" className="label-mono text-brand-ink/70">
            Work email
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="you@company.com"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "waitlist-email-error" : undefined}
            className={`h-11 w-full rounded-md border bg-white px-3 text-[14px] text-brand-ink outline-none transition-colors placeholder:text-brand-ink/35 ${
              error
                ? "border-red-500/70 focus:border-red-500"
                : "border-black/10 focus:border-brand-ink/40"
            }`}
          />
          {error && (
            <p id="waitlist-email-error" className="text-[12px] text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-md bg-brand-purple text-[14px] font-medium text-white hover:bg-brand-purple/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Joining…" : "Join waiting list"}
          </button>
          <button
            type="button"
            onClick={() => {
              setView("choices");
              setError(null);
            }}
            className="text-center text-[13px] text-brand-ink/60 hover:text-brand-ink"
          >
            ← Back
          </button>
        </form>
      )}

      <p className="text-center text-[12px] text-brand-ink/60 mt-3">
        By proceeding, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-brand-ink">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}

export default function AuthShell({ mode }: { mode: Mode }) {
  const isWaitlist = mode === "waitlist";
  const isLogin = mode === "login";

  const leftHeadline = isLogin
    ? "Welcome back to iNGEN"
    : "Welcome to iNGEN";
  const leftSubhead = isLogin
    ? "Access for invited iNGEN users"
    : "Proof-first hiring for teams. Career mapping for talent.";
  const rightHeadline = isLogin
    ? "Access your workspace"
    : isWaitlist
    ? "Join the waiting list"
    : "Get started for free";

  return (
    <main className="relative min-h-screen w-full bg-brand-bg flex items-center justify-center px-3 sm:px-4 pt-16 sm:pt-6 pb-4 sm:pb-6">
      <Link
        href="/"
        aria-label="Go back to home"
        title="Go back to home"
        className="group fixed top-4 left-4 sm:top-5 sm:left-5 z-30 inline-flex items-center h-10 rounded-full border border-black/[0.08] bg-white/85 text-brand-ink shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] backdrop-blur-md pl-[11px] pr-[11px] hover:pr-4 transition-all duration-300 ease-out hover:bg-white hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-[2px]"
        >
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="overflow-hidden whitespace-nowrap text-[13px] font-medium max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100 group-hover:ml-1.5 transition-[max-width,opacity,margin] duration-300 ease-out">
          Go back
        </span>
      </Link>

      <div className="w-full max-w-[880px] grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-stretch">
        {/* LEFT: Welcome card */}
        <div className="order-2 lg:order-1 relative rounded-2xl border border-black/[0.06] bg-[#f1eef1] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7 flex flex-col shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)]">
          {/* Inner-edge seam shadow on the right (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-3 right-0 w-3 hidden lg:block"
            style={{
              background:
                "linear-gradient(to left, rgba(0,0,0,0.05), rgba(0,0,0,0))",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          />
          <div className="text-center">
            <h1
              className="font-display leading-[1.15] text-brand-ink"
              style={{ fontSize: "clamp(20px, 2.2vw, 24px)" }}
            >
              {leftHeadline}
            </h1>
            <p
              className="mt-1.5 text-brand-ink/70 leading-snug"
              style={{ fontSize: "clamp(12px, 1.05vw, 13px)" }}
            >
              {leftSubhead}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center mt-2 sm:mt-3 mb-7 sm:mb-9">
            <AuthGlobe />
          </div>

          <IntegrationsMarquee />
        </div>

        {/* RIGHT: Auth panel */}
        <div className="order-1 lg:order-2 relative rounded-2xl border border-black/[0.06] bg-white px-5 py-5 sm:px-6 sm:py-6 lg:px-9 lg:py-7 flex flex-col shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)]">
          {/* Inner-edge seam shadow on the left (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-3 left-0 w-3 hidden lg:block"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.05), rgba(0,0,0,0))",
              borderTopLeftRadius: "1rem",
              borderBottomLeftRadius: "1rem",
            }}
          />
          <div className="flex justify-center">
            <Link href="/" aria-label="iNGEN home" className="inline-flex">
              <Logo />
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2
              className="text-center font-display leading-tight text-brand-ink mt-3 mb-5"
              style={{ fontSize: "clamp(18px, 1.9vw, 22px)" }}
            >
              {rightHeadline}
            </h2>

            {isWaitlist ? (
              <WaitlistPanel />
            ) : (
              <div className="mx-auto w-full max-w-[380px] flex flex-col gap-2.5">
                <p className="text-center text-sm leading-relaxed text-brand-ink/75">
                  Use the workspace link in your invitation email. If you need help finding it, contact support.
                </p>
                <Link href="/resources/help" className="btn-outline mx-auto mt-2">Get access help</Link>

                <div className="mt-4 text-center text-[13px] text-brand-ink/70">
                  New to iNGen?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-brand-purple hover:underline"
                  >
                    Join the waitlist
                  </Link>
                </div>
              </div>
            )}
          </div>
          {!isWaitlist && <PolicyLinks className="mt-6 justify-center text-brand-ink/75" />}
        </div>
      </div>
    </main>
  );
}
