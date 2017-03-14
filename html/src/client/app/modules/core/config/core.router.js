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
          controller: 'MainCtrl',
          resolve: {
            //用token登录
            userModel: function($cookies, $localStorage, CommonApi){
              if (!$cookies.get('token')) return null;
              //直接用token获取，所以userid为空
              return CommonApi.userinfo({userid: ''}).then(function(response){
                var data = response.data;
                if(data.code && data.code === 1) return data.data;
                return null;
              },function(){
                return null;
              });
            }
          }
        }).state('app.default', {
          url: '',
          controller: 'AppDefaultCtrl',
          template: ''
        });

      $urlRouterProvider.otherwise('/router');
    });

})();