import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" assert { type: "json" };
const currentModuleDirectory = fileURLToPath(new URL('.', import.meta.url));


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  resolve: {
    alias: {
      '@': currentModuleDirectory + '/src',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: currentModuleDirectory + '/web/popup.html',
        connect: currentModuleDirectory + '/web/connect.html',
      }
    }
  },
});
