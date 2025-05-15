import { createSitemap } from 'sitemap';
import { writeFileSync } from 'fs';

const sm = createSitemap({
  hostname: 'https://my-bloge.netlify.app', // Replace with your actual Netlify domain or custom domain
  urls: [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'weekly', priority: 0.8 },
    // Add more URLs for your pages
  ],
});

writeFileSync('./public/sitemap.xml', sm.toString());
