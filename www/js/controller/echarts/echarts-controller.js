angular.module('myApp.controllers')

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
