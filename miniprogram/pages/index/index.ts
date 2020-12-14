const WXAPI = require('apifm-wxapi');
WXAPI.init('skyshop');
const app = getApp<IAppOption>();

Page({
  data: {
    activeCategoryId: 0,
    curPage: 1,
    pageSize: 6,
    goods: []
  },
  onLoad() {
    this.initBanners();
    this.getNotice();
    this.initMiaoshaGoods();
    this.initCategories();
  },
  // 事件处理函数
  async initBanners() {
    WXAPI.banners({ type: 'index' }).then((res: { code: number; data: any; }) => {
      console.log("code" + res.code);
      if (res.code == 0) {
        this.setData({
          banners: res.data
        })
      }
    })
  },
  getNotice: function () {
    WXAPI.noticeList({ pageSize: 5 }).then((res: { code: number; data: any; }) => {
      if (res.code == 0) {
        this.setData({
          noticeList: res.data
        });
      }
    })
  },
  async initMiaoshaGoods() {
    const res = await WXAPI.goods({
      miaosha: true
    })
    if (res.code == 0) {
      res.data.forEach((ele: { dateStart: string; dateStartInt: number; dateEnd: string; dateEndInt: number; }) => {
        const _now = new Date().getTime()
        if (ele.dateStart) {
          ele.dateStartInt = new Date(ele.dateStart.replace(/-/g, '/')).getTime() - _now
        }
        if (ele.dateEnd) {
          ele.dateEndInt = new Date(ele.dateEnd.replace(/-/g, '/')).getTime() - _now
        }
      })
      this.setData({
        miaoshaGoods: res.data
      })
    }
  },
  async initCategories() {
    const res = await WXAPI.goodsCategory()
    let categories: any[] = [];
    if (res.code == 0) {
      const _categories = res.data.filter((ele: { level: number; }) => {
        return ele.level == 1
      })
      categories = categories.concat(_categories)
    }
    this.setData({
      categories: categories,
      activeCategoryId: 0,
      curPage: 1
    });
    this.getGoodsList(0, false);
  },
  async getGoodsList(categoryId: string | number, append: Boolean) {
    if (categoryId == 0) {
      categoryId = "";
    }
    wx.showLoading({
      "title": '',
      "mask": true
    });
    const res = await WXAPI.goods({
      categoryId: categoryId,
      page: this.data.curPage,
      pageSize: this.data.pageSize
    })
    wx.hideLoading()
    if (res.code == 404 || res.code == 700) {
      let newData = {
        loadingMoreHidden: false,
        goods: this.data.goods
      };
      if (!append) {
        newData.goods = [];
      }
      this.setData(newData);
      return
    }
    let newGoods: any[] = [];
    if (append) {
      newGoods = this.data.goods
    }
    for (var i = 0; i < res.data.length; i++) {
      newGoods.push(res.data[i]);
    }
    this.setData({
      loadingMoreHidden: true,
      goods: newGoods
    });
  },
  onReachBottom: function () {
    this.setData({
      curPage: this.data.curPage + 1
    });
    this.getGoodsList(this.data.activeCategoryId, true)
  },
  /**
   * 点击banner事件
   */
  showBanner: function (e: { currentTarget: { dataset: { url: any; }; }; }) {
    const targetUrl = e.currentTarget.dataset.url;
    if (targetUrl) {
      wx.navigateTo({ url: targetUrl })
    }
  },
  showDetail:function(e: { currentTarget: { dataset: { id: string; }; }; }){
    wx.navigateTo({url:"/pages/goods/goods-details/goods-details?id="+e.currentTarget.dataset.id})
  }
})
