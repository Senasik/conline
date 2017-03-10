(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('SignupController', ['$scope', '$state', 'toaster', 'CommonApi', 'UserMap', function($scope, $state, toaster, CommonApi, UserMap) {
            //md5加密需要jquery
            $scope.$ = window.$;

            //注册用户
            $scope.signupuser = function() {
                CommonApi.signup(UserMap.convertUserModel($scope.user)).then(function(response) {
                    var data = response.data;
                    if(data.code && data.code === 1){
                        toaster.pop('success', '提示', '注册成功');
                        $state.go('app.home');
                        return;
                    }
                    toaster.pop('error', '提示', '注册失败: '+data.msg);
                }, function() {

                });
            };


        }]);

})();
