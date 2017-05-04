(function() {
    'use strict';
    angular
        .module('com.module.homework')
        .controller('HomeworkDetailCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, homeworklsit, HomeworkApi) {
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
                    //如果是编程题，那么上传程序
                    if(value.type == 2){
                        HomeworkApi.coderun({code:value.testpaper,homeworkid:value.homeworkid}).then(function(res){
                            var data = res.data;
                            if(data && data.code && data.code > 0 && data.data instanceof Array){
                                //共有多少道测试用例
                                value.length = data.data.length;
                                //多少道用例通过
                                value.success = 0;
                                angular.forEach(data.data, function(result){
                                    if(result)value.success++;
                                });
                                return;
                            }
                            toaster.pop('error', '提示', value.title+data.msg);
                        })
                        return;
                    }
 					value.result = false;
 					if(value.testpaper == value.answer)
 						value.result = true;
 					return;
 				})
 			}


        });
})();
