angular.module('myApp.controllers')

//现金流量渠道分析
  .controller('cashFlowChannelAnalysisCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, UserService, CashFlowService) {

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    $scope.condition = {
      startPayDate: '',
      endPayDate: ''
    };

    $scope.query = function () {
      if(!Boolean($scope.condition.startPayDate)){
        $cordovaToast.showShortCenter('请选择开始日期!');
        return;
      }
      if(!Boolean($scope.condition.endPayDate)){
        $cordovaToast.showShortCenter('请选择结束日期!');
        return;
      }

      var startPayDate = $filter('date')($scope.condition.startPayDate, 'yyyy-MM-dd H:mm:ss');
      var endPayDate = $filter('date')($scope.condition.endPayDate, 'yyyy-MM-dd H:mm:ss');

      var userId = UserService.getLoginUser().userId;
      var token = UserService.getLoginUser().token;

      CashFlowService.getCashFlowInfo(userId, token, startPayDate, endPayDate).then(function (data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'), 'macarons');
        // 指定图表的配置项和数据

        myChart.showLoading({
          text: '正在努力加载中...'
        });

        var option = {
          title: {
            show:false,
            text: '现金流量渠道占比分析',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {     //工具栏
            show: false,
            feature: {
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            orient: 'vertical',//布局走向 vertical 垂直 horizontal水平
            x: 'left',
            data: data.legends
          },
          series: [
            {
              name: '缴费渠道占比',
              type: 'pie',
              radius: '90%',
              // label: {
              //   normal: {
              //     position: 'inner' //内置文本标签
              //   }
              // },
              // labelLine: {
              //   normal: {
              //     show: false     //不需要设置引导线
              //   }
              // },
              data: data.pieDatas
            }
          ]
        };
        window.onresize = function () {
          myChart.resize(); //使图表适应屏幕
        };
        myChart.setOption(option);
        myChart.hideLoading();
      }, function (err) {
        $cordovaToast.showShortCenter(err);
      });
    };

    $scope.resetData = function () {

    };

  });
