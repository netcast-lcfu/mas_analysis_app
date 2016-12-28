var appService = angular.module('myApp.services');

//第一个选项卡列表数据
appService.factory('Chats', function () {
  var chats = [{
    id: 0,
    icon: 'icon ion-android-stopwatch',
    name: '每日运营报表',
    url: 'tab1/operationDayAnalysis'
  }, {
    id: 1,
    icon: 'icon ion-ios-analytics',
    name: '主营业务状态变化分析',
    url: 'tab1/mainBusiStateChangeAnalysis'
  }];

  return {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
