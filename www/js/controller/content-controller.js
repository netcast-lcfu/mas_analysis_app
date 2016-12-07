angular.module('myApp.controllers')
//内容案例
  .controller('content1Controller', function ($scope, $stateParams) {
    $scope.title = 'content1Controller';
    console.log($stateParams);
  })

  .controller('showBusiInfoCtrl', function ($scope) {
    $scope.showBusiMap = function () {
      window.open('http://10.1.1.15:8080/yunwei/researchBusinessAction!viewListForPhone.action', '_blank', 'location=yes');
    };
  })

  .controller('showSectorAreaInfoCtrl', function ($scope) {
    $scope.viewBusi = function () {
      window.open('http://10.1.1.15:8080/yunwei/sectorAreaAction!viewListForPhone.action', '_blank', 'location=yes');
    };
  })

  .controller('queryKnowledgeLibCtrl', function ($scope) {
    $scope.queryKnowledgeLib = function () {
      window.open('http://10.1.1.15:8080/yunwei/simpKnowledgebaseLuceneAction!viewListForRes.action', '_blank', 'location=yes');
    };
  });
