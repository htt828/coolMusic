const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()


//插入轮播图数据
router.get('/insertSliders', async (ctx) => {
	try {
		let Slider = mongoose.model('Slider')
		let sliders = [{
				prePlayImgUrl: '//img2.c.yinyuetai.com/video/mv/191008/0/-M-4379300915c860c00eb4e13136ff821d_240x135.jpg?imageView2/1/w/195/h/130/format/jpg/q/60',
				videoUrl: 'http://www.170mv.com/tool/jiexi/ajax/vid/3395790.mp4'
			},
			{
				prePlayImgUrl: '//img0.c.yinyuetai.com/video/mv/191110/0/-M-fb14dd851553c9d2d1a9a38ba40847d0_240x135.jpg?imageView2/1/w/195/h/130/format/jpg/q/60',
				videoUrl: 'http://www.170mv.com/tool/jiexi/ajax/vid/3396700.mp4'
			},
			{
				prePlayImgUrl: '//img0.c.yinyuetai.com/video/mv/190920/0/-M-6d89c43efdfa264d23c10f5471fe2be7_240x135.jpg?imageView2/1/w/195/h/130/format/jpg/q/60',
				videoUrl: 'http://www.170mv.com/tool/jiexi/ajax/vid/3395731.mp4'
			}
		]
		sliders.forEach(async (item) => {
			let slider = new Slider(item)
			let res = await slider.save()
		})
	} catch (e) {
		console.log(e + '服务器错误')
	}
})

//获取轮播图数据
router.get('/getSliders', async (ctx) => {
	try {
		let Slider = mongoose.model('Slider')
		let sliders = await Slider.find().exec()
		ctx.body = {
			code: 200,
			data: sliders
		}
	} catch (e) {
		ctx.body = {
			code: 500,
			message: '服务器错误'
		}
	}
})

//插入歌曲数据
router.get('/insertSong', async (ctx) => {
	try {
		let Song = mongoose.model('Song')
		let songs = [{
				sort: [1],
				name: '麻雀',
				singer: '李荣浩',
				preImg: 'http://p2.music.126.net/TzlSVBiNtpRD2b7MT2Hi-w==/109951164527590793.jpg?param=130y130',
				src: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_83001418&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
				lyric: `[00:00.71]等你下课 - 周杰伦
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
[04:11.92]`
			},
			{
				sort: [1],
				name: '等你下课',
				singer: '周杰伦',
				preImg: 'http://img3.imgtn.bdimg.com/it/u=3196825519,1597164546&fm=26&gp=0.jpg',
				src: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_40079875&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
				lyric: `[00:00.71]等你下课 - 周杰伦
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
[04:11.92]`
			},
			{
				sort: [1],
				name: '句号',
				singer: '邓紫棋',
				preImg: 'http://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg?param=130y130',
				src: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_83765010&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
				lyric: `[00:00.71]等你下课 - 周杰伦
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
[04:11.92]`
			}
		]
		songs.forEach(async (item) => {
			let song = new Song(item)
			let res = await song.save()
		})
	} catch (e) {
		console.log(e)
	}

})

//获取歌曲列表
router.post('/getSongs', async (ctx) => {
	try {
		let sort = [ctx.request.body.sort]
		let Song = mongoose.model('Song')
		let songs = await Song.find({
			sort: {
				$in: sort
			}
		}).exec()
		ctx.body = {
			code: 200,
			data: songs
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
	}
})

//根据歌曲id查找歌曲信息
router.post('/getSongInfoById', async (ctx) => {
	try {
		let params = ctx.request.body
		let Song = mongoose.model('Song')
		let nickName = params.nickName
		let res = await Song.findOne({_id:params.id})
		let User = mongoose.model('User')
		let userInfo = await User.findOne({
			nickName
		})
		let isLike = false
		userInfo.likeSongs.some(item => {
			if (item.toString() == (res._id).toString()) {
				isLike = true
				return true
			}
		})
		ctx.body = {
			code: 200,
			data: res,
			isLike
		}
	} catch (e) {
		console.log(e)
		ctx.body = {
			code: 500,
			message: '服务器错误'
		}
	}
})

// //获取歌曲列表
// router.post('/getSongList',async(ctx)=>{
// 	try{
// 		let params = ctx.request.body
// 		let HotSong = mongoose.model('HotSong')
// 		//如果是热歌列表
// 		if(params.hot){
// 			var res = await HotSong.find().exec()
// 		}
// 		ctx.body = {code:200,data:res}
// 	}catch(e){
// 		console.log(e)
// 		ctx.body = {code:500,message:'服务器错误'}
// 		//TODO handle the exception
// 	}
// })

//根据歌名查询歌曲(搜索)
router.post('/findSongByName', async (ctx) => {
	try {
		let params = ctx.request.body
		let Song = mongoose.model('Song')
		let song = await Song.findOne({
			name: params.name
		})
		ctx.body = {
			code: 200,
			data: song
		}

	} catch (e) {
		ctx.body = {
			code: 500,
			message: '服务器出错'
		}
		//TODO handle the exception
	}
})



module.exports = router
