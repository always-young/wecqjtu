const app = getApp();

// pages/love/love.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    sex: 0,
    isNm: 1,
    tab1: 'sel',
    tab2: '',
    tab3: '',
    tab4: '',
    id: 2,
    showlove: false,
    biaobais: [
      {
        content: '或许前路永夜，即便如此我也要前进，因为星光即使微弱也会为我照亮前途。',
        txurl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erNicgARAYLUnAulG1icHTIc0zF1qGWKEd9GS9Bibpv1Negd9GQvJEGtlwbdctdjOFx13d44Uy2gCKzw/0',
        'nickname': '小小文',
        'time': '9月9日 14:25',
        'sex': '0',
        'type': 1
      },
      {
        content: '你说过的话，一句一句，如同星光般洒落，独自仰望的夜空，会惧怕被深不见底的夜吸进去，和啊渡一起仰望的星空变幻不定，和小椿一起仰望的星空，光辉灿烂却隐隐透着不安。和你一同仰望的星空，是怎样的呢？',
        txurl: '',
        'nickname': '匿名',
        'time': '9月9日 14:25',
        'sex': '0',
        'type': 0
      }
    ]
  },
  index: function () {
    this.setData({
      tab1: 'sel',
      tab2: '',
      tab3: '',
      tab4: '',
      id: 2,
      showlove: false
    });
  },
  shiming: function () {
    this.setData({
      tab1: '',
      tab2: 'sel',
      tab3: '',
      tab4: '',
      id: 1,
      showlove: false
    });
  },
  niming: function () {
    this.setData({
      tab1: '',
      tab2: '',
      tab3: 'sel',
      tab4: '',
      id: 0,
      showlove: false

    });
  },
  showlove: function () {
    this.setData({
      tab1: '',
      tab2: '',
      tab3: '',
      tab4: 'sel',
      showlove: true
    });
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
  radioChange: function (event) {
    this.setData({
      sex: event.detail.value
    });
  },
  nmChange: function (event) {
    let x = 1;
    if (event.detail.value) {
      x = 0;
    }
    this.setData({
      isNm: x
    });
  },
  contentChange: function (event) {
    this.setData({
      content: event.detail.value
    });
  },
  submitLove: function () {
    let data = this.data;
    let da = [];
    if (data.content.length == 0) {
      wx.showToast({
        title: '表白内容不能为空',
        icon: 'none'
      });
    } else {
      wx.showLoading({
        title: '发布中',
      });
      if (data.isNm == 1) {
        let openid = wx.getStorageSync("oid") || [];
        if (openid.length == 0) {
          wx.showModal({
            title: '错误提示',
            content: '请重启小程序(运行过程中清除了缓存)',
            showCancel: false
          });
        } else {
          da = {
            'openid': openid,
            'content': data.content,
            'sex': data.sex,
            'type': 1
          }
        }
      } else {
        da = {
          'openid': '',
          'content': data.content,
          'sex': data.sex,
          'type': 0
        }
      }
      let that = this;
      wx.request({
        url: app.globleData.localurl + 'addLove',
        data: da,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              mask:true
            });
          } else if (res.data.code == 1) {
            wx.showToast({
              title: '发布成功',
              icon: 'none',
              duration:2000,
              mask:true
            });
            that.setData({
              showlove: false,
              content:''
            });
          }
          wx.hideLoading();
        },
        fail: function (err) {
          wx.hideLoading();
          wx.showModal({
            title: '错误提示',
            content: '网络连接失败',
            showCancel: false
          });
        }
      })
    }
  }
})