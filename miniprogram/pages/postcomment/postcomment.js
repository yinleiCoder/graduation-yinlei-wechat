// pages/postcomment/postcomment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {},
    commentList: [],
    postid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      postid: options.postid
    })
    this._getPostDetail()
  },
  _getPostDetail() {
    wx.showLoading({
      title: 'loading...',
      mask: true,
    });
    wx.cloud.callFunction({
      name: 'mypost',
      data: {
        $url: 'detail',
        postid: this.data.postid,
      }
    }).then(res => {
      // console.log(res);
      let commentList = res.result.commentList.data;
      for(let i =0, len =commentList.length; i < len; i++){
        commentList[i].createTime = this._formatTime(new Date(commentList[i].createTime))
      }
      this.setData({
        post: res.result.detail[0],
        commentList,
      })
      wx.hideLoading();
    })

  },
  _formatTime(date){
    let fmt = 'yyyy年MM月dd日 hh:mm:ss';
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
    }
    if(/(y+)/.test(fmt)){
      fmt = fmt.replace(RegExp.$1, date.getFullYear());
    }
    for(let k in o){
      if(new RegExp('('+k+')').test(fmt)){
        fmt = fmt.replace(RegExp.$1, o[k].toString().length === 1 ? '0' + o[k]: o[k]);
      }
    }
    return fmt;
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let postObj = this.data.post;
    return {
      title: postObj.content,
      path: `/pages/postcomment/postcomment?postid=${postObj._id}`,
      // imageUrl: '',
    }
  }
})