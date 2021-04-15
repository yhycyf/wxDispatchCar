/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-14 16:46:57
 */
import wxRequest from '../../utils/wxRequest'
import {showTime, formatTime} from '../../utils/format'
import utils from '../../utils/index'
import api from '../../api/api'
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    type: {
      type: String,
      value: ''
    },
    getCarLocation: {
      type: String,
      value: ''
    }
  },

  data: {
    show: false,
    showTipsBox: true,
    getCarTime: '',
    checked: false,
    countDown: 0,
    isShowcountDown: false,
    times: null,
    sfOutCarTime: '',
    sendDataForm: {
      code: '',
      name: '',
      phone: '',
      sfOutCarTime: '',
      outCarSiteLongitude: '',  //经度
      outCarSiteLatitude: '',   //维度
    },
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      console.log('attached');
      // this.getLocation();
      this.getScooterOrder();
    },
    moved: function() { },
    created: function() {
      console.log('created')
    },
    detached: function() {},
    ready: function() {
      
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() { 
      console.log('show');
      
    },
    hide: function() { },
    resize: function() { }
  },

  methods: {
    async getScooterOrder() {
      let res = await api.getScooterOrder();
      if(res.flag) {
        this.setData({
          'sendDataForm.phone': res.data.upPhone,
          'sendDataForm.name': res.data.name,
        })
        if(!wx.getStorageSync('userPhone')) {
          wx.setStorageSync('userPhone',res.data.upPhone)
        }
      }
      console.log('用户信息', res)
    },
    submit(e) {
      let type = this.data.type;
      if(type == 'send') {
        let form = this.data.sendDataForm;
        console.log('表单数据', this.data.sendDataForm)
        if(!this.data.getCarLocation) {
          utils.showToast('请选择送车地点');
          return;
        } else if(!form.sfOutCarTime) {
          utils.showToast('请选择送车时间');
          return;
        } else if(!form.phone) {
          utils.showToast('请选输入您的手机号');
          return;
        } else if(!form.code) {
          utils.showToast('请选输入验证码');
          return;
        } else if(!form.name) {
          utils.showToast('请选输入姓名');
          return;
        } else if(!this.data.checked) {
          utils.showToast('请同意代步车使用协议');
          return;
        }

        this.triggerEvent('submit',this.data.sendDataForm)
        // this.triggerEvent('showPopup')
      } else {
        this.triggerEvent('goDelayedCarPage')
      }
    },
    showPopup() {
      let type = this.data.type;
      if(type == 'get') {
        this.triggerEvent('showPopup', {type: type})
      } else {
        this.setData({ show: true });
      }
    },
  
    // 同意协议
    onChangeAgree(event) {
      this.setData({
        checked: event.detail,
      });
    },
    async selectLocation() {
      let that = this;
      let type = this.data.type;
      let setting = await wxRequest.getSetting('scope.userLocation');
      if(setting) {
        wx.chooseLocation({
          success: function (e) {
            //允许打开定位
            console.log("开启了定位",e);
            that.setData({
              getCarLocation: e.address,
              'sendDataForm.outCarSiteLongitude': e.longitude,
              'sendDataForm.outCarSiteLatitude': e.latitude,
              showTipsBox: false
            })  
          },
        })
      }
      // wx.navigateTo({
      //   url: '/pages/applyReturnCar/getCarLocations/index',
      //   success: function(res) {
      //     // 通过eventChannel向被打开页面传送数据
      //     res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      //   }
      // })
    },
    getTips() {
      this.setData({
        getCarLocation: this.data.getCarLocation
      })
      this.closeTipsBox();
    },
    closeTipsBox(e) {
      this.setData({
        showTipsBox: false
      })
    },
    currentDate(event) {
      console.log('event.detail', event.detail)
      let currentDate = showTime(new Date(event.detail));
      this.setData({
        sfOutCarTime: currentDate,
        'sendDataForm.sfOutCarTime': formatTime(new Date(event.detail))
      })
    },
    // 输入手机号
    onChangePhone(event) {
      console.log('event', event)
      this.setData({
        'sendDataForm.phone': event.detail.value
      })
    },
    
    onChangeCode(event) {
      console.log('event', event)
      this.setData({
        'sendDataForm.code': event.detail.value
      })
    },
    // 发送验证码
    async sendCode() {
      if(this.data.countDown > 0) {
        return;
      }
      let phone = this.data.sendDataForm.phone;
      if(!phone) return;
      let flag = utils.isPhone(phone);
      console.log('phone', phone)
      if(flag) {
        let res = await api.scooterOrderCode({
          upPhone: phone
        });
        if(res.flag) {
          utils.showToast(res.message);
          this.setData({
            countDown: 60
          })
          clearInterval(this.data.times);
          this.data.times = setInterval(() => {
            if(this.data.countDown > 0) {
              this.setData({
                countDown: this.data.countDown - 1
              })
            } else {
              clearInterval(this.data.times);
              this.setData({
                countDown: 0,
                isShowcountDown: false
              })
            }
          }, 1000);
        } else {
          utils.showToast(res.message);
        }
        console.log('手机号验证', res)
      } else {
        utils.showToast('手机号输入有误！请重新输入')
      }
    },
  }

});