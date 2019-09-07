/*
제이쿼리 구조를 설명하기 위해 만든 간단한 함수
*/
(function (global) {
  var mini = function(name) {
    return new mini.fn.init(name);
  }

  mini.fn = mini.prototype = {};

  mini.fn.sayHi = function() {
    console.log("hi " + this.name);
    return this;
  }

  mini.fn.sayBye = function() {
      console.log("bye " + this.name);
      return this;
  }

  mini.fn.init = function(name) {
    this.name = name;
  }

  mini.fn.init.prototype = mini.fn;
  global.mini = mini;
})(window);

var M = mini("Nam");
M.sayHi().sayBye();
