module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': 'off'
  }
}
