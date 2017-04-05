(function() {
    'use strict';
    angular
        .module('com.module.home')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'modules/home/views/home.html',
                    controller: 'HomeController',
                    resolve: {
                        recommendcourses: function(CourseMap, CourseApi) {
                            return CourseApi.getrecommendsources().then(function(res) {
                                var data = res.data;
                                return CourseMap.courseListModel(data);
                            }, function() {
                                return [];
                            });
                        },
                        noticlist: function(NoticApi, NoticMap) {
                            var model = { size: 5, index: 1 };
                            return NoticApi.getnoticlist(model).then(function(res) {
                                var data = res.data;
                                return NoticMap.noticListModel(data);
                            }, function() {
                                return null;
                            })
                        }
                    }
                });
        });

})();
