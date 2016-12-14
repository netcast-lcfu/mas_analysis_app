angular.module('myApp.services')
  .factory('CashFlowService', function ($q, $filter, ApiService) {
    /**
     * 获取现金流量分析
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
          return {
            legends: data.legends,
            pieDatas: data.pieDatas
          };
        } else {
          return $q.reject(data.msg);
        }
      }, function (err) {
        return $q.reject(err);
      });
    };

    return {
      getCashFlowInfo: getCashFlowInfo
    };
  });
