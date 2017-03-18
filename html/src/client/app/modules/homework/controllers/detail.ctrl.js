(function() {
    'use strict';
    angular
        .module('com.module.homework')
        .controller('HomeworkDetailCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, homeworklsit) {
 			$scope.homeworklist = homeworklsit;
 			if(!homeworklsit){
 				$scope.homework = [{title: '加载中...'}]
 			}
 			//提交答案
 			$scope.submit = function(){
 				angular.forEach($scope.homeworklist, function(value){
 					value.result = false;
 					if(value.testpaper == value.answer)
 						value.result = true;
 					return;
 				})
 			}

        });
})();
