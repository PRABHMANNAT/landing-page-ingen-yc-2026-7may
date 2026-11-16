import type { MetadataRoute } from "next";
import { resources } from "@/data/resources";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.ingenworkspace.com";
  const routes = [
    "",
    "/features",
    "/pricing",
    "/signup",
    "/book-demo",
    "/privacy",
    "/terms",
    "/cookies",
    "/refunds",
    "/accessibility",
    "/trust",
    ...Object.keys(resources).map((slug) => "/resources/" + slug),
  ];
  return routes.map((route) => ({ url: base + route }));
}
