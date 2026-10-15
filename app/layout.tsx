import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Duration: hh:mm:ss to decimal hours",
  description:
    "Convert a duration in hh:mm:ss to decimal hours, rounded to two decimal places. Everything runs in your browser.",
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
        </header>

        {children}

        <footer className="site-footer">
          <span>Everything is calculated in your browser. Nothing you enter is sent anywhere.</span>
        </footer>
      </body>
    </html>
  );
}
