import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/app/components/SiteChrome";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "JobNest",
  description: "Modern job search UI built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jost.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}