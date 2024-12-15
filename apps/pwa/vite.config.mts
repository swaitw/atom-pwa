import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import LCL from "last-commit-log";
import istanbul from "vite-plugin-istanbul";

const env = process.env;

// Pass the latest commit short hash to the app
const lcl = new LCL(path.resolve(__dirname, "../../"));
const commit = lcl.getLastCommitSync();
env.VITE_COMMIT_SHORT_HASH = commit.shortHash;
env.VITE_COMMIT_HASH = commit.hash;

const prefixEnvVars = ["BRANCH"];

for (const envVar of prefixEnvVars) {
  env[`VITE_${envVar}`] = env[envVar];
}

const isProduction = env.NODE_ENV === "production";
const isTest = env.NODE_ENV === "test";
const isDevelopment = !isProduction && !isTest;

const ReactCompilerConfig = {
  target: "18",
};

export default defineConfig({
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    include: [],
    exclude: ["hammerjs"],
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    svgr(),
    isDevelopment &&
      istanbul({
        include: "src/*",
        exclude: ["node_modules", "**.*.test.{ts,tsx}"],
        extension: [".ts", "tsx"],
        checkProd: true,
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    port: 3000,
  },
});
