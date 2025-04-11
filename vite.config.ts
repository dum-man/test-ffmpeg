import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

const cert = fs.readFileSync("./localhost.pem");
const key = fs.readFileSync("./localhost-key.pem");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg"],
  },

  server: {
    https: {
      key,
      cert,
    },
    host: "localhost",
    port: 5173,
  },
});
