(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('SignupController', ['$scope', '$state', '$cookies', 'toaster', 'CommonApi', 'UserMap', function($scope, $state, $cookies, toaster, CommonApi, UserMap) {
            //md5加密需要jquery
            $scope.$ = window.$;

            //注册用户
            $scope.usersignup = function() {
                CommonApi.signup(UserMap.convertUserModel($scope.signupuser)).then(function(response) {
                    var data = response.data;
                    if(data.code && data.code === 1){
                        if(data.data.token){
                            $cookies.put('token', data.data.token)
                        }

                         toaster.pop({
                            type: "success",
                            title: '提示',
                            body: '注册成功，即将跳到主页',
                            timeout: 1000,
                            onHideCallback: function() {
                               location.href = '#/home';
                               location.reload();
                            }
                        });
                        return;
                    }
                    toaster.pop('error', '提示', '注册失败: '+data.msg);
                }, function() {

                });
            };


        }]);

})();
