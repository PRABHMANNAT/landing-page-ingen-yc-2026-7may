export default function WorkflowVisual({ title, steps, className = "" }: {
  title: string;
  steps: readonly string[];
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-black/5 bg-[#f1e9df] p-4 sm:p-5 ${className}`}>
      <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 border-b border-black/10 pb-3">
          <span aria-hidden className="h-2 w-2 rounded-full bg-brand-purple" />
          <p className="text-sm font-semibold text-brand-ink">{title}</p>
        </div>
        <ol className="mt-3 grid gap-2">
          {steps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 rounded-md bg-brand-bg px-3 py-2 text-sm text-brand-ink/85">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-semibold">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
