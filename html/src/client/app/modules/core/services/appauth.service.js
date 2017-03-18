(function() {
    'use strict';

    angular
        .module('com.module.core')
        .factory('AppAuth', function($cookies, $http, $state, $sessionStorage, $localStorage, $location, toaster, UserApi) {
            var self = {
                login: function(data) {

                    UserApi.login(data).then(function(response) {
                        var data = response.data;
                        if (data.code === 1) {
                            //存储相关信息
                            if(data.data.token){
                              $cookies.put('token', data.data.token);
                             
                            }
                            //如果是从其他页面进来的，跳转到相关页面
                            if ($sessionStorage.path) {
                                location.href = '#'+$sessionStorage.path;
                                location.reload();
                                return;
                            }
                            location.href = '#/home';
                            location.reload();
                            return;
                        }
                        if (data.code != -2) {
                        toaster.pop('error', '提示', '登录失败: ' + data.msg);

                        }
                    }, function() {

                    });

                },
                logout: function(cbFun) {
                    $cookies.remove('token');
                    location.href = '#/home';
                    location.reload();
                }
                // loginUser: function() {
                //     if (!$cookies.get("token") || !$localStorage.u) {
                //         return null;
                //     }
                //     if($localStorage.u){
                //         return $localStorage.u;
                //     }

                //     return null;
                // }
            };
            return self;
        });

})();
