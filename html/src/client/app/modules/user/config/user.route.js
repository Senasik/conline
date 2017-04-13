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
                    url: '/info/:userid',
                    template: '<div ui-view="header"></div><div ui-view="detail"></div>',
                    controller: 'InfoController',
                    resolve: {
                        thisuser: function($stateParams, UserApi, UserMap) {
                            return UserApi.getuserdetail({ userid: $stateParams.userid }).then(function(res) {
                                var data = res.data;
                                return UserMap.userDetailModel(data);
                            }, function() {
                                return null;
                            })
                        },
                        collectcourselist: function(CourseApi, CourseMap) {
                            return CourseApi.getcollectcoursebyuser().then(function(res) {
                                var data = res.data;
                                return CourseMap.courseListModel(data)
                            }, function() {
                                return [];
                            })
                        }
                    }
                })
                .state('app.user.info.teacher', {
                    url: '/teacher',
                    views: {
                        header: {
                            templateUrl: 'modules/user/views/elements/infoheader.html',
                            controller: 'InfoHeaderController'
                        },
                        detail: {
                            templateUrl: 'modules/user/views/teacherinfo.html',
                            controller: 'TeacherInfoController'
                        }
                    }

                })
                .state('app.user.info.student', {
                    url: '/student',
                    views: {
                        header: {
                            templateUrl: 'modules/user/views/elements/infoheader.html',
                            controller: 'InfoHeaderController'
                        },
                        detail: {
                            templateUrl: 'modules/user/views/stuinfo.html',
                            controller: 'StuInfoController'

                        }
                    }

                });

        });

})();
