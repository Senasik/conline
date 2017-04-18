(function() {
    'use strict';
    angular
        .module('com.module.resource')
        .controller('ResourceDefaultCtrl', function($scope, $state, $cookies, $uibModal) {
        $state.go('app.resource.list')
        });
})();
