/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Serve images straight from /public instead of through Vercel's image
   * optimizer. The Hobby plan's optimization quota ran out and every
   * /_next/image request started returning 402, so images vanished for anyone
   * without a cached copy. The source files are already web-sized (all under
   * ~210 KB), so there's little to gain from resizing them on the fly.
   */
  images: { unoptimized: true },
  /**
   * The current WordPress site's URLs, pointed at wherever their content now
   * lives. Two of the eight pages were merged rather than rebuilt:
   *   /why-choose-us  -> a section on /about
   *   /monthly-themes -> the calendar section on /programs
   *   /applause       -> the reviews section on /about
   * These are permanent so the existing search rankings follow the content.
   */
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/why-choose-us", destination: "/about#why", permanent: true },
      { source: "/curriculum", destination: "/programs#curriculum", permanent: true },
      { source: "/monthly-themes", destination: "/programs#themes", permanent: true },
      { source: "/applause", destination: "/about#applause", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/gallery-2", destination: "/gallery", permanent: true },
    ];
  },
};
export default nextConfig;
