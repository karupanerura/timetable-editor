module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['jest'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        "singleQuote": true,
        "semi": false,
        "trailingComma": "es5"
      },
    ],
  }
}
