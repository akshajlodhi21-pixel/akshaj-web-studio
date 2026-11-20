import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire AKSHAJ WEB STUDIO | Book Your Project",
  description:
    "Hire AKSHAJ WEB STUDIO for bespoke Website Development, mobile App Development, Web Design, and custom AI Solutions. Request a quote today.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/hire",
  },
  openGraph: {
    title: "Hire AKSHAJ WEB STUDIO | Book Your Project",
    description:
      "Hire AKSHAJ WEB STUDIO for custom Website Development, mobile App Development, and AI Solutions.",
    url: "https://akshaj-web-studio.vercel.app/hire",
  },
};

export default function HireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
