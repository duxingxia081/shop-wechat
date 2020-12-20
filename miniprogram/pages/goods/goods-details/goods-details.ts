const WXAPI = require('apifm-wxapi');
const AUTH = require('../../../utils/auth')
export { }
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxlogin:true,
    goodsDetail: {},
    goodsId: null,
    showShopPopup:false,
    buyNumber: 0,
    buyNumMin: 1,
    buyNumMax: 0,
    canSubmit: false, //  选中规格尺寸时候是否允许加入购物车
    shopType: "addShopCar", //购物类型，加入购物车或立即购买，默认为加入购物车
    goodsAddition:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: { id: any; }) {
    this.setData({ goodsId: e.id })
    this.reputation(e.id);
    this.goodsAddition();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getGoodsDetail();
  },
  async goodsAddition(){
    const res = await WXAPI.goodsAddition(this.data.goodsId)
    if (res.code == 0) {
      this.setData({
        goodsAddition: res.data,
        hasMoreSelect: true,
      })
    }
  },
  async getGoodsDetail() {
    const goodsDetailRes = await WXAPI.goodsDetail(this.data.goodsId);
    if (goodsDetailRes.code == 0) {
      let _data = {
        goodsDetail: goodsDetailRes.data,
        buyNumMax: goodsDetailRes.data.basicInfo.stores,
        buyNumber: (goodsDetailRes.data.basicInfo.stores > 0) ? 1 : 0
      }
      this.setData(_data)
    }
  },
  reputation(goodsId: any) {
    WXAPI.goodsReputation({
      goodsId: goodsId
    }).then((res: { code: number; data: any; }) => {
      if (res.code == 0) {
        this.setData({
          reputation: res.data
        });
      }
    })
  },
  /**
   * 添加到购物车
   */
  toAddShopCar() {
    this.setData({
      shopType: "addShopCar"
    }),
      this.guigeTap();
  },
  guigeTap() {
    this.setData({
      showShopPopup: true
    })
  },
  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap() {
    this.setData({
      showShopPopup: false
    })
  },
  stepChange(e: { detail: any; }){
    this.setData({
      buyNumber: e.detail
    })
  },
  /**
   * 加入购物车
   */
  async addShopCar() {
    const goodsAddition: { id: any; pid: any; }[] = [];
    if (this.data.buyNumber < 1) {
      wx.showToast({
        title: '请选择购买数量',
        icon: 'none'
      });
      return;
    }
    const isLogined = await AUTH.checkHasLogined();
    console.info(isLogined);

    if (!isLogined) {
      this.setData({
        wxlogin: false
      })
      return;
    }
    const token = wx.getStorageSync('token');
    const goodsId = this.data.goodsDetail.basicInfo.id;
    const sku: { optionId: any; optionValueId: any; }[] = [];
    const res = await WXAPI.shippingCarInfoAddItem(token, goodsId, this.data.buyNumber, sku, goodsAddition);
    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      });
      return
    }

    this.closePopupTap();
    wx.showToast({
      title: '加入购物车',
      icon: 'success'
    })
    this.shippingCartInfo()
  },
  async shippingCartInfo(){
    const token = wx.getStorageSync('token')
    if (!token) {
      return
    }
    const res = await WXAPI.shippingCarInfo(token)
    if (res.code == 0) {
      this.setData({
        shopNum: res.data.number
      })
    }
  },
  cancelLogin() {
    this.setData({
      wxlogin: true
    })
  },
  processLogin(e: { detail: { userInfo: any; }; }) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: 'none',
      })
      return;
    }
    AUTH.register(this);
  },
})