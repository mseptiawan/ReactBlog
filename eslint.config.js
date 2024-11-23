// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReact from "eslint-plugin-react";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {files: ["**/*.{js,mjs,cjs,jsx}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], // Tambahkan ts dan tsx jika menggunakan TypeScript
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }, // Menambahkan globals untuk Node.js jika diperlukan
    },
  },
  pluginJs.configs.recommended, // Aturan standar dari ESLint
  pluginReact.configs.flat.recommended, // Aturan dasar React
  {
    settings: {
      react: {
        version: "detect", // Mengatur agar ESLint mendeteksi versi React yang digunakan secara otomatis
      },
    },
  },
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect", // Agar ESLint mendeteksi versi React secara otomatis
      },
    },
  },
  "plugin:prettier/recommended", // Mengintegrasikan Prettier dengan ESLint
];
