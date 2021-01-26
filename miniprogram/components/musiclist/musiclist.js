// components/musiclist/musiclist.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playingId: -1,
  },
  pageLifetimes: {
    show(){
      // console.log(app.getPlayMusicId());
     this.setData({
       playingId: parseInt(app.getPlayMusicId())
     })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelected(event){
      // console.log(event.currentTarget.dataset.musicid);
      this.setData({
        playingId: event.currentTarget.dataset.musicid,
      });
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${event.currentTarget.dataset.musicid}&index=${event.currentTarget.dataset.index}`,
      })
    },
  }
})
