(function() {
    'use strict';
    angular
        .module('com.module.homework')
        .config(function($stateProvider) {

            $stateProvider
                .state('app.homework', {
                    abstract: true,
                    url: '/homework',
                    template: '<div ui-view></div>',
                    controller: 'HomeworkCtrl'
                })
                .state('app.homework.default', {
                    url: '',
                    template: '',
                    controller: 'HomeworkDefaultCtrl'
                })
                .state('app.homework.create', {
                    url: '/create',
                    templateUrl: 'modules/homework/views/create.html',
                    controller: 'HomeworkCreateCtrl',
                    resolve: {
                        sectionlist: function(SectionApi, SectionMap){
                            return SectionApi.getsectionlist().then(function(res){
                                var data = res.data;
                                return SectionMap.sectionListModel(data)
                            }, function(){
                                return null;
                            })
                        }
                    }
                })
                .state('app.homework.detail', {
                    url: '/:sectionid',
                    templateUrl: 'modules/homework/views/detail.html',
                    controller: 'HomeworkDetailCtrl',
                    resolve: {
                        homeworklsit: function($stateParams, HomeworkApi, HomeworkMap) {
                            return HomeworkApi.gethomeworkbysection({ sectionid: $stateParams.sectionid }).then(function(res) {
                                var data = res.data;
                                return HomeworkMap.homeworkListModel(data);
                            }, function() {
                                return null;
                            })

                        }
                    }


                })
        });

})();
