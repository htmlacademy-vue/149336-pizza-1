module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "vee-validate/dist/rules": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!vee-validate/dist/rules)"],
};
