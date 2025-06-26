import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import sanityClient from '.././src/services/sanity.js';

const siteUrl = 'https://grantwatson.dev';

async function fetchSlugs() {
  const posts = await sanityClient.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
  return posts.map(post => `/blog/${post.slug}`);
}

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: siteUrl });
  const writeStream = createWriteStream('public/sitemap.xml');

  sitemap.pipe(writeStream);

  // Static routes
  [
    '/',
    '/about',
    '/contact',
    '/portfolio',
    '/blog'
  ].forEach(path => sitemap.write({ url: path, changefreq: 'weekly', priority: 0.8 }));

  // Dynamic blog routes
  const blogRoutes = await fetchSlugs();
  blogRoutes.forEach(url => sitemap.write({ url, changefreq: 'monthly', priority: 0.7 }));

  sitemap.end();

  await streamToPromise(sitemap);
  console.log('✅ sitemap.xml generated');
}

generateSitemap().catch(console.error);