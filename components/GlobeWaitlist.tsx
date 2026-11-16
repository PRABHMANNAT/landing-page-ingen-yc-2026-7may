"use client";

import {
  useState,
  useMemo,
  Component,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAudience } from "./AudienceContext";

const SIGNUP_URL = "/signup";

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

const World = dynamic(
  () => import("./ui/globe").then((m) => m.World),
  { ssr: false }
);

function GlobeFallback({ tone }: { tone: "dark" | "light" }) {
  return (
    <img src={`/editorial/globe-${tone === "dark" ? "recruiter" : "student"}.webp`} alt=""
      width={620} height={620} className="mx-auto w-full max-w-[260px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[500px]" />
  );
}

class GlobeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function ThemedGlobe({ tone }: { tone: "dark" | "light" }) {

  const { globeConfig, sampleArcs } = useMemo(() => {
    if (tone === "dark") {
      // Recruiter / dark — brand purple palette
      const colors = ["#B054E7", "#DA60D4", "#9B51E0"];
      return {
        globeConfig: {
          pointSize: 4,
          globeColor: "#2A232A",
          showAtmosphere: true,
          atmosphereColor: "#B054E7",
          atmosphereAltitude: 0.12,
          emissive: "#1D161D",
          emissiveIntensity: 0.18,
          shininess: 0.9,
          polygonColor: "rgba(238,232,253,0.55)",
          ambientLight: "#B054E7",
          directionalLeftLight: "#ffffff",
          directionalTopLight: "#ffffff",
          pointLight: "#EEE8FD",
          arcTime: 1400,
          arcLength: 0.9,
          rings: 1,
          maxRings: 3,
          initialPosition: { lat: 22.3193, lng: 114.1694 },
          autoRotate: true,
          autoRotateSpeed: 0.5,
        },
        sampleArcs: buildArcs(colors),
      };
    }
    // Student / light — forge amber + indigo palette
    const colors = ["#F5A623", "#6366F1", "#7DD3C0"];
    return {
      globeConfig: {
        pointSize: 4,
        globeColor: "#1A1A1F",
        showAtmosphere: true,
        atmosphereColor: "#F5A623",
        atmosphereAltitude: 0.12,
        emissive: "#0E0E10",
        emissiveIntensity: 0.2,
        shininess: 0.9,
        polygonColor: "rgba(245,239,230,0.7)",
        ambientLight: "#F5A623",
        directionalLeftLight: "#FFB347",
        directionalTopLight: "#ffffff",
        pointLight: "#FBF7EF",
        arcTime: 1400,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        initialPosition: { lat: 22.3193, lng: 114.1694 },
        autoRotate: true,
        autoRotateSpeed: 0.5,
      },
      sampleArcs: buildArcs(colors),
    };
  }, [tone]);

  return (
    <GlobeErrorBoundary fallback={<GlobeFallback tone={tone} />}>
      <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[500px] mx-auto">
        <div className="absolute inset-0">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </GlobeErrorBoundary>
  );
}

function buildArcs(colors: string[]) {
  const pick = () => colors[Math.floor(Math.random() * colors.length)];
  return [
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: pick() },
    { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: pick() },
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: pick() },
    { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: pick() },
    { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: pick() },
    { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: pick() },
    { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: pick() },
    { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: pick() },
    { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: pick() },
    { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: pick() },
    { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: pick() },
    { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: pick() },
    { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: pick() },
    { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: pick() },
    { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: pick() },
    { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7, color: pick() },
    { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: pick() },
    { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: pick() },
    { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: pick() },
    { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: pick() },
    { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: pick() },
    { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: pick() },
    { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: pick() },
    { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: pick() },
    { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: pick() },
    { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: pick() },
    { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: pick() },
    { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: pick() },
    { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: pick() },
    { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: pick() },
    { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: pick() },
    { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2, color: pick() },
    { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: pick() },
    { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: pick() },
    { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: pick() },
    { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3, color: pick() },
    { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: pick() },
    { order: 13, startLat: 11.986597, startLng: 8.571831, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: pick() },
    { order: 13, startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1, color: pick() },
    { order: 14, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3, color: pick() },
  ];
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

const EmailIconLight = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M3.5 6.5L12 13L20.5 6.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,24}$/;

function validateEmailQuick(raw: string): { ok: boolean; reason?: string } {
  const email = raw.trim().toLowerCase();
  if (!email) return { ok: false, reason: "Please enter your email." };
  if (!EMAIL_REGEX.test(email))
    return { ok: false, reason: "Please enter a valid email address." };
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*                           RECRUITER (dark) form                             */
/* -------------------------------------------------------------------------- */

function RecruiterWaitlistForm() {
  const [view, setView] = useState<"choices" | "email">("choices");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [confirmedEmail, setConfirmedEmail] = useState<string | null>(null);
  const googleClientRef = useRef<GoogleTokenClient | null>(null);
  const [googleReady, setGoogleReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const submitWaitlist = useCallback(
    async (
      payload:
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
        setConfirmedEmail(
          data.email || (payload.type === "email" ? payload.email : null)
        );
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
    const result = validateEmailQuick(email);
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

  // Shared glassmorphism button shell
  const glassBtn =
    "group relative w-full inline-flex items-center justify-center gap-3 h-12 rounded-xl " +
    "border border-white/15 bg-white/[0.06] text-white text-[14px] font-medium " +
    "backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(176,84,231,0.35)] " +
    "transition-all duration-300 ease-out " +
    "hover:-translate-y-[1.5px] hover:bg-white/[0.12] hover:border-brand-lavender/60 " +
    "hover:shadow-[0_14px_40px_-12px_rgba(176,84,231,0.55)] " +
    "active:translate-y-0 active:shadow-[0_4px_18px_-10px_rgba(176,84,231,0.45)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender/60 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  const Eyebrow = (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-brand-lavender backdrop-blur-md">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-lavender shadow-[0_0_10px_2px_rgba(176,84,231,0.7)]" />
      iNGEN
    </span>
  );

  if (status === "success") {
    return (
      <div className="space-y-6">
        {Eyebrow}
        <h2 className="font-display text-[40px] md:text-[52px] leading-[1.02] tracking-tightest text-white">
          You&rsquo;re on the list.
        </h2>
        <p className="text-[16px] leading-relaxed text-white/75 max-w-md">
          We&rsquo;ll email{" "}
          <span className="font-medium text-white">
            {confirmedEmail || "you"}
          </span>{" "}
          when your spot is ready.
        </p>
        <div className="pt-2">
          <Link
            href={SIGNUP_URL}
            className="inline-flex items-center gap-2 rounded-full border border-brand-lavender/40 bg-brand-lavender/[0.12] px-4 py-2 text-[13px] font-medium text-brand-lavender backdrop-blur-md transition-all duration-300 hover:bg-brand-lavender/20 hover:border-brand-lavender/70 hover:shadow-[0_8px_24px_-10px_rgba(176,84,231,0.55)]"
          >
            Continue to waitlist page
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {Eyebrow}

      <h2 className="font-display text-[40px] md:text-[52px] leading-[1.02] tracking-tightest text-white">
        Join the waitlist
      </h2>

      <p className="text-[16px] leading-relaxed max-w-md text-white/75">
        Get early access to the proof-first hiring stack — Aristotle, Sherlock,
        and the iNGEN workflow.
      </p>

      <div className="flex flex-col gap-3 max-w-md pt-1">
        {view === "choices" && (
          <>
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={status === "submitting"}
              className={glassBtn}
            >
              <span className="inline-flex transition-transform duration-300 group-hover:scale-110">
                {GoogleIcon}
              </span>
              <span>
                {status === "submitting" ? "Joining…" : "Continue with Google"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setView("email");
                setError(null);
              }}
              disabled={status === "submitting"}
              className={glassBtn}
            >
              <span className="inline-flex transition-transform duration-300 group-hover:scale-110 text-white">
                {EmailIconLight}
              </span>
              <span>Continue with Email</span>
            </button>
          </>
        )}

        {view === "email" && (
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col gap-3"
            noValidate
          >
            <div
              className={`flex items-center gap-2 rounded-xl border bg-white/[0.06] p-1.5 backdrop-blur-xl transition-all duration-300 ${
                error
                  ? "border-red-400/60 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
                  : "border-white/15 focus-within:border-brand-lavender/70 focus-within:shadow-[0_0_0_3px_rgba(176,84,231,0.18)]"
              }`}
            >
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                autoFocus
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="you@company.com"
                aria-invalid={error ? "true" : "false"}
                className="flex-1 bg-transparent outline-none px-3 py-2 text-[15px] text-white placeholder:text-white/45"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-[13px] font-semibold text-brand-ink transition-all duration-200 hover:bg-brand-lavender hover:text-white hover:shadow-[0_8px_24px_-10px_rgba(176,84,231,0.7)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Joining…" : "Join"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setView("choices");
                setError(null);
              }}
              className="self-start text-[13px] text-white/55 hover:text-white transition-colors"
            >
              ← Back to sign-in options
            </button>
          </form>
        )}

        {error && (
          <p className="text-[12.5px] text-red-300/90" role="alert">
            {error}
          </p>
        )}

        {googleClientId && !googleReady && view === "choices" && (
          <p className="text-[11.5px] text-white/45">Loading Google sign-in…</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-sm text-white/75">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-lavender shadow-[0_0_8px_1px_rgba(176,84,231,0.6)]" />
          We’ll email you when access opens.
        </span>

        <Link
          href={SIGNUP_URL}
          className="group inline-flex items-center gap-1.5 rounded-full border border-brand-lavender/40 bg-brand-lavender/[0.12] px-3 py-1 text-[12px] font-medium text-brand-lavender backdrop-blur-md transition-all duration-300 hover:bg-brand-lavender/25 hover:border-brand-lavender/80 hover:text-white hover:shadow-[0_8px_24px_-10px_rgba(176,84,231,0.6)]"
        >
          Open signup
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <p className="text-[11.5px] text-white/50 pt-1">
        By proceeding, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-2 hover:text-white"
        >
          Terms of Service
        </Link>
        .
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            STUDENT (light) form                             */
/* -------------------------------------------------------------------------- */

function StudentWaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const result = await response.json();
      if (response.ok && result.ok) setSubmitted(true);
      else setError(result.error || "Please try again in a moment.");
    } catch {
      setError("Could not reach the waitlist. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-3">
        <span className="label-mono text-forge-amber">Early access</span>
        <h2 className="font-display text-[30px] sm:text-[36px] md:text-[40px] lg:text-[46px] leading-[1.05] tracking-tightest text-forge-ink">
          You&rsquo;re on the list.
        </h2>
        <p className="text-[15px] sm:text-[16px] leading-relaxed text-forge-ink/70">
          We&rsquo;ll email <span className="font-medium break-all">{email}</span> when your
          spot is ready.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-2xl border border-forge-line bg-[#fffaf2] p-6 shadow-sm sm:p-8">
      <span className="label-mono text-[#865122]">Early access</span>
      <h2 className="font-display text-[30px] sm:text-[36px] md:text-[40px] lg:text-[46px] leading-[1.05] tracking-tightest text-forge-ink">
        Join the FORGE waitlist
      </h2>
      <p className="text-[15px] sm:text-[16px] leading-relaxed max-w-md text-forge-ink/70">
        Get access to Aristotle for roadmaps and profiles, Columbus for job discovery,
        and Collections for organising your applications.
      </p>

      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row sm:items-center gap-2 rounded-md p-1.5 max-w-md bg-white border border-forge-line shadow-sm"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@university.edu"
          aria-label="Email address"
          autoComplete="email"
          className="flex-1 min-w-0 bg-transparent outline-none px-3 py-2 text-[15px] text-forge-ink placeholder:text-forge-mute"
        />
        <button type="submit" disabled={pending} className="btn-amber whitespace-nowrap w-full sm:w-auto disabled:opacity-60">
          {pending ? "Joining…" : "Join waitlist"}
        </button>
      </form>
      {error && <p role="alert" className="text-sm text-red-800">{error}</p>}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Section shell                                */
/* -------------------------------------------------------------------------- */

export default function GlobeWaitlist() {
  const { audience } = useAudience();
  const isStudent = audience === "student";

  return (
    <section
      className={`relative overflow-hidden ${
        isStudent ? "bg-[#F5EDE0] text-forge-ink dotted-grid-dim" : "bg-brand-deep text-white"
      }`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-32 pointer-events-none ${
          isStudent ? "halftone-light-top" : "halftone-top opacity-80"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-32 pointer-events-none ${
          isStudent ? "halftone-light-bottom" : "halftone-bottom opacity-80"
        }`}
      />

      {/* Recruiter ambient glow */}
      {!isStudent && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full blur-[120px] opacity-40"
            style={{ background: "radial-gradient(circle, #B054E7 0%, transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-10 h-[360px] w-[360px] rounded-full blur-[120px] opacity-30"
            style={{ background: "radial-gradient(circle, #DA60D4 0%, transparent 70%)" }}
          />
        </>
      )}

      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 py-14 sm:py-20 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <motion.div
            className="order-2 md:order-1 relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative w-full flex items-center justify-center h-[280px] sm:h-[360px] md:h-[460px] lg:h-[520px]">
              <ThemedGlobe key={isStudent ? "light" : "dark"} tone={isStudent ? "light" : "dark"} />
            </div>

            {isStudent && (
              <div className="mt-3 sm:mt-4 max-w-md text-center px-2">
                <h3 className="font-display text-[22px] sm:text-[26px] md:text-[30px] leading-[1.1] tracking-tightest text-forge-ink">
                  From job-hunter to evidence-backed candidate.
                </h3>
                <p className="mt-2 sm:mt-3 text-[14px] sm:text-[15px] leading-relaxed text-forge-ink/70">
                  Plan the path. Prove the work. Scout the roles. Walk in
                  prepared.
                </p>
              </div>
            )}

            {!isStudent && (
              <div className="mt-4 md:mt-2 flex justify-center">
                <Link
                  href={SIGNUP_URL}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[13.5px] font-medium text-white backdrop-blur-xl shadow-[0_10px_30px_-12px_rgba(176,84,231,0.45)] transition-all duration-300 hover:-translate-y-[1.5px] hover:bg-white/[0.12] hover:border-brand-lavender/70 hover:shadow-[0_16px_40px_-12px_rgba(176,84,231,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lavender/60"
                >
                  Go to signup page
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </motion.div>

          <div className="order-1 md:order-2">
            {isStudent ? <StudentWaitlistForm /> : <RecruiterWaitlistForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
