var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    confirmPassword: '',
    height:'',
    weight:'',
    code: '',
    loginErrorCount: 0,
    //手机
     mobile: '',
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    disableGetMobileCode: false,
    disableSubmitMobileCode: true,
    getCodeButtonText: '获取验证码'
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    var that = this
    that.setData({ userInfo: app.globalData.userInfo })

    if (app.globalData.token) {
    } else {
      var token = wx.getStorageSync('userToken')
      if (token) {
        app.globalData.token = token
      }
    }

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  //输入手机号确认
  bindCheckMobile: function (mobile) {
    if (!mobile) {
      wx.showModal({
        title: '错误',
        content: '请输入手机号码'
      });
      return false
    }
    if (!mobile.match(/^1[3-9][0-9]\d{8}$/)) {
      wx.showModal({
        title: '错误',
        content: '手机号格式不正确，仅支持国内手机号码'
      });
      return false
    }
    return true
  },
  //手机号确认结束
  countDownPassCode: function () {
    if (!this.bindCheckMobile(this.data.mobile)) {
      return
    }
    util.request(api.SmsCode, { phone: this.data.mobile }, 'POST', 'application/json')
      .then(function (res) {
        if (res.errno == 0) {
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1000
          })
          var pages = getCurrentPages()
          var i = 60;
          var intervalId = setInterval(function () {
            i--
            if (i <= 0) {
              pages[pages.length - 1].setData({
                disableGetMobileCode: false,
                disableSubmitMobileCode: false,
                getCodeButtonText: '获取验证码'
              })
              clearInterval(intervalId)
            } else {
              pages[pages.length - 1].setData({
                getCodeButtonText: i,
                disableGetMobileCode: true,
                disableSubmitMobileCode: false
              })
            }
          }, 1000);
        } else {
          wx.showToast({
            title: '发送失败',
            icon: 'none',
            duration: 1000
          })
        }
      });

  },
  bindUsernameInput: function (e) {

    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {

    this.setData({
      password: e.detail.value
    });
  },
  bindConfirmPasswordInput: function (e) {

    this.setData({
      confirmPassword: e.detail.value
    });
  },
  bindHeightInput: function (e) {

    this.setData({
      height: e.detail.value
    });
  },
  bindWeightInput: function (e) {

    this.setData({
      weight: e.detail.value
    });
  },
  bindCodeInput: function (e) {

    this.setData({
      code: e.detail.value
    });
  },
  bindGetPassCode: function (e) {
    var that = this
    that.setData({ disableGetMobileCode: true })
  },

  bindMobileInput: function (e) {
    this.setData({
      mobile: e.detail.value,
    })
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      // 身高，体重
      case 'clear-height':
        this.setData({
          height: ''
        });
        break;
      case 'clear-weight':
        this.setData({
          weight: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
      case 'clear-mobile':
      this.setData({
        mobile:''
      });
      break;
    }
  },
  startRegister: function (e) {
    var mobile = this.data.mobile;
    var username=this.data.username;
    var password=this.data.password;
    var height=this.data.height;
    var weight=this.data.weight;
    var code=this.data.code;
    if (!this.bindCheckMobile(mobile)) {
      return
    }
    if (!(code &&code.length === 4)) {
      return
    }
    wx.showToast({
      title: '操作中...',
      icon: 'loading',
      duration: 50000
    })
    util.request(api.UpdateUserInfo, {mobile_code: code, mobile: mobile, user_name: username, password: password, height: height, weight:weight })
      .then(function (res) {
         if (code == 200) {
          wx.showModal({
            title: '提示',
            content: '操作成功',
            showCancel: false
          })
          wx.switchTab({
            url: '/pages/ucenter/index/index'
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '验证码错误',
            showCancel: false
          })
        }
      })
  }
})