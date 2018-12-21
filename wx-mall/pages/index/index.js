const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: [],

    // 抽奖
    circleList: [], //圆点数组
    awardList: [], //奖品数组
    colorCircleFirst: '#FFDF2F', //圆点颜色1
    colorCircleSecond: '#FE4D32', //圆点颜色2
    colorAwardDefault: '#F5F0FC', //奖品默认颜色
    colorAwardSelect: '#ffe400', //奖品选中颜色
    indexSelect: 0, //被选中的奖品index
    isRunning: false, //是否正在抽奖
    imageAward: [
      '../../static/images/ticket.png',
      '../../static/images/ticket.png',
      '../../static/images/ticket.png',
      '../../static/images/ticket.png',
      '../../static/images/ticket.png',
      '../../static/images/ticket.png',
      '../../static/images/ticket.png',
      '../../static/images/ticket.png'
    ], //奖品图片数组
    award: ["谢谢参与！", "谢谢参与！", "谢谢参与！", "谢谢参与！", 50, 100, 150, 200],
  },
  onShareAppMessage: function() {
    return {
      title: 'NideShop',
      desc: '微信小程序商城',
      path: '/pages/index/index'
    }
  },
  onPullDownRefresh() {
    // 增加下拉刷新数据的功能
    var self = this;
    this.getIndexData();
  },
  getIndexData: function() {
    let that = this;
    var data = new Object();
    util.request(api.IndexUrlNewGoods).then(function(res) {
      if (res.errno === 0) {
        data.newGoods = res.data.newGoodsList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlHotGoods).then(function(res) {
      if (res.errno === 0) {
        data.hotGoods = res.data.hotGoodsList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlTopic).then(function(res) {
      if (res.errno === 0) {
        data.topics = res.data.topicList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlBrand).then(function(res) {
      if (res.errno === 0) {
        data.brand = res.data.brandList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlCategory).then(function(res) {
      if (res.errno === 0) {
        data.floorGoods = res.data.categoryList
        that.setData(data);
      }
    });
    util.request(api.IndexUrlBanner).then(function(res) {

      if (res.errno === 0) {
        data.banner = res.data.banner
        that.setData(data);
      }
    });
    util.request(api.IndexUrlChannel).then(function(res) {
      if (res.errno === 0) {
        data.channel = res.data.channel
        that.setData(data);
      }
    });

  },
  onLoad: function(options) {
    util.login();
    this.gamecenter();
    // 地图开始
    this.mapCtx = wx.createMapContext('myMap'); //获取地图对象
    this.mapCtx.moveToLocation() //将当前位置移动到地图中心
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 37.4387984768,
        longitude: 121.4334297180,
      }, {
        latitude: 37.4387984768,
        longitude: 121.4334297180,
      }]
    }) //缩放视野展示所有经纬度
    //地图结束
  },
  //调用微信内置地图
  gps: function() {
    wx.openLocation({
      latitude: 37.4387984768,
      longitude: 121.4334297180
    })
  },

  //游戏界面
  gamecenter: function() {
    this.getIndexData();
    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({
        topCircle: topCircle,
        leftCircle: leftCircle
      });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function() {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({
        topAward: topAward,
        leftAward: leftAward,
        imageAward: imageAward
      });
    }
    this.setData({
      awardList: awardList
    })
  },
  //开始游戏
  startGame: function() {
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    var _this = this;
    var indexSelect = 0
    var award = this.data.award;
    var i = 0;
    indexSelect = getresult([2, 8, 2, 2, 2, 2, 2, 80]);
    console.log(indexSelect);
    indexSelect = indexSelect - 1;
    var award = _this.data.award[indexSelect];
    var text="";
    if(indexSelect>3){
      text="获得了"+award+"元";
    }else{
      text=award;
    }
    var timer = setInterval(function() {
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
      i += 50;
      if (i > 1000) {
        //去除循环
        clearInterval(timer)
        util.request(api.GiftCoupon).then(function (res) {
          if (res.errno == 0) {
            wx.showModal({
              title: '恭喜您',
              content: text,
              showCancel:true,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../goods/goods?id=1181000',
                  })
                  _this.setData({
                    isRunning: false
                  })
                }
              }
            })
          }else{
            text = "你"+res.errmsg+"优惠券，使用优惠券购买吧！，立即购买可以可以使用优惠券购买商品"
            wx.showModal({
              title: '哈哈哈',
              content:text,
              showCancel: true,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../goods/goods?id=1181000',
                  })
                  _this.setData({
                    isRunning: false
                  })
                }
              }
            })
          }
        });
        console.log(text);
        //获奖提示
      }
      _this.setData({
        indexSelect: indexSelect
      })
    }, 50)
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
})
function getresult(arr) {
  var leng = 0;
  var tmpArr = [];
  for (var i = 0; i < arr.length; i++) {
    leng += arr[i];//获取总数
    tmpArr[i + 1] = arr[i]; //重新封装奖项，从1开始
  }
  tmpArr[0] = 0;
  for (var i = 0; i < tmpArr.length; i++) {
    if (i > 0) {
      tmpArr[i] += tmpArr[i - 1]; //计算每项中奖范围
    }
  }
  var random = parseInt(Math.random() * leng); //获取 0-总数 之间的一个随随机整数
  for (var i = 1; i < tmpArr.length; i++) {
    if (tmpArr[i - 1] < random && random <= tmpArr[i]) {
      return i; //返回中奖的项数（按概率的设置顺序）
    }
  }
}