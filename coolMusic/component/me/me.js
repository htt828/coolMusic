// component/me/me.js
import common from '../../common.js'
import serviceAPI from '../../serviceAPI.js'
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max:Number,
    userInfo:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    nickName:'',
    menuList: [],
    userInfoDB:{},
    show: false,//是否显示新建歌单对话框
    menuName: '',//输入框新建歌单名称
  },
  

  ready(){
    this.setData({userInfo:app.globalData.userInfo})
    this.findUserInfo()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //查询用户信息
    //查询用户
    async findUserInfo() {
      console.log(this.data)
      let res = await common.request(serviceAPI.URL.findUserByName, { nickName: this.data.userInfo.nickName }, 'POST')
      if (res.code === 200) {
        this.setData({ userInfoDB: res.data, menuList: res.data.songList })
      }
    },

    //弹出新建模态框
    shoeModal() {
      this.setData({ show: true })
    },

    //点击确定新建歌单
    async addNewMenu() {
      let res = await common.request(serviceAPI.URL.addMenu, { menu: this.data.menuName, nickName: this.data.userInfo.nickName }, 'POST')
      if (res.code === 200) {
        wx.showToast({
          title: '创建成功',
          icon: 'success'
        })

        this.findUserInfo()
      } else {
        wx.showToast({
          title: '创建失败',
          icon: 'none'
        })
      }
      this.setData({menuName:''})
    },

    //当创建输入框文本改变时
    onChange(e) {
      this.setData({
        menuName: e.detail
      })
    },

    //去管理歌单页面
    toManageMenu(){
      let userInfo = JSON.stringify(this.data.userInfoDB)
      wx.navigateTo({
        
        url: '../../pages/manageMenu/manageMenu?userInfo='+userInfo
      })
    },

    //去歌单详情
    gotoMenuInfo(e){
      let userInfo = JSON.stringify(this.data.userInfoDB)
      let menuId = common.getEventData(e).id
      wx.navigateTo({
        url: '../../pages/menuInfo/menuInfo?menuId='+menuId+'&userInfo='+userInfo+'&isLike='+false,
      })
    },

    //喜欢列表
    goToLikeList(){
      let userInfo = JSON.stringify(this.data.userInfoDB)
      wx.navigateTo({
        url: '../../pages/menuInfo/menuInfo?userInfo=' + userInfo + '&isLike=' + true,
      })
    }
  }
})
