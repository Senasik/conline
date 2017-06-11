(function() {
	'use strict';
	angular
		.module('com.module.course')
		.controller('CourseListCtrl', function($scope, $state, toaster, CourseApi, CourseMap, tagcourselist) {

			$scope.courselist = [];
			
			if (tagcourselist != 'all' && tagcourselist != null){
				$scope.courselist = tagcourselist;
			}

			//查询课程列表
			$scope.searchcourse = function(){
				CourseApi.searchcourse({keyword: $scope.coursekeyword}).then(function(res){
					var data = res.data;
					if (data.code && data.code > 0){
						$scope.courselist = CourseMap.courseListModel(data);
						if($scope.courselist.length == 0 ){
							toaster.pop('warning', '提示', '查询内容为空');
							return;
						}
						toaster.pop('success', '提示', '查询成功');
						return;
					}
					toaster.pop('error', '提示', '查询失败：'+data.msg);
				}, function(){
					toaster.pop('error', '提示', '查询出错');
				})
			}
			
		});
})();