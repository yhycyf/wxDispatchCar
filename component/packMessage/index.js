/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-05 16:43:59
 */

// import utils, { cdnUrl } from '@/utils/index';
import wxRequest from '../../utils/wxRequest';
import utils from '../../utils/index'
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    type: { //不包括接送车的类型
      type: String,
      value: ''
    },
    getCarLocation: {
      type: String,
      value: ''
    },
    pickUp: {   //接送车
      type: Boolean,
      value: false
    }
  },

  data: {
    show: false,
    currentDate: '12:00',
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
      }

      return options;
    },
    show: false,
    serveTypeShow: false,
    showTipsBox: true,
    historyAddress: '北京 TBD云集中心',
    getCarTime: '',
    checked: false,
    serveType: '',
    actions: [
      {
        name: '服务一',
      },
      {
        name: '服务二',
      },
      {
        name: '服务三',
        subname: '描述信息',
        openType: 'share',
      },
    ],
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
    onServeTypeClose() {
      this.setData({ serveTypeShow: false });
    },
    // 服务方式
    serveTypeShow() {
      this.setData({ serveTypeShow: true });
    },
    // 服务方式
    onServeTypeSelect(event) {
      console.log(event.detail);
      this.setData({
        serveType: event.detail.name
      })
    },
    submit(e) {
      let type = e.currentTarget.dataset.type;
      this.triggerEvent('goOrderDetails')
    },
    showPopup(e) {
      let type = e.currentTarget.dataset.type;
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
      let setting = await wxRequest.getSetting('scope.userLocation');
      if(setting) {
        wx.chooseLocation({
          success: function (e) {
            //允许打开定位
            console.log("开启了定位",e);
            that.setData({
              getCarLocation: e.name
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
        getCarLocation: this.data.historyAddress
      })
      this.closeTipsBox();
    },
    closeTipsBox(e) {
      this.setData({
        showTipsBox: false
      })
    },
  }

});