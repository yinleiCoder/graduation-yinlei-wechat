// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


/// 生成B类小程序码

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const result = await cloud.openapi.wxacode.getUnlimited({
    scene: wxContext.OPENID,
    // page: 'pages/square/square',
  });
  // 结果是buffer,所以可以上传到云存储转换
  const upload = await cloud.uploadFile({
    cloudPath: 'qrcode/' + Date.now() + '-' +  Math.random() +'.png',
    fileContent: result.buffer,
  });
  return upload.fileID;
}