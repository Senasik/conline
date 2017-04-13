(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('StuInfoController', ['$scope', '$state', 'thisuser', 'collectcourselist', function($scope, $state, thisuser, collectcourselist) {
            //收藏课程列表
            $scope.collectcourselist = collectcourselist;

        }]);

})();
