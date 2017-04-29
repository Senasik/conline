(function() {
    'use strict';

    angular
        .module('com.module.course')
        .factory('CourseMap', function($rootScope, ImgResize) {
            var self = {

                //课程列表
                courseListModel: function(data){
                    var courseModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0){
                        angular.forEach(data.data, function(value, index){
                            courseModel.push(self._convertNodeToUIDetailModel(value));
                        })
                    }

                    return courseModel;
                },

                //课程详细信息
                courseDetailModel: function(data){
                    var courseModel = {
                        title: '加载中...',
                        courseid: '',
                        cover: '',
                        creator: '',
                        tag: ''
                    };
                     if (data.code && data.code == 1 && data.data){
                        courseModel = self._convertNodeToUIDetailModel(data.data, courseModel);
                     }
                     return courseModel;
                },

                //按类所分课程信息
                courseModelByTag: function(data){
                    var tagcourseModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0){
                        angular.forEach(data.data, function(courselist, index){
                            var courseModel = [];
                            angular.forEach(courselist, function(value, index){
                                courseModel.push(self._convertNodeToUIDetailModel(value));
                            });
                            tagcourseModel.push(courseModel);
                        })
                    }
                    return tagcourseModel;
                },

                //ui转后端
                convertCourseModel: function(data) {
                    var courseModel = {};
                    courseModel = {
                        title: data.title,
                        type: data.type,
                        courseid: data.courseid,
                        cover: data.cover,
                        tag: data.tag
                    };
                    return courseModel;
                },

                //后端转ui
                _convertNodeToUIDetailModel: function(node, detailModel) {
                    if (!node) {
                        return null;
                    }
                    var model = detailModel?detailModel:{};

                    //课程id
                    if(node.courseid) {model.courseid = node.courseid;}
                    //课程名称
                    if(node.title) {model.title = node.title;}
                    //类型
                    if(node.type || node.type == 0) {model.type = node.type;}
                    //创建者
                    if(node.creator) {model.creator = node.creator;}
                    //是否收藏
                    if(node.collected) {model.collected = node.collected;}
                    //是否收藏
                    if(node.tag) {model.tag = node.tag;}
                    //封面图
                    if(node.cover) {model.cover = $rootScope.coverBase+node.cover;}
                    else{model.cover = $rootScope.noImg}
                    model.cover = ImgResize.sixteentonine(model.cover);

                    return model;
                }
            };
            return self;
        });

})();
