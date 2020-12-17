const WXAPI = require('apifm-wxapi')
export { }
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeCategory: 0,
        categorySelectedId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.categories();
    },
    async categories() {
        wx.showLoading({
            title: '加载中',
        })
        await WXAPI.goodsCategory().then((res: { code: number; data: any; }) => {
            let categoryId = '';
            if (res.code == 0) {
                let item = res.data[0];
                if (!this.data.categorySelectedId) {
                    categoryId = item.id;
                }
                this.setData({
                    categories: res.data,
                    categorySelectedId: categoryId
                });
                this.getGoodsList();
            };
        })
    },
    async getGoodsList() {
        await WXAPI.goods({
            categoryId: this.data.categorySelectedId,
            page: 1,
            pageSize: 100000
        }).then((res: { code: number; data: any; }) => {
            if (res.code == 700) {
                this.setData({
                    currentGoods: null
                });
                return
            }
            this.setData({
                currentGoods: res.data
            });
            wx.hideLoading();
        })
    },
})