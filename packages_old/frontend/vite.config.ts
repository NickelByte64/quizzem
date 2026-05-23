import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: resolve(process.cwd(), "../.."),
  resolve: {
    alias: {
      "~/": resolve(__dirname, "src") + "/",
    },
  },
});
