angular.module('myApp.services')
  .factory('UserService', function ($cordovaPreferences, $q, $filter, ApiService) {

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
    var login = function (username, password) {
      return ApiService.login(username, password)
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
              $cordovaPreferences.store('userId', loginUser.userId)
                .success(function (value) {

                })
                .error(function (error) {
                });
              $cordovaPreferences.store('token', loginUser.token)
                .success(function (value) {

                })
                .error(function (error) {
                });
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
              $cordovaPreferences.remove('userId')
                .success(function (value) {

                })
                .error(function (error) {
                });
              $cordovaPreferences.remove('token')
                .success(function (value) {

                })
                .error(function (error) {
                });
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
      var promise1 = $cordovaPreferences.fetch('userId')
        .success(function (value) {
          console.log("fetch userId");
          console.log(value);
          userId = value;
        })
        .error(function (error) {
          console.log("fetch userId error");
          console.log(error);
          return $q.reject(error);
        });
      var promise2 = $cordovaPreferences.fetch('token')
        .success(function (value) {
          console.log("fetch token");
          console.log(value);
          token = value;
        })
        .error(function (error) {
          console.log("fetch token error");
          console.log(error);
          return $q.reject(error);
        });

      return $q.all([promise1, promise2])
        .then(function () {
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
        },function (error) {
          console.log(error);
          return $q.reject(error);
        });
    };


    return {
      login: login,
      loginOut: loginOut,
      getLoginUser: getLoginUser,
      getUserInfo: getUserInfo,
      isLogin: isLogin,
      readLocalToken: readLocalToken
    }
  });
