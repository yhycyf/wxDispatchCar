/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-25 16:59:15
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js

import { appid } from "../../../../../utils/wxRequest";
import api from '../../../../../api/api';
import utils from '../../../../../utils/index'
// 获取应用实例
const app = getApp()

Page({
  options: {
    addGlobalClass: true
  },
  data: {
    radio: '',
    disabled: false,
    carList: []
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

  // 删除车辆
  async removeCar(e) {
    // console.log('e', e);
    const { instance } = e.detail;
    let icVin = e.currentTarget.dataset.item.vin;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除该车辆吗？',
      success: async function(res) {
        if (res.confirm) {
          let res = await api.deletePersonageCar({
            icVin: icVin
          })
          if(res.flag) {
            that.getUserPersonageCar();
            utils.showToast(res.message,'success');
          } else {
            utils.showToast(res.message);
          }
        } else if (res.cancel) {
          
        }
        instance.close();
      }
    })
    
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
    if(res.flag) {
      this.setData({
        carList: res.data
      })
    } else {
      utils.showToast(res.message)
    }
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
