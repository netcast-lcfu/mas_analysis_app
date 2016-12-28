var appService = angular.module('myApp.services');

//第二个选项卡列表数据
appService.factory('Chats2', function () {
  var chats = [{
    id: 1,
    icon: 'icon ion-ios-clock-outline',
    name: '日收入分析',
    url: 'tab2/cashFlowDayAnalysis'
  }, {
    id: 2,
    icon: 'icon ion-ios-calendar-outline',
    name: '月收入分析',
    url: 'tab2/cashFlowMonthAnalysis'
  }, {
    id: 3,
    icon: 'icon ion-ios-speedometer-outline',
    name: '年收入分析',
    url: 'tab2/cashFlowYearAnalysis'
  }, {
    id: 4,
    icon: 'icon ion-social-usd',
    name: '缴费渠道分析',
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
