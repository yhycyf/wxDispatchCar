/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-09 17:56:05
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
    }
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
  async submit(e) {
    console.log('回调数据', e)
    let form = e.detail;
    let res = await api.scooterOrder(form);
    console.log('预约', res)
  },
  onLoad() {
   let qqmapsdk = utils.qqmapsdk();

    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
          console.log('1111',res);
      },
      fail: function (res) {
          console.log('2222',res);
      },
      complete: function (res) {
          console.log('3333',res);
      }
    });
  },
})
