(function() {
    'use strict';
    angular
        .module('com.module.notic')
        .config(function($stateProvider) {

            $stateProvider
                .state('app.notic', {
                    url: '/notic',
                    templateUrl: 'modules/notic/views/list.html',
                    controller: 'NoticListCtrl',
                    resolve: {
                        listsize: function() {
                            return 10;
                        },
                        noticlist: function(NoticApi, NoticMap, listsize) {
                            var model = { size: listsize, index: 1 };
                            return NoticApi.getnoticlist(model).then(function(res) {
                                var data = res.data;
                                return NoticMap.noticListModel(data);
                            }, function() {
                                return null;
                            })
                        }
                    }
                })
                .state('app.notic.detail', {
                    url: '/detail/:noticid',

                    templateUrl: 'modules/notic/views/detail.html',
                    controller: 'NoticDetailCtrl',
                    resolve: {
                        noticmodel: function($stateParams, NoticApi, NoticMap) {
                            return NoticApi.getnoticdetail({ noticid: $stateParams.noticid }).then(function(res) {
                                var data = res.data;
                                return NoticMap.noticdetailModel(data);
                            }, function() {
                                return null;
                            })

                        }
                    }

                });
        });

})();
