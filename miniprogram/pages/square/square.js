// pages/square/square.js
let keyword = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalShow: false,
    postList: [],
  },

  /// 发布功能
  onPublish(){
    // 判断用户是否授权
    wx.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.onLoginSuccess({
                detail: res.userInfo
              });
            }
          })
        }else {
          this.setData({
            modalShow: true,
          })
        }
      }
    })
  },
  onLoginSuccess(event){
    const detail = event.detail;
    wx.navigateTo({
      url: `../postedit/postedit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },
  onLoginFail(){
    wx.showModal({
      title: '授权用户才能发布帖子',
      content: '',
    })
  },
  onSearch(event){
    // console.log(event.detail.keyword)
    this.setData({
      postList: []
    });
    keyword = event.detail.keyword;
    this._loadPostList(0);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadPostList();
  },
  _loadPostList(start = 0){
    wx.showLoading({
      title: 'loading...',
    })
    /// 调用云函数
    wx.cloud.callFunction({
      name: 'mypost',
      data: {
        $url: 'list',
        start: start,
        count: 10,
        keyword,
      }
    }).then(res => {
      this.setData({
        postList: this.data.postList.concat(res.result)
      })
      wx.hideLoading()
    }).catch(err => {
      console.error(err)
      wx.hideLoading()
    })
  },
  goComment(event){
    wx.navigateTo({
      url: `../../pages/postcomment/postcomment?postid=${event.target.dataset.postid}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      postList: []
    })
    this._loadPostList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadPostList(this.data.postList.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (event) {
    console.log(event)
    let postObj = event.target.dataset.post;
    return {
      title: postObj.content,
      path: `/pages/postcomment/postcomment?postid=${postObj._id}`,
      // imageUrl: '',
    }
  }
})