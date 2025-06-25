import * as path from "path";
import { defineConfig, type UserConfigExport, type ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfigExport => {
  return {
    server: {
      host: "::",
      port: 5173,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

function componentTagger() {
  return null;
}
