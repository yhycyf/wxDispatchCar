/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-02 17:06:58
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 2,
    
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
