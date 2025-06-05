// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Pages from "vite-plugin-pages";
import path from "path";

export default defineConfig({
  plugins: [
    Pages({
      dirs: "src/pages",       // auto-import all TSX pages here
      extensions: ["tsx"],     // only look at .tsx files
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
