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
                    abstrate: true,
                    url: '/info',
                    templateUrl: '',
                    controller: 'InfoController',
                    resolve: {
                        thisuser: function(UserApi, UserMap){
                            return UserApi.login().then(function(res) {
                                var data = res.data;
                                return UserMap.userDetailModel(data);
                            }, function() {
                                return null;
                            })
                        }
                    }
                })
                .state('app.user.info.teacher', {
                    url: '/teacher/:userid',
                    templateUrl: 'modules/user/views/teacherinfo.html',
                    controller: 'TeacherInfoController'
                })
                .state('app.user.inso.student', {
                    url: '/student/:userid',
                    templateUrl: 'modules/user/views/stuinfo.html',
                    controller: 'StuInfoController'
                });

        });

})();
