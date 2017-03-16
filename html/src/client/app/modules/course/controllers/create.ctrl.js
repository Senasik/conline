(function() {
    'use strict';
    angular
        .module('com.module.course')
        .controller('CourseCreateCtrl', function($scope, $cookies, $uibModal, toaster, CourseApi, CourseMap, courselist) {

            $scope.uploadlist = [];

            //初始化课程下拉框
            $scope.courselist = courselist;


            //上传文件要传的cookie
            $scope.token = $cookies.get('token')

            //创建课程
            $scope.creatcourse = function() {
                $uibModal.open({
                    component: 'confirmComponent',
                    resolve: {
                        content: {
                            title: '创建课程',
                            bodyUrl: 'modules/course/views/elements/creatcourse.html'
                        }

                    }
                }).result.then(function(context) {
                    CourseApi.creatcourse(CourseMap.convertCourseModel(context)).then(function(res) {
                        var data = res.data;
                        if (data && data.code == 1) {
                            toaster.pop('success', '提示', '创建成功');
                            $scope.courselist.push(CourseMap.courseDetailModel(data))
                            return;
                        }
                        toaster.pop('error', '提示', '创建失败:' + data.msg);
                        return;
                    }, function() {
                        return;
                    })

                }, function(context) {

                });

            }

            //添加新章节
            $scope.addUpload = function() {
                $scope.uploadlist.push({});
            }




        });
})();
