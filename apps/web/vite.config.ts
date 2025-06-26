import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), tailwindcss()],
  resolve: {
    conditions: ["source", "import", "module", "browser", "default"],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
