import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import vtbot from "astro-vtbot";

// https://astro.build/config
export default defineConfig({
  integrations: [icon({
    iconDir: "public/assets/icons"
  }), vtbot()],
  build: {
    assets: 'app'
  }
});