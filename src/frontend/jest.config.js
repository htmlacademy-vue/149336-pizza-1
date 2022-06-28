module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "@vue/cli-plugin-unit-jest",
  // setupFiles: ['<rootDir>/.jest.register-context.js'],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|webp|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "vee-validate/dist/rules": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!vee-validate/dist/rules)"],
};
