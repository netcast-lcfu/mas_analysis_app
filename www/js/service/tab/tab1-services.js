angular.module('myApp.services')

  .factory('Chats', function () {
    var chats = [{
      id: 0,
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
