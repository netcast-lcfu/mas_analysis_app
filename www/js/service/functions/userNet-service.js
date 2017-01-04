var appService = angular.module('myApp.services');

appService.factory('UserNetService', function ($q, $filter, ApiService) {


  /**
   * 获取近7日用户净增信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserNetDayInfoEchartsData = function (userId, token) {
    console.log('into UserNetService getUserNetDayInfoEchartsData method...');
    return ApiService.getUserNetDayInfoEchartsData(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('UserNetService getUserNetDayInfoEchartsData success');
        console.log(data);
        return {
          echartData1:data.echartData1,
          echartData2:data.echartData2,
          echartData3:data.echartData3,
          echartData4:data.echartData4,
          echartData5:data.echartData5
        };
      } else {
        console.log('UserNetService getUserNetDayInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('UserNetService getUserNetDayInfoEchartsData error');
      return $q.reject(error);
    });
  };

  /**
   * 获取近7周用户净增信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserNetWeekInfoEchartsData = function (userId, token) {
    console.log('into UserNetService getUserNetWeekInfoEchartsData method...');
    return ApiService.getUserNetWeekInfoEchartsData(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('UserNetService getUserNetWeekInfoEchartsData success');
        console.log(data);
        return {
          echartData1:data.echartData1,
          echartData2:data.echartData2,
          echartData3:data.echartData3,
          echartData4:data.echartData4,
          echartData5:data.echartData5
        };
      } else {
        console.log('UserNetService getUserNetWeekInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('UserNetService getUserNetWeekInfoEchartsData error');
      return $q.reject(error);
    });
  };

  /**
   * 获取近7月用户净增信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserNetMonthInfoEchartsData = function (userId, token) {
    console.log('into UserNetService getUserNetMonthInfoEchartsData method...');
    return ApiService.getUserNetWeekInfoEchartsData(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('UserNetService getUserNetMonthInfoEchartsData success');
        console.log(data);
        return {
          echartData1:data.echartData1,
          echartData2:data.echartData2,
          echartData3:data.echartData3,
          echartData4:data.echartData4,
          echartData5:data.echartData5
        };
      } else {
        console.log('UserNetService getUserNetMonthInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('UserNetService getUserNetMonthInfoEchartsData error');
      return $q.reject(error);
    });
  };

  return {
    getUserNetDayInfoEchartsData:getUserNetDayInfoEchartsData,
    getUserNetWeekInfoEchartsData:getUserNetWeekInfoEchartsData,
    getUserNetMonthInfoEchartsData:getUserNetMonthInfoEchartsData
  };
});
