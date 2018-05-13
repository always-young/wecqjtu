const app= getApp();
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    time:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        title:options.title,
        time:options.time
      });
      wx.showLoading({
        title: '加载中',
      })
      let that = this;
      wx.request({
        url: app.globleData.localurl + 'newsDetail',
        method: 'POST',
        data:{
           href:options.href
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading();
          that.setData({
            content: res.data.msg
          });
          // console.log(res.data);
        },
        fail: function (err) {
          console.log(err);
          wx.showModal({
            title: '错误信息',
            content: "网络连接失败!",
            showCancel: false
          });
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