/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-03-12 18:33:02
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import uploadFile from '../../utils/uploadImg/uploadImg';
import utils from '../../utils/index';
import api from '../../api/api';
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    value: '',
    fileListA: [],
    fileListB: [],
    form: {
      imgIdentityA: '',
      imgIdentityB: ''
    },
    upLoadFail: false
  },
  async navigateBack() {
    let form = this.data.form;
    if(!form.imgIdentityA && !form.imgIdentityB) {
      return;
    }
    utils.showLoading();
    let res = await api.addIdentity(this.data.form);
    utils.hideLoading();
    if(res.flag) {
      utils.showToast('认证成功', 'success');
      utils.sleep(1000);
      wx.navigateBack();
    } else {
      utils.showToast(res.message, 'error');
      this.setData({
        fileListA: [],
        fileListB: [],
        form: {}
      })
    }
    console.log('下一步', res)
    // wx.navigateBack();
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  oversize() {
    utils.showToast('文件大小超出限制','none',1500)
  },
  deleteFileListA() {
    this.setData({
      fileListA: []
    });
  },
  deleteFileListB() {
    this.setData({
      fileListB: []
    });
  },
  afterReadA(event) {
    let that = this;
    const { file } = event.detail;
    this.data.fileListA = this.data.fileListA.concat({'url': file.url});
    this.setData({
      fileListA: that.data.fileListA
    });
    utils.showLoading('上传中...');
    uploadFile(that.data.fileListA[0].url, 'daibuche', (res)=> {
      utils.hideLoading();
      utils.showToast('上传成功', 'success');
      this.setData({
        'form.imgIdentityA': res
      })
      // console.log('上传成功', res)
    },(err)=> {
      utils.hideLoading();
      this.setData({
        upLoadFail: true,
        fileListA: [],
        'form.imgIdentityA': ''
      })
      utils.showToast('上传失败', 'error')
      // console.log('上传失败', err)
    }); //初始化
  
  },

  afterReadB(event) {
    let that = this;
    const { file } = event.detail;
    this.data.fileListB = this.data.fileListB.concat({'url': file.url});
    this.setData({
      fileListB: that.data.fileListB
    });
    utils.showLoading('上传中...');
    uploadFile(that.data.fileListB[0].url, 'daibuche', (res)=> {
      utils.hideLoading();
      utils.showToast('上传成功', 'success');
      this.setData({
        'form.imgIdentityB': res
      })
      // console.log('上传成功', res)
    },(err)=> {
      utils.hideLoading();
      this.setData({
        upLoadFail: true,
        fileListB: [],
        'form.imgIdentityB': ''
      })
      utils.showToast('上传失败', 'error')
      // console.log('上传失败', err)
    }); //初始化
  
  },
  onLoad() {
    
  },
  onReady() {
    
  }
})
