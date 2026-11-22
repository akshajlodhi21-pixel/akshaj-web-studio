import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | AKSHAJ WEB STUDIO",
  description:
    "Official Terms and Conditions governing digital engineering services, contracts, deliverables, and consultations at AKSHAJ WEB STUDIO.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/terms",
  },
  openGraph: {
    title: "Terms & Conditions | AKSHAJ WEB STUDIO",
    description:
      "Official Terms & Conditions for services and consultations provided by AKSHAJ WEB STUDIO.",
    url: "https://akshaj-web-studio.vercel.app/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
