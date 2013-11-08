# time-calc

Support for calculating time-unit like twitter
You can use this _both node and browsers_.

## Install
Install with [npm](http://npmjs.org/):
```sh
    npm install time-calc
```
## API 
- `default units`  
Y,M,D,h,m,s,ms

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

	var watcher = calctime();
    setTimeout(function(){
      console.log(watcher()); // => '1m'
    }, 61000);

</script>
```
