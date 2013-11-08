/***/
typeof module != 'undefined' && (module.exports = timecalc);
function timecalc(opts) {
  var keys = ['Y', 'M', 'D', 'h', 'm', 's', 'ms'];
  var maxv = [null, 12, 30, 24, 60, 60, 1000];
  var U = {
    enable: {},
    display: {}
  }, b = null;
  return mergeOpts(opts, true), watcher;
  function watcher(opts) {
    mergeOpts(opts);
    var bv = b.getTime(), cv = Date.now(), i = keys.length;
    var diff = cv - bv, lastd = null;
    if(diff < 0) // TODO accept
      throw new Error('Time is never return.');
    while(i-- > 0) {
      var test = parseInt(diff / 1000), key = keys[i];
      if(test == 0 || i === 0)
        return U.enable[key] === false ? lastd: createDisp(key);
      U.enable[key] !== false && (lastd = createDisp(key)), diff = test;
    }
    function createDisp(key) {
      return diff + (U.display[key] || key);
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
