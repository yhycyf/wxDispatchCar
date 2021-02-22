/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-22 14:29:22
 */

// import utils, { cdnUrl } from '@/utils/index';
import utils from '../../utils/wxRequest'
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  observers: {
    
  },

  // 属性定义（详情参见下文）
  properties: {
    height: {
      type: Number,
      value: 0
    },
  },

  data: {
    updated: false,  //地图初始化完成
    beginRegionchange: false, //是否获取中心地点
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      id: 1,
      latitude: 23.099994,
      longitude: 113.324520,
      iconPath: '/image/location.png'
    }],
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
      this.mapCtx = wx.createMapContext('myMap',this);
      console.log('ready');
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
    bindupdated() {
      if(this.data.updated) return;
      this.setData({
        updated: true
      })
      console.log('初始化完成')
      this.moveToLocation();
    },
    regionchange(e) {
      console.log('执行', e)
      let str = e.detail.centerLocation;
      let that = this;
      let lat= "markers[0].latitude";
      let log= "markers[0].longitude";
      if(e.type == 'end') {
        var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + str.latitude + "," + str.longitude + "&key=" + 'P5TBZ-ZMSE6-G7WS3-EW2FS-7WO6K-N7FRL' + "&get_poi=1";
        wx.request({
          url: getAddressUrl,
          success: function (result) {
            console.log('result', result)
            that.setData({
              [lat]: result.data.result.location.lat,
              [log]: result.data.result.location.lng,
            })
            that.triggerEvent('locationEvent', {result: result.data.result})
            // var province = result.data.result.address_component.province;//省
            // var city = result.data.result.address_component.city;//市
            // var district = result.data.result.address_component.district;//区
            // var address = result.data.result.formatted_addresses.recommend;//具体地址范围
            // console.log('省市县:' + province + city + district)
            // console.log('地址：' + address)       
            // that.setData({
            //   address: province + city + address
            // })
          }
        })
      }
    },
    getLocation () {
      var that = this;
      let lat= "markers[0].latitude";
      let log= "markers[0].longitude";
      
      wx.getLocation({
        type: "wgs84",
        success: function(res){
          console.log('res', res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            [lat]: res.latitude,
            [log]: res.longitude
          })

        }
      })
    },
    async moveToLocation () {
      let that = this;
      let setting = await utils.getSetting('scope.userLocation');
      console.log('setting', setting)
      if(setting) {
        this.mapCtx.moveToLocation();
        //获取地图中心位置坐标
        this.mapCtx.getCenterLocation({
          success(res) {
            let e = {
              detail: {
                centerLocation: {
                  longitude: res.longitude,
                  latitude: res.latitude
                }
              }
            }
            
            that.regionchange(e);
          }
        })
      } else {
        this.moveToLocation();
      }
    }
  }

});