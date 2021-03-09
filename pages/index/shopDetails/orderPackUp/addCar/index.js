/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-02 14:49:23
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
    radio: true,
    value: '',
  },
  submit() {

  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onLoad() {
    
  },
})
