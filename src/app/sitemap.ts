import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://akshajwebstudio.com";
  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/pricing",
    "/payment",
    "/contact",
    "/hire",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
