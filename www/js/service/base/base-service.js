var appService = angular.module('myApp.services');

appService.factory('BaseService', function ($q, $filter, ApiService) {

  /**
   * 获取行政区域基础数据
   * @param userId
   * @param token
   * @returns {*}
   */
  var getBaseAdminAreaData = function (userId, token) {
    console.log('into BaseService getBaseAdminAreaData method...');
    return ApiService.getBaseAdminAreaData(userId, token).then(function (data) {
      if (Boolean(data.code) && data.code == 'success') {
        console.log('BaseService getBaseAdminAreaData success');
        console.log(data);
        return {
          adminAreaDatas:data.adminAreaDatas
        };
      } else {
        console.log('BaseService getBaseAdminAreaData invalid');
        return $q.reject(data.msg);
      }
    }, function (err) {
      console.log('BaseService getBaseAdminAreaData error');
      return $q.reject(err);
    });
  };

  return {
    getBaseAdminAreaData: getBaseAdminAreaData
  };
});
