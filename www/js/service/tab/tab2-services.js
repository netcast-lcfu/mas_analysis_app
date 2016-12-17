angular.module('myApp.services')

  .factory('Chats2', function () {
    var chats = [{
      id: 0,
      icon: 'icon ion-cash',
      name: '现金流量渠道分析',
      url: 'tab2/cashFlowChannelAnalysis'
    },{
      id: 1,
      icon: 'icon ion-cash',
      name: '现金流量日分析',
      url: 'tab2/cashFlowDayAnalysis'
    },{
      id: 2,
      icon: 'icon ion-cash',
      name: '现金流量月分析',
      url: 'tab2/cashFlowMonthAnalysis'
    },{
      id: 3,
      icon: 'icon ion-cash',
      name: '现金流量年分析',
      url: 'tab2/cashFlowYearAnalysis'
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
