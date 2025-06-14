import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

// Define your base site URL
const BASE_URL = 'https://www.grantwatson.dev';

// Create a write stream to output file
const writeStream = createWriteStream('./public/sitemap.xml'); // Adjust for build dir if needed

// Initialize the sitemap stream
const sitemap = new SitemapStream({ hostname: BASE_URL });

// Pipe the output to file
sitemap.pipe(writeStream);

// Define your site URLs (add more routes as needed)
const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog', changefreq: 'weekly', priority: 0.9 },
];

(async () => {
  for (const url of urls) {
    sitemap.write(url);
  }

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');
})();