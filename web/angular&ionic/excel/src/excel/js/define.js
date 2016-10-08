/**
 * Created by chenmengqi on 2016/9/8.
 */
angular.module('excel')
    .controller('defineCtrl',['miscCmd','$stateParams','$scope','$compile','$http',function(miscCmd,$stateParams,$scope,$compile,$http){
        console.info("defineCtrl-参数传值:"+$stateParams.id);


        //构造行头每列option
        var aa =  function(index){
            var  columns = 'columns_'+index;
            var head = '<div class="item item-input item-select"><select ng-model="seleted_'+index+'"  ng-options="column.desc disable when column.disabled for column in '+columns+'" ng-change="current_option_change('+index+')" class="form-control btn-primary define-control"></div>';
            //   console.info(head)
            var ahead = $compile(head)($scope)[0];
            return ahead;
        };

        var  afterColumns = [];
        var columns =[];
        $http.get('jsons/define.json').success(function(data){
            console.info(data)
            var rowData = data.data.rowData;

            var gridOptions= {
                // PROPERTIES - object properties, myRowData and myColDefs are created somewhere in your application
                rowData: rowData,
                // PROPERTIES - simple boolean / string / number properties
                enableColResize: true,
                groupHeaders: false,
                rowHeight: 22,
                rowSelection: 'single',

                onGridReady: function(params) {
                   // params.api.sizeColumnsToFit();
                },
                // EVENTS - add event callback handlers
                /*  onRowClicked: function(event) { console.log('a row was clicked'); },*/
                onColumnResized: function(event) { console.log('a column was resized'); },
                /*  onGridReady: function(event) { console.log('the grid is now ready'); },*/
                onCellDoubleClicked : function(params) {
                    console.info(params)
                },
                // CALLBACKS
                isScrollLag: function() { return true; } ,

                angularCompileHeaders:function(){console.info(1111111111)},
                /*   headerCellTemplate:"<a href=''>hello world</a>"*/
                debug: true

            };

            columns = data.data.columns;
            afterColumns=angular.copy(columns);
            $scope.columnsLen = columns.length;

            angular.forEach(columns, function(data,index,array){
                if(index != 0) {
                    if(data.firstChild){
                        console.info(data)
                        $scope.childLen = data.childLen-1;
                        $scope.hasChild = data.firstChild;

                    }else{
                        if($scope.hasChild && $scope.childLen != 0){
                            data.disabled = 'disabled';
                            $scope.childLen--;
                        }
                    }

                    var columns_index='columns_'+index;
                    $scope[columns_index]=columns;

                    var seleted = 'seleted_'+index;
                    $scope[seleted] =  $scope[columns_index][index];

                    data.headerCellTemplate = aa(index);
                }else{
                    data.headerName = data.desc;
                    data.disabled = 'disabled';
                }


            });

            $scope.firstColumns =  angular.copy(columns);
            gridOptions.columnDefs  = columns;
            $scope.gridOptions = gridOptions;
          //  console.info( $scope.gridOptions )
        }).error(function(){
            alert("an unexpected error ocurred!");
        });

        /**
         * 修表表头
         * @param index
         */
        $scope.current_option_change = function(index){
            var exchangeColumns = angular.copy(afterColumns);
            var oldData = afterColumns[index];
            var data =  $scope['seleted_'+index];

            angular.forEach(afterColumns, function(data1,index1,array){
                if(oldData.field == data1.field){
                    $scope.oldData = data1;
                    $scope.oldDataIndex = index1;
                }

                if(data.field == data1.field){
                    $scope.newDataIndex =  index1;
                }
            });

            var flag = $scope.columnsLen - index >= data.childLen  ? false : true;
            if($scope.oldData.disabled == 'disabled' || $scope.oldData.firstChild || (flag && data.firstChild)){
                alert('尺码组不可以拆分');
                var seleted = 'seleted_'+index;
              //  $scope[seleted]  = $scope.oldData;

                angular.forEach(columns, function(data1,index1,array){
                    if($scope.oldData.field == data1.field) {
                        $scope[seleted]  = data1;
                    }
                });

                return;
            }

            //options数据调整
            if(data.firstChild){
                for(var i=1;i<data.childLen;i++){
                     var seleted = 'seleted_'+(index+i);
                     $scope[seleted]  = columns[data.startIndex+i+1];

                }

                if(data.childLen != index) {
                    var length = $scope.newDataIndex - index;
                   // console.info(length,Math.abs(length),$scope.newDataIndex,index);
                    if(length > 0){
                        for(var i=0;i<length;i++){
                            var  idx= index + data.childLen + i;
                            var seleted= 'seleted_'+idx;
                            angular.forEach(columns, function(data1,index1,array){
                               /* if(afterColumns[i+1].field == data1.field) {
                                    $scope[seleted]  = data1;
                                    console.info(data1)
                                }*/
                                if(exchangeColumns[i+index].field == data1.field) {
                                    $scope[seleted]  = data1;
                                }
                            });

                        }
                    }else{
                        for(var i=0;i<data.childLen;i++){
                            console.info(index,data.childLen,i,$scope.columnsLen,$scope.newDataIndex);
                            var seleted = 'seleted_'+($scope.newDataIndex+i);
                            angular.forEach(columns, function(data1,index1,array){
                                 if(afterColumns[$scope.oldDataIndex + i].field == data1.field) {
                                     $scope[seleted]  = data1;
                                 }
                            });
                        }

                    }

                }

            }else{
                angular.forEach(afterColumns, function(data1,index1,array){
                     if(data.field == data1.field){
                         var sel = 'seleted_'+index1;
                         $scope.indexChange =   index1;
                         //maybe need modify -->   if option is null
                       //  $scope[sel]  = columns[$scope.oldDataIndex];
                         angular.forEach(columns, function(data1,index1,array){
                             if(afterColumns[$scope.oldDataIndex].field == data1.field) {
                                 $scope[sel]  = data1;
                             }
                         });
                     }
                });
            }

            //返回头部数据给服务端调整
            angular.forEach(columns, function(data1,index1,array){
                 if(data.field == data1.field){
                   //  console.info(data1);
                    /* afterColumns.splice(index,1);
                     afterColumns.splice(index,0,data);*/

                     if(data1.firstChild){
                         for(var i=1;i<data1.childLen;i++){
                             afterColumns.splice(index+i,1);
                             afterColumns.splice(index+i,0,$scope.firstColumns[data1.startIndex+i+1]);
                         }

                         if(data1.childLen != index) {
                             var length = $scope.newDataIndex - index;
                             if(length > 0){
                                 for(var i=0;i<length;i++){
                                     var  idx= index + data.childLen + i;
                                     afterColumns.splice(idx,1,exchangeColumns[$scope.oldDataIndex+i]);
                                 }
                             }else{
                                 for(var i=0;i<data.childLen;i++){
                                     afterColumns.splice($scope.newDataIndex+i,1,exchangeColumns[$scope.oldDataIndex+i]);
                                 }

                             }
                         }
                     }else{
                         afterColumns.splice($scope.indexChange,1,oldData);
                     }

                     afterColumns.splice(index,1);
                     afterColumns.splice(index,0,data);
                 }

            });
           console.info( afterColumns)
        }


        //提交，判断表头调整之后是否有重复字段，若有则提示需重新调整
        $scope.commit = function(){
           // afterColumns.push(afterColumns[0]) ;
            var str1=[];
            for(var i=0;i<afterColumns.length;i++){
                if(str1.indexOf(afterColumns[i])<0){
                    str1.push(afterColumns[i])
                }
            }

            if(str1.length != afterColumns.length){
                alert('表头重复，请再次进行调整');
                return;
            }else{
                alert('提交ing。。。');

            }
        }
    }]);