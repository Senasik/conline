(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('TeacherInfoController', ['$scope', '$state', 'CourseApi', 'SectionApi', 'userModel', 'thisuser', 'CourseMap', 'SectionMap', function($scope, $state, CourseApi, SectionApi, userModel, thisuser, CourseMap, SectionMap) {
            $scope.user = thisuser;
            //是否是自己
            $scope.isme = thisuser.userid == userModel.userid? true: false;
            //课程Collapse控制变量
            $scope.courseCollapsed = true;


            //获取所有课程
            $scope.getCourselist = function(){
				$scope.courseCollapsed = !$scope.courseCollapsed;
            	//如果是关闭collapse，直接返回
            	if($scope.courseCollapsed)return;
            	$scope.courselist = [{title: '加载中...'}]
            	CourseApi.getcourselist({userid: thisuser.userid}).then(function(res){
            		$scope.courselist = CourseMap.courseListModel(res.data);
            	}, function(){

            	});
            }

            //获取所有章节
            $scope.getSectionlist = function(course){
            	course.sectionCollapsed = !course.sectionCollapsed;
            	//如果是关闭collapse，直接返回
            	if(course.sectionCollapsed)return;
            	$scope.sectionlist = [{title: '加载中...'}]
            	SectionApi.getsectionlist({courseid: course.courseid}).then(function(res){
            		course.sectionlist = SectionMap.sectionListModel(res.data);
            	}, function(){

            	});
            }
        }]);

})();
