/**
 * 页面切换动画 
 * @param {obj} current_ele 当前页面容器
 * @param {obj} next_ele 需要转入的下一个页面容器
 * @param {number} orientation 0:没方向,1:向左,2:向右
 */
kui.transition = function(current_ele,next_ele,orientation){
	if (current_ele[0] == next_ele[0]){
		current_ele.hide();
		next_ele.show();
		return;
	}

	 var time = 350;
	 if (!app.has_transition() || orientation ===0){
		//无动画
		next_ele.show();
		current_ele.hide();
		return;
	 }

	//var window_width = document.documentElement.clientWidth;
	var window_width = $(window).width();
		
	current_ele.css({
		'-webkit-transform':'none'
	})

	next_ele.css({
		'-webkit-transform':'translate3d('+ (orientation ===1 ? '-' : '') +window_width+'px,0,0)',
		'display':'block'
	})

	setTimeout(function(){
		current_ele.css({
			'-webkit-transform':'translate3d('+ (orientation ===1 ? '' : '-')+window_width+'px,0,0)',
			'-webkit-transition':time+'ms'
		})
		
		next_ele.css({
			'-webkit-transform':'none',
			'-webkit-transition':time+'ms'
		})
		setTimeout(function(){
			current_ele.css({
				'display':'none'
			})
			next_ele.css({
				'display':'block'
			})
		},time+50);
	},0);
}