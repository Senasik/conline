(function() {
	'use strict';
	angular
		.module('com.module.course')
		.controller('CourseListCtrl', function($scope, $state, courselist) {

			$scope.courselist = courselist;
			if(!courselist || courselist.length == 0){
				$scope.courselist = [{title: '加载中...'}]
			}
			
			
		});
})();