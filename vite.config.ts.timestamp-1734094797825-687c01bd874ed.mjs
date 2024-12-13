// vite.config.ts
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "file:///Users/wietseneven/Projects/dinkelsurvivalrunners/dsr-run-kirby/node_modules/.pnpm/vite@5.4.11_@types+node@20.17.10/node_modules/vite/dist/node/index.js";
import laravel from "file:///Users/wietseneven/Projects/dinkelsurvivalrunners/dsr-run-kirby/node_modules/.pnpm/laravel-vite-plugin@1.1.1_vite@5.4.11_@types+node@20.17.10_/node_modules/laravel-vite-plugin/dist/index.js";
import tsconfigPaths from "file:///Users/wietseneven/Projects/dinkelsurvivalrunners/dsr-run-kirby/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.2_vite@5.4.11_@types+node@20.17.10_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgSprite from "file:///Users/wietseneven/Projects/dinkelsurvivalrunners/dsr-run-kirby/node_modules/.pnpm/vite-svg-sprite-wrapper@1.4.1_vite@5.4.11_@types+node@20.17.10_/node_modules/vite-svg-sprite-wrapper/dist/index.js";
var __vite_injected_original_dirname = "/Users/wietseneven/Projects/dinkelsurvivalrunners/dsr-run-kirby";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: mode === "development" ? "/" : "/dist/",
    build: {
      outDir: resolve(__vite_injected_original_dirname, "public/dist"),
      emptyOutDir: true,
      manifest: "manifest.json"
    },
    plugins: [
      svgSprite({
        sprite: {
          shape: {
            transform: [
              {
                svgo: {
                  plugins: [{ name: "preset-default" }, "removeXMLNS"]
                }
              }
            ]
          }
        },
        icons: "assets/icons/*.svg",
        outputDir: "assets/"
      }),
      laravel({
        input: ["src/index.ts", "src/styles/index.css", "src/styles/panel.css"],
        refresh: ["site/{layouts,snippets,templates}/**/*"]
      }),
      tsconfigPaths()
    ],
    server: {
      origin: env.APP_URL,
      port: Number(env.VITE_DEV_PORT || 3e3),
      proxy: {
        // we proxy anything except the folders our vite dev assets are in
        "^(?!/src|/node_modules|/@vite|/@react-refresh|/assets).*$": `http://${env.KIRBY_DEV_HOSTNAME}:${env.KIRBY_DEV_PORT}`
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2lldHNlbmV2ZW4vUHJvamVjdHMvZGlua2Vsc3Vydml2YWxydW5uZXJzL2Rzci1ydW4ta2lyYnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy93aWV0c2VuZXZlbi9Qcm9qZWN0cy9kaW5rZWxzdXJ2aXZhbHJ1bm5lcnMvZHNyLXJ1bi1raXJieS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvd2lldHNlbmV2ZW4vUHJvamVjdHMvZGlua2Vsc3Vydml2YWxydW5uZXJzL2Rzci1ydW4ta2lyYnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgbGFyYXZlbCBmcm9tIFwibGFyYXZlbC12aXRlLXBsdWdpblwiXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiXG5pbXBvcnQgc3ZnU3ByaXRlIGZyb20gXCJ2aXRlLXN2Zy1zcHJpdGUtd3JhcHBlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKVxuXG5cdHJldHVybiB7XG5cdFx0YmFzZTogbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiID8gXCIvXCIgOiBcIi9kaXN0L1wiLFxuXG5cdFx0YnVpbGQ6IHtcblx0XHRcdG91dERpcjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljL2Rpc3RcIiksXG5cdFx0XHRlbXB0eU91dERpcjogdHJ1ZSxcblx0XHRcdG1hbmlmZXN0OiBcIm1hbmlmZXN0Lmpzb25cIlxuXHRcdH0sXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0c3ZnU3ByaXRlKHtcblx0XHRcdFx0c3ByaXRlOiB7XG5cdFx0XHRcdFx0c2hhcGU6IHtcblx0XHRcdFx0XHRcdHRyYW5zZm9ybTogW1xuXHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0c3Znbzoge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGx1Z2luczogW3sgbmFtZTogXCJwcmVzZXQtZGVmYXVsdFwiIH0sIFwicmVtb3ZlWE1MTlNcIl1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGljb25zOiBcImFzc2V0cy9pY29ucy8qLnN2Z1wiLFxuXHRcdFx0XHRvdXRwdXREaXI6IFwiYXNzZXRzL1wiXG5cdFx0XHR9KSxcblx0XHRcdGxhcmF2ZWwoe1xuXHRcdFx0XHRpbnB1dDogW1wic3JjL2luZGV4LnRzXCIsIFwic3JjL3N0eWxlcy9pbmRleC5jc3NcIiwgXCJzcmMvc3R5bGVzL3BhbmVsLmNzc1wiXSxcblx0XHRcdFx0cmVmcmVzaDogW1wic2l0ZS97bGF5b3V0cyxzbmlwcGV0cyx0ZW1wbGF0ZXN9LyoqLypcIl1cblx0XHRcdH0pLFxuXHRcdFx0dHNjb25maWdQYXRocygpXG5cdFx0XSxcblx0XHRzZXJ2ZXI6IHtcblx0XHRcdG9yaWdpbjogZW52LkFQUF9VUkwsXG5cdFx0XHRwb3J0OiBOdW1iZXIoZW52LlZJVEVfREVWX1BPUlQgfHwgMzAwMCksXG5cdFx0XHRwcm94eToge1xuXHRcdFx0XHQvLyB3ZSBwcm94eSBhbnl0aGluZyBleGNlcHQgdGhlIGZvbGRlcnMgb3VyIHZpdGUgZGV2IGFzc2V0cyBhcmUgaW5cblx0XHRcdFx0XCJeKD8hL3NyY3wvbm9kZV9tb2R1bGVzfC9Adml0ZXwvQHJlYWN0LXJlZnJlc2h8L2Fzc2V0cykuKiRcIjogYGh0dHA6Ly8ke2Vudi5LSVJCWV9ERVZfSE9TVE5BTUV9OiR7ZW52LktJUkJZX0RFVl9QT1JUfWBcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStXLFNBQVMsZUFBZTtBQUN2WSxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLGFBQWE7QUFDcEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxlQUFlO0FBSnRCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3pDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxTQUFPO0FBQUEsSUFDTixNQUFNLFNBQVMsZ0JBQWdCLE1BQU07QUFBQSxJQUVyQyxPQUFPO0FBQUEsTUFDTixRQUFRLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3hDLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNYO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUixVQUFVO0FBQUEsUUFDVCxRQUFRO0FBQUEsVUFDUCxPQUFPO0FBQUEsWUFDTixXQUFXO0FBQUEsY0FDVjtBQUFBLGdCQUNDLE1BQU07QUFBQSxrQkFDTCxTQUFTLENBQUMsRUFBRSxNQUFNLGlCQUFpQixHQUFHLGFBQWE7QUFBQSxnQkFDcEQ7QUFBQSxjQUNEO0FBQUEsWUFDRDtBQUFBLFVBQ0Q7QUFBQSxRQUNEO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsTUFDWixDQUFDO0FBQUEsTUFDRCxRQUFRO0FBQUEsUUFDUCxPQUFPLENBQUMsZ0JBQWdCLHdCQUF3QixzQkFBc0I7QUFBQSxRQUN0RSxTQUFTLENBQUMsd0NBQXdDO0FBQUEsTUFDbkQsQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNQLFFBQVEsSUFBSTtBQUFBLE1BQ1osTUFBTSxPQUFPLElBQUksaUJBQWlCLEdBQUk7QUFBQSxNQUN0QyxPQUFPO0FBQUE7QUFBQSxRQUVOLDZEQUE2RCxVQUFVLElBQUksa0JBQWtCLElBQUksSUFBSSxjQUFjO0FBQUEsTUFDcEg7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
