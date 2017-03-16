(function() {
    'use strict';
    angular
        .module('com.module.section')
        .controller('SectionListCtrl', function($scope, $state, $cookies, $uibModal, toaster, SectionApi, sectionlist) {
        	$scope.sectionlist = sectionlist;
        	if(!sectionlist || sectionlist.length == 0){
				$scope.sectionlist = [{title: '加载中...'}]
			}


        });
})();
