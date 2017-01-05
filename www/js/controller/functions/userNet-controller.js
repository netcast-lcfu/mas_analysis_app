var appController = angular.module('myApp.controllers');

appController.controller('userNetCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, UserNetService) {

  $scope.flag = 'day';
  queryDayUserNetInfo();
  deRefresh();
  $scope.queryDayUserNetInfo = queryDayUserNetInfo;
  $scope.queryWeekUserNetInfo = queryWeekUserNetInfo;
  $scope.queryMonthUserNetInfo = queryMonthUserNetInfo;

  $scope.deRefresh = function () {
    deRefresh();
    $scope.$broadcast('scroll.refreshComplete');
  };

  function deRefresh() {
    if ($scope.flag == 'day') {
      queryDayUserNetInfo();
    } else if ($scope.flag == 'week') {
      queryWeekUserNetInfo();
    } else {
      queryMonthUserNetInfo();
    }
  }

  function queryDayUserNetInfo() {
    $scope.flag = 'day';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    $ionicLoading.show();
    //访问后台获取图表数据
    UserNetService.getUserNetDayInfoEchartsData(userId, token).then(function (data) {
      setCharts(data, '近7日用户净增', '日');
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });
  }

  function queryWeekUserNetInfo() {
    $scope.flag = 'week';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    $ionicLoading.show();
    //访问后台获取图表数据
    UserNetService.getUserNetWeekInfoEchartsData(userId, token).then(function (data) {
      setCharts(data, '近7周用户净增', '周');
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });
  }

  function queryMonthUserNetInfo() {
    $scope.flag = 'month';
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;
    $ionicLoading.show();
    //访问后台获取图表数据
    UserNetService.getUserNetMonthInfoEchartsData(userId, token).then(function (data) {
      setCharts(data, '近7月用户净增', '月份');
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
    });
  }

  function setCharts(data, title, xAxisLable) {
    if (Boolean(data)) {
      $scope.showChart = true;
      if (Boolean(data.echartData1)) {
        $scope.showChart1 = true;
        //主机
        var myChart1 = echarts.init(document.getElementById('userNetChart1'), 'macarons');
        var option1 = {
          title: {
            show: true,
            text: title + ' - 主机',
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
              name: '净增用户'
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
        //副一机
        var myChart2 = echarts.init(document.getElementById('userNetChart2'), 'macarons');
        var option2 = {
          title: {
            show: true,
            text: title + ' - 副一机',
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
              name: '净增用户'
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

      if (Boolean(data.echartData3)) {
        $scope.showChart3 = true;
        //高清
        var myChart3 = echarts.init(document.getElementById('userNetChart3'), 'macarons');
        var option3 = {
          title: {
            show: true,
            text: title + ' - 高清',
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
              name: '净增用户'
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
      } else {
        $scope.showChart3 = false;
      }

      if (Boolean(data.echartData4)) {
        $scope.showChart4 = true;
        //互动
        var myChart4 = echarts.init(document.getElementById('userNetChart4'), 'macarons');
        var option4 = {
          title: {
            show: true,
            text: title + ' - 互动',
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
            data: data.echartData4.legend
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
              data: data.echartData4.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '净增用户'
            }
          ],
          series: data.echartData4.series
        };
        //柱状图显示数据
        for (var index = 0, size = option4.series.length; index < size; index++) {
          option4.series[index].label = {
            normal: {
              show: true,
              position: 'top'
            }
          };
        }
        window.onresize = function () {
          myChart4.resize(); //使图表适应屏幕
        };
        myChart4.setOption(option4);
      } else {
        $scope.showChart4 = false;
      }

      if (Boolean(data.echartData5)) {
        $scope.showChart5 = true;
        //宽带
        var myChart5 = echarts.init(document.getElementById('userNetChart5'), 'macarons');
        var option5 = {
          title: {
            show: true,
            text: title + ' - 宽带',
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
            data: data.echartData5.legend
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
              data: data.echartData5.category
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '净增用户'
            }
          ],
          series: data.echartData5.series
        };
        //柱状图显示数据
        for (var index = 0, size = option5.series.length; index < size; index++) {
          option5.series[index].label = {
            normal: {
              show: true,
              position: 'top'
            }
          };
        }
        window.onresize = function () {
          myChart5.resize(); //使图表适应屏幕
        };
        myChart5.setOption(option5);
      } else {
        $scope.showChart5 = false;
      }

    } else {
      $scope.showChart = false;
    }
  }

});
