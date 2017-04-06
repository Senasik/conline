(function() {
    'use strict';
    angular
        .module('com.module.homework')
        .controller('HomeworkDetailCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, homeworklsit) {
 			$scope.homeworklist = homeworklsit;
 			if(!homeworklsit){
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
