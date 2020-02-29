let mongoose = require('mongoose')
let Router = require('koa-router')
let router = new Router()
const tokenConfig = {
	privateKey: 'httjiangcan'
} // 加密密钥
const jwt = require('jsonwebtoken')

//添加用户
router.post('/insertUser', async (ctx) => {
	try {
		//请求参数
		let params = ctx.request.body
		let User = mongoose.model('User')
		let user = new User(params.userInfo)
		let res = await user.save()
		ctx.body = {
			code: 200,
			message: '添加成功'
		}
	} catch (e) {
		ctx.body = {
			code: 500,
			message: '服务器错误'
		}
	}
})

//登录
router.post('/login', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let nickName = ctx.request.body.nickName
		const userInfo = {
			nickName
		}
		const token = jwt.sign(userInfo, tokenConfig.privateKey, {
			expiresIn: '7d'
		}) //签发token,7天有效期
		ctx.body = {
			code: 200,
			message: '登录成功',
			data: {
				token: 'htt' + token
			}
		}
	} catch (e) {
		ctx.body = {
			code: 500,
			message: '服务器错误'
		}
	}
})

//根据用户名查询用户
router.post('/findUserByName', async (ctx) => {
	try {
		console.log(121)
		let User = mongoose.model('User')
		let params = ctx.request.body
		let res = await User.findOne({
			nickName: params.nickName
		})
		ctx.body = {
			code: 200,
			data: res
		}
		console.log(res)
	} catch (e) {
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//喜欢收藏/取消收藏
router.post('/handleLike', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let songId = ctx.request.body.songId
		let nickName = ctx.request.body.nickName
		let isLike = ctx.request.body.isLike //是否收藏喜欢
		if (isLike) { //如果收藏则添加
			await User.updateOne({
				nickName
			}, {
				$addToSet: {
					likeSongs: songId
				}
			})
			ctx.body = {
				code: 200,
				message: '收藏成功'
			}
		}
		if (!isLike) {
			await User.updateOne({
				nickName
			}, {
				$pull: {
					likeSongs: songId
				}
			})
			ctx.body = {
				code: 200,
				message: '取消收藏成功'
			}
		}

	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//新建歌单
router.post('/addMenu', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let menuName = ctx.request.body.menu
		let nickName = ctx.request.body.nickName
		let menu = {
			name: menuName,
			songList: []
		}
		//let menu = new Menu({name:postMenuParam})
		//再user表中的nickName符合条件的用户的songList数组后面追加一个元素
		await User.update({
			nickName
		}, {
			$addToSet: {
				'songList': menu
			}
		})
		ctx.body = {
			code: 200,
			message: '创建成功'
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//添加至歌单
router.post('/addToMenu', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let userId = ctx.request.body.userId
		let menuId = ctx.request.body.menuId
		console.log(menuId)
		let songId = ctx.request.body.songId
		let res = await User.updateOne({
			_id: userId,
			'songList._id': menuId
		}, {
			$addToSet: {
				'songList.$.songs': songId
			}
		})


		console.log(res)
		ctx.body = {
			code: 200,
			message: '添加成功'
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器错误'
		}
	}
})

//从歌单中移除
router.post('/deleteFromMenu',async(ctx)=>{
	try{
		let params = ctx.request.body
		let User = mongoose.model('User')
		let res = await User.updateOne({
			_id:params.userId,
			'songList._id':params.menuId
		},{
			$pull:{
				'songList.$.songs':params.songId
			}
		})
		console.log(res)
		ctx.body = {code:200,message:'移除成功'}
	}catch(e){
		console.log(e)
		ctx.body = {code:500,message:'服务器出错'}
	}
	
})


//删除歌单
router.post('/deleteMenu', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let userId = ctx.request.body.userId
		let menuIds = ctx.request.body.menuIds
		//let res = await User.updateOne({_id:userId},{$pull:{'songList':{_id:{$each:menuIds}}}})
		await menuIds.forEach(async item => {
			await User.updateOne({
				_id: userId
			}, {
				$pull: {
					songList: {
						_id: mongoose.Types.ObjectId(item)
					}
				}
			})
			let userInfo = await User.findOne({
				_id: userId
			})
			console.log('用户信息')
			console.log(userInfo)
		})
		ctx.body = {
			code: 200,
			message: '删除成功'
		}
	} catch (e) {
		//TODO handle the exception
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//查询所有的歌单
router.post('/getMenuInfo', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let params = ctx.request.body
		let menuRes = await User.find({
			_id: params.userId,
			'songList._id': params.menuId
		}, {
			songList: {
				$elemMatch: {
					_id: params.menuId
				}
			}
		})
		let menuInfos = menuRes[0].songList[0]
		let Song = mongoose.model('Song')
		let menu_song = await Song.find({
			_id: {
				$in: menuInfos.songs
			}
		})
		ctx.body = {
			code: 200,
			data: menu_song,
			menuInfos
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//查询喜欢歌曲的列表
router.post('/getLikeList', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let params = ctx.request.body
		let Song = mongoose.model('Song')
		let userInfo = await User.findOne({
			_id: params.id
		})
		let likeIds = userInfo.likeSongs
		let like_songs = await Song.find({
			_id: {
				$in: likeIds
			}
		})
		ctx.body = {
			code: 200,
			data: like_songs
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//修改歌单名称
router.post('/editMenuName', async (ctx) => {
	try {
		let User = mongoose.model('User')
		let params = ctx.request.body
		let res = await User.updateOne({
			_id: params.userId,
			songList: {
				$elemMatch: {
					_id: mongoose.Types.ObjectId(params.menuId)
				}
			}
		}, {
			$set: {
				'songList.$.name': params.menuName
			}
		})
		let menuInfo = await User.findOne({
			_id: params.userId,
			'songList._id':params.menuId
		},{
			songList:{
				$elemMatch:{_id:params.menuId}
			}
		}
		)
		console.log('菜单信息')
		console.log(menuInfo)
		ctx.body = {
			code: 200,
			data: menuInfo.songList[0],
			msg: '修改成功'
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
		//TODO handle the exception
	}

})

//评论
router.post('/postComment',async(ctx)=>{
	try{
		let Song = mongoose.model('Song')
		let User = mongoose.model('User')
		let params = ctx.request.body
		let res = await Song.updateOne({
			_id:params.songId
		},{
			$push:{comments:{nickName:params.nickName,text:params.text}}
		})
		let songInfo = await Song.findOne({_id:params.songId})
		ctx.body = {code:200,message:'发表评论成功',data:songInfo}
		
	}catch(e){
		console.log(e)
		ctx.body = {code:500,message:'服务器出错'}
	}
	
})







module.exports = router
