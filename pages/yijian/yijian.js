
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    isDis: false,
    isLoading: false,
    content: '提 交',
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid = wx.getStorageSync('oid') || [];
    if (openid.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '请重启小程序(reason:小程序运行时清除了缓存)',
      });
    } else {
      var that = this;
      wx.request({
        url: app.globleData.localurl + 'countYijian',
        data: {
          "openid": openid,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            count: res.data.msg
          });
        },
        fail: function (err) {
          console.log(err);
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
  valuechange: function (e) {
    this.setData({
      value: e.detail.value
    });
  },
  subYJ: function () {
    if (this.data.value.length == 0) {
      wx.showToast({
        title: '内容不能为空',
        duration: 2000,
        icon: 'none'
      });
    } else {
      let openid = wx.getStorageSync('oid') || [];
      if (openid.length == 0) {
        wx.showModal({
          title: '错误提示',
          content: '请重启小程序(reason:小程序运行时清除了缓存)',
        });
      } else {
        this.setData({
          isLoading: true,
          isDis: true,
          content: '提 交 中'
        });
        var that = this;
        wx.request({
          url: app.globleData.localurl + 'addYijian',
          data: {
            "openid": openid,
            'content': that.data.value
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          success: function (res) {
            var code = res.data.code;
            if (code == 0) {
              wx.showToast({
                title: res.data.msg,
              })
            } else {
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                success: function () {
                  wx.navigateBack({
                    delta: 1
                  });
                },
                duration: 3000
              });

            }
          },
          fail: function (err) {
            console.log(err);
            wx.showModal({
              title: '错误信息',
              content: "网络连接失败!",
              showCancel: false
            })
          }
        })
      }
    }
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