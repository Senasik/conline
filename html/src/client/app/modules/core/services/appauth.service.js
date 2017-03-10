(function() {
    'use strict';

    angular
        .module('com.module.core')
        .factory('AppAuth', function($cookies, $http, $state, $sessionStorage, $localStorage, $location, toaster, CommonApi) {
            var self = {
                login: function(data) {

                    CommonApi.login(data).then(function(response) {
                        var data = response.data;
                        if (data.code === 1) {
                            if(data.data.token){
                              $cookies.put('token', data.data.token)
                            }
                            if ($sessionStorage.path) {
                                $location.path($sessionStorage.path)
                                return;
                            }
                            $state.go('app.home');
                            return;
                        }
                        if (data.code != -2) {
                        toaster.pop('error', '提示', '登陆失败: ' + data.msg);

                        }
                    }, function() {

                    });

                },
                logout: function(cbFun) {
                    $cookies.remove('u');


                },
                loginUser: function() {
                    if (!$cookies.get("u")) {
                        return null;
                    }
                    return null;
                }
            };
            return self;
        });

})();
