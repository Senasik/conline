(function() {
  'use strict';

  /*
  章节api模块
  */

  angular
    .module('com.module.resource')
    .factory('ResourceApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
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
        //获取资源详情{resourceid}
        getresourcedetail: function(data){
          var url = 'getresourcedetail';
          return self._http(url, data);
        },
        //获取资源列表{size,index}
        getresourcelist: function(data){
          var url = 'getresourcelist';
          return self._http(url, data);
        }
      };
      return self;
    });

})();