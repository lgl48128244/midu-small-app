// pages/authorize/index.js
import Config from '../../config.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo) {
      return;
    }
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
                    //回到原来的地方放
                    wx.navigateBack();
                  }
                });
              }
            })
          }
        });
      }
    });
  }
});