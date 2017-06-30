var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
Page({
	 data: {
	 	hidden:true,
    	array:Util.weathers, 
    	weather: 0,
    	title:'',
    	content:'',

  },
   onLoad:function(e){
   		let self = this;
	    getApp().getUserInfo((userInfo)=>{
	      console.log('--------------------------->get openId:'+userInfo.openId)
	      self.setData({
	      	openId:userInfo.openId
	      })
	    });
  },
   bindKeyInputTitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindKeyInputContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      weather: e.detail.value
    })
  },
  submit:function(e){
  	console.log(this)
  	let self = this;
  	console.log(this.data.title)
  	console.log(this.data.content)
  	if(this.data.title == ''||this.data.content==''){
  		wx.showToast({
              title: '没有填写完整',
              icon: 'success',
              duration: 2000
         });
  	}else{
  		 Util.AJAX(Api.saveDiary,'POST',{openId:self.data.openId,weather:self.data.weather,title:self.data.title,content:self.data.content},function(res){
  		 	console.log(res)
        if(res.data.code == 0){
          console.log('0')
          wx.switchTab({
            url: '../index/index',
            success: function(res){
              console.log(res)
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
        }else{
          console.log('1')
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
         });
        }
  		 })
  	}
  }
})