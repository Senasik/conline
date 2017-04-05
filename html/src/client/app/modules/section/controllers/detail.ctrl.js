(function() {
    'use strict';
    angular
        .module('com.module.section')
        .controller('SectionDetailCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, sectionModel) {
 			$scope.section = sectionModel;
 			//通知list已经进入详情
        	$scope.sectioncb.isdetail = true;
        });
})();
