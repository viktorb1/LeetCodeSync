// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/viktorb/Desktop/gitleet/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/viktorb/Desktop/gitleet/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///Users/viktorb/Desktop/gitleet/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "GitLeet",
  description: "Syncs your leetcode solutions a Github repository on submit",
  version: "1.0",
  icons: {
    "16": "icon.png",
    "32": "icon.png",
    "48": "icon.png",
    "128": "icon.png"
  },
  permissions: [
    "storage",
    "tabs",
    "activeTab"
  ],
  content_scripts: [
    {
      js: ["src/scripts/content-script.ts"],
      matches: ["https://leetcode.com/problems/*/submissions/*/*"],
      run_at: "document_idle"
    }
  ],
  background: {
    service_worker: "src/scripts/background-script.ts",
    persistent: false
  },
  action: {
    default_title: "Configure Github",
    default_popup: "web/popup.html",
    resizable: false
  },
  options_page: "web/settings.html",
  host_permissions: ["https://api.github.com/*", "https://github.com/*", "https://leetcode.com/*"]
};

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///Users/viktorb/Desktop/gitleet/vite.config.ts";
var currentModuleDirectory = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [vue(), crx({ manifest: manifest_default })],
  resolve: {
    alias: {
      "@": currentModuleDirectory + "/src"
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: currentModuleDirectory + "/web/popup.html",
        connect: currentModuleDirectory + "/web/connect.html"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy92aWt0b3JiL0Rlc2t0b3AvZ2l0bGVldFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3Zpa3RvcmIvRGVza3RvcC9naXRsZWV0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy92aWt0b3JiL0Rlc2t0b3AvZ2l0bGVldC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuXG5pbXBvcnQgeyBjcnggfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuanNvblwiIGFzc2VydCB7IHR5cGU6IFwianNvblwiIH07XG5jb25zdCBjdXJyZW50TW9kdWxlRGlyZWN0b3J5ID0gZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuJywgaW1wb3J0Lm1ldGEudXJsKSk7XG5cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogY3VycmVudE1vZHVsZURpcmVjdG9yeSArICcvc3JjJyxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46IGN1cnJlbnRNb2R1bGVEaXJlY3RvcnkgKyAnL3dlYi9wb3B1cC5odG1sJyxcbiAgICAgICAgY29ubmVjdDogY3VycmVudE1vZHVsZURpcmVjdG9yeSArICcvd2ViL2Nvbm5lY3QuaHRtbCcsXG4gICAgICB9XG4gICAgfVxuICB9LFxufSk7XG4iLCAie1xuICAgIFwibWFuaWZlc3RfdmVyc2lvblwiOiAzLFxuICAgIFwibmFtZVwiOiBcIkdpdExlZXRcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU3luY3MgeW91ciBsZWV0Y29kZSBzb2x1dGlvbnMgYSBHaXRodWIgcmVwb3NpdG9yeSBvbiBzdWJtaXRcIixcbiAgICBcInZlcnNpb25cIjogXCIxLjBcIixcbiAgICBcImljb25zXCI6IHtcbiAgICAgIFwiMTZcIjogXCJpY29uLnBuZ1wiLFxuICAgICAgXCIzMlwiOiBcImljb24ucG5nXCIsXG4gICAgICBcIjQ4XCI6IFwiaWNvbi5wbmdcIixcbiAgICAgIFwiMTI4XCI6IFwiaWNvbi5wbmdcIlxuICAgIH0sXG4gICAgXCJwZXJtaXNzaW9uc1wiOiBbXG4gICAgICBcInN0b3JhZ2VcIiwgXG4gICAgICBcInRhYnNcIiwgXG4gICAgICBcImFjdGl2ZVRhYlwiXG4gICAgXSxcbiAgICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwianNcIjogW1wic3JjL3NjcmlwdHMvY29udGVudC1zY3JpcHQudHNcIl0sXG4gICAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwczovL2xlZXRjb2RlLmNvbS9wcm9ibGVtcy8qL3N1Ym1pc3Npb25zLyovKlwiXSxcbiAgICAgICAgXCJydW5fYXRcIjogXCJkb2N1bWVudF9pZGxlXCJcbiAgICAgIH1cbiAgICBdLFxuICAgIFwiYmFja2dyb3VuZFwiOiB7XG4gICAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL3NjcmlwdHMvYmFja2dyb3VuZC1zY3JpcHQudHNcIixcbiAgICAgIFwicGVyc2lzdGVudFwiOiBmYWxzZVxuICAgIH0sXG4gICAgXCJhY3Rpb25cIjoge1xuICAgICAgXCJkZWZhdWx0X3RpdGxlXCI6IFwiQ29uZmlndXJlIEdpdGh1YlwiLFxuICAgICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwid2ViL3BvcHVwLmh0bWxcIixcbiAgICAgIFwicmVzaXphYmxlXCI6IGZhbHNlXG4gICAgfSxcbiAgICBcIm9wdGlvbnNfcGFnZVwiOiBcIndlYi9zZXR0aW5ncy5odG1sXCIsXG4gICAgXCJob3N0X3Blcm1pc3Npb25zXCI6IFtcImh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vKlwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS8qXCIsIFwiaHR0cHM6Ly9sZWV0Y29kZS5jb20vKlwiXVxufVxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRRLFNBQVMsZUFBZSxXQUFXO0FBQy9TLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUVoQixTQUFTLFdBQVc7OztBQ0pwQjtBQUFBLEVBQ0ksa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsT0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGFBQWU7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQjtBQUFBLE1BQ0UsSUFBTSxDQUFDLCtCQUErQjtBQUFBLE1BQ3RDLFNBQVcsQ0FBQyxpREFBaUQ7QUFBQSxNQUM3RCxRQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFlBQWM7QUFBQSxJQUNaLGdCQUFrQjtBQUFBLElBQ2xCLFlBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsUUFBVTtBQUFBLElBQ1IsZUFBaUI7QUFBQSxJQUNqQixlQUFpQjtBQUFBLElBQ2pCLFdBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxjQUFnQjtBQUFBLEVBQ2hCLGtCQUFvQixDQUFDLDRCQUE0Qix3QkFBd0Isd0JBQXdCO0FBQ3JHOzs7QURsQ29LLElBQU0sMkNBQTJDO0FBTXJOLElBQU0seUJBQXlCLGNBQWMsSUFBSSxJQUFJLEtBQUssd0NBQWUsQ0FBQztBQUkxRSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSwyQkFBUyxDQUFDLENBQUM7QUFBQSxFQUNsQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLHlCQUF5QjtBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSx5QkFBeUI7QUFBQSxRQUMvQixTQUFTLHlCQUF5QjtBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
