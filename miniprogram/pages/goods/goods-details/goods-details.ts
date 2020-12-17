const WXAPI = require('apifm-wxapi');
export {}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsDetail: {},
        goodsId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e: { id: any; }) {
        this.setData({ goodsId: e.id })
        this.reputation(e.id);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getGoodsDetail();
    },
    async getGoodsDetail() {
        const goodsDetailRes = await WXAPI.goodsDetail(this.data.goodsId);
        if (goodsDetailRes.code == 0) {
            let _data = {
                goodsDetail: goodsDetailRes.data
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
})