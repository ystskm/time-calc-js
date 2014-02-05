/***/
typeof module != 'undefined' && (module.exports = timecalc);
function timecalc(opts) {
  var keys = ['Y', 'M', 'D', 'h', 'm', 's', 'ms'];
  var maxv = [null, 12, 30, 24, 60, 60, 1000];
  var U = {
    enable: {},
    display: {}
  }, b = null;
  watcher.basepoint = function(v) {
    return v ? (b = v): b;
  };
  watcher.enable = function() {
    return U.enable;
  };
  watcher.display = function() {
    return U.display;
  };
  watcher.diff = function() {
    return Date.now() - b.getTime();
  };
  return mergeOpts(opts, true), watcher;
  function watcher(opts) {
    mergeOpts(opts);
    var i = keys.length, diff = watcher.diff(), lastd = null;
    if(diff < 0) // TODO accept
      throw new Error('Time is never return.');
    while(i-- > 0) {
      var test = parseInt(diff / maxv[i]), key = keys[i];
      if(test == 0 || i === 0)
        return U.enable[key] === false ? lastd: createDisp(key);
      U.enable[key] !== false && (lastd = createDisp(key)), diff = test;
    }
    function createDisp(key) {
      var repl = String(U.display[key] || key);
      if(repl.indexOf('%d') >= 0)
        return repl.replace(/[^\\]%d/g, diff);
      if(repl.indexOf('%D') == 0)
        return repl.substr(2);
      return diff + repl;
    }
  }
  function mergeOpts(opts, set_base) {
    opts = opts instanceof Object ? opts: {};
    ['enable', 'display'].forEach(function(k) {
      !opts[k] && (opts[k] = {});
      for( var i in opts[k])
        U[k][i] = opts[k][i];
    });
    var nb = new Date(opts.basepoint == null ? Date.now(): opts.basepoint);
    (set_base || opts.basepoint) && (b = nb);
  }
}
