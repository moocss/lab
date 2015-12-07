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