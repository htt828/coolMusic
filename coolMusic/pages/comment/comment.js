// pages/comment/comment.js
import serviceAPI from '../../serviceAPI.js'
import common from '../../common.js'
import util from '../../utils/util.js'
//获取应用实例
const app = getApp()
//获取背景音乐实例
const manage = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curSongInfo:{},
    audioState:true,
    commentText:'',//输入框评论内容
    userInfo:{},
    commentTime:'',//评论时间
  },

  //播放暂停
  shiftPlayAndPause() {
    wx.pauseBackgroundAudio();
    this.setData({
      audioState: !this.data.audioState
    })
    if (this.data.audioState) {
      manage.play()
    } else {
      manage.pause()
    }
    wx.setStorageSync("audioState", this.data.audioState)

  },

  onInput(e){
    this.setData({ commentText: e.detail.value})
  },

  //提交评论
  async submitComment(){
    let res = await common.request(serviceAPI.URL.postComment, { songId: this.data.curSongInfo._id, nickName: this.data.userInfo.nickName, text:this.data.commentText},'POST')
    if(res.code === 200){
      this.setData({curSongInfo:res.data,commentText:''})
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let curSongInfo = decodeURIComponent(options.curSongInfo)
    let audioState = wx.getStorageSync('audioState')
    this.setData({ curSongInfo:JSON.parse(curSongInfo),audioState})
    this.setData({userInfo:app.globalData.userInfo})
    this.data.curSongInfo.comments.forEach(item=>{
      console.log(item)
      item.created = util.formatTime(item.created)
      console.log(item.created)
    })
    this.setData({curSongInfo:this.data.curSongInfo})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})