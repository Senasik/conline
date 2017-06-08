(function() {
    'use strict';
    angular
        .module('com.module.section')
        .controller('SectionDetailCtrl', function($scope, $state, $cookies, $timeout, $uibModal, toaster, SectionApi, sectionModel) {
 			$scope.section = sectionModel;
 			//通知list已经进入详情
        	$scope.sectioncb.isdetail = true;
        	//如果有fileurl，那么修改fileurl
        	if($scope.section.fileurl != ''){
        	$scope.section.fileurl = $scope.videoBase+$scope.section.fileurl;
        	$timeout(function(){
        	$('#sectionfile').append('<embed src="'+ $scope.section.fileurl +'"> </embed>')

        	}, 100)
        	}
        });
})();
