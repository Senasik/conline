(function() {
    'use strict';

    angular
        .module('com.module.course')
        .factory('CourseMap', function() {
            var self = {

                //课程列表
                courseListModel: function(data){
                    var courseModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0){
                        angular.forEach(data.data, function(value, index){
                            courseModel.push(self._convertNodeToUIDetailModel(value));
                        })
                        return courseModel;
                    }

                    return null;
                },

                //课程详细信息
                courseDetailModel: function(data){
                    var courseModel = {
                        title: '加载中...',
                        courseid: '',
                        creator: ''
                    };
                     if (data.code && data.code == 1 && data.data){
                        courseModel = self._convertNodeToUIDetailModel(data.data, courseModel);
                     }
                     return courseModel;
                },

                //ui转后端
                convertCourseModel: function(data) {
                    var courseModel = {};
                    courseModel = {
                        title: data.title,
                        type: data.type
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

                    return model;
                }
            };
            return self;
        });

})();
