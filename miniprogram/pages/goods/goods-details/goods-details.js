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
Object.defineProperty(exports, "__esModule", { value: true });
var WXAPI = require('apifm-wxapi');
var AUTH = require('../../../utils/auth');
Page({
    data: {
        wxlogin: true,
        goodsDetail: {},
        goodsId: null,
        showShopPopup: false,
        buyNumber: 0,
        buyNumMin: 1,
        buyNumMax: 0,
        canSubmit: false,
        shopType: "addShopCar",
        goodsAddition: [],
    },
    onLoad: function (e) {
        this.setData({ goodsId: e.id });
        this.reputation(e.id);
        this.goodsAddition();
    },
    onShow: function () {
        this.getGoodsDetail();
    },
    goodsAddition: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, WXAPI.goodsAddition(this.data.goodsId)];
                    case 1:
                        res = _a.sent();
                        if (res.code == 0) {
                            this.setData({
                                goodsAddition: res.data,
                                hasMoreSelect: true,
                            });
                        }
                        return [2];
                }
            });
        });
    },
    getGoodsDetail: function () {
        return __awaiter(this, void 0, void 0, function () {
            var goodsDetailRes, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, WXAPI.goodsDetail(this.data.goodsId)];
                    case 1:
                        goodsDetailRes = _a.sent();
                        if (goodsDetailRes.code == 0) {
                            _data = {
                                goodsDetail: goodsDetailRes.data,
                                buyNumMax: goodsDetailRes.data.basicInfo.stores,
                                buyNumber: (goodsDetailRes.data.basicInfo.stores > 0) ? 1 : 0
                            };
                            this.setData(_data);
                        }
                        return [2];
                }
            });
        });
    },
    reputation: function (goodsId) {
        var _this = this;
        WXAPI.goodsReputation({
            goodsId: goodsId
        }).then(function (res) {
            if (res.code == 0) {
                _this.setData({
                    reputation: res.data
                });
            }
        });
    },
    toAddShopCar: function () {
        this.setData({
            shopType: "addShopCar"
        }),
            this.guigeTap();
    },
    guigeTap: function () {
        this.setData({
            showShopPopup: true
        });
    },
    closePopupTap: function () {
        this.setData({
            showShopPopup: false
        });
    },
    stepChange: function (e) {
        this.setData({
            buyNumber: e.detail
        });
    },
    addShopCar: function () {
        return __awaiter(this, void 0, void 0, function () {
            var goodsAddition, isLogined, token, goodsId, sku, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        goodsAddition = [];
                        if (this.data.buyNumber < 1) {
                            wx.showToast({
                                title: '请选择购买数量',
                                icon: 'none'
                            });
                            return [2];
                        }
                        return [4, AUTH.checkHasLogined()];
                    case 1:
                        isLogined = _a.sent();
                        console.info(isLogined);
                        if (!isLogined) {
                            this.setData({
                                wxlogin: false
                            });
                            return [2];
                        }
                        token = wx.getStorageSync('token');
                        goodsId = this.data.goodsDetail.basicInfo.id;
                        sku = [];
                        return [4, WXAPI.shippingCarInfoAddItem(token, goodsId, this.data.buyNumber, sku, goodsAddition)];
                    case 2:
                        res = _a.sent();
                        if (res.code != 0) {
                            wx.showToast({
                                title: res.msg,
                                icon: 'none'
                            });
                            return [2];
                        }
                        this.closePopupTap();
                        wx.showToast({
                            title: '加入购物车',
                            icon: 'success'
                        });
                        this.shippingCartInfo();
                        return [2];
                }
            });
        });
    },
    shippingCartInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = wx.getStorageSync('token');
                        if (!token) {
                            return [2];
                        }
                        return [4, WXAPI.shippingCarInfo(token)];
                    case 1:
                        res = _a.sent();
                        if (res.code == 0) {
                            this.setData({
                                shopNum: res.data.number
                            });
                        }
                        return [2];
                }
            });
        });
    },
    cancelLogin: function () {
        this.setData({
            wxlogin: true
        });
    },
    processLogin: function (e) {
        if (!e.detail.userInfo) {
            wx.showToast({
                title: '已取消',
                icon: 'none',
            });
            return;
        }
        AUTH.register(this);
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMtZGV0YWlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2RzLWRldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNyQyxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUUzQyxJQUFJLENBQUM7SUFLSCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUMsSUFBSTtRQUNaLFdBQVcsRUFBRSxFQUFFO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixhQUFhLEVBQUMsS0FBSztRQUNuQixTQUFTLEVBQUUsQ0FBQztRQUNaLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLENBQUM7UUFDWixTQUFTLEVBQUUsS0FBSztRQUNoQixRQUFRLEVBQUUsWUFBWTtRQUN0QixhQUFhLEVBQUMsRUFBRTtLQUNqQjtJQUtELE1BQU0sWUFBQyxDQUFlO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFLRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDSyxhQUFhOzs7Ozs0QkFDTCxXQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQWxELEdBQUcsR0FBRyxTQUE0Qzt3QkFDeEQsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTs0QkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0NBQ3ZCLGFBQWEsRUFBRSxJQUFJOzZCQUNwQixDQUFDLENBQUE7eUJBQ0g7Ozs7O0tBQ0Y7SUFDSyxjQUFjOzs7Ozs0QkFDSyxXQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQTs7d0JBQTNELGNBQWMsR0FBRyxTQUEwQzt3QkFDakUsSUFBSSxjQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTs0QkFDeEIsS0FBSyxHQUFHO2dDQUNWLFdBQVcsRUFBRSxjQUFjLENBQUMsSUFBSTtnQ0FDaEMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07Z0NBQy9DLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUM5RCxDQUFBOzRCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7eUJBQ3BCOzs7OztLQUNGO0lBQ0QsVUFBVSxZQUFDLE9BQVk7UUFBdkIsaUJBVUM7UUFUQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFpQztZQUN4QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFO2dCQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLFVBQVUsRUFBRSxHQUFHLENBQUMsSUFBSTtpQkFDckIsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFJRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxZQUFZO1NBQ3ZCLENBQUM7WUFDQSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlELGFBQWE7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsYUFBYSxFQUFFLEtBQUs7U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELFVBQVUsWUFBQyxDQUFtQjtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsU0FBUyxFQUFFLENBQUMsQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFJSyxVQUFVOzs7Ozs7d0JBQ1IsYUFBYSxHQUE2QixFQUFFLENBQUM7d0JBQ25ELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFOzRCQUMzQixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxTQUFTO2dDQUNoQixJQUFJLEVBQUUsTUFBTTs2QkFDYixDQUFDLENBQUM7NEJBQ0gsV0FBTzt5QkFDUjt3QkFDaUIsV0FBTSxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUE7O3dCQUF4QyxTQUFTLEdBQUcsU0FBNEI7d0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBRXhCLElBQUksQ0FBQyxTQUFTLEVBQUU7NEJBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDWCxPQUFPLEVBQUUsS0FBSzs2QkFDZixDQUFDLENBQUE7NEJBQ0YsV0FBTzt5QkFDUjt3QkFDSyxLQUFLLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbkMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0JBQzdDLEdBQUcsR0FBNkMsRUFBRSxDQUFDO3dCQUM3QyxXQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsRUFBQTs7d0JBQWpHLEdBQUcsR0FBRyxTQUEyRjt3QkFDdkcsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTs0QkFDakIsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUc7Z0NBQ2QsSUFBSSxFQUFFLE1BQU07NkJBQ2IsQ0FBQyxDQUFDOzRCQUNILFdBQU07eUJBQ1A7d0JBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixFQUFFLENBQUMsU0FBUyxDQUFDOzRCQUNYLEtBQUssRUFBRSxPQUFPOzRCQUNkLElBQUksRUFBRSxTQUFTO3lCQUNoQixDQUFDLENBQUE7d0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7Ozs7O0tBQ3hCO0lBQ0ssZ0JBQWdCOzs7Ozs7d0JBQ2QsS0FBSyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7d0JBQ3hDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1YsV0FBTTt5QkFDUDt3QkFDVyxXQUFNLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUE7O3dCQUF4QyxHQUFHLEdBQUcsU0FBa0M7d0JBQzlDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7NEJBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1gsT0FBTyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTs2QkFDekIsQ0FBQyxDQUFBO3lCQUNIOzs7OztLQUNGO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxPQUFPLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxZQUFZLFlBQUMsQ0FBa0M7UUFDN0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDLENBQUE7WUFDRixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBXWEFQSSA9IHJlcXVpcmUoJ2FwaWZtLXd4YXBpJyk7XG5jb25zdCBBVVRIID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMvYXV0aCcpXG5leHBvcnQgeyB9XG5QYWdlKHtcblxuICAvKipcbiAgICog6aG16Z2i55qE5Yid5aeL5pWw5o2uXG4gICAqL1xuICBkYXRhOiB7XG4gICAgd3hsb2dpbjp0cnVlLFxuICAgIGdvb2RzRGV0YWlsOiB7fSxcbiAgICBnb29kc0lkOiBudWxsLFxuICAgIHNob3dTaG9wUG9wdXA6ZmFsc2UsXG4gICAgYnV5TnVtYmVyOiAwLFxuICAgIGJ1eU51bU1pbjogMSxcbiAgICBidXlOdW1NYXg6IDAsXG4gICAgY2FuU3VibWl0OiBmYWxzZSwgLy8gIOmAieS4reinhOagvOWwuuWvuOaXtuWAmeaYr+WQpuWFgeiuuOWKoOWFpei0reeJqei9plxuICAgIHNob3BUeXBlOiBcImFkZFNob3BDYXJcIiwgLy/otK3niannsbvlnovvvIzliqDlhaXotK3nianovabmiJbnq4vljbPotK3kubDvvIzpu5jorqTkuLrliqDlhaXotK3nianovaZcbiAgICBnb29kc0FkZGl0aW9uOltdLFxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkKGU6IHsgaWQ6IGFueTsgfSkge1xuICAgIHRoaXMuc2V0RGF0YSh7IGdvb2RzSWQ6IGUuaWQgfSlcbiAgICB0aGlzLnJlcHV0YXRpb24oZS5pZCk7XG4gICAgdGhpcy5nb29kc0FkZGl0aW9uKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3coKSB7XG4gICAgdGhpcy5nZXRHb29kc0RldGFpbCgpO1xuICB9LFxuICBhc3luYyBnb29kc0FkZGl0aW9uKCl7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgV1hBUEkuZ29vZHNBZGRpdGlvbih0aGlzLmRhdGEuZ29vZHNJZClcbiAgICBpZiAocmVzLmNvZGUgPT0gMCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgZ29vZHNBZGRpdGlvbjogcmVzLmRhdGEsXG4gICAgICAgIGhhc01vcmVTZWxlY3Q6IHRydWUsXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgYXN5bmMgZ2V0R29vZHNEZXRhaWwoKSB7XG4gICAgY29uc3QgZ29vZHNEZXRhaWxSZXMgPSBhd2FpdCBXWEFQSS5nb29kc0RldGFpbCh0aGlzLmRhdGEuZ29vZHNJZCk7XG4gICAgaWYgKGdvb2RzRGV0YWlsUmVzLmNvZGUgPT0gMCkge1xuICAgICAgbGV0IF9kYXRhID0ge1xuICAgICAgICBnb29kc0RldGFpbDogZ29vZHNEZXRhaWxSZXMuZGF0YSxcbiAgICAgICAgYnV5TnVtTWF4OiBnb29kc0RldGFpbFJlcy5kYXRhLmJhc2ljSW5mby5zdG9yZXMsXG4gICAgICAgIGJ1eU51bWJlcjogKGdvb2RzRGV0YWlsUmVzLmRhdGEuYmFzaWNJbmZvLnN0b3JlcyA+IDApID8gMSA6IDBcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YShfZGF0YSlcbiAgICB9XG4gIH0sXG4gIHJlcHV0YXRpb24oZ29vZHNJZDogYW55KSB7XG4gICAgV1hBUEkuZ29vZHNSZXB1dGF0aW9uKHtcbiAgICAgIGdvb2RzSWQ6IGdvb2RzSWRcbiAgICB9KS50aGVuKChyZXM6IHsgY29kZTogbnVtYmVyOyBkYXRhOiBhbnk7IH0pID0+IHtcbiAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgcmVwdXRhdGlvbjogcmVzLmRhdGFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgLyoqXG4gICAqIOa3u+WKoOWIsOi0reeJqei9plxuICAgKi9cbiAgdG9BZGRTaG9wQ2FyKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzaG9wVHlwZTogXCJhZGRTaG9wQ2FyXCJcbiAgICB9KSxcbiAgICAgIHRoaXMuZ3VpZ2VUYXAoKTtcbiAgfSxcbiAgZ3VpZ2VUYXAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNob3dTaG9wUG9wdXA6IHRydWVcbiAgICB9KVxuICB9LFxuICAvKipcbiAgICog6KeE5qC86YCJ5oup5by55Ye65qGG6ZqQ6JePXG4gICAqL1xuICBjbG9zZVBvcHVwVGFwKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzaG93U2hvcFBvcHVwOiBmYWxzZVxuICAgIH0pXG4gIH0sXG4gIHN0ZXBDaGFuZ2UoZTogeyBkZXRhaWw6IGFueTsgfSl7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGJ1eU51bWJlcjogZS5kZXRhaWxcbiAgICB9KVxuICB9LFxuICAvKipcbiAgICog5Yqg5YWl6LSt54mp6L2mXG4gICAqL1xuICBhc3luYyBhZGRTaG9wQ2FyKCkge1xuICAgIGNvbnN0IGdvb2RzQWRkaXRpb246IHsgaWQ6IGFueTsgcGlkOiBhbnk7IH1bXSA9IFtdO1xuICAgIGlmICh0aGlzLmRhdGEuYnV5TnVtYmVyIDwgMSkge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICfor7fpgInmi6notK3kubDmlbDph48nLFxuICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc0xvZ2luZWQgPSBhd2FpdCBBVVRILmNoZWNrSGFzTG9naW5lZCgpO1xuICAgIGNvbnNvbGUuaW5mbyhpc0xvZ2luZWQpO1xuXG4gICAgaWYgKCFpc0xvZ2luZWQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHd4bG9naW46IGZhbHNlXG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgIGNvbnN0IGdvb2RzSWQgPSB0aGlzLmRhdGEuZ29vZHNEZXRhaWwuYmFzaWNJbmZvLmlkO1xuICAgIGNvbnN0IHNrdTogeyBvcHRpb25JZDogYW55OyBvcHRpb25WYWx1ZUlkOiBhbnk7IH1bXSA9IFtdO1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IFdYQVBJLnNoaXBwaW5nQ2FySW5mb0FkZEl0ZW0odG9rZW4sIGdvb2RzSWQsIHRoaXMuZGF0YS5idXlOdW1iZXIsIHNrdSwgZ29vZHNBZGRpdGlvbik7XG4gICAgaWYgKHJlcy5jb2RlICE9IDApIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiByZXMubXNnLFxuICAgICAgICBpY29uOiAnbm9uZSdcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5jbG9zZVBvcHVwVGFwKCk7XG4gICAgd3guc2hvd1RvYXN0KHtcbiAgICAgIHRpdGxlOiAn5Yqg5YWl6LSt54mp6L2mJyxcbiAgICAgIGljb246ICdzdWNjZXNzJ1xuICAgIH0pXG4gICAgdGhpcy5zaGlwcGluZ0NhcnRJbmZvKClcbiAgfSxcbiAgYXN5bmMgc2hpcHBpbmdDYXJ0SW5mbygpe1xuICAgIGNvbnN0IHRva2VuID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVzID0gYXdhaXQgV1hBUEkuc2hpcHBpbmdDYXJJbmZvKHRva2VuKVxuICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBzaG9wTnVtOiByZXMuZGF0YS5udW1iZXJcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBjYW5jZWxMb2dpbigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgd3hsb2dpbjogdHJ1ZVxuICAgIH0pXG4gIH0sXG4gIHByb2Nlc3NMb2dpbihlOiB7IGRldGFpbDogeyB1c2VySW5mbzogYW55OyB9OyB9KSB7XG4gICAgaWYgKCFlLmRldGFpbC51c2VySW5mbykge1xuICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgdGl0bGU6ICflt7Llj5bmtognLFxuICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICB9KVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBBVVRILnJlZ2lzdGVyKHRoaXMpO1xuICB9LFxufSkiXX0=