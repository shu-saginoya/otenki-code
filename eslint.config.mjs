import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";
import storybook from "eslint-plugin-storybook";
import a11y from "eslint-plugin-jsx-a11y";
import eslintPluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier,
      tailwindcss,
      storybook,
      a11y,
      import: eslintPluginImport,
    },
    rules: {
      "prettier/prettier": "error", // Prettierのルールをエラーとして扱う
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "warn",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
