var appService = angular.module('myApp.services');

//第三个选项卡列表数据
appService.factory('Chats3', function () {
  var chats = [{
    id: 0,
    icon: 'icon ion-ios-search-strong',
    name: 'KPI完成进度查询',
    url: 'tab3/queryKpiCompletedProgress'
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
