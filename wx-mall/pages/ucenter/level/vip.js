// // pages/ucenter/level/vip.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: null,
    description:"",
    userInfo:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
    let userInfo = wx.getStorageSync('userInfo');

    // 页面显示
    if (userInfo) {
      app.globalData.userInfo = userInfo;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  loadData: function () {
    var level=this.data.level
    var that = this;
    var description=this.data.description;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        util.request(api.GetUserLevel).then(function (res) {
          var data=res.data.toString()
          var a=data.split(",");
          console.log(a)
          if (res.errno === 0) {
            that.setData({
              level: a[0],
              description:a[1]
            });
          }
        });
      }
    });
  }
});