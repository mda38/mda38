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

export const metadata: Metadata = {
  title: {
    default: "kanshoku",
    template: "kanshoku | %s",
  },
  description: "this is my portfolio site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased diagonal-bg bg-emerald-400`}
      >
        <main className="mx-3 border-x min-h-screen border-dashed border-neutral-800 md:max-w-xl md:mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
