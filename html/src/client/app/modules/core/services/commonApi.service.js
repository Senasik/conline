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
        //用户登录  参数：username,password
        login: function(data) {
          var url = 'login'
          return self._http(url, data)
        },
        //用户注册  参数：username,password
        signup: function(data){
          var url = 'signup'
          return self._http(url, data)
        },
        //获取用户信息  参数：userid
        userinfo: function(data){
          var url = 'userinfo'
          return self._http(url, data)
        }
      };
      return self;
    });

})();