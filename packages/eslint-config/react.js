/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    "./base.js",
    "plugin:react/recommended",
    "plugin:testing-library/dom",
  ],
  plugins: ["react", "react-hooks", "react-compiler"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react-compiler/react-compiler": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
