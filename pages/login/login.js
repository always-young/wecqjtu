const app = getApp();


// pages/login/login.js
Page({
   /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    txurl: "",
    tips: "",
    isDis:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickname: options.nickname,
      txurl: options.txurl
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
  submit: function (formdata) {
    wx.showLoading({
      title: '登录中',
    });
    var xh = formdata.detail.value.xh;
    var mm = formdata.detail.value.mm;
    if (xh.length == 0 || mm.length == 0) {
      wx.hideLoading();
      this.setData({
        tips: "提示 学号或者密码不能为空"
      });
    } else {
      if (!this.isRealNum(xh)) {
        wx.hideLoading();
        this.setData({
          tips: "提示 学号只能为数字"
        });
      } else {
        this.setData({
          tips: "",
          isDis:true
        });
        var openid = wx.getStorageSync("oid")||[];
        var self = this;
        wx.request({
          url: app.globleData.localurl + 'addUser',
          method: 'POST',
          data: {
            "nickname": this.data.nickname,
            'txurl': this.data.txurl,
            'openid': openid,
            'xh': xh,
            'mm': mm
          },
          success: function (res) {
            var code = res.data.code;
            var data = res.data.msg;
            wx.setStorageSync('isLogin', "success");
            if (code != 4) {
              wx.hideLoading();
              self.setData({
                'tips': data,
                isDis:false
              });
            } else {
              app.globleData.isLogin=true;
              var pages = getCurrentPages();//获取当前页面信息栈
              var prevPage = pages[pages.length - 2]//获取上一个页面信息栈
              prevPage.onLoad();
              wx.hideLoading();
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })

      }
    }
  },
  isRealNum: function (val) {
    if (val === "" || val == null) {
      return false;
    }
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  }
})