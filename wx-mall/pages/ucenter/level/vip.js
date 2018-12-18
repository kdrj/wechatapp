// // pages/ucenter/level/vip.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  loadData: function () {
    var level=this.data.level
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        util.request(api.GetUserLevel).then(function (res) {
          console.log(res.data)
          if (res.errno === 0) {
            that.setData({
              level: res.data
            });
          }
        });
      }
    });
  }
});