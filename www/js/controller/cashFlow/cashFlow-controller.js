angular.module('myApp.controllers')

//现金流量渠道分析
  .controller('cashFlowChannelAnalysisCtrl', function ($scope, $ionicLoading, $cordovaToast, UserService,ApiEndpoint) {

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    $scope.condition = {
      area: '',
      year: '',
      period: ''
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

    //行政区域数据
    $scope.adminAreaData = adminAreaDatas;
    $scope.condition.area = adminAreaDatas[0];

    //年份数据
    $scope.yearData = yearDatas;
    $scope.condition.year = yearDatas[0];

    //月份数据(时段)
    $scope.periodData = periodDatas;
    $scope.condition.period = periodDatas[0];

  });
