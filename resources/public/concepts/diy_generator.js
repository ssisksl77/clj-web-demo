// 만드는 중... cons로 하려니까 할게 많네...
function cons (a, b) {
  return {
    car : function() {
      return a;
    },
    cdr : function() {
      return b;
    }
  }
}

function isCons(data) {
  return data.car && data.cdr;
}

function concat(cons1, cons2) {
  var tail = cons1;
  while(cdr(tail)) {
    tail = cdr(tail);
  }



  return head;
}
function list() {
  var args = Array.prototype.slice.call(arguments);
  var first = cons();
  var i = 0;
  //while(args.length > i) {
  //}
  return args;
}

//
