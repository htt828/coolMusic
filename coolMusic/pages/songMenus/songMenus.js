// pages/songMenus/songMenus.js
import common from '../../common.js'
import serviceAPI from '../../serviceAPI.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,//是否显示新建歌单对话框
    menuName:'',//输入框新建歌单名称
    userInfo:{},
    userInfoDB:{},//数据库中的用户信息
    menuList:[],
    songId:''
  },

  //弹出新建模态框
  shoeModal(){
    this.setData({show:true})
  },

  //点击确定新建歌单
  async addNewMenu(){
    let res = await common.request(serviceAPI.URL.addMenu, { menu: this.data.menuName,nickName:this.data.userInfo.nickName},'POST')
    if(res.code === 200){
      wx.showToast({
        title: '创建成功',
        icon:'success'
      })
    }else{
      wx.showToast({
        title: '创建失败',
        icon:'none'
      })
    }
  },

  //添加至歌单
  async addToMenu(e){
    let menuId = common.getEventData(e).id
    let res = await common.request(serviceAPI.URL.addToMenu, { userId: this.data.userInfoDB._id, menuId, songId:this.data.songId},'POST')
    if(res.code == 200){
      await this.findUserInfo()
      wx.showToast({
        title: '添加成功',
        icon:'success'
      })
      
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1,
          fail: err => {
            console.log(err)
          }
        })
      },800)
      
    }else{
      wx.showToast({
        title: '添加失败',
        icon:'null'
      })
    }
  },

  //添加至喜欢
  async handleLike(){
    let res = await common.request(serviceAPI.URL.handleLike, { isLike: true, nickName: this.data.userInfo.nickName, songId:this.data.songId},'POST')
    if(res.code === 200){
      await this.findUserInfo()
      wx.showToast({
        title: '添加成功',
        icon:'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
          fail: err => {
            console.log(err)
          }
        })
      }, 800)
      
    }else{
      wx.showToast({
        title: '添加失败',
        icon:'null'
      })
    }
    
  },

  //当创建输入框文本改变时
  onChange(e){
    this.setData({
      menuName:e.detail
    })
  },

  //查询用户
  async findUserInfo(){
    
    let res = await common.request(serviceAPI.URL.findUserByName, { nickName: this.data.userInfo.nickName }, 'POST')
    if(res.code === 200){
      this.setData({userInfoDB:res.data,menuList:res.data.songList})

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({userInfo:app.globalData.userInfo,songId:options.id})
    this.findUserInfo()
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