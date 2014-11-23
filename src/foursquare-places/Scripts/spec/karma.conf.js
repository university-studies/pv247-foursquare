// Karma configuration
// Generated on Sun Nov 16 2014 16:59:49 GMT+0100 (Central Europe Standard Time)

//setup info:
//http://sirarsalih.com/2013/10/28/test-driving-your-javascript-visual-studio-jasmine-karma-test-runner/
//http://blog.ploeh.dk/2013/09/13/karma-from-bash-on-windows/


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [        
        '../angular.js',
        '../angular-mocks.js',
        '../angular-resource.js',
        '../ui-bootstrap-tpls-0.11.2.js',
        '../gmaps.js',
        '../site/foursquare-module.js',
        './MarkerFormatterSpec.js',
        '../site/Services/MarkerFormatter.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
