//2015-8-18 11:09:31  ����Ƭ��  ʱ���ʽ��

b2b.controller('dateDemo',function($scope){
    $scope.today = function(){ // ����һ�������� 
        $scope.dt = new Date(); // ����һ�����������յ�������
    };
    $scope.today(); // ����today����
    $scope.clear = function(){  //������clear��ʱ��dt��Ϊ��
        $scope.dt = null;
    };
    $scope.open = function($event){  // ����open���� �� ����Ĭ����Ϊ����opened ��Ϊtrue
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };
    $scope.minDate = $scope.minDate ? null : new Date();
    $scope.dateOptions = {
        formatYear : 'yy',
        startingDay : 1
    };
  //  $scope.formats = ['dd-MMMM-yyyy','yyyy/MM/dd','dd.MM.yyyy','shortDate']; //������ʾ��ʽ 
    $scope.format = 'yyyy/MM/dd';  // ��formats�ĵ�0����ΪĬ����ʾ��ʽ 
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
