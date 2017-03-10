(function() {
  'use strict';
  angular
    .module('com.module.home')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        
        .state('app.home', {
          url: '/home',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">home.</div>'
        });
    });

})();