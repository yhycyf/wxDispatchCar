/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-09 11:00:06
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
import utils from '../../utils/index';
import api from '../../api/api';
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
    verifyIdentity: 0,
    drivingCertification: 0,
  },
  goNameAuthentication() {
    wx.navigateTo({
      url: '/pages/nameAuthentication/index'
    })
  },
  goCarAuthentication() {
    if(this.data.verifyIdentity == 0) {
      utils.showToast('请先完成第一步身份认证!');
      return;
    }
    wx.navigateTo({
      url: '/pages/carAuthentication/index'
    })
  },
  submit() {
    wx.navigateTo({
      url: '/pages/making/index'
    })
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
  async safetyVerification() {
    let res = await api.safetyVerification();
    if(res.flag) {
      this.setData({
        drivingCertification: res.data.drivingCertification,
        verifyIdentity: res.data.verifyIdentity
      })
    } else {
      utils.showToast(res.message, 'none', 2000);
    }
    // console.log('安全验证', res)
  },
  onShow() {
    this.safetyVerification()
  },
  onLoad() {
    
  },
})
