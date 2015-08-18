//2015-8-18 11:09:31  代码片段  时间格式化

b2b.controller('dateDemo',function($scope){
    $scope.today = function(){ // 创建一个方法， 
        $scope.dt = new Date(); // 定义一个属性来接收当天日期
    };
    $scope.today(); // 运行today方法
    $scope.clear = function(){  //当运行clear的时候将dt置为空
        $scope.dt = null;
    };
    $scope.open = function($event){  // 创建open方法 。 下面默认行为并将opened 设为true
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.minDate = $scope.minDate ? null : new Date();
    $scope.dateOptions = {
        formatYear : 'yy',
        startingDay : 1
    };
  //  $scope.formats = ['dd-MMMM-yyyy','yyyy/MM/dd','dd.MM.yyyy','shortDate']; //日期显示格式 
    $scope.format = 'yyyy/MM/dd';  // 将formats的第0项设为默认显示格式 
    $scope.$watch('dt',function(newValue,oldValue, scope){
    	var df = new SimpleDateFormat ("yyyy-MM-dd");
    	console.info(df.format(newValue));
    });
});


var SimpleDateFormat = function (pattern)
{
    var reg = /[\-\/\.]/g;
    var format = new RegExp ("^[ymd]+" + reg.source + "[ymd]+" + reg.source + "[ymd]+$", "i");
    if (!format.test (pattern))
    {
        throw new Error ("the pattern paramters is not legal !");
    }
    this.pattern = pattern;
    this.reg = reg;
    this.spliter = pattern.replace (/[ymd]/gi, '').substr (1);
};
 
SimpleDateFormat.prototype.format = function (date)
{
    if (!(date instanceof Date))
    {
        throw new Error ("the date paramter is not Date type.");
    }
    var spliter = this.spliter;
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    return year + spliter + month + spliter + day;
};
 
SimpleDateFormat.prototype.parse = function (str)
{
    var pattern = this.pattern;
    var reg = new RegExp ("^" + pattern.replace (/[ymd]/gi, '\\d') + "$");
    if (!reg.test (str))
    {
        throw new Error ("the str paramter could not be pattered.");
    }
    var tempDate = str.split (this.spliter);
    return new Date (tempDate[0], tempDate[1], tempDate[2]);
};
