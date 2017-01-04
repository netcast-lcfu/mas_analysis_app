var appService = angular.module("myApp.services");
/**
 * 通用API接口
 */
appService.factory('ApiService', function ($http, $q, $filter, ApiEndpoint) {
  /**
   * 登录
   * @param username
   * @param password
   */
  var login = function (username, password) {
    console.log("into api service login method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appAction.do?method=loginForApp',
      params: {
        username: username,
        password: password
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service login success");
          return response.data;
        } else {
          console.log("api service login invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service login error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 注销
   * @param userId
   * @returns {*}
   */
  var loginOut = function (userId) {
    console.log("into api service loginOut method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appAction.do?method=loginOutForApp',
      params: {
        userId: userId
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service loginOut success");
          return response.data;
        } else {
          console.log("api service loginOut invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service loginOut error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   *  获取用户信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserInfo = function (userId, token) {
    console.log("into api service getUserInfo method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appAction.do?method=getAppUserInfo',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getUserInfo success");
          return response.data;
        } else {
          console.log("api service getUserInfo invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getUserInfo error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  //获取KPI完成进度查询条件
  var getKpiCompletedProgressCondition = function (userId, token) {
    console.log("into api service getKpiCompletedProgressCondition method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appKPIAction.do?method=getKpiCompletedProgressCondition',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getKpiCompletedProgressCondition success");
          return response.data;
        } else {
          console.log("api service getKpiCompletedProgressCondition invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getKpiCompletedProgressCondition error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  //获取KPI完成进度查询
  var getKPICompletedProgress = function (userId, token, areaId, year, periodId) {
    console.log("into api service getKPICompletedProgress method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appKPIAction.do?method=getKPICompletedProgress',
      params: {
        userId: userId,
        token: token,
        areaId: areaId,
        year: year,
        periodId: periodId
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getKPICompletedProgress success");
          return response.data;
        } else {
          console.log("api service getKPICompletedProgress invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getKPICompletedProgress error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取现金流量分析数据
   * @param userId
   * @param token
   * @param startPayDate
   * @param endPayDate
   * @returns {*}
   */
  var getCashFlowInfo = function (userId, token, startPayDate, endPayDate) {
    console.log("into api service getCashFlowInfo method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appCashFlowAction.do?method=getCashFlowChannelsInfo',
      params: {
        userId: userId,
        token: token,
        startPayDate: startPayDate,
        endPayDate: endPayDate
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getCashFlowInfo success");
          return response.data;
        } else {
          console.log("api service getCashFlowInfo invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getCashFlowInfo error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取基本用户类型
   * @param userId
   * @param token
   * @returns {*}
   */
  var getBaseUserTypeToJson = function (userId, token) {
    console.log("into api service getBaseUserTypeToJson method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appMainBusiAction.do?method=getBaseUserTypeToJson',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getBaseUserTypeToJson success");
          return response.data;
        } else {
          console.log("api service getBaseUserTypeToJson invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getBaseUserTypeToJson error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取业务类型
   * @param userId
   * @param token
   * @returns {*}
   */
  var getBusiTypeToJson = function (userId, token) {
    console.log("into api service getBusiTypeToJson method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appMainBusiAction.do?method=getBusiTypeToJson',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getBusiTypeToJson success");
          return response.data;
        } else {
          console.log("api service getBusiTypeToJson invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getBusiTypeToJson error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取业务状态
   * @param userId
   * @param token
   * @returns {*}
   */
  var getBusiStatusToJson = function (userId, token) {
    console.log("into api service getBusiStatusToJson method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appMainBusiAction.do?method=getBusiStatusToJson',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getBusiStatusToJson success");
          return response.data;
        } else {
          console.log("api service getBusiStatusToJson invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getBusiStatusToJson error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取行政区域
   * @param userId
   * @param token
   * @returns {*}
   */
  var getAddrAdminAreaToJson = function (userId, token) {
    console.log("into api service getAddrAdminAreaToJson method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appMainBusiAction.do?method=getAddrAdminAreaToJson',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getAddrAdminAreaToJson success");
          return response.data;
        } else {
          console.log("api service getAddrAdminAreaToJson invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getAddrAdminAreaToJson error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取业务状态变化Echarts数据
   * @param userId
   * @param token
   * @param adminAreaId
   * @param startActiveMonth
   * @param endActiveMonth
   * @param userTypeId
   * @returns {*}
   */
  var getBusiStateChangesAnalysisEcharsData = function (userId, token, adminAreaId, startActiveMonth, endActiveMonth, userTypeId) {
    console.log("into api service getBusiStateChangesAnalysisEcharsData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appMainBusiAction.do?method=getBusiStateChangesAnalysisEcharsData',
      params: {
        userId: userId,
        token: token,
        adminAreaId: adminAreaId,
        startActiveMonth: startActiveMonth,
        endActiveMonth: endActiveMonth,
        userTypeId: userTypeId
      },
      // /timeout: ApiEndpoint.timeout
      //访问数据量较大
      timeout: 26000
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getBusiStateChangesAnalysisEcharsData success");
          return response.data;
        } else {
          console.log("api service getBusiStateChangesAnalysisEcharsData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getBusiStateChangesAnalysisEcharsData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取用户运营情况数据
   * @param userId
   * @param token
   * @param day
   * @returns {*}
   */
  var getOperationDayAnalysisEcharsData = function (userId, token, day) {
    console.log("into api service getOperationDayAnalysisEcharsData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appMainBusiAction.do?method=getOperationDayAnalysisEcharsData',
      params: {
        userId: userId,
        token: token,
        day :day
      },
      // /timeout: ApiEndpoint.timeout
      //访问数据量较大
      timeout: 26000
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getOperationDayAnalysisEcharsData success");
          return response.data;
        } else {
          console.log("api service getOperationDayAnalysisEcharsData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getOperationDayAnalysisEcharsData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取现金流量日分析数据
   * @param userId
   * @param token
   * @param day
   * @returns {*}
   */
  var getCashFlowDayInfo = function (userId, token, day) {
    console.log("into api service getCashFlowDayInfo method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appCashFlowAction.do?method=getCashFlowDayInfo',
      params: {
        userId: userId,
        token: token,
        day: day
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getCashFlowDayInfo success");
          return response.data;
        } else {
          console.log("api service getCashFlowDayInfo invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getCashFlowDayInfo error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取现金流量月分析数据
   * @param userId
   * @param token
   * @param month
   * @returns {*}
   */
  var getCashFlowMonthInfo = function (userId, token, month) {
    console.log("into api service getCashFlowMonthInfo method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appCashFlowAction.do?method=getCashFlowMonthInfo',
      params: {
        userId: userId,
        token: token,
        month: month
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getCashFlowMonthInfo success");
          return response.data;
        } else {
          console.log("api service getCashFlowMonthInfo invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getCashFlowMonthInfo error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取现金流量年分析数据 (按月份)
   * @param userId
   * @param token
   * @param year
   * @returns {*}
   */
  var getCashFlowYearForMonthInfo = function (userId, token, year) {
    console.log("into api service getCashFlowYearForMonthInfo method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appCashFlowAction.do?method=getCashFlowYearForMonthInfo',
      params: {
        userId: userId,
        token: token,
        year: year
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getCashFlowYearForMonthInfo success");
          return response.data;
        } else {
          console.log("api service getCashFlowYearForMonthInfo invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getCashFlowYearForMonthInfo error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取现金流量年分析数据(按季度)
   * @param userId
   * @param token
   * @param year
   * @returns {*}
   */
  var getCashFlowYearForQuarterInfo = function (userId, token, year) {
    console.log("into api service getCashFlowYearForQuarterInfo method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appCashFlowAction.do?method=getCashFlowYearForQuarterInfo',
      params: {
        userId: userId,
        token: token,
        year: year
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getCashFlowYearForQuarterInfo success");
          return response.data;
        } else {
          console.log("api service getCashFlowYearForQuarterInfo invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getCashFlowYearForQuarterInfo error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取近7日用户净增信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserNetDayInfoEchartsData = function (userId, token) {
    console.log("into api service getUserNetDayInfoEchartsData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appUserNetAction.do?method=getUserNetDayInfoEchartsData',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getUserNetDayInfoEchartsData success");
          return response.data;
        } else {
          console.log("api service getUserNetDayInfoEchartsData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getUserNetDayInfoEchartsData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取近7周用户净增信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserNetWeekInfoEchartsData = function (userId, token) {
    console.log("into api service getUserNetWeekInfoEchartsData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appUserNetAction.do?method=getUserNetWeekInfoEchartsData',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getUserNetWeekInfoEchartsData success");
          return response.data;
        } else {
          console.log("api service getUserNetWeekInfoEchartsData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getUserNetWeekInfoEchartsData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  /**
   * 获取近7月用户净增信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserNetMonthInfoEchartsData = function (userId, token) {
    console.log("into api service getUserNetMonthInfoEchartsData method...");
    var req = {
      method: 'post',
      url: ApiEndpoint.url + '/appUserNetAction.do?method=getUserNetMonthInfoEchartsData',
      params: {
        userId: userId,
        token: token
      },
      timeout: ApiEndpoint.timeout
    };

    return $http.post(req.url, null, req)
      .then(function (response) {
        console.log(response);
        if (typeof response.data === 'object') {
          console.log("api service getUserNetMonthInfoEchartsData success");
          return response.data;
        } else {
          console.log("api service getUserNetMonthInfoEchartsData invalid");
          // invalid response
          return $q.reject(response.data);
        }
      }, function (error) {
        console.log("api service getUserNetMonthInfoEchartsData error");
        console.log(error);
        return $q.reject('服务器连接超时,请检查网络!');
      });
  };

  return {
    login: login,
    getUserInfo: getUserInfo,
    loginOut: loginOut,
    getKpiCompletedProgressCondition: getKpiCompletedProgressCondition,
    getKPICompletedProgress: getKPICompletedProgress,
    getCashFlowInfo: getCashFlowInfo,
    getBaseUserTypeToJson: getBaseUserTypeToJson,
    getBusiTypeToJson: getBusiTypeToJson,
    getBusiStatusToJson: getBusiStatusToJson,
    getAddrAdminAreaToJson: getAddrAdminAreaToJson,
    getBusiStateChangesAnalysisEcharsData: getBusiStateChangesAnalysisEcharsData,
    getOperationDayAnalysisEcharsData:getOperationDayAnalysisEcharsData,
    getCashFlowDayInfo: getCashFlowDayInfo,
    getCashFlowMonthInfo: getCashFlowMonthInfo,
    getCashFlowYearForMonthInfo: getCashFlowYearForMonthInfo,
    getCashFlowYearForQuarterInfo: getCashFlowYearForQuarterInfo,
    getUserNetDayInfoEchartsData:getUserNetDayInfoEchartsData,
    getUserNetWeekInfoEchartsData:getUserNetWeekInfoEchartsData,
    getUserNetMonthInfoEchartsData:getUserNetMonthInfoEchartsData
  }
});

