module.exports = function karmaConf(config) {
    var conf = {
        frameworks: ["jasmine", "karma-typescript"],

        files: [
            { pattern: "src/**/*.ts" },
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"],
        },

        reporters: ["progress", "karma-typescript"],
        browsers: ["PhantomJS"],
    };

    config.set(conf);
};
