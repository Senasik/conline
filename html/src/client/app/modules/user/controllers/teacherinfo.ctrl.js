(function() {
    'use strict';
    angular
        .module('com.module.user')
        .controller('TeacherInfoController', ['$rootScope', '$scope', '$state', '$cookies', '$uibModal', 'toaster', 'CourseApi', 'SectionApi', 'userModel', 'thisuser', 'CourseMap', 'SectionMap', 'UserApi', 'UserMap', 'ResourceApi', 'ResourceMap', 'taglist', function($rootScope, $scope, $state, $cookies, $uibModal, toaster, CourseApi, SectionApi, userModel, thisuser, CourseMap, SectionMap, UserApi, UserMap, ResourceApi, ResourceMap, taglist) {

            //课程Collapse控制变量
            $scope.courseCollapsed = true;
            $scope.resourceCollapsed = true;



            //获取所有课程
            $scope.getCourselist = function() {
                $scope.courseCollapsed = !$scope.courseCollapsed;
                //如果是关闭collapse，直接返回
                if ($scope.courseCollapsed) return;
                $scope.courselist = [{ title: '加载中...' }]
                CourseApi.getcourselist({ userid: thisuser.userid }).then(function(res) {
                    $scope.courselist = CourseMap.courseListModel(res.data);
                    //如果结果长度为0，添加提示语
                    if ($scope.courselist.length == 0) {
                        $scope.nocourse = true;
                    }
                }, function() {

                });
            };
            //获取所有章节
            $scope.getSectionlist = function(course) {
                course.sectionCollapsed = !course.sectionCollapsed;
                //如果是关闭collapse，直接返回
                if (course.sectionCollapsed) return;
                //该课程下是否有课程
                course.nosection = false;
                course.sectionlist = [{ title: '加载中...' }]
                SectionApi.getsectionlist({ courseid: course.courseid }).then(function(res) {
                    course.sectionlist = SectionMap.sectionListModel(res.data);
                    //如果结果长度为0，添加提示语
                    if (course.sectionlist.length == 0) {
                        course.nosection = true;
                    }
                }, function() {

                });
            };

            //删除course
            $scope.deleteCourse = function(course) {
                $uibModal.open({
                    component: 'confirmComponent',
                    resolve: {
                        content: {
                            title: '是否删除',
                            body: '确定删除此课程吗？'
                        }
                    }
                }).result.then(function() {
                    CourseApi.deletecourse(CourseMap.convertCourseModel({ courseid: course.courseid })).then(function(res) {
                        var data = res.data;
                        if (data && data.code && data.code >= 0) {
                            toaster.pop('success', '提示', '删除成功');
                            $scope.courselist.splice($scope.courselist.indexOf(course), 1);
                            return;
                        }
                        toaster.pop('error', '提示', '删除失败：' + data.msg);
                    }, function() {
                        toaster.pop('error', '提示', '删除失败');
                    });
                });
            };
            //删除section
            $scope.deleteSection = function(section, course) {
                $uibModal.open({
                    component: 'confirmComponent',
                    resolve: {
                        content: {
                            title: '是否删除',
                            body: '确定删除此章节吗？'
                        }
                    }
                }).result.then(function() {
                    SectionApi.deletesection(SectionMap.convertsectionModel({ sectionid: section.sectionid })).then(function(res) {
                        var data = res.data;
                        if (data && data.code && data.code >= 0) {
                            toaster.pop('success', '提示', '删除成功');
                            course.sectionlist.splice(course.sectionlist.indexOf(section), 1);
                            return;
                        }
                        toaster.pop('error', '提示', '删除失败：' + data.msg);
                    }, function() {
                        toaster.pop('error', '提示', '删除失败');
                    });
                });
            };
            //修改course
            $scope.editCourse = function(course) {
                //根据课程的tagid获取到tag
                var tag = {}
                angular.forEach(taglist, function(val){
                    if (val.tagid == course.tag)
                        tag = val;
                })
                $uibModal.open({
                    component: 'confirmComponent',
                    resolve: {
                        content: {
                            title: '修改名称',
                            bodyUrl: 'modules/user/views/elements/editcourse.html',
                            token: $cookies.get('token'),
                            course: course,
                            cover: course.cover,
                            tag: tag,
                            taglist: taglist
                        }
                    }
                }).result.then(function(context) {
                    if (!context) return;
                    CourseApi.editcourse(CourseMap.convertCourseModel({ courseid: course.courseid, title: context.name, tag: context.tag })).then(function(res) {
                        var data = res.data;
                        if (data && data.code && data.code >= 0) {
                            toaster.pop('success', '提示', '编辑成功');
                            course.title = context.name;
                            return;
                        }
                        toaster.pop('error', '提示', '编辑失败：' + data.msg);
                    }, function() {
                        toaster.pop('error', '提示', '编辑失败');
                    });
                });
            };
            //修改section名称
            $scope.editSection = function(section) {
                $uibModal.open({
                    component: 'confirmComponent',
                    resolve: {
                        content: {
                            title: '修改名称',
                            bodyUrl: 'modules/user/views/elements/editsection.html'
                        }
                    }
                }).result.then(function(context) {
                    SectionApi.editsection(SectionMap.convertsectionModel({ sectionid: section.sectionid, title: context.name })).then(function(res) {
                        var data = res.data;
                        if (data && data.code && data.code >= 0) {
                            toaster.pop('success', '提示', '编辑成功');
                            section.title = context.name;
                            return;
                        }
                        toaster.pop('error', '提示', '编辑失败：' + data.msg);
                    }, function() {
                        toaster.pop('error', '提示', '编辑失败');
                    });
                });
            };

            //获取资源列表
            $scope.getResourcelist = function() {
                $scope.resourceCollapsed = !$scope.resourceCollapsed;
                //如果是关闭collapse，直接返回
                if ($scope.resourceCollapsed) return;
                $scope.resourcelist = [{ title: '加载中...' }]
                ResourceApi.getresourcelist({ userid: thisuser.userid }).then(function(res) {
                    $scope.resourcelist = ResourceMap.resourceListModel(res.data);
                    //如果结果长度为0，添加提示语
                    if ($scope.resourcelist.length == 0) {
                        $scope.noresource = true;
                    }
                }, function() {

                })
            }
            //下载资源
            $scope.download = function(resource){
                window.open($rootScope.resourceBase+resource.fileurl)
            }
            //删除资源
            $scope.deleteResource = function(resource){
                $uibModal.open({
                    component: 'confirmComponent',
                    resolve: {
                        content: {
                            title: '是否删除',
                            body: '确定删除此资源吗？'
                        }
                    }
                }).result.then(function() {
                    ResourceApi.deleteresource(ResourceMap.convertresourceModel({ resourceid: resource.resourceid })).then(function(res) {
                        var data = res.data;
                        if (data && data.code && data.code >= 0) {
                            toaster.pop('success', '提示', '删除成功');
                            $scope.resourcelist.splice($scope.resourcelist.indexOf(resource), 1);
                            return;
                        }
                        toaster.pop('error', '提示', '删除失败：' + data.msg);
                    }, function() {
                        toaster.pop('error', '提示', '删除失败');
                    });
                });

            }

        }]);

})();
