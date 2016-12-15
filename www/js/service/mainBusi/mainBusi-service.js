angular.module('myApp.services')
  .factory('MainBusiService', function ($q, $filter, ApiService) {

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
          console.log('CashFlowService getBusiStateChangesAnalysisEcharsData success');
          console.log(data);
          return {
            xAxisData: data.category,
            legendData: data.legend,
            seriesData: data.series
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

    return {
      getBaseUserTypeToJson: getBaseUserTypeToJson,
      getAddrAdminAreaToJson: getAddrAdminAreaToJson,
      getBusiStateChangesAnalysisEcharsData: getBusiStateChangesAnalysisEcharsData
    };
  });
