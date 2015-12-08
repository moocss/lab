define(function(require,exports,module){
	var b = require('./b.js');
	var c = require('./c.js');
	function init(){
		console.log('a '+new Date());
		b.init();
		c.init();
	}
	exports.init = init;
});