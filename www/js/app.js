//预先加载Controller Services Utils模块
angular.module('myApp.controllers', []);
angular.module('myApp.services', []);
angular.module("myApp.utils", []);
angular.module("myApp", ['ionic', 'ngCordova', 'ion-datetime-picker', 'myApp.controllers', 'myApp.services', 'myApp.utils'])
//定义常量
  .constant("ApiEndpoint", {
    url: 'http://10.1.1.89:8080/mas_analysis',
    //url: 'http://127.0.0.1:8080/mas_analysis',
    //访问超时时间3s
    timeout: 3000
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    // Android 将tab位置移到底部
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('');

    //避免每次http交互$ionicloading等待很久
    $httpProvider.interceptors.push(function ($rootScope) {
      return {
        request: function (config) {
          $rootScope.$broadcast('loading:show');
          return config;
        },
        response: function (response) {
          $rootScope.$broadcast('loading:hide');
          return response;
        }
      }
    });

    $stateProvider
      //登陆
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      })
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.tab1', {
        url: '/tab1',
        views: {
          'tab-tab1': {
            templateUrl: 'templates/tab-tab1.html',
            controller: 'tab1Controller'
          }
        }
      })
      .state('tab.tab2', {
        url: '/tab2',
        views: {
          'tab-tab2': {
            templateUrl: 'templates/tab-tab2.html',
            controller: 'tab2Controller'
          }
        }
      })
      .state('tab.tab3', {
        url: '/tab3',
        views: {
          'tab-tab3': {
            templateUrl: 'templates/tab-tab3.html',
            controller: 'tab3Controller'
          }
        }
      })
      .state('tab.queryKnowledgeLib', {
        url: '/tab1/queryKnowledgeLib',
        views: {
          'tab-tab1': {
            templateUrl: 'templates/queryKnowledgeLib.html',
            controller: 'queryKnowledgeLibCtrl'
          }
        }
      })
      .state('tab.showBusiInfo', {
        url: '/tab2/showBusiInfo',
        views: {
          'tab-tab2': {
            templateUrl: 'templates/showBusiInfo.html',
            controller: 'showBusiInfoCtrl'
          }
        }
      })
      .state('tab.showSectorAreaInfo', {
        url: '/tab3/showSectorAreaInfo',
        views: {
          'tab-tab3': {
            templateUrl: 'templates/showSectorAreaInfo.html',
            controller: 'showSectorAreaInfoCtrl'
          }
        }
      })
      .state('showIonDatetimePicker', {
        url: '/showIonDatetimePicker',
        templateUrl: 'templates/ion-datetime-picker.html',
        controller: 'testIonDatePickerCtrl'
      })
    ;
    //主页
    $urlRouterProvider.otherwise('login');
  })
  .run(function ($ionicPlatform, $rootScope, $ionicHistory, $state, UserService, $ionicLoading, $cordovaToast, $ionicPickerI18n) {
    $ionicPlatform.ready(function () {
      //使用 cordova InAppBrowser 插件
      if (window.cordova && window.cordova.InAppBrowser) {
        window.open = window.cordova.InAppBrowser.open;
      }
      //Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      // 日期时间选择插件的本地化
      $ionicPickerI18n.weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      $ionicPickerI18n.months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
      $ionicPickerI18n.ok = "确定";
      $ionicPickerI18n.cancel = "取消";

      $rootScope.$on('loading:show', function () {
        $ionicLoading.show();
      });

      $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
      });

      // if (window.StatusBar) {
      //   // org.apache.cordova.statusbar required
      //   StatusBar.styleDefault();
      // }
      //本地加载token实现免登陆
      UserService.readLocalToken().then(function () {
        console.log("isLogin:");
        console.log(UserService.isLogin());
        if(UserService.isLogin()) {
          $cordovaToast.showShortBottom("登录成功!");
          $state.go("tab.tab1");
        }else{
          $cordovaToast.showShortCenter("本地保存数据和服务器不同步,请重新登录!");
          $state.go("login");
        }
      },function (err) {
        // $ionicLoading.show({
        //   template: "之前未登录,或本地凭据已失效,请重新登录!",
        //   duration: 1500
        // });
        $cordovaToast.showShortCenter("您之前未登录或登录保存的凭据已过期,请重新登录!");
        $state.go("login");
      });
    });
    //var needLoginView = ["myclass","mycomment","myfavorite","myquestion","orderlist"];//需要登录的页面state
    //没有登录跳往登录页面
    // $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams, options) {
    //   // if (needLoginView.indexOf(toState.name) >= 0 && UserService.isLogin) {//判断当前是否登录
    //   //   $state.go("login");//跳转到登录页
    //   //   event.preventDefault(); //阻止默认事件，即原本页面的加载
    //   // }
    //   // console.log("isLogin:");
    //   // console.log(UserService.isLogin());
    //   // if(!UserService.isLogin()) {//判断当前是否登录
    //   //   $state.go("login");//已登录跳转到首页
    //   //   event.preventDefault();//阻止模板解析的发生
    //   // }
    //
    //
    // });
  });
