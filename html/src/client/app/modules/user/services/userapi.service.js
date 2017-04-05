(function() {
  'use strict';

  /*
  用户api模块
  */

  angular
    .module('com.module.user')
    .factory('UserApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
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
        //用户注册  参数：username,password
        signup: function(data){
          var url = 'signup'
          return self._http(url, data)
        },

        //获取用户详情{userid}
        getuserdetail: function(data){
          var url = 'getuserdetail';
          return self._http(url, data)
        },

        //修改密码 newpwd,oldpwd
        alertpwd: function(data){
          var url = 'alertpwd';
          return self._http(url, data)
        }
      };
      return self;
    });

})();