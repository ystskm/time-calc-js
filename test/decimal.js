var ci = require('foonyah-ci');
var timecalc = require('../time-calc');

module.exports = ci.testCase({
  'oncreate': function(t) {
    var opts = {decimal: {s:2}};
    var watcher = timecalc(opts);
    setTimeout(function() {
      var r = watcher();
      t.equal(r.replace(/\d/g, ''), '.s', r);
      t.ok(/^\d{2}s$/.test( r.split('.').pop() ));
      t.done();
    }, 1530);
  },
  'ondisplay': function(t) {
    var opts = {decimal: {s:2}};
    var watcher = timecalc();
    setTimeout(function() {
      var r = watcher(opts);
      t.equal(r.replace(/\d/g, ''), '.s', r);
      t.ok(/^\d{2}s$/.test( r.split('.').pop() ));
      t.done();
    }, 1530);
  }
}, 'decimal');
