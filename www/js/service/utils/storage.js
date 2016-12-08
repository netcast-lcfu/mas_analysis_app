angular.module("myApp.utils")
  .factory('StorageUtil', function () {

    var storage = window.localStorage;
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


