/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-10 14:48:18
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
    phoneValue: "",
    nameValue: ""
  },
  submit() {
    wx.navigateTo({
      url: `/pages/personalCenter/changePhone/success/index`
    })
  },
  onChangePhone(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChangeName(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onLoad() {
    
  },
})
