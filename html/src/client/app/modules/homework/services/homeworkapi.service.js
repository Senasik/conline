(function() {
  'use strict';

  /*
  章节api模块
  */

  angular
    .module('com.module.homework')
    .factory('HomeworkApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
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
        //获取题目详情{homeworkids}
        gethomework: function(data){
          var url = 'gethomework';
          return self._http(url, data);
        }

        //创建题目
        creathomework: function(data){
          var url = 'creathomework';
          return self._http(url, data);
        }
      };
      return self;
    });

})();