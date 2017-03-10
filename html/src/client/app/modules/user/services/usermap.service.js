(function() {
    'use strict';

    angular
        .module('com.module.user')
        .factory('UserMap', function() {
            var self = {

                //ui转后端
                convertUserModel: function(data) {
                    var userModel = {};
                    userModel = {
                        userid: data.userid,
                        username: data.username,
                        type: data.type,
                        password: data.password

                    };
                    return userModel;
                },

                //后端转ui
                _convertNodeToUIDetailModel: function(node) {
                    if (!node) {
                        return null;
                    }
                    var model = {};

                    //用户id
                    if(node.userid) {model.userid = node.userid;}
                    //用户名称
                    if(node.username) {model.username = node.username;}
                    //用户类型: 0 学生，1 老师
                    if(node.type) {model.type = node.type;}

                    return model;
                }
            };
            return self;
        });

})();
