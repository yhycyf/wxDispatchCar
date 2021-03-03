/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-03 17:36:25
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    optionValue: [
      { text: '北京', value: 0 },
    ],
    cityValue: 0,
    seachValue: '',

    option1: [
      { text: '智能排序', value: 0 },
      { text: '路程最近', value: 1 },
      { text: '人气最高', value: 2 },
    ],
    option2: [
      { text: '业务类型', value: 0 },
      { text: '好评排序', value: 1 },
      { text: '销量排序', value: 2 },
    ],
    option3: [
      { text: '保司推荐', value: 0 },
      { text: '好评排序', value: 1 },
      { text: '销量排序', value: 2 },
    ],
    value1: 0,
    value2: 0,
    value3: 0,
  },

  onReady: function (e) {
    
  },
  goCollect() {
    wx.navigateTo({
      url: '/pages/index/more/collect/index'
    })
  },

  onLoad() {
    
  },
})
