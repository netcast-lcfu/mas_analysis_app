angular.module('myApp.controllers')

//主营业务状态变化分析
  .controller('mainBusiStateChangeAnalysisCtrl', function ($scope, $filter, $ionicLoading, $cordovaToast, MainBusiService, UserService) {

    // 添加返回按钮
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
    });

    //是否显示查询结果
    $scope.show_query_result = false;

    //默认开始时间半年前
    var defaultStartActiveDate = new Date();
    defaultStartActiveDate.setMonth(new Date().getMonth() - 6);

    $scope.condition = {
      baseUserType: '',
      addrAdminArea: '',
      startActiveDate: defaultStartActiveDate,
      endActiveDate: new Date()
    };

    var addrAdminAreaDatas = [{adminAreaId: 1001, adminAreaName: '马鞍山'}];
    var baseUserTypeDatas = [{userTypeId: 1, userTypeName: '正常'}];

    var userId = UserService.getLoginUser().userId;
    var token = UserService.getLoginUser().token;

    //查询行政区域下拉框数据
    MainBusiService.getAddrAdminAreaToJson(userId, token).then(function (data) {
      addrAdminAreaDatas = data.addrAdminAreas;
      $scope.addrAdminAreaData = addrAdminAreaDatas;
      $scope.condition.addrAdminArea = addrAdminAreaDatas[0];
    }, function (error) {
      $cordovaToast.showShortCenter(error);
      // $ionicLoading.show({
      //   template: error,
      //   duration: 1000
      // });
    });

    //查询用户类型下拉框数据
    MainBusiService.getBaseUserTypeToJson(userId, token).then(function (data) {
      baseUserTypeDatas = data.baseUserTypes;
      $scope.baseUserTypeData = baseUserTypeDatas;
      $scope.condition.baseUserType = baseUserTypeDatas[0];
    }, function (error) {
      $cordovaToast.showShortCenter(error);
      // $ionicLoading.show({
      //   template: error,
      //   duration: 1000
      // });
    });

    $scope.query = function () {
      if (!Boolean($scope.condition.addrAdminArea)) {
        $cordovaToast.showShortCenter('请选择行政区域!');
        // $ionicLoading.show({
        //   template: '请选择行政区域!',
        //   duration: 1000
        // });
        return;
      }
      if (!Boolean($scope.condition.baseUserType)) {
        $cordovaToast.showShortCenter('请选择用户类型!');
        // $ionicLoading.show({
        //   template: '请选择用户类型!',
        //   duration: 1000
        // });
        return;
      }
      if (!Boolean($scope.condition.startActiveDate)) {
        $cordovaToast.showShortCenter('请选择开始月份!');
        // $ionicLoading.show({
        //   template: '请选择开始月份!',
        //   duration: 1000
        // });
        return;
      }
      if (!Boolean($scope.condition.endActiveDate)) {
        $cordovaToast.showShortCenter('请选择结束月份!');
        // $ionicLoading.show({
        //   template: '请选择结束月份!',
        //   duration: 1000
        // });
        return;
      }
      if ($scope.condition.startActiveDate.getTime() >= $scope.condition.endActiveDate.getTime()) {
        $cordovaToast.showShortCenter('开始月份不能大于结束月份!');
        // $ionicLoading.show({
        //   template: '开始月份不能大于结束月份!',
        //   duration: 1000
        // });
        return;
      }

      //显示结果
      $scope.show_query_result = true;

      var adminAreaId = $scope.condition.addrAdminArea.adminAreaId;
      var userTypeId = $scope.condition.baseUserType.userTypeId;
      var startActiveDate = $filter('date')($scope.condition.startActiveDate, 'yyyy-MM');
      var endActiveDate = $filter('date')($scope.condition.endActiveDate, 'yyyy-MM');

      $ionicLoading.show();
      MainBusiService.getBusiStateChangesAnalysisEcharsData(userId, token, adminAreaId, startActiveDate, endActiveDate, userTypeId).then(function (data) {
        console.log('into mainBusiStateChangeAnalysisCtrl query method...');
        console.log(data);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('mainBusiChart'), 'macarons');
        // 指定图表的配置项和数据
        var option = {
          title: {      //标题组件
            text: '主要业务状态变化分析',
            x: 'center'
          },
          tooltip: {    //提示框组件
            trigger: 'axis' //触发类型 axis坐标轴 item单项
          },
          legend: {     //图例组件
            data: data.legendData,
            x: 'center',
            y: 'bottom',
            orient: 'horizontal' //布局走向 vertical 垂直 horizontal水平
          },
          grid: {       //直角坐标系内绘图网格
            left: '2%',
            right: '40px',
            bottom: '120px',
            containLabel: true
          },
          toolbox: {     //工具栏
            show: false,
            feature: {
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          xAxis: {       //直角坐标系 grid 中的 x 轴
            type: 'category',
            name: '月份',
            boundaryGap: false,
            data: data.xAxisData
          },
          yAxis: {       //直角坐标系 grid 中的 y 轴
            type: 'value',
            name: '人数',
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value}人'
            }
          },
          series: data.seriesData
        };
        window.onresize = function () {
          myChart.resize(); //使图表适应屏幕
        };
        myChart.setOption(option);
        $ionicLoading.hide();
      }, function (error) {
        $ionicLoading.hide();
        $cordovaToast.showShortCenter(error);
        // $ionicLoading.show({
        //   template: error,
        //   duration: 1000
        // });
      });
    };

    $scope.resetData = function () {
      $scope.condition.addrAdminArea = addrAdminAreaDatas[0];
      $scope.condition.baseUserType = baseUserTypeDatas[0];
      $scope.condition.startActiveDate = defaultStartActiveDate;
      $scope.condition.endActiveDate = new Date();
    };


  });
