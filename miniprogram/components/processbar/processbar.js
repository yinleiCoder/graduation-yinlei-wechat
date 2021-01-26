// components/processbar/processbar.js
let movableAreaWidth = 0;
let movableViewWidth = 0; 
const backgroundManager = wx.getBackgroundAudioManager();
let currentSec = -1;
let duration = 0;
let isMoving = false;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00',
    },
    movableDis: 0,
    progress: 0,
  },

  lifetimes: {
    ready() {
      this._getMovableDis();
      this._bindBGEvent();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      /// 触发原因: 拖动
      if(event.detail.source == 'touch'){
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100;
        this.data.movableDis = event.detail.x;
        isMoving = true;
      }
    },
    onTouchEnd(){
      const currentTimeFmt = this._dateFormat(Math.floor(backgroundManager.currentTime));
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        ['showTime.currentTime']: currentTimeFmt.min + ":" + currentTimeFmt.sec
      })
      backgroundManager.seek(duration * this.data.progress / 100)
      isMoving = false;
    },
    _getMovableDis() {
      const query = this.createSelectorQuery();
      query.select('.movable-area').boundingClientRect();
      query.select('.movable-view').boundingClientRect();
      query.exec((rects) => {
        movableAreaWidth = rects[0].width;
        movableViewWidth = rects[1].width;
      });
    },
    _bindBGEvent(){
      backgroundManager.onPlay(() => {
        console.log('onPlay')
        isMoving = false;
        this.triggerEvent('musicPlay')
      })
      backgroundManager.onStop(() => {
        console.log('onStop')
      })
      backgroundManager.onPause(() => {
        console.log('onPause')
        this.triggerEvent('musicPause')
      })
      backgroundManager.onWaiting(() => {
        console.log('onWaiting')
      })
      backgroundManager.onCanplay(() => {
        console.log('onCanplay')
        if(typeof backgroundManager.duration != 'undefined'){
          this._setTime();
        }else {
          setTimeout(() => {
            this._setTime();
          }, 1000);
        }
      })
      backgroundManager.onTimeUpdate(() => {
        console.log('onTimeUpdate')
        if(!isMoving) {
          const currentTime = backgroundManager.currentTime;
          const duration = backgroundManager.duration;
          const sec = currentTime.toString().split('.')[0];
          if(sec != currentSec){
            const currentTimeFmt = this._dateFormat(currentTime);
            this.setData({
              movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
              progress: currentTime / duration * 100,
              ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`
            })
            currentSec = sec;
            /// 聯動歌詞
            this.triggerEvent('timeupdate', {
              currentTime
            })
          }
        }
      })
      backgroundManager.onEnded(() => {
        console.log('onEnded')
        this.triggerEvent('musicEnd')
      })
      backgroundManager.onError((err) => {
        console.error(err.errMsg);
        console.error(err.errCode);
        wx.showToast({
          title: '错误:' + err.errCode,
        })
      })
    },
    _setTime(){
      duration = backgroundManager.duration;
      const durationFmt = this._dateFormat(duration);
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
      })
    },
    _dateFormat(sec){
      const min = Math.floor(sec / 60);
      sec = Math.floor(sec % 60);
      return {
        'min': this._parse0(min),
        'sec': this._parse0(sec)
      }
    },
    _parse0(sec) {
      return sec< 10 ? '0' + sec : sec;
    }
  }
})
