/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ["next", "next/core-web-vitals"],
  ignorePatterns: ["node_modules", "dist"],
  settings: {
    next: {
      rootDir: ["web/*", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
