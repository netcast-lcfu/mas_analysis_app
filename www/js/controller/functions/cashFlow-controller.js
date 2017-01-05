var appController = angular.module('myApp.controllers');

appController.controller('cashFlowCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowFuncService) {
  $scope.flag = 'day';
  queryDayCashFlowInfo();
  deRefresh();
  $scope.queryDayCashFlowInfo = queryDayCashFlowInfo;
  $scope.queryWeekCashFlowInfo = queryWeekCashFlowInfo;
  $scope.queryMonthCashFlowInfo = queryMonthCashFlowInfo;

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
    $scope.flag = 'day';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    $ionicLoading.show();
    CashFlowFuncService.getTodayCashFlowInfo(userId, token).then(function (data) {
      setTodayPieCharts(data);
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });

    $ionicLoading.show();
    //访问后台获取图表数据
    CashFlowFuncService.getDayCashFlowInfo(userId, token).then(function (data) {
      setCharts(data, '近7日现金流渠道', '日');
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });
  }

  function queryWeekCashFlowInfo() {
    $scope.flag = 'week';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    $ionicLoading.show();
    //访问后台获取图表数据
    CashFlowFuncService.getWeekCashFlowInfo(userId, token).then(function (data) {
      setCharts(data, '近7周现金流渠道', '周');
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });
  }

  function queryMonthCashFlowInfo() {
    $scope.flag = 'month';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    $ionicLoading.show();
    //访问后台获取图表数据
    CashFlowFuncService.getMonthCashFlowInfo(userId, token).then(function (data) {
      setCharts(data, '近7月现金流渠道', '月份');
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });
  }

  function setTodayPieCharts(data) {
    $scope.flag = 'day';
    $scope.todayCashFlowDatas = data.pieDatas;

    if (Boolean(data.legends) && Boolean(data.pieDatas)) {
      $scope.showTodayChart = true;

      var myChart = echarts.init(document.getElementById('todayCashFlowChart'), 'macarons');
      var option = {
        title: {
          show: false,
          text: '当日现金流量渠道占比分析',
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

    } else {
      $scope.showTodayChart = false;
    }

  }

  function setCharts(data, title, xAxisLable) {
    if (Boolean(data)) {
      $scope.showChart = true;

      if (Boolean(data.echartData1)) {
        $scope.showChart1 = true;
        //营业厅
        var myChart1 = echarts.init(document.getElementById('cashFlowChart1'), 'macarons');
        var option1 = {
          title: {
            show: true,
            text: title + ' - 营业厅',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
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
              name: '缴费金额'
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
      } else {
        $scope.showChart1 = false;
      }

      if (Boolean(data.echartData2)) {
        $scope.showChart2 = true;
        //代收代扣
        var myChart2 = echarts.init(document.getElementById('cashFlowChart2'), 'macarons');
        var option2 = {
          title: {
            show: true,
            text: title + ' - 代收代扣',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
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
              name: '缴费金额'
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
      } else {
        $scope.showChart2 = false;
      }

      if (Boolean(data.echartData9)) {
        $scope.showChart9 = true;
        //其他
        var myChart3 = echarts.init(document.getElementById('cashFlowChart9'), 'macarons');
        var option3 = {
          title: {
            show: true,
            text: title + ' - 其他',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
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
              name: '缴费金额'
            }
          ],
          series: data.echartData9.series
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
      } else {
        $scope.showChart9 = false;
      }

    } else {
      $scope.showChart = false;
    }

  }

});
