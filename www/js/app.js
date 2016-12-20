//预先加载Controller Services Utils模块
angular.module('myApp.controllers', []);
angular.module('myApp.services', []);
angular.module("myApp.utils", []);

//App全局模块
var myApp = angular.module("myApp", ['ionic', 'ngCordova', 'ion-datetime-picker', 'myApp.controllers', 'myApp.services', 'myApp.utils']);

//定义常量
myApp.constant("ApiEndpoint", {
  url: 'http://211.141.224.40:8070/mas_analysis',
  //url: 'http://127.0.0.1:8080/mas_analysis',
  //访问超时时间6s
  timeout: 6000
});

// //配置 $http访问带参的方式,暂时未用到
// myApp.config(function ($httpProvider) {
//   // 头部配置
//   $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//   $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
//   $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
//
//   /**
//    * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
//    * @param {Object} obj
//    * @return {String}
//    */
//   var param = function (obj) {
//     var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
//
//     for (name in obj) {
//       value = obj[name];
//
//       if (value instanceof Array) {
//         for (i = 0; i < value.length; ++i) {
//           subValue = value[i];
//           fullSubName = name + '[' + i + ']';
//           innerObj = {};
//           innerObj[fullSubName] = subValue;
//           query += param(innerObj) + '&';
//         }
//       }
//       else if (value instanceof Object) {
//         for (subName in value) {
//           subValue = value[subName];
//           fullSubName = name + '[' + subName + ']';
//           innerObj = {};
//           innerObj[fullSubName] = subValue;
//           query += param(innerObj) + '&';
//         }
//       }
//       else if (value !== undefined && value !== null)
//         query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
//     }
//
//     return query.length ? query.substr(0, query.length - 1) : query;
//   };
//
//   // Override $http service's default transformRequest
//   $httpProvider.defaults.transformRequest = [function (data) {
//     return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
//   }];
// });

//初始化配置
myApp.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

  //全局禁用view缓存 及时刷新数据
  //$ionicConfigProvider.views.maxCache(0);

  //导航栏标题居中
  $ionicConfigProvider.navBar.alignTitle('center');

  // Android 将tab位置移到底部
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style('');

  //Angular Router路由配置
  $stateProvider
  //登陆
    .state('login', {
      url: '/login',
      //禁用View缓存 避免用户信息被看到
      cache: false,
      templateUrl: 'templates/user/login.html',
      controller: 'loginController'
    })
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: 'templates/tab/tabs.html'
    })
    .state('tab.tab1', {
      url: '/tab1',
      views: {
        'tab-tab1': {
          templateUrl: 'templates/tab/tab-tab1.html',
          controller: 'tab1Controller'
        }
      }
    })
    .state('tab.tab2', {
      url: '/tab2',
      views: {
        'tab-tab2': {
          templateUrl: 'templates/tab/tab-tab2.html',
          controller: 'tab2Controller'
        }
      }
    })
    .state('tab.tab3', {
      url: '/tab3',
      views: {
        'tab-tab3': {
          templateUrl: 'templates/tab/tab-tab3.html',
          controller: 'tab3Controller'
        }
      }
    })
    //个人信息
    .state('personalInfo', {
      url: '/personalInfo',
      templateUrl: 'templates/user/personal-info.html',
      controller: 'personalInfoCtrl'
    })
    //主营业务状态变化分析
    .state('tab.mainBusiStateChangeAnalysis', {
      url: '/tab1/mainBusiStateChangeAnalysis',
      views: {
        'tab-tab1': {
          templateUrl: 'templates/mainBusi/main-busi-state-change-analysis.html',
          controller: 'mainBusiStateChangeAnalysisCtrl'
        }
      }
    })
    //现金缴费渠道分析
    .state('tab.cashFlowChannelAnalysis', {
      url: '/tab2/cashFlowChannelAnalysis',
      views: {
        'tab-tab2': {
          templateUrl: 'templates/cashFlow/cash-flow-channel-analysis.html',
          controller: 'cashFlowChannelAnalysisCtrl'
        }
      }
    })
    //现金流量日分析
    .state('tab.cashFlowDayAnalysis', {
      url: '/tab2/cashFlowDayAnalysis',
      views: {
        'tab-tab2': {
          templateUrl: 'templates/cashFlow/cash-flow-day-analysis.html',
          controller: 'cashFlowDayAnalysisCtrl'
        }
      }
    })
    //现金流量月分析
    .state('tab.cashFlowMonthAnalysis', {
      url: '/tab2/cashFlowMonthAnalysis',
      views: {
        'tab-tab2': {
          templateUrl: 'templates/cashFlow/cash-flow-month-analysis.html',
          controller: 'cashFlowMonthAnalysisCtrl'
        }
      }
    })
    //现金流量年分析
    .state('tab.cashFlowYearAnalysis', {
      url: '/tab2/cashFlowYearAnalysis',
      views: {
        'tab-tab2': {
          templateUrl: 'templates/cashFlow/cash-flow-year-analysis.html',
          controller: 'cashFlowYearAnalysisCtrl'
        }
      }
    })
    //KPI完成进度查询
    .state('tab.queryKpiCompletedProgress', {
      url: '/tab3/queryKpiCompletedProgress',
      views: {
        'tab-tab3': {
          templateUrl: 'templates/kpi/query-kpi-completed-progress.html',
          controller: 'queryKpiCompletedProgressCtrl'
        }
      }
    })
  ;
  //主页
  $urlRouterProvider.otherwise('/tab/tab1');
});

//启动App的全局初始化工作
myApp.run(function ($ionicPlatform, $rootScope, $ionicHistory, $state, $ionicLoading, $cordovaToast, $ionicPickerI18n, UserService) {
  $ionicPlatform.ready(function () {
    //使用 cordova InAppBrowser 插件
    if (window.cordova && window.cordova.InAppBrowser) {
      window.open = window.cordova.InAppBrowser.open;
    }

    //键盘的不同模式的支持
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

    //状态栏(与苹果原生状态栏冲突暂不用)
    // if (window.StatusBar) {
    //   // org.apache.cordova.statusbar required
    //   StatusBar.styleDefault();
    // }

    //本地加载token实现免登陆
    UserService.readLocalToken().then(function () {
      console.log("isLogin:");
      console.log(UserService.isLogin());
      if (UserService.isLogin()) {
        $cordovaToast.showShortBottom("登录成功!");
        // $ionicLoading.show({
        //   template: "登录成功!",
        //   duration: 1500
        // });
        $state.go("tab.tab1");
      } else {
        // $ionicLoading.show({
        //   template: "本地保存数据和服务器不同步,请重新登录!",
        //   duration: 1500
        // });
        $cordovaToast.showShortBottom("本地保存数据和服务器不同步,请重新登录!");
        $state.go("login");
      }
    }, function (err) {
      // $ionicLoading.show({
      //   template: "之前未登录,或本地保存数据已过期,请重新登录!",
      //   duration: 1500
      // });
      $cordovaToast.showShortBottom(err);
      $state.go("login");
    });
  });

  //验证登录(tips:由于会引起循环堆栈溢出,未采用)
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
