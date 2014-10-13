module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['mocha'],

    files: [
      // need to figure out how to get webpack to take a glob w/o duplicating
      // stuff everywhere
      'app/__tests__/main.js'
    ],

    exclude: [],

    preprocessors: {
      'app/__tests__/main.js': ['webpack']
    },

    webpack: {
      cache: true,
      module: {
        loaders: [
          {test: /\.js$/, loader: 'jsx-loader'}
        ]
      }
    },

    webpackServer: {
      stats: {
        colors: true
      }
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    captureTimeout: 60000,

    singleRun: false,

    plugins: [
      require("karma-mocha"),
      require("karma-chrome-launcher"),
      require("karma-firefox-launcher"),
      require("karma-webpack")
    ]
  });
};

