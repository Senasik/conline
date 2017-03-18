(function() {
    'use strict';

    angular
        .module('com.module.homework')
        .factory('HomeworkMap', function() {
            var self = {

                //题目列表
                homeworkListModel: function(data) {
                    var homeworkModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0) {
                        angular.forEach(data.data, function(value, index) {
                            homeworkModel.push(self._convertNodeToUIDetailModel(value));
                        })
                        return homeworkModel;
                    }

                    return null;
                },

                //题目详细信息
                homeworkDetailModel: function(data) {
                    var homeworkModel = {
                        'homeworkid': '',
                        'title': '加载中...',
                        'creator': '',
                        'type': 1,
                        'answer': '',
                        'option': ''
                    };
                    if (data.code && data.code == 1 && data.data) {
                        homeworkModel = self._convertNodeToUIDetailModel(data.data, homeworkModel);
                    }
                    return homeworkModel;
                },

                //ui转后端
                converthomeworkModel: function(data) {
                    var homeworkModel = {};
                    homeworkModel = {
                        title: data.title,
                        type: data.type,
                        answer: data.answer,
                        father: data.father
                    };
                    //option默认赋值的话回传null
                    if(homeworkModel.type == 0)homeworkModel.option = data.option;

                    return homeworkModel;
                },

                //后端转ui
                _convertNodeToUIDetailModel: function(node, detailModel) {
                    if (!node) {
                        return null;
                    }
                    var model = detailModel ? detailModel : {};

                    //题目id
                    if (node.homeworkid) { model.homeworkid = node.homeworkid; }
                    //题目名称
                    if (node.title) { model.title = node.title; }
                    //类型
                    if (node.type || node.type == 0) { model.type = node.type; }
                    //答案
                    if (node.answer) { model.answer = node.answer; }
                    //创建者
                    if (node.creator) { model.creator = node.creator; }
                    //选项
                    if (node.option) { model.option = eval(node.option); }

                    return model;
                }
            };
            return self;
        });

})();
