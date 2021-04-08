/*
 * @Author: your name
 * @Date: 2021-02-07 09:12:55
 * @LastEditTime: 2021-04-08 16:47:10
 * @LastEditors: sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \Scooter\pages\index\index.js
 */
// index.js
// 获取应用实例
import api from '../../api/api';
import utils from '../../utils/index';
import uploadFile from '../../utils/uploadImg/uploadImg';
const app = getApp()

Page({
  data: {
    motto: 'Helelo World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 1,
    radio: 'none',
    value: '',
    form1: {
      vin: "",
      reportNo: "",
      gift: ""
    },
    form2: {
      vin: "",
      reportNo: "",
      gift: ""
    },
    myCarList: [],
    realNameSystem: false,  //是否实名制
  },
  onShow() {
    this.getQualificationVerification();
    this.realNameSystemStatus();
  },
  oversize() {
    utils.showToast('文件大小超出限制','none',1500)
  },
  afterReadA(event) {
    let that = this;
    const { file } = event.detail;
    utils.showLoading('识别中...');
    uploadFile(file.url, 'daibuche', async(res)=> {
      // console.log('上传成功', res)
      let res1 = await api.drivingPermitScan({
        imgName: res
      })
      utils.hideLoading();
      if(res1.flag) {
        if(this.data.active == 1) {
          this.setData({
            'form1.vin': res1.data.vin
          })
        } else {
          this.setData({
            'form2.vin': res1.data.vin
          })
        }
      } else {
        utils.showToast(res1.message, 'error')
      }
      // console.log('识别成功', res1)

    },(err)=> {
      utils.hideLoading();
     
      utils.showToast('识别失败', 'error')
      // console.log('上传失败', err)
    }); //初始化
  
  },
  async realNameSystemStatus() {
    let res = await api.realNameSystemStatus();
    this.setData({
      realNameSystem: res.data.realNameSystem
    });
    // console.log('是否实名制', res)
  },
  async getQualificationVerification() {
    let res = await api.getQualificationVerification();
    if(res.flag == true) {
      this.setData({
        myCarList: res.data
      });
    } else {
      // utils.showToast(res.message);
    }
    console.log('我的车辆', res)
  },
  // 资格验证
  async qualification() {
    let that = this;
    let parms;
    if(this.data.active == 1) {
      parms = this.data.form1;
    } else {
      parms = this.data.form2;
    }

    if(!parms.vin) {
      utils.showToast('车架号不能为空');
      return;
    } else if(!parms.reportNo) {
      utils.showToast('报案号不能为空');
      return;
    }
    let res = await api.qualificationVerification(parms);
    // console.log('资格验证', res);

    if(res.flag == true) {
      utils.showToast('验证成功','success');
      await utils.sleep(1000);

      // if(!this.data.realNameSystem) {  //未实名
      //   wx.redirectTo({
      //     url: '/pages/idSafety/index',
      //     success: function() {
      //       that.setData({
      //         form1: {},
      //         form2: {},
      //         radio: 'none'
      //       })
      //     }
      //   })
      // } else {   //已实名
      //   wx.redirectTo({
      //     url: '/pages/making/index',
      //     success: function() {
      //       that.setData({
      //         form1: {},
      //         form2: {},
      //         radio: 'none'
      //       })
      //     }
      //   })
      // }
    } else {
      utils.showToast(res.message);
    }
  },
  // 单选框
  onChangeRadio(event) {
    // console.log('event',event)
    let ucVin = this.data.myCarList[event.detail].ucVin;
    this.setData({
      'form2.vin': ucVin
    })
    
    this.setData({
      radio: event.detail,
    });
  },
  // tab切换
  onChangeTab(event) {
    // event.detail 为当前输入的值
    this.setData({
      active: event.detail.name
    })
  },
  onChange(event) {
    console.log('event', event)
    let type = event.target.dataset.type;
    if(this.data.active == 1) {
      let form1;
      switch(type) {
        case 'vin':
          form1 = 'form1.vin';
          this.setData({
            [form1]: event.detail
          })
        break;
        case 'reportNo':
          form1 = 'form1.reportNo';
          this.setData({
            [form1]: event.detail
          })
        break;
        case 'gift':
          form1 = 'form1.gift';
          this.setData({
            [form1]: event.detail
          })
        break;
      }
    } else {
      let form2;
      switch(type) {
        case 'vin':
          form2 = 'form2.vin';
          this.setData({
            [form2]: event.detail
          })
        break;
        case 'reportNo':
          form2 = 'form2.reportNo';
          this.setData({
            [form2]: event.detail
          })
        break;
        case 'gift':
          form2 = 'form2.gift';
          this.setData({
            [form2]: event.detail
          })
        break;
      }
    }
    console.log('form1', this.data.form1)
    console.log('form2', this.data.form2)
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onLoad() {
    
  },
})
