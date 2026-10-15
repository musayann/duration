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
            {/* The colon of hh:mm:ss fading into a decimal point. Keep in sync with app/icon.svg. */}
            <svg className="brand-icon" viewBox="0 0 32 32" aria-hidden="true">
              <circle cx="16" cy="16" r="16" fill="#e66a3c" />
              <circle cx="16" cy="10.5" r="4.25" fill="#fff" fillOpacity={0.4} />
              <circle cx="16" cy="21.5" r="4.25" fill="#fff" />
            </svg>
            duration<span className="brand-dot">.</span>
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
