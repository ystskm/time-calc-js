var ci = require('foonyah-ci');
var timecalc = require('../time-calc');

module.exports = ci.testCase({
  'oncreate': function(t) {
    var opts = {display: {s:'秒'}};
    var watcher = timecalc(opts);
    setTimeout(function() {
      var r = watcher();
      t.equal(r.replace(/\d/g, ''), '秒', r), t.done();
    }, 1530);
  },
  'ondisplay': function(t) {
    var opts = {display: {s:'秒'}};
    var watcher = timecalc();
    setTimeout(function() {
      var r = watcher(opts);
      t.equal(r.replace(/\d/g, ''), '秒', r), t.done();
    }, 1530);
  }
}, 'display');
