(function() {
    'use strict';

    angular
        .module('com.module.resource')
        .factory('ResourceMap', function() {
            var self = {

                //题目列表
                resourceListModel: function(data) {
                    var resourceModel = [];
                    if (data.code && data.code == 1 && data.data instanceof Array && data.data.length > 0) {
                        angular.forEach(data.data, function(value, index) {
                            resourceModel.push(self._convertNodeToUIDetailModel(value));
                        })
                        return resourceModel;
                    }

                    return null;
                },

                //题目详细信息
                resourceDetailModel: function(data) {
                    var resourceModel = {
                        'resourceid': '',
                        'title': '加载中...',
                        'creator': '',
                        'url': ''
                    };
                    if (data.code && data.code == 1 && data.data) {
                        resourceModel = self._convertNodeToUIDetailModel(data.data, resourceModel);
                    }
                    return resourceModel;
                },

                //ui转后端
                convertresourceModel: function(data) {
                    var resourceModel = {};
                    resourceModel = {
                        title: data.title
                    };
                    //option默认赋值的话回传null
                    if(resourceModel.type == 0)resourceModel.option = data.option;

                    return resourceModel;
                },

                //后端转ui
                _convertNodeToUIDetailModel: function(node, detailModel) {
                    if (!node) {
                        return null;
                    }
                    var model = detailModel ? detailModel : {};

                    //资源id
                    if (node.resourceid) { model.resourceid = node.resourceid; }
                    //资源名称
                    if (node.title) { model.title = node.title; }
                    //创建者
                    if (node.creator) { model.creator = node.creator; }

                    return model;
                }
            };
            return self;
        });

})();
