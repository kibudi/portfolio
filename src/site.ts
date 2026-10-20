/**
 * The site's own address and the public links shown on it. Vercel sets the
 * production domain; locally the address falls back to the dev server.
 * Contact details are left out until Shahar decides which to publish.
 */
export const site = {
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  github: "https://github.com/kibudi",
  huntpilotRepo: "https://github.com/kibudi/huntpilot",
  designSource: "https://www.figma.com/community/file/1081798869819162236/agency-freelance-portfolio-website",
};
