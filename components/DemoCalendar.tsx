"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Mail } from "lucide-react";

const timeZone = "Australia/Sydney";
const slots = ["10:00 am", "11:30 am", "2:00 pm", "3:30 pm"];
const weekdayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayLength = 86_400_000;
const formatMonth = new Intl.DateTimeFormat("en-AU", { month: "long", year: "numeric", timeZone: "UTC" });
const formatDate = new Intl.DateTimeFormat("en-AU", { dateStyle: "full", timeZone: "UTC" });
const formatShortDate = new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", timeZone: "UTC" });
const dateInSydney = new Intl.DateTimeFormat("en-AU", {
  year: "numeric", month: "numeric", day: "numeric", timeZone,
});

// UTC values represent calendar dates in Sydney. They are not appointment timestamps.
function sydneyToday() {
  const fields = Object.fromEntries(dateInSydney.formatToParts(new Date()).map(({ type, value }) => [type, value]));
  return Date.UTC(Number(fields.year), Number(fields.month) - 1, Number(fields.day));
}

function monthStart(date: number, offset = 0) {
  const day = new Date(date);
  return Date.UTC(day.getUTCFullYear(), day.getUTCMonth() + offset, 1);
}

function isWeekday(date: number) {
  const day = new Date(date).getUTCDay();
  return day > 0 && day < 6;
}

export default function DemoCalendar() {
  const [today, setToday] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [date, setDate] = useState<number>();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const current = sydneyToday();
    setToday(current);
    setMonth(monthStart(current));
  }, []);

  if (today === undefined || month === undefined) {
    return <p role="status" className="min-h-72 p-8 text-sm text-brand-muted">Loading the calendar…</p>;
  }

  const firstRequestDay = today + 30 * dayLength;
  const blockedThrough = firstRequestDay - dayLength;
  const lastRequestDay = today + 120 * dayLength;
  const days = (monthStart(month, 1) - month) / dayLength;
  const firstWeekday = (new Date(month).getUTCDay() + 6) % 7;
  const email = date !== undefined && time
    ? "mailto:contact@ingenworkspace.com?subject=iNGEN%20demo%20request&body=" + encodeURIComponent(
      `Hi iNGEN,\n\nI'd like a 30-minute product demo. My preferred time is ${formatDate.format(date)} at ${time} Sydney time. Please let me know if that works.\n\nThanks!`,
    )
    : undefined;

  function showMonth(value: number) {
    setMonth(value);
    setDate(undefined);
    setTime(undefined);
  }

  return (
    <section aria-labelledby="demo-calendar-title" className="min-w-0 p-5 sm:p-8">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#ead9cc] bg-[#faeee4] text-[#87503c]">
          <CalendarDays size={18} aria-hidden />
        </div>
        <div>
          <h2 id="demo-calendar-title" className="font-display text-xl sm:text-2xl">Choose a demo time</h2>
          <p className="mt-1 text-sm text-brand-muted">All dates and times are shown in Sydney time.</p>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-[#ead9cc] bg-[#faf3eb] p-4 text-sm text-brand-muted">
        <p className="font-semibold text-brand-ink">The next 30 days are unavailable</p>
        <p className="mt-1 leading-6">The calendar is closed through {formatShortDate.format(blockedThrough)}. You can request a later weekday.</p>
        {month < monthStart(firstRequestDay) && (
          <button type="button" onClick={() => showMonth(monthStart(firstRequestDay))} className="mt-2 min-h-8 font-semibold text-[#87503c] underline underline-offset-4">
            Jump to the first request month
          </button>
        )}
      </div>

      <div className="rounded-xl border border-forge-line p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-semibold" aria-live="polite">{formatMonth.format(month)}</h3>
          <div className="flex gap-1">
            <button type="button" aria-label="Previous month" disabled={month <= monthStart(today)} onClick={() => showMonth(monthStart(month, -1))}
              className="grid size-9 place-items-center rounded-lg border border-forge-line hover:bg-brand-bg disabled:opacity-35"><ChevronLeft size={17} aria-hidden /></button>
            <button type="button" aria-label="Next month" disabled={month >= monthStart(lastRequestDay)} onClick={() => showMonth(monthStart(month, 1))}
              className="grid size-9 place-items-center rounded-lg border border-forge-line hover:bg-brand-bg disabled:opacity-35"><ChevronRight size={17} aria-hidden /></button>
          </div>
        </div>
        <div aria-hidden className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-brand-muted">
          {weekdayNames.map(day => <span key={day}>{day}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1" role="group" aria-label={`Dates in ${formatMonth.format(month)}`}>
          {Array.from({ length: days }, (_, index) => {
            const day = month + index * dayLength;
            const requestable = day >= firstRequestDay && day <= lastRequestDay && isWeekday(day);
            const selected = day === date;
            return (
              <button type="button" key={day} disabled={!requestable}
                aria-label={`${formatDate.format(day)}${requestable ? "" : ", unavailable"}`}
                aria-pressed={requestable ? selected : undefined}
                onClick={() => { setDate(day); setTime(undefined); }}
                style={index === 0 ? { gridColumnStart: firstWeekday + 1 } : undefined}
                className={`min-h-9 rounded-lg border text-sm tabular-nums focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#87503c] sm:min-h-10 ${selected ? "border-brand-ink bg-brand-ink font-semibold text-white" : requestable ? "border-[#ead9cc] bg-[#fbf2e9] font-semibold text-[#77402e] hover:border-[#a56a53]" : "cursor-default border-transparent bg-[#f6f4f1] text-brand-muted line-through"}`}>
                {index + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-brand-muted">Crossed-out dates are unavailable. Highlighted dates accept requests.</p>
      </div>

      {date !== undefined && (
        <fieldset className="mt-5">
          <legend className="flex items-center gap-2 text-sm font-semibold">
            <Clock size={15} aria-hidden /> Preferred time on {formatShortDate.format(date)}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {slots.map(slot => (
              <button key={slot} type="button" aria-pressed={slot === time} onClick={() => setTime(slot)}
                className={`min-h-10 rounded-lg border px-3 text-sm ${slot === time ? "border-brand-ink bg-brand-ink text-white" : "border-forge-line hover:bg-brand-bg"}`}>
                {slot}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5 border-t border-forge-line pt-4">
        {email ? (
          <a href={email} className="workflow-action workflow-action-primary"><Mail size={16} aria-hidden /> Open email draft</a>
        ) : (
          <p className="text-sm font-medium text-brand-ink">Select a highlighted date and a time to prepare your request.</p>
        )}
        <p className="mt-2 text-xs leading-5 text-brand-muted">Send the draft from your email app. Your time is only confirmed when the team replies.</p>
      </div>
    </section>
  );
}
