angular.module('myApp.controllers')

//登录控制器
  .controller('loginController', function ($scope, $state, $ionicPopup, $ionicLoading, UserService, $cordovaToast) {
    $scope.title = 'loginController';
    $scope.user = {};
    $scope.show_psd = false;
    $scope.showPassword = function () {
      $scope.show_psd = !$scope.show_psd;
    };

    $scope.login = function () {
      console.log("username is " + $scope.user.username);
      console.log("password is " + $scope.user.password);
      if (!Boolean($scope.user.username)) {
        // $ionicPopup.show({
        //   template: '请输入用户名!',
        //   buttons: [{
        //     text: '确定',
        //     type: 'button-theme'
        //   }]
        // });

        // $ionicLoading.show({
        //   template: '用户名不能为空',
        //   duration: 1000
        // });
        $cordovaToast.showShortCenter("用户名不能为空!");
      } else if (!Boolean($scope.user.password)) {
        // $ionicPopup.show({
        //   template: '请输入密码!',
        //   buttons: [{
        //     text: '确定',
        //     type: 'button-theme'
        //   }]
        // });
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
          $cordovaToast.showShortBottom("登录成功!");
          $state.go("tab.tab1");
        }, function (err) {
          $ionicLoading.hide();
          // 登录失败
          // $ionicLoading.show({
          //   template: err,
          //   duration: 1500
          // });
          $cordovaToast.showShortCenter(err);
        });
      }
    };
  });
