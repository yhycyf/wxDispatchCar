/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-04 17:11:55
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    starValue: 4.5
  },

  onReady: function (e) {
    
  },
  goOrderPackUp() {
    wx.navigateTo({
      url: '/pages/index/shopDetails/orderPackUp/index'
    })
  },
  onLoad() {
    
  },
})
