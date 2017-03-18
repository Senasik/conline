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
        

      };
      return self;
    });

})();