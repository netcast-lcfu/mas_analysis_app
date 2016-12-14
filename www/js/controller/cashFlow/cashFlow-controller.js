angular.module('myApp.controllers')

//现金流量渠道分析
  .controller('cashFlowChannelAnalysisCtrl', function ($scope,$filter,$ionicLoading, $cordovaToast, UserService,ApiEndpoint) {

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    $scope.condition = {
      startPayDate: '',
      endPayDate: ''
    };

    $scope.query = function () {
      var startPayDate = $filter('date')($scope.condition.startPayDate,'yyyy-MM-dd H:mm:ss');
      var endPayDate = $filter('date')($scope.condition.endPayDate,'yyyy-MM-dd H:mm:ss');
      console.log('格式化后的日期:');
      console.log(startPayDate);
      console.log(endPayDate);
    };

    $scope.resetData = function () {

    };

  });
