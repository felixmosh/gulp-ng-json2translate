'use strict';
try {
	angular.module('Translations');
} catch (e) {
	angular.module('Translations', ['pascalprecht.translate']);
}
angular.module('Translations').config(function ($translateProvider) {
	$translateProvider.translations('ru', {
	'a': 'b',
	'c.x': 'd',
	'c.y': '"\'e'
});
	$translateProvider.preferredLanguage('ru');
});
