import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AKSHAJ WEB STUDIO",
  description:
    "Official Privacy Policy of AKSHAJ WEB STUDIO. Learn how we collect, protect, and manage client and visitor information securely.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/privacy",
  },
  openGraph: {
    title: "Privacy Policy | AKSHAJ WEB STUDIO",
    description:
      "Official Privacy Policy of AKSHAJ WEB STUDIO. Transparent data protection and privacy standards.",
    url: "https://akshaj-web-studio.vercel.app/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
