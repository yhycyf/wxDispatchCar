/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-02-09 14:00:45
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  moveToLocation() {
    console.log('执行')
    this.selectComponent('#map').moveToLocation();
  },
  onLoad() {
    
  },
})
