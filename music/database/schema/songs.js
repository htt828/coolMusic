const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let SongSchema = new Schema({
	sort:[Number],//类别 1表示热歌
	name:String,//歌名
	singer:String,//歌手
	preImg:String,
	src:String,//播放路径
	text:String,//歌曲描述
	comments:[{
		created:{
			type:Date,
			default:new Date()
		},
		nickName:String,//评论用户id
		text:String,//评论内容
		childrenComments:[{//子评论
			nickName:String,
			text:String,
			created:{
				type:Date,
				default:new Date()
			}
		}]
	}]
},{timestamps:{createdAt:'created'}})

mongoose.model('Song',SongSchema)