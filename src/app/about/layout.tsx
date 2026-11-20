import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Akshaj Lodhi | Founder & Developer | AKSHAJ WEB STUDIO",
  description:
    "Meet Akshaj Lodhi, Founder & Developer of AKSHAJ WEB STUDIO. Learn about our vision, technical skills, and commitment to turning ideas into digital reality.",
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app/about",
  },
  openGraph: {
    title: "About Akshaj Lodhi | Founder & Developer | AKSHAJ WEB STUDIO",
    description:
      "Meet Akshaj Lodhi, Founder & Developer of AKSHAJ WEB STUDIO. Transforming ideas into digital reality.",
    url: "https://akshaj-web-studio.vercel.app/about",
    images: [
      {
        url: "https://akshaj-web-studio.vercel.app/images/akshaj-lodhi.jpg",
        width: 800,
        height: 1067,
        alt: "Akshaj Lodhi - Founder & Developer, AKSHAJ WEB STUDIO",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
