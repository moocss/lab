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