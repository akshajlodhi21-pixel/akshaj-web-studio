import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Investment Packages | AKSHAJ WEB STUDIO",
  description:
    "Explore transparent pricing tiers for custom Website Development, mobile App Development, and AI Solutions by Akshaj Lodhi at AKSHAJ WEB STUDIO.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/pricing",
  },
  openGraph: {
    title: "Pricing & Investment Packages | AKSHAJ WEB STUDIO",
    description:
      "Predictable, transparent investment packages for website development, app development, and AI engineering.",
    url: "https://akshaj-web-studio.vercel.app/pricing",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
