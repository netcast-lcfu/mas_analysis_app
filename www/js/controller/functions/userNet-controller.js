var appController = angular.module('myApp.controllers');

appController.controller('UserNetCtrl', function ($scope, $filter, $ionicModal, $ionicLoading, $cordovaToast, UserService, UserNetService, BaseService) {

  //查询标识
  $scope.flag = 'day';
  //是否显示图表
  $scope.showChart = true;
  //是否显示主机图表
  $scope.showChart1 = true;
  //是否显示副一机图表
  $scope.showChart2 = true;
  //是否显示高清图表
  $scope.showChart3 = true;
  //是否显示互动图表
  $scope.showChart4 = true;
  //是否显示宽带图表
  $scope.showChart5 = true;
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
  queryDayUserNetInfo();
  $scope.queryDayUserNetInfo = queryDayUserNetInfo;
  $scope.queryWeekUserNetInfo = queryWeekUserNetInfo;
  $scope.queryMonthUserNetInfo = queryMonthUserNetInfo;

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

  $ionicModal.fromTemplateUrl('templates/modal/userNetSelectModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.queryData = function () {
    $scope.modal.hide();
    deRefresh();
  };
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  //当我们用完模型时，清除它！
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // 当隐藏模型时执行动作
  $scope.$on('modal.hide', function () {
    // 执行动作
  });
  // 当移动模型时执行动作
  $scope.$on('modal.removed', function () {
    // 执行动作
  });

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
    //访问后台获取图表数据
    UserNetService.getUserNetDayInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setCharts(data, '近7日用户净增', '日');
      $ionicLoading.hide();
      $scope.showChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showChart = false;
    });
  }

  function queryWeekUserNetInfo() {
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
    UserNetService.getUserNetWeekInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setCharts(data, '近7周用户净增', '周');
      $ionicLoading.hide();
      $scope.showChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showChart = false;
    });
  }

  function queryMonthUserNetInfo() {
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
    UserNetService.getUserNetMonthInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      setCharts(data, '近7月用户净增', '月');
      $ionicLoading.hide();
      $scope.showChart = true;
    }, function (err) {
      $ionicLoading.hide();
      $cordovaToast.showShortCenter(err);
      $scope.showChart = false;
    });
  }

  function setCharts(data, title, xAxisLable) {
    if (Boolean(data)) {
      if (Boolean(data.echartData1)) {
        //主机
        var myChart1 = echarts.init(document.getElementById('userNetChart1'), 'macarons');
        var option1 = {
          title: {
            show: true,
            text: title + ' - 主机',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {a} : {c} 人' //a:legend名称 b.series名称 c.数值
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
        $scope.showChart1 = true;
      } else {
        $scope.showChart1 = false;
      }

      if (Boolean(data.echartData2)) {
        //副一机
        var myChart2 = echarts.init(document.getElementById('userNetChart2'), 'macarons');
        var option2 = {
          title: {
            show: true,
            text: title + ' - 副一机',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {a} : {c} 人' //a:legend名称 b.series名称 c.数值
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
        $scope.showChart2 = true;
      } else {
        $scope.showChart2 = false;
      }

      if (Boolean(data.echartData3)) {
        //高清
        var myChart3 = echarts.init(document.getElementById('userNetChart3'), 'macarons');
        var option3 = {
          title: {
            show: true,
            text: title + ' - 高清',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {a} : {c} 人' //a:legend名称 b.series名称 c.数值
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
        $scope.showChart3 = true;
      } else {
        $scope.showChart3 = false;
      }

      if (Boolean(data.echartData4)) {
        //互动
        var myChart4 = echarts.init(document.getElementById('userNetChart4'), 'macarons');
        var option4 = {
          title: {
            show: true,
            text: title + ' - 互动',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {a} : {c} 人' //a:legend名称 b.series名称 c.数值
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
        $scope.showChart4 = true;
      } else {
        $scope.showChart4 = false;
      }

      if (Boolean(data.echartData5)) {
        //宽带
        var myChart5 = echarts.init(document.getElementById('userNetChart5'), 'macarons');
        var option5 = {
          title: {
            show: true,
            text: title + ' - 宽带',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/> {a} : {c} 人' //a:legend名称 b.series名称 c.数值
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
        $scope.showChart5 = true;
      } else {
        $scope.showChart5 = false;
      }
      $scope.showChart = true;
    } else {
      $scope.showChart = false;
    }
  }

});
