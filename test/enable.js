var nodeunit = require('nodeunit');
var timecalc = require('../time-calc');

module.exports = nodeunit.testCase({
  'oncreate': function(t) {
    var opts = {enable: {s:false}};
    var watcher = timecalc(opts);
    setTimeout(function() {
      var r = watcher();
      t.equal(r.replace(/\d/g, ''), 'ms', r), t.done();
    }, 1530);
  },
  'ondisplay': function(t) {
    var opts = {enable: {s:false}};
    var watcher = timecalc();
    setTimeout(function() {
      var r = watcher(opts);
      t.equal(r.replace(/\d/g, ''), 'ms', r), t.done();
    }, 1530);
  }
});
