import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get In Touch",
  description:
    "Contact AKSHAJ WEB STUDIO for your next Website Development, App Development, or AI Solutions project. Reach us via Phone, WhatsApp, or Email.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Us | AKSHAJ WEB STUDIO",
    description:
      "Get in touch with AKSHAJ WEB STUDIO for custom Website Development, App Development, or AI Solutions.",
    url: "https://akshaj-web-studio.vercel.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
