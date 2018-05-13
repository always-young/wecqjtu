const app = getApp();

// pages/kaoshi/kaoshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kaoshis: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    let openid = wx.getStorageSync('oid') || [];
    if (openid.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '请重启小程序'
      })
    } else {
      wx.request({
        url: app.globleData.localurl + 'getKS',
        data: {
          'openid': openid,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showModal({
              title: '错误提示',
              content: res.data.msg
            })
          } else {
            if (res.data.msg[0] == null) {
              that.setData({
                kebiaos: []
              });
            } else {
              wx.hideLoading();
              that.setData({
                kebiaos: res.data.msg
              });
            }
          }
        },
        fail: function () {
          wx.showModal({
            title: '错误信息',
            content: "网络连接失败!",
            showCancel: false
          })
        }
      })
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

  }
})