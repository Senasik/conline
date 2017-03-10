(function() {
    'use strict';
    angular
        .module('com.module.core')
        .config(['$localStorageProvider', '$httpProvider', '$sceDelegateProvider', '$cookiesProvider', function($localStorageProvider, $httpProvider, $sceDelegateProvider, $cookiesProvider) {
            /*设置ngstorage的前缀*/
            $localStorageProvider.setKeyPrefix('Conline-');

            $httpProvider.interceptors.push('HttpInterceptor');
            /*http超时时间配置*/
            $httpProvider.defaults.timeout = 5000;
            $httpProvider.defaults.withCredentials = true;

            $httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };

            //cookie默认设置
            $cookiesProvider.defaults.path = '/';
            $cookiesProvider.defaults.domain = 'conline.com';
            $cookiesProvider.defaults.expires = new Date('3000/01/01');



        }])
        .run(function($rootScope, i18nService) {
            // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //  if (toState.name.indexOf('.default') == -1 && toState.name.indexOf('app.') != -1)
            //      Navs.recordNode(toParams.appId, toState.name);
            // });

            $rootScope.apiUrl = 'http://c.conline.com:8000/webapi/';

            i18nService.setCurrentLang('zh-cn');
        });
})();
