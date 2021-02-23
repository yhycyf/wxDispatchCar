/** 线上地址**/
const hostUrl = 'https://rank.youledaka.cn/';

/** 测试后台地址**/
// const hostUrl = 'https://douyinstar.genwowan8.com/';

export const appid = 'tt7d780bc5e2420d0e';
const appVersion = '1.0.5';
import regeneratorRuntime from './runtime';

const wrapUrl = (action) => {
  if (wx.getStorageSync('ticket') && wx.getStorageSync('user_identity')) {
    // 有登录态
    return `${hostUrl}${action}?version=${appVersion}&ticket=${wx.getStorageSync(
      'ticket'
    )}&user_identity=${wx.getStorageSync('user_identity')}`;
  } else {
    // 无登录态
    return `${hostUrl}${action}?version=${appVersion}`;
  }
}; // 封装请求

/** 请求封装**/
export const wxRequest = (params, url, types) => {
  // 公共参数（一般写接口的时候都会有些公共参数，你可以事先把这些参数都封装起来，就不用每次调用方法的时候再去写，）
  // 合并对象(公共参数加传入参数合并对象)
  let datas = params || {};
  datas.user_id = wx.getStorageSync('user_id') || '';
  datas.platform = wx.getStorageSync('isDouyin') ? 2 : 1;

  if (types == 2) {
    Object.keys(datas).map((key) => {
      if (typeof datas[key] == 'object') {
        datas[key] = JSON.stringify(datas[key]);
      }
    });
  }
  // console.log('datas',datas)
  return new Promise(function(resolve, reject) {
    // 封装reuqest
    wx.request({
      url: url,
      data: datas,
      method: types === 1 ? 'GET' : 'POST',
      header: {
        'content-type': types === 1 ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      timeout: 1000,

      success(res) {
        resolve(res.data);
      },

      fail(err) {
        // wx.showModal({
        //   title: '提示',
        //   content: '您的网络出现问题，请检查网络或重启小程序',
        //   showCancel: false,
        //   confirmText: '我知道了',
        //   success(res) {
        //     if (res.confirm) {
        //       wx.showLoading({
        //         title: '请求中...'
        //       });
        //     } else if (res.cancel) {
        //       console.log('cancel, cold');
        //     } else {
        //       // what happend?
        //     }
        //   }
        // });
        reject(err);
      }
    });
  });
};

const getSetting = function(setting) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (!res.authSetting[setting]) {
          wx.authorize({
            scope: setting,
            success(res) {
              // console.log('成功')
              resolve(res);
              // wx.showLoading();
              // 用户同意授权用户信息
            },
            fail(err) {
              if (setting == 'scope.userInfo') {
                wx.showModal({
                  title: '提示',
                  content: '获取您的头像和昵称，以便更好的为您服务~',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success() {
                          wx.getSetting({
                            success(res) {
                              if (!res.authSetting[setting]) {
                                resolve('');
                              } else {
                                resolve('ok');
                              }
                            }
                          });
                        },
                        fail(res) {
                          console.log('showModal调用失败');
                          resolve('');
                        }
                      });
                    }
                  },
                  fail(res) {
                    resolve('');
                    // console.log(`showModal调用失败`);
                  }
                });
              }
              if (setting == 'scope.album') {
                wx.showModal({
                  title: '提示',
                  content: '获取您的头像和昵称，以便更好的为您服务~',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success() {
                          wx.getSetting({
                            success(res) {
                              if (!res.authSetting[setting]) {
                                resolve('');
                              } else {
                                resolve('ok');
                              }
                            }
                          });
                        },
                        fail(res) {
                          console.log('showModal调用失败');
                          resolve('');
                        }
                      });
                    }
                  },
                  fail(res) {
                    resolve('');
                    // console.log(`showModal调用失败`);
                  }
                });
              }
              if (setting == 'scope.userLocation') {
                wx.showModal({
                  title: '提示',
                  content: '获取您的地理位置，以便更好的为您服务~',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success() {
                          wx.getSetting({
                            success(res) {
                              if (!res.authSetting[setting]) {
                                resolve('');
                              } else {
                                resolve('ok');
                              }
                            }
                          });
                        },
                        fail(res) {
                          console.log('showModal调用失败');
                          resolve('');
                        }
                      });
                    }
                  },
                  fail(res) {
                    resolve('');
                    // console.log(`showModal调用失败`);
                  }
                });
              }
            }
          });
          // console.log('授权成功')
        } else {
          resolve('ok');
        }
      }
    });
  });
};

const getUserInfo = () =>
  // console.log('执行',getSetting())
  new Promise(async(reslove, reject) => {
    let that = this;
    let res = await getSetting('scope.userInfo');
    console.log('getSetting', res);
    if (res) {
      wx.showLoading({
        title: '请求中，请稍后...'
      });

      wx.login({
        success(res) {
          console.log('登录', res);
          wx.hideLoading();
          wx.getUserInfo({
            async success(res) {
              console.log('用户信息', res);
              wx.setStorageSync('name', res.userInfo.nickName);
              wx.setStorageSync('avatar', res.userInfo.avatarUrl);
              wx.setStorageSync('is_userInfo', true);

              reslove(res);
            },
            fail(res) {
              console.log('getUserInfo 调用失败');
              reslove('');
            }
          });
        },
        fail(res) {
          reject('');
          console.log('login调用失败');
        }
      });
    } else {
      wx.hideLoading();
      reslove('');
    }
  });


  const getAddress = (str) => new Promise((resolve,reject) => {
    var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + str.latitude + "," + str.longitude + "&key=" + 'P5TBZ-ZMSE6-G7WS3-EW2FS-7WO6K-N7FRL' + "&get_poi=1";
    wx.request({
      url: getAddressUrl,
      success: function (result) {
        console.log('result', result)
        resolve(result);
      }
    })
  })
module.exports = {
  appid,
  wrapUrl,
  wxRequest,
  hostUrl,
  appVersion,
  getUserInfo,
  getSetting,
  getAddress
};
