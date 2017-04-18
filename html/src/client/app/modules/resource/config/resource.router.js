(function() {
    'use strict';
    angular
        .module('com.module.resource')
        .config(function($stateProvider) {

            $stateProvider
                .state('app.resource', {
                    url: '/resource',
                    template: '<div ui-view></div>',
                    controller: 'ResourceCtrl'
                })
                .state('app.resource.default', {
                    url: '',
                    templateUrl: '',
                    controller: 'ResourceDefaultCtrl'
                })
                .state('app.resource.list', {
                    url: '/list',
                    templateUrl: 'modules/resource/views/list.html',
                    controller: 'ResourceListCtrl'
                })
                .state('app.resource.create', {
                    url: '/create',
                    templateUrl: 'modules/resource/views/create.html',
                    controller: 'ResourceCreatCtrl'
                })
                .state('app.resource.detail', {
                    url: '/:resourceid',
                    templateUrl: 'modules/resource/views/detail.html',
                    controller: 'ResourceDetailCtrl'

                })
        });

})();
