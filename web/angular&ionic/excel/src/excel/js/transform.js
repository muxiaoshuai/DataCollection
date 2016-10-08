/**
 * Created by chenmengqi on 2016/9/8.
 */
angular.module('excel')
    .controller('transformCtrl',['miscCmd','$stateParams','$scope','$interval','$window',function(miscCmd,$stateParams,$scope,$interval,$window){
        console.info("transformCtrl-参数传值:"+$stateParams.transformId);

     /*   var timer = $interval(function() {
         console.log( "Timeout executed", Date.now() );
         },
         2000
         );
         *//*  timer.then(success);
         function success(){
         console.log("done");
         }*//*

         $scope.cancel = function (){
         $interval.cancel( timer );
         console.info('成功之后定当取消定时任务,点击取消同样取消定时任务');
         }*/

       $scope.finished = function(){
           var userAgent = navigator.userAgent;
           if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
               window.location.href="about:blank";
           } else {
               window.opener = null;
               window.open("", "_self");
               window.close();
           }
       }

        $scope.goBack = function (){
            $window.history.go(-1)
        }
    }]);