import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import vtbot from "astro-vtbot";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [icon({
    iconDir: "public/assets/icons"
  }), vtbot(), react()],
  build: {
    assets: 'app'
  }
});