//app.js
import Config from './config.js';
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: Config.ApiHost + 'wechat/wxma/login',
          data: { code: res.code },
          success: function (res) {
            let sessionKey = res.data.data.sessionKey;
            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      wx.request({
                        url: Config.ApiHost + 'wechat/wxma/info',
                        data: {
                          sessionKey: sessionKey,
                          signature: res.signature,
                          rawData: res.rawData,
                          encryptedData: res.encryptedData,
                          iv: res.iv
                        },
                        success: function (res) {
                          //保存用户信息
                          wx.setStorageSync('userInfo', res.data.data);
                          console.info(res.data.data);
                        }
                      });
                    }
                  })
                } else {
                  //弹窗授权
                  setTimeout(function () {
                    wx.navigateTo({
                      url: "/pages/authorize/index"
                    })
                  }, 1000);
                }
              }
            });
          }
        });
      }
    });
  },globalData: {
    userInfo: null
  }
});