import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

console.log("vitest.config.ts");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    maxWorkers: "100%",
    testTimeout: 10_000,
    exclude: [...configDefaults.exclude],
    include: [...configDefaults.include, "**/*.arch.ts"],
    passWithNoTests: true,
    setupFiles: "./src/tests/setup-tests.ts",
  },
});
