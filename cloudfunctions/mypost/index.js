// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const TcbRouter = require('tcb-router');

// 云数据库
const db = cloud.database();
const postCollection = db.collection('post');

const MAX_LIMIT_NUM = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event});

  app.router('list', async (ctx, next) => {
    const keyword = event.keyword;
    let w = {};
    if(keyword.trim() != ''){
      /// 用云数据库支持的正则去模糊查询
      w = {
        content: db.RegExp({
          regexp: keyword,
          options: 'i'
        })
      }
    }
    let postList = await postCollection.where(w).skip(event.start).limit(event.count).orderBy('createTime', 'desc').get().then(res=>{
      return res.data;
    });
    ctx.body = postList;
  });

  app.router('detail', async (ctx, next) => {
    let postId = event.postid;
    //博客正文数据
    let detail = await postCollection.where({
      _id: postId
    }).get().then(res=>{
      return res.data;
    });
    // 评论查询
    const countResult = await postCollection.count();
    const total = countResult.total;
    let commentList = {
      data: []
    }
    if(total > 0) {
      const batchTimes = Math.ceil(total / MAX_LIMIT_NUM);
      const tasks = [];
      for(let i =0;i < batchTimes; i++){
        let promise = db.collection('post-comment').skip(i*MAX_LIMIT_NUM).limit(MAX_LIMIT_NUM).where({
          postId,
        }).orderBy('createTime', 'desc').get();
        tasks.push(promise);
      }
      if(tasks.length > 0){
        commentList = (await Promise.all(tasks)).reduce((acc, cur) => {
          return {
            data: acc.data.concat(cur.data),
          }
        })
      }
    }
    ctx.body = {
      commentList,
      detail,
    }
  });
  return app.serve();
}