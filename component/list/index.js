/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-03 10:15:09
 */


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
    type: {
      type: String,
      value: ''
    },
    
  },

  data: {
    show: false,
    currentDate: '12:00',
    item: {
      a: 'a'
    }
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
    
  }

});