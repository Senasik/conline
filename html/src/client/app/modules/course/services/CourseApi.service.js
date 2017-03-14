(function() {
  'use strict';

  /*
  公共api模块
  */

  angular
    .module('com.module.course')
    .factory('CourseApi', function($rootScope, $cookies, $http, $sessionStorage, $localStorage) {
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
        
        //获取课程列表,用token
        getcourselist: function(data){
          var url = 'getcourselist';
          return self._http(url)
        },

        //创建课程, 用token
        creatcourse: function(data){
          var url = 'creatcourse';
          return self._http(url, data)
        },

        //获取章节列表{courseid}
        getsectionlist: function(data){
          var url = 'getsectionlist';
          return self._http(url, data)
        },

        //获取章节详情{sectionid}
        getsection: function(data){
          var url = 'getsection';
          return self._http(url, data)
        }
      };
      return self;
    });

})();