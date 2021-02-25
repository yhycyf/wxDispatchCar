/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-02-25 13:34:02
 * @LastEditors: Please set LastEditors
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
    radio: true,
    value: '',
  },
  // 单选框
  onChangeRadio(event) {
    this.setData({
      radio: event.detail,
    });
  },
  // tab切换
  onChangeTab(event) {
    // event.detail 为当前输入的值
    this.setData({
      active: event.detail.name
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 事件处理函数
  qualification() {
    wx.navigateTo({
      url: '/pages/idSafety/idSafety'
    })
  },
  onLoad() {
    
  },
})
