(function() {
    'use strict';
    angular
        .module('com.module.section')
        .controller('SectionDetailCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, sectionModel) {
 			$scope.section = sectionModel;
        	
        });
})();
