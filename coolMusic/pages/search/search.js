// pages/search/search.js
import common from '../../common.js'
import serviceAPI from '../../serviceAPI.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    //搜索历史
    historyItem:[],
    //热门搜索
    hotSearchs:[],
    searchSong:{},
    showRes:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSongs()
  },

  //获取热门搜索列表
  async getHotSongs() {
    let res = await common.request(serviceAPI.URL.getSongs, { sort: 0 }, 'POST')
    if (res.code === 200) {
      this.setData({ hotSearchs: res.data })
    }
  },

  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onSearch() {
    // wx.showToast({
    //   title: '搜索' + this.data.value,
    // });
  },

  //删除历史记录
  deleteHistory(){
    this.setData({historyItem:[]})
    wx.setStorageSync('historyItem', [])
  },

  //当点击历史搜索记录时
  clickHistory(e) {
    let historyWord = common.getEventData(e).historyword//历史搜索记录关键词
    this.setData({value:historyWord})
    this.searchSong()
  },

  //搜索
  async searchSong() {
    if (this.data.historyItem.indexOf(this.data.value) === -1){
       this.data.historyItem.unshift(this.data.value)
     }
    this.setData({historyItem:this.data.historyItem})
    wx.setStorageSync('historyItem', this.data.historyItem)
    let res = await common.request(serviceAPI.URL.findSongByName, { name:this.data.value},'POST')
    
    if(res.code === 200){
      this.setData({searchSong:res.data,showRes:true})
    }else{
      this.setData({showRes:false})
    }
  },

  //清空搜索框
  clear(){
    this.setData({showRes:false})
  },

  //播放歌曲
  playAudio(e){
    let id = ''
    let song = {}
    if(common.getEventData(e).item){
      song = common.getEventData(e).item
      id = song._id
      
    }else{
      id = this.data.searchSong._id
      song = this.data.searchSong
    }
    common.playMusic(song)
    wx.navigateTo({
      url: '../musicPlay/musicPlay?id=' + id +'&isSameSong='+false,
    })
  },  

  //获取历史搜索记录
  getHistory(){
    let historyItem = wx.getStorageSync('historyItem') || []
    this.setData({ historyItem})
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
    this.getHistory()
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