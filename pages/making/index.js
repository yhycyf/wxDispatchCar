/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-14 16:08:35
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import {formatTime} from '../../utils/format';
import utils from '../../utils/index'
import { appid } from '../../utils/wxRequest';
import api from '../../api/api';
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
    form: {
      code: '',
      name: '',
      phone: '',
      scooterFormId: '',
      sfOutCarSite: '',
      sfOutCarTime: '',
      upPhone: ''
    },
    userCategory: '',  //用户类型
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
    
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  async submit(e) {
    let form = e.detail;
    utils.showLoading();
    let res = await api.scooterOrder(form);
    utils.hideLoading();
    if(res.flag) {
      let userCategory = this.data.userCategory;
      if(userCategory == 0 || userCategory == 1) { //保险公司带礼品码或者不带礼品码的用户
        wx.redirectTo({
          url: '/pages/making/dOrderDetails/index'
        })
      } else if(userCategory == 2) {  //普通用户
        wx.redirectTo({
          url: '/pages/dDelayedCar/index'
        })
      }
    } else {
      utils.showToast(res.message);
    }
    console.log('预约', res)
  },
  async ifUserType() {
    let res = await api.ifUserType();
    this.setData({
      userCategory: res.data.userCategory
    })
    console.log('用户类型', res)

  },
  onLoad() {
    this.ifUserType();
  },
})
