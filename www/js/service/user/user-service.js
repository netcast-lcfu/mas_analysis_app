var appService = angular.module('myApp.services');

//用户
appService.factory('UserService', function ($q, $filter, ApiService, StorageUtil) {

  var loginUser = {
    // token:'',
    // userId:'',
    // account:'',
    // userName:'',
    // sex:'',
    // officePhone:'',
    // mobilPhone:'',
    // email:''
  };

  /**
   * 登录
   * @param username
   * @param password
   */
  var login = function (username, password, deviceId) {
    return ApiService.login(username, password, deviceId)
      .then(function (data) {
          if (!Boolean(data.token)) {
            return $q.reject(data.msg);
          } else {
            //登录成功
            loginUser = {
              token: data.token,
              userId: data.user.userId,
              account: data.user.account,
              userName: data.user.userName,
              sex: data.user.sex,
              officePhone: data.user.officePhone,
              mobilPhone: data.user.mobilPhone,
              email: data.user.email
            };

            //将凭据保存到本地
            StorageUtil.set("userId", loginUser.userId);
            StorageUtil.set("token", loginUser.token);
          }
        }, function (err) {
          return $q.reject(err);
        }
      );
  };

  /**
   * 注销
   */
  var loginOut = function () {
    console.log("into userService loginOut method...");
    return ApiService.loginOut(loginUser.userId)
      .then(function (data) {
          if (!Boolean(data.code) || data.code == "fail") {
            console.log("loginOut fail...");
            return $q.reject(data.msg);
          } else {
            console.log("loginOut success...");
            //注销成功 清空用户信息
            loginUser = {};
            //移除本地的凭据
            StorageUtil.remove("userId");
            StorageUtil.remove("token");
            return data;
          }
        }, function (err) {
          return $q.reject(err);
        }
      );
  };

  /**
   * 获取登录用户
   * @returns {{userId: string, account: string, password: string, userName: string, sex: string, officePhone: string, userId: string, mobilPhone: string, email: string, createDate: string}}
   */
  var getLoginUser = function () {
    return loginUser;
  };

  /**
   * 查询用户信息
   * @param userId
   * @param token
   * @returns {*}
   */
  var getUserInfo = function (userId, token) {
    return ApiService.getUserInfo(userId, token)
      .then(function (data) {
          if (!Boolean(data.token)) {
            return $q.reject(data.msg);
          } else {
            //获取用户信息成功
            return {
              token: data.token,
              userId: data.user.userId,
              account: data.user.account,
              userName: data.user.userName,
              sex: data.user.sex,
              officePhone: data.user.officePhone,
              mobilPhone: data.user.mobilPhone,
              email: data.user.email
            };
          }
        }, function (err) {
          return $q.reject(err);
        }
      );
  };

  /**
   * 修改密码
   * @param userId
   * @param token
   * @returns {*}
   */
  var modifyPassword = function (userId, token, oldPassword, password) {
    return ApiService.modifyPassword(userId, token, oldPassword, password)
      .then(function (data) {
          if (!Boolean(data.code) || data.code == "fail") {
            return $q.reject(data.msg);
          } else {
            //修改密码成功
            return {
              msg: data.msg
            };
          }
        }, function (err) {
          return $q.reject(err);
        }
      );
  };

  /**
   * 获取最新版本号
   * @param userId
   * @param token
   * @returns {*}
   */
  var getAppLastestVersionNo = function (userId, token, currentVersionNo) {
    return ApiService.getAppLastestVersionNo(userId, token, currentVersionNo)
      .then(function (data) {
          if (!Boolean(data.code) || data.code == "fail") {
            return $q.reject(data.msg);
          } else {
            //获取最新版本号成功
            return {
              lastestVersionNo: data.lastestVersionNo
            };
          }
        }, function (err) {
          return $q.reject(err);
        }
      );
  };

  /**
   * 判断是否登录
   * @returns {boolean}
   */
  var isLogin = function () {
    return Boolean(loginUser.token);
  };

  //读取本地Token实现免登陆
  var readLocalToken = function () {
    console.log("into userService readLocalToken method...");
    var userId = '';
    var token = '';

    userId = StorageUtil.get("userId");
    token = StorageUtil.get("token");

    console.log("readLocalToken success...");
    //从服务器获取最新的数据,判断凭据是否过期
    return getUserInfo(userId, token).then(function (userInfo) {
      console.log("getUserInfoByTokenFormService success...");
      loginUser = {
        token: token,
        userId: userId,
        account: userInfo.account,
        userName: userInfo.userName,
        sex: userInfo.sex,
        officePhone: userInfo.officePhone,
        mobilPhone: userInfo.mobilPhone,
        email: userInfo.email
      };
      console.log(loginUser);
    }, function (err) {
      console.log("getUserInfoByTokenFormService fail...");
      //获取凭据失败,表示未登录或者凭据过期
      return $q.reject(err);
    });

  };


  return {
    login: login,
    loginOut: loginOut,
    getLoginUser: getLoginUser,
    getUserInfo: getUserInfo,
    modifyPassword:modifyPassword,
    isLogin: isLogin,
    readLocalToken: readLocalToken,
    getAppLastestVersionNo: getAppLastestVersionNo
  }
});
