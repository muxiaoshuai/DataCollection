/**
 * Created by chenmengqi on 2016/9/7.
 */
angular.module('excel')
    .service('dataService',function($q,$http,miscCmd){


    })
    .controller('initCtrl',['dataService','miscCmd','$state','$scope','FileUploader','$stateParams',function(dataService,miscCmd,$state,$scope,FileUploader,$stateParams){
       /* http://localhost:8888/dist/index.html#/init/937
       var  tableId =$stateParams.tableId;
       console.info(tableId);*/

        console.info('initCtrl') ;
   /*     var params={
            cmd:'AppHome',
            tableId:tableId
        };
        miscCmd.demo(params,function(result,code,message){
           // var result=result.result;

            console.info(result);
         ///  $scope.name=  result.name;
        });*/


        $scope.hasTask = true;

        $scope.isDisabled = true;

        $scope.goDefine = function(){
            $state.go('define',{id:123});
        };

        var uploader = $scope.uploader = new FileUploader({
            url:'http://192.168.11.2:9527/servlets/binserv/U/UpLoadFileAction',     // /servlets/binserv/U/UpLoadFileAction
            queueLimit: 1,     //文件个数
            removeAfterUpload: true,   //上传后删除文件
            autoUpload : true
        });
     /*   uploader.onWhenAddingFileFailed = function(item *//*{File|FileLikeObject}*//*, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };*/

        uploader.onBeforeUploadItem = function(item) {
            $scope.hasTask = false;
          //  console.info('onBeforeUploadItem', item);
            $scope.isSuccess = false;
            $scope.progress =  0;
        };
        $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        };

        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
            //能够在这里判断添加的文件名后缀和文件大小是否满足需求。
            //console.info($scope.fileItem) ;
        };

        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true;   //上传成功则把状态改为true
            if(status == 200){
                $scope.isSuccess = true;
            }else{
                $scope.isSuccess = false;
            }

            console.info('onSuccessItem',status);
            $scope.isDisabled = false;
        };

        uploader.onErrorItem = function(fileItem, response, status, headers) {
            $scope.isError = true;
           /* alert('文件上传失败');*/
            //console.info('onErrorItem', fileItem, response, status, headers);
        };

        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
            $scope.progress =  progress;
        };

       /* console.info('uploader', uploader);*/

        $scope.startNewTask = function(){
              console.info('startNewTask')
        };
        $scope.runOldTask = function(){
              console.info('runOldTask')
        };

    }]);