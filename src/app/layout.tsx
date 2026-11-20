import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export const metadata: Metadata = {
  metadataBase: new URL("https://akshaj-web-studio.vercel.app"),
  alternates: {
    canonical: "https://akshaj-web-studio.vercel.app",
  },
  title: {
    default: "AKSHAJ WEB STUDIO | Website Development, App Development & AI Solutions",
    template: "%s | AKSHAJ WEB STUDIO",
  },
  description:
    "AKSHAJ WEB STUDIO - Turning Ideas Into Digital Reality. Premier digital engineering agency delivering custom Website Development, mobile App Development, intelligent AI Solutions, and modern Web Design.",
  keywords: [
    "AKSHAJ WEB STUDIO",
    "Akshaj Web Studio",
    "Website Development",
    "App Development",
    "AI Solutions",
    "Web Design",
    "Android Application Development",
    "Next.js Development",
    "Custom Software Engineering",
    "Akshaj Lodhi",
    "Full-Stack Web Development",
    "Business Website Development",
    "E-commerce Website Development",
  ],
  authors: [{ name: "Akshaj Lodhi", url: "https://akshaj-web-studio.vercel.app" }],
  creator: "Akshaj Lodhi",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google2cb903cb381db4e1",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshaj-web-studio.vercel.app",
    title: "AKSHAJ WEB STUDIO | Website Development, App Development & AI Solutions",
    description:
      "AKSHAJ WEB STUDIO specializes in custom Website Development, native App Development, AI Solutions, and futuristic Web Design. Turning Ideas Into Digital Reality.",
    siteName: "AKSHAJ WEB STUDIO",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "AKSHAJ WEB STUDIO - Website Development, App Development & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKSHAJ WEB STUDIO | Website Development, App Development & AI Solutions",
    description:
      "AKSHAJ WEB STUDIO specializes in custom Website Development, native App Development, AI Solutions, and futuristic Web Design.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"],
    creator: "@akshajwebstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://akshaj-web-studio.vercel.app/#website",
        url: "https://akshaj-web-studio.vercel.app",
        name: "AKSHAJ WEB STUDIO",
        alternateName: ["Akshaj Web Studio", "AkshajStudio"],
        description:
          "AKSHAJ WEB STUDIO - Turning Ideas Into Digital Reality. Professional Website Development, App Development, AI Solutions & Web Design.",
        publisher: {
          "@id": "https://akshaj-web-studio.vercel.app/#organization",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://akshaj-web-studio.vercel.app/#organization",
        name: "AKSHAJ WEB STUDIO",
        alternateName: "Akshaj Digital Agency",
        url: "https://akshaj-web-studio.vercel.app",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        description:
          "AKSHAJ WEB STUDIO specializes in bespoke Website Development, mobile App Development, intelligent AI Solutions, and creative Web Design.",
        founder: {
          "@type": "Person",
          name: "Akshaj Lodhi",
          jobTitle: "Founder & Developer",
        },
        telephone: "+91 98765 43210",
        priceRange: "₹₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Digital Innovation Hub, Cyber Enclave",
          addressLocality: "Tech Park",
          addressRegion: "Global",
          addressCountry: "IN",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        sameAs: [
          "https://github.com/akshajlodhi21-pixel",
          "https://linkedin.com",
          "https://twitter.com",
          "https://instagram.com/akshajwebstudio",
          "https://facebook.com",
          "https://youtube.com",
        ],
        knowsAbout: [
          "Website Development",
          "App Development",
          "AI Solutions",
          "Web Design",
          "Android Application Development",
          "Next.js Development",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark-950 text-gray-200 antialiased selection:bg-gold-500/30 selection:text-gold-200">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
