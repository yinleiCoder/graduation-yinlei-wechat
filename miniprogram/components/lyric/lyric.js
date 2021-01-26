// components/lyric/lyric.js
let lyricHeight = 0;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: {
      type: Boolean,
      value: false,
    },
    lyric: String,
  },

  observers: {
    lyric(lrc) {
      console.log(lrc);
      this._parseLyric(lrc);
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowLyricIndex: 0,
    scrollTop: 0,

  },

  lifetimes: {
    ready(){
      wx.getSystemInfo({
        success: (res) => {
          /// 換算px和rpx
          lyricHeight = res.screenWidth / 750 * 64;
        },
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 兄弟組件閒傳值
    update(currentTime){
      console.log(currentTime)
      let lrcList = this.data.lrcList;
      if(lrcList.length == 0){
        return;
      }
      if(currentTime > lrcList[lrcList.length-1].time){
        if(this.data.nowLyricIndex != -1){
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      for(let i =0, len = lrcList.length; i < len;i++){
        if(currentTime <= lrcList[i].time){
          this.setData({
            nowLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break;
        }
      }
    },
    /// lrc歌詞文件解析
    _parseLyric(slyric) {
      let line = slyric.split('\n');
      console.log(line)
      let _lrcList = [];
      line.forEach(elem => {
        let time = elem.match(/\[(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?]/g);
        if(time!=null){
          let lrc = elem.split(time)[1];
          let timeReg = time[0].match(/(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?/);
          // 將時間轉換為秒
          let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000;
          _lrcList.push({
            lrc,
            time: time2Seconds,
          });
        }
      });
      this.setData({
        lrcList: _lrcList
      })
    }
  }
})
