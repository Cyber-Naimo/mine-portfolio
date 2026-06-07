import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import CommandPalette from "@/components/ui/CommandPalette";
import CustomCursor from "@/components/ui/CustomCursor";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Naimatullah Khan — DevOps Engineer",
  description:
    "DevOps Engineer specializing in Kubernetes, CI/CD, and cloud infrastructure for mission-critical fintech systems. 2× Gold Medalist. Based in Karachi, Pakistan.",
  keywords: [
    "DevOps Engineer",
    "Kubernetes",
    "CKA",
    "CI/CD",
    "GitLab CI",
    "ELK Stack",
    "Fintech Infrastructure",
    "Cloud Engineer",
    "Muhammad Naimatullah Khan",
  ],
  authors: [{ name: "Muhammad Naimatullah Khan" }],
  openGraph: {
    title: "Muhammad Naimatullah Khan — DevOps Engineer",
    description:
      "Building fintech infrastructure that handles real financial transactions across multiple countries. 2× Gold Medalist. DevOps Engineer at Paysys Labs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white antialiased">
        <Providers>
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
