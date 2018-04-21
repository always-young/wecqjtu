var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: [],
    tomarrow: [],
    swipheight: "0rpx"

  },
  /**
   * 生命周期函数--监听页面加载
   *
   *
   **/
  onLoad: function (options) {
    var openid = wx.getStorageSync('oid') || [];
    if (openid.length != 0 && app.globleData.isLogin) {
      let kb = wx.getStorageSync('kebiao') || [];
      if (kb.length == 0) {
        wx.showNavigationBarLoading();
        this.setKebiao(openid);
      } else {
        let date = new Date();
        let da = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        if (da == kb.da) {
          wx.stopPullDownRefresh();
          this.setData({
            today: kb.kebiao.today,
            tomarrow: kb.kebiao.tomarrow,
            swipheight: kb.kebiao.swipheight
          });
        } else {
          this.setKebiao(openid);
        }
      }
    } else if (openid.length == 0) {
      app.onLaunch();
    }
  },
  setSto: function (value) {
    let date = new Date();
    let da = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    wx.setStorageSync('kebiao', { 'da': da, 'kebiao': value });
  },
  setKebiao: function (openid) {
    let url = app.globleData.localurl + 'getKb';
    let that = this;
    wx.request({
      url: url,
      method: 'POST',
      data: {
        'openid': openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var to = res.data.today;
        var tom = res.data.tomarrow;
        var weigh = to.length > tom.length ? to.length : tom.length;
        var wei = ((weigh / 2 + weigh % 2) * 230 + 60);
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        that.setData({
          'today': to,
          'tomarrow': tom,
          'swipheight': wei > 500 ? wei + "rpx" : "500rpx"
        });
        that.setSto({
          'today': to,
          'tomarrow': tom,
          'swipheight': wei > 500 ? wei + "rpx" : "500rpx"
        });
       
      },
      fail: function (err) {
        console.log(err);
        wx.showModal({
          title: '错误信息',
          content: "网络连接失败!",
          showCancel: false
        });
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      }
    });
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
    this.onLoad();
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
  chengji: function () {
    if (app.isExist()) {
      wx.navigateTo({
        url: '/pages/chengji/chengji'
      });
    } else {
      app.getInfo();
    }
  },
  kongjioashi: function () {
    if (app.isExist()) {
      wx.navigateTo({
        url: '/pages/jiaoshi/jiaoshi'
      });
    } else {
      app.getInfo();
    }
  },
  tiaozhao: function () {

  },
  biaobaiqiang: function () {
    if (app.isExist()) {
      wx.navigateTo({
        url: '/pages/love/love'
      });
    } else {
      app.getInfo();
    }
  },
  shiwuzhaoling: function () {

  }
 
})