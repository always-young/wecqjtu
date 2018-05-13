{
  App({
    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
      var openid = wx.getStorageSync("oid") || [];
      const self = this;
      let url = this.globleData.localurl + 'login'
      if (openid.length == 0) {
        wx.login({
          success: function (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: url,
                data: {
                  "code": res.code
                },
                header: {
                  'content-type': 'application/json'
                },
                method: 'POST',
                success: function (res) {
                  var code = res.data.code;
                  if (code == 0) {
                    self.judgeLogin(res.data.data);
                  } else {
                    wx.redirectTo({
                      url: '../error/error?data=' + res.data.data
                    })
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
            } else {
              console.log('' + res.errMsg)
            }
          }
        });
      } else {
        this.judgeLogin(openid);
      }
    },
    globleData: {
      // localurl: 'http://localhost/shenghuofuwu/public/',
      localurl: 'https://www.kevinproject.cn/shenghuofuwu/public/',
      isLogin: false
    }
    ,
    /**
     * 判断用户的登录行为
     */
    judgeLogin: function (data) {
      var that = this;
      let url = this.globleData.localurl + 'judge'
      wx.request({
        url: url,
        method: 'POST',
        data: {
          'openid': data
        },
        success: function (res) {
          var code = res.data.code;
          var v = res.data.data;
          if (code == 0) {
            that.globleData.isLogin = true;
            wx.setStorageSync("oid", v);
            if (getCurrentPages().length != 0) {
              getCurrentPages()[getCurrentPages().length - 1].onLoad();
            }
          } else if (code == 1) {
            wx.setStorageSync("oid", v);
            let info = wx.getStorageSync('info') || [];
            if (info.length == 0) {
              wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                  wx.navigateTo({
                    url: '../login/login?nickname=' + res.userInfo.nickName + "&txurl=" + res.userInfo.avatarUrl
                  });
                  wx.setStorageSync('info', 'success');
                },
                fail: function () { 
                  wx.setStorageSync('info', 'success');
                }
              });
            } else {
              wx.openSetting({
                success: function (data) {
                  if (data.authSetting["scope.userInfo"] == true) {
                    wx.getUserInfo({
                      withCredentials: false,
                      success: function (res) {
                        wx.navigateTo({
                          url: '../login/login?nickname=' + res.userInfo.nickName + "&txurl=" + res.userInfo.avatarUrl
                        });
                      }
                    });
                  }
                }
              });
            }
          }
        },
        fail: function (err) {
          console.log(err);
          wx.showModal({
            title: '错误信息',
            content: "王者之哇",
            showCancel: false
          })
        }
      })
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {

    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    },
    getInfo: function () {
      wx.openSetting({
        success: function (data) {
          if (data.authSetting["scope.userInfo"] == true) {
            wx.getUserInfo({
              withCredentials: false,
              success: function (res) {
                wx.navigateTo({
                  url: '../login/login?nickname=' + res.userInfo.nickName + "&txurl=" + res.userInfo.avatarUrl
                });
              }
            });
          }
        }
      });
    },
    isExist: function () {
      if (this.globleData.isLogin) {
        return true;
      }
      return false;
    },

  })

}