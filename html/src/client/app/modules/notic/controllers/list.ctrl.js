(function() {
    'use strict';
    angular
        .module('com.module.notic')
        .controller('NoticListCtrl', function($scope, $state, $cookies, toaster, NoticApi, NoticMap, noticlist, listsize) {
            if (!noticlist) {
                toaster.pop({
                    type: "warning",
                    title: '提示',
                    body: '未获取到数据，即将跳转到主页',
                    timeout: 1000,
                    onHideCallback: function() {
                        $state.go('app.home');
                    }
                });
                return;
            }

            //列表数据
            $scope.noticlist = noticlist;
            //当前第几页
            $scope.index = 1;
            //记录是否是最后一页
            $scope.isover = false;
            //是否是公告详情
            $scope.noticcb = {};
            $scope.noticcb.isdetail = false;

            $scope.getmore = function() {
                var model = { size: listsize, index: $scope.index + 1 }
                NoticApi.getnoticlist(model).then(function(res) {
                    var data = NoticMap.noticListModel(res.data);
                    $scope.noticlist = $scope.noticlist.concat(data);
                    if(data.length < listsize){$scope.isover = true;}
                    $scope.index++;
                }, function() {
                    toaster.pop('error', '提示', '获取列表失败');
                });
            }
        });
})();
