(function() {
    'use strict';

    angular
        .module('com.module.section')
        .factory('SectionMap', function() {
            var self = {

                //章节列表
                sectionListModel: function(data) {
                    var sectionModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0) {
                        angular.forEach(data.data, function(value, index) {
                            sectionModel.push(self._convertNodeToUIDetailModel(value));
                        })
                        return sectionModel;
                    }

                    return null;
                },

                //章节详细信息
                sectionDetailModel: function(data) {
                    var sectionModel = {
                        'sectionid': '',
                        'title': '加载中...',
                        'creator': '',
                        'type': 0,
                        'content': '加载中...',
                        'fileurl': '',
                        'father': '',
                        'homeworkids': []
                    };
                    if (data.code && data.code == 1 && data.data) {
                        sectionModel = self._convertNodeToUIDetailModel(data.data, sectionModel);
                    }
                    return sectionModel;
                },

                //ui转后端
                convertsectionModel: function(data) {
                    var sectionModel = {};
                    sectionModel = {
                        title: data.title,
                        type: data.type,
                        sectionid: data.sectionid

                    };
                    return sectionModel;
                },

                //后端转ui
                _convertNodeToUIDetailModel: function(node, detailModel) {
                    if (!node) {
                        return null;
                    }
                    var model = detailModel ? detailModel : {};

                    //章节id
                    if (node.sectionid) { model.sectionid = node.sectionid; }
                    //课程名称
                    if (node.title) { model.title = node.title; }
                    //类型
                    if (node.type || node.type == 0) { model.type = node.type; }
                    //内容
                    if (node.content) { model.content = node.content; }
                    //文件路径
                    if (node.fileurl) { model.fileurl = node.fileurl; }
                    //创建者
                    if (node.creator) { model.creator = node.creator; }
                    //所属课程
                    if (node.father) { model.father = node.father; }
                    //课后题
                    if (node.homeworkids) { model.homeworkids = node.homeworkids; }
                    //创建时间
                    if (node.creattime) { model.creattime = node.creattime; }

                    return model;
                }
            };
            return self;
        });

})();
