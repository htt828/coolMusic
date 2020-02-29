// pages/index/index.js


//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    audioCtx :{},//播放控件上下文
    curSongItem:{},
    hasCurSong:false,
    hasCurSong1:false,
    EventChannel:{}
  },

  /**
   * 搜索
   */
  search(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo)
        app.globalData.userInfo = this.data.userInfo
      }
      
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
        }
      })
    }
    
  },
  getUserInfo: function (e) {
    
    app.globalData.userInfo = e.detail.userInfo
    console.log(e)
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  // //播放歌曲
  // audioPlay(item){
  //   this.setData({ hasCurSong1:true})
  //   this.setData({curSongItem:item.detail,hasCurSong:true})
  //   wx.setStorageSync("audioState", this.data.hasCurSong)
  //   console.log(this.audioCtx)
  //   this.audioCtx.play()
  //   this._createAudio(item.detail.src, item.detail.name, item.detail.preImg, item.detail.singer)
  //   this.gotoMusicPlay()
  // },
  // //跳转到播放界面
  // gotoMusicPlay(){
  //   //let str = JSON.stringify(this.data.curSongItem)
  //   let ctx = JSON.stringify(this.audioCtx)
  //   wx.navigateTo({
  //     url: '../musicPlay/musicPlay?audioCtx='+ctx,

  //   })
  // },
  onChange(event) {
    
    wx.showToast({
      title: `切换到 ${event.detail.title}`,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 创建节点查询器 query
    const query = wx.createSelectorQuery()
    let audio = query.select('#myAudio')
    // audio.addEventListener('timeupdate',function(){
    //   console.log(1)
    // })
    
    //app.globalData.g_audio = query.select('#myAudio')
    //console.log(app.globalData.g_audio)
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    app.globalData.g_audioCtx = this.audioCtx
    
    
  },

  //当播放音频时触发
  playMusic(e) {
    this.setData({hasCurSong: true })
    wx.setStorageSync("audioState", this.data.hasCurSong)
    //this.data.EventChannel.off('tap')
    console.log(this.data.EventChannel)
  },
  //当暂停音频时触发
  pauseMusic() {
    this.setData({ hasCurSong: false })
    wx.setStorageSync("audioState", this.data.hasCurSong)
    this.audioCtx.pause()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const manage = wx.getBackgroundAudioManager()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  /**
   * 创建播放器
   */
  _createAudio: function (playUrl, title, coverImgUrl,singer) {
    console.log(singer)
    wx.playBackgroundAudio({
      dataUrl: playUrl,
      title: title,
      coverImgUrl: coverImgUrl,
      singer:singer
    })
    const manage = wx.getBackgroundAudioManager()
    //不显示 但是一定地加上否则会报错
    manage.title = '此时此刻'
    manage.singer = '243'
    manage.epname = '此时此刻'
    console.log(manage.singer)
    // // 监听音乐播放。
    // wx.onBackgroundAudioPlay(() => {
    //   this.setData({
    //     playIcon: 'icon-pause',
    //     cdCls: 'play'
    //   })
    // })
    // 监听音乐暂停。
    // wx.onBackgroundAudioPause(() => {
    //   this.setData({
    //     playIcon: 'icon-play',
    //     cdCls: 'pause'
    //   })
    // })
    // 监听音乐停止。
    // wx.onBackgroundAudioStop(() => {
    //   if (this.data.playMod === SINGLE_CYCLE_MOD) {
    //     this._init()
    //     return
    //   }
    //   this.next()
    // })
    // 监听播放拿取播放进度
    
    manage.onTimeUpdate(() => {
      // const currentTime = manage.currentTime
      // this.setData({
      //   currentTime: this._formatTime(currentTime),
      //   percent: currentTime / this.data.currentSong.duration
      // })
      // if (this.data.currentLyric) {
      //   this.handleLyric(currentTime * 1000)
      // }
    })
  },
})