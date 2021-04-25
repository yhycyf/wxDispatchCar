/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-25 17:32:10
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import utils from '../../../utils/index';
import api from '../../../api/api';
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    phoneValue: '',
    nameValue: '',
    countDown: 0,
    times: null
  },
  async submit() {
    let phone = this.data.phoneValue;
    let nameValue = this.data.nameValue;
    if(!phone) {
      utils.showToast('请输入手机号!');
      return;
    } else if(!nameValue) {
      utils.showToast('请输入验证码!');
      return;
    } else {
      utils.showLoading();
      let res = await api.updateUpPhone({
        code: nameValue,
        phone: phone
      });
      if(res.flag) {
        utils.showToast(res.message, 'success',1500);
        utils.sleep(1500);
        wx.redirectTo({
          url: `/pages/personalCenter/changePhone/success/index`
        })
      } else {
        utils.showToast(res.message);
        this.setData({
          nameValue: ''
        })
      }
      utils.hideLoading();
    }
  },
  onChangePhone(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      phoneValue: event.detail
    });
  },
  onChangeName(event) {
    // event.detail 为当前输入的值
    this.setData({
      nameValue: event.detail
    })
    console.log(event.detail);
  },
  // 发送验证码
  async sendCode() {
    let phone = this.data.phoneValue;
    if(this.data.countDown > 0) {
      return;
    } else if(!phone) {
      utils.showToast('请输入手机号!');
      return;
    }
    if(!phone) return;
    let flag = utils.isPhone(phone);
    console.log('phone', phone)
    if(flag) {
      this.setData({
        countDown: 60
      })
      let res = await api.scooterOrderCode({
        upPhone: phone
      });
      if(res.flag) {
        utils.showToast(res.message);
        clearInterval(this.data.times);
        this.data.times = setInterval(() => {
          if(this.data.countDown > 0) {
            this.setData({
              countDown: this.data.countDown - 1
            })
          } else {
            clearInterval(this.data.times);
            this.setData({
              countDown: 0
            })
          }
        }, 1000);
      } else {
        this.setData({
          countDown: 0
        })
        utils.showToast(res.message);
      }
      console.log('手机号验证', res)
    } else {
      utils.showToast('手机号输入有误！请重新输入')
    }
  },
  onLoad() {
    
  },
})
