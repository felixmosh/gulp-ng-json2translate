var path = require('path');

var gutil = require('gulp-util');
var through = require('through2');
var toSingleQuotes = require('to-single-quotes');

function getTemplate(hasPreferredLanguage) {
	var tmpl = '\'use strict\';\n' +
		'try {\n' +
		'	angular.module(\'${moduleName}\');\n' +
		'} catch (e) {\n' +
		'	angular.module(\'${moduleName}\', [\'pascalprecht.translate\']);\n' +
		'}\n' +
		'angular.module(\'${moduleName}\').config(function ($translateProvider) {\n' +
		'	$translateProvider.translations(\'${language}\', ${translations});\n' +
		((hasPreferredLanguage) ? '	$translateProvider.preferredLanguage(\'${language}\');\n' : '') +
		'});\n';

	return tmpl;
}

function extractLanguage(file) {
	var filename = file.relative;

	//Remove file extension
	filename = filename.split(".").slice(0, -1).join(".");

	var chunks = filename.split(/[-_.]+/);
	return chunks.length > 1 ? chunks[chunks.length - 1] : 'en';
}

/**
 *
 * @param options
 * @property options.moduleName {String} A name of module where generated values be located
 * @property options.extractLanguage {Function} A function to extract the language
 * @property options.hasPreferredLanguage {Boolean} does the output contains preferred language statement
 * @returns {*}
 */
module.exports = function (options) {
	'use strict';

	options = options || {};
	options.moduleName = options.moduleName || 'translations';
	options.extractLanguage = options.extractLanguage || extractLanguage;
	options.hasPreferredLanguage = options.hasPreferredLanguage || true;

	return through.obj(function (file, enc, done) {

		if (file.isNull()) {
			this.push(file);
			return done();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-ng-json2translate', 'Streaming not supported'));
			return done();
		}
		try {
			var value = gutil.template(getTemplate(options.hasPreferredLanguage), {
				moduleName: options.moduleName,
				language: options.extractLanguage(file),
				translations: toSingleQuotes(file.contents.toString()),
				file: file
			});

			file.contents = new Buffer(value);

			file.path = gutil.replaceExtension(file.path, '.js');

			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-ng-json2translate', err));
		}

		done();
	});
};