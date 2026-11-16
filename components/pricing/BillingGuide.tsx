"use client";

import { useState } from "react";
import { PLANS } from "./PricingCards";

const paidPlans = PLANS.filter(plan => plan.monthly !== null && plan.monthly > 0);
const number = new Intl.NumberFormat("en-US");

export default function BillingGuide({ cycle }: { cycle: "monthly" | "yearly" }) {
  const [planName, setPlanName] = useState("Starter");
  const [seats, setSeats] = useState(1);
  const plan = paidPlans.find(option => option.name === planName) ?? paidPlans[0];
  const rate = (cycle === "monthly" ? plan.monthly : plan.yearly) ?? 0;
  const total = rate * seats * (cycle === "yearly" ? 12 : 1);

  return (
    <section aria-labelledby="billing-guide" className="mx-auto mb-14 max-w-[1320px] px-6">
      <div className="grid items-start gap-6 rounded-2xl border border-forge-line bg-white p-6 md:grid-cols-2 md:p-9">
        <div className="space-y-4 text-sm leading-7 text-brand-muted">
          <h2 id="billing-guide" className="font-display text-3xl text-brand-ink">How to compare plans</h2>
          <p>Start with the number of people who need a seat, then compare limits for active roles, searches, and collaboration. If you need administrative controls or an organisation-wide rollout, ask about the Business plan.</p>
          <p>Use the billing switch above to compare monthly and yearly billing. Annual plans display a rate per seat per month, with 12 months included in each annual billing period.</p>
          <p>Students who want to use FORGE can <a href="/resources/student-access" className="font-medium text-brand-ink underline underline-offset-4">check the student access guide</a> before choosing a recruiter plan.</p>
        </div>
        <div className="rounded-xl border border-forge-line bg-brand-bg p-5">
          <h3 className="font-semibold">Calculate a seat estimate</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <label>Plan<select value={planName} onChange={event => setPlanName(event.target.value)} className="mt-1 block min-h-10 w-full rounded-md border border-forge-line bg-white px-2">
              {paidPlans.map(option => <option key={option.name}>{option.name}</option>)}
            </select></label>
            <label>Seats<select value={seats} onChange={event => setSeats(Number(event.target.value))} className="mt-1 block min-h-10 w-full rounded-md border border-forge-line bg-white px-2">
              {Array.from({ length: 25 }, (_, index) => <option key={index}>{index + 1}</option>)}
            </select></label>
          </div>
          <p aria-live="polite" className="mt-4 text-lg font-semibold tabular-nums">{"$" + number.format(total)} per {cycle === "yearly" ? "year" : "month"}</p>
          <p className="mt-1 text-xs leading-5 text-brand-muted">Illustrative base-plan estimate before taxes or add-ons.</p>
        </div>
      </div>
    </section>
  );
}
