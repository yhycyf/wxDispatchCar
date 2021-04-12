/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-10 11:00:16
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import api from '../../../../api/api';
import utils from '../../../../utils/index';
const app = getApp()

Page({
  data: {
    phone: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    payStatus: true
  },
  // 查看订单
  navigateBack() {
    wx.navigateBack();
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  async getScooterOrder() {
    let res = await api.getScooterOrder();
    if(res.flag) {
      this.setData({
        phone: res.data.upPhone
      })
      wx.setStorageSync('userPhone',res.data.upPhone)
    } else {
      utils.showToast(res.message)
    }
  },
  onLoad() {
    this.getScooterOrder();
  },
})
