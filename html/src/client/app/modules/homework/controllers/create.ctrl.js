(function() {
    'use strict';
    angular
        .module('com.module.homework')
        .controller('HomeworkCreateCtrl', function($scope, $state, $cookies, $uibModal, toaster, HomeworkApi, HomeworkMap, SectionApi, SectionMap, courselist) {
            $scope.courselist = courselist;
            if (courselist.length == 0) {
                $scope.courselist = [{ title: '暂未创建课程' }]
            }


            //课程改变时获取章节
            $scope.getsection = function(course) {
                SectionApi.getsectionlist({ courseid: course.courseid }).then(function(res) {
                    var data = res.data;
                    $scope.sectionlist = SectionMap.sectionListModel(data);
                    if($scope.sectionlist.length == 0){
                         $scope.sectionlist = [{ title: '暂未创建章节' }]
                    }
                    $scope.creathomework.section = $scope.sectionlist[0];
                    $scope.creathomework.father = $scope.creathomework.section.sectionid
                }, function() {
                    toaster.pop('error', '提示', '获取章节列表错误')
                })
            }


            //创建题目
            $scope.creatHormwrok = function() {
                HomeworkApi.creathomework(HomeworkMap.converthomeworkModel($scope.creathomework)).then(function(res) {
                    var data = res.data;
                    if (data && data.code && data.code >= 0) {
                        toaster.pop('success', '提示', '创建成功');
                        return;
                    }
                    toaster.pop('error', '提示', '创建失败:'+data.msg);
                }, function() {
                    toaster.pop('error', '提示', '创建失败');

                })
            }
        });
})();
