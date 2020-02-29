// pages/manageMenu/manageMenu.js
import serviceAPI from '../../serviceAPI.js'
import common from '../../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[],//复选框数组
    menuList:[],
    userInfo:{}
  },

  //删除歌单
  async deleteMenu(){
    let res =await common.request(serviceAPI.URL.deleteMenu,{userId:this.data.userInfo._id,menuIds:this.data.result},'POST')
  
    if(res.code === 200){
      wx.showToast({
        title: '删除成功',
        icon:'success'
      })
      this.findUserInfo()
      this.setData({result:[]})
    }else{
      wx.showToast({
        title: '删除失败',
        icon:'null'
      })
    }
  },

  //查询用户
  async findUserInfo() {
    console.log(this.data)
    let res = await common.request(serviceAPI.URL.findUserByName, { nickName: this.data.userInfo.nickName }, 'POST')
    if (res.code === 200) {
      this.setData({ userInfo: res.data, menuList: res.data.songList })
    }
  },

  //选中单选框时
  onChange(event) {
    this.setData({
      result: event.detail
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({userInfo:JSON.parse(options.userInfo)})
    this.setData({menuList:this.data.userInfo.songList})
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