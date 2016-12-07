angular.module('myApp.controllers')

  .controller('loginController', function($scope, $state, $ionicPopup, $ionicLoading,UserService,$cordovaToast) {
    $scope.title='loginController';

    $scope.user= {};
    $scope.login = function () {
      console.log("username is " + $scope.user.username);
      console.log("password is " + $scope.user.password);
      if(!Boolean($scope.user.username)){
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
      }else if(!Boolean($scope.user.password)){
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
      }else{
        $ionicLoading.show();
        UserService.login($scope.user.username,$scope.user.password).then(function () {
          //登录成功
          $ionicLoading.hide();
          $cordovaToast.showShortBottom("登录成功!");
          $state.go("tab.tab1");
        },function (err) {
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

  .controller('tab1Controller', function($scope,Chats) {

          $scope.title='tab1Controller';

          $scope.chats = Chats.all();
          $scope.remove = function(chat) {
              Chats.remove(chat);
          };

   })
    .controller('tab2Controller', function($scope,Chats2) {

        $scope.title='tab2Controller';

        $scope.chats = Chats2.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })
    .controller('tab3Controller', function($scope,Chats3) {

        $scope.title='tab3Controller';
        $scope.chats = Chats3.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })

    .controller('content1Controller', function($scope,$stateParams) {
        $scope.title='content1Controller';
        console.log($stateParams);

    })

    .controller('showBusiInfoCtrl', function($scope,$stateParams) {
      $scope.showBusiMap = function () {
        window.open('http://10.1.1.15:8080/yunwei/researchBusinessAction!viewListForPhone.action', '_blank','location=yes');
      };
    })

    .controller('showSectorAreaInfoCtrl', function($scope,$stateParams) {
      $scope.viewBusi = function () {
        window.open('http://10.1.1.15:8080/yunwei/sectorAreaAction!viewListForPhone.action', '_blank','location=yes');
      };
    })

    .controller('queryKnowledgeLibCtrl', function($scope,$stateParams) {
      $scope.queryKnowledgeLib = function () {
        window.open('http://10.1.1.15:8080/yunwei/simpKnowledgebaseLuceneAction!viewListForRes.action', '_blank','location=yes');
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
                        data:['销量']
                    },
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
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
                }
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

    })
