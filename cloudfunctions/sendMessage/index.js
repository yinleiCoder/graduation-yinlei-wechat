// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  // 消息模板推送
  const result = await cloud.openapi.subscribeMessage.send({
    touser: OPENID,
    page: `/pages/postcomment/postcomment?postid=${event.postId}`,
    lang: 'zh_CN',
    data: {
      phrase1: {
        value: '评论完成',
      },
      thing2: {
        value: event.content,
      }
    },
    templateId: 'T2uSiCzR018auHxbBV25rav1bKwQD--0YBpL5s5lR5Q',
    miniprogramState: 'developer'
  });
  //   templateId: 'T2uSiCzR018auHxbBV25rav1bKwQD--0YBpL5s5lR5Q',
  //   formId: event.formId
  // })
  return result;
}