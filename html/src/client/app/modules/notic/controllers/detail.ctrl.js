(function() {
    'use strict';
    angular
        .module('com.module.notic')
        .controller('NoticDetailCtrl', function($scope, $state, $cookies, $timeout, $uibModal, toaster, noticmodel) {
            $scope.notic = noticmodel;
            $timeout(function() {
            	//向上层传递
                $scope.noticcb.isdetail = true;

            });

        });
})();
