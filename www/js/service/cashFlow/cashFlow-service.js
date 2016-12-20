var appService = angular.module('myApp.services');

//现金流量分析
appService.factory('CashFlowService', function ($q, $filter, ApiService) {
  /**
   * 获取现金流量渠道分析
   * @param userId
   * @param token
   * @param startPayDate
   * @param endPayDate
   * @returns {*}
   */
  var getCashFlowInfo = function (userId, token, startPayDate, endPayDate) {
    console.log('into CashFlowService getCashFlowInfo method...');
    return ApiService.getCashFlowInfo(userId, token, startPayDate, endPayDate).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getCashFlowInfo success');
        console.log(data);
        return {
          sumMoney: data.sumMoney,
          legends: data.legends,
          pieDatas: data.pieDatas
        };
      } else {
        console.log('CashFlowService getCashFlowInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('CashFlowService getCashFlowInfo error');
      return $q.reject(err);
    });
  };

  /**
   * 获取日现金流量分析
   * @param userId
   * @param token
   * @param day
   */
  var getCashFlowDayInfo = function (userId, token, day) {
    console.log('into CashFlowService getCashFlowDayInfo method...');
    return ApiService.getCashFlowDayInfo(userId, token, day).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getCashFlowDayInfo success');
        console.log(data);
        return {
          sumMoney: data.sumMoney,
          xAxisData: data.xAxisData,
          seriesData: data.seriesData
        };
      } else {
        console.log('CashFlowService getCashFlowDayInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('CashFlowService getCashFlowDayInfo error');
      return $q.reject(error);
    });
  };

  /**
   * 获取月现金流量分析
   * @param userId
   * @param token
   * @param month
   */
  var getCashFlowMonthInfo = function (userId, token, month) {
    console.log('into CashFlowService getCashFlowMonthInfo method...');
    return ApiService.getCashFlowMonthInfo(userId, token, month).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getCashFlowMonthInfo success');
        console.log(data);
        return {
          sumMoney: data.sumMoney,
          xAxisData: data.xAxisData,
          seriesData: data.seriesData
        };
      } else {
        console.log('CashFlowService getCashFlowMonthInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('CashFlowService getCashFlowMonthInfo error');
      return $q.reject(error);
    });
  };

  /**
   * 获取年现金流量分析(按月份)
   * @param userId
   * @param token
   * @param year
   */
  var getCashFlowYearForMonthInfo = function (userId, token, year) {
    console.log('into CashFlowService getCashFlowYearForMonthInfo method...');
    return ApiService.getCashFlowYearForMonthInfo(userId, token, year).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getCashFlowYearForMonthInfo success');
        console.log(data);
        return {
          sumMoney: data.sumMoney,
          xAxisData: data.xAxisData,
          seriesData: data.seriesData
        };
      } else {
        console.log('CashFlowService getCashFlowYearForMonthInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('CashFlowService getCashFlowYearForMonthInfo error');
      return $q.reject(error);
    });
  };

  /**
   * 获取年现金流量分析(按季度)
   * @param userId
   * @param token
   * @param year
   */
  var getCashFlowYearForQuarterInfo = function (userId, token, year) {
    console.log('into CashFlowService getCashFlowYearForQuarterInfo method...');
    return ApiService.getCashFlowYearForQuarterInfo(userId, token, year).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getCashFlowYearForQuarterInfo success');
        console.log(data);
        return {
          sumMoney: data.sumMoney,
          xAxisData: data.xAxisData,
          seriesData: data.seriesData
        };
      } else {
        console.log('CashFlowService getCashFlowYearForQuarterInfo invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('CashFlowService getCashFlowYearForQuarterInfo error');
      return $q.reject(error);
    });
  };

  return {
    getCashFlowInfo: getCashFlowInfo,
    getCashFlowDayInfo: getCashFlowDayInfo,
    getCashFlowMonthInfo: getCashFlowMonthInfo,
    getCashFlowYearForMonthInfo: getCashFlowYearForMonthInfo,
    getCashFlowYearForQuarterInfo: getCashFlowYearForQuarterInfo
  };
});
