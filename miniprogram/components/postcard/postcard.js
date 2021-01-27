// components/postcard/postcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    post: Object,
  },


  observers: {
    ['post.createTime'](val) {
      if(val){
        this.setData({
          _createTime: this._formatTime(new Date(val))
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _createTime: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImg(event){
      const ds = event.target.dataset;
      wx.previewImage({
        urls: ds.imgs,
        current: ds.imgsrc,
      });
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
  }
})
