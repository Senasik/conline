(function() {
  'use strict';

  /*
  课程api模块
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
          return self._http(url, data)
        },

        //创建课程, 用token
        creatcourse: function(data){
          var url = 'creatcourse';
          return self._http(url, data)
        },

        //删除课程 courseid
        deletecourse: function(data){
          var url = 'deletecourse';
          return self._http(url, data)
        },

        //编辑课程 courseid，coursename
        editcourse: function(data){
          var url = 'editcourse';
          return self._http(url, data)
        },

        //获取推荐课程
        getrecommendsources: function(){
          var url = 'getrecommendsources';
          return self._http(url)
        },

        //获取课程详情{courseid}
        getcoursedetail: function(data){
          var url = 'getcoursedetail';
          return self._http(url, data)
        },

        //查询课程{keyword}
        searchcourse: function(data){
          var url = 'searchcourse';
          return self._http(url, data)
        },

        //收藏课程{courseid, operate:0 取消收藏, 1 收藏}
        collectcourse: function(data){
          var url = 'collectcourse';
          return self._http(url, data)
        },

        //查询收藏课程{userid或者用cookie}
        getcollectcoursebyuser: function(data){
          var url = 'getcollectcoursebyuser';
          return self._http(url, data)
        },

        //获取历史浏览记录{size, index}
        gethistorycourse: function(data){
          var url = 'gethistorycourse';
          return self._http(url, data)
        },

        //获取轮播图
        getcarousellist: function(){
          var url = 'getcarousellist';
          return self._http(url);
        },

        //获取分类
        gettaglist: function(){
          var url = 'gettaglist';
          return self._http(url);
        },

        //根据分类获取课程{tag, size, index}
        getcourselistbytag: function(data){
          var url = 'getcourselistbytag';
          return self._http(url, data);
        },
       
      };
      return self;
    });

})();