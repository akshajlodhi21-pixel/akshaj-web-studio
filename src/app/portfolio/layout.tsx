import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Portfolio Showcase",
  description:
    "Explore our featured portfolio of high-performance web applications, mobile apps, and custom AI systems engineered by AKSHAJ WEB STUDIO.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/portfolio",
  },
  openGraph: {
    title: "Projects & Portfolio Showcase | AKSHAJ WEB STUDIO",
    description:
      "Explore web applications, mobile apps, and AI systems engineered by AKSHAJ WEB STUDIO.",
    url: "https://akshaj-web-studio.vercel.app/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
