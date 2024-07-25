
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
//import deno from "@deno/astro-adapter";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  server: { port: 4321, host: "0.0.0.0" },
  integrations: [tailwind(), vue()],
  output: "hybrid",
  adapter: vercel({
  //adapter: deno({
    webAnalytics: {
      enabled: true
    }
  })
});