// See https://docs.rocketmakers.club/eslint/ for the docs

const { createEslintConfig } = require("@rocketmakers/eslint");

const config = createEslintConfig(
  {
    project: ["./tsconfig.json", "./_build/source/tsconfig.json"],
    ignorePatterns: [
      "**/node_modules/**/*.*",
      "lib/*",
      "*.js",
      "**/_rocketmakersSecrets/**/*.*",
      "tmpclientoutput",
      "vite.config.ts",
      "frontend/dashboard/src/api/generated",
      "**/_generated/**",
      "**/generated/**",
    ],
  },
  {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [".eslintrc.js", "prettier.config.js"],
      },
    ],
    "eslint-comments/no-use": ["warn", { allow: [] }],
    "no-restricted-syntax": "off",
    "react-hooks/exhaustive-deps": "off",
    "eslint-comments/no-use": "off",
    // Turning off to simplify requirements for linting stage. This should be reviewed in the future.
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "guard-for-in": "off",
  }
);

module.exports = config;
