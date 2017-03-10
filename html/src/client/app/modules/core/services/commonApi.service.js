(function() {
  'use strict';

  /*
  公共api模块
  */

  angular
    .module('com.module.core')
    .factory('CommonApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
      var self = {
        _http: function(url, data){
          var url = $rootScope.apiUrl + url;
          var resultdetails = $http({
            method: 'post',
            url: url,
            data: data
          });
          return resultdetails;
        },

        //用户登录
        login: function(data) {
          var url = 'login'
          return self._http(url, data)
        },

        //用户登出
        logout: function(data) {
          var url = 'logout'
          return self._http(url, data)
        },

        //用户注册
        signup: function(data){
          var url = 'signup'
          return self._http(url, data)
        }
      };
      return self;
    });

})();