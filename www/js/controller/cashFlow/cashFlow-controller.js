var appController = angular.module('myApp.controllers');

//现金流量渠道分析
appController.controller('cashFlowChannelAnalysisCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowService) {

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

//现金流量日分析
appController.controller('cashFlowDayAnalysisCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowService) {

  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  //是否显示查询条件
  $scope.show_query_condition = true;
  //是否显示查询结果
  $scope.show_query_result = false;

  $scope.condition = {
    //默认查询日期为昨天
    day: new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
  };

  //查看和隐藏查询条件
  $scope.toggleQueryCondition = function () {
    $scope.show_query_condition = !$scope.show_query_condition;
  };

  //查询
  $scope.query = function () {
    if (!Boolean($scope.condition.day)) {
      $cordovaToast.showShortCenter('请选择日期!');
      // $ionicLoading.show({
      //   template: "请选择开始日期!",
      //   duration: 1000
      // });
      return;
    }

    //提示等待
    $ionicLoading.show();
    //显示查询结果
    $scope.show_query_result = true;
    //获取参数
    var day = $filter('date')($scope.condition.day, 'yyyy-MM-dd');
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    //访问后台获取图表数据
    CashFlowService.getCashFlowDayInfo(userId, token, day).then(function (data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('cashFlowChart'), 'macarons');
      // 指定图表的配置项和数据
      var option = {
        title: {      //标题组件
          text: '日现金流量分析',
          subtext: '总金额:' + $filter('currency')(data.sumMoney, '￥', 2),
          x: 'center'
        },
        tooltip: {    //提示框组件
          trigger: 'axis', //触发类型 axis坐标轴 item单项
          // 格式化鼠标悬浮提示数据 加上点便于用户识别当前时间的现金流量
          formatter: function (params, ticket, callback) {
            return params[0].name + '点</br>' + params[0].seriesName + ' : ' + $filter('currency')(params[0].value, '￥', 2) + '元';
          }
        },
        legend: {     //图例组件
          show: false,
          data: ['现金流量'],
          x: 'center',
          y: 'bottom',
          orient: 'horizontal' //布局走向 vertical 垂直 horizontal水平
        },
        grid: {       //直角坐标系内绘图网格
          top: '80px',
          left: '2%',
          right: '40px',
          bottom: '30px',
          containLabel: true
        },
        toolbox: {     //工具栏
          show: false,
          feature: {
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {       //直角坐标系 grid 中的 x 轴
          type: 'category',
          name: '小时',
          boundaryGap: false,
          data: data.xAxisData
        },
        yAxis: {       //直角坐标系 grid 中的 y 轴
          type: 'value',
          name: '金额',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}元'
          }
        },
        series: [{
          name: '现金流量',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: data.seriesData
        }]
      };
      window.onresize = function () {
        myChart.resize(); //使图表适应屏幕
      };
      myChart.setOption(option);
      //隐藏查询条件
      $scope.show_query_condition = false;
      //隐藏提示
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

  //重置
  $scope.resetData = function () {
    $scope.condition.day = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
  };

});

//现金流量月分析
appController.controller('cashFlowMonthAnalysisCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowService) {

  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  //是否显示查询条件
  $scope.show_query_condition = true;

  //是否显示查询结果
  $scope.show_query_result = false;

  $scope.condition = {
    month: new Date()
  };

  //查看和隐藏查询条件
  $scope.toggleQueryCondition = function () {
    $scope.show_query_condition = !$scope.show_query_condition;
  };

  $scope.query = function () {
    if (!Boolean($scope.condition.month)) {
      $cordovaToast.showShortCenter('请选择日期!');
      // $ionicLoading.show({
      //   template: "请选择开始日期!",
      //   duration: 1000
      // });
      return;
    }
    //显示查询结果
    $scope.show_query_result = true;
    //提示等待
    $ionicLoading.show();
    //获取参数
    var month = $filter('date')($scope.condition.month, 'yyyy-MM');
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    //访问后台获取图表数据
    CashFlowService.getCashFlowMonthInfo(userId, token, month).then(function (data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('cashFlowChart'), 'macarons');
      // 指定图表的配置项和数据
      var option = {
        title: {      //标题组件
          text: '月现金流量分析',
          subtext: '总金额:' + $filter('currency')(data.sumMoney, '￥', 2),
          x: 'center'
        },
        tooltip: {    //提示框组件
          trigger: 'axis', //触发类型 axis坐标轴 item单项
          formatter: function (params, ticket, callback) {
            return params[0].name + '</br>' + params[0].seriesName + ' : ' + $filter('currency')(params[0].value, '￥', 2) + '元';
          }
        },
        legend: {     //图例组件
          show: false,
          data: ['现金流量'],
          x: 'center',
          y: 'bottom',
          orient: 'horizontal' //布局走向 vertical 垂直 horizontal水平
        },
        grid: {       //直角坐标系内绘图网格
          top: '80px',
          left: '2%',
          right: '40px',
          bottom: '60px',
          containLabel: true
        },
        toolbox: {     //工具栏
          show: false,
          feature: {
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {       //直角坐标系 grid 中的 x 轴
          type: 'category',
          name: '周',
          boundaryGap: false,
          data: data.xAxisData
        },
        yAxis: {       //直角坐标系 grid 中的 y 轴
          type: 'value',
          name: '金额',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}元'
          }
        },
        series: [{
          name: '现金流量',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: data.seriesData
        }]
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
    $scope.condition.month = new Date();
  };

});

//现金流量年分析
appController.controller('cashFlowYearAnalysisCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowService) {

  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  //是否显示查询条件
  $scope.show_query_condition = true;

  //是否显示查询结果
  $scope.show_query_result = false;

  $scope.condition = {
    year: new Date()
  };

  //查看和隐藏查询条件
  $scope.toggleQueryCondition = function () {
    $scope.show_query_condition = !$scope.show_query_condition;
  };

  $scope.query = function () {
    if (!Boolean($scope.condition.year)) {
      $cordovaToast.showShortCenter('请选择日期!');
      // $ionicLoading.show({
      //   template: "请选择开始日期!",
      //   duration: 1000
      // });
      return;
    }
    //显示查询结果
    $scope.show_query_result = true;
    //提示等待
    $ionicLoading.show();
    //获取参数
    var year = $filter('date')($scope.condition.year, 'yyyy');
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    //访问后台获取图表数据
    CashFlowService.getCashFlowYearForQuarterInfo(userId, token, year).then(function (data) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('cashFlowChart'), 'macarons');
      // 指定图表的配置项和数据
      var option = {
        title: {      //标题组件
          text: '年现金流量分析',
          subtext: '总金额:' + $filter('currency')(data.sumMoney, '￥', 2),
          x: 'center'
        },
        tooltip: {    //提示框组件
          trigger: 'axis', //触发类型 axis坐标轴 item单项
          formatter: function (params, ticket, callback) {
            return params[0].name + '</br>' + params[0].seriesName + ' : ' + $filter('currency')(params[0].value, '￥', 2) + '元';
          }
        },
        legend: {     //图例组件
          show: false,
          data: ['现金流量'],
          x: 'center',
          y: 'bottom',
          orient: 'horizontal' //布局走向 vertical 垂直 horizontal水平
        },
        grid: {       //直角坐标系内绘图网格
          top: '80px',
          left: '2%',
          right: '40px',
          bottom: '60px',
          containLabel: true
        },
        toolbox: {     //工具栏
          show: false,
          feature: {
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: {       //直角坐标系 grid 中的 x 轴
          type: 'category',
          name: '季度',
          boundaryGap: false,
          data: data.xAxisData
        },
        yAxis: {       //直角坐标系 grid 中的 y 轴
          type: 'value',
          name: '金额',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}元'
          }
        },
        series: [{
          name: '现金流量',
          type: 'line',
          smooth: true,
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          data: data.seriesData
        }]
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

  //重置数据
  $scope.resetData = function () {
    $scope.condition.month = new Date();
  };

});
