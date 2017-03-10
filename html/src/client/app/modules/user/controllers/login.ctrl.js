(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('LoginController', ['$scope', '$state', '$location', '$sessionStorage', 'toaster', 'AppAuth', 'UserMap', function($scope, $state, $location, $sessionStorage, toaster, AppAuth, UserMap) {
            
            //md5加密需要jquery
            $scope.$ = window.$;

            //用户登录
            $scope.userlogin = function() {
                AppAuth.login(UserMap.convertUserModel($scope.user));
            };


        }]);

})();
