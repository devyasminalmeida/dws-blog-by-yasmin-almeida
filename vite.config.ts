/// <reference types="vitest" />

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    exclude: [
      ...configDefaults.exclude,
      "**/*.e2e.ts",
      "**/*.e2e.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
    ],
  },
});
