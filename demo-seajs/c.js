define(function(require,exports,module){
	var d = require('./d.js');
	function init(){
		console.log('c '+new Date());
		d.init();
	}
	exports.init = init;
});