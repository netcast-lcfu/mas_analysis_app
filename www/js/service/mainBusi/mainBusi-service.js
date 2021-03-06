var appService = angular.module('myApp.services');

//主营业务变化分析
appService.factory('MainBusiService', function ($q, $filter, ApiService) {

  /**
   * 获取基本用户类型
   * @param userId
   * @param token
   * @returns {*}
   */
  var getBaseUserTypeToJson = function (userId, token) {
    console.log('into MainBusiService getBaseUserTypeToJson method...');
    return ApiService.getBaseUserTypeToJson(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getBaseUserTypeToJson success');
        console.log(data);
        return {
          baseUserTypes: data.baseUserTypes
        };
      } else {
        console.log('MainBusiService getBaseUserTypeToJson invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('MainBusiService getBaseUserTypeToJson error');
      return $q.reject(err);
    });
  };

  /**
   * 获取行政区域类型
   * @param userId
   * @param token
   * @returns {*}
   */
  var getAddrAdminAreaToJson = function (userId, token) {
    console.log('into MainBusiService getAddrAdminAreaToJson method...');
    return ApiService.getAddrAdminAreaToJson(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('CashFlowService getAddrAdminAreaToJson success');
        console.log(data);
        return {
          addrAdminAreas: data.addrAdminAreas
        };
      } else {
        console.log('MainBusiService getAddrAdminAreaToJson invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('MainBusiService getAddrAdminAreaToJson error');
      return $q.reject(err);
    });
  };

  /**
   * 获取业务状态变化分析数据
   * @param userId
   * @param token
   * @returns {*}
   */
  var getBusiStateChangesAnalysisEcharsData = function (userId, token, adminAreaId, startActiveMonth, endActiveMonth, userTypeId) {
    console.log('into MainBusiService getBusiStateChangesAnalysisEcharsData method...');
    return ApiService.getBusiStateChangesAnalysisEcharsData(userId, token, adminAreaId, startActiveMonth, endActiveMonth, userTypeId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('MainBusiService getBusiStateChangesAnalysisEcharsData success');
        console.log(data);
        return {
          xAxisData: data.echartData.category,
          legendData: data.echartData.legend,
          seriesData: data.echartData.series
        };
      } else {
        console.log('MainBusiService getBusiStateChangesAnalysisEcharsData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('MainBusiService getBusiStateChangesAnalysisEcharsData error');
      return $q.reject(err);
    });
  };

  /**
   * 获取用户运营报表数据
   * @param userId
   * @param token
   * @returns {*}
   */
  var getOperationDayAnalysisEcharsData = function (userId, token, day) {
    console.log('into MainBusiService getOperationDayAnalysisEcharsData method...');
    return ApiService.getOperationDayAnalysisEcharsData(userId, token, day).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('MainBusiService getOperationDayAnalysisEcharsData success');
        console.log(data);
        return {
          xAxisData: data.echartData.category,
          legendData: data.echartData.legend,
          seriesData: data.echartData.series
        };
      } else {
        console.log('MainBusiService getOperationDayAnalysisEcharsData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('MainBusiService getOperationDayAnalysisEcharsData error');
      return $q.reject(err);
    });
  };


  return {
    getBaseUserTypeToJson: getBaseUserTypeToJson,
    getAddrAdminAreaToJson: getAddrAdminAreaToJson,
    getBusiStateChangesAnalysisEcharsData: getBusiStateChangesAnalysisEcharsData,
    getOperationDayAnalysisEcharsData:getOperationDayAnalysisEcharsData
  };
});
