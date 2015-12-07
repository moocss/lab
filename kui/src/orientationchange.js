/**
 * 手机旋转监测
 * @param {Function} callback 回调函数
 */
kui.orientationchange = function(callback){
	window.addEventListener(("onorientationchange" in window) ? "orientationchange" : "resize", function(){
		setTimeout(function(){
			window.scrollTo(0,0);
			callback.call(this,arguments);
		},$.os.android ? 1000 : 500);//android反应不及时
	}, false);
}
