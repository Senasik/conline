(function() {
    'use strict';
    angular
        .module('com.module.section')
        .controller('SectionListCtrl', function($scope, $state, $cookies, $uibModal, toaster, CourseApi, SectionApi, sectionlist, courseModel) {
        	$scope.sectionlist = sectionlist;
        	$scope.course = courseModel;
        	if(!sectionlist || sectionlist.length == 0 || !courseModel){
				$scope.sectionlist = [{title: '加载中...'}]
				toaster.pop({
                    type: "warning",
                    title: '提示',
                    body: '未获取到数据，即将跳转到主页',
                    timeout: 1000,
                    onHideCallback: function() {
                        $state.go('app.home');
                    }
                });
                return;
			}

            //是否是详情
            $scope.sectioncb = {};
            $scope.sectioncb.isdetail = false;


            //收藏课程
            $scope.collect = function(operate){
                CourseApi.collectcourse({courseid: $scope.course.courseid, operate: operate}).then(function(res){
                    var data = res.data;
                    if (data && data.code > 0){
                        $scope.course.collected = !$scope.course.collected;
                        if($scope.course.collected){
                            toaster.pop('success', '提示', '收藏成功');
                            return;
                        }
                        toaster.pop('success', '提示', '取消收藏成功');
                        return;
                    }
                    if($scope.course.collected){
                        toaster.pop('error', '提示', '取消收藏失败：'+data.msg);
                        return;
                    }
                    toaster.pop('error', '提示', '收藏失败：'+data.msg);
                }, function(){
                    if($scope.course.collected){
                        toaster.pop('error', '提示', '取消收藏失败');
                        return;
                    }
                    toaster.pop('error', '提示', '收藏失败');
                })
            }

        });
})();
