/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-08 18:28:11
 */

// import utils, { cdnUrl } from '@/utils/index';
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    height: {
      type: Number,
      value: 0
    },
  },

  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园',
      // iconPath: '/image/location.png'
    }],
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      // console.log('attached');
      this.mapCtx = wx.createMapContext('myMap');
      this.getLocation();
    },
    moved: function() { },
    created: function() {
      // console.log('created')
    },
    detached: function() {},
    ready: function() {
      console.log('ready');
    }
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function() { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function() { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() { },
    hide: function() { },
    resize: function() { }
  },

  methods: {
    getLocation() {
      var that = this;
      const lat= "markers[0].latitude";
      const log= "markers[0].longitude";
      wx.getLocation({
        type: "wgs84",
        success: function(res){
          // console.log('res', res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })
        }
      })
    }
  }

});