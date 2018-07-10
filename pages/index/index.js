//index.js
//获取应用实例
import Config from '../../config.js';
import utils from '../../utils/util.js';
Page({
    data: {
        indicatorDots: true,  
        indicatorColor: '#fff',
        indicatorActiveColor: '#d2ab44',
        autoplay: true,
        interval: 5000,
        duration: 500,
        circular: true
    },
    onLoad: function (options){
      let that = this;
      let userInfo = wx.getStorageSync('userInfo')
      let token = userInfo.token;
      let sign = utils.ascli("token=" + token);
      if (!userInfo) {
        wx.navigateTo({
          url: "/pages/authorize/index"
        });
      }else{
        wx.request({
          url: Config.ApiHost + "home",
          data: { token: token, sign: sign },
          success: function (res) {
            console.info(res);
            that.setData({
              banner_list: res.data.data.banner_list,
              bookClassifyList:res.data.data.bookClassifyList,
              imgHost: Config.ImgHost
            })
          }
        });
      }
    }
});