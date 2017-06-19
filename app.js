//app.js
var Api = require('utils/api.js');
var Util = require('utils/util.js');
// var WxParse = require('../../wxParse/wxParse.js');

App({
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
        // this.getUserInfo();
    },
    onHide: function () {
        console.log('App Hide')
    },
    Api:Api,
    Util:Util,
    globalData: {
        hasLogin: false
    },
    getUserInfo:function(cb){
        var that = this;
        if(this.globalData.userInfo){
            typeof cb == "function" && cb(this.globalData.userInfo);
        }else{
            wx.login({
                success: function (res) {
                  console.log(res)
                    console.log("first:"+res.code);
                    wx.getUserInfo({success: function(userBaseInfo) {
                      console.log(userBaseInfo)
                          // avatarUrl:"http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erNicWt7pxbGY4icz3zrEIBibUfxrTESESpUYlGzn5Qwu0fHf38PkAkcXmloR1wcPzumxfjiakvia8ow7A/0"city:""country:"CN"gender:1language:"zh_CN"nickName:"Five"province:"Beijing"                   
                       that.globalData.userBaseInfo = JSON.parse(userBaseInfo.rawData);
                        that.globalData.wxcode = res.code;
                        console.log("after:"+res.code);
                        that.ownerInfoQuery(that.globalData.wxcode,function(res){
                          console.log(res)
                            if(res.code == 0){
                                that.globalData.userInfo = res.datas;
                                typeof cb == "function" && cb(that.globalData.userInfo);
                            }else{
                               console.log('获取用户信息失败')
                            }
                        });
                    }});
                   
                }
            })
        }
    },

    //根据微信code获取openId
    ownerInfoQuery: function(_code,callback) {
        console.log('diary_openId'+Util.config.version);
        var that = this;
        wx.getStorage({
          key: 'diary_openId'+Util.config.version,
          success: function(res){
              console.log('openId:'+res.data);
            //如果有OpendId则直接登录
            that.memberInfoQuery(res.data,callback);
          },
          fail: function() {
              console.log('Api.getOpenId:'+Api.getOpenId);
              //第一次没有openId基于code取openId
              Util.AJAX(Api.getOpenId,'POST',{code:_code},function(res){
                  console.log(res);
                  if(res.data.code==0){
                        var openId = res.data.openid;
                        wx.setStorage({
                            key:  'diary_openId'+Util.config.version,
                            data: openId,
                            success: function(res){
                                that.memberInfoQuery(openId,callback);
                            }
                        });
                    }else{
                        wx.showModal({
                            title:"",
                            content:"微信账号未关注小程序，请关注后再试试！",
                            // showCancel:false,
                            success:function(res){
                                if(res.confirm){
                                    wx.redirectTo({
                                    url: '../login/login',
                                    duration:2000,
                                    success: function(res){
                                        // success
                                    }
                                    })
                                }
                            }
                        });
                    }
              });
            
          }
        })
    },
    memberInfoQuery:function(_openId,callback){ //根据openid获取应用内信息
      let self = this;
        Util.AJAX(Api.getAccountByOpenId,'POST',{openId:_openId,avatar:self.globalData.userBaseInfo.avatarUrl,nickname:self.globalData.userBaseInfo.nickName},function(res){
            callback(res.data);
        },'POST');
    }
});