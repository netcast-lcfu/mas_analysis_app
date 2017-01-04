var appController = angular.module('myApp.controllers');

appController.controller('userNetCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, UserNetService) {

  var userId = UserService.getLoginUser().userId;
  var token = UserService.getLoginUser().token;
  //访问后台获取图表数据
  UserNetService.getUserNetDayInfoEchartsData(userId, token).then(function (data) {
    setCharts(data, '近7日用户净增', '日');
    $ionicLoading.hide();
  }, function (err) {
    $ionicLoading.hide();
    $cordovaToast.showShortCenter(err);
  });

  function setCharts(data, title, xAxisLable) {
    //主机
    var myChart1 = echarts.init(document.getElementById('userNetChart1'), 'macarons');
    var option1 = {
      title: {
        show: false,
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
          name: '净增量'
        }
      ],
      series: data.echartData1.series
    };
    window.onresize = function () {
      myChart1.resize(); //使图表适应屏幕
    };
    myChart1.setOption(option1);

    //副一机
    var myChart2 = echarts.init(document.getElementById('userNetChart2'), 'macarons');
    var option2 = {
      title: {
        show: false,
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
          name: '净增量'
        }
      ],
      series: data.echartData1.series
    };
    window.onresize = function () {
      myChart2.resize(); //使图表适应屏幕
    };
    myChart2.setOption(option2);

    //高清
    var myChart3 = echarts.init(document.getElementById('userNetChart3'), 'macarons');
    var option3 = {
      title: {
        show: false,
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
          name: '净增量'
        }
      ],
      series: data.echartData1.series
    };
    window.onresize = function () {
      myChart3.resize(); //使图表适应屏幕
    };
    myChart3.setOption(option3);

    //互动
    var myChart4 = echarts.init(document.getElementById('userNetChart4'), 'macarons');
    var option4 = {
      title: {
        show: false,
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
          name: '净增量'
        }
      ],
      series: data.echartData1.series
    };
    window.onresize = function () {
      myChart4.resize(); //使图表适应屏幕
    };
    myChart4.setOption(option4);

    //宽带
    var myChart5 = echarts.init(document.getElementById('userNetChart5'), 'macarons');
    var option5 = {
      title: {
        show: false,
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
          name: '净增量'
        }
      ],
      series: data.echartData1.series
    };
    window.onresize = function () {
      myChart5.resize(); //使图表适应屏幕
    };
    myChart5.setOption(option5);
  }

});
