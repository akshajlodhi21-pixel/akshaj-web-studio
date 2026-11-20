import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Development, App Development & AI Solutions",
  description:
    "Explore all 10 specialized digital services by AKSHAJ WEB STUDIO: Website Development, mobile App Development, AI Solutions, Web Design, and custom enterprise software.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/services",
  },
  openGraph: {
    title: "Website Development, App Development & AI Solutions | AKSHAJ WEB STUDIO",
    description:
      "Explore all 10 specialized services: Website Development, mobile App Development, AI Solutions, and Web Design by AKSHAJ WEB STUDIO.",
    url: "https://akshaj-web-studio.vercel.app/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
