angular.module("myApp.utils")
  .factory("TipsUtil", function () {
    function showTips(msg, timeout) {
      var body = document.getElementsByTagName('body');
      var div = document.createElement('div');
      div.className = "dm-tips";
      div.innerHTML = msg;
      body[0].appendChild(div);
      var t = timeout || 2000;
      div.style.animation = 'tipsHide ' + t / 1000 + 's cubic-bezier(0.42, 0, 0.9, 0.21) forwards';
      setTimeout(function () {
        body[0].removeChild(div);
      }, t);
    }

    return {
      showTips: showTips
    }
  });

