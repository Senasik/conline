(function() {
    'use strict';
    angular
        .module('com.module.resource')
        .config(function($stateProvider) {

            $stateProvider
                .state('app.resource', {
                    abstract: true,
                    url: '/resource',
                    template: '<div ui-view="list"></div><div ui-view="detail"></div>',
                    controller: 'resourceCtrl'
                })
                .state('app.resource.default', {
                    url: '',
                    template: '',
                    controller: 'resourceDefaultCtrl'
                })
                .state('app.resource.list', {
                    url: '/list',
                    views: {
                        'list': {
                            templateUrl: 'modules/resource/views/list.html',
                            controller: 'resourceListCtrl'
                        }
                    }
                    
                })
                .state('app.resource.detail', {
                    url: '/:resourceid',
                    views: {
                        'list': {
                            templateUrl: 'modules/resource/views/list.html',
                            controller: 'resourceListCtrl'
                        },
                        'detail': {
                            templateUrl: 'modules/resource/views/detail.html',
                            controller: 'resourceDetailCtrl'
                        }
                    }
                    
                })
        });

})();
