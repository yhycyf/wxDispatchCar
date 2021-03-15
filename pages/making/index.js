/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-15 15:51:16
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import {formatTime} from '../../utils/format'
const app = getApp();

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    show: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    value: '',
    status: 1, //0失败 1成功
    form: {}
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  goOrderDetail() {
    wx.navigateTo({
      url: '/pages/making/dOrderDetails/index'
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 送车时间
  sfOutCarSite(event) {
    this.setData({
      'form.sfOutCarSite': event.detail
    })
  },
  // 送车地点
  currentDate(event) {
    let currentTimes = formatTime(new Date(event.detail));
    this.setData({
      'form.sfOutCarTime': currentTimes
    })
  },
  onLoad() {
    
  },
})
