(function() {
    'use strict';
    angular
        .module('com.module.section')
        .controller('SectionListCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, sectionlist, courseModel) {
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

        });
})();
