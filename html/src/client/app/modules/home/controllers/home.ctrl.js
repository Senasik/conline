(function() {
    'use strict';
    angular
        .module('com.module.home')
        .controller('HomeController', ['$scope', '$state', 'CourseApi', 'SectionApi', 'userModel','CourseMap', 'SectionMap', 'recommendcourses', function($scope, $state, CourseApi, SectionApi, userModel, CourseMap, SectionMap, recommendcourses) {
  	
  			//轮播图
        	$scope.slides = [{image:'images/bg.jpg', title: 'slide1'},{image:'images/bg.jpg', title: 'slide2'}]

        	//推荐课程
        	$scope.recommendcourses = recommendcourses;
        	if(recommendcourses.length == 0){
        		$scope.recommendcourses = [{title: '加载中...'}]
        	}


        }]);

})();
