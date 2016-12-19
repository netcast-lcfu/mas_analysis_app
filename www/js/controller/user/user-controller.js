angular.module('myApp.controllers')

//登录控制器
  .controller('loginController', function ($scope, $state, $ionicPopup, $ionicLoading, UserService, $cordovaToast) {
    $scope.user = {};
    $scope.show_psd = false;
    $scope.showPassword = function () {
      $scope.show_psd = !$scope.show_psd;
    };

    $scope.login = function () {
      console.log("username is " + $scope.user.username);
      console.log("password is " + $scope.user.password);
      if (!Boolean($scope.user.username)) {
        // $ionicLoading.show({
        //   template: '用户名不能为空',
        //   duration: 1000
        // });
        $cordovaToast.showShortCenter("用户名不能为空!");
      } else if (!Boolean($scope.user.password)) {
        $cordovaToast.showShortCenter("密码不能为空!");
        // $ionicLoading.show({
        //   template: '密码不能为空',
        //   duration: 1000
        // });
      } else {
        $ionicLoading.show();
        UserService.login($scope.user.username, $scope.user.password).then(function () {
          //登录成功
          $ionicLoading.hide();
          // $ionicLoading.show({
          //   template: '登录成功!',
          //   duration: 1500
          // });
          $cordovaToast.showShortBottom("登录成功!");
          $state.go("tab.tab1");
        }, function (err) {
          $ionicLoading.hide();
          //登录失败
          // $ionicLoading.show({
          //   template: err,
          //   duration: 1500
          // });
          $cordovaToast.showShortCenter(err);
        });
      }
    };
  })
  //
  .controller('personalInfoCtrl', function ($scope, $state, $ionicPopup, $ionicLoading, UserService, $cordovaToast) {
    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    //获取登陆用户
    $scope.loginUser = UserService.getLoginUser();

    //退出
    $scope.loginOut = function () {
        UserService.loginOut().then(function (data) {
          $cordovaToast.showShortBottom(data.msg);
          $state.go("login");
        }, function (err) {
          $cordovaToast.showShortCenter(err);
        });
      };
  });
