import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const resolveSiteUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    return /^https?:\/\//.test(envUrl) ? envUrl : `https://${envUrl}`;
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
};

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  title: {
    default: "kanshoku",
    template: "%s | kanshoku",
  },
  description: "フロントエンド開発の知見をまとめるポートフォリオサイトです。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "kanshoku",
    title: "kanshoku",
    description: "フロントエンド開発の知見をまとめるポートフォリオサイトです。",
  },
  twitter: {
    card: "summary_large_image",
    title: "kanshoku",
    description: "フロントエンド開発の知見をまとめるポートフォリオサイトです。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <main className="mx-3 min-h-screen md:max-w-xl md:mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
