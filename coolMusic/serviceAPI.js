const LOCALURL = 'http://localhost:3000/'
const URL = {
  getSliders:LOCALURL + 'index/getSliders',//获取轮播图数据
  getSongs: LOCALURL + 'index/getSongs',//获取歌曲列表
  getSongInfoById: LOCALURL + 'index/getSongInfoById',//根据id获取歌曲信息
  login: LOCALURL +'user/login',//登录
  insertUser: LOCALURL + 'user/insertUser',//添加新用户
  findUserByName: LOCALURL + 'user/findUserByName',//根据id查询用户
  handleLike: LOCALURL +'user/handleLike',//处理收藏以及取消收藏
  addMenu: LOCALURL + 'user/addMenu',//创建歌单
  addToMenu: LOCALURL +'user/addToMenu',//添加至歌单
  deleteFromMenu: LOCALURL +'user/deleteFromMenu',//从歌单中移除
  deleteMenu: LOCALURL +'user/deleteMenu',//删除歌单
  getMenuInfo: LOCALURL +'user/getMenuInfo',//获取歌单详情信息
  findSongByName: LOCALURL +'index/findSongByName',//根据歌名查询歌曲
  getLikeList: LOCALURL +'user/getLikeList',//获取喜欢歌曲列表
  editMenuName: LOCALURL + 'user/editMenuName',//修改歌单
  postComment: LOCALURL + 'user/postComment',//发表评论
  
}

export default {
  URL
}