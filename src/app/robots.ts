import type { MetadataRoute } from "next";
import { site } from "@/site";

/** Everything is public except the contact endpoint. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
