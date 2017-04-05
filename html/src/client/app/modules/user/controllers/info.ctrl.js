(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('InfoController', ['$scope', '$state', 'CourseApi', 'SectionApi', 'userModel','CourseMap', 'SectionMap', 'thisuser', function($scope, $state, CourseApi, SectionApi, userModel, CourseMap, SectionMap, thisuser) {
        	$scope.user = thisuser;
            if (!thisuser) {
                toaster.pop({
                    type: "warning",
                    title: '提示',
                    body: '未获取到数据，即将转至主页',
                    timeout: 1000,
                    onHideCallback: function() {
                        $state.go('app.home');
                    }
                });
                return;
            }
            //是否是自己
            $scope.isme = thisuser.userid == userModel.userid ? true : false;
            //md5加密需要jquery
            $scope.$ = window.$;

        }]);

})();
