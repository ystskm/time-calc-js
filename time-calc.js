/***/
(function(has_win, has_mdl) {
  var NULL = null, TRUE = true, FALSE = false, UNDEF = undefined;
  var g;
  try {

    if(has_win) {
      // browser, emulated window
      g = window;
    } else {
      // raw Node.js, web-worker
      g = typeof self == 'undefined' ? this: self;
    }

    // exports
    g.timecalc = timecalc;
    // synquery module compatible
    !g.AppSpace || g.AppSpace.define('timecalc', timecalc);
    // node.js, requre.js
    !has_mdl || (module.exports = timecalc);

  } catch(e) {
    console.error('[timecalc] Install failed for some reason: ', e);
  }
  function timecalc(opts) {

    var keys = ['Y', 'M', 'D', 'h', 'm', 's', 'ms'];
    var maxv = [NULL, 12, 30, 24, 60, 60, 1000];
    var decs = [0, 0, 0, 0, 0, 0, 0];
    var U = {
      enable: {},
      display: {},
      decimal: {},
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
    watcher.decimal = function() {
      return U.decimal;
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
      if(diff < 0) { // TODO accept
        throw new Error('Time is never return.');
      }
      // (2020.11.03 sakamoto) 小数点表示の許容
      while(i-- > 0) {
        var test = parseInt(diff / maxv[i]), key = keys[i];
        if(test == 0 || i === 0)
          return U.enable[key] === false ? lastd: createDisp(key);
        U.enable[key] !== false && (lastd = createDisp(key)), diff = test;
      }
      function createDisp(key) {
        var dec = U.decimal[key] || 0, pow = Math.pow(10, dec);
        return U.viewer(pow == 1 ? diff: ( parseInt(diff * pow / maxv[i]) / pow ), String(U.display[key] || key), dec);
      }
    }

    function mergeOpts(opts, set_base) {
      opts = opts || {};
      ['enable', 'display', 'decimal'].forEach(function(k) {
        opts[k] || (opts[k] = {});
        for( var i in opts[k]) {
          U[k][i] = opts[k][i];
        }
      });
      var nb = new Date(opts.basepoint == null ? Date.now(): opts.basepoint);
      (set_base || opts.basepoint) && (b = nb);
    }

    function defaultDisp(diff, repl, dec) {
      if(repl.indexOf('%d') >= 0)
        return repl.replace(/(^|[^\\])%d/g, split3(diff, dec));
      if(repl.indexOf('%D') == 0)
        return repl.substr(2);
      return split3(diff, dec) + repl;
    }

    function split3(v, dec) {

      var mark = ',', minus = v < 0;
      v = String(minus ? v * -1: v);

      var decimal = NULL, pair = v.split('.');
      if(pair[1] != NULL || dec > 0) {
        decimal = '.' + (pair[1] + new Array(dec).fill(0).join('')).substr(0, dec);
        v = pair[0];
      }

      var s = '';
      for(var i = v.length - 1; i >= 0; i--) {
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

}).call(this, typeof window != 'undefined', typeof module != 'undefined');
