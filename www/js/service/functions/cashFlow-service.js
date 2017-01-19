var appService = angular.module('myApp.services');

appService.factory('CashFlowFuncService', function ($q, $filter, ApiService) {
  /**
   * 获取当日现金流信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getTodayCashFlowInfoEchartsData = function (userId, token, adminAreaId) {
    console.log('into CashFlowFuncService getTodayCashFlowInfoEchartsData method...');
    return ApiService.getTodayCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getTodayCashFlowInfoEchartsData success');
        console.log(data);
        return {
          sumMoney: data.sumMoney,//总金额
          legends: data.legends,//缴费图例
          pieDatas: data.pieDatas //缴费饼状图数据
        };
      } else {
        console.log('CashFlowFuncService getTodayCashFlowInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getTodayCashFlowInfoEchartsData error');
      return $q.reject(err);
    });
  };

  /**
   * 查询日流量信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getDayCashFlowInfoEchartsData = function (userId, token, adminAreaId) {
    console.log('into CashFlowFuncService getDayCashFlowInfoEchartsData method...');
    return ApiService.getDayCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getDayCashFlowInfoEchartsData success');
        console.log(data);
        return {
          echartData1: data.echartData1, //营业厅
          sumMoney1: data.sumMoney1,
          echartData2: data.echartData2, //电子渠道
          sumMoney2: data.sumMoney2,
          echartData3: data.echartData3, //营销渠道
          sumMoney3: data.sumMoney3,
          echartData9: data.echartData9, //其他
          sumMoney9: data.sumMoney9
        };
      } else {
        console.log('CashFlowFuncService getDayCashFlowInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getDayCashFlowInfoEchartsData error');
      return $q.reject(err);
    });
  };

  /**
   * 查询周流量信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getWeekCashFlowInfoEchartsData = function (userId, token, adminAreaId) {
    console.log('into CashFlowFuncService getWeekCashFlowInfoEchartsData method...');
    return ApiService.getWeekCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getWeekCashFlowInfoEchartsData success');
        console.log(data);
        return {
          echartData1: data.echartData1, //营业厅
          sumMoney1: data.sumMoney1,
          echartData2: data.echartData2, //电子渠道
          sumMoney2: data.sumMoney2,
          echartData3: data.echartData3, //营销渠道
          sumMoney3: data.sumMoney3,
          echartData9: data.echartData9, //其他
          sumMoney9: data.sumMoney9
        };
      } else {
        console.log('CashFlowFuncService getWeekCashFlowInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getWeekCashFlowInfoEchartsData error');
      return $q.reject(err);
    });
  };

  /**
   * 查询月现金流信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getMonthCashFlowInfoEchartsData = function (userId, token, adminAreaId) {
    console.log('into CashFlowFuncService getMonthCashFlowInfoEchartsData method...');
    return ApiService.getMonthCashFlowInfoEchartsData(userId, token, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowFuncService getMonthCashFlowInfoEchartsData success');
        console.log(data);
        return {
          echartData1: data.echartData1, //营业厅
          sumMoney1: data.sumMoney1,
          echartData2: data.echartData2, //电子渠道
          sumMoney2: data.sumMoney2,
          echartData3: data.echartData3, //营销渠道
          sumMoney3: data.sumMoney3,
          echartData9: data.echartData9, //其他
          sumMoney9: data.sumMoney9
        };
      } else {
        console.log('CashFlowFuncService getMonthCashFlowInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowFuncService getMonthCashFlowInfoEchartsData error');
      return $q.reject(err);
    });
  };

  return {
    getTodayCashFlowInfoEchartsData: getTodayCashFlowInfoEchartsData,
    getDayCashFlowInfoEchartsData: getDayCashFlowInfoEchartsData,
    getWeekCashFlowInfoEchartsData: getWeekCashFlowInfoEchartsData,
    getMonthCashFlowInfoEchartsData: getMonthCashFlowInfoEchartsData
  };
});
