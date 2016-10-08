/**
 * Created by chenmengqi on 2016/9/8.
 */
angular.module('excel')
    .controller('modifyCtrl',['miscCmd','$stateParams','$scope','$compile',function(miscCmd,$stateParams,$scope,$compile){
        console.info("modifyCtrl-参数传值:"+$stateParams.id);


        //数据
        var rowData = [
            {id:1,品牌: "Toyota", 小: "",   中: "559", 大: "765", 颜色: "red",   价格: 35000},
            {id:2,品牌: "Ford",   小: "2",  中: "56",  大: "",    颜色: "blue",  价格: 32000},
            {id:3,品牌: "Kappa",  小: "1",  中: "",    大: "",    颜色: "pink",  价格: 32000},
            {id:4,品牌: "Nike",   小: "55", 中: "3",   大: "456", 颜色: "black", 价格: 32000},
            {id:5,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000},
            {id:6,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000},
            {id:7,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000},
            {id:8,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000},
            {id:9,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000},
            {id:10,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000},
            {id:11,品牌: "361",    小: "980",中: "123", 大: "3",   颜色: "white", 价格: 32000}
        ];

        //定义gridOptions
        var gridOptions= {
            // PROPERTIES - object properties, myRowData and myColDefs are created somewhere in your application
            rowData: rowData,
            // PROPERTIES - simple boolean / string / number properties
            enableColResize: true,
            groupHeaders: false,
            rowHeight: 22,
            rowSelection: 'multiple',
            onRowSelected: rowSelected, //callback when row selected
            onSelectionChanged: selectionChanged,
            suppressRowClickSelection: true,
            // EVENTS - add event callback handlers
            onRowClicked: function(event) { console.log('a row was clicked'); },
            onColumnResized: function(event) { console.log('a column was resized'); },

            // CALLBACKS
            isScrollLag: function() { return true; } ,

            angularCompileHeaders:function(){},
            /*   headerCellTemplate:"<a href=''>hello world</a>"*/
            //列自动撑开
            onGridReady: function(params) {
                params.api.sizeColumnsToFit();
            },
            debug: true
        };

        //循环formHead里的formHeadName以options形式放到headerCellTemplate方法里(必须放在定义列头的上边)
        var aa =  function(index){
            var  columns = 'columns_'+index;
            var head = '<div><select ng-model="seleted_'+index+'"  ng-options="column.field for column in '+columns+'" ng-change="current_option_change('+index+')"><option value="">缺省值</option></div>';
            var ahead = $compile(head)($scope)[0];
            return ahead;
        };
        $scope.seleted = [];


        //列头
        var  columns = [
            {
                field: "id",
                editable: false,
                checkboxSelection: function (params) {
                    // we put checkbox on the name if we are not doing no grouping
                    return params.columnApi.getRowGroupColumns().length === 0;
                }
            },
            {
                field: "品牌",
                editable: false
            },{
                headerName:'尺码组',
                children:[
                    {
                        headerName:'均码',
                        children:[
                            {
                                headerName:'小',
                                children:[
                                    {
                                        headerName:'175',
                                        field: "小"
                                    }
                                ]

                            }
                        ]
                    },
                    {
                        headerName:'',
                        children:[
                            {
                                headerName:'中',
                                children:[
                                    {
                                        headerName:'185',
                                        field: "中"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        headerName:'',
                        children:[
                            {
                                headerName:'大',
                                children:[
                                    {
                                        headerName:'',
                                        field: "大"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                field: "颜色",
                editable: false
            },
            {
                field: "价格",
                editable: false
            }
        ];

        //复制columns并操作
        $scope.master= angular.copy(columns);
        angular.forEach(columns, function(data,index,array){

            var columns='columns_'+index;
            $scope[columns]=$scope.master;
            data.headerCellTemplate = aa(index);


        });

        //将定义好的列头放入gridOptions返回前台
        gridOptions.columnDefs  = columns;

        //删除选中行
        $scope.deleteSelects = function () {
            alert("deleteSelects");
        };

        //删除全部
        $scope.deleteAll = function () {
            alert("deleteAll");
        };

        //导出全部错行
        $scope.outARRow = function () {
            alert("outARRow");
        };

        //保存编辑
        $scope.saveChange = function () {
            alert("saveChange");
        };

        //如何使用ajax动态向后台传输html更改后的列表数据值？
        $scope.againTransform = function () {
            alert("againTransform");
        };


        function selectionChanged(event) {
            console.log('Callback selectionChanged: selection count = ' + gridOptions.api.getSelectedNodes().length);
        }

        function rowSelected(event) {
        // the number of rows selected could be huge, if the user is grouping and selects a group, so
        // to stop the console from clogging up, we only print if in the first 10 (by chance we know
        // the node id's are assigned from 0 upwards)
            if (event.node.id < 10) {
                var valueToPrint = event.node.group ? 'group (' + event.node.key + ')' : event.node.data.name;
                console.log("Callback rowSelected: " + valueToPrint);
            }
        }

        //赋值
        $scope.gridOptions = gridOptions;
    }]);
