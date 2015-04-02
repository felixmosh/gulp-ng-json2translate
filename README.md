gulp-ng-json2translate
=========
[![Built with Gulp](https://img.shields.io/badge/Built%20with-Gulp-red.svg)](http://gulpjs.com/)
[![Build Status](https://travis-ci.org/felixmosh/gulp-ng-json2translate.svg?branch=master)](https://travis-ci.org/felixmosh/gulp-ng-json2translate)

Plugin that wraps `json` as an angular translate module.

Inspired by https://github.com/shahata/grunt-json-angular-translate.

What is the result?
--
See <a href="https://github.com/felixmosh/gulp-ng-json2translate/tree/master/test/expect">here</a>

Install
--
```sh
npm install gulp-ng-json2translate
```

Usage
--

```javascript
var gulp=require('gulp');

var json2translate=require('gulp-ng-json2translate');
var concat=require('gulp-concat');

gulp.task('locale',function(){
    return gulp.src('./locale/*.json')
                .pipe(json2translate({
                    moduleName:'translations'
                }))
                .pipe(gulp.dest('./build/'));
});
```

options.moduleName
--
Type: `Sting`
Default: `translations`

The name of the generated AngularJS module.

options.extractLanguage
--
Type: `Function`

Custom function to retrieve language out of file name.

The default function can retrieve the language from files like that:
1. message_en.json
2. message-en.json
3. message.en.json

options.hasPreferredLanguage
--
Type: `Boolean`
Default: `true`

The flag that indicates if there will be preferred language statement at the output file.

Tests
--
```sh
npm test
```

License
----
Licensed under the MIT license.
