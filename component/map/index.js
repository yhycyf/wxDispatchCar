/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-08 16:23:19
 */

// import utils, { cdnUrl } from '@/utils/index';
const app = getApp();
Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    getOn: {
      type: Boolean,
      value: true
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
     
      
    },
    moved: function() { },
    detached: function() { },
    ready: function() {
      console.log('ready');
      this.mapCtx = wx.createMapContext('myMap');
      this.mapCtx.moveToLocation();
      const lat= "markers[0].latitude";
      const log= "markers[0].longitude";
      var that = this;
      setTimeout(function() {
        wx.getLocation({
          type: "wgs84",
          success: function(res){
            console.log('res', res)
            that.setData({
              latitude: res.latitude,
              longitude: res.longitude,
              // [lat]:res.latitude,
              // [log]:res.longitude
            })
          }
        })
        
      },2000)
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

  
  }

});