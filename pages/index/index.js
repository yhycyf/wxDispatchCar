/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-16 11:29:04
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import api from '../../api/api'
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    seachValue: '',
  },
  

  calling:function(){
    wx.makePhoneCall({
      phoneNumber: '12345678900', //此号码并非真实电话号码，仅用于测试
      success:function(){
        console.log("拨打电话成功！")
      },
      fail:function(){
        console.log("拨打电话失败！")
      }
    })
  },

  onReady: function (e) {
    
  },
  // 个人中心
  goUserCenter() {
    wx.navigateTo({
      url: '/pages/personalCenter/index'
    })
  },
  // 查看更多
  seeMore() {
    wx.navigateTo({
      url: '/pages/index/more/index'
    })
  },
  // 事件处理函数
  beginOrder() {
    wx.navigateTo({
      url: '/pages/qualification/index'
    })
  },
  moveToLocation() {
    this.selectComponent('#map').moveToLocation();
  },
  onLoad() {
    
  },
})
