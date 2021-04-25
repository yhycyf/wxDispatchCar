/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-25 17:43:47
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import api from '../../../../../api/api';
import utils from '../../../../../utils/index';
import uploadFile from '../../../../../utils/uploadImg/uploadImg';
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    radio: true,
    value: '',
  },
  oversize() {
    utils.showToast('文件大小超出限制','none',1500)
  },
  async afterReadA(event) {
    let that = this;
    const { file } = event.detail;
    utils.showLoading('识别中...');
    uploadFile(file.url, 'daibuche', async(value)=> {
      // console.log('上传成功', res)
      let res = await api.drivingPermitScan({
        imgName: value
      })
      utils.hideLoading();
      if(res.flag) {
        console.log('res', res)
      } else {
        utils.showToast(res.message)
      }
      // console.log('识别成功', res)

    },(err)=> {
      utils.hideLoading();
     
      utils.showToast('识别失败', 'error')
      // console.log('上传失败', err)
    }); //初始化
  
  },
  pay() {
    wx.redirectTo({
      url: '/pages/index/shopDetails/orderPackUp/addCarSuccess/index'
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onLoad() {
    
  },
})
