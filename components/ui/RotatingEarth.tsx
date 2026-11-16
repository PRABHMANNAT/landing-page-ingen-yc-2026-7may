"use client";

import { useEffect, useRef, useState } from "react";

type Point = [number, number, number];
const radians = Math.PI / 180;
const size = 620;
const center = size / 2;
const radius = 274;
const tilt = 18 * radians;
const cosTilt = Math.cos(tilt);
const sinTilt = Math.sin(tilt);

function unitPoint(latitude: number, longitude: number): Point {
  const lat = latitude * radians;
  const lng = longitude * radians;
  return [Math.cos(lat) * Math.sin(lng), Math.sin(lat), Math.cos(lat) * Math.cos(lng)];
}

const routes = [
  [[51.5, 0], [28.6, 77.2]],
  [[28.6, 77.2], [1.3, 103.8]],
  [[1.3, 103.8], [-33.9, 151.2]],
  [[40.7, -74], [51.5, 0]],
].map(([from, to]) => {
  const a = unitPoint(from[0], from[1]);
  const b = unitPoint(to[0], to[1]);
  return Array.from({ length: 32 }, (_, i) => {
    const t = i / 31;
    const [x, y, z] = a.map((value, j) => value * (1 - t) + b[j] * t);
    const scale = (1 + 0.14 * Math.sin(Math.PI * t)) / Math.hypot(x, y, z);
    return [x * scale, y * scale, z * scale] as Point;
  });
});

export default function RotatingEarth({ tone }: { tone: "dark" | "light" }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const longitude = useRef(0.9);
  const student = tone === "light";

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context || reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const request = new AbortController();
    const dark = student ? "#241911" : "#191327";
    const light = student ? "#864c22" : "#4a2279";
    const ink = student ? "#ffcf81" : "#d8b0ff";
    const ocean = context.createRadialGradient(215, 170, 12, center, center, radius);
    ocean.addColorStop(0, light);
    ocean.addColorStop(1, dark);
    let frame = 0;
    let last = 0;
    let visible = true;
    let land: Point[] = [];

    function draw(angle: number) {
      if (!context) return;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      function project([x, y, z]: Point): Point {
        const front = z * cos + x * sin;
        return [
          center + radius * (x * cos - z * sin),
          center - radius * (y * cosTilt - front * sinTilt),
          front * cosTilt + y * sinTilt,
        ];
      }
      context.clearRect(0, 0, size, size);
      context.beginPath();
      context.arc(center, center, radius, 0, 2 * Math.PI);
      context.fillStyle = ocean;
      context.fill();
      context.strokeStyle = ink;
      context.globalAlpha = 0.35;
      context.stroke();

      context.fillStyle = ink;
      for (const point of land) {
        const [x, y, depth] = project(point);
        if (depth <= 0) continue;
        context.globalAlpha = 0.32 + depth * 0.68;
        context.beginPath();
        context.arc(x, y, 0.8 + depth * 1.1, 0, 2 * Math.PI);
        context.fill();
      }

      context.globalAlpha = 0.76;
      context.lineWidth = 1.5;
      for (const route of routes) {
        context.beginPath();
        let visibleSegment = false;
        for (const point of route) {
          const [x, y, depth] = project(point);
          if (depth < 0) {
            visibleSegment = false;
          } else {
            if (visibleSegment) context.lineTo(x, y);
            else context.moveTo(x, y);
            visibleSegment = true;
          }
        }
        context.stroke();
      }
      context.globalAlpha = 1;
    }

    function animate(now: number) {
      if (now - last >= 32) {
        longitude.current += Math.min(now - last, 50) * 0.00023;
        draw(longitude.current);
        last = now;
      }
      frame = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && land.length) frame = requestAnimationFrame(animate);
    });
    observer.observe(element);
    fetch("/editorial/globe-land.json", { signal: request.signal })
      .then(response => {
        if (!response.ok) throw new Error("Land data unavailable");
        return response.json() as Promise<[number, number][]>;
      })
      .then(points => {
        if (request.signal.aborted) return;
        land = points.map(([latitude, lng]) => unitPoint(latitude, lng));
        draw(longitude.current);
        setReady(true);
        if (visible) frame = requestAnimationFrame(animate);
      })
      .catch(() => { /* The prerendered globe remains visible if land data fails. */ });

    return () => {
      request.abort();
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, student]);

  const showCanvas = ready && !reducedMotion;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[500px]">
      <img src={`/editorial/globe-${student ? "student" : "recruiter"}.webp`} alt=""
        width={size} height={size} className={showCanvas ? "invisible" : undefined} />
      <canvas ref={canvas} width={size} height={size} aria-hidden="true"
        className={`pointer-events-none absolute inset-0 h-full w-full ${showCanvas ? "" : "invisible"}`} />
    </div>
  );
}
