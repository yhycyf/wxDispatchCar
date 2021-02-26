/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-26 09:52:12
 */

const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
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
    currentDate: '12:00',
    filter(type, options) {
      if (type === 'minute') {
        return options.filter((option) => option % 5 === 0);
      }

      return options;
    },
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
  
    onClose() {
      this.setData({ show: false });
    },
  }

});