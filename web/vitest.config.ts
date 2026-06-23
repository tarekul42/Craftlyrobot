import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: [
      "components/**/*.test.{ts,tsx}",
      "lib/**/*.test.{ts,tsx}",
      "hooks/**/*.test.{ts,tsx}",
      "app/**/*.test.{ts,tsx}",
      "config/**/*.test.{ts,tsx}",
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", ".next/", "**/e2e/**"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
      "@/components": resolve(__dirname, "./components"),
      "@/lib": resolve(__dirname, "./lib"),
      "@/config": resolve(__dirname, "./config"),
      "@/hooks": resolve(__dirname, "./hooks"),
    },
  },
});
