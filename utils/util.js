module.exports = {
	config:{
		version:'1.0'
	},
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