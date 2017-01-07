var appService = angular.module('myApp.services');

appService.factory('UserDevelopService', function ($q, $filter, ApiService) {
  /**
   * 获取近7日用户发展信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserDevelopDayInfoEchartsData = function (userId, token, purchaseAction, adminAreaId) {
    console.log('into UserDevelopService getUserDevelopDayInfoEchartsData method...');
    return ApiService.getUserDevelopDayInfoEchartsData(userId, token, purchaseAction, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('UserDevelopService getUserDevelopDayInfoEchartsData success');
        console.log(data);
        return {
          echartData1: data.echartData1, //主机
          echartData2: data.echartData2, //副一机
          echartData3: data.echartData3, //高清
          echartData4: data.echartData4, //互动
          echartData5: data.echartData5 //宽带
        };
      } else {
        console.log('UserDevelopService getUserDevelopDayInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('UserDevelopService getUserDevelopDayInfoEchartsData error');
      return $q.reject(error);
    });
  };

  /**
   * 获取近7周用户发展信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserDevelopWeekInfoEchartsData = function (userId, token, purchaseAction, adminAreaId) {
    console.log('into UserDevelopService getUserDevelopWeekInfoEchartsData method...');
    return ApiService.getUserDevelopWeekInfoEchartsData(userId, token, purchaseAction, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('UserDevelopService getUserDevelopWeekInfoEchartsData success');
        console.log(data);
        return {
          echartData1: data.echartData1, //主机
          echartData2: data.echartData2, //副一机
          echartData3: data.echartData3, //高清
          echartData4: data.echartData4, //互动
          echartData5: data.echartData5 //宽带
        };
      } else {
        console.log('UserDevelopService getUserDevelopWeekInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('UserDevelopService getUserDevelopWeekInfoEchartsData error');
      return $q.reject(error);
    });
  };

  /**
   * 获取近7月用户发展信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserDevelopMonthInfoEchartsData = function (userId, token, purchaseAction, adminAreaId) {
    console.log('into UserDevelopService getUserDevelopMonthInfoEchartsData method...');
    return ApiService.getUserDevelopMonthInfoEchartsData(userId, token, purchaseAction, adminAreaId).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('UserDevelopService getUserDevelopMonthInfoEchartsData success');
        console.log(data);
        return {
          echartData1: data.echartData1, //主机
          echartData2: data.echartData2, //副一机
          echartData3: data.echartData3, //高清
          echartData4: data.echartData4, //互动
          echartData5: data.echartData5 //宽带
        };
      } else {
        console.log('UserDevelopService getUserDevelopMonthInfoEchartsData invalid');
        return $q.reject(data.msg);
      }
    }, function (error) {
      console.log('UserDevelopService getUserDevelopMonthInfoEchartsData error');
      return $q.reject(error);
    });
  };

  return {
    getUserDevelopDayInfoEchartsData: getUserDevelopDayInfoEchartsData,
    getUserDevelopWeekInfoEchartsData: getUserDevelopWeekInfoEchartsData,
    getUserDevelopMonthInfoEchartsData: getUserDevelopMonthInfoEchartsData
  };
});
