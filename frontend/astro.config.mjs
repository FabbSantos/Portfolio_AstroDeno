
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
//import deno from "@deno/astro-adapter";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://fabsantos.dev', // Substitua pelo seu domínio real
  server: { port: 4321, host: "0.0.0.0" },
  integrations: [tailwind(), vue(), sitemap()],
  output: "hybrid",
  adapter: vercel({
  //adapter: deno({
    webAnalytics: {
      enabled: true
    }
  })
});