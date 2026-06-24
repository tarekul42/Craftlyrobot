import web from "./web/eslint.config.mjs";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/coverage/**",
      "**/e2e/**",
      "**/next-env.d.ts",
    ],
  },
  ...web,
];
