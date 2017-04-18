(function() {
    /*
    <ui-upload>
    token: 用户token
    num：第几个upload

    */
    'use strict';
    angular
        .module('com.module.resource')
        .directive('resourceUpload', ['$state', function($state) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    token: '@',
                    num: '@',
                },
                templateUrl: 'modules/resource/views/elements/resource-upload.html',
                controller: function($scope, $rootScope, FileUploader, toaster, $compile, $timeout) {
                    //进度条样式
                    $scope.progresstype = 'info';
                    //文件名
                    $scope.filename = '点击选择文件';
                    //上传文件表单
                    $scope.creatresource = {};
                    //初始化uploader
                    function initUploader(reselect) {
                        var uploader = $scope.uploader = new FileUploader({
                            url: $rootScope.apiUrl + 'creatresource',
                            formData: [{ title: $scope.creatresource.title, token: $scope.token, introduction: $scope.creatresource.introduction }],
                            queueLimit: 1
                        });

                        //假如存在，表明是已经选择好的（因为formDate只能初始化的时候设置）
                        //reselect为true则表示是重新选择文件
                        if($scope.item && !reselect){
                            uploader.addToQueue($scope.item._file)
                            $scope.item = uploader.queue[0];
                        }

                        // FILTERS
                        uploader.filters.push({
                            name: 'customFilter',
                            fn: function(item, options) {
                                return true;
                            }
                        });
                        //添加到队列后更新scope里的item
                        uploader.onAfterAddingFile = function(fileItem){
                                                        // if (fileItem.file.type != "image/jpeg" && fileItem.file.type != "image/png" && fileItem.file.type != "image/gif") {
                            //     toaster.pop('error', '提示', '不支持的文件类型!');
                            //     fileItem.remove();
                            //     return;
                            // }
                            if (fileItem.file.size > 512000000) {
                                toaster.pop('error', '提示', '选择的文件过大!');
                                fileItem.remove();
                                return;
                            }
                            $scope.item = fileItem;
                            $scope.filename = fileItem.file.name;
                        }

                        //上传进度
                        uploader.onProgressItem = function(item, progress) {
                            $scope.progress = progress;
                        }


                        // 上传文件成功后触发
                        uploader.onSuccessItem = function(item, response, status, headers) {
                            if (response && response.code >= 0) {
                                toaster.pop('success', '提示', '上传' + item.file.name + '成功');
                                return;
                            }
                            toaster.pop('error', '提示', '上传失败，原因：' + response.msg);
                            $scope.isSuccess = false;
                            $scope.isError = true;
                        };

                        // 上传失败触发
                        uploader.onErrorItem = function(fileItem, response, status, headers) {
                            toaster.pop('error', '提示', '上传失败!原因:' + response);
                        };

                        //上传完成
                        uploader.onCompleteItem = function(fileItem) {

                        }
                        $timeout(function() {
                             var inputNode = '<input type="file" id="uploadFile{{num}}" nv-file-select uploader="uploader" style="display: none">';
                            $('#resourcefile' + $scope.num + ' input[type=file]').remove();
                            $('#resourcefile' + $scope.num).append($compile(inputNode)($scope));
                        }, 1)
                        return uploader;

                    }



                    //取消上传
                    $scope.cancel = function() {
                        $scope.item.remove();
                    }


                    //选择文件
                    $scope.upload = function() {
                        //正在上传中直接返回
                       if($scope.item && ($scope.item.isUploading || $scope.item.isUploaded))return;

                       //准备好之后再点击则重新上传
                       if($scope.item){
                        initUploader(true);
                        $timeout(function(){
                            $("#resourcefile" + $scope.num + ' input[type=file]').click();
                        },10)
                        return;
                       }
                       $("#resourcefile" + $scope.num + ' input[type=file]').click();
                    };
                    //开始上传
                    $scope.start = function(form) {
                        //验证是否填写完毕
                        if(form.$invalid)return;
                       initUploader().uploadAll();
                    }

                    var uploader = initUploader();

                },
                link: function(scope, el, attr) {

                }
            };
        }]);
})();
