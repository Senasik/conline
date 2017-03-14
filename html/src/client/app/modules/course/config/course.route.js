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
                    controller: 'CourseCtrl'
                })
                .state('app.course.default', {
                    url: '',
                    template: '',
                    controller: 'DefaultCtrl'
                })
                .state('app.course.list', {
                    url: '/list',
                    templateUrl: 'modules/course/views/list.html',
                    controller: 'ListCtrl'
                })
                .state('app.course.section', {
                    url: '/section/:sectionid',
                    templateUrl: 'modules/course/views/section.html',
                    controller: 'SectionCtrl'
                })
                .state('app.course.create', {
                    url: '/create',
                    templateUrl: 'modules/course/views/create.html',
                    controller: 'CreateCtrl',
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
        });

})();
