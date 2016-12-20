var appController = angular.module('myApp.controllers');

//第一个选项卡
appController.controller('tab1Controller', function ($scope, Chats) {
  $scope.title = 'tab1Controller';
  $scope.chats = Chats.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };

});

//第二个选项卡
appController.controller('tab2Controller', function ($scope, Chats2) {
  $scope.title = 'tab2Controller';
  $scope.chats = Chats2.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
});

//第三个选项卡
appController.controller('tab3Controller', function ($scope, Chats3) {
  $scope.title = 'tab3Controller';
  $scope.chats = Chats3.all();
  $scope.remove = function (chat) {
    Chats.remove(chat);
  };
});
