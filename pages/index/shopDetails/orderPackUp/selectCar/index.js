/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-09 18:30:24
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  options: {
    addGlobalClass: true
  },
  data: {
    radio: '',
    disabled: false
  },

  onReady: function (e) {
    
  },
  onChange(event) {
    if(this.data.disabled) {
      return;
    }
    this.setData({
      radio: event.detail,
    });
  },

  // 添加车辆
  goAddCar() {
    wx.navigateTo({
      url: '/pages/index/shopDetails/orderPackUp/addCar/index'
    })
  },

  onClick(event) {
    if(this.data.disabled) {
      return;
    }
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  onLoad(opt) {
    console.log('opt', opt)
    this.setData({
      disabled: opt.disabled == 'true' ? true : false
    })
  },
})
