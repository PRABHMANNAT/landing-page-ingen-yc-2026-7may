"use client";

type Cell = boolean | string;

type Row = { label: string; tooltip?: string; cells: [Cell, Cell, Cell, Cell] };

type Group = { title: string; rows: Row[] };

const PLAN_NAMES = ["Explorer", "Starter", "Growth", "Business"] as const;

const GROUPS: Group[] = [
  {
    title: "Workspace",
    rows: [
      { label: "Active roles", cells: ["1", "5 / seat", "Unlimited", "Unlimited"] },
      { label: "Seats included", cells: ["1", "1", "Up to 25", "Custom"] },
      { label: "Shared collections", cells: [false, true, true, true] },
      { label: "Workspace branding", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Search (Aristotle)",
    rows: [
      {
        label: "Searches / month",
        tooltip: "Aristotle ranks proof, not keywords.",
        cells: ["25", "1,000 / seat", "Unlimited", "Unlimited"],
      },
      { label: "Role-brief drafts", cells: [true, true, true, true] },
      { label: "Saved search alerts", cells: [false, true, true, true] },
      { label: "Custom proof rubrics", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Proof data (Sherlock)",
    rows: [
      { label: "GitHub depth", cells: ["Basic", "Standard", "Deep", "Deep + custom"] },
      {
        label: "University + club agents",
        tooltip: "Verifies affiliations and leadership history.",
        cells: [false, false, true, true],
      },
      { label: "Work-history triangulation", cells: [false, true, true, true] },
      { label: "Citation export", cells: [false, true, true, true] },
    ],
  },
  {
    title: "ATS, CRM & exports",
    rows: [
      { label: "CSV export", cells: [true, true, true, true] },
      { label: "Greenhouse / Lever sync", cells: [false, "One-way", "Bi-directional", "Bi-directional"] },
      { label: "Custom CRM webhook", cells: [false, false, true, true] },
      { label: "API access", cells: [false, false, "Read-only", "Full"] },
    ],
  },
  {
    title: "Outreach",
    rows: [
      { label: "Email sequencing", cells: [false, "100 / month", "Unlimited", "Unlimited"] },
      { label: "Reply detection", cells: [false, true, true, true] },
      { label: "Multi-channel (LinkedIn + email)", cells: [false, false, true, true] },
      { label: "AI-drafted follow-ups", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Security & reporting",
    rows: [
      { label: "SOC 2 evidence", cells: [false, false, "On request", "Included"] },
      { label: "SAML SSO", cells: [false, false, false, true] },
      { label: "SCIM provisioning", cells: [false, false, false, true] },
      { label: "Audit log", cells: [false, false, "30 days", "1 year"] },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Community + docs", cells: [true, true, true, true] },
      { label: "Email support", cells: [false, true, true, true] },
      { label: "Slack channel", cells: [false, false, true, true] },
      { label: "Dedicated CSM", cells: [false, false, false, true] },
    ],
  },
];

export default function CompareTable() {
  return (
    <section className="py-20 md:py-24 bg-brand-bg">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="label-mono text-brand-purple">[03] Compare</span>
            <h2 className="mt-2 font-display text-[36px] md:text-[48px] tracking-tight leading-[1.05] text-brand-ink">
              Compare plans &amp; features
            </h2>
          </div>
          <p className="text-[15px] text-brand-muted max-w-md">
            Every plan ships with proof-first defaults. Upgrade only when you need
            deeper signals or org-wide controls.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-hairline bg-white">
          <table className="w-full border-collapse min-w-[860px]">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-hairline">
                <th className="text-left p-5 w-[28%]">
                  <span className="label-mono text-brand-mute">Feature</span>
                </th>
                {PLAN_NAMES.map((p, i) => (
                  <th key={p} className={`p-5 text-left ${i === 2 ? "bg-brand-tint/40" : ""}`}>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-[20px] text-brand-ink">{p}</span>
                        {i === 2 && (
                          <span className="label-mono bg-brand-purple text-white px-2 py-0.5 rounded">
                            Popular
                          </span>
                        )}
                      </div>
                      <a href="/signup" className="btn-dark !py-2 !text-[11px] w-fit">
                        {i === 3 ? "Contact us" : "Get started"}
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {GROUPS.map((g) => (
                <GroupBlock key={g.title} group={g} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function GroupBlock({ group }: { group: Group }) {
  return (
    <>
      <tr className="bg-brand-bg/60">
        <td colSpan={5} className="p-4 px-5">
          <span className="label-mono text-brand-purple">{group.title}</span>
        </td>
      </tr>
      {group.rows.map((row, i) => (
        <tr
          key={row.label}
          className={`border-t border-hairline ${
            i % 2 === 1 ? "bg-brand-bg/30" : ""
          }`}
        >
          <td className="p-5 text-[14px] text-brand-ink">
            {row.tooltip ? (
              <span className="group relative inline-block underline decoration-dotted decoration-brand-mute underline-offset-4 cursor-help">
                {row.label}
                <span className="pointer-events-none absolute left-0 -top-2 -translate-y-full bg-white border border-hairline rounded-md px-3 py-2 text-[12px] text-brand-muted shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition w-[220px] z-20">
                  {row.tooltip}
                </span>
              </span>
            ) : (
              row.label
            )}
          </td>
          {row.cells.map((c, idx) => (
            <td
              key={idx}
              className={`p-5 text-[14px] text-brand-ink ${
                idx === 2 ? "bg-brand-tint/40" : ""
              }`}
            >
              <CellValue value={c} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <svg
        aria-hidden
        width="18"
        height="18"
        viewBox="0 0 16 16"
        className="text-brand-magenta"
        fill="none"
      >
        <path
          d="M3 8.5L6.5 12L13 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (value === false) {
    return <span className="text-brand-mute">—</span>;
  }
  return <span>{value}</span>;
}
