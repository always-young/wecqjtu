var app = getApp();

// pages/chengji/chengji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    chengji: [],
    index: 0,
    jidian: 0
  },
  change: function (event) {
    this.setData({
      index: event.detail.value
    });
    this.getGrade(this.data.items[event.detail.value].xqmc);
  },
  setMoren: function (items) {
    let it = 0;
    items.forEach((item, index) => {
      if (item.isdqxq == 1) {
        it = index;
      }
    });
    return it;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    let openid = wx.getStorageSync('oid') || [];
    if (openid.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '请重启小程序'
      })
    } else {
      let items = wx.getStorageSync('items') || [];
      if (items.length == 0) {
        wx.request({
          url: app.globleData.localurl + 'getItem',
          data: {
            'openid': openid
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
              let it = that.setMoren(res.data.msg);
              that.setData({
                items: res.data.msg,
                index: it
              });
              wx.setStorageSync("items", { 'items': res.data.msg, 'index': it });
              that.getGrade(res.data.msg[it].xqmc);
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
      } else {
        that.setData({
          items: items.items,
          index: items.index
        });
        that.getGrade(items.items[items.index].xqmc);

      }
    }
  },
  getGrade: function (item) {
    const that = this;
    let openid = wx.getStorageSync('oid') || [];
    if (openid.length == 0) {
      wx.showModal({
        title: '错误提示',
        content: '请重启小程序'
      })
    } else {
      wx.request({
        url: app.globleData.localurl + 'getGrade',
        data: {
          'openid': openid,
          'item': item
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
                chengji: [],
                jidian: 0
              });
            } else {
              that.setData({
                chengji: res.data.msg
              });
              that.pingjunjidian(res.data.msg);
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
  pingjunjidian: function (chengji) {
    let xf = 0;
    let jd = 0;
    chengji.forEach(item => {
      xf += item.xf;
      if (item.zcj == '优') {
        jd += 4.5 * item.xf;
      } else if (item.zcj == '良') {
        jd += 3.5 * item.xf;
      } else if (item.zcj == '中') {
        jd += 2.5 * item.xf;
      } else if (item.zcj == '及格') {
        jd += 1.5 * item.xf;
      } else if (item.zcj >= 60) {
        jd += ((item.zcj - 50) / 10) * item.xf;
      }
    });
    this.setData({
      jidian: (jd / xf).toFixed(2)
    });

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