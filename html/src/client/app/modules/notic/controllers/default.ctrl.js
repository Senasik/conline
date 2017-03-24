(function() {
    'use strict';
    angular
        .module('com.module.notic')
        .controller('NoticDefaultCtrl', function($scope, $state, $cookies, $uibModal, toaster, CourseApi) {
        $state.go('app.notic.list')
        });
})();
