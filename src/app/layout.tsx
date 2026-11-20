import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

export const metadata: Metadata = {
  metadataBase: new URL("https://akshajwebstudio.com"),
  title: {
    default: "AKSHAJ WEB STUDIO | Turning Ideas Into Digital Reality",
    template: "%s | AKSHAJ WEB STUDIO",
  },
  description:
    "We transform ideas into powerful digital experiences. From professional websites to innovative applications and AI-powered solutions, we help businesses establish their digital presence. Premium digital development agency.",
  keywords: [
    "Akshaj Web Studio",
    "Digital Agency",
    "Website Development",
    "Business Website Development",
    "School Website Development",
    "E-commerce Development",
    "Android Application Development",
    "AI Website Solutions",
    "Custom Software Engineering",
    "Next.js Development",
  ],
  authors: [{ name: "Akshaj Lodhi", url: "https://akshajwebstudio.com" }],
  creator: "Akshaj Lodhi",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google2cb903cb381db4e1",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akshajwebstudio.com",
    title: "AKSHAJ WEB STUDIO | Turning Ideas Into Digital Reality",
    description:
      "We transform ideas into powerful digital experiences. From professional websites to innovative applications and AI-powered solutions, we help businesses establish their digital presence.",
    siteName: "AKSHAJ WEB STUDIO",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "AKSHAJ WEB STUDIO - Turning Ideas Into Digital Reality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKSHAJ WEB STUDIO | Turning Ideas Into Digital Reality",
    description:
      "We transform ideas into powerful digital experiences. From professional websites to innovative applications and AI-powered solutions, we help businesses establish their digital presence.",
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
    "@type": "ProfessionalService",
    name: "AKSHAJ WEB STUDIO",
    alternateName: "Akshaj Digital Agency",
    founder: {
      "@type": "Person",
      name: "Akshaj Lodhi",
      jobTitle: "Founder & Developer",
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    description:
      "We transform ideas into powerful digital experiences. From professional websites to innovative applications and AI-powered solutions, we help businesses establish their digital presence.",
    url: "https://akshajwebstudio.com",
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
      "https://github.com",
      "https://linkedin.com",
      "https://twitter.com",
      "https://instagram.com/akshajwebstudio",
      "https://facebook.com",
      "https://youtube.com",
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
