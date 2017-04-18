(function() {
    'use strict';
    angular
        .module('com.module.resource')
        .controller('ResourceListCtrl', function($rootScope, $scope, $cookies, $uibModal, toaster, ResourceApi, ResourceMap) {


        	$scope.resourcelist = [];

        	//资源查询
        	$scope.searchresource = function() {
        		ResourceApi.searchresource({keyword: $scope.resourcekeyword}).then(function(res){
					var data = res.data;
					if (data.code && data.code > 0){
						$scope.resourcelist = ResourceMap.resourceListModel(data);
						if($scope.resourcelist.length == 0 ){
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

        	//下载资源
        	$scope.download = function(resource){
        		window.open($rootScope.resourceBase+resource.fileurl)
        	}

        });
})();
