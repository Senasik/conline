(function() {
    'use strict';
    angular
        .module('com.module.home')
        .controller('HomeController', ['$scope', '$state', 'CourseApi', 'SectionApi', 'userModel','CourseMap', 'SectionMap', 'recommendcourses', 'noticlist', function($scope, $state, CourseApi, SectionApi, userModel, CourseMap, SectionMap, recommendcourses, noticlist) {
  	
  			//轮播图
        	$scope.slides = [{image:$scope.noImg, title: 'slide1'},{image:$scope.noImg, title: 'slide2'}]


        	//推荐课程
        	$scope.recommendcourses = recommendcourses;
        	if(recommendcourses.length == 0){
        		$scope.recommendcourses = [{title: '加载中...'}]
        	}

            //公告前5个
            $scope.noticlist = noticlist;
            if(noticlist.length == 0){
                $scope.noticlist = [{title: '加载中...'}]
            }


        }]);

})();
