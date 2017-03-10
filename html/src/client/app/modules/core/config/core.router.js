(function() {
  'use strict';
  angular
    .module('com.module.core')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100%"></div>',
          controller: 'RouteCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">发生了错误.</div>'
        })
        .state('app', {
          abstract: true,
          url: '',
          templateUrl: 'modules/core/views/app.html',
          controller: 'MainCtrl'
        }).state('app.default', {
          url: '',
          controller: 'AppDefaultCtrl',
          template: ''
        });

      $urlRouterProvider.otherwise('/router');
    });

})();