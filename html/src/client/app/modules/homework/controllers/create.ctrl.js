(function() {
    'use strict';
    angular
        .module('com.module.homework')
        .controller('HomeworkCreateCtrl', function($scope, $state, $cookies, $uibModal, toaster, HomeworkApi, HomeworkMap, sectionlist) {
        	$scope.sectionlist = sectionlist;
        	if(!sectionlist){
        		$scope.sectionlist = [{title: '加载中...'}]
        	}


            //创建题目
            $scope.creatHormwrok = function() {
                HomeworkApi.creathomework(HomeworkMap.converthomeworkModel($scope.creathomework)).then(function(res) {
                    var data = res.data;
                    if (data && data.code && data.code >= 0) {
                        toaster.pop('success', '提示', '创建成功');
                        return;
                    }
                    toaster.pop('error', '提示', '创建失败');
                }, function() {
                    toaster.pop('error', '提示', '创建失败');

                })
            }
        });
})();
