// pages/menuInfo/menuInfo.js
import serviceAPI from '../../serviceAPI.js'
import common from '../../common.js'
let manage = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuName:'',
    show:false,//对话框
    menuId:'',
    userInfo:{},
    menuInfo:{},//歌单信息
    menuSongs:[],//歌单歌曲
    curSongIndex:null,//当前正在播放歌曲索引
    isLike:true
  },

  showModal(){
    this.setData({show:true})
  },

  //显示操作菜单
  showPop(e){
    let index = common.getEventData(e).index
    let id = common.getEventData(e).id
    wx.showActionSheet({
      itemList: ['添加至歌单','删除'],
      success:async res=>{
        if (res.tapIndex === 0){
          wx.navigateTo({
            url: '../songMenus/songMenus?id=' + id
          })
        }else{
          //删除
        let res = await common.request(serviceAPI.URL.deleteFromMenu, { userId: this.data.userInfo._id, menuId: this.data.menuId, songId:id},'POST')
          if(res.code === 200){
            wx.showToast({
              title: '删除成功'
            })
            this.getMenuInfo()
          }
        }
      
      }
    })
  },

  //修改歌单名
  async editMenu(){
    let res = await common.request(serviceAPI.URL.editMenuName,{userId:this.data.userInfo._id,menuId:this.data.menuInfo._id,menuName:this.data.menuName},'POST')
    if(res.code === 200){
      this.setData({menuInfo:res.data})
      wx.showToast({
        title: '修改成功',
      })
    }
  },

  onChange(e){
    this.setData({ menuName: e.detail})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({userInfo: JSON.parse(options.userInfo),isLike:options.isLike})

    if(this.data.isLike == 'true'){
      return this.getLikeList()
    }
    this.setData({ menuId: options.menuId })
    this.getMenuInfo()
    
    
    
  },

  //播放歌曲
  audioPlay(e){
    this.setData({curSongIndex:common.getEventData(e).index})
    let item = common.getEventData(e).item
    common.playMusic(item)
    
  },

  //获取歌单详情列表
  async getMenuInfo(){
    let res = await common.request(serviceAPI.URL.getMenuInfo, { userId: this.data.userInfo._id, menuId:this.data.menuId},'POST')
    if(res.code === 200){
      this.setData({ menuInfo: res.menuInfos,menuSongs:res.data})
      this.setData({menuName:this.data.menuInfo.name})
      this.data.menuSongs.some((item,i)=>{
        if(item.src === manage.src){
          this.setData({curSongIndex:i})
          return true
        }else{
          this.setData({curSongIndex:null})
        }
      })
     
    }
  },

  //获取喜欢列表
  async getLikeList(){
    let res = await common.request(serviceAPI.URL.getLikeList,{id:this.data.userInfo._id},'POST')
    if(res.code === 200){
      this.setData({menuSongs:res.data})
      this.data.menuSongs.some((item, i) => {
        if (item.src === manage.src) {
          this.setData({ curSongIndex: i })
          return true
        }
      })
    }

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