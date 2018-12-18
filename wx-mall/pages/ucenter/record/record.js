// pages/ucenter/record/record.js
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const wxCharts=require('../../../lib/wx-charts/dist/wxcharts.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userWeight: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getweightInfo();
  },
  getweightInfo:function(){
    let that = this;
    var userWeight = this.data.userWeight
    util.request(api.GetUserWeight).then(function (res) {
        that.setData({
          userWeight: res.userWeight,
        });
      userWeight=res.userWeight
      console.log(userWeight)
      var dateList = []
      var weightList = []
      for (var i = 0; i < userWeight.length; i++) {
        dateList.push(userWeight[i].createDate)
        weightList.push(userWeight[i].weight)
      }
      that.chart(dateList,weightList);
    });
  },
  chart: function (dateList,weightList) {
    new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: dateList,
      series: [{
        name: '体重',
        data: weightList,
        format: function (val) {
          return val.toFixed(2) + 'kg';
        }
      },],
      yAxis: {
        title: '体重 (kg)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: 320,
      height: 200
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