import { wxRequest, wrapUrl, appid} from '../utils/wxRequest';
import regeneratorRuntime  from '../utils/runtime';

/**
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */

const loginSave = async(params) => {
  let res = await wxRequest(params, wrapUrl('login/save'), 2);
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

// 静默登录
const login = async(params) => {
  let code = await getCode();
  let data = await wxRequest({
    appid: appid,
    code,
    share_friend: params.share_friend
  }, wrapUrl('login/login'), 1);
  console.log('data', data);

  wx.setStorageSync('is_userInfo', data.is_userInfo);
  wx.setStorageSync('user_id', data.user_id);
  wx.setStorageSync('ticket', data.ticket);
  wx.setStorageSync('user_identity', data.user_identity);


  if (data.is_userInfo) {  // 老用户
    wx.setStorageSync('name', data.name);
    wx.setStorageSync('avatar', data.avatar);
  }
  console.log('返回成功');
  return data;
};


const indexGetWeek = (params) => wxRequest(params, wrapUrl('idol-rank/get-week'), 1); // 首页本周榜

const indexGetMonth = (params) => wxRequest(params, wrapUrl('idol-rank/get-month'), 1); // 首页本月榜

const indexGetWeekPre = (params) => wxRequest(params, wrapUrl('idol-rank/get-week-pre'), 1); // 首页上周榜

const indexGetMonthPre = (params) => wxRequest(params, wrapUrl('idol-rank/get-month-pre'), 1);  // 首页上月榜

const idolIndex = (params) => wxRequest(params, wrapUrl('idol/index'), 1);  // 获取爱豆详情

const detailsGetWeek = (params) => wxRequest(params, wrapUrl('idol-union/get-week'), 1);  // 送花周榜

const detailsGetMonth = (params) => wxRequest(params, wrapUrl('idol-union/get-month'), 1);  // 送花月榜

const detailsGetTotal = (params) => wxRequest(params, wrapUrl('idol-union/get-total'), 1);  // 送花总榜

const unionUserSave = (params) => wxRequest(params, wrapUrl('union-user/save'), 1);  // 加入公会

const resultCheckin = (params) => wxRequest(params, wrapUrl('union-user/result-checkin'), 1);  // 是否签到、是否点击了双倍赠送

const userCheckin = (params) => wxRequest(params, wrapUrl('union-user/checkin'), 1);  // 签到

const userDouble = (params) => wxRequest(params, wrapUrl('union-user/double'), 1);  // 签到双倍

const userInfo = (params) => wxRequest(params, wrapUrl('union-user/user-info'), 1);  // 我的信息

const upName = (params) => wxRequest(params, wrapUrl('union-user/up-name'), 1);  // 修改昵称

const userIndex = (params) => wxRequest(params, wrapUrl('union-user/index'), 1);  // 我的公会

const upAvata = (params) => wxRequest(params, wrapUrl('union-user/up-avatar'), 1);  // 修改头像

const accountLog = (params) => wxRequest(params, wrapUrl('union-user/account-log'), 1);  // 送花记录

const sendFlowers = (params) => wxRequest(params, wrapUrl('union-user/send-flowers'), 1);  // 送花

const searchIndex = (params) => wxRequest(params, wrapUrl('search/index'), 1);  // 搜索

const searchRefresh = (params) => wxRequest(params, wrapUrl('search/refresh'), 1);  // 搜索,换一批

const findIdol = (params) => wxRequest(params, wrapUrl('search/find-idol'), 1);  // 搜索爱豆

const siteShowBuy = (params) => wxRequest(params, wrapUrl('site/show-pay'), 1);  // 是否显示购买

const lotteryCheck = (params) => wxRequest(params, wrapUrl('lottery/check'), 1);  // 检测抽奖次数

const lotteryIndex = (params) => wxRequest(params, wrapUrl('lottery/index'), 2);  // 抽奖

const getFlowersList = (params) => wxRequest(params, wrapUrl('union-user/get-flowers-list'), 1);  // 偷花列表

const getFlowers = (params) => wxRequest(params, wrapUrl('union-user/get-flowers'), 1);  // 偷花

const exitUnion = (params) => wxRequest(params, wrapUrl('union-user/exit-union'), 1);  // 退出公会

const badgeIndex = (params) => wxRequest(params, wrapUrl('badge/index'), 1);  // 粉丝徽章

const badgeSave = (params) => wxRequest(params, wrapUrl('badge/save'), 1);  // 佩戴徽章

const flowerDeityIndex = (params) => wxRequest(params, wrapUrl('flower-deity/index'), 1);  // 花神产花

const flowerDeitySave = (params) => wxRequest(params, wrapUrl('flower-deity/save'), 1);  // 领取花神产花

const viewVideo = (params) => wxRequest(params, wrapUrl('user-task/view-video'), 1);  // 任务--观看视频广告

const taskIndex = (params) => wxRequest(params, wrapUrl('user-task/index'), 1);  // 任务中心

const taskSave = (params) => wxRequest(params, wrapUrl('user-task/save'), 1);  // 任务中心--领取

const shopList = (params) => wxRequest(params, wrapUrl('shop/list'), 1);  // 购买鲜花列表

const payOrder = (params) => wxRequest(params, wrapUrl('pay/order'), 2);  // 支付

const shopGiveList = (params) => wxRequest(params, wrapUrl('shop/give-list'), 1);  // 送花列表

const siteIndexConfig = (params) => wxRequest(params, wrapUrl('site/index-config'), 1);  // 配置

const onlineSave = (params) => wxRequest(params, wrapUrl('flower-deity/online-save'), 2);  // 花神在线产花

const offlineSave = (params) => wxRequest(params, wrapUrl('flower-deity/offline-save'), 2);  // 领取花神离线产花

const appletIndex = (params) => wxRequest(params, wrapUrl('applet/index'), 2);  // 小程序生命周期(在线或离线时请求)

const userDynamic = (params) => wxRequest(params, wrapUrl('union-user/dynamic'), 1);  // 公会动态

const upClickTime = (params) => wxRequest(params, wrapUrl('lottery/up-click-time'), 1);  // 倒计时

const upLotteryNum = (params) => wxRequest(params, wrapUrl('lottery/up-lottery-num'), 1);  // 抽奖--倒计时完成时增加抽奖次数

const getPayInfo = (params) => wxRequest(params, wrapUrl('pay/get-pay-info'), 1);  // 支付检测


module.exports = {
  login,
  indexGetWeek,
  indexGetWeekPre,
  indexGetMonth,
  indexGetMonthPre,
  idolIndex,
  detailsGetWeek,
  detailsGetMonth,
  detailsGetTotal,
  unionUserSave,
  resultCheckin,
  userCheckin,
  userDouble,
  userInfo,
  userIndex,
  sendFlowers,
  upName,
  upAvata,
  accountLog,
  searchIndex,
  searchRefresh,
  findIdol,
  lotteryCheck,
  lotteryIndex,
  siteShowBuy,
  getFlowersList,
  getFlowers,
  exitUnion,
  badgeIndex,
  badgeSave,
  flowerDeityIndex,
  flowerDeitySave,
  viewVideo,
  taskIndex,
  taskSave,
  shopList,
  payOrder,
  shopGiveList,
  siteIndexConfig,
  onlineSave,
  appletIndex,
  offlineSave,
  userDynamic,
  upClickTime,
  upLotteryNum,
  getPayInfo,
  loginSave
};