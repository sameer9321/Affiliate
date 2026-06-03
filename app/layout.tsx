import type { Metadata } from "next";
import "./globals.css";
import SiteShell from "@/components/frontend/SiteShell";

export const metadata: Metadata = {
  title: "Saving Trendz | Verified Coupons & Promo Codes",
  description:
    "Find verified coupon codes, promo deals and affiliate shopping offers from trusted stores.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
