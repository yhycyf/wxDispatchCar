/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-02-09 15:31:33
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    show: true,
    actions: [
      { name: '获取用户信息', color: '#07c160', openType: 'getUserInfo' },
    ],
  },
  onReady: function (e) {
    
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  moveToLocation() {
    console.log('执行')
    this.selectComponent('#map').moveToLocation();
  },
  onLoad() {
    
  },
})
