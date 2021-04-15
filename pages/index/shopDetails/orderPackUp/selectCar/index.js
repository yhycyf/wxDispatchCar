/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-12 09:50:21
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js

import { appid } from "../../../../../utils/wxRequest";
import api from '../../../../../api/api';

// 获取应用实例
const app = getApp()

Page({
  options: {
    addGlobalClass: true
  },
  data: {
    radio: '',
    disabled: false
  },

  onReady: function (e) {
    
  },
  onChange(event) {
    if(this.data.disabled) {
      return;
    }
    this.setData({
      radio: event.detail,
    });
  },

  // 添加车辆
  goAddCar() {
    wx.navigateTo({
      url: '/pages/index/shopDetails/orderPackUp/addCar/index'
    })
  },

  onClick(event) {
    if(this.data.disabled) {
      return;
    }
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },

  async getUserPersonageCar() {
    let res = await api.getUserPersonageCar();
    console.log('车辆查询', res)
  },

  onLoad(opt) {
    console.log('opt', opt)
    this.setData({
      disabled: opt.disabled == 'true' ? true : false
    })
  },
  onShow() {
    this.getUserPersonageCar();
  },
})
