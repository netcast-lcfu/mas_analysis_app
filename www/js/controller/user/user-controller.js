var appController = angular.module('myApp.controllers');

//登录
// appController.controller('LoginController', function ($rootScope, $scope, $cordovaDevice, $state, $ionicPopup, $ionicLoading, $cordovaToast, UserService) {

appController.controller('LoginController', function ($rootScope, $scope, $state, $ionicPopup, $ionicLoading, $cordovaToast, UserService) {

  //初始化对象
  $scope.user = {
    username: '',
    password: ''
  };

  // 隐藏返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  });

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
      // var deviceId = $cordovaDevice.getUUID();
      $ionicLoading.show();
      UserService.login($scope.user.username, $scope.user.password, null).then(function () {
        //登录成功
        $ionicLoading.hide();
        // $ionicLoading.show({
        //   template: '登录成功!',
        //   duration: 1500
        // });
        $rootScope.isLogin = true;
        $cordovaToast.showShortBottom("登录成功!");
        $state.go("function.userNet");
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
});

//个人信息
appController.controller('PersonalInfoCtrl', function ($rootScope, $scope, $state, $cordovaAppVersion, $ionicHistory, $ionicPopup, $ionicLoading, $cordovaToast, UserService, ApiEndpoint) {
  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  //获取登陆用户
  $scope.loginUser = UserService.getLoginUser();

  //退出登录提示框
  function showExitConfirm() {
    var confirmPopup = $ionicPopup.confirm({
      title: '<strong>退出登录?</strong>',
      template: '你确定要退出登录吗?',
      okText: '退出',
      cancelText: '取消'
    });
    confirmPopup.then(function (res) {
      if (res) {
        //ionic.Platform.exitApp();
        UserService.loginOut().then(function (data) {
          $cordovaToast.showShortBottom(data.msg);
          $rootScope.isLogin = false;
          $state.go("login");
        }, function (err) {
          $cordovaToast.showShortCenter(err);
        });
      }
    });
  }

  //更新提示框
  function showUpdateConfirm() {
    var confirmPopup = $ionicPopup.confirm({
      title: '<strong>提示</strong>',
      template: '有新的版本,是否更新?',
      okText: '确认',
      cancelText: '取消'
    });
    confirmPopup.then(function (res) {
      if (res) {
        //判断当前应用运
        if (ionic.Platform.isAndroid()) {
          window.open(ApiEndpoint.url + '/apk/mas_analysis_app.apk', '_system');
        } else {
          //如果是IOS平台,跳转appstore应用页面
          window.open('https://itunes.apple.com/cn/app/zhong-guang-you-xian-ma-shan/id1188211871?mt=8', '_system');
        }
      }
    });
  }

  //退出
  $scope.loginOut = function () {
    showExitConfirm();
  };

  //检测更新
  $scope.checkUpdate = function () {
    console.log('into user controller check update method...');
    if (!ionic.Platform.isAndroid()) {
      window.open('https://itunes.apple.com/cn/app/zhong-guang-you-xian-ma-shan/id1188211871?mt=8', '_system');
      return;
    }
    $cordovaAppVersion.getVersionNumber().then(function (version) {
      console.log('local version no is ' + version);
      // 本地versionCode是否一致
      var currentVersionNo = version;
      var userId = UserService.getLoginUser().userId;
      var token = UserService.getLoginUser().token;
      UserService.getAppLastestVersionNo(userId, token, currentVersionNo).then(function (data) {
        console.log('get app lastest version no success...');
        console.log('lastest version no is ' + data.lastestVersionNo);
        var lastestVersionNo = data.lastestVersionNo;
        if (currentVersionNo != lastestVersionNo) {
          console.log('当前版本不是最新的,提示更新!');
          showUpdateConfirm();
        } else {
          $cordovaToast.showShortCenter('当前版本是最新的!');
        }
      }, function (err) {
        $cordovaToast.showShortCenter(err);
      });
    }, function (err) {
      $cordovaToast.showShortCenter(err);
    });
  };


});

//修改密码
appController.controller('ModifyPasswordCtrl', function ($rootScope, $scope, $state, $ionicPopup, $ionicLoading, $cordovaToast, UserService) {

  // 添加返回按钮
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  //初始化对象
    $scope.user = {
    oldPassword: '',
    password: '',
    confirmPassword: ''
  };

  //修改密码
  $scope.modifyPassword = function () {
    console.log('into user controller modify  method...');

    if (!Boolean($scope.user.oldPassword)) {
      $cordovaToast.showShortCenter("原密码不能为空!");
    } else if (!Boolean($scope.user.password)) {
      $cordovaToast.showShortCenter("新密码不能为空!");
    } else if (!Boolean($scope.user.confirmPassword)) {
      $cordovaToast.showShortCenter("确认密码不能为空!");
    } else if (!$scope.user.password == $scope.user.confirmPassword) {
      $cordovaToast.showShortCenter("两次密码输入不相等!");
    } else {
      var userId = UserService.getLoginUser().userId;
      var token = UserService.getLoginUser().token;
      var oldPassword = $scope.user.oldPassword;
      var password = $scope.user.password;
      UserService.modifyPassword(userId, token, oldPassword, password).then(function (data) {
        var myPopup = $ionicPopup.confirm({
          title: '<strong>提示</strong>',
          template: '修改密码成功,是否跳转登录页面?',
          okText: '确认',
          cancelText: '取消'
        });
        myPopup.then(function (res) {
          if (res) {
            UserService.loginOut().then(function (data) {
              $rootScope.isLogin = false;
              $state.go("login");
            }, function (err) {
              $cordovaToast.showShortCenter(err);
            });
          }else{
            //取消跳转个人信息页面
            $state.go("personalInfo");
          }
        })
      }, function (err) {
        $cordovaToast.showShortCenter(err);
      })
    }
  };
});
