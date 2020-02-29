// pages/musicPlay/musicPlay.js
import serviceAPI from '../../serviceAPI.js'
import common from '../../common.js'

//获取应用实例
const app = getApp()
//获取背景音乐实例
const manage = wx.getBackgroundAudioManager()
//当前行
let lineNo = 0


Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,//弹出层是否显示
    nickName:'',
    currentTime: 0,//歌曲当前的播放时间
    percent:0,//播放的进度    
    isLike: false,
    audioState: true,
    audioCtx: {},
    duration:manage.duration,//歌曲总时长
    lyricParseArr:[],
    activeLyricIndex:0,
    curLyric:'',//当前行的歌词
    sliderProcess:0,
    songProcess:0,
    curSongInfo:{},
    songList:[],//歌曲列表
//     lyric: `[00:00.00]麻雀 - 李荣浩
// [00:02.13]词：李荣浩
// [00:02.96]曲：李荣浩
// [00:03.69]编曲：李荣浩
// [00:04.65]制作人：李荣浩
// [00:05.47]吉他：李荣浩
// [00:05.63]贝斯：李荣浩
// [00:05.81]和音编写：李荣浩
// [00:06.04]和音：李荣浩
// [00:06.19]录音师：李荣浩
// [00:06.39]混音师：李荣浩
// [00:06.58]音乐制作助理：青格乐
// [00:06.89]录音工作室：北京一样音乐录音室
// [00:07.36]混音工作室：北京一样音乐录音室
// [00:07.80]母带后期制作人：李荣浩
// [00:08.16]母带后期处理工程师：周天澈
// [00:08.54]母带后期处理录音室：Studio21A
// [00:09.17]
// [00:23.19]山隔壁还是山
// [00:25.62]都有一个伴
// [00:27.14]
// [00:28.72]相信海枯石烂
// [00:31.16]也许我笨蛋
// [00:32.73]
// [00:34.30]飞太慢会落单
// [00:36.30]
// [00:36.83]太快会受伤
// [00:38.52]
// [00:39.96]日子不就都这样
// [00:42.69]
// [00:45.86]天会晴就会暗
// [00:48.11]我早就习惯
// [00:49.78]
// [00:51.24]一日为了三餐
// [00:53.77]不至于寒酸
// [00:55.41]
// [00:57.08]为给你取暖我把翅膀折断
// [01:01.06]
// [01:02.31]我遭遇那些苦难
// [01:05.04]你却不管
// [01:06.99]
// [01:07.63]我飞翔在乌云之中
// [01:11.18]你看着我无动于衷
// [01:13.87]有多少次波涛汹涌
// [01:16.75]在我 心中
// [01:18.20]
// [01:18.91]你飞向了雪山之巅
// [01:22.24]我留在你回忆里面
// [01:25.10]你成仙我替你留守人间
// [01:29.75]
// [01:30.64]麻雀也有明天
// [01:34.02]
// [01:56.52]天会晴就会暗
// [01:58.68]我早就习惯
// [02:00.31]
// [02:01.86]一日为了三餐
// [02:04.34]不至于寒酸
// [02:05.98]
// [02:07.49]为给你取暖我把翅膀折断
// [02:11.54]
// [02:12.85]我遭遇那些苦难
// [02:15.55]你却不管
// [02:17.44]
// [02:18.09]我飞翔在乌云之中
// [02:21.54]你看着我无动于衷
// [02:24.29]有多少次波涛汹涌
// [02:27.26]在我 心中
// [02:28.79]
// [02:29.37]你飞向了雪山之巅
// [02:32.68]我留在你回忆里面
// [02:35.58]你成仙我替你留守人间
// [02:40.34]
// [02:41.23]麻雀也有明天
// [02:44.46]
// [03:06.43]我飞翔在乌云之中
// [03:09.48]你看着我无动于衷
// [03:11.75]
// [03:12.30]有多少次波涛汹涌
// [03:15.32]在我 心中
// [03:16.86]
// [03:17.45]你飞向了雪山之巅
// [03:20.76]我留在你回忆里面
// [03:23.59]你成仙我替你留守人间
// [03:28.22]
// [03:29.07]麻雀也有明天 `
    lyric:`[00:00.71]等你下课 - 周杰伦
[00:01.46]词：周杰伦
[00:02.26]曲：周杰伦
[00:15.23]你住的 巷子里 我租了一间公寓
[00:22.33]为了想与你不期而遇
[00:28.19]高中三年 我为什么 为什么不好好读书
[00:35.50]没考上跟你一样的大学
[00:40.40]我找了份工作 离你宿舍很近
[00:46.81]当我开始学会做蛋饼 才发现你 不吃早餐
[00:54.98]喔 你又擦肩而过
[00:59.91]你耳机听什么 能不能告诉我
[01:08.20]躺在你学校的操场看星空
[01:14.09]教室里的灯还亮着你没走
[01:20.92]记得 我写给你的情书
[01:27.08]都什么年代了
[01:30.40]到现在我还在写着
[01:33.92]总有一天总有一年会发现
[01:40.07]有人默默的陪在你的身边
[01:46.94]也许 我不该在你的世界
[01:53.42]当你收到情书
[01:56.69]也代表我已经走远
[02:25.01]学校旁 的广场 我在这等钟声响
[02:32.35]等你下课一起走好吗
[02:38.12]弹着琴 唱你爱的歌 暗恋一点都不痛苦（一点都不痛苦）
[02:45.35]痛苦的是你 根本没看我
[02:50.17]我唱这么走心 却走不进你心里（这么走心 进你心里）
[02:56.61]在人来人往 找寻着你 守护着你 不求结局
[03:04.68]喔 你又擦肩而过（喔 而过）
[03:09.71]我唱告白气球 终于你回了头
[03:17.93]躺在你学校的操场看星空
[03:23.96]教室里的灯还亮着你没走
[03:30.68]记得 我写给你的情书
[03:36.80]都什么年代了
[03:40.22]到现在我还在写着
[03:43.67]总有一天总有一年会发现
[03:49.86]有人默默的陪在你的身边
[03:56.62]也许 我不该在你的世界
[04:03.13]当你收到情书
[04:06.39]也代表我已经走远
[04:11.92]`,
sort:null,
songId:'',
    isSameSong:false,//点播的歌曲是否是正在播放中的歌曲
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   let audioState = wx.getStorageSync("audioState")
    this.setData({
      audioCtx: app.globalData.g_audioCtx,
      nickName:app.globalData.userInfo.nickName,
      sort:options.sort,
      songId:options.id,
      isSameSong:JSON.parse(options.isSameSong)
    })
    this.parseLyric()
    this._init()
    
    
  },

  //添加到歌单
  addToList(){
    wx.navigateTo({
      url: '../songMenus/songMenus?id='+this.data.curSongInfo._id,
      fail:err=>{
        console.log(err)
      }
    })
  },

  //关闭弹出层
  onClose(){
    this.setData({show:false})
  },

  //显示歌曲列表
  showList(){
    this.setData({show:true})
    // wx.showActionSheet({
    //   itemList: this.data.songList.map(item=>item.name),
    //   success:res=>{
    //     let curSongInfo  = this.data.songList.filter((item,i)=>res.tapIndex === i)
    //     this.setData({ curSongInfo: curSongInfo[0], audioState:true})
    //     this.createBackgroundMusic(curSongInfo[0])
    //     wx.setStorageSync('audioState', this.data.audioState)
    //   },
    //   fail:err=>{
    //     console.log(err)
    //   }
    // })
    
  },

  //点击歌曲列表歌曲
  choiceSong(e){
    let item = common.getEventData(e).item
    this.setData({ curSongInfo: item, audioState: true,show:false,songId:item._id })
    this.createBackgroundMusic(item)
    wx.setStorageSync('audioState', this.data.audioState)

  },

  //进入评论界面
  gotoComment(){
    let curSongInfoStr = JSON.stringify(this.data.curSongInfo)
    wx.navigateTo({
      url: '../comment/comment?curSongInfo=' +encodeURIComponent(curSongInfoStr),
      success:res=>{
        console.log(res)
      },

      fail:err=>{
        console.log(err)
      }
    })
  },

  //切换上一曲下一一曲
  shiftSong(e){
    
    let type = common.getEventData(e).type
    let songListLength = this.data.songList.length
    let shiftSong = {}
    this.data.songList.filter((item,i)=>{
      
      if(item._id === this.data.curSongInfo._id){
        //如果是上一曲
        if(type === 'pre'){
          if (i === 0) {
            shiftSong = this.data.songList[songListLength - 1]
          } else {
            shiftSong = this.data.songList[i - 1]
          }
        }
        //如果是下一曲
        else if(type === 'next'){
          if (i === songListLength - 1){
            shiftSong = this.data.songList[0]
          }else{
            shiftSong = this.data.songList[i+1]
          }
        }
        this.createBackgroundMusic(shiftSong)
        
      }
    })
    this.setData({ curSongInfo: shiftSong,audioState:true })
    wx.setStorageSync('audioState', this.data.audioState)
    
  },

  //获取歌曲信息
  async getSongInfo(id){
    let res = await common.request(serviceAPI.URL.getSongInfoById, {id:id,nickName:this.data.nickName}, 'POST')
    if(res.code === 200){
      this.setData({ curSongInfo: res.data, isLike: res.isLike })
      //获取歌曲列表
      this.getSongList()
    }
  },

  //获取歌曲列表
  async getSongList(){
    let res = await common.request(serviceAPI.URL.getSongs, { sort: this.data.sort},'POST')
    if(res.code === 200){
      this.setData({songList:res.data})
    }
  },

  //创建背景音乐
  createBackgroundMusic(curSong){
    lineNo = 0
    // wx.playBackgroundAudio({
    //   dataUrl: curSong.src,
    //   title: curSong.name,
    //   coverImgUrl: curSong.preImg,
    //   singer: curSong.singer
    // })
    
    // manage.title = '此时此刻'
    // manage.singer = '243'
    // manage.epname = '此时此刻'
    
    common.playMusic(curSong)
    
    
  },

  //当进度条改变时触发
  onSliderChange(e){
    this.setData({
      sliderProcess: e.detail.value
    })
    let seekTime = (this.data.sliderProcess * 1.00) / 100 * manage.duration
    manage.seek(seekTime)
    
    seekTime = seekTime.toFixed(3)
    this.data.lyricParseArr.forEach((item, i) => {
      if(i === this.data.lyricParseArr.length-1) return
      if (seekTime>=item.time&&seekTime<=this.data.lyricParseArr[i+1].time){
        
        lineNo = i
      }
    })
  },

  /**
   * 去视频页面
   */
  goToVideo(){
    wx.navigateTo({
      url: '../video/video',
    })
  },

  //处理歌词
  parseLyric(){
    let lyricParseArr = []
    let lyricArr = this.data.lyric.split('\n')
    lyricArr.forEach((item,i)=>{
      let time = item.substring(item.indexOf('[')+1,item.indexOf(']'))
      //这里是要把原来的mm:ss的时间格式改为秒
      time = (time.split(":")[0] * 60 + parseFloat(time.split(":")[1])).toFixed(3)
      let lyric = item.substring(item.indexOf(']')+1)
      lyricParseArr.push({ time, lyric})
    })
    this.setData({
      lyricParseArr
    })
  },


  /**
   * 实现文字高亮
   */
  lineHeight(){

  },

  //切换歌曲暂停播放
  shiftPlayAndPause() {
    this.setData({
      audioState: !this.data.audioState
    })
    if(this.data.audioState){
      manage.play()
    }else{
      manage.pause()
    }
    wx.setStorageSync("audioState", this.data.audioState)
    
  },
  // 收藏和取消收藏
  async like() {
    this.setData({
      isLike: !this.data.isLike
    })
    let res = await common.request(serviceAPI.URL.handleLike, { songId: this.data.curSongInfo._id, nickName: this.data.nickName, isLike:this.data.isLike},'POST')
    if(res.code === 200 && this.data.isLike){
      wx.showToast({
        title: '已收藏到我喜欢',
        icon:'success'
      })
    }else if(res.code === 200 && !this.data.isLike){
      wx.showToast({
        title: '已取消收藏',
        icon:'success'
      })
    }else{
      wx.showToast({
        title: '操作失败',
        icon:'null'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 初始化数据
   */
  _init(){
    this._createAudio()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    //this._init()
    manage.play()
    this.getSongInfo(this.data.songId)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },



  /**
   * 创建播放器
   */
  _createAudio: function () {
    // wx.playBackgroundAudio({
    //   dataUrl: playUrl,
    //   title: '麻雀',
    //   coverImgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1305095352,1141466096&fm=11&gp=0.jpg'
    // })
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
    if(!this.data.isSameSong){
      lineNo = 0
    }
    manage.onTimeUpdate(() => {
      
      this.setData({
        currentTime: this._formatTime(manage.currentTime),
        percent: (manage.currentTime / manage.duration).toFixed(2)*100
      })
      let curtime = manage.currentTime.toFixed(3)
      this.setData({
        sliderProcess: this.data.percent
      })
      if(this.data.percent === 100){
        
        let shiftSong = {}
        let songListLength = this.data.songList.length
        this.data.songList.filter((item, i) => {

          if (item._id === this.data.curSongInfo._id) {
              if (i === songListLength - 1) {
                shiftSong = this.data.songList[0]
              } else {
                shiftSong = this.data.songList[i + 1]
              }
            this.createBackgroundMusic(shiftSong)

          }
        })
        this.setData({ curSongInfo: shiftSong, audioState: true })
        wx.setStorageSync('audioState', this.data.audioState)
      }
      if (lineNo === this.data.lyricParseArr.length - 1&&curtime>=parseFloat(this.data.lyricParseArr[lineNo].time)){
      }
      if (curtime>=parseFloat(this.data.lyricParseArr[lineNo].time)&&curtime<=parseFloat(this.data.lyricParseArr[lineNo+1].time)){
        this.setData({ activeLyricIndex: lineNo, curLyric: this.data.lyricParseArr[lineNo].lyric})
       
        lineNo++
        
      }
      
      // this.data.lyricParseArr.forEach((item,i)=>{
      //   if(i === this.data.lyricParseArr.length-1) return
      //   if(curtime>=this.data.lyricParseArr[i].time&&curtime<this.data.lyricParseArr[i+1].time){
      
      //   }
      // })
      // if (this.data.currentLyric) {
      //   this.handleLyric(currentTime * 1000)
      // }
    })
  },

  //格式化时间
  _formatTime: function (interval) {
    interval = interval | 0
    const minute = interval / 60 | 0
    const second = this._pad(interval % 60)
    return `${minute}:${second}`
  },
  /*秒前边加0*/
  _pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  },
})