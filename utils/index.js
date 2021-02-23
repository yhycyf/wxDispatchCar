
import regeneratorRuntime from './runtime';
export const cdnUrl = 'https://cdn.fairgame.cn/love-powder-app/image/';
const Qiniu = require('./qiniuUploader.js');

const countDown = (time) => {
  let now  = new Date();
  let start = new Date(time);
  let year = start.getFullYear();
  let month = start.getMonth() + 1;
  let day = start.getDate();
  let hour = start.getHours();
  if (hour < 10) {
    hour = '0' + hour;
  }
  let minute = start.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }

  let mills = now.getTime() - start.getTime();
  if (mills < 1000 * 60) {
    return '刚刚';
  }
  if (mills < 1000 * 60 * 60) {
    let seconds = parseInt(mills / 1000 / 60);
    return seconds + '分钟前';
  }
  if (mills < 1000 * 60 * 60 * 24) {
    let hours = parseInt(mills / 1000 / 60 / 60);
    return hours + '小时前';
  }

  let showDate = month + '月' + day + '日 ' + hour + ':' + minute;
  if (year - now.getFullYear() != 0) {
    showDate = year + '年' + showDate;
  }
  return showDate;
};

const reportAnalytics = (name, data) => {  // 事件上报
  tt.reportAnalytics(name, data);
};


const showFavoriteGuide = () => {
  tt.showFavoriteGuide({
    type: 'bar',
    content: '一键添加到我的小程序',
    position: 'bottom',
    success(res) {
      console.log('引导组件展示成功');
    },
    fail(res) {
      console.log('引导组件展示失败');
    }
  });
};


/**
 * 上传图片
 * path:图片地址
 * callback:回调
 */
const upLoadImg = (tempFilePaths, path, str) => new Promise((resolve, reject) => {
  Qiniu.upload(
    tempFilePaths,
    (res) => {
      wx.hideLoading();
      resolve(res.imageURL);
    },
    (error) => {
      reject(error);
    },
    {
      key: path + str,     // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
      region: 'SCN',
      domain: 'https://taskimg.youwanshe.cn',  // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
      // uptoken: 'https://app.genwowanba.com/box/token', // 由其他程序生成七牛 uptoken
      // uptokenURL: hostUrl + 'job/qiniu/token', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
      uptokenURL: 'https://task.youwanshe.cn/' + 'job/qiniu/token',
      uploadURL: 'https://upload-z2.qiniup.com/'
    },
    (res) => {
      console.log('上传进度', res.progress);
      console.log('已经上传的数据长度', res.totalBytesSent);
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
    }
  );
}).catch((err) => {
  console.log('qiniu upload error: ' + err);
});


const commonShare = (res, path) => {
  if (res.from == 'button') {
    if (res.channel == 'video') {
      return {
        channel: 'video',
        title: '',
        path: path ? path : '/pages/index/index' // ?后面的参数会在转发页面打开时传入onLoad方法
        // extra: {
        // 	// 注意，只有小程序使用button组件触发分享时，会有target属性
        //   videoPath : res.target.dataset.path
        // }
      };
    } else {
      return {
        title: '',
        desc: '',
        path: path ? path : '/pages/index/index', // ?后面的参数会在转发页面打开时传入onLoad方法
        imageUrl: '' // 支持本地或远程图片，默认是小程序 icon
      };
    }
  } else {
    return {
      title: '',
      desc: '',
      path: path ? path : '/pages/index/index', // ?后面的参数会在转发页面打开时传入onLoad方法
      imageUrl: '' // 支持本地或远程图片，默认是小程序 icon
    };
  }
};


const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'.split('');
// 截取媒体地址中间值
const subMduioStr = () => {
  let uid = wx.getStorageSync('identity');
  let size = chars.length;
  let str = '';
  for (let i = 0; i < 19; ++i) {
    let index = Math.floor(Math.random() * size);
    str += chars[index];
  }
  return '' + uid +  new Date().getTime() + str;


  // return str.match(/https?:\/\/tmp\/\w+\.\w+\.(\w+\.\S+)/)[1]; //开发工具
  // return str.split('tmp_')[1];
};

const oneMonthAfter = (value) => {
  if (!value) {
    return true;
  }
  let createTime = new Date(value).getTime();
  let nowTime = new Date().getTime();
  let timestamp = 60 * 1000 * 60 * 24 * 30;
  if ((nowTime - createTime) >=  timestamp) {
    return true;
  } else {
    return false;
  }
};


// 倒计时日时分秒
const countDownDays = (value) => {
  // value = 1595779199;
  let times;
  let nowTime = new Date().getTime();
  let timestamp = (value * 1000) - nowTime;
  let day = parseInt(timestamp / 1000 / 60 / 60 / 24);
  let hours = parseInt(timestamp / 1000 / 60 / 60 % 24);
  let minutes = parseInt(timestamp / 1000 / 60 % 60);
  let seconds = parseInt(timestamp / 1000 % 60);
  if (day < 10) {
    day = '0' + day;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  times = day + '天' + hours + ':' + minutes + ':' + seconds;
  return times;
};


// 倒计时分秒
const countDownMinutes = (value) => {
  let times;
  let nowTime = new Date().getTime();
  let timestamp = (10 * 60 * 1000) - (nowTime - (value * 1000));
  let minutes = parseInt(timestamp / 1000 / 60 % 60);
  let seconds = parseInt(timestamp / 1000 % 60);
  if (timestamp <= 0) {
    return '00:00';
  } else {
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    times = minutes + ':' + seconds;
    return times;
  }
};


const sliceStr = (index, str) =>
  str.slice(0, index)
;


// 当前时间
const nowTime = () => {
  let start = new Date();
  let year = start.getFullYear();
  let month = start.getMonth() + 1;
  let day = start.getDate();
  let hour = start.getHours();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  let minute = start.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }
  let seconds = start.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
  return time;
};


// 倒计时秒数
const countDownSeconds = (value) => {
  let nowTime = new Date().getTime();
  let flag = 120;
  let seconds = parseInt((nowTime - value * 1000) / 1000);
  if (seconds < 120) {
    flag = flag - seconds;
  } else {
    flag = 0;
  }
  return flag;
};


// 有离线收益就设置小红点
const showTabBarRedDot = () => {
  tt.showTabBarRedDot({
    index: 1,
    success(e) {
    },
    fail(e) {
    }
  });
};




export default {
  cdnUrl,
  countDown,
  reportAnalytics,
  showFavoriteGuide,
  upLoadImg,
  oneMonthAfter,
  subMduioStr,
  countDownDays,
  nowTime,
  countDownSeconds,
  commonShare,
  countDownMinutes,
  showTabBarRedDot,
  sliceStr
};
