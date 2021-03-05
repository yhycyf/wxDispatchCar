/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-04 18:44:23
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
    
  },

  goOrderDetails() {
    wx.navigateTo({
      url: '/pages/index/shopDetails/orderPackUp/orderDetails/index'
    })
  },

  onReady: function (e) {
    
  },
  

  onLoad() {
    
  },
})
