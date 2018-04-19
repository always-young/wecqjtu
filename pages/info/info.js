const app = getApp();

// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txurl: 'https://www.kevinproject.cn/mous.jpg',
    nickname: '匿名用户'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('user') || [];
    if (user.length != 0) {
      this.setData({
        txurl: user.txurl,
        nickname: user.nickname
      });
    } else {
      let openid = wx.getStorageSync('oid') || [];
      if (openid.length == 0 || !app.globleData.isLogin) {
        wx.showModal({
          title: '错误提示',
          content: '未绑定',
          showCancel: false
        });
      } else {
        let that = this;
        wx.request({
          url: app.globleData.localurl + 'getUser',
          method: 'POST',
          data: {
            'openid': openid
          },
          success: function (res) {
            var code = res.data.code;
            var data = res.data.msg;
            if (code == 0) {
              wx.showModal({
                title: '错误提示',
                content: res.data.msg,
              });
            } else {
              that.setData({
                txurl: res.data.msg.txurl,
                nickname: res.data.msg.nickname
              });
              wx.setStorageSync('user', res.data.msg)
            }
          }
        })
      }
    }
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
  yijian: function () {
    if (app.isExist()) {
      wx.navigateTo({
        url: '/pages/yijian/yijian',
      });
    }else{
      app.getInfo();
    }
  },
  about:function(){
    wx.navigateTo({
      url: '/pages/about/about',
    });
  }
})