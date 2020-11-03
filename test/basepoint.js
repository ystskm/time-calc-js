var ci = require('foonyah-ci');
var timecalc = require('../time-calc');

module.exports = ci.testCase({
  'oncreate': function(t) {
    var opts = {basepoint: Date.now() + 1000};
    var watcher = timecalc(opts);
    setTimeout(function() {
      var r = watcher();
      t.equal(r.replace(/\d/g, ''), 'ms', r), t.done();
    }, 1530);
  },
  'ondisplay': function(t) {
    var opts = {basepoint: Date.now() + 1000};
    var watcher = timecalc();
    setTimeout(function() {
      var r = watcher(opts);
      t.equal(r.replace(/\d/g, ''), 'ms', r), t.done();
    }, 1530);
  }
}, 'basepoint');
