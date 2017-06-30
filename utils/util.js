module.exports = {
	config:{
		version:'1.0'
	},
	weathers:['风和日丽', '和风细雨','滴水成冰','倾盆大雨','骄阳似火','冰天雪地','大雪纷飞','阴雨连绵','电闪雷鸣','飞沙走石','暴风骤雨','雾里看花','风刀霜剑','雨过天晴','银装素裹'],
	AJAX:(url,method,data,cb)=>{
		console.log(url)
		console.log(method)
		console.log(data)
		 wx.request({
	      url: url,
	      data: data,
	      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
	     // header: {'Content-Type': 'json'}, // 设置请求的 header
	      success: function(res){
	        // success
	    	cb(res);
	      },
	      fail: function() {
	        // fail
	      },
	      complete: function() {
	        // complete
	      }
	    })
	}
}