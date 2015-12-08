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