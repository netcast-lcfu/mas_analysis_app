var appUtil = angular.module("myApp.utils");

//存储工具类 用于保存token及常用的键值信息
appUtil.factory('StorageUtil', function () {

  //获取本地存储对象
  var storage = window.localStorage;
  //由于存储的信息都是json格式,定义json对象用于解析
  var json = window.JSON;


  function set(key, value) {
    storage.setItem(key, json.stringify(value));
  }

  function get(key) {
    var value = json.parse(storage.getItem(key));
    if (null != value) {
      return value;
    }
    return undefined;
  }

  function clear() {
    storage.clear();
  }

  function remove(key) {
    storage.removeItem(key);
  }

  return {
    set: set,
    get: get,
    clear: clear,
    remove: remove
  };
});


