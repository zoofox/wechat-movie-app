var Api = require('../../utils/api.js');
var Util = require('../../utils/util.js');
// pages/detail/detail.js
Page({
  data: {
    hidden: false,
    offset: 0,
    count: 10,
    comment:'',
    isReply:0,
    replyName:'',
    isFocus:false,  //评论框
    placeholder:'评论最多32个字哦',
     weathers:Util.weathers
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  //  this.detailsData();
    let self = this;
    this.detailsData(options.id);
    this.loadComments(options.id);
    this.setData({
      diaryId:options.id
    })
    getApp().getUserInfo((userInfo)=>{
        console.log('--------------------------->get openId:'+userInfo.openId)
        self.setData({
          openId:userInfo.openId
        })
      });
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
  bindKeyInputComment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  //失去焦点
  blur:function(){
    if(this.data.comment == ''){
         this.setData({
          isReply: 0,
          replyName:'',
          isFocus:false,
          placeholder:'评论最多32个字哦'
        })
    }
  
  },
  //回复
  reply:function(e){
    console.log(e.currentTarget)
    this.setData({
      isReply: 1,
      replyName:e.currentTarget.id,
      isFocus:true,
      placeholder:'回复['+e.currentTarget.id+']'
    })
  }
  ,
  //评论
  submit:function(){
    let self = this;
    let comment = this.data.comment;
    if(comment == ''){
      wx.showToast({
              title: '没有填写完整',
              icon: 'success',
              duration: 2000
         });
    }else{
       Util.AJAX(Api.saveComment,'POST',{openId:self.data.openId,diaryId:self.data.diaryId,comment:comment,isReply:self.data.isReply,replyName:self.data.replyName},function(res){
        console.log(res)
          if(res.data.code == 0){
            wx.redirectTo({
              url: '../detail/detail?id=' + self.data.diaryId,
              success: function(res){
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
          }else{
             wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
           });
          }
       })
    }
  },
  loadComments:function(id){
    var page=this;
     Util.AJAX(Api.getCommentList,'POST',{id:id,count:page.data.count,offset:page.data.offset},function(res){
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
            datas:{
              diary:res.data.diary,
              weathers:page.data.weathers
            },
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