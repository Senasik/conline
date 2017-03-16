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
                .state('app.homework.default', {
                    url: '/create',
                    template: 'modules/homework/views/create.html',
                    controller: 'HomeworkCreateCtrl'
                })
                .state('app.homework.detail', {
                    url: '/detail/:homeworkid',
                    templateUrl: 'modules/homework/views/detail.html',
                    controller: 'HomeworkDetailCtrl',
                    resolve: {
                        homeworkModel: function($stateParams, HomeworkApi, HomeworkMap) {
                            return homeworkApi.gethomeworkdetail({ homeworkid: $stateParams.homeworkid }).then(function(res) {
                                var data = res.data;
                                return homeworkMap.homeworkDetailModel(data);
                            }, function() {
                                return null;
                            })

                        }
                    }


                })
        });

})();
