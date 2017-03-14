(function() {
    'use strict';
    angular
        .module('com.module.core')
        .controller('MainCtrl', function($rootScope, $scope, $sessionStorage, $state, $location, $uibModal, AppAuth, userModel) {
            $scope.$state = $state;
            $scope.AppAuth = AppAuth;

            //用户信息
            $scope.user = {};
            $scope.hasUser = false;
            if(userModel){
                $scope.user = userModel;
                $scope.hasUser = true;
            }


            //$sessionStorage初始化
            $sessionStorage.$reset();


            //状态更改监听函数
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {
                    //状态改变时，收掉collapse
                    if (window.innerWidth < 768 && $('#collapsebody').height() > 1)
                        $('#collapsebutton').click();
                    
                    //如果是跳转到登录，保存上一个状态
                    if(toState.name == 'app.user.login'){
                        $sessionStorage.path = $location.path()
                    }
                });


        });
})();
