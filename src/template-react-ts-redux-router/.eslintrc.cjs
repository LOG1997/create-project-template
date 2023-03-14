module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    // 圈复杂度
    complexity: ["warn", { max: 5 }],
    // 结尾分号
    semi: [1, "always"],
    // 禁止使用多个空格
    "no-multi-spaces": "error",
    // 最大连续空行数
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
    // 代码块中去除前后空行
    "padded-blocks": ["error", "never"],
    // 使用单引号，字符串中包含了一个其它引号 允许"a string containing 'single' quotes"
    quotes: ["error", "single", { avoidEscape: true }],
    // 首字母大写
    "new-cap": [
      2,
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    // return之前必须空行
    "newline-before-return": "error",
    //文件末尾强制换行
    "eol-last": ["error", "always"],
    //禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
  },
};
