var Emitter = require('./emitter');
var eventConfig = require('./config').events;

// var emtr = new Emitter();
// emtr.on('greet', function() {
//   console.log('listener 1');
// });
//
// emtr.on('greet', function() {
//   console.log('listener 2');
// })
//
// emtr.emit('greet');

var Emitter = require('events');
var emtr = new Emitter();
emtr.on(eventConfig.GREET, function() {
  console.log('greet1');
})
emtr.on(eventConfig.GREET, function() {
  console.log('greet2');
})
emtr.emit(eventConfig.GREET);
