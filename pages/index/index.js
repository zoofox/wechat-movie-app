var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
// pages/main/main.js
Page({
  data: {
    hidden: false,
    offset: 0,
    count: 10,
    weathers:Util.weathers
  },
  onLoad:function(e){
  this.loadDiary();
    console.log(e);
  },
  detail:function(e){
     wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.id,
      success: function(res){
        console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  loadDiary:function(){
     var page=this;
     Util.AJAX(Api.getDiaryList,'POST',{count:page.data.count,offset:page.data.offset},function(res){
      console.log(res.data)
        if(res.data.code == 0){
          page.setData({
            datas:{diaries:res.data.docs,weathers:page.data.weathers},
            hidden:true
          });
        }else{
           page.setData({
             datas:{diaries:[],weathers:page.data.weathers},
              hidden: true
            });
            wx.showToast({
              title: '没内容啦',
              icon: 'success',
              duration: 2000
            });
        }
     })
  }
  ,
  onReachBottom:function(){
    var page = this;
    var offset = page.data.offset + page.data.count;
    page.setData({
      offset: offset,
      hidden: false
    });

     Util.AJAX(Api.getDiaryList,'POST',{count:page.data.count,offset:page.data.offset},function(res){
      console.log(res.data)
        if(res.data.code == 0){
          let diaries = page.data.datas.diaries.concat(res.data.docs);
          page.setData({
            datas:{diaries:diaries,weathers:page.data.weathers},
            hidden:true
          });
        }else{
           page.setData({
              hidden: true
            });
            wx.showToast({
              title: '没内容啦',
              icon: 'success',
              duration: 2000
            });
        }
     })
   },
   onShareAppMessage: function(){
     return {
       title: '咕叽日记',
       desc: '我在咕叽日记等你，这里有我的阴晴雨雪',
       path: '/pages/index/index'
     }
   }
})