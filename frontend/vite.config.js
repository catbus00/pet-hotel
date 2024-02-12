import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import "dotenv/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  root: ".",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
