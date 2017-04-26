(function() {
    'use strict';

    angular
        .module('com.module.core')
        .factory('ImgResize', function($cookies, $http, $state, $sessionStorage, $localStorage, $location, toaster, UserApi) {
            var self = {
                sixteentonine: function(img){
                    return img + '?width=160&height=90';
                },
                onetoone: function(img){
                    return img + '?width=100&height=100';
                }
            }
            return self;
        });

})();
