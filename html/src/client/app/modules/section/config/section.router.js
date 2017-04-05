(function() {
    'use strict';
    angular
        .module('com.module.section')
        .config(function($stateProvider) {

            $stateProvider
                .state('app.section', {
                    url: '/:courseid/section',
                    templateUrl: 'modules/section/views/list.html',
                    controller: 'SectionListCtrl',
                    resolve: {
                        courseModel: function($stateParams, CourseApi, CourseMap){
                            return CourseApi.getcoursedetail({courseid: $stateParams.courseid}).then(function(res) {
                                var data = res.data;
                                return CourseMap.courseDetailModel(data);
                            }, function() {
                                return null;
                            })
                        },
                        sectionlist: function($stateParams, SectionApi, SectionMap) {
                            return SectionApi.getsectionlist({ courseid: $stateParams.courseid }).then(function(res) {
                                var data = res.data;
                                return SectionMap.sectionListModel(data);
                            }, function() {
                                return null;
                            })

                        }
                    }
                })
                .state('app.section.detail', {
                    url: '/detail/:sectionid',

                    templateUrl: 'modules/section/views/detail.html',
                    controller: 'SectionDetailCtrl',
                    resolve: {
                        sectionModel: function($stateParams, SectionApi, SectionMap) {
                            return SectionApi.getsectiondetail({ sectionid: $stateParams.sectionid }).then(function(res) {
                                var data = res.data;
                                return SectionMap.sectionDetailModel(data);
                            }, function() {
                                return null;
                            })

                        }
                    }



                })
        });

})();
