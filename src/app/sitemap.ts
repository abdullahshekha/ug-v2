import type { MetadataRoute } from "next";
import { blogs } from "./blogs/data";

const BASE_URL = "https://www.unitedgypsum.com";

const staticRoutes = [
  "",
  "/about-us/",
  "/company-profile/",
  "/projects/",
  "/contact-us/",
  "/events/",
  "/ceiling-calculator/",
  "/blogs/",
  "/smart-gypsum-board/",
  "/smart-ceiling-panel/",
  "/smart-grid/",
  "/smart-filler/",
  "/smart-tape/",
  "/smart-screws/",
  "/smart-access/",
  "/smart-bead/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
