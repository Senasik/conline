(function() {
    /*
      使用方法:<ui-datepicker startDate="开始的时间" endDate="结束的时间"/>
      */
    'use strict';
    angular
        .module('com.module.user')
        .directive('imgUpload', ['$state', function($state) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    token: '@',
                    courseid: '@',
                    cover: '@'
                },
                templateUrl: 'modules/user/views/elements/img-upload-tpl.html',
                controller: function($rootScope, $scope, FileUploader, toaster, $compile) {
                    //初始化uploader
                    function initUploader() {
                        //初始化选项
                        $scope.type = 'info';

                        var inputNode = '<input type="file" id="still" nv-file-select uploader="uploader" style="display: none">';
                        $('.img-upload input').remove();

                        var uploader = $scope.uploader = new FileUploader({
                            url: $rootScope.apiUrl + 'addcoursecover',
                            formData: [{ token: $scope.token, courseid: $scope.courseid }],
                            queueLimit: 1
                        });

                        // FILTERS
                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function(item, options) {
                                return true;
                            }
                        });
                        // CALLBACKS
                        //选择完文件之后触发
                        uploader.onAfterAddingFile = function(fileItem) {

                            if (fileItem.file.type != "image/jpeg" && fileItem.file.type != "image/png" && fileItem.file.type != "image/gif") {
                                toaster.pop('error', '提示', '不支持的文件类型!');
                                fileItem.remove();
                                return;
                            }
                            if (fileItem.file.size > 5120000) {
                                toaster.pop('error', '提示', '选择的文件过大!');
                                fileItem.remove();
                                return;
                            }
                            $scope.item = fileItem;
                            uploader.uploadAll();
                        };

                        // 上传文件成功后触发
                        uploader.onSuccessItem = function(item, response, status, headers) {
                            if (response && response.code >= 0) {
                                $scope.cover = $rootScope.imgBase+response.data.cover;
                                toaster.pop('success', '提示', '上传成功');
                                return;
                            }
                            toaster.pop('error', '提示', '上传失败，原因：' + response.message);
                        };

                        // 上传失败触发
                        uploader.onErrorItem = function(fileItem, response, status, headers) {
                            toaster.pop('error', '提示', '上传失败!原因:' + response);
                        };

                        //上传完成
                        uploader.onCompleteItem = function(fileItem) {
                            $scope.progress = 0;

                        }

                        //上传进度
                        uploader.onProgressItem = function(item, progress) {
                            $scope.progress = progress;
                        }

                        //每次初始化删除原来的input,新添加一个
                        $('.img-upload').append($compile(inputNode)($scope));


                    }


                    //点击图片触发上传
                    $scope.upload = function() {
                        if ($scope.item && $scope.item.isUploading) return;
                        initUploader();
                        $("#still").click();
                    };
                    //初始化图片
                    !$scope.cover ? $scope.cover = 'images/a0.jpg' : true;


                },
                link: function(scope, el, attr) {
                    $(el).hover(function() {

                        scope.hover = true;
                        scope.$apply('hover')
                    }, function() {
                        scope.hover = false;
                        scope.$apply('hover')
                    });


                }
            };
        }]);
})();
