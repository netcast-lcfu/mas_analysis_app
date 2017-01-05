var appService = angular.module('myApp.services');

appService.factory('CashFlowFuncService', function ($q, $filter, ApiService) {
  /**
   * 获取当日现金流信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getTodayCashFlowInfo = function (userId, token) {
    console.log('into CashFlowFuncService getTodayCashFlowInfo method...');
    return ApiService.getTodayCashFlowInfo(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getTodayCashFlowInfo success');
        console.log(data);
        return {
          legends: data.legends,//缴费图例
          pieDatas: data.pieDatas //缴费饼状图数据
        };
      } else {
        console.log('CashFlowFuncService getTodayCashFlowInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getTodayCashFlowInfo error');
      return $q.reject(err);
    });
  };

  /**
   * 查询日流量信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getDayCashFlowInfo = function (userId, token) {
    console.log('into CashFlowFuncService getDayCashFlowInfo method...');
    return ApiService.getDayCashFlowInfo(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getDayCashFlowInfo success');
        console.log(data);
        return {
          echartData1: data.echartData1, //营业厅
          echartData2: data.echartData2, //代收代扣
          echartData9: data.echartData9 //其他
        };
      } else {
        console.log('CashFlowFuncService getDayCashFlowInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getDayCashFlowInfo error');
      return $q.reject(err);
    });
  };

  /**
   * 查询周流量信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getWeekCashFlowInfo = function (userId, token) {
    console.log('into CashFlowFuncService getWeekCashFlowInfo method...');
    return ApiService.getWeekCashFlowInfo(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getWeekCashFlowInfo success');
        console.log(data);
        return {
          echartData1: data.echartData1, //营业厅
          echartData2: data.echartData2, //代收代扣
          echartData9: data.echartData9 //其他
        };
      } else {
        console.log('CashFlowFuncService getWeekCashFlowInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getWeekCashFlowInfo error');
      return $q.reject(err);
    });
  };

  /**
   * 查询月现金流信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getMonthCashFlowInfo = function (userId, token) {
    console.log('into CashFlowFuncService getMonthCashFlowInfo method...');
    return ApiService.getMonthCashFlowInfo(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getMonthCashFlowInfo success');
        console.log(data);
        return {
          echartData1: data.echartData1, //营业厅
          echartData2: data.echartData2, //代收代扣
          echartData9: data.echartData9 //其他
        };
      } else {
        console.log('CashFlowFuncService getMonthCashFlowInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getMonthCashFlowInfo error');
      return $q.reject(err);
    });
  };

  return {
    getTodayCashFlowInfo: getTodayCashFlowInfo,
    getDayCashFlowInfo: getDayCashFlowInfo,
    getWeekCashFlowInfo: getWeekCashFlowInfo,
    getMonthCashFlowInfo: getMonthCashFlowInfo
  };
});
