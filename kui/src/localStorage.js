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