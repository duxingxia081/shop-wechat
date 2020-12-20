const WXAPI = require('apifm-wxapi');
export { };
const checkHasLogined = async function () {
  const token = wx.getStorageSync('token');
  if (!token) {
    return false;
  }
  const loggined = await checkSession()
  if (!loggined) {
    wx.removeStorageSync('token');
    return false;
  }
  const checkTokenRes = await WXAPI.checkToken(token)
  if (checkTokenRes.code != 0) {
    wx.removeStorageSync('token')
    return false
  }
  return true
}
const checkSession = async function () {
  return new Promise((resolve) => {
    wx.checkSession({
      success() {
        return resolve(true)
      },
      fail() {
        return resolve(false)
      }
    })
  })
}
const register = async function (page) {
  let _that = this;
  wx.login({
    success: (loginRes) => {
      let code = loginRes.code;
       wx.getUserInfo({success:(res)=>{
        let iv = res.iv;
        let encryptedData = res.encryptedData;
        let referrer = '' // 推荐人
        let referrer_storge = wx.getStorageSync('referrer');
        if (referrer_storge) {
          referrer = referrer_storge;
        }
        // 下面开始调用注册接口
        const componentAppid = wx.getStorageSync('componentAppid')
        if (componentAppid) {
          WXAPI.wxappServiceRegisterComplex({
            componentAppid,
            appid: wx.getStorageSync('appid'),
            code: code,
            encryptedData: encryptedData,
            iv: iv,
            referrer: referrer
          }).then(function () {
            _that.login(page);
          })
        } else {
          WXAPI.register_complex({
            code: code,
            encryptedData: encryptedData,
            iv: iv,
            referrer: referrer
          }).then(function () {
            _that.login(page);
          })
        }
       }});
    }
  });
}
const login = async function (page: { onShow: () => void; }) {
  wx.login({
    success: function (res) {
      const componentAppid = wx.getStorageSync('componentAppid')
      if (componentAppid) {
        WXAPI.wxappServiceLogin({
          componentAppid,
          appid: wx.getStorageSync('appid'),
          code: res.code
        }).then(function (res: { code: number; msg: any; data: { token: any; uid: any; }; }) {
          if (res.code == 10000) {
            // 去注册
            //_this.register(page)
            return;
          }
          if (res.code != 0) {
            // 登录错误
            wx.showModal({
              title: '无法登录',
              content: res.msg,
              showCancel: false
            })
            return;
          }
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('uid', res.data.uid)
          if (page) {
            page.onShow()
          }
        })
      } else {
        WXAPI.login_wx(res.code).then(function (res: { code: number; msg: any; data: { token: any; uid: any; }; }) {
          if (res.code == 10000) {
            // 去注册
            //_this.register(page)
            return;
          }
          if (res.code != 0) {
            // 登录错误
            wx.showModal({
              title: '无法登录',
              content: res.msg,
              showCancel: false
            })
            return;
          }
          wx.setStorageSync('token', res.data.token)
          wx.setStorageSync('uid', res.data.uid)
          if (page) {
            page.onShow()
          }
        })
      }
    }
  })
}
module.exports = {
  checkHasLogined: checkHasLogined,
  register: register,
  login:login
}