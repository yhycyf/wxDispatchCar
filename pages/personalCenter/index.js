/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-09 17:42:20
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
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    value: '',
    radio: 0,
  },
  // 我的订单
  myOrder() {
    wx.navigateTo({
      url: '/pages/personalCenter/myOrder/index'
    })
  },
  // 车辆管理
  goSelectCar() {
    wx.navigateTo({
      url: `/pages/index/shopDetails/orderPackUp/selectCar/index?disabled=${true}`
    })
  },
  payment() {
    wx.navigateTo({
      url: '/pages/dDelayedCar/payment/index'
    })
  },
  // 单选框
  onChangeRadio(event) {
    this.setData({
      radio: event.detail,
    });
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    
  },
})
