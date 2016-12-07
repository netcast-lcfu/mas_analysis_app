angular.module('myApp.controllers')

  .controller('loginController', function ($scope, $state, $ionicPopup, $ionicLoading, UserService, $cordovaToast) {
    $scope.title = 'loginController';

    $scope.user = {};
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
  })

  .controller('tab1Controller', function ($scope, Chats) {

    $scope.title = 'tab1Controller';

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };

  })
  .controller('tab2Controller', function ($scope, Chats2) {

    $scope.title = 'tab2Controller';

    $scope.chats = Chats2.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })
  .controller('tab3Controller', function ($scope, Chats3) {

    $scope.title = 'tab3Controller';
    $scope.chats = Chats3.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('content1Controller', function ($scope, $stateParams) {
    $scope.title = 'content1Controller';
    console.log($stateParams);

  })

  .controller('showBusiInfoCtrl', function ($scope) {
    $scope.showBusiMap = function () {
      window.open('http://10.1.1.15:8080/yunwei/researchBusinessAction!viewListForPhone.action', '_blank', 'location=yes');
    };
  })

  .controller('showSectorAreaInfoCtrl', function ($scope) {
    $scope.viewBusi = function () {
      window.open('http://10.1.1.15:8080/yunwei/sectorAreaAction!viewListForPhone.action', '_blank', 'location=yes');
    };
  })

  .controller('queryKnowledgeLibCtrl', function ($scope) {
    $scope.queryKnowledgeLib = function () {
      window.open('http://10.1.1.15:8080/yunwei/simpKnowledgebaseLuceneAction!viewListForRes.action', '_blank', 'location=yes');
    };
  })
  .controller('testIonDatePickerCtrl', function ($scope) {

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });
    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];
    var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
    var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    // 日期选择后的回调函数
    var datePickerCallbacke = function (val) {
      if (typeof (val) === 'undefined') {
      } else {
        console.log('Selected date is : ', val);
        $scope.scheduleInfo.scheduleDate = val;//更新日期。
      }
    };
    //主体对象
    $scope.datepickerObjectEnd = {
      titleLabel: '选择日期',  //可选
      todayLabel: '今天',  //可选
      closeLabel: '关闭',  //可选
      setLabel: '设置',  //可选
      setButtonType: 'button-assertive',  //可选
      todayButtonType: 'button-assertive',  //可选
      closeButtonType: 'button-assertive',  //可选
      inputDate: new Date(),  //可选，输入值
      mondayFirst: true,  //可选,星期一开头
      disabledDates: disabledDates, //可选
      weekDaysList: weekDaysList, //可选
      monthList: monthList, //可选
      templateType: 'popup', //可选i.e.的模式 modal or popup(兼容模式？)
      showTodayButton: 'true', //可选
      modalHeaderColor: 'bar-positive', //可选
      modalFooterColor: 'bar-positive', //可选
      from: new Date(2008, 8, 2), //可选
      to: new Date(2030, 8, 25),  //可选
      callback: function (val) {  //Mandatory
        datePickerCallbacke(val);
      },
      dateFormat: 'yyyy-MM-dd', //可选
      closeOnSelect: true //可选,设置选择日期后是否要关掉界面
    };
  })

  .controller('echartsCtr', function ($scope, $stateParams, $ionicLoading) {
    $ionicLoading.show()
      .then(function () {
        $ionicLoading.hide();

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'ECharts 入门示例'
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
          myChart.resize(); //使第一个图表适应
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

//                angular.element(document).ready(function () {
//
//                    var longitude = house.longitude;
//                    var latitude = house.latitude;
//                    var zoom = 16;
//
//                    var map = new BMap.Map('map-community');
//                    map.centerAndZoom(new BMap.Point(longitude, latitude), zoom);
//                    // 添加控件
//                    map.addControl(new BMap.ZoomControl());
//                    map.addControl(new BMap.ScaleControl());
//                });

      })

  });
