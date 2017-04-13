(function() {
    'use strict';
    angular
        .module('com.module.course')
        .config(function($stateProvider) {
            $stateProvider
                .state('app.course', {
                    abstract: true,
                    url: '/course',
                    template: '<div ui-view></div>',
                    controller: 'CourseCtrl',
                    resolve: {
                        courselist: function(CourseApi, CourseMap) {
                            return CourseApi.getcourselist().then(function(res) {
                                return CourseMap.courseListModel(res.data);
                            }, function() {
                                return null;
                            })
                        }
                    }
                    
                })
                .state('app.course.default', {
                    url: '',
                    template: '',
                    controller: 'CourseDefaultCtrl'
                })
                .state('app.course.list', {
                    url: '/list',
                    templateUrl: 'modules/course/views/list.html',
                    controller: 'CourseListCtrl'
                })
                .state('app.course.create', {
                    url: '/create',
                    templateUrl: 'modules/course/views/create.html',
                    controller: 'CourseCreateCtrl'
                    
                })
        });

})();
