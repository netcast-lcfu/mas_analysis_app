angular.module('myApp.services')

  .factory('Chats2', function () {
    var chats = [{
      id: 0,
      icon: 'icon ion-cash',
      name: '现金流量渠道分析',
      url: 'tab2/cashFlowChannelAnalysis'
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
