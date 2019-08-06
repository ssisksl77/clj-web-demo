var Emitter = require('./emitter');

var emtr = new Emitter();
emtr.on('greet', function() {
  console.log('listener 1');
});

emtr.on('greet', function() {
  console.log('listener 2');
})

emtr.emit('greet');
