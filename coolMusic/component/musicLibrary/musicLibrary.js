// component/musicLibrary/musicLibrary.js
import serviceAPI from '../../serviceAPI.js'
import common from '../../common.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    sliders:[],
    activeIndex:0,
    menuItems:[
      '流行', '华语', '治愈系', '粤式情歌', '中国风', '欧美','KTV必点'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    curItem:{},//正在播放的歌曲对象
    hotList:[],
    sortList:[],//分类列表
  },

  created(){
    this.getSliders()
    this.getHotSongs(1)
    this.getSortSongs(2)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 获取轮播图数据
   */
    async getSliders() {
      try {
        console.log(serviceAPI.URL.getSliders)
        let res = await common.request(serviceAPI.URL.getSliders,'GET')
        console.log(res)
        if(res.code === 200){
          this.setData({sliders:res.data})
        }
      } catch (e) {
        console.log(e)
      }
    },

    /**
     * 获取最近热歌数据
     */
    async getHotSongs(){
      let res = await common.request(serviceAPI.URL.getSongs,{sort:1},'POST')
      if(res.code === 200){
        this.setData({ hotList:res.data })
      }
    },

    /**
     * 去视频页面
     */
    gotoVideo(e){
      let videoUrl = common.getEventData(e).video
      wx.navigateTo({
        url: '../../pages/video/video?videoUrl=' + videoUrl
      })
    },

    /**
     * 点击分类菜单获取分类列表
     */
    selectSort(e){
      this.setData({ activeIndex: common.getEventData(e).index})
      this.getSortSongs(this.data.activeIndex+2)
    },
    
    //获取分类歌曲
    async getSortSongs(i){
      let res = await common.request(serviceAPI.URL.getSongs,{sort:i},'POST')
      if(res.code === 200){
        this.setData({sortList:res.data})
      }
    },

    //播放歌曲
    audioPlay(e){
      let curItem = common.getEventData(e).item
      let sort = common.getEventData(e).sort
      let isSameSong = common.playMusic(curItem)
      wx.navigateTo({
        url: '../../pages/musicPlay/musicPlay?id=' + curItem._id + '&sort=' + sort +'&isSameSong='+isSameSong,
     })
      wx.setStorageSync("audioState", true)
      //this.triggerEvent("audioPlay",curItem);
    }
  }
})
