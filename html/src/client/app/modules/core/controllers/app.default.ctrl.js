(function() {
	'use strict';
	angular
		.module('com.module.core')
		.controller('AppDefaultCtrl', function($state, $sessionStorage) {
			
				$state.go('app.home');
			
		});
})();