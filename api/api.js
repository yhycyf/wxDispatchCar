/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-12-19 14:14:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-12 09:51:04
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
const login = async() => {
  let code = await getCode();
  let res = await wxRequest({
    code
  }, wrapUrl('user-personage/wxlogin'), 'POST');
  console.log('data', res);
  wx.setStorageSync('userId',res.data.userId);
  wx.setStorageSync('sessionKey',res.data.sessionKey);
  return res;
};



//（微信登陆）（用户信息存储）
const userInformationStorage = (params) => wxRequest(params, wrapUrl('user-personage/userInformationStorage'), 'PUT');


// 代步车资格验证
const qualificationVerification = (params) => wxRequest(params, wrapUrl('user-personage/qualificationVerification'), 'PUT');  

// 您的车辆
const getQualificationVerification = (params) => wxRequest(params, wrapUrl('user-personage/getQualificationVerification'), 'GET');

// 实名认证(下一步)
const addIdentity = (params) => wxRequest(params, wrapUrl('user-personage/addIdentity'), 'POST');

// 车辆信息认证(下一步)
const addDrivingLicence = (params) => wxRequest(params, wrapUrl('user-personage/addDrivingLicence'), 'POST');

// (发送验证码）
const scooterOrderCode = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrderCode'), 'GET');

// (四维代步车）（开始预约）（查看订单）
const dangerousScooter = (params) => wxRequest(params, wrapUrl('user-personage/dangerousScooter'), 'GET');

//（四维代步车）（开始预约）（订单进展）
const orderProgress = (params) => wxRequest(params, wrapUrl('user-personage/orderProgress'), 'GET');

//（个人中心）（车辆管理）
const getUserPersonageCarCount = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageCarCount'), 'GET');

//（个人中心）（我的订单）(数量)
const getUserPersonageFromCount = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageFromCount'), 'GET');

//（修改手机号码）（确认）
const updateUpPhone = (params) => wxRequest(params, wrapUrl('user-personage/updateUpPhone'), 'PUT');

//（修改手机号码）（获取验证码）
const updateUpPhoneCode = (params) => wxRequest(params, wrapUrl('user-personage/updateUpPhoneCode'), 'PUT');

//（安全验证）
const safetyVerification = (params) => wxRequest(params, wrapUrl('user-personage/safetyVerification'), 'GET');

//（当前用户是否实名制状态）
const realNameSystemStatus = (params) => wxRequest(params, wrapUrl('user-personage/realNameSystemStatus'), 'GET');

//（预约代步车）（代步车资格认证）（验证资格）（行驶本扫描）
const drivingPermitScan = (params) => wxRequest(params, wrapUrl('user-personage/drivingPermitScan'), 'GET');

// (四维代步车）（代步车）（出险代步车）
const getScooterOrder = (params) => wxRequest(params, wrapUrl('user-personage/getScooterOrder'), 'GET');

//（四维代步车）（代步车）（出险代步车）（预约）
const scooterOrder = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrder'), 'PUT');

//（四维代步车）（选择车辆）
const getUserPersonageCar = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageCar'), 'GET');

//（四维代步车）（预约代步车跳转 用户类型）
const ifUserType = (params) => wxRequest(params, wrapUrl('user-personage/ifUserType'), 'GET');

//（订单详情）（出险代步车）（取消订单）
const scooterOrderCancel = (params) => wxRequest(params, wrapUrl('user-personage/scooterOrderCancel'), 'PUT');

//（个人中心）（我的订单）（全部）
const getUserPersonageFrom = (params) => wxRequest(params, wrapUrl('user-personage/getUserPersonageFrom'), 'GET');

//（个人中心）（我的订单）(待待款)
const getPendingPayment = (params) => wxRequest(params, wrapUrl('user-personage/getPendingPayment'), 'GET');

//（个人中心）（我的订单）(进行中)
const getProcessing = (params) => wxRequest(params, wrapUrl('user-personage/getProcessing'), 'GET');

//（个人中心）（我的订单）(已完成)
const getCompleted = (params) => wxRequest(params, wrapUrl('user-personage/getCompleted'), 'GET');

//（选择车辆）（删除车辆）
const deletePersonageCar = (params) => wxRequest(params, wrapUrl('user-personage/deletePersonageCar'), 'DELETE');

//（添加车辆）
const scanDrivingPermit = (params) => wxRequest(params, wrapUrl('user-personage/scanDrivingPermit'), 'GET');

//（添加车辆）（确认）
const addPersonageCar = (params) => wxRequest(params, wrapUrl('user-personage/addPersonageCar'), 'POST');

module.exports = {
  login,
  getCode,
  userInformationStorage,
  qualificationVerification,
  getQualificationVerification,
  addIdentity,
  addDrivingLicence,
  scooterOrderCode,
  dangerousScooter,
  orderProgress,
  scooterOrderCancel,
  getUserPersonageCarCount,
  getUserPersonageFromCount,
  getUserPersonageFrom,
  getPendingPayment,
  getProcessing,
  getCompleted,
  updateUpPhone,
  updateUpPhoneCode,
  safetyVerification,
  realNameSystemStatus,
  drivingPermitScan,
  getScooterOrder,
  scooterOrder,
  getUserPersonageCar,
  ifUserType,
  deletePersonageCar,
  scanDrivingPermit,
  addPersonageCar
};