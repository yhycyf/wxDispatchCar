/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-15 17:57:18
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import api from '../../../api/api';
import utils from '../../../utils/index';
const app = getApp();

Page({
  data: {
    complete: true,
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    value: '',
    id: 1,
  },
  waitReturnCar() {
    wx.navigateTo({
      url: '/pages/dDelayedCar/index'
    })
  },
  // 立即还车
  goReturnCarPage() {
    wx.navigateTo({
      url: '/pages/applyReturnCar/index'
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

  async scooterOrderDetails() {
    let id = this.data.id;
    let res = await api.scooterOrderDetails({
      scooterFormId: id
    });
    if(res.flag) {
      console.log('订单详情', res)
    } else {
      utils.showToast(res.message)
    }
  },
  // 取消订单
  async cancelDetail() {
    let res = await api.scooterOrderCancel({
      scooterFormId: id
    });
    if(res.flag) {
      console.log('取消订单成功', res)
    } else {
      utils.showToast(res.message)
    }
    console.log('取消订单', res)
  },
  onShow() {
    this.scooterOrderDetails();
  },
  onLoad() {
    
  },
})
