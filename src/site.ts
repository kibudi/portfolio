/** Canonical site address and public profile links. */
export const site = {
  url: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  github: "https://github.com/kibudi",
  linkedin: "https://www.linkedin.com/in/shaharkibudi",
  huntpilotRepo: "https://github.com/kibudi/huntpilot",
  designSource: "https://www.figma.com/community/file/1081798869819162236/agency-freelance-portfolio-website",
};
