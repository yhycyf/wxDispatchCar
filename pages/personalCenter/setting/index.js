/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-10 11:05:08
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
    active: 0,
    phone: '',
  },
  changePhone() {
    wx.redirectTo({
      url: `/pages/personalCenter/changePhone/index`
    })
  },
  getUserPhone() {
    let phone = wx.getStorageSync('userPhone');
    this.setData({
      phone: phone
    })
  },
  onLoad() {
    
  },
  onShow() {
    this.getUserPhone();
  }
})
