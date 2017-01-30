module.exports = function karmaConf(config) {
  var conf = {
    frameworks: ["jasmine", "karma-typescript"],

    files: [
      { pattern: "src/**/*.ts" },
      { pattern: "example/validators/**/*.ts" },
    ],

    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },

    reporters: ["progress", "karma-typescript"],
    browsers: ["PhantomJS"],

    karmaTypescriptConfig: {
      reports: {
        "html": "coverage",
        "lcovonly": {
          "directory": "coverage",
          "filename": "../lcov.info"
        }
      },
    },
  };

  config.set(conf);
};
