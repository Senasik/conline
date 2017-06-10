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
	        	var file = $scope.section.fileurl = $scope.videoBase+$scope.section.fileurl;
	        	if (file.split('.').pop() == 'mp4'){
	        		//如果是视频，那么使用flv.js
		        	$timeout(function(){
			        	if (flvjs.isSupported()) {
			        		$('#sectionfile').append('<video id="sectionvideo"></video>')
					        var videoElement = document.getElementById('sectionvideo');
					        var flvPlayer = flvjs.createPlayer({
					            type: 'mp4',
					            url: file
					        });
					        flvPlayer.attachMediaElement(videoElement);
					        flvPlayer.load();
					        flvPlayer.play();
				    	}
		        	}, 100)
	        	}else{
	        		$timeout(function(){
		        	$('#sectionfile').append('<embed src="'+ $scope.section.fileurl +'"> </embed>')
	        	}, 100)
	        	}
	        	
        	}else{
        		$timeout(function(){
		        	$('#sectioncontent').html(markdown.toHTML($scope.section.content))
	        	}, 100)
        	}
        });
})();
