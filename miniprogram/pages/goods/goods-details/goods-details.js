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
        goodsDetail: {},
        goodsId: null,
    },
    onLoad: function (e) {
        this.setData({ goodsId: e.id });
        this.reputation(e.id);
    },
    onShow: function () {
        this.getGoodsDetail();
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
                                goodsDetail: goodsDetailRes.data
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMtZGV0YWlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2RzLWRldGFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVyQyxJQUFJLENBQUM7SUFLRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsRUFBRTtRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBS0QsTUFBTSxZQUFDLENBQWU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBS0QsTUFBTTtRQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0ssY0FBYzs7Ozs7NEJBQ08sV0FBTSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUEzRCxjQUFjLEdBQUcsU0FBMEM7d0JBQ2pFLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7NEJBQ3RCLEtBQUssR0FBRztnQ0FDUixXQUFXLEVBQUUsY0FBYyxDQUFDLElBQUk7NkJBQ25DLENBQUE7NEJBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTt5QkFDdEI7Ozs7O0tBQ0o7SUFDRCxVQUFVLFlBQUMsT0FBWTtRQUF2QixpQkFVRztRQVRDLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDcEIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQWlDO1lBQ3hDLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ2pCLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsVUFBVSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2lCQUNyQixDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNOLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFdYQVBJID0gcmVxdWlyZSgnYXBpZm0td3hhcGknKTtcbmV4cG9ydCB7fVxuUGFnZSh7XG5cbiAgICAvKipcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICAgKi9cbiAgICBkYXRhOiB7XG4gICAgICAgIGdvb2RzRGV0YWlsOiB7fSxcbiAgICAgICAgZ29vZHNJZDogbnVsbCxcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICAgKi9cbiAgICBvbkxvYWQoZTogeyBpZDogYW55OyB9KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGdvb2RzSWQ6IGUuaWQgfSlcbiAgICAgICAgdGhpcy5yZXB1dGF0aW9uKGUuaWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgICAqL1xuICAgIG9uU2hvdygpIHtcbiAgICAgICAgdGhpcy5nZXRHb29kc0RldGFpbCgpO1xuICAgIH0sXG4gICAgYXN5bmMgZ2V0R29vZHNEZXRhaWwoKSB7XG4gICAgICAgIGNvbnN0IGdvb2RzRGV0YWlsUmVzID0gYXdhaXQgV1hBUEkuZ29vZHNEZXRhaWwodGhpcy5kYXRhLmdvb2RzSWQpO1xuICAgICAgICBpZiAoZ29vZHNEZXRhaWxSZXMuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICBsZXQgX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgZ29vZHNEZXRhaWw6IGdvb2RzRGV0YWlsUmVzLmRhdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShfZGF0YSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVwdXRhdGlvbihnb29kc0lkOiBhbnkpIHtcbiAgICAgICAgV1hBUEkuZ29vZHNSZXB1dGF0aW9uKHtcbiAgICAgICAgICBnb29kc0lkOiBnb29kc0lkXG4gICAgICAgIH0pLnRoZW4oKHJlczogeyBjb2RlOiBudW1iZXI7IGRhdGE6IGFueTsgfSkgPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICByZXB1dGF0aW9uOiByZXMuZGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbn0pIl19