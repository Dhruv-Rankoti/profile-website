import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { VisibleContextProvider } from "@/context/VisibleContext";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dhruv Rankoti – ML Engineer & Developer",
  description:
    "Building ML systems that work. CS Engineering student at MSIT, Delhi. AI/NLP specialist, PyTorch practitioner, and founder of U-Knighted Chess Society.",
  keywords: [
    "Dhruv Rankoti",
    "ML Engineer",
    "AI Developer",
    "Python",
    "PyTorch",
    "NLP",
    "Portfolio",
    "MSIT Delhi",
  ],
  authors: [{ name: "Dhruv Rankoti" }],
  creator: "Dhruv Rankoti",
  openGraph: {
    type: "profile",
    title: "Dhruv Rankoti – ML Engineer & Developer",
    description:
      "Building ML systems that work. Portfolio of an AI/ML developer and CS student from Delhi.",
    siteName: "Dhruv Rankoti",
    images: [
      {
        url: "/avatar_pfp.jpeg",
        width: 400,
        height: 400,
        alt: "Dhruv Rankoti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Rankoti – ML Engineer & Developer",
    description: "Building ML systems that work.",
    creator: "@DhruvRankoti",
    images: ["/avatar_pfp.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const LiveCursor = dynamic(() =>
  import("@/components/liveCursor").then((mod) => ({ default: mod.default }))
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <VisibleContextProvider>
            {children}
            <LiveCursor />
          </VisibleContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
