(function() {
  'use strict';

  /*
  章节api模块
  */

  angular
    .module('com.module.section')
    .factory('SectionApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
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
        
        //获取章节列表{courseid}没有参数那么就是查询已登录用户所有的section
        getsectionlist: function(data){
          var url = 'getsectionlist';
          return self._http(url, data)
        },

        //获取章节详情{sectionid}
        getsectiondetail: function(data){
          var url = 'getsectiondetail';
          return self._http(url, data)
        }
      };
      return self;
    });

})();