/**
	* @mini js framewrok --- jsf
	* @api list
	* 
	jsf.getBrowser()
	jsf.getById()
	jsf.getByClass()
	jsf.addClass()
	jsf.setOpacity()
	jsf.contains()
	jsf.getFirstChild
	jsf.loadScript()
	jsf.ajax()
	jsf.getJson()
	jsf.referer()
	jsf.insertBefore()
	jsf.insertAfter()
	jsf.getPreviousSibling()
	jsf.getNextSibling()
	jsf.ready()
	*
	*/

;(function(){
	if (typeof(jsf) == 'undefined'){
		var jsf = {};
	}
	window.jsf = jsf;

	jsf.userAgent = navigator.userAgent.toLowerCase();
	jsf.getBrowser = {
		ie: /msie/.test(jsf.userAgent),
		ie6: /msie 6/.test(jsf.userAgent),
		ie7: /msie 7/.test(jsf.userAgent),
		ie8: /msie 8/.test(jsf.userAgent),
		ie9: /msie 9/.test(jsf.userAgent)
	};

	jsf.getById = function(objName) {
		return document.getElementById ? eval('document.getElementById("' + objName + '")') : eval("document.all." + objName)
	}
	
	jsf.getByClass = function(str,root,tag){
		if(root){
			root = typeof root == "string" ? document.getElementById(root) : root;
		} else {
			root = document.body;
		}
		tag = tag || "*";
		var els = root.getElementsByTagName(tag),arr = [];
		for(var i=0,n=els.length;i<n;i++){
			for(var j=0,k=els[i].className.split(" "),l=k.length;j<l;j++){
				if(k[j] == str){
					arr.push(els[i]);
					break;
				}
			}
		}
		return arr;
	}

	//仅支持ID
	jsf.addClass = function(str,addClassName){
		if (typeof(str) == 'string'){
			var ele = jsf.getById(str);
		}else{
			var ele = str;
		}

		if (typeof(addClassName) != 'undefined'){
			var className = ele.className;
			var arr = className.split(/\s+/);
			var newClassName = '';
			for (var i = 0 ; i< arr.length ; i++ ){
				if (arr[i] == addClassName){
					return false;
				}
				newClassName += arr[i] + ' ';
			}
			ele.className = newClassName +' '+ addClassName;
		}
	}

	jsf.setOpacity = function(obj, n) {
		if (document.all) {
			obj.style.filter="alpha(opacity=0"+n+")";  
		}
		else {
			obj.style.opacity = n / 100;
		}
	}
	
	//父子关系
	jsf.contains = function (parent, node) {
		return parent.compareDocumentPosition
			? !!(parent.compareDocumentPosition(node) & 16)
			: parent !== node && parent.contains(node)
	}
	
	//取第一个子元素
	jsf.getFirstChild = function (el) {
		var firstChild = el.firstChild;
		while (firstChild != null && firstChild.nodeType == 3) {
			firstChild = firstChild.nextSibling;
		}
		return firstChild;
	}
	
	//加载js文件
	jsf.loadScript = function (url, callback){
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.onreadystatechange = callback;
		script.onload = callback;
		head.appendChild(script);
	}
	
	jsf.createXMLHttpRequest =  function() {
		if (window.ActiveXObject) {
			var aVersions = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"];
			for (var i = 0; i < aVersions.length; i++) {
				try {
					return new ActiveXObject(aVersions[i]);
				} catch(oError) {
					continue;
				}
			}
		} else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}

		throw new Error("XMLHttp object could not be created.");
	}

	/**
	 * @
		jsf.ajax({ 
			url: url,	
			method: "GET",
			data:ajaxData,
			dataType: "json",
			success: function(data) {
				//todo
			},
			error: function(){
				
			}
		});
	 */
	jsf.ajax =  function(opts) {
		var _xmlHttp = jsf.createXMLHttpRequest();
		
		var query = [], data;
		for(var key in opts.data) {
			query[query.length] = encodeURI(key) + "=" + encodeURIComponent(opts.data[key]);
		}
		data = query.join('&');
		if (opts.method== "GET" && data !='') {
			opts.url += '?'+data;
		}

		_xmlHttp.open(opts.method, opts.url, true);
		_xmlHttp.setRequestHeader("cache-control", "no-cache");
		
		if (opts.method.toUpperCase() == "POST") {
			_xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}

		_xmlHttp.onreadystatechange = function() {
			if (_xmlHttp.readyState == 4 && _xmlHttp.status == 200) {
				var response = null;
				switch (opts.dataType.toUpperCase()) {
				case "json":
					response = eval(_xmlHttp.responseText);
					break;
				case "xml":
					response = _xmlHttp.responseXML;
					break;
				case "html":
					response = _xmlHttp.responseText;
					break;
				default:
					response = _xmlHttp.responseText;
					break;
				}
				if (typeof(opts.success) != 'undefined') {
					opts.success(_xmlHttp.responseText);
				}
			}else if (_xmlHttp.readyState == 4) {
				var codes = ['500', '501', '502', '503', '504', '505', '404'];
				if (codes.join(',').indexOf(_xmlHttp.status.toString()) >= 0 && typeof(opts.error) != 'undefined') {
					opts.error(_xmlHttp.status, _xmlHttp.responseText);
				}
			}
		}
		
		//开始发送数据
		_xmlHttp.send(data);
	}
	
	/**
	 * @
		jsf.getJsonp(url,ajaxData,function(data){
			//todo
		})
	 */
	jsf.getJsonp = (function () {
		var counter = 0,head, query, key, window = this;
		function load(url) {
			var script = document.createElement('script');
			var done = false;
			script.src = url;
			script.async = true;

			script.onload = script.onreadystatechange = function () {
				if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
					done = true;
					script.onload = script.onreadystatechange = null;
					if (script && script.parentNode) {
						script.parentNode.removeChild(script);
					}
				}
			};
			if (!head) {
				head = document.getElementsByTagName('head')[0];
			}
			head.appendChild(script);
		}

		function jsonp(url, params, callback, error) {
			query = "?";
			params = params || {};
			for (key in params) {
				if (params.hasOwnProperty(key)) {
					query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
				}
			}
			var jsonp = "jsf_jsonp_" + (++counter);
			window[jsonp] = function (data) {
				callback(data);
				try {
					delete window[jsonp];
				} catch (e) {}
				window[jsonp] = null;
			};

			load(url + query + "callback=" + jsonp);

			//error = error || function () {};
			return jsonp;
		}
		return jsonp;
	}());

	jsf.referer = function(){
		 return document.referer ? document.referer : '';
	}
	
	jsf.insertBefore = function (newEl, targetEl) {
		var parentEl = targetEl.parentNode;
		if (parentEl.lastChild == targetEl) {
			parentEl.appendChild(newEl);
		} else {
			parentEl.insertBefore(newEl, targetEl.nextSibling);
		}
	}

	jsf.insertAfter = function (newEl, targetEl) {
		var parentEl = targetEl.parentNode;
		if (parentEl.lastChild == targetEl) {
			parentEl.appendChild(newEl);
		} else {
			parentEl.insertAfter(newEl, targetEl.nextSibling);
		}
	}

	//上一结点
	jsf.getPreviousSibling = function(ele,idName){
		var node = ele.previousSibling;
		while (node.nodeType != 1) {
			node = node.previousSibling;
			if (!node) return null;
		};
		return node;
	}
	
	//下一节点
	jsf.getNextSibling = function(ele,idName){
		var node = ele.nextSibling;
		while (node.nodeType != 1) {
			node = node.nextSibling;
			if (!node) return null;
		};
		return node;
	}
	
	/**
	 * @
		jsf.ready(function(){
			//todo;
		});
	 */
	jsf.ready = (function() {
		var funcs = [];
		var ready = false;
		
		function handler(e) {
			if(ready) return;
			
			if(e.type === 'onreadystatechange' && document.readyState !== 'complete') {
				return;
			}
			
			for(var i=0; i<funcs.length; i++) {
				funcs[i].call(document);
			}
			ready = true;
			funcs = null;
		}
		if(document.addEventListener) {
			document.addEventListener('DOMContentLoaded', handler, false);
			document.addEventListener('readystatechange', handler, false);            //IE9+
			window.addEventListener('load', handler, false);
		}else if(document.attachEvent) {
			document.attachEvent('onreadystatechange', handler);
			window.attachEvent('onload', handler);
		}
		return function whenReady(fn) {
			if(ready) { fn.call(document); }
			else { funcs.push(fn); }
		}
	})();

})();
