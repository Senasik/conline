(function() {
    'use strict';

    angular
        .module('com.module.notic')
        .factory('NoticMap', function() {
            var self = {

                //公告列表
                noticListModel: function(data) {
                    var noticModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0) {
                        angular.forEach(data.data, function(value, index) {
                            noticModel.push(self._convertNodeToUIDetailModel(value));
                        })
                        return noticModel;
                    }

                    return [];
                },

                //公告详细信息
                noticdetailModel: function(data) {
                    var noticModel = {
                        'noticid': '',
                        'title': '加载中...',
                        'creator': '',
                        'contant': ''
                    };
                    if (data.code && data.code == 1 && data.data) {
                        noticModel = self._convertNodeToUIDetailModel(data.data, noticModel);
                    }
                    return noticModel;
                },

                //ui转后端
                convertnoticModel: function(data) {
                    var noticModel = {};
                    noticModel = {
                        title: data.title,
                        content: data.content
                    };
                    

                    return noticModel;
                },

                //后端转ui
                _convertNodeToUIDetailModel: function(node, detailModel) {
                    if (!node) {
                        return null;
                    }
                    var model = detailModel ? detailModel : {};

                    //公告id
                    if (node.noticid) { model.noticid = node.noticid; }
                    //公告名称
                    if (node.title) { model.title = node.title; }
                    //创建者
                    if (node.creator) { model.creator = node.creator; }
                    //内容
                    if (node.content) { model.contant = node.content; }
                    //创建时间
                    if (node.creattime) { model.creattime = node.creattime; }

                    return model;
                }
            };
            return self;
        });

})();
