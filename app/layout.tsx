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
  title: "Etsy Fee Calculator (2025) – Free Etsy Seller Fee Calculator",
  description:
    "Free Etsy Fee Calculator for 2025. Calculate Etsy listing fees, transaction fees, payment processing fees, and net profit instantly.",

  keywords: [
    "etsy fee calculator",
    "etsy calculator",
    "etsy seller fees",
    "etsy profit calculator",
    "etsy pricing calculator",
    "etsy transaction fee calculator",
    "etsy fees 2025",
    "etsy revenue calculator",
    "etsy seller profit",
    "etsy fee estimator",
  ],

  authors: [{ name: "Seller Profit Toolkit" }],

  openGraph: {
    title: "Etsy Fee Calculator (2025)",
    description:
      "Calculate Etsy fees and net revenue instantly with our free Etsy Fee Calculator.",
    type: "website",
    locale: "en_US",
    siteName: "Seller Profit Toolkit",
  },

  twitter: {
    card: "summary_large_image",
    title: "Etsy Fee Calculator (2025)",
    description:
      "Free Etsy Fee Calculator. Calculate Etsy seller fees and profits instantly.",
  },

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://seller-profit-toolkit.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}