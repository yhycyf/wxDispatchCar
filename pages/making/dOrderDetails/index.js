/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-20 14:55:16
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import api from '../../../api/api';
import utils from '../../../utils/index';
import { showTime } from '../../../utils/format'
const app = getApp();

Page({
  data: {
    motto: 'Helelo World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    value: '',
    detailInfo: {}, //订单详情
    orderProgress: {
      // orderStatus: 13
    }, //订单进展
    unFlod1: false,  //是否显示展开
    unFlod2: false,  //是否显示展开
    rotate: false,
    timer: null,
    localizedMessage: '',
  },
  calling:function(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.orderProgress.auserPhone, //此号码并非真实电话号码，仅用于测试
      success:function(){
        console.log("拨打电话成功！")
      },
      fail:function(){
        console.log("拨打电话失败！")
      }
    })
  },
  unFlod1() {
    if(this.data.unFlod1) {
      this.setData({
        unFlod1: false
      })
    } else {
      this.setData({
        unFlod1: true
      })
    }
  },
  unFlod2() {
    if(this.data.unFlod2) {
      this.setData({
        unFlod2: false
      })
    } else {
      this.setData({
        unFlod2: true
      })
    }
  },
  async reLoad() {
    if(this.data.rotate) return;
    this.setData({
      rotate: true
    })
    await utils.sleep(1000);
    this.setData({
      orderProgress: {},
    })
    this.orderProgress();
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
  // 查看订单
  async dangerousScooter() {
    let res = await api.dangerousScooter();
    if(res.flag) {
      let detailInfo = res.data;
      let lat = {
        latitude: detailInfo.deliveryAddressLatitude,
        longitude: detailInfo.deliveryAddressLongitude
      }
      detailInfo.carDeliveryTime = showTime(new Date(detailInfo.deliveryTime));
      console.log('carDeliveryTime', detailInfo.carDeliveryTime)
      detailInfo.carDeliverylocation = (await utils.getAddress(lat)).address;
      this.setData({
        detailInfo: detailInfo
      })
      console.log('订单详情', res)
    } else {
      utils.showToast(res.message)
    }
  },

  // 订单进展
  async orderProgress() {
    let that = this;
    let timeObj;
    let res = await api.orderProgress();
    if(res.flag) {
      that.setData({
        orderProgress: res.data,
        localizedMessage: res.localizedMessage,
        rotate: false
      })
      if(res.data.endTime) {
        date = utils.countDownString(res.data.endTime);
        that.setData({
          'orderProgress.countDown': date
        })
        clearInterval(that.data.timer);
        that.data.timer = setInterval(() => {
          if(timeObj.timestamp <= 0) {
            clearInterval(that.data.timer);
          } else {
            timeObj = utils.countDownString(res.data.endTime);
          }
          that.setData({
            'orderProgress.countDown': timeObj.times
          })
        }, 1000);
      }
      console.log('订单进展', res)
    } else {
      utils.showToast(res.message)
    }
  },
  
  // 取消订单
  async cancelDetail() {
    let id = this.data.detailInfo.orderId;
    let res = await api.scooterOrderCancel({
      scooterFormId: id
    });
    if(res.flag) {
      utils.showToast(res.message, 'success', 1500);
      await utils.sleep(1500);
      wx.redirectTo({
        url: '/pages/making/dOrderDetails/index'
      })
      console.log('取消订单成功', res)
    } else {
      utils.showToast(res.message)
    }
    console.log('取消订单', res)
  },
  onShow() {
    this.dangerousScooter();
    this.orderProgress();
  },
  onLoad() {
    
  },
})
