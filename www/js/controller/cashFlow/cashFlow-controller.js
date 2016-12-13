angular.module('myApp.controllers')

//现金流量渠道分析
  .controller('cashFlowChannelAnalysisCtrl', function ($scope, $ionicLoading, $cordovaToast, UserService, KpiService,ApiEndpoint) {
    $scope.condition = {
      area: '',
      year: '',
      period: ''
    };

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    var adminAreaDatas = [{areaId: '1001', areaName: '马鞍山'}, {areaId: '001', areaName: '当涂'}];
    var yearDatas = ['2016', '2012'];
    var periodDatas = [{periodId: 1, periodName: '1月'}, {periodId: 2, periodId: '2月'}, {
      periodId: 3,
      periodName: '3月'
    }, {periodId: 4, periodName: '4月'}, {
      periodId: 5,
      periodName: '5月'
    }, {periodId: 6, periodName: '6月'}, {periodId: 7, periodName: '7月'}, {periodId: 8, periodName: '8月'}, {
      periodId: 9,
      periodName: '9月'
    }, {periodId: 10, periodName: '10月'}, {
      periodId: 11,
      periodName: '11月'
    }, {periodId: 12, periodName: '12月'}];

    //后台token验证
    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;

    KpiService.getKpiCompletedProgressCondition(userId, token).then(function (data) {
      adminAreaDatas = data.adminAreaDatas;
      yearDatas = data.yearDatas;
      periodDatas = data.periodDatas;

      //行政区域数据
      $scope.adminAreaData = adminAreaDatas;
      $scope.condition.area = adminAreaDatas[0];

      //年份数据
      $scope.yearData = yearDatas;
      $scope.condition.year = yearDatas[0];

      //月份数据(时段)
      $scope.periodData = periodDatas;
      $scope.condition.period = periodDatas[0];
    }, function (err) {
      console.log(err);
      // $ionicLoading.show({
      //   template: '查询条件数据初始化失败!',
      //   duration: 1000
      // });
      $cordovaToast.showShortCenter('查询条件数据初始化失败!');
    });

    //查询按钮
    $scope.query = function () {
      console.log("into query kpi data...");
      console.log($scope.condition);

      var userId = UserService.getLoginUser().userId;
      var token = UserService.getLoginUser().token;

      var areaId = $scope.condition.area.areaId;
      var year = $scope.condition.year;
      var periodId = $scope.condition.period.periodId;

      KpiService.getKPICompletedProgress(userId,token, areaId, year, periodId).then(function (data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'),'macarons');
        // 指定图表的配置项和数据

        myChart.showLoading({
          text: '正在努力加载中...'
        });

        var actionUrl = ApiEndpoint.url + '/appKPIAction.do';

        var option = {
          title: {
            show:false,
            text: 'KPI完成进度',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
              var res = params[0].name;
              var busiSubName = params[0].name;

              var params = {
                "method": "getMonthCompletedProgressItemDetail",
                "areaId": areaId,
                "year":year,
                "periodId": periodId,
                "busiSubName": busiSubName
              };
              $.ajax({
                type: "POST",
                url: actionUrl,
                data: params,
                async: false,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (msg) {
                  if (msg != 'fail') {
                    res += '</br>月计划指标量：' + msg.planMount;
                    res += '</br>月实际完成量：' + msg.actMount;
                  } else {
                    // $ionicLoading.show({
                    //   template: '服务器未响应,请稍后再试！',
                    //   duration: 1000
                    // });
                    $cordovaToast.showShortCenter('服务器未响应,请稍后再试！');
                  }
                }, error: function (msg) {
                  // $ionicLoading.show({
                  //   template: '服务器拒绝访问,ajax调用失败!',
                  //   duration: 1000
                  // });
                  $cordovaToast.showShortCenter('服务器拒绝访问,ajax调用失败!');
                }
              });

              var params = {
                "method": "getYearCompletedProgressItemDetail",
                "areaId": areaId,
                "year":year,
                "busiSubName": busiSubName
              };
              $.ajax({
                type: "POST",
                url: actionUrl,
                data: params,
                async: false,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (msg) {
                  if (msg != 'fail') {
                    res += '</br>年计划指标量：' + msg.planMount;
                    res += '</br>年实际完成量：' + msg.actMount;
                  } else {
                    // $ionicLoading.show({
                    //   template: '服务器未响应,请稍后再试！',
                    //   duration: 1000
                    // });
                    $cordovaToast.showShortCenter('服务器未响应,请稍后再试！');
                  }
                }, error: function (msg) {
                  // $ionicLoading.show({
                  //   template: '服务器拒绝访问,ajax调用失败!',
                  //   duration: 1000
                  // });
                  $cordovaToast.showShortCenter('服务器拒绝访问,ajax调用失败!');
                }
              });

              setTimeout(function () {
                callback(ticket, res);// 仅为了模拟异步回调
              }, 500);
              return 'loading...';
            },
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {     //工具栏
            show: false,
            feature: {
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['月完成进度', '年完成进度'],
            x: 'right',
            orient:'vertical' //布局走向 vertical 垂直 horizontal水平
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              name: '业务指标',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter:function(val){
                  return val.split("").join("\n");
                }
              },
              data: data.xAxisData
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '完成百分比',
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name: '月完成进度',
              type: 'bar',
              data: data.seriesMonthData
            },
            {
              name: '年完成进度',
              type: 'bar',
              data: data.seriesYearData
            }
          ]
        };

        window.onresize = function () {
          myChart.resize(); //使图表适应屏幕
        };

        //设置数据项样式
        for(var i = 0;i<option.series.length;i++){
          option.series[i].itemStyle = {
            normal:{
              color:function(params){
                if(params.data <= 50){
                  return 'red';
                }else if(params.data > 50 && params.data < 100){
                  return 'yellow';
                }else{
                  return 'green';
                }
              },label:{show:false,position:'top',formatter:'{c}%'}
            }
          };
        }

        myChart.setOption(option);
        myChart.hideLoading();
      }, function (err) {
        // $ionicLoading.show({
        //   template: err,
        //   duration: 1000
        // });
        $cordovaToast.showShortCenter(err);
      });
    };

    //重置按钮
    $scope.restData = function () {
      $scope.condition.area = adminAreaDatas[0];
      $scope.condition.year = yearDatas[0];
      $scope.condition.period = periodDatas[0];
    };

  });
