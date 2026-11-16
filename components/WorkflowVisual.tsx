"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronRight, ListChecks } from "lucide-react";

type Props = {
  title: string;
  steps: readonly string[];
  details?: readonly string[];
  className?: string;
};

export default function WorkflowVisual({ title, steps, details, className = "" }: Props) {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const allDone = completed.length === steps.length;

  function completeStep() {
    const next = completed.includes(active) ? completed : [...completed, active];
    setCompleted(next);
    const remaining = steps.findIndex((_, index) => !next.includes(index));
    if (remaining !== -1) setActive(remaining);
  }

  return (
    <section aria-label={title} className={`overflow-hidden rounded-2xl border border-[#ded4c8] bg-[#faf5ee] ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ded4c8] bg-white/70 px-4 py-3 sm:px-5">
        <p className="flex min-w-0 items-center gap-2 text-sm font-semibold leading-5 text-brand-ink">
          <ListChecks size={17} className="shrink-0 text-[#87503c]" aria-hidden /> {title}
        </p>
        <span className="text-xs tabular-nums text-brand-muted">{completed.length} of {steps.length} checked</span>
      </div>
      <div className="h-1 bg-[#eee0d1]" aria-hidden>
        <div className="h-full bg-[#a85b46] motion-safe:transition-[width]" style={{ width: `${completed.length / steps.length * 100}%` }} />
      </div>
      <div className="px-4 py-4 sm:px-5">
        <ol className="space-y-1.5">
          {steps.map((step, index) => {
            const selected = active === index;
            const done = completed.includes(index);
            return <li key={step}>
              <button type="button" aria-pressed={selected} onClick={() => setActive(index)}
                className={`flex min-h-10 w-full items-center gap-2.5 rounded-lg border px-2.5 py-1.5 text-left text-sm leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87503c] ${selected ? "border-[#c69b87] bg-white font-semibold text-brand-ink" : "border-transparent text-brand-muted hover:bg-white/80"}`}>
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs ${done ? "bg-[#dce9df] text-[#315b40]" : "bg-[#efdfd0] text-[#734330]"}`} aria-hidden>
                  {done ? <Check size={13} /> : index + 1}
                </span>
                {step}<ChevronRight size={14} className="ml-auto shrink-0 opacity-60" aria-hidden />
                {done && <span className="sr-only">, checked</span>}
              </button>
            </li>;
          })}
        </ol>
        <div className="mt-3 border-t border-[#ded4c8] pt-3">
          <p aria-live="polite" className="text-sm leading-6 text-brand-muted">
            {allDone ? "Checklist complete." : details?.[active] ?? steps[active]}
          </p>
          {allDone
            ? <button type="button" onClick={() => { setCompleted([]); setActive(0); }} className="mt-2 text-sm font-semibold text-[#87503c] underline underline-offset-4">Reset checklist</button>
            : <button type="button" onClick={completeStep} className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-md bg-brand-ink px-3 text-xs font-semibold text-white hover:bg-[#423731] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87503c]">
              {completed.includes(active) ? "Continue" : "Mark step complete"} <ArrowRight size={14} aria-hidden />
            </button>}
        </div>
      </div>
    </section>
  );
}
