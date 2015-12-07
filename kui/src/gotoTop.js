/**
 * 页面到最顶部,隐藏地址栏
 * @param {Number} time 延时操作的时间
 */

kui.gotoTop = function(time){
	if (!time){
		var time = 200;
	}
	//android2.1和4.0不好使 2.3正常
	if ( (window.orientation == -90 || window.orientation == 90 ) && $.os.android){
		return;
	}
	setTimeout(scrollTo, time, 0, 0);
}