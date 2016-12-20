var appController = angular.module('myApp.controllers');

//查询KPI完成进度
appController.controller('queryKpiCompletedProgressCtrl', function ($scope, $ionicLoading, $cordovaToast, UserService, KpiService, ApiEndpoint) {

  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.condition = {
    area: '',
    year: '',
    period: ''
  };

  //是否显示查询条件
  $scope.show_query_condition = true;

  //是否显示查询结果
  $scope.show_query_result = false;

  //查看和隐藏查询条件
  $scope.toggleQueryCondition = function () {
    $scope.show_query_condition = !$scope.show_query_condition;
  };

  var adminAreaDatas = [{areaId: '1001', areaName: '马鞍山'}, {areaId: '001', areaName: '当涂'}];
  var yearDatas = ['2016', '2012'];
  var periodDatas = [{periodId: 1, periodName: '1月'}, {periodId: 2, periodId: '2月'}, {
    periodId: 3,
    periodName: '3月'
  }, {periodId: 4, periodName: '4月'}, {
    periodId: 5,
    periodName: '5月'
  }, {periodId: 6, periodName: '6月'}, {periodId: 7, periodName: '7月'}, {periodId: 8, periodName: '8月'}, {
    periodId: 9,
    periodName: '9月'
  }, {periodId: 10, periodName: '10月'}, {
    periodId: 11,
    periodName: '11月'
  }, {periodId: 12, periodName: '12月'}];

  //后台token验证
  var userId = UserService.getLoginUser().userId;
  var token = UserService.getLoginUser().token;

  KpiService.getKpiCompletedProgressCondition(userId, token).then(function (data) {
    adminAreaDatas = data.adminAreaDatas;
    yearDatas = data.yearDatas;
    periodDatas = data.periodDatas;

    //行政区域数据
    $scope.adminAreaData = adminAreaDatas;
    $scope.condition.area = adminAreaDatas[0];

    //年份数据
    $scope.yearData = yearDatas;
    $scope.condition.year = yearDatas[0];

    //月份数据(时段)
    $scope.periodData = periodDatas;
    //默认选择当前月
    $scope.condition.period = periodDatas[new Date().getMonth()];
  }, function (err) {
    console.log(err);
    // $ionicLoading.show({
    //   template: '查询条件数据初始化失败!',
    //   duration: 1000
    // });
    $cordovaToast.showShortCenter('查询条件数据初始化失败!');
  });

  //查询按钮
  $scope.query = function () {
    //获取查询条件
    var areaId = $scope.condition.area.areaId;
    var year = $scope.condition.year;
    var periodId = $scope.condition.period.periodId;

    if (!Boolean(areaId)) {
      $cordovaToast.showShortCenter('请选择行政区域!');
      // $ionicLoading.show({
      //   template: '请选择行政区域!',
      //   duration: 1000
      // });
      return;
    }
    if (!Boolean(year)) {
      $cordovaToast.showShortCenter('请选择年份!');
      // $ionicLoading.show({
      //   template: '请选择年份!',
      //   duration: 1000
      // });
      return;
    }
    if (!Boolean(periodId)) {
      $cordovaToast.showShortCenter('请选择月份!');
      // $ionicLoading.show({
      //   template: '请选择月份!',
      //   duration: 1000
      // });
      return;
    }

    //显示查询结果
    $scope.show_query_result = true;
    //提示等待
    $ionicLoading.show();
    //访问后台获取数据
    KpiService.getKPICompletedProgress(userId, token, areaId, year, periodId).then(function (data) {
      var actionUrl = ApiEndpoint.url + '/appKPIAction.do';
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('kpiChart'), 'macarons');
      // 指定图表的配置项和数据
      var option = {
        title: {
          show: true,
          text: 'KPI完成进度',
          x: 'left'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            var res = params[0].name;
            var busiSubName = params[0].name;
            //访问KPI月完成进度所需参数
            var params1 = {
              "method": "getMonthCompletedProgressItemDetail",
              "areaId": areaId,
              "year": year,
              "periodId": periodId,
              "busiSubName": busiSubName
            };
            //ajax请求KPI完成进度
            $.ajax({
              type: "POST",
              url: actionUrl,
              data: params1,
              async: false,
              dataType: "json",
              contentType: "application/x-www-form-urlencoded; charset=utf-8",
              success: function (msg) {
                if (msg != 'fail') {
                  res += '</br>月计划指标量：' + msg.planMount;
                  res += '</br>月实际完成量：' + msg.actMount;
                } else {
                  // $ionicLoading.show({
                  //   template: '服务器未响应,请稍后再试！',
                  //   duration: 1000
                  // });
                  $cordovaToast.showShortCenter('服务器未响应,请稍后再试！');
                }
              }, error: function (msg) {
                // $ionicLoading.show({
                //   template: '服务器拒绝访问,ajax调用失败!',
                //   duration: 1000
                // });
                $cordovaToast.showShortCenter('服务器拒绝访问,ajax调用失败!');
              }
            });
            //访问年完成进度所需参数
            var params2 = {
              "method": "getYearCompletedProgressItemDetail",
              "areaId": areaId,
              "year": year,
              "busiSubName": busiSubName
            };
            //ajax请求年完成进度
            $.ajax({
              type: "POST",
              url: actionUrl,
              data: params2,
              async: false,
              dataType: "json",
              contentType: "application/x-www-form-urlencoded; charset=utf-8",
              success: function (msg) {
                if (msg != 'fail') {
                  res += '</br>年计划指标量：' + msg.planMount;
                  res += '</br>年实际完成量：' + msg.actMount;
                } else {
                  // $ionicLoading.show({
                  //   template: '服务器未响应,请稍后再试！',
                  //   duration: 1000
                  // });
                  $cordovaToast.showShortCenter('服务器未响应,请稍后再试！');
                }
              }, error: function (msg) {
                // $ionicLoading.show({
                //   template: '服务器拒绝访问,ajax调用失败!',
                //   duration: 1000
                // });
                $cordovaToast.showShortCenter('服务器拒绝访问,ajax调用失败!');
              }
            });
            //模拟异步回调 500毫秒后显示
            setTimeout(function () {
              callback(ticket, res);
            }, 500);
            return 'loading...';
          },
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {     //工具栏
          show: false,
          feature: {
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['月完成进度', '年完成进度'],
          x: 'right',//水平位置
          y: 'top',//垂直位置
          orient: 'vertical' //布局走向 vertical 垂直 horizontal水平
        },
        grid: {
          left: '2%',
          right: '65px',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '业务指标',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: function (val) {
                return val.split("").join("\n");
              }
            },
            data: data.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '完成百分比',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '月完成进度',
            type: 'bar',
            data: data.seriesMonthData
          },
          {
            name: '年完成进度',
            type: 'bar',
            data: data.seriesYearData
          }
        ]
      };

      window.onresize = function () {
        myChart.resize(); //使图表适应屏幕
      };

      //设置数据项样式
      for (var i = 0; i < option.series.length; i++) {
        option.series[i].itemStyle = {
          normal: {
            color: function (params) {
              if (params.data <= 50) {
                return 'red';
              } else if (params.data > 50 && params.data < 100) {
                return 'yellow';
              } else {
                return 'green';
              }
            }, label: {show: false, position: 'top', formatter: '{c}%'}
          }
        };
      }

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

  //重置按钮
  $scope.resetData = function () {
    $scope.condition.area = adminAreaDatas[0];
    $scope.condition.year = yearDatas[0];
    $scope.condition.period = periodDatas[new Date().getMonth()];
  };

});
