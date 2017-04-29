(function() {
    'use strict';
    angular
        .module('com.module.home')
        .controller('HomeController', ['$scope', '$state', 'CourseApi', 'SectionApi', 'userModel','CourseMap', 'SectionMap', 'recommendcourses', 'noticlist', 'carousellist', 'tagcourselist', 'taglist', function($scope, $state, CourseApi, SectionApi, userModel, CourseMap, SectionMap, recommendcourses, noticlist, carousellist, tagcourselist, taglist) {
  	
  			//轮播图
        	$scope.slides = carousellist;
            if(carousellist.length == 0){
                $scope.slides = [{image:$scope.noImg, title: 'slide1'},{image:$scope.noImg, title: 'slide2'}]
            }


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

            //分类数组转对象
            $scope.taglist = {};
            angular.forEach(taglist, function(val){
                $scope.taglist[val.tagid] = val.title;
            })


            //分类显示课程，然后分类划分
            $scope.tagcourselist = tagcourselist;
            
            // //循环每个课程
            // angular.forEach(tagcourselist, function(tagcourse){
            //     var hastag = false;
            //     //循环已有的分类，比较第一个课程tag，相等的话加加入
            //     angular.forEach($scope.tagcourselist,function(course){
            //         if(course[0].tag == tagcourse.tag){
            //             course.push(tagcourse)
            //         }else{
            //             hastag = true;
            //         }
            //     })
            //     //没有此类tag,那么新建一个tag数组
            //     if(!hastag)$scope.tagcourselist.push([].push(tagcourse));
            // })



        }]);

})();
