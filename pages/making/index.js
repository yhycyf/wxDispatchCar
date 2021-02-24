/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-02-24 11:59:21
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 0,
    value: '',
  },
  onChangeTab(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      active: event.detail.index
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 事件处理函数
  idSafety() {
    wx.navigateTo({
      url: '/pages/making/idSafety'
    })
  },
  onLoad() {
    
  },
})
