// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  site: 'https://www.himarestudio.com/',
  integrations: [sitemap()]
});