import type { Metadata } from "next";
import "./globals.css";
import { AudienceProvider } from "@/components/AudienceContext";
import PrivacyChoices from "@/components/PrivacyChoices";

export const metadata: Metadata = {
  title: "Ingen — Talent, reimagined",
  description:
    "Ingen connects recruiters with the right talent and students with the right opportunities.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AudienceProvider><PrivacyChoices>{children}</PrivacyChoices></AudienceProvider>
      </body>
    </html>
  );
}
