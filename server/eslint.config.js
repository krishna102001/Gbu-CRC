import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    rules: {
      // "no-console": "warn",
      // semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
]);
