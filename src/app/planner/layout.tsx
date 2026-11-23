import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Website Project Planner | AKSHAJ WEB STUDIO",
  description:
    "Interactive AI Website Project Planner by AKSHAJ WEB STUDIO. Design your website blueprint, calculate indicative budgets, and submit genuine hiring inquiries directly to Founder Akshaj Lodhi.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/planner",
  },
  openGraph: {
    title: "AI Website Project Planner | AKSHAJ WEB STUDIO",
    description:
      "Design your custom website blueprint, customize pages, design, and features, and calculate indicative investment ranges in real time.",
    url: "https://akshaj-web-studio.vercel.app/planner",
  },
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
