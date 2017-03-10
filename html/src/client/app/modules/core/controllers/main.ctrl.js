(function() {
    'use strict';
    angular
        .module('com.module.core')
        .controller('MainCtrl', function($rootScope, $scope, $sessionStorage, $state, $uibModal, AppAuth) {
            $scope.$state = $state;

            //$sessionStorage初始化
            $sessionStorage.$reset()


            //状态改变时，收掉collapse
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {
                  if(window.innerWidth < 768 && $('#collapsebody').height()>1)
                    $('#collapsebutton').click();
                    // transitionTo() promise will be rejected with   
                    // a 'transition prevented' error  
                })

            // //判断用户是否登陆
            // $scope.user = AppAuth.loginUser();
            // if ($scope.user === null) {
            //   $state.go("router");
            //   return;
            // }

        });
})();
