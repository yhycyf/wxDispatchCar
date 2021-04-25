/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-25 11:06:17
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import utils from '../../../utils/index';
import api from '../../../api/api';
import {showTime} from '../../../utils/format';
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 0,
    formList1: [],
    formList2: [],
    formList3: [],
    formList4: []
  },
  onChange(event) {
    this.requestAll(event.detail.name);
  },

  cancelOrder(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '您确认要取消订单吗？',
      async success (res) {
        if (res.confirm) {
          let res = await api.scooterOrderCancel({

          });
          if(res.flag) {
            utils.showToast(res.message,'success')
          } else {
            utils.showToast(res.message)
          }
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  async requestAll(tab) {
    let activeIndex = tab || 0;
    let apiArr = ['getUserPersonageFrom', 'getPendingPayment', 'getProcessing', 'getCompleted'];
    apiArr.forEach(async (apiItem,apiIndex)=> {
      if(Number(activeIndex) == Number(apiIndex)) {
        let res = await api[apiItem]();
        if(res.flag) {
          let newArr = ()=> {
            let arr = res.data;
            return new Promise((resolve)=> {
              arr.forEach(async (item,index)=> {
                item.sfOutCarTime = showTime(new Date(item.sfOutCarTime));
                let result = await utils.getAddress({
                  latitude: item.outCarSiteLatitude,
                  longitude: item.outCarSiteLongitude,
                })
                item.sfOutCarSite = result.address;
                if(index == arr.length - 1) {
                  await utils.sleep(50);
                  resolve(arr);
                }
              });
            })
          }
          let newResult = await newArr();
          let formList = 'formList' + (apiIndex + 1);
          this.setData({
            [formList]: newResult
          })
          console.log(formList,newResult)
        } else {
          utils.showToast(res.message)
        }
      }
    })
  },

  async onShow() {
    this.requestAll();
  },
  onLoad() {
    
  },
})
