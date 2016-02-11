# time-calc
  
[![Build status](https://travis-ci.org/ystskm/time-calc-js.png)](https://travis-ci.org/ystskm/time-calc-js)  
  
Support for calculating time-unit like twitter
You can use this _both node and browsers_.

## Install
Install with [npm](http://npmjs.org/):
```sh
    npm install time-calc
```
## API 
`unit keys`  
Y, M, D, h, m, s, ms

### - calculate time-unit
```js
    var watcher = require('time-calc')();
    setTimeout(function(){
      console.log(watcher()); // => '30ms'
    }, 30);
    setTimeout(function(){
      console.log(watcher()); // => '1s'
    }, 1200);
    setTimeout(function(){
      console.log(watcher()); // => '1m'
    }, 61000);
```
### - limit target unit
```js
    var watcher = require('time-calc')();
    setTimeout(function({enable:{s:false}}){
      console.log(watcher()); // => '1100ms'
    }, 1100);
    setTimeout(function(){
      console.log(watcher({enable:{m:false}})); // => '60s'
    }, 61000);
```
### - change display
```js
    var watcher = timecalc({display:{s:'秒', m: '分'}});
    setTimeout(function(){
      console.log(watcher()); // => '1秒'
    }, 1000);
    setTimeout(function(){
      console.log(watcher()); // => '1分'
    }, 60000);
```
### - change viewer 
`default`
```js
    function defaultDisp(diff, repl) {
      if(repl.indexOf('%d') >= 0)
        return repl.replace(/[^\\]%d/g, split3(diff));
      if(repl.indexOf('%D') == 0)
        return repl.substr(2);
      return split3(diff) + repl;
    }
```
```js
    var watcher = require('time-calc');
    watcher.viewer(function(diff, repl){ return diff });
    console.log(typeof watcher()); // => 'number'
```
### - set start position
```js
    var watcher = require('time-calc')({basepoint: Date.now() + 5000});
    setTimeout(function(){
      console.log(watcher()); // => '1s'
    }, 6200);
```
### - _watcher_ can accept all same options as _time-calc_
```js
    var watcher = require('time-calc')(), base = Date.now() + 5000;
    setTimeout(function(){
      console.log(watcher({basepoint: base})); // => '1s'
    }, 6200);
```
## also use on browser

```html
<script type="text/javascript" src="time-calc.js"></script>
<script type="text/javascript">

	var watcher = timecalc();
    setTimeout(function(){
      console.log(watcher()); // => '1m'
    }, 61000);

</script>
```
