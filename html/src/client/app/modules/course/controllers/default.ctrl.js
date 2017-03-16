(function() {
	'use strict';
	angular
		.module('com.module.course')
		.controller('CourseDefaultCtrl', function($state) {
			$state.go('app.course.list')
			
		});
})();