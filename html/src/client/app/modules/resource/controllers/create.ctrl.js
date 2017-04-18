(function() {
    'use strict';
    angular
        .module('com.module.resource')
        .controller('ResourceCreatCtrl', function($scope, $state, $cookies, $uibModal, toaster, CourseApi) {
        
        	$scope.uploadlist = [];
        	
        	//上传文件要传的cookie
            $scope.token = $cookies.get('token')

            //添加新章节
            $scope.addUpload = function() {
                $scope.uploadlist.push({});
            }


        });
})();

