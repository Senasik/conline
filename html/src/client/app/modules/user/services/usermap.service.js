(function() {
    'use strict';

    angular
        .module('com.module.user')
        .factory('UserMap', function() {
            var self = {

                //用户详情
                userDetailModel: function(data){
                    var userModel = {
                        userid: '',
                        type: 0,
                        username: '加载中...'
                    }
                     if (data.code && data.code == 1 && data.data) {
                        userModel = self._convertNodeToUIDetailModel(data.data, userModel);
                    }
                    return userModel;
                },


                //ui转后端
                convertUserModel: function(data) {
                    var userModel = {};
                    userModel = {
                        userid: data.userid,
                        username: data.username,
                        type: data.type,
                        password: data.password?$.md5(data.password):undefined,
                        newpwd: data.newpwd?$.md5(data.newpwd):undefined,
                        oldpwd: data.oldpwd?$.md5(data.oldpwd):undefined

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
                    if(node.type || node.type == 0) {model.type = node.type;}

                    return model;
                }
            };
            return self;
        });

})();
