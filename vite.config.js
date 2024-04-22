import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh(), nodePolyfills()],
  // optimizeDeps: {
  //   include: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // },
});
