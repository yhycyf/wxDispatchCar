/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-28 16:58:43
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
    form: {
      icPlateNo: '',
      icVin: '',
      icModel: ''
    }
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
      let res = await api.scanDrivingPermit({
        imgName: value
      })
      utils.hideLoading();
      if(res.flag) {
        let form = {
          icPlateNo: res.data.licensePlateNumber,
          icVin: res.data.vin,
          icModel: res.data.model
        }
        that.setData({
          form: form
        })
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
  async submitAdd() {
    console.log('form', this.data.form);
    let form = this.data.form;
    if(!form.icPlateNo) {
      utils.showToast('车牌号不能为空!');
      return;
    } else if(!form.icVin) {
      utils.showToast('车架号不能为空!');
      return;
    } else if(!form.icModel) {
      utils.showToast('品牌车系不能为空!');
      return;
    }
    utils.showLoading();
    let res = await api.addPersonageCar(form);
    utils.hideLoading();
    if(res.flag) {
      utils.showToast('', 'success', 1500);
      utils.sleep(1500);
      wx.redirectTo({
        url: '/pages/index/shopDetails/orderPackUp/addCarSuccess/index'
      })
    } else {
      utils.showToast(res.message);
    }
  },
  onChange(e) {
    // event.detail 为当前输入的值
    let type = e.currentTarget.type;
    switch(type) {
      case 'icPlateNo':
        this.setData({
          'form.icPlateNo': e.detail
        })
        break;
      case 'icVin':
        this.setData({
          'form.icVin': e.detail
        })
        break;
      case 'icModel':
        this.setData({
          'form.icModel': e.detail
        })
        break;
    }
    console.log(e);

  },
  onLoad() {
    
  },
})
