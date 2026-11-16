"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ingen.cookie-preferences";
const PrivacyChoicesContext = createContext<((trigger: HTMLButtonElement) => void) | null>(null);

export function CookieSettingsButton({ className }: { className?: string }) {
  const open = useContext(PrivacyChoicesContext);

  return (
    <button type="button" disabled={!open} className={className} onClick={(event) => open?.(event.currentTarget)}>
      Cookie settings
    </button>
  );
}

export default function PrivacyChoices({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<"analytics" | "essential" | null>();
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "analytics" || saved === "essential") {
        setChoice(saved);
        return;
      }
    } catch {
      // The controls still work during this visit if browser storage is unavailable.
    }
    setChoice(null);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open && trigger.current) heading.current?.focus();
  }, [open]);

  function openSettings(button: HTMLButtonElement) {
    trigger.current = button;
    if (open) heading.current?.focus();
    setOpen(true);
  }

  function dismiss() {
    setOpen(false);
    trigger.current?.focus();
    trigger.current = null;
  }

  function save(preference: "analytics" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Keep the preference in memory for this visit.
    }
    setChoice(preference);
    dismiss();
  }

  const buttonClass = "rounded-xl px-4 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  return (
    <PrivacyChoicesContext.Provider value={choice === undefined ? null : openSettings}>
      {open && (
        <section
          role="dialog"
          aria-labelledby="privacy-choices-title"
          aria-describedby="privacy-choices-description"
          onKeyDown={(event) => {
            if (event.key === "Escape" && choice) dismiss();
          }}
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto grid max-h-[calc(100dvh-1.5rem)] max-w-5xl gap-4 overflow-y-auto rounded-2xl border border-forge-line bg-brand-bg p-5 text-brand-ink shadow-[0_16px_60px_rgba(0,0,0,0.22)] sm:inset-x-5 sm:bottom-5 sm:grid-cols-[1fr_210px] sm:items-center sm:gap-8 sm:p-7"
        >
          <div>
            <p className="label-mono text-brand-muted">Privacy choices</p>
            <h2 id="privacy-choices-title" ref={heading} tabIndex={-1} className="mt-1 font-display text-2xl leading-tight focus:outline-none">
              Your privacy, your choice.
            </h2>
            <p id="privacy-choices-description" className="mt-2 text-sm leading-relaxed text-brand-muted">
              We use browser storage to remember your preferences. You can choose whether to allow optional website analytics. Analytics are currently off on this site.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
              <Link href="/cookies" className="underline underline-offset-4">Cookie policy</Link>
              <Link href="/privacy" className="underline underline-offset-4">Privacy policy</Link>
              {choice && <button type="button" onClick={dismiss} className="underline underline-offset-4">Close settings</button>}
            </div>
            {choice && <p className="mt-2 text-xs text-brand-muted">Saved preference: {choice === "analytics" ? "Allow analytics" : "Essential only"}</p>}
          </div>
          <div className="grid gap-2">
            <button type="button" className={`${buttonClass} border border-brand-ink/15 bg-brand-purple text-brand-ink hover:bg-brand-purple/85`} onClick={() => save("analytics")}>
              Allow analytics
            </button>
            <button type="button" className={`${buttonClass} bg-brand-ink text-white hover:bg-brand-muted`} onClick={() => save("essential")}>
              Use essential only
            </button>
          </div>
        </section>
      )}
      {children}
    </PrivacyChoicesContext.Provider>
  );
}
