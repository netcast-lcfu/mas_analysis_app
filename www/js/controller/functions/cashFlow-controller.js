var appController = angular.module('myApp.controllers');

appController.controller('cashFlowCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowFuncService, BaseService) {

  $scope.flag = 'day';
  //是否显示当日现金流信息图表
  $scope.showTodayChart = true;
  //是否显示图表
  $scope.showChart = true;
  //是否显示营业厅缴费渠道图表
  $scope.showChart1 = true;
  //是否显示电子缴费渠道图表
  $scope.showChart2 = true;
  //是否显示营销缴费渠道图表
  $scope.showChart3 = true;
  //是否显示其他缴费渠道图表
  $scope.showChart9 = true;
  //是否显示查询条件
  $scope.show_query_condition = false;

  //行政区域信息
  var adminAreaDatas = [{adminAreaId: '1', adminAreaName: '马鞍山'}, {
    adminAreaId: '1011',
    adminAreaName: '龙山'
  }, {adminAreaId: '1021', adminAreaName: '博望'}, {adminAreaId: '1031', adminAreaName: '和县功桥'}, {
    adminAreaId: '1041',
    adminAreaName: '郑蒲港新区'
  }];

  $scope.adminAreaData = adminAreaDatas;

  $scope.condition = {
    adminArea: adminAreaDatas[0]
  };


  initSelectData();
  queryDayCashFlowInfo();
  $scope.queryDayCashFlowInfo = queryDayCashFlowInfo;
  $scope.queryWeekCashFlowInfo = queryWeekCashFlowInfo;
  $scope.queryMonthCashFlowInfo = queryMonthCashFlowInfo;


  //初始化查询条件
  function initSelectData() {
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    BaseService.getBaseAdminAreaData(userId, token).then(function (data) {
      adminAreaDatas = data.adminAreaDatas;
      //行政区域数据
      $scope.adminAreaData = adminAreaDatas;
      $scope.condition.adminArea = adminAreaDatas[0];
    }, function (err) {
      console.log(err);
      // $ionicLoading.show({
      //   template: '查询条件数据初始化失败!',
      //   duration: 1000
      // });
      $cordovaToast.showShortCenter('行政区域查询条件数据初始化失败!');
    });
  }

  //是否显示查询条件转换事件
  $scope.toggleQueryCondition = function () {
    $scope.show_query_condition = !$scope.show_query_condition;
  };

  $scope.deRefresh = function () {
    deRefresh();
    $scope.$broadcast('scroll.refreshComplete');
  };

  function deRefresh() {
    if ($scope.flag == 'day') {
      queryDayCashFlowInfo();
    } else if ($scope.flag == 'week') {
      queryWeekCashFlowInfo();
    } else {
      queryMonthCashFlowInfo();
    }
  }

  function queryDayCashFlowInfo() {
    $scope.show_query_condition = false;
    $scope.flag = 'day';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;

    var adminAreaId = $scope.condition.adminArea.adminAreaId;
    if (!Boolean(adminAreaId)) {
      $cordovaToast.showShortCenter('请选择行政区域!');
      return;
    }

    $ionicLoading.show();
    CashFlowFuncService.getTodayCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setTodayPieCharts(data);
      $ionicLoading.hide();
      $scope.showTodayChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showTodayChart = false;
    });

    $ionicLoading.show();
    //访问后台获取图表数据
    CashFlowFuncService.getDayCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setCharts(data, '近7日现金流渠道', '日');
      $ionicLoading.hide();
      $scope.showChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showChart = false;
    });
  }

  function queryWeekCashFlowInfo() {
    $scope.show_query_condition = false;
    $scope.flag = 'week';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;

    var adminAreaId = $scope.condition.adminArea.adminAreaId;
    if (!Boolean(adminAreaId)) {
      $cordovaToast.showShortCenter('请选择行政区域!');
      return;
    }

    $ionicLoading.show();
    //访问后台获取图表数据
    CashFlowFuncService.getWeekCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setCharts(data, '近7周现金流渠道', '周');
      $ionicLoading.hide();
      $scope.showChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showChart = false;
    });
  }

  function queryMonthCashFlowInfo() {
    $scope.show_query_condition = false;
    $scope.flag = 'month';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;

    var adminAreaId = $scope.condition.adminArea.adminAreaId;
    if (!Boolean(adminAreaId)) {
      $cordovaToast.showShortCenter('请选择行政区域!');
      return;
    }

    $ionicLoading.show();
    //访问后台获取图表数据
    CashFlowFuncService.getMonthCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setCharts(data, '近7月现金流渠道', '月');
      $ionicLoading.hide();
      $scope.showChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showChart = false;
    });
  }

  function setTodayPieCharts(data) {
    $scope.flag = 'day';
    $scope.todayCashFlowDatas = data.pieDatas;

    if (Boolean(data.legends) && Boolean(data.pieDatas)) {
      var myChart = echarts.init(document.getElementById('todayCashFlowChart'), 'macarons');
      var option = {
        title: {
          show: false,
          text: '当日现金流量渠道占比分析',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/> 渠道名称: {b} <br/> 金额:￥{c} 万 <br/> 占比:{d}%" //a:系列名 b:数据名 c:数据值 d:百分比
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
            radius: [0, '90%'], // 饼状图的半径 {内半径,外半径}
            center: ['50%', '50%'], //上下左右的位置
            label: {
              normal: {
                position: 'inner', //内置文本标签
                formatter: '{b} {d}%' //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
              }
            },
            labelLine: {
              normal: {
                show: false     //不需要设置引导线
              }
            },
            data: data.pieDatas
          }
        ]
      };
      window.onresize = function () {
        myChart.resize(); //使图表适应屏幕
      };
      myChart.setOption(option);
      $scope.showTodayChart = true;
    } else {
      $scope.showTodayChart = false;
    }

  }

  function setCharts(data, title, xAxisLable) {
    if (Boolean(data)) {
      if (Boolean(data.echartData1)) {
        //营业厅
        var myChart1 = echarts.init(document.getElementById('cashFlowChart1'), 'macarons');
        var option1 = {
          title: {
            show: true,
            text: title + ' - 营业厅',
            subtext: '总金额: ' + $filter('currency')(data.sumMoney1, '￥', 2) + ' 万',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/> {b} : {c} 万'
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
            data: data.echartData1.legend
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: xAxisLable,
              data: data.echartData1.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额/万'
            }
          ],
          series: data.echartData1.series
        };
        //柱状图显示数据
        for (var index = 0, size = option1.series.length; index < size; index++) {
          option1.series[index].label = {
            normal: {
              show: true,
              position: 'top'
            }
          };
        }
        window.onresize = function () {
          myChart1.resize(); //使图表适应屏幕
        };
        myChart1.setOption(option1);
        $scope.showChart1 = true;
      } else {
        $scope.showChart1 = false;
      }

      if (Boolean(data.echartData2)) {
        //电子渠道
        var myChart2 = echarts.init(document.getElementById('cashFlowChart2'), 'macarons');
        var option2 = {
          title: {
            show: true,
            text: title + ' - 电子渠道',
            subtext: '总金额: ' + $filter('currency')(data.sumMoney2, '￥', 2) + ' 万',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/> {b} : {c} 万'
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
            data: data.echartData2.legend
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: xAxisLable,
              data: data.echartData2.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额/万'
            }
          ],
          series: data.echartData2.series
        };
        //柱状图显示数据
        for (var index = 0, size = option2.series.length; index < size; index++) {
          option2.series[index].label = {
            normal: {
              show: true,
              position: 'top'
            }
          };
        }
        window.onresize = function () {
          myChart2.resize(); //使图表适应屏幕
        };
        myChart2.setOption(option2);
        $scope.showChart2 = true;
      } else {
        $scope.showChart2 = false;
      }

      if (Boolean(data.echartData3)) {
        //营销渠道
        var myChart3 = echarts.init(document.getElementById('cashFlowChart3'), 'macarons');
        var option3 = {
          title: {
            show: true,
            text: title + ' - 营销渠道',
            subtext: '总金额: ' + $filter('currency')(data.sumMoney3, '￥', 2) + ' 万',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/> {b} : {c} 万'
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
            data: data.echartData3.legend
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: xAxisLable,
              data: data.echartData3.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额/万'
            }
          ],
          series: data.echartData3.series
        };
        //柱状图显示数据
        for (var index = 0, size = option3.series.length; index < size; index++) {
          option3.series[index].label = {
            normal: {
              show: true,
              position: 'top'
            }
          };
        }
        window.onresize = function () {
          myChart3.resize(); //使图表适应屏幕
        };
        myChart3.setOption(option3);
        $scope.showChart3 = true;
      } else {
        $scope.showChart3 = false;
      }


      if (Boolean(data.echartData9)) {
        //其他
        var myChart9 = echarts.init(document.getElementById('cashFlowChart9'), 'macarons');
        var option9 = {
          title: {
            show: true,
            text: title + ' - 其他',
            subtext: '总金额: ' + $filter('currency')(data.sumMoney9, '￥', 2) + ' 万',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/> {b} : {c} 万'
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
            data: data.echartData9.legend
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: xAxisLable,
              data: data.echartData9.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额/万'
            }
          ],
          series: data.echartData9.series
        };
        //柱状图显示数据
        for (var index = 0, size = option9.series.length; index < size; index++) {
          option9.series[index].label = {
            normal: {
              show: true,
              position: 'top'
            }
          };
        }
        window.onresize = function () {
          myChart9.resize(); //使图表适应屏幕
        };
        myChart9.setOption(option9);
        $scope.showChart9 = true;
      } else {
        $scope.showChart9 = false;
      }
      $scope.showChart = true;
    } else {
      $scope.showChart = false;
    }

  }

});
