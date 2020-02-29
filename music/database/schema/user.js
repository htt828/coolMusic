let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let userSchema = new Schema({
	likeSongs:[ObjectId],//我喜欢/收藏的歌
	nickName:String,//用户名
	avatarUrl:String,//头像
	language:String,//语言
	province:String,//省
	city:String,//城市
	country:String,//国家
	gender:Number,//性别
	songList:[{//歌单
		name:String,//歌单歌单名称
		songs:[ObjectId]
	}],
	recentSongs:[ObjectId],//最近所听歌曲
},{timestamps:{createdAt:'created'}})

mongoose.model('User',userSchema)