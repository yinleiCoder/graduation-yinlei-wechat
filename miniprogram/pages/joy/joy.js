// pages/joy/joy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: [
      {
        url: 'https://img.zcool.cn/community/0198655dbc2d82a8012163baa58196.jpg@1280w_1l_2o_100sh.jpg',
      },
      {
        url: 'https://img.zcool.cn/community/01ce035dbc2d8fa8012163ba73e8f9.jpg@1280w_1l_2o_100sh.jpg',
      },
      {
        url: 'https://img.zcool.cn/community/01315b5dbc2d85a801209e1f2e5ccd.jpg@1280w_1l_2o_100sh.jpg',
      },
      {
        url: 'https://img.zcool.cn/community/0188ac5dbc2d92a801209e1fa01af2.jpg@1280w_1l_2o_100sh.jpg',
      },
      {
        url: 'https://img.zcool.cn/community/01f3f35dbc2d88a8012163ba542c39.jpg@1280w_1l_2o_100sh.jpg',
      },
      {
        url: 'https://img.zcool.cn/community/01a8375dbc2d96a8012163bae3c29f.jpg@1280w_1l_2o_100sh.jpg',
      },
    ],
    playlist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist();
    // wx.cloud.callFunction({
    //   name: 'tcbRouter',
    //   data: {
    //     $url: 'music'
    //   }
    // }).then(res => {
    //   console.log(res);
    // })
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
      playlist: []
    });
    this._getPlaylist();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getPlaylist() {
    wx.showLoading({
      title: 'loading',
    });
    /// 调用云函数
    wx.cloud.callFunction({
      name: 'mymusic',
      data: {
        start: this.data.playlist.length,
        count: 6,
        $url: 'playlist'
      }
    }).then(res => {
      this.setData({
        playlist: this.data.playlist.concat(res.result.data),
      });
      wx.stopPullDownRefresh();
      wx.hideLoading();
    });
  }
})