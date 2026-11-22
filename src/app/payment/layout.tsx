import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Payment Portal | AKSHAJ WEB STUDIO",
  description:
    "Official secure payment and invoicing portal for AKSHAJ WEB STUDIO. Direct verification for project milestones and deposits.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/payment",
  },
  openGraph: {
    title: "Secure Payment Portal | AKSHAJ WEB STUDIO",
    description:
      "Secure project milestone payments and invoice settlements for AKSHAJ WEB STUDIO.",
    url: "https://akshaj-web-studio.vercel.app/payment",
  },
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
