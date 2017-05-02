(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('StuInfoController', ['$scope', '$state', 'thisuser', 'collectcourselist', 'historycourse', function($scope, $state, thisuser, collectcourselist, historycourse) {
            //收藏课程列表
            $scope.collectcourselist = collectcourselist;
            //历史记录
            $scope.historycourse = historycourse;

        }]);

})();
