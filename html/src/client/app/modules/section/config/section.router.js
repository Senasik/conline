(function() {
    'use strict';
    angular
        .module('com.module.section')
        .config(function($stateProvider) {

            //list状态和detail状态都会用到list，故放到前面
            var listview = {
                templateUrl: 'modules/section/views/list.html',
                controller: 'SectionListCtrl',
                resolve: {
                    sectionlist: function($stateParams, SectionApi, SectionMap) {
                        return SectionApi.getsectionlist({ courseid: $stateParams.courseid }).then(function(res) {
                            var data = res.data;
                            return SectionMap.sectionListModel(data);
                        }, function() {
                            return null;
                        })

                    }
                }
            };

            $stateProvider
                .state('app.section', {
                    abstract: true,
                    url: '/:courseid/section',
                    template: '<div ui-view="list"></div><div ui-view="detail"></div>',
                    controller: 'SectionCtrl'
                })
                .state('app.section.default', {
                    url: '',
                    template: '',
                    controller: 'SectionDefaultCtrl'
                })
                .state('app.section.list', {
                    url: '/list',
                    views: {
                        'list': listview
                    }

                })
                .state('app.section.detail', {
                    url: '/detail/:sectionid',
                    views: {
                        'list': listview,
                        'detail': {
                            templateUrl: 'modules/section/views/detail.html',
                            controller: 'SectionDetailCtrl',
                            resolve: {
                                sectionModel: function($stateParams, SectionApi, SectionMap) {
                                    return SectionApi.getsectiondetail({ sectionid: $stateParams.sectionid }).then(function(res) {
                                        var data = res.data;
                                        return SectionMap.sectionDetailModel(data);
                                    }, function() {
                                        return null;
                                    })

                                }
                            }
                        }
                    }

                })
        });

})();
