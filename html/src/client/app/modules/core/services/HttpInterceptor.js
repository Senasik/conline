(function() {
    'use strict';
    /*
     参考：http://www.tuicool.com/articles/eMZBN3
    */
    angular.module('com.module.core')
        .service('HttpInterceptor', function($q, $location, $sessionStorage, $cookies, toaster) {


            return {
                request: function(config) {
                    return config;
                },
                requestError: function(err) {
                    return $q.reject(err);
                },
                response: function(res) {
                    if (res.data && res.data.code === -2) {
                        $cookies.remove('token')
                        toaster.pop({
                            type: "warning",
                            title: '提示',
                            body: '登录票据失效,请重新登录!',
                            timeout: 1000,
                            onHideCallback: function() {
                                $sessionStorage.path = $location.path()
                                $location.path('/user/login');
                            }
                        });
                    }

                    return res;
                },
                responseError: function(err) {

                    if (err.status === -1)
                        toaster.pop('warning', "提示", "当前无网络，请检查网络链接!");

                    return $q.reject(err);
                }

            };
        });
})();