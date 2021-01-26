// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

/// 这是演示tcb-router的用法：
// wx.cloud.callFunction({
//   name: 'tcbRouter',
//   data: {
//     $url: 'music'
//   }
// }).then(res => {
//   console.log(res);
// })

/// tcb-router对云函数优化：1.每个用户的一个云环境中云函数个数有限制
/// 相似的请求归类到同一类云函数中处理
/// tcb-router是koa风格的云函数路由库
const TcbRouter = require('tcb-router');

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event});

  app.use(async(ctx, next) => {
    ctx.data = {};
    ctx.data.openId = event.userInfo.openId;
    await next();
  });

  app.router('music', async(ctx, next) => {
    ctx.data.musicName = '该怎么说再见';
    await next();
  }, async (ctx, next) => {
    ctx.data.musicType = '伤感';
    ctx.body = {
      data: ctx.data,
    }
  });

  app.router('movie', async(ctx, next) => {
    ctx.data.movieName = '千与千寻';
    await next();
  }, async (ctx, next) => {
    ctx.data.movieType = '动画片';
    ctx.body = {
      data: ctx.data,
    }
  });

  return app.serve();
  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}