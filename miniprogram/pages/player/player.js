// pages/player/player.js
let musiclist = [];
let nowPlayinIndex = 0;
let backgroundAudioManager = wx.getBackgroundAudioManager();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying: false,
    isLyricShow: false,
    lyric: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // {musicid: "1", index: "0"}
    // console.log(options)
    nowPlayinIndex = options.index;
    musiclist = wx.getStorageSync('musiclist');
    this._loadMusicDetail(options.musicid);
  },

  _loadMusicDetail(musicid){
    backgroundAudioManager.stop();
    let music = musiclist[nowPlayinIndex];
    // console.log(music);
    wx.setNavigationBarTitle({
      title: music.name,
    });
    this.setData({
      picUrl: music.picUrl,
      isPlaying: false,
    });
    app.setPlayMusicId(musicid);
    wx.showLoading({
      title: 'song loading...',
    })
    wx.cloud.callFunction({
      name: 'mymusic',
      data: {
        musicid,
        $url: 'musicUrl',
      }
    }).then(res => {
      // console.log(res);
      backgroundAudioManager.src = res.result.url
      backgroundAudioManager.title = res.result.name
      backgroundAudioManager.coverImgUrl = music.picUrl
      this.setData({
        isPlaying: true,
      })
      wx.hideLoading()

      // 加載歌詞
      wx.cloud.callFunction({
        name: 'mymusic',
        data: {
          $url: 'lyric',
          musicid,
        }
      }).then(res => {
        console.log(res);
        let lyric = '暫無歌詞';
        lyric = res.result.song;
        this.setData({
          lyric,
        })
      })
    })
  },

  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManager.pause();
    }else {
      backgroundAudioManager.play();
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  onPrev(){
    nowPlayinIndex--;
    if(nowPlayinIndex<0){
      nowPlayinIndex = musiclist.length - 1;
    }
    this._loadMusicDetail(`${musiclist[nowPlayinIndex].id}`)
  },

  onNext(){
    nowPlayinIndex++;
    if(nowPlayinIndex == musiclist.length){
      nowPlayinIndex = 0;
    }
    // 因为我云函数是mock数据，根据str类型判断的，所以musicid应该是str类型
    this._loadMusicDetail(`${musiclist[nowPlayinIndex].id}`)
  },
  onChangeLyricShow(){
    this.setData({
      isLyricShow: !this.data.isLyricShow
    })
  },
  /// 接受子組件傳遞過來的值並傳遞到其他子組件實現兄弟組件通信
  timeupdate(event){
    this.selectComponent('.lyric').update(event.detail.currentTime);
  },
  onPlay(){
    this.setData({
      isPlaying: true,
    })
  },
  onPause(){
    this.setData({
      isPlaying: false,
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

  }
})