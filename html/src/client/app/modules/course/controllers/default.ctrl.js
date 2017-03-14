(function() {
	'use strict';
	angular
		.module('com.module.course')
		.controller('DefaultCtrl', function($state) {
			$state.go('app.course.list')
			
		});
})();