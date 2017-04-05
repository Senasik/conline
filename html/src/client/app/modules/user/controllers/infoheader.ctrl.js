(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('InfoHeaderController', ['$scope', '$state', '$uibModal', 'toaster', 'UserMap', 'UserApi', function($scope, $state, $uibModal, toaster, UserMap, UserApi) {
            //修改密码
            $scope.alertpwd = function() {
                try {
                    $uibModal.open({
                        component: 'confirmComponent',
                        resolve: {
                            content: {
                                title: '修改密码',
                                bodyUrl: 'modules/user/views/elements/alertpwd.html'
                            }

                        }
                    }).result.then(function(context) {
                        UserApi.alertpwd(UserMap.convertUserModel(context)).then(function(res) {
                            var data = res.data;
                            if (data && data.code && data.code >= 0) {
                                toaster.pop('success', '提示', '修改成功,下次登录请使用新密码');
                                return;
                            }
                            toaster.pop('error', '提示', '修改失败:' + data.msg);
                        }, function() {
                            toaster.pop('error', '提示', '修改失败');

                        })

                    }, function() {

                    });
                } catch (e) {

                }
            };

        }]);

})();
