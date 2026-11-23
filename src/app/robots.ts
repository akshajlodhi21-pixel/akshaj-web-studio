import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/favicon*",
          "/apple-touch-icon.png",
          "/android-chrome*",
          "/icon*",
          "/site.webmanifest",
          "/manifest.json",
        ],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/favicon*",
          "/apple-touch-icon.png",
          "/android-chrome*",
          "/icon*",
          "/site.webmanifest",
          "/manifest.json",
        ],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: [
          "/",
          "/favicon*",
          "/apple-touch-icon.png",
          "/android-chrome*",
          "/icon*",
          "/images/*",
        ],
      },
    ],
    sitemap: "https://akshaj-web-studio.vercel.app/sitemap.xml",
  };
}
