/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-18 11:35:02
 */
import { wxRequest, wrapUrl, appid} from '../utils/wxRequest';
import regeneratorRuntime  from '../utils/runtime';

/**
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */

const loginSave = async(params) => {
  let res = await wxRequest(params, wrapUrl('login/save'), 'POST');
  return res;
};


const getCode = () => new Promise((resolve, reject) => {
  wx.login({
    success(res) {
      console.log('code', res);
      resolve(res.code);
    },

    fail: reject
  });
});

// // 静默登录
// const login = async(params) => {
//   let code = await getCode();
//   let data = await wxRequest({
//     appid: appid,
//     code,
//     share_friend: params.share_friend
//   }, wrapUrl('login/login'), 'GET');
//   console.log('data', data);

//   wx.setStorageSync('is_userInfo', data.is_userInfo);
//   wx.setStorageSync('user_id', data.user_id);
//   wx.setStorageSync('ticket', data.ticket);
//   wx.setStorageSync('user_identity', data.user_identity);


//   if (data.is_userInfo) {  // 老用户
//     wx.setStorageSync('name', data.name);
//     wx.setStorageSync('avatar', data.avatar);
//   }
//   console.log('返回成功');
//   return data;
// };


// 静默登录
const login = async(params) => {
  let code = await getCode();
  let data = await wxRequest({
    code
  }, wrapUrl('user-personage/wxlogin'), 'POST');
  console.log('data', data);


  if (data.is_userInfo) {  // 老用户
    wx.setStorageSync('name', data.name);
    wx.setStorageSync('avatar', data.avatar);
  }
  console.log('返回成功');
  return data;
};



// 代步车资格验证
const qualificationVerification = (params) => wxRequest(params, wrapUrl('user-personage/qualificationVerification'), 'PUT');  

// 您的车辆
const getQualificationVerification = (params) => wxRequest(params, wrapUrl('user-personage/getQualificationVerification'), 'GET');

// 实名认证(下一步)
const addIdentity = (params) => wxRequest(params, wrapUrl('user-personage/addIdentity'), 'POST');

// 车辆信息认证(下一步)
const addDrivingLicence = (params) => wxRequest(params, wrapUrl('user-personage/addDrivingLicence'), 'POST');

// (出险代步车）（预约）
const scooterOrder = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrder'), 'GET');

// (发送验证码）
const scooterOrderCode = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrderCode'), 'GET');

//（订单详情）（出险代步车）
const scooterOrderDetails = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrderDetails'), 'GET');

//（订单详情）（出险代步车）（取消订单）
const scooterOrderCancel = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrderCancel'), 'PUT');

//（个人中心）（车辆管理）
const getUserPersonageCarCount = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageCarCount'), 'GET');

//（个人中心）（我的订单）
const getUserPersonageFromCount = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageFromCount'), 'GET');

//（个人中心）（我的订单）（全部）
const getUserPersonageFrom = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageFrom'), 'GET');

//（修改手机号码）（确认）
const updateUpPhone = (params) => wxRequest(params, wrapUrl('user-personage/updateUpPhone'), 'PUT');

//（修改手机号码）（获取验证码）
const updateUpPhoneCode = (params) => wxRequest(params, wrapUrl('user-personage/updateUpPhoneCode'), 'PUT');

// // 查询车辆
// const getPersonageCar = (params) => wxRequest(params, wrapUrl('user-personage/getPersonageCar'), 'GET');

// // 查询车辆
// const getPersonageCar = (params) => wxRequest(params, wrapUrl('user-personage/getPersonageCar'), 'GET');

// // 查询车辆
// const getPersonageCar = (params) => wxRequest(params, wrapUrl('user-personage/getPersonageCar'), 'GET');


module.exports = {
  login,
  qualificationVerification,
  getQualificationVerification,
  addIdentity,
  addDrivingLicence,
  scooterOrder,
  scooterOrderCode,
  scooterOrderDetails,
  scooterOrderCancel,
  getUserPersonageCarCount,
  getUserPersonageFromCount,
  getUserPersonageFrom,
  updateUpPhone,
  updateUpPhoneCode

};