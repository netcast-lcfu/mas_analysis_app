angular.module('myApp.services')

  .factory('Chats2', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      icon: 'icon ion-cash',
      name: '当日现金流量分析',
      url: 'tab2/showBusiInfo'
    },{
      id: 1,
      icon: 'icon ion-map',
      name: '当日缴费渠道分析',
      url: 'tab2/showBusiInfo'
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
