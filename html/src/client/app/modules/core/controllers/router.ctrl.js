(function() {
	'use strict';
	angular
		.module('com.module.core')
		.controller('RouteCtrl', function($location, $state, AppAuth) {
			$state.go('app.home')
		});
})();