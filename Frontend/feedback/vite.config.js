import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(),tailwindcss()], // Removed tailwindcss() because Tailwind doesn’t need to be added as a plugin here
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
      "@src": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
});
