/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-19 10:12:32
 */

import api from '../../api/api'
import utils from '../../utils/index';
const app = getApp();
Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },

  data: {
    
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      console.log('attached');
      // this.getLocation();
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
    async getPhoneNumber (e) {
      console.log('e', e)

      let detail = e.detail;
      if (detail.errMsg == "getPhoneNumber:fail user deny" || detail.errMsg == "getPhoneNumber:fail:user denied") {
        wx.showToast({
          title: '需要授权才能继续哦~',
          icon: 'none',
          duration: 1500
        })
        return false;
      }

      let res = await api.userInformationStorage({
        encryptedData: detail.encryptedData,
        vi: detail.iv
      });
      if(res.flag) {
        let getPhone = await api.getScooterOrder();
        if(getPhone.flag) {
          if(!wx.getStorageSync('userPhone')) {
            wx.setStorageSync('userPhone',getPhone.data.upPhone);
          }
          this.triggerEvent('getPhoneNumber');
        } else {
          utils.showToast(getPhone.message);
        }
      } else {
        utils.showToast(getPhone.message);
      }
      console.log('手机信息解密', res)
    }
  }

});