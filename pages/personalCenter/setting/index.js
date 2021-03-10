/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-10 14:16:34
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 0
  },
  changePhone() {
    wx.navigateTo({
      url: `/pages/personalCenter/changePhone/index`
    })
  },
  onLoad() {
    
  },
})
