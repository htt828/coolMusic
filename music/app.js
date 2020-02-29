const KOA = require('koa')
const app = new KOA()
const Router = require('koa-router');
const init = require('./database/init.js')
const bodyparser = require('koa-bodyparser')
//koa-cors处理跨域
const cors = require('koa2-cors')
const session = require('koa-session');


app.use(bodyparser())
app.use(cors())

//引入路由模块
let index = require('./database/api/index.js')
let user = require('./database/api/user.js')

let router = new Router()
router.use('/index',index.routes())
router.use('/user',user.routes())

//加载路由中间模块
app.use(router.routes())//启动路由
app.use(router.allowedMethods())

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

;(async (ctx)=>{
	//连接数据
	await init.connect()
	//初始化schema
	init.initSchema()
})()

app.use(async(ctx,next)=>{
	ctx.body = 'hello'
	next()
})

app.listen(3000,()=>{
	console.log('listen 3000...')
})