module.exports = {
  root: true,
  env: { browser: false, node: true, mocha: true, es2020: true },
  extends: ["eslint:recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {},
  plugins: [],
  rules: {},
};
