/* kui - v0.1.0 - 2013-07-16 */
/**
 * kui
 */

var kui = {
	version:1.0
}
/**
 * 桌面启动模式下,如果是外部链接依然跳转到浏览器打开,当前项目在当前页面打开  
 */
kui.desktopMode = function(){
	if(window.navigator.standalone){
		var linkRemotes = false; 
		document.addEventListener('click', function(e) {
			var a = e.target;
			// Bubble up until we hit link or top HTML element. Warning: BODY element is not compulsory so better to stop on HTML
			while(a.nodeName !== "A" && a.nodeName !== "HTML") {
				a = a.parentNode;
			}
			if('href' in a && a.href.indexOf('http') !== -1 && (a.href.indexOf(document.location.host) !== -1 || linkRemotes)) {
				e.preventDefault();
				document.location.href = a.href;
			}
		},false);
	};
}
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
/**
 * 简单的localStorage
 */
kui.localStorage={
	//测试
	has:function(name){
		return localStorage.getItem(name) ? true : false;
	},
	//设置
	set:function(name,value){
		//容量溢出时会报错
		try{
			localStorage.setItem(name,JSON.stringify(value));
		}catch(e){
			
		}
	},
	//获取
	get:function(name){
		return JSON.parse(localStorage.getItem(name));
	},
	//删除
	remove:function(name){
		localStorage.removeItem(name);
	},
	//清空
	clear:function(){
		localStorage.clear();
	}
};
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

/**
 * 设置page title
 * @param {String} title 要设置的标题文字
 */
kui.setTitle = function(title){
	 setTimeout(function(){
		 //iso4 safari 报错
		 var version_4_2 = !$.os.version.indexOf('4.2');
		 if (!($.os.ios&&version_4_2)){
			$('title').html(title);
		 }
	 },100)
}
/**
 * 分享到 sina 新浪微博,qq 腾讯微博,qzone QQ空间,rr 人人网
 * @param {String} type : sina 新浪微博,qq 腾讯微博,qzone QQ空间,rr 人人网
 * @param {String} share_title : 分享的内容
 * @param {String} share_pic : 分享的图片
 * @param {String} share_url : 分享的所属链接,默认为location.href
 */
kui.share = function(type, share_title, share_pic,share_url) {
	if (!share_url){
		var share_url = encodeURIComponent(location.href);
	}

	share_title = encodeURIComponent(share_title);

	if (share_pic){
		var share_pic = encodeURIComponent(share_pic);
	}else{
		var share_pic = '';
	}
	var share_to;
	switch (type) {
		case "sina":
			share_to = "http://service.weibo.com/share/share.php?url=" + share_url + "&title=" + share_title + "&pic=" + share_pic;
			break;
		case "qq":
			share_to = "http://share.v.t.qq.com/index.php?c=share&a=index&f=q2&url=" + share_url + "&title=" + share_title + "&pic=" + share_pic;
			break;
		case "qzone":
			//share_to = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + share_url + "&title=" + share_title + "&pic=" + share_pic; //pic 
			share_to = "http://sns.z.qq.com/share?url=" + share_url + "&web_url=" + share_url + "&title=" + share_title + "&pic_url=" + share_pic + "&g_ut=2";
			break;
		case "rr":
			share_to = "http://widget.renren.com/dialog/share?resourceUrl=" + share_url + "&pic=" + share_pic + "&description=" + share_title + "&srcUrl=" + share_url;
			//share_to = 'https://graph.renren.com/oauth/authorize?response_type=code&client_id=5210c3935bbf4081ab18bc30582ef45c&redirect_uri='+encodeURIComponent(share_to)+'&display=touch';
			break;
	}
	//注意window.open --> ios4 safari && ios4,5 uc 支持但打不开新窗口
	window.open(share_to);
	//location.href = share_to;
}
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