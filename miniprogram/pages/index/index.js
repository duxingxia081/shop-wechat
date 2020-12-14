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
                    console.log("code" + res.code);
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
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, WXAPI.goods({
                            miaosha: true
                        })];
                    case 1:
                        res = _a.sent();
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
                            this.setData({
                                miaoshaGoods: res.data
                            });
                        }
                        return [2];
                }
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
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0QixJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQztBQUVqQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLENBQUM7UUFDWCxLQUFLLEVBQUUsRUFBRTtLQUNWO0lBQ0QsTUFBTTtRQUNKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFSyxXQUFXOzs7O2dCQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFpQztvQkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO3dCQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSTt5QkFDbEIsQ0FBQyxDQUFBO3FCQUNIO2dCQUNILENBQUMsQ0FBQyxDQUFBOzs7O0tBQ0g7SUFDRCxTQUFTLEVBQUU7UUFBQSxpQkFRVjtRQVBDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFF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U0FBUyxFQUFFO1lBQ2IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBO1NBQ2xDO0lBQ0gsQ0FBQztJQUNELFVBQVUsRUFBQyxVQUFTLENBQW9EO1FBQ3RFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBQyxHQUFHLEVBQUMsOENBQThDLEdBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQTtJQUNoRyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgV1hBUEkgPSByZXF1aXJlKCdhcGlmbS13eGFwaScpO1xuV1hBUEkuaW5pdCgnc2t5c2hvcCcpO1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgYWN0aXZlQ2F0ZWdvcnlJZDogMCxcbiAgICBjdXJQYWdlOiAxLFxuICAgIHBhZ2VTaXplOiA2LFxuICAgIGdvb2RzOiBbXVxuICB9LFxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5pbml0QmFubmVycygpO1xuICAgIHRoaXMuZ2V0Tm90aWNlKCk7XG4gICAgdGhpcy5pbml0TWlhb3NoYUdvb2RzKCk7XG4gICAgdGhpcy5pbml0Q2F0ZWdvcmllcygpO1xuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgYXN5bmMgaW5pdEJhbm5lcnMoKSB7XG4gICAgV1hBUEkuYmFubmVycyh7IHR5cGU6ICdpbmRleCcgfSkudGhlbigocmVzOiB7IGNvZGU6IG51bWJlcjsgZGF0YTogYW55OyB9KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImNvZGVcIiArIHJlcy5jb2RlKTtcbiAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgYmFubmVyczogcmVzLmRhdGFcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnZXROb3RpY2U6IGZ1bmN0aW9uICgpIHtcbiAgICBXWEFQSS5ub3RpY2VMaXN0KHsgcGFnZVNpemU6IDUgfSkudGhlbigocmVzOiB7IGNvZGU6IG51bWJlcjsgZGF0YTogYW55OyB9KSA9PiB7XG4gICAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG5vdGljZUxpc3Q6IHJlcy5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGFzeW5jIGluaXRNaWFvc2hhR29vZHMoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgV1hBUEkuZ29vZHMoe1xuICAgICAgbWlhb3NoYTogdHJ1ZVxuICAgIH0pXG4gICAgaWYgKHJlcy5jb2RlID09IDApIHtcbiAgICAgIHJlcy5kYXRhLmZvckVhY2goKGVsZTogeyBkYXRlU3RhcnQ6IHN0cmluZzsgZGF0ZVN0YXJ0SW50OiBudW1iZXI7IGRhdGVFbmQ6IHN0cmluZzsgZGF0ZUVuZEludDogbnVtYmVyOyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IF9ub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBpZiAoZWxlLmRhdGVTdGFydCkge1xuICAgICAgICAgIGVsZS5kYXRlU3RhcnRJbnQgPSBuZXcgRGF0ZShlbGUuZGF0ZVN0YXJ0LnJlcGxhY2UoLy0vZywgJy8nKSkuZ2V0VGltZSgpIC0gX25vd1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbGUuZGF0ZUVuZCkge1xuICAgICAgICAgIGVsZS5kYXRlRW5kSW50ID0gbmV3IERhdGUoZWxlLmRhdGVFbmQucmVwbGFjZSgvLS9nLCAnLycpKS5nZXRUaW1lKCkgLSBfbm93XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBtaWFvc2hhR29vZHM6IHJlcy5kYXRhXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgaW5pdENhdGVnb3JpZXMoKSB7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgV1hBUEkuZ29vZHNDYXRlZ29yeSgpXG4gICAgbGV0IGNhdGVnb3JpZXM6IGFueVtdID0gW107XG4gICAgaWYgKHJlcy5jb2RlID09IDApIHtcbiAgICAgIGNvbnN0IF9jYXRlZ29yaWVzID0gcmVzLmRhdGEuZmlsdGVyKChlbGU6IHsgbGV2ZWw6IG51bWJlcjsgfSkgPT4ge1xuICAgICAgICByZXR1cm4gZWxlLmxldmVsID09IDFcbiAgICAgIH0pXG4gICAgICBjYXRlZ29yaWVzID0gY2F0ZWdvcmllcy5jb25jYXQoX2NhdGVnb3JpZXMpXG4gICAgfVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBjYXRlZ29yaWVzOiBjYXRlZ29yaWVzLFxuICAgICAgYWN0aXZlQ2F0ZWdvcnlJZDogMCxcbiAgICAgIGN1clBhZ2U6IDFcbiAgICB9KTtcbiAgICB0aGlzLmdldEdvb2RzTGlzdCgwLCBmYWxzZSk7XG4gIH0sXG4gIGFzeW5jIGdldEdvb2RzTGlzdChjYXRlZ29yeUlkOiBzdHJpbmcgfCBudW1iZXIsIGFwcGVuZDogQm9vbGVhbikge1xuICAgIGlmIChjYXRlZ29yeUlkID09IDApIHtcbiAgICAgIGNhdGVnb3J5SWQgPSBcIlwiO1xuICAgIH1cbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICBcInRpdGxlXCI6ICcnLFxuICAgICAgXCJtYXNrXCI6IHRydWVcbiAgICB9KTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBXWEFQSS5nb29kcyh7XG4gICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkLFxuICAgICAgcGFnZTogdGhpcy5kYXRhLmN1clBhZ2UsXG4gICAgICBwYWdlU2l6ZTogdGhpcy5kYXRhLnBhZ2VTaXplXG4gICAgfSlcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKHJlcy5jb2RlID09IDQwNCB8fCByZXMuY29kZSA9PSA3MDApIHtcbiAgICAgIGxldCBuZXdEYXRhID0ge1xuICAgICAgICBsb2FkaW5nTW9yZUhpZGRlbjogZmFsc2UsXG4gICAgICAgIGdvb2RzOiB0aGlzLmRhdGEuZ29vZHNcbiAgICAgIH07XG4gICAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgICBuZXdEYXRhLmdvb2RzID0gW107XG4gICAgICB9XG4gICAgICB0aGlzLnNldERhdGEobmV3RGF0YSk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IG5ld0dvb2RzOiBhbnlbXSA9IFtdO1xuICAgIGlmIChhcHBlbmQpIHtcbiAgICAgIG5ld0dvb2RzID0gdGhpcy5kYXRhLmdvb2RzXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld0dvb2RzLnB1c2gocmVzLmRhdGFbaV0pO1xuICAgIH1cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbG9hZGluZ01vcmVIaWRkZW46IHRydWUsXG4gICAgICBnb29kczogbmV3R29vZHNcbiAgICB9KTtcbiAgfSxcbiAgb25SZWFjaEJvdHRvbTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBjdXJQYWdlOiB0aGlzLmRhdGEuY3VyUGFnZSArIDFcbiAgICB9KTtcbiAgICB0aGlzLmdldEdvb2RzTGlzdCh0aGlzLmRhdGEuYWN0aXZlQ2F0ZWdvcnlJZCwgdHJ1ZSlcbiAgfSxcbiAgLyoqXG4gICAqIOeCueWHu2Jhbm5lcuS6i+S7tlxuICAgKi9cbiAgc2hvd0Jhbm5lcjogZnVuY3Rpb24gKGU6IHsgY3VycmVudFRhcmdldDogeyBkYXRhc2V0OiB7IHVybDogYW55OyB9OyB9OyB9KSB7XG4gICAgY29uc3QgdGFyZ2V0VXJsID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsO1xuICAgIGlmICh0YXJnZXRVcmwpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oeyB1cmw6IHRhcmdldFVybCB9KVxuICAgIH1cbiAgfSxcbiAgc2hvd0RldGFpbDpmdW5jdGlvbihlOiB7IGN1cnJlbnRUYXJnZXQ6IHsgZGF0YXNldDogeyBpZDogc3RyaW5nOyB9OyB9OyB9KXtcbiAgICB3eC5uYXZpZ2F0ZVRvKHt1cmw6XCIvcGFnZXMvZ29vZHMvZ29vZHMtZGV0YWlscy9nb29kcy1kZXRhaWxzP2lkPVwiK2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkfSlcbiAgfVxufSlcbiJdfQ==