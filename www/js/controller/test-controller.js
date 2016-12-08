angular.module('myApp.controllers')

//测试日期选择控件
  .controller('testIonDatePickerCtrl', function ($scope) {
    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });
  });
