// pages/jiaoshi/jiaoshi.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'查 询',
    loading: false,
    isDis: false,
    xiaoqu: [{
      id: '01', 'name': '南岸'
    }, {
      id: '02', 'name': '双福'
    }],
    index1: 0,
    na: [
      {
        "jzwid": "0101",
        "jzwmc": "第二教学楼"
      },
      {
        "jzwid": "0102",
        "jzwmc": "第三教学楼"
      },
      {
        "jzwid": "0103",
        "jzwmc": "第一教学楼"
      },
      {
        "jzwid": "0104",
        "jzwmc": "第五教学楼"
      },
      {
        "jzwid": "0105",
        "jzwmc": "第四教学楼"
      },
      {
        "jzwid": "0106",
        "jzwmc": "第六教学楼"
      },
      {
        "jzwid": "0107",
        "jzwmc": "第七教学楼"
      },
      {
        "jzwid": "0108",
        "jzwmc": "第九教学楼"
      },
      {
        "jzwid": "0109",
        "jzwmc": "南岸校区运动场"
      },
      {
        "jzwid": "A10CC3AE662744F08E35A6A977B622D2",
        "jzwmc": "水力学大厅"
      },
      {
        "jzwid": "60CFC00CC70B49EDAA3A3DE661810207",
        "jzwmc": "结构工程实验室"
      },
      {
        "jzwid": "09D39BC5A21C4512889B157CB3D7B2E6",
        "jzwmc": "交通机电实验楼"
      },
      {
        "jzwid": "A71F7FA2838F4625AFD93FEFF9FB281D",
        "jzwmc": "老土木实验楼"
      },
      {
        "jzwid": "CDB1BE43D2C941E3B5AC2C466C6930FB",
        "jzwmc": "力学楼"
      },
      {
        "jzwid": "6BB1B57BB6D94510B3FDF9BD6E0F88B7",
        "jzwmc": "动力实验室"
      },
      {
        "jzwid": "8F364EC581F944D1A36CE6C612386525",
        "jzwmc": "河海学院行政楼"
      },
      {
        "jzwid": "563D5415045A4912935C5664516205F2",
        "jzwmc": "校车队驾校旁"
      },
      {
        "jzwid": "6FD50CDF4F2E4EAC806FBC51D10633DD",
        "jzwmc": "南岸实训中心"
      },
      {
        "jzwid": "6083B485F95748A8934EC3E3E8DCD997",
        "jzwmc": "明德楼B栋"
      }
    ],
    sf: [
      {
        "jzwid": "0201",
        "jzwmc": "A01教学楼"
      },
      {
        "jzwid": "0202",
        "jzwmc": "B01教学楼"
      },
      {
        "jzwid": "0203",
        "jzwmc": "D01教学楼"
      },
      {
        "jzwid": "0204",
        "jzwmc": "双福校区运动场"
      },
      {
        "jzwid": "65D2D4E2C1D843498036F48A35E02DC6",
        "jzwmc": "材料楼"
      },
      {
        "jzwid": "81ACC4788B6740EFA610A6F10E24FDF5",
        "jzwmc": "逸夫楼"
      },
      {
        "jzwid": "93B18258EBEA4EF8ABA14EAA6009DA15",
        "jzwmc": "双福实训中心"
      }
    ],
    jxl: [],
    index2: 0,
    times: [{
      id: 'allday',
      name: '全天'
    },
    {
      id: 'am',
      name: '上午'
    },
    {
      id: 'pm',
      name: '下午'
    },
    {
      id: 'night',
      name: '晚上'
    },
    {
      id: '0102',
      name: '1-2'
    },
    {
      id: '0304',
      name: '3-4'
    },
    {
      id: '0506',
      name: '5-6'
    },
    {
      id: '0708',
      name: '7-8'
    }
    ],
    index3: 0
  },
  change1: function (event) {
    let va = event.detail.value;
    if (va == 0) {
      this.setData({
        index1: va,
        jxl: this.data.na,
        index2: 0
      });
    } else {
      this.setData({
        index1: va,
        jxl: this.data.sf,
        index2: 0
      });
    }
  },
  change2: function (event) {
    let va = event.detail.value;
    this.setData({
      index2: va,
    });
  },
  change3: function (event) {
    let va = event.detail.value;
    this.setData({
      index3: va,
    });
  },
  search: function () {
    this.setData({
      isDis: true,
      loading: true,
      content:'查 询 中'
    });
    let data = this.data;
    let da = {
      'xqid': data.xiaoqu[data.index1].id,
      'jxlid': data.jxl[data.index2].jzwid,
      'idleTime': data.times[data.index3].id
    };
    var that = this;
    wx.request({
      url: app.globleData.localurl + 'getKJS',
      data: da,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        that.setData({
          isDis: false,
          loading: false,
          content:'查 询'
        });
        if (res.data.code == 0) {
          wx.showModal({
            title: '错误提示',
            content: res.data.msg
          });
        } else {
          wx.navigateTo({
            url: '/pages/result/result?jxls=' + JSON.stringify(res.data.msg)
          })
        }
      },
      fail: function () {
        that.setData({
          isDis: false,
          loading: false
        });
        wx.showModal({
          title: '错误信息',
          content: "网络连接失败!",
          showCancel: false
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jxl: this.data.na
    })
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