const mongoose = require('mongoose')
const db = 'mongodb://localhost/music'
const glob = require('glob')
const {resolve} = require('path')

//初始化schema
initSchema = () =>{
	//用同步方式引入,把所有再schema下面的js文件都引入
	glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}

//链接数据库
connect = () =>{
	//连接数据库
	mongoose.connect(db)
	//连接数据库的次数
	connectCount = 0
	return new Promise((resolve,reject)=>{
		//添加连接数据库监听
		
		//监听数据库断开连接
		mongoose.connection.on('disconnect',err=>{
			//如果连接次数大于三次就不再重新连接数据库
			console.log('数据库断开连接')
			if(connectCount<=3){
				mongoose.connect(db)
				connectCount ++
			}else{
				reject(err)
				throw new Error('数据库出现了问题,无法自动修复')
			}
		})
		//监听数据库连接失败
		mongoose.connection.on('error',err=>{
			//如果连接次数大于三次就不再重新连接数据库
			console.log('数据库连接错误')
			if(connectCount<=3){
				mongoose.connect(db)
				connectCount ++
			}else{
				reject(err)
				throw new Error('数据库出现了问题,无法自动修复')
			}
		})
		
		//监听数据库连接成功
		mongoose.connection.once('open',()=>{
			console.log('数据库连接成功')
			resolve()
		})
	})
}
module.exports = {
	initSchema,
	connect
}

