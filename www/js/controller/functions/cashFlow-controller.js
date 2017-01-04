var appController = angular.module('myApp.controllers');

appController.controller('cashFlowCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowService) {

  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  //是否显示查询条件
  $scope.show_query_condition = true;
  //是否显示查询结果
  $scope.show_query_result = false;

  //默认起始时间一周前
  var defaultStartPayDate = new Date();
  defaultStartPayDate.setDate(new Date().getDate() - 7);

  $scope.condition = {
    startPayDate: defaultStartPayDate,
    endPayDate: new Date()
  };

  //查看和隐藏查询条件
  $scope.toggleQueryCondition = function () {
    $scope.show_query_condition = !$scope.show_query_condition;
  };

  $scope.query = function () {
    if (!Boolean($scope.condition.startPayDate)) {
      $cordovaToast.showShortCenter('请选择开始日期!');
      // $ionicLoading.show({
      //   template: "请选择开始日期!",
      //   duration: 1000
      // });
      return;
    }
    if (!Boolean($scope.condition.endPayDate)) {
      $cordovaToast.showShortCenter('请选择结束日期!');
      // $ionicLoading.show({
      //   template: "请选择结束日期!",
      //   duration: 1000
      // });
      return;
    }
    if ($scope.condition.startPayDate.getTime() >= $scope.condition.endPayDate.getTime()) {
      $cordovaToast.showShortCenter('开始日期不能大于结束日期!');
      // $ionicLoading.show({
      //   template: "开始日期不能大于结束日期!",
      //   duration: 1000
      // });
      return;
    }

    //显示查询结果
    $scope.show_query_result = true;
    //提示等待
    $ionicLoading.show();
    //获取参数
    var startPayDate = $filter('date')($scope.condition.startPayDate, 'yyyy-MM-dd HH:mm:ss');
    var endPayDate = $filter('date')($scope.condition.endPayDate, 'yyyy-MM-dd HH:mm:ss');
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    //访问后台获取图表数据
    CashFlowService.getCashFlowInfo(userId, token, startPayDate, endPayDate).then(function (data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('cashFlowChart'), 'macarons');
      // 指定图表的配置项和数据
      var option = {
        title: {
          show: false,
          text: '现金流量渠道占比分析',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/> 渠道名称: {b} <br/> 金额:￥{c} <br/> 占比:({d}%)" //a:series名称 b:legend名称 c:series值 d:占比
        },
        toolbox: {     //工具栏
          show: false,
          feature: {
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          show: false,
          x: 'center',//水平位置
          y: 'top',//垂直位置
          orient: 'horizontal', //布局走向 vertical 垂直 horizontal水平
          data: data.legends
        },
        series: [
          {
            name: '缴费渠道占比',
            type: 'pie',
            radius: '42%',
            center: ['50%', '52%'],
            // label: {
            //   normal: {
            //     position: 'inner' //内置文本标签
            //   }
            // },
            // labelLine: {
            //   normal: {
            //     show: false     //不需要设置引导线
            //   }
            // },
            data: data.pieDatas
          }
        ]
      };
      window.onresize = function () {
        myChart.resize(); //使图表适应屏幕
      };
      myChart.setOption(option);
      //隐藏查询条件
      $scope.show_query_condition = false;
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      // $ionicLoading.show({
      //   template: err,
      //   duration: 1000
      // });
    });
  };

  $scope.resetData = function () {
    $scope.condition.startPayDate = defaultStartPayDate;
    $scope.condition.endPayDate = new Date();
  };

});
