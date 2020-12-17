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
Page({
    data: {
        activeCategory: 0,
        categorySelectedId: ''
    },
    onLoad: function () {
        this.categories();
    },
    categories: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({
                            title: '加载中',
                        });
                        return [4, WXAPI.goodsCategory().then(function (res) {
                                var categoryId = '';
                                if (res.code == 0) {
                                    var item = res.data[0];
                                    if (!_this.data.categorySelectedId) {
                                        categoryId = item.id;
                                    }
                                    _this.setData({
                                        categories: res.data,
                                        categorySelectedId: categoryId
                                    });
                                    _this.getGoodsList();
                                }
                                ;
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
    getGoodsList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, WXAPI.goods({
                            categoryId: this.data.categorySelectedId,
                            page: 1,
                            pageSize: 100000
                        }).then(function (res) {
                            if (res.code == 700) {
                                _this.setData({
                                    currentGoods: null
                                });
                                return;
                            }
                            _this.setData({
                                currentGoods: res.data
                            });
                            wx.hideLoading();
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBRXBDLElBQUksQ0FBQztJQUtELElBQUksRUFBRTtRQUNGLGNBQWMsRUFBRSxDQUFDO1FBQ2pCLGtCQUFrQixFQUFFLEVBQUU7S0FDekI7SUFLRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDSyxVQUFVOzs7Ozs7d0JBQ1osRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDWCxLQUFLLEVBQUUsS0FBSzt5QkFDZixDQUFDLENBQUE7d0JBQ0YsV0FBTSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBaUM7Z0NBQy9ELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztnQ0FDcEIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtvQ0FDZixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN2QixJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTt3Q0FDL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7cUNBQ3hCO29DQUNELEtBQUksQ0FBQyxPQUFPLENBQUM7d0NBQ1QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3dDQUNwQixrQkFBa0IsRUFBRSxVQUFVO3FDQUNqQyxDQUFDLENBQUM7b0NBQ0gsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lDQUN2QjtnQ0FBQSxDQUFDOzRCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFiRixTQWFFLENBQUE7Ozs7O0tBQ0w7SUFDSyxZQUFZOzs7Ozs0QkFDZCxXQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7NEJBQ2QsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCOzRCQUN4QyxJQUFJLEVBQUUsQ0FBQzs0QkFDUCxRQUFRLEVBQUUsTUFBTTt5QkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQWlDOzRCQUN0QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFO2dDQUNqQixLQUFJLENBQUMsT0FBTyxDQUFDO29DQUNULFlBQVksRUFBRSxJQUFJO2lDQUNyQixDQUFDLENBQUM7Z0NBQ0gsT0FBTTs2QkFDVDs0QkFDRCxLQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSTs2QkFDekIsQ0FBQyxDQUFDOzRCQUNILEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDckIsQ0FBQyxDQUFDLEVBQUE7O3dCQWZGLFNBZUUsQ0FBQTs7Ozs7S0FDTDtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFdYQVBJID0gcmVxdWlyZSgnYXBpZm0td3hhcGknKVxuZXhwb3J0IHsgfVxuUGFnZSh7XG5cbiAgICAvKipcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICAgKi9cbiAgICBkYXRhOiB7XG4gICAgICAgIGFjdGl2ZUNhdGVnb3J5OiAwLFxuICAgICAgICBjYXRlZ29yeVNlbGVjdGVkSWQ6ICcnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmNhdGVnb3JpZXMoKTtcbiAgICB9LFxuICAgIGFzeW5jIGNhdGVnb3JpZXMoKSB7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgICAgfSlcbiAgICAgICAgYXdhaXQgV1hBUEkuZ29vZHNDYXRlZ29yeSgpLnRoZW4oKHJlczogeyBjb2RlOiBudW1iZXI7IGRhdGE6IGFueTsgfSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhdGVnb3J5SWQgPSAnJztcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSByZXMuZGF0YVswXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0YS5jYXRlZ29yeVNlbGVjdGVkSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlJZCA9IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IHJlcy5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeVNlbGVjdGVkSWQ6IGNhdGVnb3J5SWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEdvb2RzTGlzdCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGFzeW5jIGdldEdvb2RzTGlzdCgpIHtcbiAgICAgICAgYXdhaXQgV1hBUEkuZ29vZHMoe1xuICAgICAgICAgICAgY2F0ZWdvcnlJZDogdGhpcy5kYXRhLmNhdGVnb3J5U2VsZWN0ZWRJZCxcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgICBwYWdlU2l6ZTogMTAwMDAwXG4gICAgICAgIH0pLnRoZW4oKHJlczogeyBjb2RlOiBudW1iZXI7IGRhdGE6IGFueTsgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDcwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRHb29kczogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50R29vZHM6IHJlcy5kYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIH0pXG4gICAgfSxcbn0pIl19