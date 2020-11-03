var ci = require('foonyah-ci');
var timecalc = require('../time-calc');

module.exports = ci.testCase({
  'ms': function(t) {
    var watcher = timecalc();
    setTimeout(function() {
      var r = watcher();
      t.equal(r.replace(/\d/g, ''), 'ms', r), t.done();
    }, 30);
  },
  'sec': function(t) {
    var watcher = timecalc();
    setTimeout(function() {
      var r = watcher();
      t.equal(r.replace(/\d/g, ''), 's', r), t.done();
    }, 1400);
  }
}, 'basic');
