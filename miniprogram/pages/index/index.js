"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WXAPI = require('apifm-wxapi');
WXAPI.init('skyshop');
var app = getApp();
Page({
    data: {
        activeCategoryId: 0,
        curPage: 1,
        pageSize: 6,
        goods: []
    },
    onLoad: function () {
        this.initBanners();
        this.getNotice();
        this.initMiaoshaGoods();
        this.initCategories();
    },
    initBanners: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                WXAPI.banners({ type: 'index' }).then(function (res) {
                    if (res.code == 0) {
                        _this.setData({
                            banners: res.data
                        });
                    }
                });
                return [2];
            });
        });
    },
    getNotice: function () {
        var _this = this;
        WXAPI.noticeList({ pageSize: 5 }).then(function (res) {
            if (res.code == 0) {
                _this.setData({
                    noticeList: res.data
                });
            }
        });
    },
    initMiaoshaGoods: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                WXAPI.goods({
                    miaosha: true
                }).then(function (res) {
                    if (res.code == 0) {
                        res.data.forEach(function (ele) {
                            var _now = new Date().getTime();
                            if (ele.dateStart) {
                                ele.dateStartInt = new Date(ele.dateStart.replace(/-/g, '/')).getTime() - _now;
                            }
                            if (ele.dateEnd) {
                                ele.dateEndInt = new Date(ele.dateEnd.replace(/-/g, '/')).getTime() - _now;
                            }
                        });
                        _this.setData({
                            miaoshaGoods: res.data
                        });
                    }
                });
                return [2];
            });
        });
    },
    initCategories: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, categories, _categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, WXAPI.goodsCategory()];
                    case 1:
                        res = _a.sent();
                        categories = [];
                        if (res.code == 0) {
                            _categories = res.data.filter(function (ele) {
                                return ele.level == 1;
                            });
                            categories = categories.concat(_categories);
                        }
                        this.setData({
                            categories: categories,
                            activeCategoryId: 0,
                            curPage: 1
                        });
                        this.getGoodsList(0, false);
                        return [2];
                }
            });
        });
    },
    getGoodsList: function (categoryId, append) {
        return __awaiter(this, void 0, void 0, function () {
            var res, newData, newGoods, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (categoryId == 0) {
                            categoryId = "";
                        }
                        wx.showLoading({
                            "title": '',
                            "mask": true
                        });
                        return [4, WXAPI.goods({
                                categoryId: categoryId,
                                page: this.data.curPage,
                                pageSize: this.data.pageSize
                            })];
                    case 1:
                        res = _a.sent();
                        wx.hideLoading();
                        if (res.code == 404 || res.code == 700) {
                            newData = {
                                loadingMoreHidden: false,
                                goods: this.data.goods
                            };
                            if (!append) {
                                newData.goods = [];
                            }
                            this.setData(newData);
                            return [2];
                        }
                        newGoods = [];
                        if (append) {
                            newGoods = this.data.goods;
                        }
                        for (i = 0; i < res.data.length; i++) {
                            newGoods.push(res.data[i]);
                        }
                        this.setData({
                            loadingMoreHidden: true,
                            goods: newGoods
                        });
                        return [2];
                }
            });
        });
    },
    onReachBottom: function () {
        this.setData({
            curPage: this.data.curPage + 1
        });
        this.getGoodsList(this.data.activeCategoryId, true);
    },
    showBanner: function (e) {
        var targetUrl = e.currentTarget.dataset.url;
        if (targetUrl) {
            wx.navigateTo({ url: targetUrl });
        }
    },
    showDetail: function (e) {
        wx.navigateTo({ url: "/pages/goods/goods-details/goods-details?id=" + e.currentTarget.dataset.id });
    },
    goCategory: function (e) {
        wx.setStorageSync("_categoryId", e.currentTarget.id);
        wx.switchTab({
            url: '/pages/category/category',
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0QixJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLENBQUM7UUFDWCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFSyxXQUFXOzs7O2dCQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFpQztvQkFDdEUsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTt3QkFDakIsS0FBSSxDQUFDLE9BQU8sQ0FBQzs0QkFDWCxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUk7eUJBQ2xCLENBQUMsQ0FBQTtxQkFDSDtnQkFDSCxDQUFDLENBQUMsQ0FBQTs7OztLQUNIO0lBQ0QsU0FBUyxFQUFFO1FBQUEsaUJBUVY7UUFQQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBaUM7WUFDdkUsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJ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RSxTQUFTLEVBQUUsQ0FBQyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUNELFVBQVUsRUFBQyxVQUFTLENBQW9EO1FBQ3RFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsOENBQThDLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQTtJQUNoRyxDQUFDO0lBQ0QsVUFBVSxFQUFFLFVBQVMsQ0FBbUM7UUFDdEQsRUFBRSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNwRCxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ1gsR0FBRyxFQUFFLDBCQUEwQjtTQUNoQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgV1hBUEkgPSByZXF1aXJlKCdhcGlmbS13eGFwaScpO1xuV1hBUEkuaW5pdCgnc2t5c2hvcCcpO1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgYWN0aXZlQ2F0ZWdvcnlJZDogMCxcbiAgICBjdXJQYWdlOiAxLFxuICAgIHBhZ2VTaXplOiA2LFxuICAgIGdvb2RzOiBbXVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5pbml0QmFubmVycygpO1xuICAgIHRoaXMuZ2V0Tm90aWNlKCk7XG4gICAgdGhpcy5pbml0TWlhb3NoYUdvb2RzKCk7XG4gICAgdGhpcy5pbml0Q2F0ZWdvcmllcygpO1xuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgYXN5bmMgaW5pdEJhbm5lcnMoKSB7XG4gICAgV1hBUEkuYmFubmVycyh7IHR5cGU6ICdpbmRleCcgfSkudGhlbigocmVzOiB7IGNvZGU6IG51bWJlcjsgZGF0YTogYW55OyB9KSA9PiB7XG4gICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIGJhbm5lcnM6IHJlcy5kYXRhXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgZ2V0Tm90aWNlOiBmdW5jdGlvbiAoKSB7XG4gICAgV1hBUEkubm90aWNlTGlzdCh7IHBhZ2VTaXplOiA1IH0pLnRoZW4oKHJlczogeyBjb2RlOiBudW1iZXI7IGRhdGE6IGFueTsgfSkgPT4ge1xuICAgICAgaWYgKHJlcy5jb2RlID09IDApIHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBub3RpY2VMaXN0OiByZXMuZGF0YVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBhc3luYyBpbml0TWlhb3NoYUdvb2RzKCkge1xuICAgIFdYQVBJLmdvb2RzKHtcbiAgICAgIG1pYW9zaGE6IHRydWVcbiAgICB9KS50aGVuKChyZXM6IHsgY29kZTogbnVtYmVyOyBkYXRhOiB7IGRhdGVTdGFydDogc3RyaW5nOyBkYXRlU3RhcnRJbnQ6IG51bWJlcjsgZGF0ZUVuZDogc3RyaW5nOyBkYXRlRW5kSW50OiBudW1iZXI7IH1bXTsgfSk9PntcbiAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XG4gICAgICAgIHJlcy5kYXRhLmZvckVhY2goKGVsZTogeyBkYXRlU3RhcnQ6IHN0cmluZzsgZGF0ZVN0YXJ0SW50OiBudW1iZXI7IGRhdGVFbmQ6IHN0cmluZzsgZGF0ZUVuZEludDogbnVtYmVyOyB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgX25vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgICAgaWYgKGVsZS5kYXRlU3RhcnQpIHtcbiAgICAgICAgICAgIGVsZS5kYXRlU3RhcnRJbnQgPSBuZXcgRGF0ZShlbGUuZGF0ZVN0YXJ0LnJlcGxhY2UoLy0vZywgJy8nKSkuZ2V0VGltZSgpIC0gX25vd1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZWxlLmRhdGVFbmQpIHtcbiAgICAgICAgICAgIGVsZS5kYXRlRW5kSW50ID0gbmV3IERhdGUoZWxlLmRhdGVFbmQucmVwbGFjZSgvLS9nLCAnLycpKS5nZXRUaW1lKCkgLSBfbm93XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG1pYW9zaGFHb29kczogcmVzLmRhdGFcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBhc3luYyBpbml0Q2F0ZWdvcmllcygpIHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBXWEFQSS5nb29kc0NhdGVnb3J5KClcbiAgICBsZXQgY2F0ZWdvcmllczogYW55W10gPSBbXTtcbiAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xuICAgICAgY29uc3QgX2NhdGVnb3JpZXMgPSByZXMuZGF0YS5maWx0ZXIoKGVsZTogeyBsZXZlbDogbnVtYmVyOyB9KSA9PiB7XG4gICAgICAgIHJldHVybiBlbGUubGV2ZWwgPT0gMVxuICAgICAgfSlcbiAgICAgIGNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzLmNvbmNhdChfY2F0ZWdvcmllcylcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGNhdGVnb3JpZXM6IGNhdGVnb3JpZXMsXG4gICAgICBhY3RpdmVDYXRlZ29yeUlkOiAwLFxuICAgICAgY3VyUGFnZTogMVxuICAgIH0pO1xuICAgIHRoaXMuZ2V0R29vZHNMaXN0KDAsIGZhbHNlKTtcbiAgfSxcbiAgYXN5bmMgZ2V0R29vZHNMaXN0KGNhdGVnb3J5SWQ6IHN0cmluZyB8IG51bWJlciwgYXBwZW5kOiBCb29sZWFuKSB7XG4gICAgaWYgKGNhdGVnb3J5SWQgPT0gMCkge1xuICAgICAgY2F0ZWdvcnlJZCA9IFwiXCI7XG4gICAgfVxuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIFwidGl0bGVcIjogJycsXG4gICAgICBcIm1hc2tcIjogdHJ1ZVxuICAgIH0pO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IFdYQVBJLmdvb2RzKHtcbiAgICAgIGNhdGVnb3J5SWQ6IGNhdGVnb3J5SWQsXG4gICAgICBwYWdlOiB0aGlzLmRhdGEuY3VyUGFnZSxcbiAgICAgIHBhZ2VTaXplOiB0aGlzLmRhdGEucGFnZVNpemVcbiAgICB9KVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICBpZiAocmVzLmNvZGUgPT0gNDA0IHx8IHJlcy5jb2RlID09IDcwMCkge1xuICAgICAgbGV0IG5ld0RhdGEgPSB7XG4gICAgICAgIGxvYWRpbmdNb3JlSGlkZGVuOiBmYWxzZSxcbiAgICAgICAgZ29vZHM6IHRoaXMuZGF0YS5nb29kc1xuICAgICAgfTtcbiAgICAgIGlmICghYXBwZW5kKSB7XG4gICAgICAgIG5ld0RhdGEuZ29vZHMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YShuZXdEYXRhKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgbmV3R29vZHM6IGFueVtdID0gW107XG4gICAgaWYgKGFwcGVuZCkge1xuICAgICAgbmV3R29vZHMgPSB0aGlzLmRhdGEuZ29vZHNcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgbmV3R29vZHMucHVzaChyZXMuZGF0YVtpXSk7XG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBsb2FkaW5nTW9yZUhpZGRlbjogdHJ1ZSxcbiAgICAgIGdvb2RzOiBuZXdHb29kc1xuICAgIH0pO1xuICB9LFxuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGN1clBhZ2U6IHRoaXMuZGF0YS5jdXJQYWdlICsgMVxuICAgIH0pO1xuICAgIHRoaXMuZ2V0R29vZHNMaXN0KHRoaXMuZGF0YS5hY3RpdmVDYXRlZ29yeUlkLCB0cnVlKVxuICB9LFxuICAvKipcbiAgICog54K55Ye7YmFubmVy5LqL5Lu2XG4gICAqL1xuICBzaG93QmFubmVyOiBmdW5jdGlvbiAoZTogeyBjdXJyZW50VGFyZ2V0OiB7IGRhdGFzZXQ6IHsgdXJsOiBhbnk7IH07IH07IH0pIHtcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmw7XG4gICAgaWYgKHRhcmdldFVybCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7IHVybDogdGFyZ2V0VXJsIH0pXG4gICAgfVxuICB9LFxuICBzaG93RGV0YWlsOmZ1bmN0aW9uKGU6IHsgY3VycmVudFRhcmdldDogeyBkYXRhc2V0OiB7IGlkOiBzdHJpbmc7IH07IH07IH0pe1xuICAgIHd4Lm5hdmlnYXRlVG8oe3VybDpcIi9wYWdlcy9nb29kcy9nb29kcy1kZXRhaWxzL2dvb2RzLWRldGFpbHM/aWQ9XCIrZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWR9KVxuICB9LFxuICBnb0NhdGVnb3J5OiBmdW5jdGlvbihlOiB7IGN1cnJlbnRUYXJnZXQ6IHsgaWQ6IGFueTsgfTsgfSkge1xuICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiX2NhdGVnb3J5SWRcIiwgZS5jdXJyZW50VGFyZ2V0LmlkKVxuICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICB1cmw6ICcvcGFnZXMvY2F0ZWdvcnkvY2F0ZWdvcnknLFxuICAgIH0pXG4gIH0sXG59KVxuIl19