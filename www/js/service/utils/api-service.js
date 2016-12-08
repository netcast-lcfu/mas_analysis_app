angular.module("myApp.services")
/**
 * 通用接口
 */
  .factory('ApiService', function ($http, $q, $filter, ApiEndpoint) {
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
          if (typeof response.data === 'object') {
            console.log("api service login success");
            return response.data;
          } else {
            console.log("api service login invalid");
            // invalid response
            return $q.reject(response.data);
          }
        }, function (response) {
          console.log("api service login fail");
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
          if (typeof response.data === 'object') {
            console.log("api service loginOut success");
            return response.data;
          } else {
            console.log("api service loginOut invalid");
            // invalid response
            return $q.reject(response.data);
          }
        }, function (response) {
          console.log("api service loginOut fail");
          return $q.reject('服务器连接超时,请检查网络!');
        });
    };

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
          if (typeof response.data === 'object') {
            console.log("api service getUserInfo success");
            return response.data;
          } else {
            console.log("api service getUserInfo invalid");
            // invalid response
            return $q.reject(response.data);
          }
        }, function (response) {
          console.log("api service getUserInfo fail");
          return $q.reject('服务器连接超时,请检查网络!');
        });
    };

    return {
      login: login,
      getUserInfo: getUserInfo,
      loginOut: loginOut
    }
  });

