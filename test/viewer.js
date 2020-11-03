var ci = require('foonyah-ci');
var timecalc = require('../time-calc');

module.exports = ci.testCase({
  'apply': function(t) {
    var opts = {enable: {s:false}};
    var watcher = timecalc(opts);
    watcher.viewer(function(d, r){ return d}), setTimeout(function() {
      var r = watcher();
      t.equal(typeof r, 'number', r), t.done();
    }, 1530);
  }
}, 'viewer');
