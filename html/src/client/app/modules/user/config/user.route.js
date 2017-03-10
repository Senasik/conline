(function() {
    'use strict';
    angular
        .module('com.module.user')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.user', {
                    url: '/user',
                    template: '<div ui-view>发生了错误.</div>',
                })
                .state('app.user.default', {
                    url: '',
                    template: '',
                    controller: 'DefaultController'
                })
                .state('app.user.login', {
                    url: '/login',
                    templateUrl: 'modules/user/views/login.html',
                    controller: 'LoginController'
                })
                .state('app.user.signup', {
                    url: '/signup',
                    templateUrl: 'modules/user/views/signup.html',
                    controller: 'SignupController'
                })
                .state('app.user.info', {
                    url: '/info/:type/:userid',
                    templateUrl: 'modules/user/views/userinfo.html',
                    controller: 'UserInfoController'
                });

        });

})();
