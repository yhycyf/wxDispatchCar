/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-19 14:50:24
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
    loginBtn: false,
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
  async wxLogin() {
    if(!wx.getStorageSync('userId')) {
      let res = await api.login();
      if(res.flag) {
        if(res.data.isNewUser) {
          this.setData({
            loginBtn: true
          })
        }
      } else {
        utils.showToast(res.message, 'none', 1500)
      }
    }
    // console.log('用户登录', res)
  },
  // 授权手机号回调
  getPhoneNumber(e) {
    if(e.detail.flag) {
      this.setData({
        loginBtn: false
      })
      utils.showToast('登录成功', 'success', 1500)
    } else {
      utils.showToast(e.detail.message, 'none', 1500)
    }
  },
  onLoad() {
    this.wxLogin();
  },
})
