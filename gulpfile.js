var gulp = require('gulp');
var closureCompiler = require('google-closure-compiler').gulp();

gulp.task('default', ['compile-contract', 'compile-dispatcher'], function() {
});

gulp.task('compile-contract', function () {
  return gulp.src(['*.js', '!gulpfile.js',
                   '!**/*_example.js', '!dispatcher_auto.js',
                   '!**/*_test.js', '!**/testing/**.js',
                   'node_modules/google-closure-library/closure/goog/**/*.js'],
                  {base: './'})
      .pipe(closureCompiler({
          closure_entry_point: 'jsaction.eventContractAuto',
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          manage_closure_dependencies: true,
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'contract.min.js'
        }))
      .pipe(gulp.dest('./dist'));
});

gulp.task('compile-dispatcher', function () {
  return gulp.src(['*.js', '!gulpfile.js',
                   '!**/*_example.js', '!eventcontract_auto.js',
                   '!**/*_test.js', '!**/testing/**.js',
                   'node_modules/google-closure-library/closure/goog/**/*.js'],
                  {base: './'})
      .pipe(closureCompiler({
          closure_entry_point: 'jsaction.dispatcherAuto',
          compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          manage_closure_dependencies: true,
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'dispatcher.min.js'
        }))
      .pipe(gulp.dest('./dist'));
});
