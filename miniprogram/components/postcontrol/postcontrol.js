// components/postcontrol/postcontrol.js
let userInfo = {};
const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    postid: String,
    post: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    loginShow: false,
    modalShow: false,
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(){
      /// 判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success: (res) => {
                userInfo =  res.userInfo
                // 显示评论modal
                this.setData({
                  modalShow: true,
                })
              }
            })
          }else {
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },
    onLoginSuccess(event){
      userInfo = event.detail;
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true,
        })
      })
    },
    onLoginFail(){
      wx.showModal({
        title: '只有用户登录，才能参与评论帖子',
        content: '',
      })
    },
    onSendComment(event){
      let content = event.detail.value.content;
      if(content.trim() == ''){
        wx.showModal({
          title: '参与的评论内容不应该为空哟！'
        })
        return;
      }
      wx.showLoading({
        title: '评论信息上传中...',
        mask: true,
      })
      /// 模板消息订阅
      wx.requestSubscribeMessage({
        tmplIds: ['T2uSiCzR018auHxbBV25rav1bKwQD--0YBpL5s5lR5Q'],
        success: (res) => {
          console.log(res)
          if(res['T2uSiCzR018auHxbBV25rav1bKwQD--0YBpL5s5lR5Q']  === 'accept'){
            /// 给用户推送模板消息
            wx.cloud.callFunction({
              name: 'sendMessage',
              data: {
                content,
                postId: this.properties.postid, // 这篇帖子id
              }
            }).then(res => {
              console.log(res);
            })
          }
        },
        fail: (err)=> {
          console.error(err)
        }
      });
      // let formId = event.detail.formId;
      /// 评论信息插入数据库
      // 一对N关系表
      db.collection('post-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          postId: this.properties.postid, // 这篇帖子id
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        }
      }).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '评论成功咯',
        })
        this.setData({
          modalShow: false,
          content: '',
        })    
        this.triggerEvent('refreshCommentList')    
      });
    },
  }
})
