//app.js
import serviceAPI from './serviceAPI.js'
import common from './common.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //音乐播放状态：播放/暂停
    let audioState = wx.getStorageSync("audioState") || false
    wx.setStorageSync("audioState", audioState)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: async(res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(res.userInfo)

              //先查询是否存在该用户
              let findOneRes = await common.request(serviceAPI.URL.findUserByName,{nickName:res.userInfo.nickName},'POST')
              //如果存在则结束，如果不存在则添加新用户
              if(findOneRes.code===200&&findOneRes.data) return
              let addRes = await common.request(serviceAPI.URL.insertUser,{userInfo:res.userInfo},'POST')
              console.log(addRes)
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    g_lineNo:0,//正在播放的行数
    g_audioCtx:false,//全局audio上下文
    g_audio:{}//全局audiodom元素
  }
})