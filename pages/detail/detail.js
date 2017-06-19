var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
// pages/detail/detail.js
Page({
  data: {
    hidden: false,
    offset: 0,
    count: 10
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  //  this.detailsData();
    this.detailsData(options.id);
    this.loadComments(options.id);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadComments:function(id){
    var page=this;
     Util.AJAX(Api.getCommentList,'POST',{id,id,count:page.data.count,offset:page.data.offset},function(res){
      console.log(res.data)
        if(res.data.code == 0){
          page.setData({
            comments:res.data.docs,
            hidden:true
          });
        }else{
           page.setData({
              comments:[],
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
  detailsData:function(id){
    var page = this;
    page.data.id = id;
    console.log('-------------->id:'+id)
     Util.AJAX(Api.getOneDiary,'POST',{id:id},function(res){
      console.log(res.data)
        if(res.data.code == 0){
          page.setData({
            diary:res.data.diary,
            hidden:true
          });
           wx.setNavigationBarTitle({
            title: res.data.diary.diaryName
          });
        }else{
          wx.showToast({
              title: '啊哦，这条日记飞去火星了',
              icon: 'success',
              duration: 2000
            });
        }
     })
  },
  onShareAppMessage: function(){
    var page = this;
    return {
      title: page.data.movie.title,
      desc: page.data.movie.summary,
      path: '/pages/detail/detail?id=' + page.data.id
    }
  }
})