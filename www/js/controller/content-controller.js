angular.module('myApp.controllers')
//内容案例
  .controller('content1Controller', function ($scope, $stateParams) {
    $scope.title = 'content1Controller';
    console.log($stateParams);
  })

  .controller('showBusiInfoCtrl', function ($scope) {
    $scope.showBusiMap = function () {
      window.open('http://10.1.1.15:8080/yunwei/researchBusinessAction!viewListForPhone.action', '_blank', 'location=yes');
    };
  })

  .controller('queryKpiCompletedProgressCtrl', function ($scope) {
    $scope.condition = {
      adminArea:'',
      year:'',
      month:''
    };

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    var adminAreaDatas = [{areaId: '1001', areaName: '马鞍山'}, {areaId: '001', areaName: '当涂'}];
    var yearDatas = ['2016', '2012'];
    var monthDatas = [{id: 1, name: '1月'}, {id: 2, name: '2月'}, {id: 3, name: '3月'}, {id: 4, name: '4月'}, {
      id: 5,
      name: '5月'
    }, {id: 6, name: '6月'}, {id: 7, name: '7月'}, {id: 8, name: '8月'}, {id: 9, name: '9月'}, {id: 10, name: '10月'}, {
      id: 11,
      name: '11月'
    }, {id: 12, name: '12月'}];

    //行政区域数据
    $scope.adminAreaData = adminAreaDatas;
    $scope.condition.adminArea = adminAreaDatas[0];

    //年份数据
    $scope.yearData = yearDatas;
    $scope.condition.year = yearDatas[0];

    //月份数据
    $scope.monthData = monthDatas;
    $scope.condition.month = monthDatas[0];

    //查询按钮
    $scope.query = function () {
      console.log("into query kpi data...");
    };

    //重置按钮
    $scope.restData = function () {
      $scope.condition.adminArea = adminAreaDatas[0];
      $scope.condition.year = yearDatas[0];
      $scope.condition.month = monthDatas[0];
    };

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'KPI完成进度'
      },
      tooltip: {},
      legend: {
        right: '30%',
        bottom: '90%',
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    window.onresize = function () {
      myChart.resize(); //使图表适应屏幕
    };
    myChart.setOption(option);

    // $scope.viewBusi = function () {
    //   window.open('http://10.1.1.15:8080/yunwei/sectorAreaAction!viewListForPhone.action', '_blank', 'location=yes');
    // };
  })

  .controller('queryKnowledgeLibCtrl', function ($scope) {
    $scope.queryKnowledgeLib = function () {
      window.open('http://10.1.1.15:8080/yunwei/simpKnowledgebaseLuceneAction!viewListForRes.action', '_blank', 'location=yes');
    };
  });
