function getEventData(e) {
  return e.currentTarget.dataset
}

/**
 * 解析歌词
 * 参数：原始歌词文件
 */
function parseLyric(lrc) { //传入歌词，解析参数   lrc
  　　　　
  if (lrc === '') return '';　　 //判断非空
  　　　　
  var lyrics = lrc.split("\n");　　 //去除空格
  　　　　
  var lrcObj = {};　　　　
  for (var i = 0; i < lyrics.length; i++) {　　　　
    var lyric = decodeURIComponent(lyrics[i]);　　　　
    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;　　　　
    var timeRegExpArr = lyric.match(timeReg);　　　　
    if (!timeRegExpArr) continue;　　　　
    var clause = lyric.replace(timeReg, '');　　　　
    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {　　　　
      var t = timeRegExpArr[k];　　　　
      var min = Number(String(t.match(/\[\d*/i)).slice(1)),
        　　　　sec = Number(String(t.match(/\:\d*/i)).slice(1));　　　　
      var time = min * 60 + sec;　　　　
      lrcObj[time] = clause;　　　　
    }　　
  }　　
  return lrcObj;
}



/**
 * 强制刷新当前时间点的歌词
   参数：当前播放时间（单位：秒）
 */
function refreshLyric(time) {　　
  if (lyricText === '') return false;

  　　
  time = parseInt(time); // 时间取整
  　　
  var i = 0;　　
  for (var k in lyricText) {　　
    if (k >= time) break;　　
    i = k; // 记录上一句的
    　　
  }

  　　
  scrollLyric(i); //滚动歌词到自定语句方法下面
}
/**
 * 滚动歌词到指定句
   参数：当前播放时间（单位：秒）
 */
function scrollLyric(time) {　　
  if (lyricText === '') return false;
  time = parseInt(time); // 时间取整　
  if (lyricText === undefined || lyricText[time] === undefined) return false; // 当前时间点没有歌词　
  if (lastLyric == time) return true; // 歌词没发生改变　
  var i = 0; // 获取当前歌词是在第几行　
  for (var k in lyricText) {　　
    if (k == time) break;　　
    i++;　　
  }　　
  lastLyric = time; // 记录方便下次使用
  　　
  $(".lplaying").removeClass("lplaying"); // 移除其余句子的正在播放样式
  　　
  $(".lrc-item[data-no='" + i + "']").addClass("lplaying"); // 加上正在播放样式
  var scroll = (lyricArea.children().height() * i) - ($(".lyric").height() / 2);　　
  lyricArea.stop().animate({
    scrollTop: scroll
  }, 1000); // 平滑滚动到当前歌词位置(更改这个数值可以改变歌词滚动速度，单位：毫秒)
}

//get请求
function request(url, data, method) {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      url: url,
      data: data,
      method: method,
      success: res => {
        resolve(res.data)
      },
      complete: () => {
        wx.hideLoading()
      },
      fail: err => {
        reject(err)
        wx.hideLoading()
      }
    })
  })
}

//播放背景音乐
function playMusic(curItem) {
  const manage = wx.getBackgroundAudioManager()
  let isSameSong = false
  if(curItem.src === manage.src){
    isSameSong = true
  }else{
    isSameSong =  false
  }
  wx.playBackgroundAudio({
    dataUrl: curItem.src,
    title: curItem.name,
    coverImgUrl: curItem.preImg,
    singer: curItem.singer
  })
  
  
  //不显示 但是一定地加上否则会报错
  manage.title = curItem.name
  manage.singer = curItem.singer
  manage.epname = curItem.name
  return isSameSong
}





export default {
  getEventData,
  parseLyric,
  refreshLyric,
  request,
  playMusic
}