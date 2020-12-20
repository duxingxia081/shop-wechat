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
var checkHasLogined = function () {
    return __awaiter(this, void 0, void 0, function () {
        var token, loggined, checkTokenRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = wx.getStorageSync('token');
                    if (!token) {
                        return [2, false];
                    }
                    return [4, checkSession()];
                case 1:
                    loggined = _a.sent();
                    if (!loggined) {
                        wx.removeStorageSync('token');
                        return [2, false];
                    }
                    return [4, WXAPI.checkToken(token)];
                case 2:
                    checkTokenRes = _a.sent();
                    if (checkTokenRes.code != 0) {
                        wx.removeStorageSync('token');
                        return [2, false];
                    }
                    return [2, true];
            }
        });
    });
};
var checkSession = function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve) {
                    wx.checkSession({
                        success: function () {
                            return resolve(true);
                        },
                        fail: function () {
                            return resolve(false);
                        }
                    });
                })];
        });
    });
};
var register = function (page) {
    return __awaiter(this, void 0, void 0, function () {
        var _that;
        return __generator(this, function (_a) {
            _that = this;
            wx.login({
                success: function (loginRes) {
                    var code = loginRes.code;
                    wx.getUserInfo({ success: function (res) {
                            var iv = res.iv;
                            var encryptedData = res.encryptedData;
                            var referrer = '';
                            var referrer_storge = wx.getStorageSync('referrer');
                            if (referrer_storge) {
                                referrer = referrer_storge;
                            }
                            var componentAppid = wx.getStorageSync('componentAppid');
                            if (componentAppid) {
                                WXAPI.wxappServiceRegisterComplex({
                                    componentAppid: componentAppid,
                                    appid: wx.getStorageSync('appid'),
                                    code: code,
                                    encryptedData: encryptedData,
                                    iv: iv,
                                    referrer: referrer
                                }).then(function () {
                                    _that.login(page);
                                });
                            }
                            else {
                                WXAPI.register_complex({
                                    code: code,
                                    encryptedData: encryptedData,
                                    iv: iv,
                                    referrer: referrer
                                }).then(function () {
                                    _that.login(page);
                                });
                            }
                        } });
                }
            });
            return [2];
        });
    });
};
var login = function (page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            wx.login({
                success: function (res) {
                    var componentAppid = wx.getStorageSync('componentAppid');
                    if (componentAppid) {
                        WXAPI.wxappServiceLogin({
                            componentAppid: componentAppid,
                            appid: wx.getStorageSync('appid'),
                            code: res.code
                        }).then(function (res) {
                            if (res.code == 10000) {
                                return;
                            }
                            if (res.code != 0) {
                                wx.showModal({
                                    title: '无法登录',
                                    content: res.msg,
                                    showCancel: false
                                });
                                return;
                            }
                            wx.setStorageSync('token', res.data.token);
                            wx.setStorageSync('uid', res.data.uid);
                            if (page) {
                                page.onShow();
                            }
                        });
                    }
                    else {
                        WXAPI.login_wx(res.code).then(function (res) {
                            if (res.code == 10000) {
                                return;
                            }
                            if (res.code != 0) {
                                wx.showModal({
                                    title: '无法登录',
                                    content: res.msg,
                                    showCancel: false
                                });
                                return;
                            }
                            wx.setStorageSync('token', res.data.token);
                            wx.setStorageSync('uid', res.data.uid);
                            if (page) {
                                page.onShow();
                            }
                        });
                    }
                }
            });
            return [2];
        });
    });
};
module.exports = {
    checkHasLogined: checkHasLogined,
    register: register,
    login: login
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVyQyxJQUFNLGVBQWUsR0FBRzs7Ozs7O29CQUNoQixLQUFLLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDVixXQUFPLEtBQUssRUFBQztxQkFDZDtvQkFDZ0IsV0FBTSxZQUFZLEVBQUUsRUFBQTs7b0JBQS9CLFFBQVEsR0FBRyxTQUFvQjtvQkFDckMsSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDYixFQUFFLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzlCLFdBQU8sS0FBSyxFQUFDO3FCQUNkO29CQUNxQixXQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUE7O29CQUE3QyxhQUFhLEdBQUcsU0FBNkI7b0JBQ25ELElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7d0JBQzNCLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTt3QkFDN0IsV0FBTyxLQUFLLEVBQUE7cUJBQ2I7b0JBQ0QsV0FBTyxJQUFJLEVBQUE7Ozs7Q0FDWixDQUFBO0FBQ0QsSUFBTSxZQUFZLEdBQUc7OztZQUNuQixXQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztvQkFDekIsRUFBRSxDQUFDLFlBQVksQ0FBQzt3QkFDZCxPQUFPOzRCQUNMLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUN0QixDQUFDO3dCQUNELElBQUk7NEJBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ3ZCLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2dCQUNKLENBQUMsQ0FBQyxFQUFBOzs7Q0FDSCxDQUFBO0FBQ0QsSUFBTSxRQUFRLEdBQUcsVUFBZ0IsSUFBSTs7OztZQUMvQixLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLFVBQUMsUUFBUTtvQkFDaEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDeEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFDLE9BQU8sRUFBQyxVQUFDLEdBQUc7NEJBQzNCLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUM7NEJBQ2hCLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUM7NEJBQ3RDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTs0QkFDakIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQzs0QkFDcEQsSUFBSSxlQUFlLEVBQUU7Z0NBQ25CLFFBQVEsR0FBRyxlQUFlLENBQUM7NkJBQzVCOzRCQUVELElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTs0QkFDMUQsSUFBSSxjQUFjLEVBQUU7Z0NBQ2xCLEtBQUssQ0FBQywyQkFBMkIsQ0FBQztvQ0FDaEMsY0FBYyxnQkFBQTtvQ0FDZCxLQUFLLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7b0NBQ2pDLElBQUksRUFBRSxJQUFJO29DQUNWLGFBQWEsRUFBRSxhQUFhO29DQUM1QixFQUFFLEVBQUUsRUFBRTtvQ0FDTixRQUFRLEVBQUUsUUFBUTtpQ0FDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQ0FDTixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNwQixDQUFDLENBQUMsQ0FBQTs2QkFDSDtpQ0FBTTtnQ0FDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7b0NBQ3JCLElBQUksRUFBRSxJQUFJO29DQUNWLGFBQWEsRUFBRSxhQUFhO29DQUM1QixFQUFFLEVBQUUsRUFBRTtvQ0FDTixRQUFRLEVBQUUsUUFBUTtpQ0FDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQztvQ0FDTixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNwQixDQUFDLENBQUMsQ0FBQTs2QkFDSDt3QkFDRixDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDRixDQUFDLENBQUM7Ozs7Q0FDSixDQUFBO0FBQ0QsSUFBTSxLQUFLLEdBQUcsVUFBZ0IsSUFBNkI7OztZQUN6RCxFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNQLE9BQU8sRUFBRSxVQUFVLEdBQUc7b0JBQ3BCLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtvQkFDMUQsSUFBSSxjQUFjLEVBQUU7d0JBQ2xCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQzs0QkFDdEIsY0FBYyxnQkFBQTs0QkFDZCxLQUFLLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7NEJBQ2pDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTt5QkFDZixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBaUU7NEJBQ2pGLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7Z0NBR3JCLE9BQU87NkJBQ1I7NEJBQ0QsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtnQ0FFakIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDWCxLQUFLLEVBQUUsTUFBTTtvQ0FDYixPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUc7b0NBQ2hCLFVBQVUsRUFBRSxLQUFLO2lDQUNsQixDQUFDLENBQUE7Z0NBQ0YsT0FBTzs2QkFDUjs0QkFDRCxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBOzRCQUMxQyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUN0QyxJQUFJLElBQUksRUFBRTtnQ0FDUixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7NkJBQ2Q7d0JBQ0gsQ0FBQyxDQUFDLENBQUE7cUJBQ0g7eUJBQU07d0JBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBaUU7NEJBQ3ZHLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUU7Z0NBR3JCLE9BQU87NkJBQ1I7NEJBQ0QsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRTtnQ0FFakIsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQ0FDWCxLQUFLLEVBQUUsTUFBTTtvQ0FDYixPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUc7b0NBQ2hCLFVBQVUsRUFBRSxLQUFLO2lDQUNsQixDQUFDLENBQUE7Z0NBQ0YsT0FBTzs2QkFDUjs0QkFDRCxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBOzRCQUMxQyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUN0QyxJQUFJLElBQUksRUFBRTtnQ0FDUixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7NkJBQ2Q7d0JBQ0gsQ0FBQyxDQUFDLENBQUE7cUJBQ0g7Z0JBQ0gsQ0FBQzthQUNGLENBQUMsQ0FBQTs7OztDQUNILENBQUE7QUFDRCxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2YsZUFBZSxFQUFFLGVBQWU7SUFDaEMsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFDLEtBQUs7Q0FDWixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgV1hBUEkgPSByZXF1aXJlKCdhcGlmbS13eGFwaScpO1xuZXhwb3J0IHsgfTtcbmNvbnN0IGNoZWNrSGFzTG9naW5lZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdG9rZW4gPSB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKTtcbiAgaWYgKCF0b2tlbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBsb2dnaW5lZCA9IGF3YWl0IGNoZWNrU2Vzc2lvbigpXG4gIGlmICghbG9nZ2luZWQpIHtcbiAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygndG9rZW4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgY2hlY2tUb2tlblJlcyA9IGF3YWl0IFdYQVBJLmNoZWNrVG9rZW4odG9rZW4pXG4gIGlmIChjaGVja1Rva2VuUmVzLmNvZGUgIT0gMCkge1xuICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cbmNvbnN0IGNoZWNrU2Vzc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpXG4gICAgICB9LFxuICAgICAgZmFpbCgpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cbmNvbnN0IHJlZ2lzdGVyID0gYXN5bmMgZnVuY3Rpb24gKHBhZ2UpIHtcbiAgbGV0IF90aGF0ID0gdGhpcztcbiAgd3gubG9naW4oe1xuICAgIHN1Y2Nlc3M6IChsb2dpblJlcykgPT4ge1xuICAgICAgbGV0IGNvZGUgPSBsb2dpblJlcy5jb2RlO1xuICAgICAgIHd4LmdldFVzZXJJbmZvKHtzdWNjZXNzOihyZXMpPT57XG4gICAgICAgIGxldCBpdiA9IHJlcy5pdjtcbiAgICAgICAgbGV0IGVuY3J5cHRlZERhdGEgPSByZXMuZW5jcnlwdGVkRGF0YTtcbiAgICAgICAgbGV0IHJlZmVycmVyID0gJycgLy8g5o6o6I2Q5Lq6XG4gICAgICAgIGxldCByZWZlcnJlcl9zdG9yZ2UgPSB3eC5nZXRTdG9yYWdlU3luYygncmVmZXJyZXInKTtcbiAgICAgICAgaWYgKHJlZmVycmVyX3N0b3JnZSkge1xuICAgICAgICAgIHJlZmVycmVyID0gcmVmZXJyZXJfc3RvcmdlO1xuICAgICAgICB9XG4gICAgICAgIC8vIOS4i+mdouW8gOWni+iwg+eUqOazqOWGjOaOpeWPo1xuICAgICAgICBjb25zdCBjb21wb25lbnRBcHBpZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjb21wb25lbnRBcHBpZCcpXG4gICAgICAgIGlmIChjb21wb25lbnRBcHBpZCkge1xuICAgICAgICAgIFdYQVBJLnd4YXBwU2VydmljZVJlZ2lzdGVyQ29tcGxleCh7XG4gICAgICAgICAgICBjb21wb25lbnRBcHBpZCxcbiAgICAgICAgICAgIGFwcGlkOiB3eC5nZXRTdG9yYWdlU3luYygnYXBwaWQnKSxcbiAgICAgICAgICAgIGNvZGU6IGNvZGUsXG4gICAgICAgICAgICBlbmNyeXB0ZWREYXRhOiBlbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgaXY6IGl2LFxuICAgICAgICAgICAgcmVmZXJyZXI6IHJlZmVycmVyXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhhdC5sb2dpbihwYWdlKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFdYQVBJLnJlZ2lzdGVyX2NvbXBsZXgoe1xuICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICAgIGVuY3J5cHRlZERhdGE6IGVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICBpdjogaXYsXG4gICAgICAgICAgICByZWZlcnJlcjogcmVmZXJyZXJcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGF0LmxvZ2luKHBhZ2UpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICB9fSk7XG4gICAgfVxuICB9KTtcbn1cbmNvbnN0IGxvZ2luID0gYXN5bmMgZnVuY3Rpb24gKHBhZ2U6IHsgb25TaG93OiAoKSA9PiB2b2lkOyB9KSB7XG4gIHd4LmxvZ2luKHtcbiAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICBjb25zdCBjb21wb25lbnRBcHBpZCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdjb21wb25lbnRBcHBpZCcpXG4gICAgICBpZiAoY29tcG9uZW50QXBwaWQpIHtcbiAgICAgICAgV1hBUEkud3hhcHBTZXJ2aWNlTG9naW4oe1xuICAgICAgICAgIGNvbXBvbmVudEFwcGlkLFxuICAgICAgICAgIGFwcGlkOiB3eC5nZXRTdG9yYWdlU3luYygnYXBwaWQnKSxcbiAgICAgICAgICBjb2RlOiByZXMuY29kZVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXM6IHsgY29kZTogbnVtYmVyOyBtc2c6IGFueTsgZGF0YTogeyB0b2tlbjogYW55OyB1aWQ6IGFueTsgfTsgfSkge1xuICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAxMDAwMCkge1xuICAgICAgICAgICAgLy8g5Y675rOo5YaMXG4gICAgICAgICAgICAvL190aGlzLnJlZ2lzdGVyKHBhZ2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXMuY29kZSAhPSAwKSB7XG4gICAgICAgICAgICAvLyDnmbvlvZXplJnor69cbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn5peg5rOV55m75b2VJyxcbiAgICAgICAgICAgICAgY29udGVudDogcmVzLm1zZyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHJlcy5kYXRhLnRva2VuKVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1aWQnLCByZXMuZGF0YS51aWQpXG4gICAgICAgICAgaWYgKHBhZ2UpIHtcbiAgICAgICAgICAgIHBhZ2Uub25TaG93KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBXWEFQSS5sb2dpbl93eChyZXMuY29kZSkudGhlbihmdW5jdGlvbiAocmVzOiB7IGNvZGU6IG51bWJlcjsgbXNnOiBhbnk7IGRhdGE6IHsgdG9rZW46IGFueTsgdWlkOiBhbnk7IH07IH0pIHtcbiAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMTAwMDApIHtcbiAgICAgICAgICAgIC8vIOWOu+azqOWGjFxuICAgICAgICAgICAgLy9fdGhpcy5yZWdpc3RlcihwYWdlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzLmNvZGUgIT0gMCkge1xuICAgICAgICAgICAgLy8g55m75b2V6ZSZ6K+vXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aXoOazleeZu+W9lScsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5tc2csXG4gICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YS50b2tlbilcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndWlkJywgcmVzLmRhdGEudWlkKVxuICAgICAgICAgIGlmIChwYWdlKSB7XG4gICAgICAgICAgICBwYWdlLm9uU2hvdygpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjaGVja0hhc0xvZ2luZWQ6IGNoZWNrSGFzTG9naW5lZCxcbiAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICBsb2dpbjpsb2dpblxufSJdfQ==