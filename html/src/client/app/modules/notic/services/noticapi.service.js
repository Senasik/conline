(function() {
  'use strict';

  /*
  章节api模块
  */

  angular
    .module('com.module.notic')
    .factory('NoticApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
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
        //获取公告详情{noticid}
        getnoticdetail: function(data){
          var url = 'getnoticdetail';
          return self._http(url, data);
        },
        //获取公告列表{size,index}
        getnoticlist: function(data){
          var url = 'getnoticlist';
          return self._http(url, data);
        },
        //创建公告
        creatnotic: function(data){
          var url = 'creatnotic';
          return self._http(url, data);
        }

      };
      return self;
    });

})();