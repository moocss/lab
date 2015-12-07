/**
 * 模拟hover
 * @param {Object} ele 当前元素
 * @param {String} hover_class_name 按下时的样式名称,必须为class
 */
kui.hover = function(ele,hover_class_name){
	if (!ele){
		return;
	}
	ele.bind('touchstart',function(){
		 $(this).addClass(hover_class_name);
	})

	ele.bind('touchend',function(){
		 $(this).removeClass(hover_class_name);
	})
}