import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duration — Time, in decimal.",
  description:
    "Convert a duration in hh:mm:ss to decimal hours. A simple, free calculator with instant results rounded to two decimal places.",
};

export const viewport: Viewport = {
  themeColor: "#f7f7f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Duration home">
            <span className="brand-icon" aria-hidden="true">↗</span> duration<span className="brand-dot">.</span>
          </Link>
          <span className="header-note">A little tool for your time</span>
        </header>

        {children}

        <footer className="site-footer">
          <span>Made for every minute.</span>
          <span>Private by default. Calculated in your browser.</span>
        </footer>
      </body>
    </html>
  );
}
