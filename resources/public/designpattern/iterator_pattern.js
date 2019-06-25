var Iterator = function(items) {
  this.index = 0;
  this.items = items;
}

Iterator.fn = Iterator.prototype;
Iterator.fn.first = function() {
    this.reset();
    return this.next();
}
Iterator.fn.reset = function() {
  return this.index = 0;
}
Iterator.fn.next = function() {
  return this.items[this.index++];
}
Iterator.fn.hasNext = function() {
  return this.index < this.items.length;
}
Iterator.fn.each = function(fnc) {
  this.reset();
  while(this.hasNext()) {
    fnc(this.next());
  }
}

var log = (function() {
  var log = "";
  return {
    add : function(msg) {log += msg + "\n"},
    show : function() { alert(log); log = ""}
  }
});

function run() {
  var items = ["i1", "it2", "i3", "i4"];

   var iter = new Iterator(items);

   while(iter.hasNext()) {
     console.log(iter.next());
   }

   iter.each(console.log);
}
run();
