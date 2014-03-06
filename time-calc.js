/***/
(function(hasWin, hasMod) {

  hasWin && (window.timecalc = timecalc)
  hasMod && module.exports && (module.exports = timecalc);

  function timecalc(opts) {

    var keys = ['Y', 'M', 'D', 'h', 'm', 's', 'ms'];
    var maxv = [null, 12, 30, 24, 60, 60, 1000];
    var U = {
      enable: {},
      display: {},
      viewer: defaultDisp
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
    watcher.viewer = function(fn) {
      return fn && (U.viewer = fn), U.viewer;
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
        return U.viewer(diff, String(U.display[key] || key));
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

    function defaultDisp(diff, repl) {
      if(repl.indexOf('%d') >= 0)
        return repl.replace(/[^\\]%d/g, split3(diff));
      if(repl.indexOf('%D') == 0)
        return repl.substr(2);
      return split3(diff) + repl;
    }

    function split3(v) {

      var mark = ',', minus = v < 0;
      v = String(minus ? v * -1: v);

      var decimal = null;
      if(v.indexOf('.') != -1)
        decimal = v.substr(v.indexOf('.')), v = v.replace(decimal, '');

      var s = '';
      for( var i = v.length - 1; i >= 0; i--) {
        if(s.length != 0 && (v.length - 1 - i) % 3 == 0)
          s = mark + s;
        s = v[i] + s;
      }

      if(minus)
        s = '-' + s;

      if(decimal)
        s += decimal;

      return s;

    }

  }

})(typeof window != 'undefined', typeof module != 'undefined');
