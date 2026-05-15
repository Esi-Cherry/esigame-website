(function () {
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function () { };

    // Create a new Class that inherits from this class
    Class.extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };

})();
/*
 * jQuery Storage API Plugin
 * Version: 1.9.4
 */
!function (e) { "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery) }(function (e) { function t() { var t, r, i, o = this._type, n = arguments.length, s = window[o], a = arguments, f = a[0]; if (1 > n) throw new Error("Minimum 1 argument must be given"); if (e.isArray(f)) { r = {}; for (var l in f) { t = f[l]; try { r[t] = JSON.parse(s.getItem(t)) } catch (c) { r[t] = s.getItem(t) } } return r } if (1 != n) { try { r = JSON.parse(s.getItem(f)) } catch (c) { throw new ReferenceError(f + " is not defined in this storage") } for (var l = 1; n - 1 > l; l++) if (r = r[a[l]], void 0 === r) throw new ReferenceError([].slice.call(a, 1, l + 1).join(".") + " is not defined in this storage"); if (e.isArray(a[l])) { i = r, r = {}; for (var u in a[l]) r[a[l][u]] = i[a[l][u]]; return r } return r[a[l]] } try { return JSON.parse(s.getItem(f)) } catch (c) { return s.getItem(f) } } function r() { var t, r, i, o = this._type, n = arguments.length, s = window[o], a = arguments, f = a[0], l = a[1], c = isNaN(l) ? {} : []; if (1 > n || !e.isPlainObject(f) && 2 > n) throw new Error("Minimum 2 arguments must be given or first parameter must be an object"); if (e.isPlainObject(f)) { for (var u in f) t = f[u], e.isPlainObject(t) || this.alwaysUseJson ? s.setItem(u, JSON.stringify(t)) : s.setItem(u, t); return f } if (2 == n) return "object" == typeof l || this.alwaysUseJson ? s.setItem(f, JSON.stringify(l)) : s.setItem(f, l), l; try { i = s.getItem(f), null != i && (c = JSON.parse(i)) } catch (h) { } i = c; for (var u = 1; n - 2 > u; u++) t = a[u], r = isNaN(a[u + 1]) ? "object" : "array", (!i[t] || "object" == r && !e.isPlainObject(i[t]) || "array" == r && !e.isArray(i[t])) && ("array" == r ? i[t] = [] : i[t] = {}), i = i[t]; return i[a[u]] = a[u + 1], s.setItem(f, JSON.stringify(c)), c } function i() { var t, r, i = this._type, o = arguments.length, n = window[i], s = arguments, a = s[0]; if (1 > o) throw new Error("Minimum 1 argument must be given"); if (e.isArray(a)) { for (var f in a) n.removeItem(a[f]); return !0 } if (1 == o) return n.removeItem(a), !0; try { t = r = JSON.parse(n.getItem(a)) } catch (l) { throw new ReferenceError(a + " is not defined in this storage") } for (var f = 1; o - 1 > f; f++) if (r = r[s[f]], void 0 === r) throw new ReferenceError([].slice.call(s, 1, f).join(".") + " is not defined in this storage"); if (e.isArray(s[f])) for (var c in s[f]) delete r[s[f][c]]; else delete r[s[f]]; return n.setItem(a, JSON.stringify(t)), !0 } function o(t) { var r = a.call(this); for (var o in r) i.call(this, r[o]); if (t) for (var o in e.namespaceStorages) f(o) } function n() { var r = arguments.length, i = arguments, o = i[0]; if (0 == r) return 0 == a.call(this).length; if (e.isArray(o)) { for (var s = 0; s < o.length; s++) if (!n.call(this, o[s])) return !1; return !0 } try { var f = t.apply(this, arguments); e.isArray(i[r - 1]) || (f = { totest: f }); for (var s in f) if (!(e.isPlainObject(f[s]) && e.isEmptyObject(f[s]) || e.isArray(f[s]) && !f[s].length) && f[s]) return !1; return !0 } catch (l) { return !0 } } function s() { var r = arguments.length, i = arguments, o = i[0]; if (1 > r) throw new Error("Minimum 1 argument must be given"); if (e.isArray(o)) { for (var n = 0; n < o.length; n++) if (!s.call(this, o[n])) return !1; return !0 } try { var a = t.apply(this, arguments); e.isArray(i[r - 1]) || (a = { totest: a }); for (var n in a) if (void 0 === a[n] || null === a[n]) return !1; return !0 } catch (f) { return !1 } } function a() { var e = this._type, r = arguments.length, i = window[e], o = arguments, n = [], s = {}; if (s = r > 0 ? t.apply(this, o) : i, s && s._cookie) for (var a in Cookies.get()) "" != a && n.push(a.replace(s._prefix, "")); else for (var f in s) s.hasOwnProperty(f) && n.push(f); return n } function f(t) { if (!t || "string" != typeof t) throw new Error("First parameter must be a string"); h ? (window.localStorage.getItem(t) || window.localStorage.setItem(t, "{}"), window.sessionStorage.getItem(t) || window.sessionStorage.setItem(t, "{}")) : (window.localCookieStorage.getItem(t) || window.localCookieStorage.setItem(t, "{}"), window.sessionCookieStorage.getItem(t) || window.sessionCookieStorage.setItem(t, "{}")); var r = { localStorage: e.extend({}, e.localStorage, { _ns: t }), sessionStorage: e.extend({}, e.sessionStorage, { _ns: t }) }; return "undefined" != typeof Cookies && (window.cookieStorage.getItem(t) || window.cookieStorage.setItem(t, "{}"), r.cookieStorage = e.extend({}, e.cookieStorage, { _ns: t })), e.namespaceStorages[t] = r, r } function l(e) { var t = "jsapi"; try { return window[e] ? (window[e].setItem(t, t), window[e].removeItem(t), !0) : !1 } catch (r) { return !1 } } var c = "ls_", u = "ss_", h = l("localStorage"), g = { _type: "", _ns: "", _callMethod: function (e, t) { var r = [], t = Array.prototype.slice.call(t), i = t[0]; return this._ns && r.push(this._ns), "string" == typeof i && -1 !== i.indexOf(".") && (t.shift(), [].unshift.apply(t, i.split("."))), [].push.apply(r, t), e.apply(this, r) }, alwaysUseJson: !1, get: function () { return this._callMethod(t, arguments) }, set: function () { var t = arguments.length, i = arguments, o = i[0]; if (1 > t || !e.isPlainObject(o) && 2 > t) throw new Error("Minimum 2 arguments must be given or first parameter must be an object"); if (e.isPlainObject(o) && this._ns) { for (var n in o) this._callMethod(r, [n, o[n]]); return o } var s = this._callMethod(r, i); return this._ns ? s[o.split(".")[0]] : s }, remove: function () { if (arguments.length < 1) throw new Error("Minimum 1 argument must be given"); return this._callMethod(i, arguments) }, removeAll: function (e) { return this._ns ? (this._callMethod(r, [{}]), !0) : this._callMethod(o, [e]) }, isEmpty: function () { return this._callMethod(n, arguments) }, isSet: function () { if (arguments.length < 1) throw new Error("Minimum 1 argument must be given"); return this._callMethod(s, arguments) }, keys: function () { return this._callMethod(a, arguments) } }; if ("undefined" != typeof Cookies) { window.name || (window.name = Math.floor(1e8 * Math.random())); var m = { _cookie: !0, _prefix: "", _expires: null, _path: null, _domain: null, setItem: function (e, t) { Cookies.set(this._prefix + e, t, { expires: this._expires, path: this._path, domain: this._domain }) }, getItem: function (e) { return Cookies.get(this._prefix + e) }, removeItem: function (e) { return Cookies.remove(this._prefix + e, { path: this._path }) }, clear: function () { for (var e in Cookies.get()) "" != e && (!this._prefix && -1 === e.indexOf(c) && -1 === e.indexOf(u) || this._prefix && 0 === e.indexOf(this._prefix)) && Cookies.remove(e) }, setExpires: function (e) { return this._expires = e, this }, setPath: function (e) { return this._path = e, this }, setDomain: function (e) { return this._domain = e, this }, setConf: function (e) { return e.path && (this._path = e.path), e.domain && (this._domain = e.domain), e.expires && (this._expires = e.expires), this }, setDefaultConf: function () { this._path = this._domain = this._expires = null } }; h || (window.localCookieStorage = e.extend({}, m, { _prefix: c, _expires: 3650 }), window.sessionCookieStorage = e.extend({}, m, { _prefix: u + window.name + "_" })), window.cookieStorage = e.extend({}, m), e.cookieStorage = e.extend({}, g, { _type: "cookieStorage", setExpires: function (e) { return window.cookieStorage.setExpires(e), this }, setPath: function (e) { return window.cookieStorage.setPath(e), this }, setDomain: function (e) { return window.cookieStorage.setDomain(e), this }, setConf: function (e) { return window.cookieStorage.setConf(e), this }, setDefaultConf: function () { return window.cookieStorage.setDefaultConf(), this } }) } e.initNamespaceStorage = function (e) { return f(e) }, h ? (e.localStorage = e.extend({}, g, { _type: "localStorage" }), e.sessionStorage = e.extend({}, g, { _type: "sessionStorage" })) : (e.localStorage = e.extend({}, g, { _type: "localCookieStorage" }), e.sessionStorage = e.extend({}, g, { _type: "sessionCookieStorage" })), e.namespaceStorages = {}, e.removeAllStorages = function (t) { e.localStorage.removeAll(t), e.sessionStorage.removeAll(t), e.cookieStorage && e.cookieStorage.removeAll(t), t || (e.namespaceStorages = {}) }, e.alwaysUseJsonInStorage = function (t) { g.alwaysUseJson = t, e.localStorage.alwaysUseJson = t, e.sessionStorage.alwaysUseJson = t, e.cookieStorage && (e.cookieStorage.alwaysUseJson = t) } });
var smartGlobalSettings = {};
var MIN_DISTANCE = 4; // minimum distance to "snap" to a guide
var sm_guides = []; // no guides available ... 
var sm_innerOffsetX, sm_innerOffsetY; // we'll use those during drag .
var controlElDragging = false;
var shortCut = {
    ctrlStandardDetect: function (e) {
        if (typeof (LayoutConverter) !== "undefined") {
            var detectResult = LayoutConverter.CtrlStandardDetect();
            parent.$("#detect-panel").hide();
            if (detectResult.ShowTips()) {
                parent.nsmart.showCtrlStandardDetectPanel(detectResult);
            }
            else {
                if (e) {
                    parent.showSuccess("控件布局规范检测完美通过,请继续保持!");
                }
            }
        }
    },
    showLog: function (e) {
        // 图片遮罩触发完成操作
        $('#img_Clip_Complete_Btn').click();
        parent.nsmart.switchHandleLogShowStatus();
        return false;
    },
    savePage: function (e) {
        // 图片遮罩触发完成操作
        $('#img_Clip_Complete_Btn').click();
        window.parent.nsmart.savePage();
        return false;
    },
    merge2SameArea: function (e) {
        smartViewFactory.merge2SameArea();
        return false;
    },
    ctrlZ: function (e) {
        // 图片遮罩触发完成操作
        $('#img_Clip_Complete_Btn').click();
        smartViewFactory.onCtrlZ();
        return false;
    },
    ctrlY: function (e) {
        // 图片遮罩触发完成操作
        $('#img_Clip_Complete_Btn').click();
        smartViewFactory.onCtrlY();
        return false;
    },
    ctrlV: function (e) {
        // 图片遮罩触发完成操作
        $('#img_Clip_Complete_Btn').click();
        var cpv = $('#smv_Main');
        if (cpv.length === 0) {
            cpv = $('#smv_Area0');
        }
        var pageId = cpv.attr('cpid');
        rightContextMenuPaste(pageId, smartGlobalSettings.parentAreaId, smartGlobalSettings.parentId, smartGlobalSettings.areaId, smartGlobalSettings.lastX + 4, smartGlobalSettings.lastY + 4);
        return false;
    },
    shiftV: function () {
        smartViewFactory.setPos();
    },
    altV: function () {
        smartViewFactory.setStyle();
    },
};
var jumpShowCtrlTab = false

function computeGuidesForElement(elem, pos, w, h) {
    if (elem != null) {
        var $t = $(elem);
        pos = $t.offset();
        pos.pLeft = $t.position().left;
        pos.pTop = $t.position().top;
        w = $t.outerWidth() - 1;
        h = $t.outerHeight() - 1;
    }
    return [
        { type: "h", left: pos.left, top: pos.top, pLeft: pos.pLeft, pTop: pos.pTop },
        { type: "h", left: pos.left, top: pos.top + h, pLeft: pos.pLeft, pTop: pos.pTop + h },
        { type: "v", left: pos.left, top: pos.top, pLeft: pos.pLeft, pTop: pos.pTop },
        { type: "v", left: pos.left + w, top: pos.top, pLeft: pos.pLeft + w, pTop: pos.pTop },
        { type: "h", left: pos.left, top: pos.top + h / 2, pLeft: pos.pLeft, pTop: pos.pTop + h / 2 },
        { type: "v", left: pos.left + w / 2, top: pos.top, pLeft: pos.pLeft + w / 2, pTop: pos.pTop }
    ];
}
function clone(item) {
    if (!item) { return item; } // null, undefined values check

    var types = [Number, String, Boolean],
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
        if (item instanceof type) {
            result = type(item);
        }
    });

    if (typeof (result) == "undefined") {
        if (Object.prototype.toString.call(item) === "[object Array]") {
            result = [];
            item.forEach(function (child, index, array) {
                result[index] = clone(child);
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                var result = item.cloneNode(true);
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = clone(item[i]);
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
}
function createSmartView(pageId, viewType, left, top, parentId, areaId, styleName, colorName, themeColor, funcSuccess, funError, ctrlCssStr) {
    smartViewFactory.beforeModify({ desc: "新增", controlType: viewType });
    // 埋点-标签-控件名称
    var elControlname;
    // 添加文字控件的时候
    if (viewType === "text") {
        window.gtag && gtag('event', 'event_text_add', {
            'event_category': '文字控件',
            'event_action': '添加控件',
            'event_label': '文字控件'
        });
    };
    $.ajax({
        cache: false,
        url: "/Designer/AddSmartViewV2",
        data: {
            pageId: pageId,
            viewType: viewType,
            left: left,
            top: top,
            parentControlId: parentId,
            areaId: areaId,
            styleName: styleName,
            colorName: colorName,
            themeColor: themeColor,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture,
            ctrlCss: ctrlCssStr
        },
        type: "post",
        success: function (f) {
            if (funcSuccess != null) {
                if (f.Error) {
                    funError(f.Message);
                } else {
                    smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                    f.Data.areaId = areaId;
                    //window._imgClipControlId = 'smv_' + f.Data.ControlId;
                    funcSuccess(f.Data);
                    //redoInfo.ctrlId = window._imgClipControlId;
                    // 控件埋点--添加
                    if (viewType === 'mustache') {
                        elControlname = cnsmart.controlResMap[viewType][styleName];
                    } else {
                        elControlname = cnsmart.controlResMap[viewType];
                    }
                    if (typeof (MobileSimulator) != 'undefined') {
                        MobileSimulator.TryExec(function (instance) {
                            instance.OverwritePageAndLaunchAdjuster()
                        });
                    }
                    window.gtag && gtag('event', 'event_control_use', {
                        'event_category': '控件使用',
                        'event_action': '添加控件',
                        'event_label': elControlname + '-' + styleName + '-' + colorName
                    });
                }
            }
        },
        error: function (f) {
            if (funError) {
                funError("添加" + viewType + "失败！");
            }
        }
    });
}
function createStripView(pageId, stripId, left, top, parentId, areaId, funcSuccess, funError) {
    smartViewFactory.beforeModify({ desc: "新增", controlType: stripId.indexOf("dialog") !== -1 ? "弹窗" : "组合" });
    $.ajax({
        cache: false,
        url: "/Designer/AddStripViewV2",
        data: {
            pageId: pageId,
            stripId: stripId,
            left: left,
            top: top,
            parentControlId: parentId,
            areaId: areaId,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (funcSuccess != null) {
                if (f.Error) {
                    funError(f.Message);
                } else {
                    smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                    f.Data.areaId = areaId;
                    funcSuccess(f.Data.List);
                    if (typeof (MobileSimulator) != 'undefined') {
                        MobileSimulator.TryExec(function (instance) {
                            instance.OverwritePageAndLaunchAdjuster()
                        });
                    }

                }
            }
        },
        error: function (f) {
            if (funError) {
                funError("添加strip失败！");
            }
        }
    });
}
function deleteSmartView(pageId, controlIds, funcSuccess, funError) {

    var ctype = $("#smv_" + controlIds).attr("ctype");
    var cstyle = $("#smv_" + controlIds).attr("cstyle");
    var ccolor = $("#smv_" + controlIds).attr("ccolor");

    // 埋点-标签-控件名称
    var elControlname;

    // 删除文字控件时
    if (ctype === "text") {
        window.gtag && gtag('event', 'event_text_remove', {
            'event_category': '文字控件',
            'event_action': '删除控件',
            'event_label': '文字控件'
        });
    };
    // 图片控件1 删除遮罩蒙层
    if ($('#img_clipMask_PopWrapper').length) {
        window['oMaskClipTool'] && window['oMaskClipTool'].destoryHTML("smv_" + controlIds);
    }
    var ctrlIds = controlIds.split(',');
    var lastCtrlId = ctrlIds[ctrlIds.length - 1];
    var canLog = false;
    for (var i = 0; i < ctrlIds.length; i++) {
        if (smartViewFactory.storage.isDeletingIdList.indexOf(ctrlIds[i]) === -1) {
            canLog = true;
            break;
        }
    }
    if (canLog) {
        smartViewFactory.beforeModify({ desc: "移除", controlType: ctrlIds.length > 1 ? "多个" : $("#smv_" + lastCtrlId).attr("ctype"), ctrlId: controlIds });
    }

    for (var i = 0; i < ctrlIds.length; i++) {
        if (smartViewFactory.storage.isDeletingIdList.indexOf(ctrlIds[i]) === -1) {
            smartViewFactory.storage.isDeletingIdList.push(ctrlIds[i]);
        }
    }
    $.ajax({
        cache: false,
        url: "/Designer/DeleteSmartViewV2",
        data: {
            pageId: pageId,
            controlIds: controlIds,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (funcSuccess != null) {
                if (f.Error) {
                    if (funError != null) {
                        funError(f.Message);
                    } else {
                        alert(f.Message);
                    }
                } else {
                    smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                    funcSuccess(f.Data);
                    // 控件埋点--删除
                    if (ctype === 'mustache') {
                        elControlname = cnsmart.controlResMap[ctype][cstyle];
                    } else {
                        elControlname = cnsmart.controlResMap[ctype];
                    }
                    if (typeof (MobileSimulator) != 'undefined') {
                        MobileSimulator.TryExec(function (instance) {
                            instance.OverwritePageAndLaunchAdjuster()
                        });
                    }
                    window.gtag && gtag('event', 'event_control_remove', {
                        'event_category': '控件使用',
                        'event_action': '删除控件',
                        'event_label': elControlname + '-' + cstyle + '-' + ccolor
                    });

                    // 删除时通知小梦
                    window.parent.wzAiHelp && window.parent.wzAiHelp.fire('wz-delete-smartview')
                }
            }
        },
        error: function (f) {
            if (funError) {
                funError("删除控件失败！");
            } else {
                alert("删除控件失败！");
            }
        },
        complete: function () {
            for (var i = 0; i < ctrlIds.length; i++) {
                smartViewFactory.storage.isDeletingIdList.splice(smartViewFactory.storage.isDeletingIdList.indexOf(ctrlIds[i]), 1);
            }
        }
    })
}
function pasteSmartView(controlData, funcSuccess, funError) {
    var list = JSON.parse(controlData);
    var redoInfo = {};
    if (list.length > 0) {
        var item = list[0];
        redoInfo = smartViewFactory.beforeModify({ desc: "粘贴", controlType: item.type });
    }
    $.ajax({
        cache: false,
        url: "/Designer/PasteSmartViewsV2",
        data: {
            controlData: controlData,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (funcSuccess != null) {
                if (f.Error) {
                    if (funError != null) {
                        funError(f.Message);
                    } else {
                        window.parent.showFailure(f.Message)
                        //alert(f.Message);
                    }
                } else {
                    smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                    funcSuccess(f.Data.List);
                    if (typeof (MobileSimulator) != 'undefined') {
                        MobileSimulator.TryExec(function (instance) {
                            instance.OverwritePageAndLaunchAdjuster()
                        });
                    }
                    redoInfo.ctrlId = f.Data.ControlId;

                }
            }
        },
        error: function (f) {
            if (funError) {
                funError("粘贴控件失败！");
            } else {
                alert("粘贴控件失败！");
            }
        }
    });
}


function rollSmartView(ctrlId, funcSuccess, funError) {
    if (onSave) {
        return;
    }
    window.parent.nsmart.savePage('开始重随控件', () => {
        //避免在生成控件时,保存了页面导致TempPageId不一致
        onSave = true;
        redoInfo = smartViewFactory.beforeModify({ desc: "重随", controlType: "" });
        $.ajax({
            cache: false,
            url: "/Designer/RollCtrl",
            data: {
                PageId: window.parent.pageManage.currentPageId,
                TempPageId: smartViewFactory.getLastTempPageId(),
                deviceMode: smartViewFactory.storage.deviceMode,
                languageCulture: smartViewFactory.storage.languageCulture,
                CtrlId: ctrlId
            },
            type: "post",
            success: function (f) {
                if (funcSuccess != null) {
                    if (f.Error) {
                        window.parent.showFailure("重随控件失败:" + f.Message);
                    } else {
                        smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                        funcSuccess(f)
                        if (typeof (MobileSimulator) != 'undefined') {
                            MobileSimulator.TryExec(function (instance) {
                                instance.OverwritePageAndLaunchAdjuster()
                            });
                        }
                    }
                }
            },
            error: function (f) {
                if (funError) {
                    funError("重随控件失败！");
                } else {
                    alert("重随控件失败！");
                }
            },
            complete: function () {
                onSave = false;
            }
        });
    }, '自动备份', { NotChangeOnSaveStatus: true })

}
function refreshSmartView(controlData, funcSuccess, funError) {
    $.ajax({
        cache: false,
        url: "/Designer/RefreshSmartViewV2",
        data: {
            controlData: JSON.stringify(controlData),
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (!f.Error) {
                smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                var data = f.Data;
                var header = $('head');// iframeContent.find('head');
                var cssId = "css" + data.ControlId;
                var $oldContrl = $('#smv_' + data.ControlId);
                var tabName = $oldContrl.attr('tabname')

                var areaId = controlData.areaId;
                if (areaId == "" || areaId == null) {
                    areaId = "smv_Main";
                } else {
                    areaId = "smv_" + areaId;
                }
                var body = $('#smv_' + data.ControlId).parent();
                $('#' + cssId).remove();
                $('#smv_' + data.ControlId).remove();
                header.append(data.Css);
                var smartView = $(data.Html);
                smartView.addClass("smart-resize");
                tabName && smartView.attr("tabname", tabName);
                body.append(smartView);
                bindSmartEnventsWithObj(smartView, true);
            }
            if (f.Error) {
                if (funError != null && typeof (funError) === 'function') {
                    funError(f.Message);
                } else {
                    alert(f.Message);
                }
            } else {
                if (funcSuccess != null && typeof (funcSuccess) === 'function') {
                    funcSuccess(f.Data);
                }
            }
            if (typeof (MobileSimulator) != 'undefined') {
                MobileSimulator.TryExec(function (instance) {
                    instance.OverwritePageAndLaunchAdjuster()
                });
            }
        },
        error: function (f) {
            if (funError) {
                funError("刷新控件失败！");
            } else {
                alert("刷新控件失败！");
            }
        }
    })
}
function editSmartView(pageId, controlId, viewType, styleName, colorName, funcSuccess, funError) {
    $.ajax({
        cache: false,
        url: "/Designer/EditSmartViewV2",
        data: {
            pageId: pageId,
            controlId: controlId,
            viewType: viewType,
            styleName: styleName,
            colorName: colorName,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (funcSuccess != null) {
                funcSuccess(pageId, controlId, f);
                $('#fs_changestyle').parent().hover();

            }
        },
        error: function (f) {
            if (funError) {
                funError("编辑控件失败！");
            } else {
                alert("编辑控件失败！");
            }
        }
    })
}
function changeSmartViewColor(pageId, controlId, colorName, callback) {
    $.ajax({
        cache: false,
        url: "/Designer/ChangeSmartViewColorV2",
        data: {
            pageId: pageId,
            controlId: controlId,
            colorName: colorName,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (!f.Error) {
                smartViewFactory.afterModifyPageViaApi(f.TempPageId);
                var smartView = smartViewFactory.getSmartViewWithOutType(controlId);
                smartView.$control.attr('ccolor', colorName);
                var cssVariables = f.CssVariables;
                for (var key in cssVariables) {
                    smartView.setCss(key, cssVariables[key], null);
                }
                smartView.refreshCss();
                window.parent.nsmart.refreshCurControlCssTag(smartView);
                window.parent.nsmart.refreshRightPanelCss(smartView.controlId, smartView.controlData);
                if (typeof (MobileSimulator) != 'undefined') {
                    MobileSimulator.TryExec(function (instance) {
                        instance.OverwritePageAndLaunchAdjuster()
                    });
                }
            } else {
                // funcSuccess(f.Data);
            }
            if (typeof callback === 'function') {
                callback();
            }

        },
        error: function (f) {

        }
    });
}
function changeSmartViewStyle(controlData, funSuccess, funError, needRefershPanel) {
    $.ajax({
        cache: false,
        url: "/Designer/ChangeSmartViewStyleV2",
        data: {
            controlData: controlData,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (!f.Error) {
                smartViewFactory.afterModifyPageViaApi(f.Data.TempPageId);
                var data = f.Data;
                var header = $('head');// iframeContent.find('head');
                var cssId = "css" + data.ControlId;
                $('#' + cssId).remove();
                var $oldContrl = $('#smv_' + data.ControlId);
                var $body = $oldContrl.parent();
                var tabName = $oldContrl.attr('tabname')
                $oldContrl.remove();
                header.append(data.Css);
                var smartView = $(data.Html);
                $body.append(smartView);
                smartView = $('#smv_' + data.ControlId);
                smartView.find('.lazyload')
                    .each(function () {
                        var $this = $(this);
                        $this.attr('src', $this.attr('data-original'));
                    });
                smartView.find('a').attr('href', 'javascript:void(0)');
                smartView.addClass(" smc");
                tabName && smartView.attr("tabname", tabName);
                bindSmartEnventsWithObj(smartView, true);
                smartView.click();
                if (needRefershPanel) {
                    var pageId = smartView.attr('cpid');
                    if( smartViewFactory.storage.deviceMode !== 'Pc' ){
                        smartViewFactory.editSmartView(pageId, 'smv_' + data.ControlId, smartView.attr('ctype'), smartView.attr('cstyle'), smartView.attr('ccolor'));
                    } else {
                        getTabHtml('smv_' + data.ControlId, "Style")
                    }
                }
                if (funSuccess != null) {
                    funSuccess(f);
                }
                if (typeof (MobileSimulator) != 'undefined') {
                    MobileSimulator.TryExec(function (instance) {
                        instance.OverwritePageAndLaunchAdjuster()
                    });
                }
            } else {
                if (funError != null) {
                    funError(f.Message);
                } else {
                    alert(f.Message);
                }
            }
        },
        error: function (f) {
            if (funError) {
                funError("更改控件样式失败！");
            } else {
                alert("更改控件样式失败！");
            }
        }
    })
}
function changeSmartViewThemeColor(pageId, controlId, themeColor, callback) {
    $.ajax({
        cache: false,
        url: "/Designer/ChangeSmartViewThemeColorV2",
        data: {
            pageId: pageId,
            controlId: controlId,
            themeColor: themeColor,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {
            if (!f.Error) {
                smartViewFactory.afterModifyPageViaApi(f.TempPageId);
                var smartView = smartViewFactory.getSmartViewWithOutType(controlId);
                var cssVariables = f.CssVariables;
                for (var key in cssVariables) {
                    if (key.indexOf("background-color") >= 0) {
                        var prefix = key.replace("background-color", "");
                        smartView.setCss(prefix + "background-image", "none", null);
                        smartView.setCss(prefix + "background-gradient-top", "none", null);
                        smartView.setCss(prefix + "background-gradient-bottom", "none", null);
                    }
                    /*
                    $background-color: #F5F5F5;
                    $background-image: none;
                    $background-repeat: repeat;
                    $background-position: 50% 50%;
                    $background-gradient-top: none;
                    $background-gradient-bottom: none;
                     */
                    smartView.setCss(key, cssVariables[key], null);
                }
                smartView.refreshCss();
                window.parent.nsmart.refreshCurControlCssTag(smartView);
                window.parent.nsmart.refreshRightPanelCss(smartView.controlId, smartView.controlData);
                smartView.onSmartViewThemeChanged();
                if (typeof (MobileSimulator) != 'undefined') {
                    MobileSimulator.TryExec(function (instance) {
                        instance.OverwritePageAndLaunchAdjuster()
                    });
                }
            }
            if (typeof callback === 'function') {
                callback();
            }
        },
        error: function (f) {

        }
    });
}

function batchSaveFilterImage(pictureLish, successFn, failFn) {
    $.ajax({
        cache: false,
        url: "/admin/picture/BatchUploadImg",
        data: { PictureList: pictureLish },
        //contentType: 'json',
        type: "post",
        success: function (resultList) {
            var hasFail = false;
            var errorMsg = '';
            var errorTempId;
            $.each(resultList, function (i, item) {

                if (item.IsSuccess === false) {
                    hasFail = true;
                    errorMsg = item.ErrorMsg;
                    errorTempId = item.TempId;
                    return;
                }

                for (var i = 0; i < pictureLish.length; i++) {
                    if (item.TempId == pictureLish[i].TempId) {
                        var smartView = smartViewFactory.getSmartViewWithOutType(item.TempId);

                        smartView.customFastSettingImage([{
                            PictureId: item.PictureInfo.Id,
                            MimeType: item.PictureInfo.MimeType,
                            PictureTitle: '',// item.PictureInfo.Name,
                            PicUrl: item.Url
                        }])


                    }
                }
            });
            
            if (hasFail) {
                failFn(errorMsg);
                var errorTemp = document.querySelector('#'+errorTempId);
                errorTemp.scrollIntoView({ block:'center'});
                errorTemp.click();
            } else {
                successFn();
            }
           
        },
        error: function (f) {
            if (failFn) {
                failFn("保存页面失败！");
            } else {
                alert("保存页面失败！");
            }
        }
    });
}

function saveAllSmartViewsChanges(pageId, cotrolData, areaData, funcSuccess, funError, saveTitle) {
    $.ajax({
        cache: false,
        url: "/Designer/SavePageV2",
        data: {
            pageId: pageId,
            controlData: cotrolData,
            areaData: areaData,
            saveTitle: saveTitle,
            TempPageId: smartViewFactory.getLastTempPageId(),
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "post",
        success: function (f) {


            if (funcSuccess != null) {
                if (f.Error) {
                    if (funError != null) {
                        funError(f.Message);
                    } else {
                        alert(f.Message);
                    }
                } else {
                    smartViewFactory.afterModifyPageViaApi(f.TempPageId);
                    funcSuccess(f.Data);
                    if (saveTitle !== "自动备份" && saveTitle !== "自动保存") {
                        $.ajax({
                            cache: false,
                            url: "/Admin/SiteAdmin/NeedStandardDetect",
                            type: "get",
                            success: function (f) {
                                if (f) {
                                    pageStandardDetect(pageId)
                                }
                            },
                            error: function (f) { }
                        });
                    }
                }
            }
        },
        error: function (f) {
            if (funError) {
                funError("保存页面失败！");
            } else {
                alert("保存页面失败！");
            }
        }
    });
    if (saveTitle !== "自动备份"  && saveTitle !== "自动保存") {
        //提交异步请求后检测,可以减少等待时间
        parent.$("#title_QualityInspectionList").removeClass("active");
        parent.$("#pn_QualityInspectionList").removeClass("active");
        shortCut.ctrlStandardDetect();
    }
}
function pageStandardDetect(pageId) {
    $.ajax({
        cache: false,
        url: "/Admin/SitePublish/PageStandardDetect",
        data: {
            pageId: pageId,
            deviceMode: smartViewFactory.storage.deviceMode,
            languageCulture: smartViewFactory.storage.languageCulture
        },
        type: "get",
        success: function (f) {
            if (!f.IsPass) {
                if (parent.$("#detect-panel").is(':hidden')) {
                    parent.$("#detect-panel").show();
                    parent.$('#detect-layer-list li').removeClass('active').hide();
                    parent.$('#detect-panel .tab-content .tab-pane').removeClass('active');

                    parent.$("#title_QualityInspectionList").addClass("active");
                    parent.$("#pn_QualityInspectionList").addClass("active");
                }
                if (!parent.$('#detect-layer-list li').hasClass('active')) {
                    parent.$("#title_QualityInspectionList").addClass("active");
                    parent.$("#pn_QualityInspectionList").addClass("active");
                }
                parent.$("#title_QualityInspectionList").show();
                parent.$("#pn_QualityInspectionList").html('<ul class="u-layer"></ul>');
                if (!parent.ctrlIgnoreList) {
                    parent.ctrlIgnoreList = {
                        IntersectionCtrlIdList: [],
                        MulitRowCtrlIdMap: {},
                        NotCenterCtrlInfoList: [],
                        OverflowCtrlIdList: [],
                        CtrlDetectList: []
                    }
                }
                var num = 1;
                f.CtrlDetectList.forEach(function (item, index) {

                    var click = `onclick="javascript: nsmart.selectSmartView('smv_` + item.CtrlId + `'); document.getElementById('mainFrame').contentWindow.$('.smart-resize').removeClass('smart-resize').children('.ui-resizable-handle').hide();document.getElementById('mainFrame').contentWindow.$('#smv_` + item.CtrlId + `').addClass('smart-resize').children('.ui-resizable-handle').show();"`;
                    item.MsgList.forEach(function (el) {
                        var isIgnore = false;
                        if (parent.ctrlIgnoreList.CtrlDetectList.length) {
                            parent.ctrlIgnoreList.CtrlDetectList.forEach(function (ctrlIgnoreItem) {
                                if (item.CtrlId == ctrlIgnoreItem.ctrlId && el == ctrlIgnoreItem.msg) {
                                    isIgnore = true
                                }
                            })
                        }
                        $('<li class="u-layer-content ' + (isIgnore ? 'isIgnore' : '') + '" ' + click + '><div class="u-layer-item" style="padding-left: 15px;">' +
                            '<a class="layer-txt" href="javascript:;" style="padding:0">' +
                            '<span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width:165px;display:inline-block"  title="' + item.Desc + el + '">【' + num + '】<strong style="color:orangered">' + item.Desc + '</strong>' + el + '</span>' +
                            '<div class="layer-btn ignoreBtn" style="margin-top: 8px;float:right;" ignoreCtrlId="' + item.CtrlId + '" ignoreMsg="' + el + '" >忽略</div> ' +
                            '</a></div></li>').appendTo(parent.$("#pn_QualityInspectionList .u-layer"));
                        num += 1;
                    })
                })
                parent.$('#title_QualityInspectionList .title_tips').html(num - 1 - parent.ctrlIgnoreList.CtrlDetectList.length);
                parent.$("#pn_QualityInspectionList .ignoreBtn").on('click', function (e) {
                    e.stopPropagation();
                    parent.ctrlIgnoreList['CtrlDetectList'].push({ ctrlId: $(this).attr('ignoreCtrlId'), msg: $(this).attr('ignoreMsg') })
                    $(this).parents('.u-layer-content').addClass('isIgnore')
                    parent.$('#title_QualityInspectionList .title_tips').html(parent.$('#title_QualityInspectionList .title_tips').html() - 1)
                })
                var showNum = 0;
                parent.$("#detect-panel #detect-layer-list .lzdesigner-panel-nav-inner").each(function (index, item) {
                    if ($(item).is(':visible')) {
                        showNum += 1;
                    }
                })
                if (showNum > 4) {
                    parent.$("#detect-panel #detect-layer-list .lzdesigner-panel-nav-inner").addClass('fivetabs')
                } else {
                    parent.$("#detect-panel #detect-layer-list .lzdesigner-panel-nav-inner").removeClass('fivetabs')
                }
            } else {
                parent.$("#title_QualityInspectionList").hide();
                var isAllTabHidden = true;
                parent.$('#detect-layer-list li').each(function () {
                    if (isAllTabHidden) {
                        isAllTabHidden = $(this).is(':hidden')
                    }
                })
                if (isAllTabHidden) {
                    parent.$("#detect-panel").hide();
                }
            }
        },
        error: function (f) { }
    });
}
function getAreaCurrentAreaId($area) {
    var pvid = $area.attr('pvid');
    if ($area.attr('iscontainer') === 'True') {
        var areaId = "Area0";
        var curAreaId = $area.attr('selectArea');
        if (typeof curAreaId !== 'undefined' && curAreaId !== '') {
            areaId = curAreaId;
        }
        return areaId;
    } else if (typeof pvid !== 'undefined' && pvid !== '') {
        var $p = $('#smv_' + pvid);
        return getAreaCurrentAreaId($p);
    }
    return null;
}
function rightContextMenuPaste(pageId, pareaId, pid, areaId, x, y) {
    var data = "";
    var copyedItems = $.localStorage.get('sm_copy');
    if (copyedItems != null) {

        if (!x || !y) {
            window.parent.showFailure("请在要粘贴的容器内点击一下再粘贴");
            return;
        }

        var cLen = copyedItems.length;
        if (cLen > 0) {
            var centerX = (copyedItems[0].x + copyedItems[cLen - 1].x) / 2;
            var centerY = (copyedItems[0].y + copyedItems[cLen - 1].y) / 2;
            var distX = x - centerX;
            var distY = y - centerY;
            var copyViews = new Array();
            for (var i = 0; i < cLen; i++) {
                var cItem = clone(copyedItems[i]);
                cItem.x += parseInt(distX);
                cItem.y += parseInt(distY);
                cItem.x = parseInt(cItem.x);
                cItem.y = parseInt(cItem.y);
                cItem.parentId = pid;
                cItem.parentAreaId = pareaId;
                cItem.areaId = areaId;
                cItem.pageId = pageId;
                copyViews.push(cItem);
            }
            if (pid) {
                var targetType = $(pid.indexOf("smv_") !== -1 ? (("#" + pid)) : ("#smv_" + pid)).attr('ctype');
                for (var indexer = 0; indexer < copyViews.length; indexer++) {
                    var item = copyViews[indexer];
                    var sourceType = item.type;
                    if (!smartViewFactory.isSmartViewCanAdd(targetType, sourceType)) {
                        alert('不能把控件添加到该位置');
                        smartViewFactory.clearCurrentWaitAddView();
                        return true;
                    }
                }
            }
            smartGlobalSettings.pasteTimes += 1;
            var controlData = JSON.stringify(copyViews);
            smartViewFactory.pasteSmartViews(controlData);
        }
    }
}
function copySmartViews(selector) {
    var cArray = new Array();
    var firstAreaId = "";
    var len = 0;
    $(selector).each(function (i, e) {
        var $e = $(e);
        var item = {};
        item.id = $e.attr('id');

        item.type = $e.attr('ctype');
        item.styleName = $e.attr('cstyle');
        item.colorName = $e.attr('ccolor');
        item.pageId = $e.attr('cpid');
        item.areaId = $e.attr('tareaid');
        item.tareaId = item.areaId;
        item.parentId = $e.attr('pvid');
        item.parentAreaId = $e.attr('areaid');
        if (firstAreaId === "") {
            firstAreaId = item.areaId;
        }
        var viewData = smartViewFactory.getSmartViewData(item.id);
        item.Css = viewData.Css;
        item.Data = viewData.Data;
        item.ExtData = viewData.ExtData;
        item.ListData = viewData.ListData;
        item.x = parseInt(item.Css['offsetX']);
        item.y = parseInt(item.Css['offsetY']);
        smartViewFactory.encodeSmartViewData(item);

        if (item.areaId !== firstAreaId && item.areaId == "") {
            item.areaId = firstAreaId;
        }
        if (item.areaId === firstAreaId) {
            item.children = buildCopyItemChildren($e);
            cArray.push(item);
            len++;
        }
    });
    if (len > 0) {
        cArray.sort(sortItem);
        $.localStorage.set('sm_copy', cArray);
        copyToClipboard("#wz_data#" + JSON.stringify(cArray));
        //smartGlobalSettings.copyedItems = cArray;
        smartGlobalSettings.pasteTimes = 0;
    }
}
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function buildCopyItemChildren(target) {
    var children = target.children().first().find('.smartAbs');
    var controlDic = {};
    var result = new Array();
    children.each(function (i) {
        var $e = $(this);
        var item = {};
        item.id = $e.attr('id');
        item.styleName = $e.attr('cstyle');
        item.colorName = $e.attr('ccolor');
        item.type = $e.attr('ctype');
        item.pageId = $e.attr('cpid');
        item.areaId = $e.attr('tareaid');
        item.tareaId = $e.attr('tareaid');
        item.parentId = $e.attr('pvid');
        item.parentAreaId = $e.attr('areaid');
        if (typeof item.parentId !== 'undefined') {
            item.parentId = "smv_" + item.parentId;
        }
        var viewData = smartViewFactory.getSmartViewData(item.id);
        item.Css = viewData.Css;
        item.x = parseInt(item.Css['offsetX']);
        item.y = parseInt(item.Css['offsetY']);
        item.Data = viewData.Data;
        item.ExtData = viewData.ExtData;
        item.ListData = viewData.ListData;
        item.children = new Array();
        item.level = 0;
        smartViewFactory.encodeSmartViewData(item);
        var dicItem = {};
        dicItem.id = item.id;
        dicItem.level = item.level;
        if (typeof item.parentId !== 'undefined' && item.parentId !== '') {
            var parent = controlDic[item.parentId];
            if (typeof parent !== 'undefined' && parent != null) {
                item.level = parent.level + 1;
            }
            controlDic[dicItem.id] = dicItem;
            result.push(item);
        }
    });
    return result;
}
function buildRefreshViewChangedChildren(target) {
    var children = target.children().first().find('.smartAbs');
    var controlDic = {};
    var result = new Array();
    children.each(function (i) {
        var $e = $(this);
        if ($e.hasClass('smc')) {
            var item = {};
            item.id = $e.attr('id');
            item.styleName = $e.attr('cstyle');
            item.colorName = $e.attr('ccolor');
            item.type = $e.attr('ctype');
            item.pageId = $e.attr('cpid');
            item.areaId = $e.attr('tareaid');
            item.tareaId = $e.attr('tareaid');
            item.parentId = $e.attr('pvid');
            item.parentAreaId = $e.attr('areaid');
            if (typeof item.parentId !== 'undefined') {
                item.parentId = "smv_" + item.parentId;
            }
            var viewData = smartViewFactory.getSmartViewData(item.id);
            item.Css = viewData.Css;
            item.x = parseInt(item.Css['offsetX']);
            item.y = parseInt(item.Css['offsetY']);
            item.Data = viewData.Data;
            item.ExtData = viewData.ExtData;
            item.ListData = viewData.ListData;
            item.children = new Array();
            smartViewFactory.encodeSmartViewData(item);
            if (typeof item.parentId !== 'undefined' && item.parentId !== '') {
                result.push(item);
            }
        }
    });
    return result;
}
function getSmartViewsMinLeft(views) {
    var left = -1;
    views.each(function () {
        var l = parseInt($(this).position().left);
        if (left === -1) {
            left = l;
        } else {
            if (l < left) {
                left = l;
            }
        }
    });
    if (left === -1) {
        left = 0;
    }
    return left;
}
function getSmartViewMaxRight(views) {
    var right = 0;
    views.each(function () {
        var $this = $(this);
        var nr = $this.position().left + $this.width();
        if (right === 0) {
            right = nr;
        } else {
            if (nr > right) {
                right = nr;
            }
        }
    });
    return parseInt(right);
}
function getSmartViewMixAndMaxInfo(views) {
    var result = {};
    result.min = -1;
    result.minId = '';
    result.max = 0;
    result.maxId = '';
    views.each(function () {
        var $this = $(this);
        var l = parseInt($(this).position().left);
        var nr = $this.position().left + $this.width();
        if (result.max === 0) {
            result.max = nr;
            result.maxId = $this.attr('id');
        } else {
            if (nr > result.max) {
                result.max = nr;
                result.maxId = $this.attr('id');
            }
        }
        if (result.min === -1) {
            result.min = l;
            result.minId = $this.attr('id');
        } else {
            if (l < result.min) {
                result.min = l;
                result.minId = $this.attr('id');
            }
        }
    });
    result.min = parseInt(result.min);
    result.max = parseInt(result.max + 1);
    if (result.min < 0) {
        result.min = 0;
    }
    return result;
}
function getSmartViewMixAndMaxHeight(views) {
    var result = {};
    result.min = -1;
    result.minId = '';
    result.max = 0;
    result.maxId = '';
    views.each(function () {
        var $this = $(this);
        var l = parseInt($(this).position().top);
        var nr = $this.position().top + $this.height();
        if (result.max === 0) {
            result.max = nr;
            result.maxId = $this.attr('id');
        } else {
            if (nr > result.max) {
                result.max = nr;
                result.maxId = $this.attr('id');
            }
        }
        if (result.min === -1) {
            result.min = l;
            result.minId = $this.attr('id');
        } else {
            if (l < result.min) {
                result.min = l;
                result.minId = $this.attr('id');
            }
        }
    });
    result.min = parseInt(result.min);
    result.max = parseInt(result.max + 1);
    if (result.min < 0) {
        result.min = 0;
    }
    return result;
}
function setSmvAlignRight(views) {
    var maxRight = getSmartViewMaxRight(views);
    views.each(function () {
        var smView = smartViewFactory.getSmartViewWithJobj($(this));
        var orginLeft = parseInt(smView.$control.position().left);
        var width = parseInt(smView.$control.width());
        var distance = maxRight - orginLeft - width;
        if (distance > 0) {
            smView.setLeft(orginLeft + distance);
        }
    });

}
function getSmartViewMaxBottom(views) {
    var bottom = 0;
    views.each(function () {
        var $this = $(this);
        var nr = $this.position().top + $this.height();
        if (bottom === 0) {
            bottom = nr;
        }
        else {
            if (nr > bottom) {
                bottom = nr;
            }
        }
    });
    return parseInt(bottom);
}
function setSmvAlignBottom(views) {
    var maxBottom = getSmartViewMaxBottom(views);
    views.each(function () {
        var smView = smartViewFactory.getSmartViewWithJobj($(this));
        var orginTop = parseInt(smView.$control.position().top);
        var height = parseInt(smView.$control.height());
        var distance = maxBottom - orginTop - height;
        if (distance > 0) {
            smView.setTop(orginTop + distance);
        }
    });
}
function setSmvAlignVertical(views) {
    var result = getSmartViewMixAndMaxHeight(views);
    var half = parseInt((result.min + result.max) / 2);
    views.each(function () {
        var smView = smartViewFactory.getSmartViewWithJobj($(this));
        var vhh = smView.$control.height() / 2;
        var newH = half - vhh;
        if (newH < 0) {
            newH = 0;
        }
        smView.setTop(parseInt(newH));
    });
}
function setSmvDistributedHorizontal(views) {
    if (views.length <= 2) return;
    var result = getSmartViewMixAndMaxInfo(views);
    var totalWidth = 0;
    views.sort(function (a, b) {
        return $(a).position().left - $(b).position().left;
    });
    views.each(function () {
        totalWidth += $(this).width();
    });
    var half = (result.max - 1 - result.min - totalWidth) / (views.length - 1);
    var currentLeft = result.min;
    views.each(function () {
        var smView = smartViewFactory.getSmartViewWithJobj($(this));
        var cLeft = currentLeft;
        var controlWidth = smView.$control.width();
        if (cLeft + controlWidth > result.max) {
            cLeft = result.max - controlWidth;
        }
        smView.setLeft(parseInt(cLeft));
        currentLeft = currentLeft + controlWidth + half;
    });
}
function setSmvDistributedAverage(views) {
    setSmvDistributedHorizontal(views);
    setSmvDistributedVertical(views);
}
function setSmvDistributedVertical(views) {
    if (views.length <= 2) return;
    var result = getSmartViewMixAndMaxHeight(views);
    var totalHeight = 0;
    views.sort(function (a, b) {
        return $(a).position().top - $(b).position().top;
    });
    views.each(function () {
        totalHeight += $(this).height();
    });
    var half = (result.max - 1 - result.min - totalHeight) / (views.length - 1);
    var currentTop = result.min;
    views.each(function () {
        var smView = smartViewFactory.getSmartViewWithJobj($(this));
        var ctop = currentTop;
        smView.setTop(parseInt(ctop));
        currentTop = currentTop + smView.$control.height() + half;
    });
}
function getSmartViewsMinTop(views) {
    var top = -1;
    views.each(function () {
        l = $(this).position().top;
        if (top === -1) {
            top = l;
        } else {
            if (l < top) {
                top = l;
            }
        }
    });
    return parseInt(top);
}
function getViewsMaxZindex($area) {
    var zmax = 0;
    $area.find('.esmartMargin').each(function () {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur > zmax ? cur : zmax;
    });
    return zmax;
}
function getViewMaxZindex1() {
    var zmax = 0;
    $('.esmartMargin').each(function () {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur > zmax ? cur : zmax;
    });
    return zmax;
}
function initContextMenu() {
    $.contextMenu.types.myLabel = function (item, opt, root) {
        var $control = $(root.$trigger.context);
        if ($control.hasClass('smart-resize')) {
            var clientId = $control.attr('id');
            var controlId = clientId.replace(/smv_/, '');
            var controlType = $control.attr('ctype');
            var cstyle = $control.attr('cstyle');
            var ccolor = $control.attr('ccolor');
            var pageId = $control.attr('cpid');
            var pvid = $control.attr('pvid');
            var areaId = $control.attr('tareaid');
            if (areaId === '') {
                areaId = 'smv_Main';
            } else {
                areaId = 'smv_' + areaId;
            }
            var pasteAction = 'disabled';
            var copyLength = 0;
            var copyedItems = $.localStorage.get('sm_copy');
            if (copyedItems !== null) {
                copyLength = copyedItems.length;
            }

            if (copyLength > 0) {
                pasteAction = '';
            }
            var cdAction = 'disabled';
            var commonAction = 'disabled';
            var distributed = 'disabled';
            var lockAction = 'disabled';
            var lockClass = 'icon-do-unlock';
            var lockText = '锁定';
            var merge2SameAreaAction = "disabled";
            var isControlLocked = false;
            var $selectedViews = null;
            var $firstSelectedView = null;
            if (pvid !== '') {
                $selectedViews = $('#smv_' + pvid).find('#smc_' + $control.attr('areaid')).children('.smart-resize');
            } else {
                $selectedViews = $('#' + areaId).children('.smart-resize');
            }
            if ($selectedViews.length > 2) {
                distributed = '';
            }
            if ($selectedViews.length > 1) {
                commonAction = '';
            }
            if ($selectedViews.length > 1) {
                merge2SameAreaAction = '';
                for (var i = 0; i < $selectedViews.length; i++) {
                    var ctrl = $selectedViews.eq(i);
                    if (!smartViewFactory.isSmartViewCanAdd('area', ctrl.attr('ctype'))) {
                        merge2SameAreaAction = 'disabled';
                        break;
                    }
                }
            }

            if ($selectedViews.length > 0) {
                cdAction = '';
            }
            if ($selectedViews.length === 1) {
                lockAction = '';
                $firstSelectedView = $selectedViews.first();
                if ($firstSelectedView.hasClass('smlocked')) {
                    isControlLocked = true;
                    lockClass = 'icon-do-lock';
                    lockText = "解锁";
                }
            }
            if (cdAction === 'disabled') {
                if ($('#' + areaId).find('.smart-resize').length > 0) {
                    cdAction = '';
                }
            }
            var cdisableAction = cdAction;
            var slen = $selectedViews.length;
            var disable = 'disabled';
            $selectedViews.each(function () {
                if ($(this).attr('isdeletable') === "True") {
                    disable = '';
                }
            });
            cdisableAction = disable;
            var isMacOs = smartViewFactory.isMacOs();
            var symbol = (isMacOs ? "⌘" : "Ctrl");
            $('<div class="m-contextMenu" style=""><div class="m-dropdown dropdown" style="display:block;"><div class="dropdown-menu dropdown-menu-little">'
                + '<ul class="u-contextList f-clearfix">'
                + '<li role="menuitem" id="lblmenu_edit" class="menu-setItem"><a class="menu-setLink u-setPage"><i class="icon icon-do-set"></i><span class="menu-setText">属性</span></a></li>'
                + '<li role="menuitem" id="lblmenu_copy" class="menu-setItem ' + cdAction + '"><a class="menu-setLink f-clearfix"><span class="f-right">' + symbol + '+C</span><i class="icon icon-do-copy"></i><span class="menu-setText">复制</span></a></li>'
                + '<li role="menuitem" id="lblmenu_paste" class="menu-setItem ' + pasteAction + '"><a class="menu-setLink f-clearfix"><span class="f-right">' + symbol + '+V</span><i class="icon icon-do-pasta"></i><span class="menu-setText">粘贴</span></a></li>'
                + '<li role="menuitem" id="lblmenu_merge" class="menu-setItem ' + merge2SameAreaAction + '"><a class="menu-setLink f-clearfix"><span class="f-right">' + symbol + '+↑</span><i class="icon " style="background-image:url(/Designer/Content/images/merge.png)"></i><span class="menu-setText">置入同一容器</span></a></li>'

                + '<li class="menu-setItem"><a class="menu-setLink f-clearfix"><span class="menu-rightIcon f-right"><i class="icon icon-do-arrow-right"></i></span><i class="icon icon-do-align"></i><span class="menu-setText">对齐</span></a>'
                + '<div class="u-contextList-fold"><ul class="u-contextList">'
                + '<li role="menuitem" id="lblmenu_setalignleft" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-align-left"></i><span class="menu-setText">左对齐</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setaligncenter" class="menu-setItem"><a class="menu-setLink f-clearfix"><i class="icon icon-do-pagecenter"></i><span class="menu-setText">页面居中对齐</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setoaligncenter" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-align-center"></i><span class="menu-setText">控件居中对齐</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setalignright" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-align-right"></i><span class="menu-setText">右对齐</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setaligntop" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-align-top"></i><span class="menu-setText">顶部对齐</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setalignverticl" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-align-middle"></i><span class="menu-setText">上下对齐</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setalignbottom" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-align-bottom"></i><span class="menu-setText">底部对齐</span></a></li>'
                + '</ul></div></li>'
                + '<li class="menu-setItem ' + distributed + '"><a class="menu-setLink f-clearfix"><span class="menu-rightIcon f-right"><i class="icon icon-do-arrow-right"></i></span><i class="icon icon-distribute-level"></i><span class="menu-setText">分布</span></a>'
                + '<div class="u-contextList-fold"><ul class="u-contextList">'
                + '<li role="menuitem" id="lblmenu_setspfb" class="menu-setItem ' + distributed + '"><a class="menu-setLink f-clearfix"><i class="icon icon-distribute-level"></i><span class="menu-setText">水平分布</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setpjfb" class="menu-setItem ' + distributed + '"><a class="menu-setLink f-clearfix"><i class="icon icon-distribute-average"></i><span class="menu-setText">平均分布</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setczfb" class="menu-setItem ' + distributed + '"><a class="menu-setLink f-clearfix"><i class="icon icon-distribute-vertical"></i><span class="menu-setText">垂直分布</span></a></li>'
                + '</ul></div></li>'
                + '<li class="menu-setItem"><a class="menu-setLink f-clearfix"><span class="menu-rightIcon f-right"><i class="icon icon-do-arrow-right"></i></span><i class="icon icon-do-layer"></i><span class="menu-setText">层级</span></a>'
                + '<div class="u-contextList-fold" style="bottom:-39px;"><ul class="u-contextList">'
                + '<li role="menuitem" id="lblmenu_settop" class="menu-setItem"><a class="menu-setLink f-clearfix"><i class="icon icon-do-move-topest"></i><span class="menu-setText">置于顶层</span></a></li>'
                + '<li role="menuitem" id="lblmenu_setbottom" class="menu-setItem"><a class="menu-setLink f-clearfix"><i class="icon icon-do-move-downest"></i><span class="menu-setText">置于底层</span></a></li>'
                + '</ul></div></li>'

                + ' </ul>'
                + '<ul class="u-contextList u-Attributes f-clearfix">'
                + '<li role="menuitem" id="lblmenu_lock" class="menu-setItem u-Attributes-item ' + lockAction + '"><a class="u-attLink u-Attributes-lock"><i class="icon ' + lockClass + '"></i></a><div class="lzprompt-plan" style="margin-left:-28px;"><span class="lzprompt-txt">' + lockText + '</span><span class="lzprompt-point lzprompt-point-top"></span></div></li>'
                + '<li role="menuitem" id="lblmenu_uplayer" class="menu-setItem u-Attributes-item"><a class="u-attLink"><i class="icon icon-do-move-up1"></i></a><div class="lzprompt-plan" style="margin-left:-40px;"><span class="lzprompt-txt">上移一层</span><span class="lzprompt-point lzprompt-point-top"></span></div></li>'
                + '<li role="menuitem" id="lblmenu_downlayer" class="menu-setItem u-Attributes-item"><a class="u-attLink"><i class="icon icon-do-move-down1"></i></a><div class="lzprompt-plan" style="margin-left:-40px;"><span class="lzprompt-txt">下移一层</span><span class="lzprompt-point lzprompt-point-top"></span></div></li>'
                + '<li role="menuitem" id="lblmenu_delete" class="menu-setItem u-Attributes-item"><a class="u-attLink"><i class="icon icon-do-widget-delete"></i></a><div class="lzprompt-plan" style="margin-left:-28px;"><span class="lzprompt-txt">删除</span><span class="lzprompt-point lzprompt-point-top"></span></div></li>'
                + '</ul></div></div></div>')
                .appendTo(this)
                .on("click", "[role=menuitem]", function (event) {
                    var $item = $(this);
                    if ($item.hasClass('disabled')) {
                        return false;
                    }
                    var h = $item.attr("id").split("_")[1];
                    root.$menu.trigger('contextmenu:hide');
                    switch (h) {
                        case "edit":
                            smartViewFactory.editSmartView(pageId, clientId, controlType, cstyle, ccolor);
                            break;
                        case "delete":
                            var controlIds = smartViewFactory.getWaitDelViewIds($selectedViews);
                            smartViewFactory.deleteSmartView(pageId, controlIds);
                            break;
                        case "copy":
                            copySmartViews('.smart-resize');
                            break;
                        case "paste":
                            var x = $control.position().left + event.offsetX;
                            var y = $control.position().top + event.offsetY;
                            var smIsContainer = false;
                            if ($control.attr('iscontainer') === 'True') {
                                x = x - $control.position().left;
                                y = y - $control.position().top;
                                smIsContainer = true;
                            }
                            var cAreaId = $control.attr('tareaid').split('_');
                            if (cAreaId.length === 2) {
                                cAreaId = cAreaId[1];
                            } else {
                                cAreaId = cAreaId[0];
                            }
                            var pgId = $control.attr('cpid');
                            var smvpId = pvid;
                            //如果当前控件是容器控件，则parentId就是当前控件id，如果不是取父控件id
                            if (smIsContainer || (typeof smvpId === 'undefined' && smvpId === '')) {
                                smvpId = $control.attr('id');
                            } else {
                                smvpId = 'smv_' + smvpId;
                            }
                            rightContextMenuPaste(pgId, getAreaCurrentAreaId($control), smvpId, cAreaId, x, y);
                            break;
                        case "settop":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "置于顶层" });
                            smartViewFactory.getSmartView(clientId, controlType).toTopIndex();
                            break;
                        case "setbottom":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "置于底层" });
                            smartViewFactory.getSmartView(clientId, controlType).toBottomIndex();
                            break;
                        case "uplayer":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "上移一层" });
                            smartViewFactory.getSmartView(clientId, controlType).upIndex();
                            break;
                        case "downlayer":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "下移一层" });
                            smartViewFactory.getSmartView(clientId, controlType).downIndex();
                            break;
                        case "setaligncenter":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "页面居中对齐" });
                            var halfParentWidth = $control.parent().width() / 2;

                            $selectedViews.each(function () {
                                var smView = smartViewFactory.getSmartViewWithJobj($(this));
                                var halfControlWidth = smView.$control.width() / 2;
                                smView.setLeft(parseInt(Math.abs(halfParentWidth - halfControlWidth), 10));
                            });
                            break;
                        case "setoaligncenter":

                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "控件居中对齐" });
                            var minAndMaxResult = getSmartViewMixAndMaxInfo($selectedViews);
                            var oHalfCenterWidth = parseInt((minAndMaxResult.min + minAndMaxResult.max) / 2);
                            $selectedViews.each(function () {
                                var smView = smartViewFactory.getSmartViewWithJobj($(this));
                                var halfControlWidth = smView.$control.width() / 2;
                                var svNewLeft = oHalfCenterWidth - halfControlWidth;
                                if (svNewLeft < 0) {
                                    svNewLeft = 0;
                                }
                                smView.setLeft(parseInt(svNewLeft));
                            });
                            break;
                        case "setalignleft":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "左对齐" });
                            var minLeft = getSmartViewsMinLeft($selectedViews);
                            $selectedViews.each(function () {
                                var smView = smartViewFactory.getSmartViewWithJobj($(this));
                                smView.setLeft(minLeft);
                            });
                            break;
                        case "setalignright":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "右对齐" });
                            setSmvAlignRight($selectedViews);
                            break;
                        case "setalignbottom":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "底部对齐" });
                            setSmvAlignBottom($selectedViews);
                            break;
                        case "setalignverticl":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "上下对齐" });
                            setSmvAlignVertical($selectedViews);
                            break;
                        case "setaligntop":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "顶部对齐" });
                            var minTop = getSmartViewsMinTop($selectedViews);
                            $selectedViews.each(function () {
                                var smView = smartViewFactory.getSmartViewWithJobj($(this));
                                smView.setTop(minTop);
                            });
                            break;
                        case "setspfb":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "水平分布" });
                            setSmvDistributedHorizontal($selectedViews);
                            break;
                        case "setpjfb":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "平均分布" });
                            setSmvDistributedAverage($selectedViews);
                            break;
                        case "setczfb":
                            smartViewFactory.beforeModify({ desc: "将", controlType: controlType, ctrlId: controlId, suffix: "垂直分布" });
                            setSmvDistributedVertical($selectedViews);
                            break;
                        case "lock":
                            if (isControlLocked) {
                                $item.find('.icon').removeClass('icon-do-lock').addClass('icon-do-unlock');
                                $("#fs_controllocked").removeClass('lock').addClass('unlock');
                                smartViewFactory.enableDrag(clientId);
                                smartViewFactory.disableLocked(clientId);
                                $('#fs_controllockedText').html('锁定');
                            } else {
                                $item.find('.icon').removeClass('icon-do-unlock').addClass('icon-do-lock');
                                $("#fs_controllocked").removeClass('unlock').addClass('lock');
                                smartViewFactory.disableDrag(clientId);
                                smartViewFactory.disableLocked(clientId);
                                $('#fs_controllockedText').html('解锁');
                            }
                            break;
                        case "merge":
                            {
                                smartViewFactory.merge2SameArea()
                                break;
                            }

                    }
                    return false;
                }).on("mouseenter mouseleave", "[role=menuitem]", function (event) {
                    if (event.type === "mouseenter") {
                        if (!$(this).hasClass('disabled')) {
                            $(this).addClass('focus');
                        }
                    } else if (event.type === "mouseleave") {
                        if (!$(this).hasClass('disabled')) {
                            $(this).removeClass('focus');
                        }
                    }
                });
            if (controlType == "dialog") {
                this.find("#lblmenu_lock").css("visibility", "hidden");
            }
        }
    };
}
function getAreaRealateivPosition(areaId) {
    var p = {}; p.x = 0; p.y = 0;
    var $area0, $area1, $areaMain, $area2;
    var wH = $(window).width();
    var cwH = 0;
    if (areaId === "smv_Main") {
        $area0 = $('#smv_Area0');
        $area1 = $('#smv_Area1');
        $areaMain = $('#smv_Main');
        if ($area0.length > 0) {
            p.y = p.y - $area0.height();
        }
        if ($area1.length > 0) {
            cwH = $area1.width() + $areaMain.width();

        } else {
            cwH = $areaMain.width();
        }
    } else if (areaId === "smv_Area0") {
        cwH = $('#smv_Area0').width();
    } else {
        if (areaId === "smv_Area1") {
            $area1 = $('#' + areaId);
            $areaMain = $('#smv_MainContent');
            p.y = p.y - $('#smv_Area0').height();
            if ($area1.parent().parent().hasClass('col-right')) {

                cwH = $areaMain.width();
                p.x = p.x - cwH;
                cwH += $area1.width();
            } else {
                cwH = $areaMain.width() + $area1.width();
            }

        } else if (areaId === "smv_Area2") {
            $area1 = $('#smv_Area1');
            $areaMain = $('#smv_MainContent');
            $area0 = $('#smv_Area0');
            p.y = p.y - $area0.height();
            if ($area1.length > 0) {
                p.x = p.x - $area1.width();
            }
            p.x = p.x - $areaMain.width();
        } else if (areaId === "smv_Area3") {
            $area1 = $('#smv_Area1');
            $area2 = $('#smv_Area2');
            var area2H = 0;
            var area1H = 0;
            if ($area1.length > 0) {
                area1H = $area1.height();
            }
            if ($area2.length > 0) {
                area2H = $area2.height();
            }
            $areaMain = $('#smv_MainContent');
            var areaMainH = $areaMain.height();
            $area0 = $('#smv_Area0');
            var area0H = $area0.height();
            p.y = p.y - area0H;
            if (area1H > areaMainH) {
                p.y = p.y - area1H;
            } else {
                p.y = p.y - areaMainH;
            }
            cwH = $('#smv_Area3').width();
        }

    }
    if (cwH < wH) {
        p.x = p.x + (cwH - wH) / 2;
    }
    return p;
}
function initPageContextMenu() {
    $.contextMenu.types.pageLabel = function (item, opt, root) {
        var $target = $(root.$trigger.context);


        var clientId = $target.attr('id');
        //var controlId = clientId.replace(/smv_/, '');
        var isInTemplate = $('#smv_Main').length === 1 ? false : true;
        var templateEditT = '';
        if (isInTemplate) {
            templateEditT = '<li role="menuitem" id="lblmenu_layout" class="menu-setItem"><a class="menu-setLink u-setPage"><i class="icon icon-do-buju"></i><span class="menu-setText">布局设置</span></a></li>';
        }
        var pageId = $target.attr('cpid');
        var areaId = clientId;
        if (areaId === '') {
            areaId = 'smv_Main';
        }
        var $selectedControl = $('#' + areaId).children('.smart-resize');
        var commonAction = 'disabled';
        if ($selectedControl.length > 0) {
            commonAction = '';
        }
        var pasteAction = 'disabled';
        var copyLength = 0;
        var copyedItems = $.localStorage.get('sm_copy');
        if (typeof copyedItems !== 'undefined' && copyedItems !== null) {
            copyLength = copyedItems.length;
        }
        if (copyLength > 0) {
            pasteAction = '';
        }

        var isMacOs = smartViewFactory.isMacOs();
        var symbol = (isMacOs ? "⌘" : "Ctrl");
        $('<div class="m-contextMenu" style=""><div class="m-dropdown dropdown" style="display:block;"><div class="dropdown-menu dropdown-menu-little">'
            + '<ul class="u-contextList f-clearfix">'
            + '<li role="menuitem" id="lblmenu_edit" class="menu-setItem"><a class="menu-setLink u-setPage"><i class="icon icon-do-set"></i><span class="menu-setText">属性</span></a></li>'
            + templateEditT
            + '<li role="menuitem" id="lblmenu_copy" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><span class="f-right">' + symbol + '+C</span><i class="icon icon-do-copy"></i><span class="menu-setText">复制</span></a></li>'
            + '<li role="menuitem" id="lblmenu_paste" class="menu-setItem ' + pasteAction + '"><a class="menu-setLink f-clearfix"><span class="f-right">' + symbol + '+V</span><i class="icon icon-do-pasta"></i><span class="menu-setText">粘贴</span></a></li>'
            + '<li role="menuitem"id="lblmenu_delete" class="menu-setItem ' + commonAction + '"><a class="menu-setLink f-clearfix"><i class="icon icon-do-widget-delete"></i><span class="menu-setText">删除</span></a></li>'
            + '</ul></div></div></div>').appendTo(this)
            .on("click", "[role=menuitem]", function (event) {
                var $item = $(this);
                if ($item.hasClass('disabled')) {
                    return false;
                }
                var h = $item.attr("id").split("_")[1];
                root.$menu.trigger('contextmenu:hide');
                switch (h) {
                    case "edit":
                        var $dp = $('#design-pageproperties', window.parent.document).show();
                        $('#design-right', window.parent.document).hide();
                        $dp.parent().show();
                        //$('#design-container', window.parent.document).addClass('design-leaveright');
                        break;
                    case "delete":
                        var controlIds = smartViewFactory.getWaitDelViewIds($selectedControl);
                        if (controlIds !== '') {
                            smartViewFactory.deleteSmartView(pageId, controlIds);
                        }
                        break;
                    case "copy":
                        copySmartViews('.smart-resize');
                        break;
                    case "paste":
                        var p = getAreaRealateivPosition(areaId);
                        var $target = $(event.delegateTarget).parent().parent();
                        var x = $target.position().left - event.offsetX + p.x;
                        var y = $target.offset().top + event.offsetY + p.y;
                        if (x < 0) { x = 5; }
                        if (y < 0) { y = 5; }
                        var cAreaId = areaId.split('_');
                        if (cAreaId.length === 2) {
                            cAreaId = cAreaId[1];
                        } else {
                            cAreaId = cAreaId[0];
                        }
                        rightContextMenuPaste(pageId, null, null, cAreaId, x, y);
                        break;
                    case "layout":
                        smartViewFactory.setTemplateLayout(pageId);
                        break;

                }
                return false;
            }).on("mouseenter mouseleave", "[role=menuitem]", function (event) {
                if (event.type === "mouseenter") {
                    if (!$(this).hasClass('disabled')) {
                        $(this).addClass('focus');
                    }
                } else if (event.type === "mouseleave") {
                    if (!$(this).hasClass('disabled')) {
                        $(this).removeClass('focus');
                    }
                }
            });
    };
}
function bindPageContextMenu() {
    $.contextMenu({
        selector: '.smvContainer',
        zIndex: 10000,
        build: function (c, h) {
            return {
                items: {
                    label: {
                        type: "pageLabel",
                        customName: "pageLabel"
                    }
                }
            }
        }
    });
}
function bindContextMenu(selector) {
    $.contextMenu({
        selector: selector,
        zIndex: 10000,
        build: function (c, h) {
            // 右键关闭设置面板
            console.log("右键")
            if(smartViewFactory.storage.deviceMode === 'Pc') {
                window.parent.nsmart.hideCtrlTab();
            }
            return {
                items: {
                    label: {
                        type: "myLabel",
                        customName: "myLabel"
                    }
                }
            }
        }
    });

}
function bindContextMenuWithObj(obj) {
    obj.contextMenu({
        zIndex: 10000,
        build: function (c, h) {
            return {
                items: {
                    label: {
                        type: "myLabel",
                        customName: "myLabel"
                    }
                }
            }
        }
    });
}
function bindSmartEnvents(selector, resizeHandler) {
    //="n,e,s,w,ne,se,sw,nw"
    var $smartView = $(selector);
    function markPullDownSmartViews(sv) {
        if (!sv.hasClass("on-pull-down")) {
            return;
        }
        var slibing = sv.parent().children(".smartAbs").not(".smartFixed");
        var svPosition = sv.position();
        var markInPullDownArea = function (csv) {
            var csvPosition = csv.position();
            var csvWidth = csv.width();
            var tAr = new Array();
            slibing.each(function () {
                var svItem = $(this);
                var svp = svItem.position();
                if (svPosition.top >= svp.top) {
                    slibing = slibing.not(svItem);
                    return;
                }
                if (csvPosition.top >= svp.top) {
                    return;
                }
                if (svp.left + svItem.width() < csvPosition.left) {
                    return;
                }
                if (svp.left > csvPosition.left + csvWidth) {
                    return;
                }
                svItem.addClass("smart-onpulldown");
                tAr.push(svItem);
            });
            slibing = slibing.not(".smart-onpulldown");
            if (tAr.length > 0 && slibing.length > 0) {
                for (var i = 0; i < tAr.length; i++) {
                    markInPullDownArea(tAr[i]);
                }
            }
        };
        markInPullDownArea(sv);
        $(".smart-onpulldown.smart-resize").addClass("hasSmartResize");
        $(".smart-onpulldown").addClass("smart-resize");
    }
    function clearMarkPullDownSmartViews() {
        $(".smart-onpulldown.smart-resize").not(".hasSmartResize").removeClass("smart-resize");
        $(".smart-onpulldown.hasSmartResize").removeClass("hasSmartResize");
        $(".smart-onpulldown").removeClass("smart-onpulldown");
    }
    function enablePullDown(sv) {
        var dragAxis = sv.attr('daxis');
        switch (dragAxis) {
            case "X":
            case "Y":
            case "None":
                break;
            default:
                sv.draggable("option", "axis", "y");
                break;
        }
        $smartView.find(".smAreaC.ui-droppable").droppable("option", "accept", ".noaccept");
        sv.addClass("on-pull-down");
    }
    function disablePullDown(sv) {
        var dragAxis = sv.attr('daxis');
        if (dragAxis === 'X') {
            sv.draggable("option", "axis", "x");
        } else if (dragAxis === 'Y') {
            sv.draggable("option", "axis", "y");
        } else if (dragAxis === 'None') {
            sv.draggable("option", "disabled", true);
        } else {
            sv.draggable("option", "axis", false);
        }
        sv.removeClass("on-pull-down");
        $smartView.find(".smAreaC.ui-droppable").droppable("option", "accept", ".esmartMargin");

    }
    function bindPullDownEvent(sv) {
        if (sv.hasClass("smartFixed")) {
            sv.find("ui-resizable-pulldown").remove();
        } else {
            if (sv.find("ui-resizable-pulldown").length == 0) {
                var pulldown = $("<div class='ui-resizable-pulldown lzprompt-bottom lz-hidden' data-lzclass='lzprompt-white' data-lztitle='上下拖动该按钮，可使该控件及下方的内容整体移动'><div class='icon mw-iconfont'>ꄈ</div></div>");
                pulldown.bind("mousedown.pulldown", function () {
                    enablePullDown(sv);
                }).bind("mouseup.pulldown", function () {
                    disablePullDown(sv);
                });

                sv.append(pulldown);
            }
        }
    }
    function getOtherSmartView(sv) {
        if (sv.hasClass("on-pull-down")) {
            return $(".smart-onpulldown");
        } else {
            return $('.smart-resize');
        }
    }
    function defaultDraggable(svs) {
        var smartBodyOffset;
        svs.draggable({
            cursor: "move",
            delay: 100,
            iframeFix: true,
            start: function (event, ui) {

                // AI小梦 这个状态下文本才能选中 禁用就不进来了 事件直接传播到父元素了，这么写会有问题
                //var aiAvtive = ui.helper.find('.ai-editcontent-disable');
                //if (aiAvtive.length > 0) {
                //    debugger;
                //    event.stopPropagation();
                //    return false;
                //}

                smartViewFactory.beforeModify({ desc: "拖动", controlType: ui.helper.attr('ctype'), ctrlId: ui.helper.attr('id') });
                if (!ui.helper.hasClass('smart-resize')) {
                    //clear other smartviews selected status
                    ui.helper.click();
                    // 拖拽关闭设置面板
                    if(smartViewFactory.storage.deviceMode === 'Pc') {
                        window.parent.nsmart.hideCtrlTab();
                    }
                }
                if (ui.helper.hasClass('smartFixed')) {
                    return false;
                }

                var $viwList = $(this).siblings('.smartAbs');
                var parentId = ui.helper.attr('pvid');
                sm_guides = $.map($viwList, computeGuidesForElement);
                if (typeof parentId === 'undefined' || parentId === '') {
                    sm_innerOffsetX = event.originalEvent.offsetX;
                    sm_innerOffsetY = event.originalEvent.offsetY;
                }
                var curId = ui.helper.attr('id');
                var wrapperView = smartViewFactory.getSmartView(curId, ui.helper.attr('ctype'));
                var locked = wrapperView.controlData.Css['smlocked'];
                if (locked == "1") {
                    return false;
                }
                smartBodyOffset = $("#smart-body").offset();
                wrapperView.startDrag(event, ui);
                markPullDownSmartViews(ui.helper);
                var $otherViews = getOtherSmartView(ui.helper);
                var orginInfo = getSmartViewMixAndMaxInfo($otherViews);
                $.data(ui.helper, "smMinMaxPos", orginInfo);
                $.data(ui.helper, "sm_DragView", wrapperView);
                $otherViews.each(function (i, e) {
                    var $e = $(e);
                    if ($e.attr('id') !== curId) {
                        var sui = {};
                        sui.helper = $e;
                        sui.originalPosition = {};
                        sui.originalPosition.left = $e.offset().left;
                        sui.originalPosition.top = $e.offset().top;
                        $.data(e, "smOriginalPos", sui.originalPosition);
                        sui.position = {};
                        sui.position.left = sui.originalPosition.left;
                        sui.position.top = sui.originalPosition.top;
                        var smView = smartViewFactory.getSmartViewWithJobj($e);
                        $e.data("sm_DragView", smView);
                        smView && smView.startDrag(event, sui);
                    }
                });
                return true;
            },
            drag: function (event, ui) {

                var $t = $(this);
                var parentId = ui.helper.attr('pvid');
                var ogrinInfo = $.data(ui.helper, "smMinMaxPos");
                // draging other select views
                var $otherViews = getOtherSmartView(ui.helper);
                var redirection = ui.position.left - ui.originalPosition.left;
                if (parentId === '' || typeof parentId === 'undefined') {
                    if (redirection < 0) {
                        var minLeft = 0;
                        if ($otherViews.length > 1) {
                            minLeft = parseInt(ui.originalPosition.left - ogrinInfo.min);
                        }
                        if (ui.position.left < minLeft) {
                            ui.position.left = minLeft;
                        }
                    } else {
                        var $parent = ui.helper.parent();
                        var pwidth = parseInt($parent.width());
                        var smWidth = parseInt(ui.helper.width());
                        var maxPos = ogrinInfo.max;
                        var extSetup = 0;
                        if ($otherViews.length > 1) {
                            extSetup = maxPos - (parseInt(ui.originalPosition.left) + smWidth);
                            if (extSetup < 0) {
                                extSetup = 0;
                            }
                        }
                        if (ui.position.left >= pwidth) {
                            ui.position.left = parseInt(pwidth);
                        }

                    }
                }
                //---------helper-start------------
                var chosenGuides = { top: { dist: MIN_DISTANCE + 1 }, left: { dist: MIN_DISTANCE + 1 } };

                var pos = { top: event.originalEvent.pageY - sm_innerOffsetY, left: event.originalEvent.pageX - sm_innerOffsetX };
                pos.pLeft = $t.position().left;
                pos.pTop = $t.position().top;
                var w = $t.outerWidth() - 1;
                var h = $t.outerHeight() - 1;
                var elemGuides = computeGuidesForElement(null, pos, w, h);
                $.each(sm_guides, function (i, guide) {
                    $.each(elemGuides, function (i, elemGuide) {
                        if (guide.type === elemGuide.type) {
                            var prop = guide.type === "h" ? "top" : "left";
                            var pProp = 'pTop';
                            if (prop === 'left') {
                                pProp = 'oLeft';
                            }
                            var d = Math.abs(elemGuide[prop] - guide[prop]);
                            if (d < chosenGuides[prop].dist) {
                                chosenGuides[prop].dist = d;
                                chosenGuides[prop].offset = elemGuide[prop] - pos[prop];
                                chosenGuides[prop].guide = guide;
                            }
                        }
                    });
                });
                if (chosenGuides.top.dist <= MIN_DISTANCE) {
                    $("#guide-h").css("top", chosenGuides.top.guide.top).show();
                    var newTop = chosenGuides.top.guide.pTop - chosenGuides.top.offset;
                    if (Math.abs(newTop - ui.position.top) <= MIN_DISTANCE) {
                        ui.position.top = newTop;
                    }
                }
                else {
                    $("#guide-h").hide();
                }

                if (chosenGuides.left.dist <= MIN_DISTANCE) {
                    $("#guide-v").css("left", chosenGuides.left.guide.left).show();
                    var newLeft = chosenGuides.left.guide.pLeft - chosenGuides.left.offset;
                    if (Math.abs(newLeft - ui.position.left) <= MIN_DISTANCE) {
                        ui.position.left = newLeft;
                    }
                }
                else {
                    $("#guide-v").hide();
                }
                //----------helper-end------------
                var curId = ui.helper.attr('id');
                var wrapperView = $.data(ui.helper, "sm_DragView");
                if (!wrapperView) {
                    wrapperView = smartViewFactory.getSmartView(curId, ui.helper.attr('ctype'));
                }
                var dstX = ui.position.left - ui.originalPosition.left;
                if (ui.helper.hasClass("on-pull-down")) {
                    dstX = 0;
                }
                var dstY = ui.position.top - ui.originalPosition.top;
                wrapperView.onDrag(event, ui);
                var csmartBodyOffset = $("#smart-body").offset();
                $otherViews.each(function (i, e) {
                    var $e = $(e);
                    if ($e.attr('id') !== curId) {
                        var sui = {};
                        sui.helper = $e;
                        sui.originalPosition = $.data(e, "smOriginalPos");
                        if (typeof sui.originalPosition !== 'undefined') {
                            sui.position = {};
                            var offsetfixed = csmartBodyOffset.top - smartBodyOffset.top;
                            sui.position.left = sui.originalPosition.left + dstX;
                            sui.position.top = sui.originalPosition.top + dstY + offsetfixed;
                            $e.offset({ left: sui.position.left, top: sui.position.top });
                            var smView = $e.data("sm_DragView");
                            if (!smView) {
                                smView = smartViewFactory.getSmartViewWithJobj($e);
                            }
                            smView && smView.onDrag(event, sui);
                        }
                    }
                });
                //-----显示控件拖动坐标-----
                var mixTop = wrapperView.$control.offset().top;
                var mixTopView = wrapperView;
                if ($otherViews.length > 0) {

                    showPosLayer(wrapperView);
                } else {
                    showPosLayer(wrapperView);
                }
                //-----/显示控件拖动坐标----

            },
            stop: function (event, ui) {
                var curId = ui.helper.attr('id');
                var wrapperView = $.data(ui.helper, "sm_DragView");
                if (!wrapperView) {
                    wrapperView = smartViewFactory.getSmartView(curId, ui.helper.attr('ctype'));
                }
                var dstX = ui.position.left - ui.originalPosition.left;
                if (ui.helper.hasClass("on-pull-down")) {
                    dstX = 0;
                }
                var dstY = ui.position.top - ui.originalPosition.top;

                wrapperView.stopDrag(event, ui);
                var $otherViews = getOtherSmartView(ui.helper);
                $otherViews.each(function (i, e) {
                    var $e = $(e);
                    if ($e.attr('id') !== curId) {
                        var sui = {};
                        sui.helper = $e;
                        sui.originalPosition = $.data(e, "smOriginalPos");
                        if (typeof sui.originalPosition !== 'undefined') {
                            sui.position = {};
                            sui.position.left = sui.originalPosition.left + dstX;
                            sui.position.top = sui.originalPosition.top + dstY;
                            var smView = $e.data("sm_DragView");
                            if (!smView) {
                                smView = smartViewFactory.getSmartViewWithJobj($e);
                            }
                            smView && smView.stopDrag(event, sui);
                            $e.removeData("sm_DragView");
                            $e.removeData("smOriginalPos");
                        }
                    }
                });
                $("#guide-v, #guide-h").hide();
                hidePosLayer();
                $.removeData(ui.helper, "smMinMaxPos");
                $.removeData(ui.helper, "sm_DragView");
                clearMarkPullDownSmartViews();
                disablePullDown(ui.helper);
            }
        });
    }
    defaultDraggable($smartView);
    $smartView.each(function (i, e) {
        var $e = $(e);
        var redirect = $e.attr('re-direction');
        var dragAxis = $e.attr('daxis');
        var pageId = $e.attr('cpid');
        var isContainer = $e.attr('isContainer') === "False" ? false : true;
        var resizeHandler = "n,e,s,w,ne,se,sw,nw";
        if (redirect === "x") {
            resizeHandler = "e,w";
        } else if (redirect === "y") {
            resizeHandler = "n,s";
        } else if (redirect === 'none') {
            resizeHandler = "";
        }
        if (dragAxis === 'X') {
            $e.draggable("option", "axis", "x");
        } else if (dragAxis === 'Y') {
            $e.draggable("option", "axis", "y");
        } else if (dragAxis === 'None') {
            $e.draggable("option", "disabled", true);
        }
        if (resizeHandler !== '') {
            $e.resizable({
                handles: resizeHandler,
                start: function (event, ui) {
                    smartViewFactory.beforeModify({ desc: "更改", controlType: ui.helper.attr('ctype'), ctrlId: ui.helper.attr('id'), suffix: "控件大小" });
                    var wrapperView = smartViewFactory.getSmartView(ui.helper.attr('id'), ui.helper.attr('ctype'));
                    $.data(ui.helper, "sm_ResizeView", wrapperView);
                    wrapperView.startResize(event, ui);
                },
                resize: function (event, ui) {
                    var wrapperView = $.data(ui.helper, "sm_ResizeView");
                    if (!wrapperView) {
                        wrapperView = smartViewFactory.getSmartView(ui.helper.attr('id'), ui.helper.attr('ctype'));
                    }
                    //显示控件尺寸
                    showSizeLayer(wrapperView);
                    wrapperView.onResize(event, ui);
                },
                stop: function (event, ui) {
                    var wrapperView = $.data(ui.helper, "sm_ResizeView");
                    if (!wrapperView) {
                        wrapperView = smartViewFactory.getSmartView(ui.helper.attr('id'), ui.helper.attr('ctype'));
                    }
                    wrapperView.stopResize(event, ui);
                    hidePosLayer();
                    $.removeData(ui.helper, "sm_ResizeView");
                }
            });
            if (redirect === 'none') {
                $e.resizable("option", "disabled", true);
            }
        }
        bindPullDownEvent($e, $smartView);
        if (isContainer) {
            $e.find('.smAreaC').droppable({
                iframeFix: true,
                greedy: true,
                tolerance: "fit",
                accept: ".esmartMargin",
                activeClass: "ui-state-hover",
                hoverClass: "ui-state-active",
                drop: function (event, ui) {
                    var pageId = ui.draggable.attr('cpid');
                    smartViewFactory.onContainerDroppable(pageId, event, ui);
                    return false;
                }
            }).click(function (event) {
                return smartViewFactory.bindContainerClick(pageId, event);
            });
            smartViewFactory.bindContainerResizable($e);

        } else {

        }
        $e.click(function (event) {
            var $this = $(this);
            var parentPage = $(window.parent.document.body);
            var targetEle = parentPage.find("[smartcontrolid='" + $this.attr('id') + "']>.u-layer-item").eq(0);
            //判断是否右侧点击过来的,避免循环跳转
            if (!targetEle.hasClass("current")) {
                window.parent.nsmart.reloadHierarchicalHtml();
                //重新加载树
                targetEle = parentPage.find("[smartcontrolid='" + $this.attr('id') + "']>.u-layer-item").eq(0);
                parentPage.find(".u-layer-item.current").removeClass("current")

                if (targetEle.length > 0) {
                    targetEle.addClass("current");
                    targetEle[0].scrollIntoView()
                }
            }

            var wv = smartViewFactory.getCurrentWaitAddView();
            if (wv != null) {
                smartViewFactory.recordLastClickSmPos($this);
                return true;
            }
            var ctype = $this.attr('ctype');
            if (ctype == 'text') {
                var dbclockVal = parseInt($this.data('inlinedbc'));
                if (dbclockVal > 0) {
                    $this.data('dbclick', 0);
                    return false;
                }
            }
            var isContainer = $this.attr('isContainer') === "False" ? false : true;
            var tareaId = $this.attr("tareaid");
            var areaId = '';
            if (typeof (tareaId) !== 'undefined' && tareaId !== '') {
                areaId = 'smv_' + tareaId;
            }

            if (!$this.hasClass('smart-resize')) {
                if ($this.children().first().hasClass('yibuFullScreen')) {
                    //deal mobile fullscreen
                    $this.addClass("smart-resize").children('.ui-resizable-handle').each(function () {
                        $c = $(this);
                        if ($c.hasClass('ui-resizable-n') || $c.hasClass('ui-resizable-s')) {
                            $c.show();
                        } else {
                            $c.hide();
                        }
                    });

                } else {
                    $this.addClass("smart-resize").children('.ui-resizable-handle').show();
                }
                if (!(event.ctrlKey || event.metaKey)) {
                    $this.siblings().removeClass("smart-resize").children('.ui-resizable-handle').hide();
                    $this.siblings().find('.esmartMargin').removeClass("smart-resize")
                        .children('.ui-resizable-handle').hide();
                    if (isContainer) {
                        $this.find('.esmartMargin').removeClass("smart-resize").children('.ui-resizable-handle').hide();
                    }
                } else {
                    //清除兄弟节点子节点的选择控件
                    $this.siblings().children().find('.esmartMargin').removeClass("smart-resize").children('.ui-resizable-handle').hide();
                }
            } else {
                if (!(event.ctrlKey || event.metaKey)) {
                    $this.siblings().removeClass("smart-resize").children('.ui-resizable-handle').hide();
                    $this.siblings().find('.esmartMargin').removeClass("smart-resize").children('.ui-resizable-handle').hide();
                    if (isContainer) {
                        $this.find('.esmartMargin').removeClass("smart-resize").children('.ui-resizable-handle').hide();
                    }
                }
            }
            var pvid = $this.attr('pvid');
            if (typeof pvid !== 'undefined' && pvid !== "") {
                clearOtherSelectedViews(pvid, $this.attr('id'), $this.attr('areaid'));
            }
            if (areaId !== 'smv_Main' && areaId !== '') {
                clearOtherAreaSelectedViews(areaId);
            } else {
                if (!(event.ctrlKey || event.metaKey)) {
                    $('#smv_Main').find('.esmartMargin').filter(function (index) {
                        return $(this).attr('id') !== $this.attr('id');
                    }).removeClass('smart-resize').children('.ui-resizable-handle').hide();
                }
            }
            if (!(event.ctrlKey || event.metaKey)) {
                var smartView = smartViewFactory.getSmartViewWithJobj($(this));
                var mousePos = {};
                mousePos.left = event.offsetX;
                mousePos.top = event.offsetY;
                showConFastPropPanel(smartView, mousePos);
                showSmDegreeLayer(smartView, mousePos);
                if (smartView.controlId != window.parent.nsmart.getCurrentEditControlId()) {
                    window.parent.nsmart.hideRightPanel();
                    if(smartViewFactory.storage.deviceMode === 'Pc'){
                        // 关闭设置面板拆分的面板
                        window.parent.nsmart.hideCtrlTab();
                    }
                }

                if (smartViewFactory.storage.isOemSimple) {
                    if ($('#sm_controlSetting #fs_ai').is(':visible')) {
                        $('#sm_controlSetting #fs_ai').click();
                    }
                } else {

                    if (smartViewFactory.storage.deviceMode === 'Pc' && $this.attr('ctype') !== 'text' && $this.attr('ctype') !== 'dialog' && !window.parent.nsmart.isShowCtrlTab() && !controlElDragging && !jumpShowCtrlTab) {
                        if ($('#sm_controlSetting').find('.editorsTage-btn[type="Data"]').length > 0) {
                            getTabHtml($this.attr('id'))
                            $('#sm_controlSetting .editorsTage-btn[type="Data"]').addClass('active');
                            // $this.attr('tabname', 'Data')
                            ConFastPropPanelActive('Data')
                        }
                    } 

                }

                
            }
            destoryAllCkeditor($this.attr('id'));
            var blurFun = window.parent.nsmart.blurAll;
            if (typeof blurFun === 'function') {
                blurFun();
            }

            // 清理其他控件的副作用
            onSelecteClearOtherSmartViewsEffect($this);
            jumpShowCtrlTab = false;

            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        //deal mobile control when set to fullscreen
        if ($e.children().first().hasClass('yibuFullScreen')) {
            $e.draggable("option", "axis", "y");
        }
        smartViewFactory.bindViewCustomEvents($e);
    });

    bindRotateEleMd($smartView.find('.handle-rotate'));
    bindContextMenu(selector);
}
function destoryAllCkeditor(curId) {
    if (CKEDITOR.currentInstance) {
        CKEDITOR.currentInstance.element.$.blur();
        CKEDITOR.currentInstance.focusManager.blur(true);
    }
}

// 清理smv_Main内其他控件的副作用
function onSelecteClearOtherSmartViewsEffect($this) {
    var siblings;
    if (!$this) {
        siblings = $("#smv_Main").children('[ctype="flexiblePanel"]');
    } else {
        siblings = $this.siblings('[ctype="flexiblePanel"]');
    }
    // 清理flexiblePanel控件的展开方法;
    siblings.each(function () {
        var smartView = smartViewFactory.getSmartViewWithJobj($(this));
        smartView.clearEffect();
    });
}

function clearOtherSelectedViews(pvid, curId, areaId) {
    var $pvid = $('#smv_' + pvid);
    $pvid.removeClass("smart-resize").children('.ui-resizable-handle').hide();
    $pvid.siblings().removeClass("smart-resize").children('.ui-resizable-handle').hide();
    $pvid.siblings().find('.esmartMargin').removeClass("smart-resize").children('.ui-resizable-handle').hide();
    if (typeof curId !== 'undefined' && curId !== '') {
        $pvid.find('.esmartMargin').each(function () {
            var $this = $(this);
            if ($this.attr('id') !== curId && $this.attr('areaid') !== areaId) {
                $this.removeClass("smart-resize").children('.ui-resizable-handle').hide();
            }
        });
    }
    var ppvid = $pvid.attr('pvid');
    if (typeof (ppvid) !== 'undefined' && ppvid !== '') {
        clearOtherSelectedViews(ppvid);
    }
}
function clearOtherAreaSelectedViews(curAreaId) {
    var areaIds = '';
    if (curAreaId === 'smv_Area0') {
        areaIds = '#smv_Area1,#smv_Area3';
    } else if (curAreaId === 'smv_Area1') {
        areaIds = '#smv_Area0,#smv_Area3';
    } else {
        areaIds = '#smv_Area0,#smv_Area1'
    }
    $(areaIds).find('.esmartMargin').removeClass('smart-resize').children('.ui-resizable-handle').hide();
    hideSmDegreeLayer();
    hideConFastPropPanel();
}
function IsRotateable(smView) {
    var ctype = smView.$control.attr('ctype');
    if (ctype === 'button' || ctype === 'line' || ctype === 'image') {
        return true;
    }
    return false;
}
function getSmDegree(angle) {
    var degree = Math.floor(angle * (360 / (2 * Math.PI)));
    if (Math.abs(degree) > 360) {
        degree = degree % 360;
    }
    if (degree < 0) {
        degree += 360;
    }
    if (degree === 360) {
        degree = 0;
    }
    return degree;
}
function showSmDegreeLayer(smView, mPos) {
    hideSmDegreeLayer();
    if (!IsRotateable(smView)) {
        return;
    }
    var $degree = smView.$control.find('.handle-rotate');
    var angle = parseFloat(smView.getCss('angle'));
    var degree = getSmDegree(angle);
    if (degree !== 0) {
        setSmElementRotate(smView.$control, angle);
        $degree.children('.handel-cancel-rotate').show();
    }
    $degree.data('last_angle', angle);
    $degree.children('.degree').html(Math.floor(degree) + '<sup>o</sup>');
    $degree.show();
}
function hideSmDegreeLayer() {
    $('.handle-rotate').hide().children('.handel-cancel-rotate').hide();
}
function setSmElementRotate($ele, degStr) {
    $ele.css('transform', degStr);
    $ele.css('-webkit-transform', degStr);
    $ele.css('-ms-transform', degStr);
    $ele.css('transform-origin', '50% 50%');
    $ele.css('-webkit-transform-origin', '50% 50%');
    $ele.css('-ms-transform-origin', '50% 50%');
}
var sm_Rotate = false, sm_R_Pos = {}, sm_R_Offset = {}, sm_Rotate_Timeout, $sm_RotateObj;
function bindRotateEleMd($sel) {
    $sel.children('.handel-cancel-rotate').click(function () {
        var $this = $(this);
        var degStr = 'rotate(0deg)';
        var retId = $this.parent().attr('retId');
        var smartView = smartViewFactory.getSmartViewWithOutType(retId);
        setSmElementRotate(smartView.$control, degStr);
        refreshRightPanelDegree(retId, 0);
        smartView.setCss('angle', 0, null);
        smartView.refreshCss();
        $this.siblings('.degree').html('0<sup>o</sup>');
        $this.hide();
        return false;
    });
    $sel.mousedown(function (e) {
        $sm_RotateObj = $(this);
        sm_R_Pos.x = e.pageX;
        sm_R_Pos.y = e.pageY;
        e.preventDefault();
        e.stopPropagation();
        var $this = $(this);
        var retId = $this.attr('retId');
        if (!sm_Rotate) {
            smartViewFactory.backupPage2Temp({ desc: "旋转", controlType: $("#" + retId).attr('ctype'), ctrlId: retId });
        }
        sm_Rotate = true;
        var $smView = $('#' + retId);
        sm_R_Offset.x = $smView.offset().left;
        sm_R_Offset.y = $smView.offset().top;
        return false;
    });
    $sel.mouseup(function (e) {
        e.preventDefault();
        e.stopPropagation();
        jumpShowCtrlTab = true;
        sm_Rotate = false;
        return false;
    });
}
function initSmRotateEvent() {

    bindRotateEleMd($('.handle-rotate'));
    $(document)
        .mousemove(function (e) {
            if (sm_Rotate) {
                smartViewFactory.pushTemp2History();
                var s_x = e.pageX,
                    s_y = e.pageY; // start rotate point
                if (s_x !== sm_R_Offset.x && s_y !== sm_R_Offset.y) { //start rotate
                    clearTimeout(sm_Rotate_Timeout);
                    sm_Rotate_Timeout = setTimeout(function () {
                        var $rotate = $sm_RotateObj;
                        var s_rad = Math.atan2(s_y - sm_R_Offset.y, s_x - sm_R_Offset.x); // current to origin
                        s_rad -= Math.atan2(sm_R_Pos.y - sm_R_Offset.y, sm_R_Pos.x - sm_R_Offset.x);
                        var lastAngle = parseFloat($rotate.data('last_angle') || 0);
                        var r = s_rad + lastAngle;
                        var degree = getSmDegree(r);
                        var degStr = 'rotate(' + degree + 'deg)';
                        var retId = $rotate.attr('retId');
                        var smartView = smartViewFactory.getSmartViewWithOutType(retId);
                        setSmElementRotate(smartView.$control, degStr);
                        refreshRightPanelDegree(retId, degree);
                        $rotate.children('.degree').html(Math.floor(degree) + '<sup>o</sup>');
                    }, 20);

                }
                // 旋转控件关闭设置面板
                hideConFastPropPanel();
                if(smartViewFactory.storage.deviceMode === 'Pc') {
                    window.parent.nsmart.hideCtrlTab();
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            return true;
        });
    $(document)
        .mouseup(function (e) {
            if (sm_Rotate) {
                smartViewFactory.storage.tempData = null;
                var $rotate = $sm_RotateObj;
                var lastAngle = parseFloat($rotate.data('last_angle') || 0);
                //var r = lastAngle;
                var s_x = e.pageX,
                    s_y = e.pageY; // start rotate point
                var s_rad = Math.atan2(s_y - sm_R_Offset.y, s_x - sm_R_Offset.x); // current to origin
                s_rad -= Math.atan2(sm_R_Pos.y - sm_R_Offset.y, sm_R_Pos.x - sm_R_Offset.x);
                var r = s_rad + lastAngle;
                var degree = getSmDegree(r);
                var smartView = smartViewFactory.getSmartViewWithOutType($rotate.attr('retId'));
                smartView.setCss('angle', r, null);
                smartView.refreshCss();
                var mousePos = {};
                mousePos.left = smartView.$control.offset().left;
                mousePos.top = smartView.$control.offset().top;
                showConFastPropPanel(smartView, mousePos);
                $rotate.data('last_angle', r);
                $('#degreeText').html(Math.floor(degree) + '<sup>o</sup>');
                e.preventDefault();
                e.stopPropagation();
                sm_Rotate = false;
                return false;
            }
            sm_Rotate = false;
            return true;
        });
}

function getFastPropPanelPostion(smView, mousePos, fpwidth, fpheight) {
    var coffset = smView.$control.offset();
    var viewType = smView.viewType;
    var angle = parseFloat(smView.getCss('angle'));
    var degree = getSmDegree(angle);
    // var poffsetX = coffset.left - 10;
    var poffsetX = coffset.left;
    if (poffsetX < 0) {
        poffsetX = 1;
    }
    var poffsetY = 0; var fpTop = 0; var fpLeft = 0;
    if (true || viewType === 'button') {
        poffsetY = coffset.top - 5;
        if (degree > 0 && degree < 168) {
            poffsetY = poffsetY - 30;
        }
        if (poffsetY < 0) {
            poffsetY = 1;
        }
        fpTop = poffsetY - fpheight > 0 ? poffsetY - fpheight - 10 : poffsetY + smView.$control.height() + 10;
    } else {
        poffsetY = coffset.top + mousePos.top;
        fpTop = poffsetY - fpheight > 0 ? poffsetY - fpheight : poffsetY;
    }
    if (viewType === 'fullpage') {
        //fix fullpage error
        fpTop = 0;
    } else {
        var $scroll = $('#mobileDesign_scrollbar');
        var scrollTop = $scroll.scrollTop();
        if ($scroll.length == 1) {
            //fix mobile fast prop not show bug
            if (fpTop > 480) {
                fpTop -= 480;
            }
        }
    }
    fpLeft = poffsetX + fpwidth > $(window).width() ? poffsetX - fpwidth : poffsetX;
    if (fpLeft < 0) {
        fpLeft = 1;
    }
    var pos = {};
    pos.left = fpLeft; pos.top = fpTop;
    return pos;
}

function generateTabs(pageId, controlId) {
    var $control = $('#' + controlId)
    var ctype = $control.attr('ctype');
    var cstyle = $control.attr('cstyle');
    var ccolor = $control.attr('ccolor');
    // 获取控件对应的Tabs配置
    const controlConfig = ctrlTabsMap[ctype];
    if (!controlConfig || !(styleConfig = controlConfig[cstyle]) || !(tabs = styleConfig.Tabs) || tabs.length === 0) {
        return;
    }
    const tabsList = $('#tabsContainer .tabs-list');
    tabsList.empty();
    tabs.forEach((tab, index) => {
        if(tab.Name !== 'Data' && smartViewFactory.storage.isOemSimple){
            return
        }
        
        const deleteButton = $('<a></a>')
            .addClass('editorsTage-btn')
            .attr('href', '#')
            .attr('type', tab.Name)
            .attr('data-tab-name', tab.Name)
            .attr('data-source', "ctrl-tab")
            .text(tab.Text)

        const tabItem = $('<li></li>')
            .addClass(`editorsTage-item tab${index}`)
            .append(deleteButton)
            .append($('<span class="line"></span>'))

        tabsList.append(tabItem);
    });

    // 可以添加额外的逻辑来处理Tabs的点击事件等
    tabsList.find('.editorsTage-btn').on('click', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $('#sm_controlSetting .editorsTage-btn').removeClass('active');
        
        var $target = $(event.target).closest('.editorsTage-btn');
        if($target.length) {
            $target.addClass("active");
        }
        const tabName = $(this).attr('data-tab-name');
        smartViewFactory.backupPage2Temp({ desc: "设置", controlType: ctype, suffix: "高级属性", ctrlId: controlId });
        // smartViewFactory.showCtrlTab(pageId, controlId, ctype, cstyle, ccolor, tabName, tabsHtml);
        if(ctype === 'text' && tabName === 'Data' && cstyle !== 'Style2'){
            var editConId = controlId;
            editConId = editConId.replace(/smv_/g, '');
            editConId = 'txtc_' + editConId;
            $('#' + editConId).dblclick()
            return
        }
        if(!window.parent.nsmart.isShowCtrlTab()) {
            getTabHtml(controlId, tabName)
        } else {
            window.parent.nsmart.changeCtrlTab(tabName)
        }
        $(`#${controlId}`).attr("tabName", tabName);
    });
}

function getTabHtml(controlId, tabName="Data"){
    var $control = $('#' + controlId)
    var ctype = $control.attr('ctype');
    var cstyle = $control.attr('cstyle');
    var ccolor = $control.attr('ccolor');
    // 获取控件对应的Tabs配置
    const controlConfig = ctrlTabsMap[ctype];
    if (!controlConfig || !(styleConfig = controlConfig[cstyle]) || !(tabs = styleConfig.Tabs) || tabs.length === 0) {
        return;
    }
    let tabsHtml = ''
    tabs.forEach((tab, index) => {
        tabsHtml += tab.Html
    });
    let tabHtml = styleConfig.MainHtml.replace('$Tabs_PlaceHolder$', tabsHtml);
    tabHtml = tabHtml.replace('$ControlId_PlaceHolder$', controlId);
    tabHtml = tabHtml.replace('$ControlColor_Placeholder$', ccolor);
    tabHtml = tabHtml.replace('$SetRightPanelHeight_PlaceHolder$', '');
    smartViewFactory.backupPage2Temp({ desc: "设置", controlType: ctype, suffix: "高级属性", ctrlId: controlId });
    var controlData = smartViewFactory.getSmartViewData(controlId);
    window.parent.nsmart.refreshCtrlTab(tabHtml, controlData, tabName, controlId)
    ConFastPropPanelActive(tabName)
    $control.attr("tabname", tabName);
}
/**
 * 显示快捷面板
 */
function showConFastPropPanel(smView, mousePos) {

    hideConFastPropPanel();

    // AI小梦
    if(window.parent.wzAiHelp && window.parent.wzAiHelp.controlId !== smView.controlId){

        window.parent.wzAiHelp.switchDialog({mode: smView.viewType, controlId: smView.controlId})
    }

    var $fpropPanel = $('#sm_controlSetting');
    $fpropPanel.attr('relcontrolid', smView.controlId);
    var text = cnsmart.controlResMap[smView.viewType];
    var cstyle = smView.$control.attr("cstyle");
    if (text && text[cstyle]) {
        text = text[cstyle];
    }
    var strecthLock = smView.controlData.Css['$lockbanner'];
    var locked = smView.controlData.Css['smlocked'];
    $('#sm_controlText').html('<div>' + text + '</div>');
    var pageId = smView.$control.attr('cpid');
    // 本次修改只针对pc端
    if(smartViewFactory.storage.deviceMode === 'Pc'){
        generateTabs(pageId, smView.controlId);
        if(smView.$control.attr('tabname')){
            $('#sm_controlSetting .editorsTage-btn[type="' + smView.$control.attr('tabname') + '"]').addClass('active');
        }
    }
    if (locked == "1") {
        smView.disableDrag();
    }
    if (smView.$control.hasClass('smlocked')) {
        $('#fs_controllocked').addClass('locked').removeClass('unlock').addClass('lock');
        $('#fs_controllockedText').html('解锁');
    } else {
        $('#fs_controllocked').addClass('locked').removeClass('lock').addClass('unlock');
        $('#fs_controllockedText').html('锁定');
    }
    if (smView.$control.children().first().hasClass('yibuFullScreen')) {
        $('#fs_controlstretch').removeClass('unstretch').addClass('stretch');
        $('#fs_controlstretchText').html('取消通栏');
    } else {
        $('#fs_controlstretch').removeClass('stretch').addClass('unstretch');
        $('#fs_controlstretchText').html('通栏');
    }
    if (strecthLock === 'locked') {
        $('#fs_controlstretch').parent().hide();
    } else {
        $('#fs_controlstretch').parent().show();
    }
    if (smView.viewType === 'image' || smView.viewType === 'logoimage') {
        $('#fs_imgxiuxiu').parent().show();
        $('#fs_changeimg').parent().show();
        $('#fs_toastUI').parent().show();

        var imgorgSize = $('#fs_originalsize');
        if (imgorgSize.length == 1) {
            imgorgSize.parent().show();
        }
    } else {
        $('#fs_imgxiuxiu').parent().hide();
        $('#fs_changeimg').parent().hide();
        $('#fs_toastUI').parent().hide();
        var imgorgSize = $('#fs_originalsize');
        if (imgorgSize.length == 1) {
            imgorgSize.parent().hide();
        }
    }
    if (smView.viewType === 'image' && cstyle === 'Style1') {
        $('#fs_imgmask').parent().show();
        $('#fs_imgradius').parent().show();
    } else {
        $('#fs_imgmask').parent().hide();
        $('#fs_imgradius').parent().hide();
    }
    if (smView.viewType === 'dialog') {
        $('#fs_controllocked').parent().hide();
    } else {
        $('#fs_controllocked').parent().show();
    }
    var isShowChangeStyle = window.parent.nsmart.conFastPropPanelOptions(smView.viewType);
    if (smView.viewType === 'text' || smView.viewType === 'video' || smView.viewType === 'dialog' || smView.viewType === 'code') {
        isShowChangeStyle = false;
    }
    if (isShowChangeStyle) {
        $('#fs_changestyle').parent().show();
    } else {
        $('#fs_changestyle').parent().hide();
    }

    // 隐藏帮助菜单 "help"
    if (cnsmart && cnsmart.controlHelpMap) {
        var helpLink = cnsmart.controlHelpMap[smView.viewType];
        if (helpLink) {
            $('#fs_controlhelp').parent().show();
        } else {
            $('#fs_controlhelp').parent().hide();
        }
    }

    $fpropPanel.show();
    var fpwidth = $fpropPanel.width();
    var fpheight = $fpropPanel.height();
    var pos = getFastPropPanelPostion(smView, mousePos, fpwidth, fpheight);
    $fpropPanel.offset({ left: pos.left, top: pos.top });
}

function ConFastPropPanelActive(tabName) {
    $('#sm_controlSetting .editorsTage-btn').removeClass('active');
    $(`#sm_controlSetting .editorsTage-btn[type=${tabName}]`).addClass('active');
}

/**
 * 隐藏快捷面板
 */
function hideConFastPropPanel() {
    var $fpropPanel = $('#sm_controlSetting');
    var controlId = $fpropPanel.attr('relcontrolid');
    if (controlId) {
        var smView = smartViewFactory.getSmartViewWithOutType(controlId);
        // AI小梦 增加onHideConFastPropPanel 方法 获取面板被关闭的动作
        smView && smView.onHideConFastPropPanel && smView.onHideConFastPropPanel();
    }

    // 该方法可能被多次调用 请空relcontrolid 阻止再次调用onHideConFastPropPanel
    $fpropPanel.attr('relcontrolid', '');
    $fpropPanel.hide();
    $('#sm_controlSetting .editorsTage-btn').removeClass('active');
    window.parent.wzAiHelp && window.parent.wzAiHelp.closeAsDialog()
    // 如果有ai生成图片遮罩（四张图）则移除，否则滑动页面时，取不到位置
    window.parent.wzAiHelp && window.parent.wzAiHelp.removeGeneratingImg();
}


function getPosLayerPosition(smView) {
    var coffset = smView.$control.offset();
    var poffsetX = coffset.left;
    if (poffsetX < 0) {
        poffsetX = 1;
    }
    var poffsetY = coffset.top - 26;
    if (poffsetY < 0) {
        poffsetY = 1;
    }
    if (poffsetX < 0) {
        poffsetX = 1;
    }
    var pos = {};
    pos.left = poffsetX; pos.top = poffsetY;
    return pos;
}
function showPosLayer(smView) {
    var $posLayer = $('#sm_controlPos');
    $posLayer.show();
    var pos = getPosLayerPosition(smView);
    var cpos = smView.$control.position();
    $posLayer.html('x:' + parseInt(cpos.left, 10) + ' y:' + parseInt(cpos.top, 10));
    $posLayer.offset({ left: pos.left, top: pos.top });
}
function showSizeLayer(smView) {
    var $posLayer = $('#sm_controlPos');
    $posLayer.show();
    var pos = getPosLayerPosition(smView);
    var w = parseInt(smView.$control.width());
    var h = parseInt(smView.$control.height());
    $posLayer.html('w:' + w + ' h:' + h);
    $posLayer.offset({ left: pos.left, top: pos.top });
}
function hidePosLayer() {
    $('#sm_controlPos').hide();
}
function bindSmartEnventsWithObj(smartView, flag) {
    var viewId = '#' + smartView.attr('id');
    var areaId = smartView.attr('areaid');
    if (areaId == '') {
        areaId = 'smv_Main';
    } else {
        areaId = 'smv_' + areaId;
    }
    bindSmartEnvents(viewId);
    if (flag) {
        smartView.siblings().removeClass("smart-resize").children('.ui-resizable-handle').hide();
        if (areaId != 'smv_Main') {
            $('#' + areaId).siblings().find('.esmartMargin').removeClass("smart-resize").children('.ui-resizable-handle').hide();
        }
    }
    bindContextMenu('#' + smartView.attr('id'));
}
function refreshRightPanelData(view) {
    var viewStyle = view.$control.attr('cstyle');
    var viewType = view.$control.attr('ctype');
    var color = view.$control.attr('ccolor');
    var panelInfo = getRightPanalInfo();
    if (typeof (panelInfo.style) !== "undefined" && panelInfo.style !== null) {
        if (view.controlId == panelInfo.controlId) {
            return;
        }
        else if (view.controlId != panelInfo.controlId && panelInfo.type == view.viewType && panelInfo.style == viewStyle) {
            window.parent.nsmart.refreshRightPanelData(view.controlId, viewStyle, color, view.controlData);
        } else {
            var pageId = view.$control.attr('cpid');
            smartViewFactory.editSmartView(pageId, view.controlId, viewType, viewStyle, ccolor);
        }
    }
}
function getRightPanalInfo() {
    return window.parent.nsmart.getRigthPanelInfo();
}
function refreshRightPanelPosition(controlId, data) {
    window.parent.nsmart.refreshRightPanelPosition(controlId, data);
}
function refreshRightPanelDegree(controlId, degree) {
    if (typeof window.parent.nsmart.refreshRightPanelDegree === 'function') {
        window.parent.nsmart.refreshRightPanelDegree(controlId, degree);
    }
}
function clearSelectViews() {
    $(".smart-resize").removeClass('smart-resize').find('.ui-resizable-handle').hide();
    hideConFastPropPanel();
    hideSmDegreeLayer();
    // 零号员工 清理选中
    window.parent.wzAiHelp && window.parent.wzAiHelp.fire('wz-clearselect-smartview')
    if(smartViewFactory && smartViewFactory.storage && smartViewFactory.storage.deviceMode === 'Pc') {
        window.parent.nsmart.hideCtrlTab();
    }
}
function sortItem(x, y) {
    return x.x - y.x;
}



cnsmart = {};
cnsmart.controlResMap = {
    "button": "按钮", "area": "区块", "audio": "音乐", "banner": "通栏", "code": "代码", "fullpage": "全屏", "image": "图片", "line": "线条", "list": "列表", "newslist": "新闻列表", "productlist": "产品列表", "filelist": "文件列表", "map": "地图", "nav": "导航", "slide": "多图轮播", "tab": "标签", "text": "文字", "video": "视频", "search": "搜索", "browserdevice": "设备切换", "languages": "多语言", "qrcode": "二维码"
};
cnsmart.ctlConflictMap = {};
cnsmart.ctlConflictMap["banner"] = ['slideset', 'fullpage'];
cnsmart.ctlConflictMap["area"] = ['banner', 'slideset', 'fullpage'];
cnsmart.ctlConflictMap["multinav"] = ['multinav', 'fullpageSlide', 'banner', 'slideset', 'fullpage'];
cnsmart.ruler = {
    x_clickTarget: '',
    y_clickTarget: '',
    curG: null,
    init: function () {
        cnsmart.ruler.mouseDown();
        cnsmart.ruler.mouseMove();
        cnsmart.ruler.mouseUp();
    },
    mouseDown: function () {
        $(".rulerGuide").mousedown(function (e) {
            if (e.eventNames === "onselectstart") {
                return;
            }
            cnsmart.ruler.x_clickTarget = 'guideHandle';
            cnsmart.ruler.y_clickTarget = 'guideHandle';
            e.stopPropagation();
            if (cnsmart.ruler.curG == undefined) {
                cnsmart.ruler.curG = $(this);
            }
        });
    },
    mouseMove: function () {
        $(document).mousemove(function (e) {
            if (cnsmart.ruler.curG != undefined) {
                if (cnsmart.ruler.curG.hasClass("G-X")) {
                    var x = e.pageX - document.body.scrollLeft;
                    var windowWidth = $(window).width();
                    if (x >= windowWidth - 13) {
                        x = windowWidth - 13;
                    }
                    if (x <= 25) {
                        x = 25;
                    }
                    cnsmart.ruler.curG.css("left", x);
                }
                if (cnsmart.ruler.curG.hasClass("G-Y")) {
                    var y = e.clientY; // e.pageY - document.body.scrollTop;
                    if (y <= 27) {
                        y = 27;
                    }
                    var windowHeight = $(window).height();
                    if (y >= windowHeight - 13) {
                        y = windowHeight - 13;
                    }
                    cnsmart.ruler.curG.css("top", y);
                }
            }
        });
    },
    mouseUp: function () {
        $(document).mouseup(function (e) {
            if (cnsmart.ruler.curG != undefined) {
                cnsmart.ruler.curG = undefined;
            }
            setTimeout(function () {
                cnsmart.ruler.x_clickTarget = '';
                cnsmart.ruler.y_clickTarget = '';
            }, 500);
        });

    },
    getPostion: function (e) {
        var x = this.getX(e);
        var y = this.getY(e);
        var pos = {
        };
        pos.x = x;
        pos.y = y;
        return pos;
    },
    getX: function (e) {
        e = e || window.event;

        return e.pageX - 4 - document.body.scrollLeft || e.clientX;
    },
    getY: function (e) {
        e = e || window.event;
        return e.clientY; // e.pageY - document.body.scrollTop || 
    },
    xHelpLineRemove: function () {
        //双击消失
        $('#x_line_wrap').find('.guideHandle').each(function (index, item) {
            $($(item)[0]).unbind('click').bind('click', function (e) {
                cnsmart.ruler.x_clickTarget = 'guideHandle';
                setTimeout(function () { cnsmart.ruler.x_clickTarget = '' }, 250);
            });


            $($(item)[0]).unbind('dblclick').bind('dblclick', function (e) {
                e.stopPropagation();
                $(this).parent().remove();
                cnsmart.ruler.x_clickTarget = '';
                return false;
            });
        });
    },
    yHelpLineRemove: function () {
        //双击消失
        $('#y_line_wrap').find('.guideHandle').each(function (index, item) {
            $($(item)[0]).unbind('click').bind('click', function (e) {
                cnsmart.ruler.y_clickTarget = 'guideHandle';
                setTimeout(function () { cnsmart.ruler.y_clickTarget = '' }, 250);
            });
            $($(item)[0]).unbind('dblclick').bind('dblclick', function (e) {
                e.stopPropagation();
                $(this).parent().remove();
                this.y_clickTarget = '';
                return false;
            });
        });
    },
    bindXHelpLineEvent: function () {
        $('#x_line_number').unbind('click').bind('click', function (e) {
            if ('guideHandle' === cnsmart.ruler.x_clickTarget) {
                return false;
            }
            var x = cnsmart.ruler.getX(e);
            if (x <= 25) {
                x = 25;
            }
            var html = $('#xhelpline_tmp').html();
            var left = x + 'px';
            html = html.replace('471px', left);
            $('#x_line_wrap').append(html);
            cnsmart.ruler.x_clickTarget = '';
            //重新绑定鼠标事件
            cnsmart.ruler.init();
            //X轴双击消失
            cnsmart.ruler.xHelpLineRemove();
        });
    },
    bindYHelpLineEvent: function () {
        $('#y_line_number').unbind('click').bind('click', function (e) {
            if ('guideHandle' == cnsmart.ruler.y_clickTarget) {
                return false;
            }
            var y = cnsmart.ruler.getY(e);
            if (y <= 27) {
                y = 27;
            }
            var html = $('#yhelpline_tmp').html();
            var top = y + 'px';
            html = html.replace('471px', top);
            $('#y_line_wrap').append(html);
            cnsmart.ruler.y_clickTarget = '';
            //重新绑定鼠标事件
            cnsmart.ruler.init();
            //X轴双击消失
            cnsmart.ruler.yHelpLineRemove();
        });
    },
    showRuler: function () {
        $('#x_line_wraper').show();
        $('#y_line_wraper').show();
    },
    hideRuler: function () {
        $('#x_line_wraper').hide();
        $('#y_line_wraper').hide();
    }
}
cnsmart.selectBox = {
    isSelectBox: false,
    selectDiv: null,
    container: null,
    sX: 0,
    sY: 0,
    isHit: false,
    isDragged: false,
    init: function () {
        var t = this;
        $('.smvContainer')
            .mousedown(function (e) {
                cnsmart.selectBox.isDragged = false
                t.mouseDown(e, this);
            }).mousemove(function (ev) {
                cnsmart.selectBox.isDragged = true
                if (cnsmart.selectBox.isSelectBox) {
                    var d = ev.target === this;
                    var $target = $(ev.target);
                    var nsX = parseInt($target.position().left) + ev.offsetX;
                    var nsY = parseInt($target.position().top) + ev.offsetY;
                    cnsmart.selectBox.selectDiv
                        .css({
                            'left': Math.min(cnsmart.selectBox.sX, nsX) + 'px',
                            'top': Math.min(cnsmart.selectBox.sY, nsY) + 'px',
                            'width': Math.abs(nsX - cnsmart.selectBox.sX) + 'px',
                            'height': Math.abs(nsY - cnsmart.selectBox.sY) + 'px'
                        })
                        .show();

                    // 清理其他控件的副作用
                    var diffX = Math.abs(nsX - cnsmart.selectBox.sX);
                    var diffY = Math.abs(nsY - cnsmart.selectBox.sY);
                    if (diffX > 10 || diffY > 10) {
                        onSelecteClearOtherSmartViewsEffect();
                    }
                    // 清理其他控件的副作用 End

                }
            }).mouseup(function (eu) {
                clearTimeout(t.mouseDownFlag);
                $('body').enableSelection();
                t.mouseUp(eu, this);

            });
        $(document).mouseup(function (eu) {
            t.mouseUp(eu, this);
        });
    },
    mouseDown: function (e, target) {
        controlElDragging = true
        if (e.eventNames === "onselectstart" || e.which !== 1) {
            return;
        }
        var vw = smartViewFactory.getCurrentWaitAddView();
        if (vw == null && !cnsmart.selectBox.isSelectBox && e.target.id === target.id) {
            $('body').disableSelection();
            cnsmart.selectBox.mouseDownFlag = setTimeout(function () {
                cnsmart.selectBox.isSelectBox = true;
                cnsmart.selectBox.selectDiv = $('#selectBox');
                var sX = cnsmart.selectBox.sX = e.offsetX;
                var sY = cnsmart.selectBox.sY = e.offsetY;
                var $this = $(target);
                cnsmart.selectBox.container = $this;
                cnsmart.selectBox.selectDiv.appendTo($this);
                //阻止误触发mousemove div
                $('#selectBoxLayer').show().appendTo($this);
            }, 200);
        }
    },
    mouseUp: function (eu, target) {
        controlElDragging = false
        if (cnsmart.selectBox.isSelectBox) {
            var esX = cnsmart.selectBox.selectDiv.position().left;
            var esY = cnsmart.selectBox.selectDiv.position().top;
            var width = cnsmart.selectBox.selectDiv.width();
            var height = cnsmart.selectBox.selectDiv.height();
            var ex = esX + width, ey = esY + height;
            cnsmart.selectBox.selectDiv.hide()
                .css({ 'left': '0px', 'top': '0px', 'width': '0px', 'height': '0px' });
            var $smartViews = cnsmart.selectBox.container.children('.esmartMargin');
            $smartViews.each(function () {
                var $view = $(this);
                var pvid = $view.attr('pvid');
                if (pvid === '') {
                    var vsX = $view.position().left, vsY = $view.position().top;
                    var veX = vsX + $view.width(), veY = $view.height() + vsY;
                    if (vsX >= esX - 5 && veX <= ex + 5 && vsY >= esY - 5 && veY <= ey + 5) {
                        $view.addClass("smart-resize").children('.ui-resizable-handle').show();
                        cnsmart.selectBox.isHit = true;
                    }
                }
            });
            var smartBody = $('#smart-body');
            cnsmart.selectBox.selectDiv.appendTo(smartBody);
            $('#selectBoxLayer').hide().appendTo(smartBody);

        }
        cnsmart.selectBox.sX = cnsmart.selectBox.sY = 0;
        cnsmart.selectBox.container = null;
        cnsmart.selectBox.isSelectBox = false;

    }
}
var AreaInfo = Class.extend({
    init: function (id, areaData) {
        this.areaData = areaData;
        this.controlId = id;
        this.$area = $('#' + id);
    },
    height: function () {
        return this.$area.height();
    },
    refreshArea: function () {
        var strData = JSON.stringify(this.areaData);
        $('#data_' + this.controlId).html(strData);
        this.$area.addClass('avc');

        //var flexiblePanelView = $("[ctype='flexiblePanel']");
        //flexiblePanelView.each(function () {
        //    debugger
        //});
    },
    changeHeight: function (newH, nr) {
        // ??
        if (this.$area.hasClass("expandFlag")) {
            var h = this.$area.height();
            if (h === newH) return;
            this.$area.attr("hish", newH);
        };
        this.$area.height(newH);
        // this.$area.css("min-height", newH)
        this.areaData.height = newH;
        //fix 页面设置线不到底的bug
        $('slinebottom_smv_Main').attr('style', '');
        if (nr) {
            this.refreshArea();
            if (typeof smartViewFactory.afterAreaHeightChanged === 'function') {
                var $area = this.$area;
                setTimeout(function () {
                    smartViewFactory.afterAreaHeightChanged($area);
                }, 20);
            }
        }
    },
    changeWidth: function (w) {
        this.areaData['width'] = w;
        this.$area.css({
            "width": w
        });
        this.refreshArea();
    },
    getCurrentArea: function () {
        var $ap = this.$area.parent();
        if (this.controlId === 'smv_AreaMainWrapper') {
            $ap = this.$area;
        } else if (this.controlId === 'smv_MainContent') {
            $ap = $('#' + this.$area.attr('rel'));
        }
        //fix mobile set background error bug
        if ($ap.attr('id') == 'smart-body') {
            $ap = this.$area;
        }
        return $ap;
    },
    changeBackgroundColor: function (c) {
        var $ap = this.getCurrentArea();
        $ap.css({
            "background-color": c,
            "background-image": this.areaData["background-image"],
            "background-size": this.areaData["background-size"],
            "background-position": this.areaData["background-position"],
            "background-repeat": this.areaData["background-repeat"]
        });
        this.areaData['background-color'] = c;
        this.refreshArea();
    },
    changeBackgroundImage: function (i) {
        var $ap = this.getCurrentArea();
        $ap.css({
            "background-image": i,
            "background-color": this.areaData["background-color"],
            "background-size": this.areaData["background-size"],
            "background-position": this.areaData["background-position"],
            "background-repeat": this.areaData["background-repeat"]
        });
        this.areaData['background-image'] = i;
        this.refreshArea();
    },
    changeBackgroundSize: function (i) {
        var $ap = this.getCurrentArea();
        $ap.css({
            "background-size": i,
            "background-image": this.areaData["background-image"],
            "background-color": this.areaData["background-color"],
            "background-position": this.areaData["background-position"],
            "background-repeat": this.areaData["background-repeat"]
        });
        this.areaData['background-size'] = i;
        this.refreshArea();
    },
    changeBackgroundRepeat: function (r) {
        var $ap = this.getCurrentArea();
        $ap.css({
            "background-repeat": r,
            "background-size": this.areaData["background-size"],
            "background-image": this.areaData["background-image"],
            "background-color": this.areaData["background-color"],
            "background-position": this.areaData["background-position"]
        });
        this.areaData['background-repeat'] = r;
        this.refreshArea();
    },
    changeBackgroundPosition: function (p) {
        var $ap = this.getCurrentArea();
        $ap.css({
            "background-position": p,
            "background-size": this.areaData["background-size"],
            "background-image": this.areaData["background-image"],
            "background-color": this.areaData["background-color"],
            "background-repeat": this.areaData["background-repeat"]
        });
        this.areaData['background-position'] = p;
        this.refreshArea();
    },
    changeBackgroundGraident: function (k, v) {
        this.areaData[k] = v;
        var t = v;
        var b = v;
        if (k === 'background-gradient-bottom') {
            t = this.areaData['background-gradient-top'];
        } else {
            b = this.areaData['background-gradient-bottom'];
        }
        var bn = this.getBrowser();
        var $ap = this.getCurrentArea();
        if (v !== 'none') {
            if (bn.n === 'Firefox') {
                $ap.css({
                    'background': '-webkit-gradient(linear, left top, left bottom, from(' + t + '), to(' + v + '))'
                });
            } else if (bn.n === 'Opera') {
                $ap.css({
                    'background': '-o-linear-gradient(top, ' + t + ', ' + b + ')'
                });
            } else if (bn.n === 'IE') {
                $ap.css({
                    'background': '-ms-linear-gradient(top, ' + t + ', ' + b + ')'
                });
            } else {
                $ap.css({
                    'background': '-webkit-gradient(linear, left top, left bottom, from(' + t + '), to(' + v + '))'
                });
            }
        } else {
            $ap.css({
                'background': 'none'
            });
        }

        this.refreshArea();
    },
    changeBackgroundScroll: function (v) {
        var $ap = this.getCurrentArea();
        $ap.attr('bgscroll', v);
        this.areaData['background-scroll'] = v;
        this.refreshArea();
    },
    getBrowser: function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { n: 'IE', v: tem[1] || '' }
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) {
                var d = tem.slice(1).join(' ');
                var res = {};
                res.n = d[0].replace('OPR', 'Opera');
                res.v = d[2] ? d[2] : '?';
                return res;
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        var d = {};
        d.n = M[0];
        d.v = M[1];
        return d;
    },
    changeCss: function (key, data) {
        if (key === 'background-color') {
            this.changeBackgroundColor(data);
        } else if (key === 'background-image') {
            this.changeBackgroundImage(data);
        } else if (key === 'background-size') {
            this.changeBackgroundSize(data);
        }
        else if (key === 'background-position') {
            this.changeBackgroundPosition(data);
        } else if (key === 'background-repeat') {
            this.changeBackgroundRepeat(data);
        }
        else if (key === 'width') {
            this.changeWidth(data);
        } else if (key === 'background-gradient-top' || key === 'background-gradient-bottom') {
            this.changeBackgroundGraident(key, data);
        } else if (key === 'background-scroll') {
            this.changeBackgroundScroll(data);
        }
        else {
            var $ap = this.getCurrentArea();
            this.areaData[key] = data;
            this.refreshArea();
        }
    },
    getControlsMaxTop: function () {
        var maxTop = 0;
        var that = this;
        this.$area.children('.esmartMargin').each(function () {
            var $this = $(this);
            if (!$this.hasClass('smart-deleted') && !$this.hasClass('smartFixed') && $this.attr('ctype') != 'dialog') {
                var ctop = $this.position().top + $this.height();
                if (ctop > maxTop) {
                    maxTop = ctop;
                }
            }
        });
        return maxTop;
    }
});

var SmartViewBase = Class.extend({
    init: function (id, viewType, controlData) {
        this.viewType = viewType;
        this.controlData = controlData;
        this.controlId = id;
        this.$control = $('#' + id);
        this.minW = 0;
        this.minH = 0;
        if (controlData.Css) {
            if (controlData.Css.$minW) {
                var minW = parseInt(controlData.Css.$minW);
                if (!isNaN(minW)) {
                    this.minW = minW;
                }
            }
            if (controlData.Css.$minH) {
                var minH = parseInt(controlData.Css.$minH);
                if (!isNaN(minH)) {
                    this.minH = minH;
                }
            }
        }
    },
    createControl: function () {
        createSmartView(this.viewType, this.onCreateSuccess, this.onCreateFailed);
    },
    startDrag: function (event, ui) {
        hideConFastPropPanel();
        hideSmDegreeLayer();
        if (smartViewFactory.storage.deviceMode === 'Pc') {
            // 关闭设置面板拆分的面板
            window.parent.nsmart.hideCtrlTab();
        }
        var zindex = parseInt(this.$control.css('z-index'));
        this.$control.attr('oZIndex', zindex).css({ 'z-index': 9999 });
        if (this.$control.hasClass('smartFixed')) {
            return false;
        }
    },
    onDrag: function (event, ui) {
        var newH = parseInt(this.$control.position().top + this.$control.height());
        var areaId = this.$control.attr('areaid');
        var pvid = this.$control.attr('pvid');
        var isNeedChangeArea = true;
        if (typeof (pvid) != 'undefined' && pvid !== '') {
            isNeedChangeArea = false;
        }
        if (isNeedChangeArea) {
            this.changeAreaH(areaId, newH, false);
        }
    },
    onChangePosition: function (saveAreaHeight) {
        var newH = parseInt(this.$control.position().top + this.$control.height());
        var areaId = this.$control.attr('areaid');
        var pvid = this.$control.attr('pvid');
        var isNeedChangeArea = true;
        if (typeof (pvid) != 'undefined' && pvid !== '') {
            isNeedChangeArea = false;
        }
        if (isNeedChangeArea) {
            this.changeAreaH(areaId, newH, saveAreaHeight);
        }
    },
    stopDrag: function (event, ui) {
        ui.helper.css({ 'z-index': ui.helper.attr('oZindex') });
        var pvid = ui.helper.attr('pvid');
        var newH = parseInt(this.$control.position().top + this.$control.height());
        var areaId = this.$control.attr('areaid');
        //refresh AreaHeight
        if (!(typeof (pvid) != 'undefined' && pvid !== '')) {
            this.changeAreaH(areaId, newH, true);
        }
        var flag = ui.helper.attr('drpc');
        if (flag == '1') {
            ui.helper.attr('drpc', '');
            return;
        }
        var top = parseInt(ui.helper.position().top, 10);
        //在内容区域内，top不允许负数，但是在父容器里面可以
        if (top < 0 && pvid === '') {
            top = 0;
            ui.helper.css({
                'top': top
            });
        }
        var left = parseInt(ui.helper.position().left, 10);
        if (pvid != '') {
            var pareaId = ui.helper.attr('areaid');
            var $parent = $('#smv_' + pvid).find('#smc_' + pareaId);
            var $parentHeight = $parent.height();
            if (top > $parentHeight && $parentHeight > 0) {
                top = parseInt(ui.originalPosition.top, 10);
                left = parseInt(ui.originalPosition.left, 10);
                ui.helper.css({
                    'top': top, 'left': left
                });
            }
        }
        this.setCss('offsetX', left, null);
        this.setCss('offsetY', top, null);
        this.refreshCss();
        refreshRightPanelPosition(this.controlId, this.controlData);
        var mousePos = {
        };
        mousePos.left = event.offsetX;
        mousePos.top = event.offsetY;
        showConFastPropPanel(this, mousePos);
        showSmDegreeLayer(this, mousePos);
        // if (smartViewFactory.storage.deviceMode === 'Pc') {
        //     let nowCtype = this.$control.attr('ctype')
        //     let $pcontrolType = window.parent.document.getElementById('pcontrolType')
        //     let ctrlTabCtype = $pcontrolType && $pcontrolType.value
        //     if (this.$control.attr('tabname') && nowCtype === ctrlTabCtype) {
        //         if (this.$control.attr('tabname') === 'AI') return;
        //         window.parent.nsmart.showCtrlTab(this.$control.attr('tabname'))
        //     }
        // }
    },
    startResize: function (event, ui) {
        this.$control.resizable("option", "minHeight", this.minH);
        this.$control.resizable("option", "minWidth", this.minW);
        hideConFastPropPanel();
        hideSmDegreeLayer();

        var hasCliped = this.controlData.Data.hasCliped;
        if (hasCliped === 'true') {
            // 如果进行过遮罩，预存容器resize前的尺寸
            var $control = ui.helper;
            var $img = $control.find('img');
            var clipedData = JSON.parse(decodeURIComponent(this.controlData.Data.ClipPictureData));
            clipedData.controlHH = ui.size.height;
            clipedData.controlWW = ui.size.width;
            clipedData.masky = parseFloat($img.css('marginTop'));
            clipedData.maskx = parseFloat($img.css('marginLeft'));
            clipedData.imgW = $img.width();
            clipedData.imgH = $img.height();
            clipedData.scale = $img.width() / ui.size.width;
            clipedData.controlScale = ui.size.width / ui.size.height;
            this.controlData.Data.ClipPictureData = clipedData;
            ////$("#data_" + ui.helper.attr('id')).text(JSON.stringify(this.controlData));
        }
        // 调整大小  关闭设置面板
        if(smartViewFactory.storage.deviceMode === 'Pc') {
            window.parent.nsmart.hideCtrlTab();
        }
    },
    onResize: function (event, ui) {
        var newH = parseInt(this.$control.position().top + this.$control.height());
        //trigger change area height when control not in container 
        var parentId = this.$control.attr('pvid');
        if (parentId === '') {
            var areaId = this.$control.attr('areaid');
            this.changeAreaH(areaId, newH, false);
        }
        // 如果进行过遮罩，重新计算图片的样式
        var hasCliped = this.controlData.Data.hasCliped;
        if (hasCliped === 'true') {
            var clipedData = this.controlData.Data.ClipPictureData;
            var controlHH = clipedData.controlHH;
            var controlWW = clipedData.controlWW;
            var imgH = clipedData.imgH;
            var imgW = clipedData.imgW;
            var maskx = clipedData.maskx;
            var masky = clipedData.masky;

            var $control = ui.helper;
            var $img = $control.find('img');
            var $imgBox = $control.find('.image-clip-wrap');
            var controlW = ui.size.width;
            var controlH = ui.size.height;
            var scaleW = controlW / controlWW;
            var scaleH = controlH / controlHH;
            var fillType = $imgBox.attr('data-filltype');

            $img.removeClass('imgCliped');

            if (fillType === '0') {
                $img.css({
                    height: parseInt(imgH * scaleW),
                    width: parseInt(imgW * scaleW),
                    marginTop: masky * scaleW,
                    marginLeft: maskx * scaleW
                });
                $control.css({
                    width: ui.size.width,
                    height: ui.size.width / clipedData.controlScale
                })
            } else if (fillType === '2') {
                $img.css({
                    height: parseInt(imgH * scaleH),
                    width: parseInt(imgW * scaleW),
                    marginTop: masky * scaleH,
                    marginLeft: maskx * scaleW
                });
            } else if (fillType === '1') {
                if (imgW + maskx >= controlW && imgH + masky >= controlH) {
                    $img.css({
                        width: imgW,
                        height: imgH,
                        marginTop: masky,
                        marginLeft: maskx
                    })
                } else {
                    var r = 1;
                    if (controlHH / (imgH + (masky >= 0 ? masky : (-masky))) > 1 && controlWW / (imgW + (maskx >= 0 ? maskx : (-maskx))) > 1) {
                        r = Math.max(scaleH, scaleW, 1);
                    } else {
                        if (maskx + imgW < controlWW) {
                            scaleW = (controlW - controlWW + imgW) / imgW;
                        } else {
                            scaleW = (controlW - maskx) / imgW;
                        }
                        if (masky + imgH < controlHH) {
                            scaleH = (controlH - controlHH + imgH) / imgH;
                        } else {
                            scaleH = (controlH - masky) / imgH;
                        }

                        r = Math.max(scaleW, scaleH, 1);
                    }
                    $img.css({
                        height: imgH * r,
                        //height: Math.max(hh, controlW * imgH / imgW),
                        width: imgW * r,
                        marginTop: masky * r,// * scaleH ,
                        marginLeft: maskx * r
                    });
                }
            }
            $imgBox.css("width", "100%").css("height", "100%");
        }
    },
    stopResize: function (event, ui) {
        var borderLRWidth = 0;// parseInt(ui.helper.children().css('border-left-width')) + parseInt(ui.helper.children().css('border-right-width'));
        var borderTBWidth = 0;// parseInt(ui.helper.children().css('border-top-width')) + parseInt(ui.helper.children().css('border-bottom-width'));
        var redrection = this.$control.attr('re-direction');
        var hasCliped = this.controlData.Data.hasCliped;
        if (hasCliped === 'true') {
            var $controlData = this.controlData;
            var $img = ui.helper.find('img');
            var clipedData = $controlData.Data.ClipPictureData;
            $controlData.Data.ClipPictureData = JSON.stringify({
                maskw: $img.width(),
                maskh: $img.height(),
                maskx: parseFloat($img.css('marginLeft')),
                masky: parseFloat($img.css('marginTop')),
                pbarx: clipedData.pbarx
            });
            $controlData.Css['$img-width'] = $img.width() + 'px';
            $controlData.Css['$img-height'] = $img.height() + 'px';
            $controlData.Css['$img-marginTop'] = $img.css('marginTop');
            $controlData.Css['$img-marginLeft'] = $img.css('marginLeft');
            $("#data_" + ui.helper.attr('id')).text(JSON.stringify($controlData));
        }
        var $controlW = this.$control.width();
        var $controlH = this.$control.height();
        if (redrection !== 'y') {
            this.setCss('width', parseInt($controlW, 10), null);
            this.setDataV2('width', parseInt($controlW, 10), false, null);
        }
        // 新增条件 redrection=x时，不调整height
        if (redrection !== 'x') {
            this.setCss('height', parseInt($controlH, 10), null);
            this.setDataV2('height', parseInt($controlH, 10), false, null);
        }
        this.setCss('offsetX', parseInt(ui.position.left), null);
        this.setCss('offsetY', parseInt(ui.position.top), null);

        var newH = ui.position.top + $controlH;
        var areaId = this.$control.attr('areaid');
        var parentId = this.$control.attr('pvid');
        if (parentId === '') {
            this.changeAreaH(areaId, newH, true);
        }
        this.refreshCss();
        refreshRightPanelPosition(this.controlId, this.controlData);
        var mousePos = {};
        mousePos.left = event.offsetX;
        mousePos.top = event.offsetY;
        showConFastPropPanel(this, mousePos);
        showSmDegreeLayer(this, mousePos);
    },
    fixControlPosition: function (p) {

    },
    bindCustomEvents: function () {

    },
    setLeft: function (aX, notRefresh) {
        this.$control.css("left", aX + "px");
        this.setCss('offsetX', aX, null);
        if (!notRefresh) {
            this.refreshCss();
        }
    },
    setTop: function (aY) {
        this.$control.css("top", aY + "px");
        this.setCss('offsetY', aY, null);
        this.refreshCss();
    },
    setPosition: function (x, y) {
        this.$control.css("left", x + "px");
        this.setCss('offsetX', x, null);
        this.$control.css("top", y + "px");
        this.setCss('offsetY', y, null);
        this.refreshCss();
    },
    setWidth: function (width) {
        var $img = $('#img_' + this.controlId);
        var $control = $('#' + this.controlId);
        var $imgBox = $control.find('.image-clip-wrap');
        var ctype = $control.attr('ctype');
        var cstyle = $control.attr('cstyle');
        var fillType = $imgBox.attr('data-filltype');
        var $controlData = JSON.parse($("#data_" + this.controlId).text());
        var hasCliped = $controlData.Data.hasCliped;
        if (hasCliped === 'true') {
            var scale = parseFloat(width / $control.width());
            var clipViewImgIDX = parseFloat($img.css('marginLeft'));
            var clipViewImgIDY = parseFloat($img.css('marginTop'));
            var clipViewImgIDW = $img.width();
            var clipViewImgIDH = $img.height();
            if (fillType == '2') {
                clipViewImgIDW *= scale;
                clipViewImgIDX *= scale;
            } else if (fillType == '0') {
                clipViewImgIDW *= scale;
                clipViewImgIDH *= scale;
                clipViewImgIDX *= scale;
                clipViewImgIDY *= scale;
                var newH = parseInt($control.height() * scale);
                $control.height(newH);
                $imgBox.height(newH);
                $controlData.Css['$img-height'] = clipViewImgIDH + 'px';
                $controlData.Css.height = newH;
                $controlData.Data.height = newH;
                $('#smHeight', parent.document).val(newH);
            } else if (fillType == '1') {
                if (scale > 1 && clipViewImgIDW + clipViewImgIDX < width) {
                    clipViewImgIDW *= scale;
                    clipViewImgIDH *= scale;
                    var newH = parseInt($control.height() * scale);
                    $controlData.Css['$img-height'] = clipViewImgIDH + 'px';
                }
            }
            $controlData.Data.ClipPictureData = JSON.stringify({
                maskw: clipViewImgIDW,
                maskh: clipViewImgIDH,
                maskx: clipViewImgIDX,
                masky: clipViewImgIDY
            });
            $control.width(width).addClass("smc");
            $imgBox.css({
                width: '100%',
                height: '100%'
            });
            $img.css({
                width: clipViewImgIDW,
                height: clipViewImgIDH,
                marginTop: clipViewImgIDY,
                marginLeft: clipViewImgIDX
            }).removeClass('imgCliped');
            $controlData.Css['$img-width'] = clipViewImgIDW + 'px';
            $controlData.Css.width = width;
            $controlData.Data.width = width;
            $("#data_" + this.controlId).text(JSON.stringify($controlData));

            smartViewFactory.pushTemp2History(this.controlId);

            var areaId = this.$control.attr('tareaid');
            var pvid = this.$control.attr('pvid');
            var newH = parseInt(this.$control.position().top + parseInt(this.$control.height(), 10), 10);
            var isNeedChangeArea = true;
            if (typeof (pvid) != 'undefined' && pvid !== '') {
                isNeedChangeArea = false;
            }
            if (isNeedChangeArea) {
                this.changeAreaH(areaId, newH, true);
            }
            return false;
        } else {
            this.$control.width(width);
            this.setCss('width', width, null);
            this.setData('width', width, false, null);
            this.refreshCss();
            return true;
        }

    },
    getMinWidthAndHeight: function () {
        var res = {};
        res.minW = this.minW, res.minH = this.minH;
        return res;
    },
    setHeight: function (height) {
        var $img = $('#img_' + this.controlId);
        var $control = $('#' + this.controlId);
        var $imgBox = $control.find('.image-clip-wrap');
        var ctype = $control.attr('ctype');
        var cstyle = $control.attr('cstyle');
        var fillType = $imgBox.attr('data-filltype');
        var $controlData = JSON.parse($("#data_" + this.controlId).text());
        var hasCliped = $controlData.Data.hasCliped;//|| $imgBox.attr('hasCliped');


        var areaId = this.$control.attr('tareaid');
        var pvid = this.$control.attr('pvid');
        var newH = parseInt(this.$control.position().top + parseInt(height));
        var isNeedChangeArea = true;
        if (typeof (pvid) != 'undefined' && pvid !== '') {
            isNeedChangeArea = false;
        }
        if (isNeedChangeArea) {
            this.changeAreaH(areaId, newH, true);
        }

        if (ctype == 'image' && cstyle == 'Style1' && hasCliped == 'true') {
            var scale = parseFloat(height / $control.height());
            var clipViewImgIDX = parseFloat($img.css('marginLeft'));
            var clipViewImgIDY = parseFloat($img.css('marginTop'));
            var clipViewImgIDW = $img.width();
            var clipViewImgIDH = $img.height();
            if (fillType === '2') {
                clipViewImgIDH *= scale;
                clipViewImgIDY *= scale;
            } else if (fillType == '0') {
                clipViewImgIDW *= scale;
                clipViewImgIDH *= scale;
                clipViewImgIDX *= scale;
                clipViewImgIDY *= scale;

                var newW = parseInt($control.width() * scale);

                $control.width(newW);
                $imgBox.width(newW);
                $controlData.Css['$img-width'] = clipViewImgIDW + 'px';
                $controlData.Css.width = newW;
                $controlData.Data.width = newW;
                $('#smWidth', parent.document).val(newW);
            } else if (fillType == '1') {
                if (scale > 1 && clipViewImgIDH + clipViewImgIDY < height) {
                    clipViewImgIDW *= scale;
                    clipViewImgIDH *= scale;
                    clipViewImgIDX *= scale;
                    clipViewImgIDY *= scale;
                    var newW = parseInt($control.width() * scale);
                    $controlData.Css['$img-width'] = clipViewImgIDW + 'px';
                }
            }

            $controlData.Data.ClipPictureData = JSON.stringify({
                maskw: clipViewImgIDW,
                maskh: clipViewImgIDH,
                maskx: clipViewImgIDX,
                masky: clipViewImgIDY
            });
            $control.height(height).addClass("smc");
            $imgBox.css({
                width: '100%',
                height: '100%'
            });
            $img.css({
                width: clipViewImgIDW,
                height: clipViewImgIDH,
                marginTop: clipViewImgIDY,
                marginLeft: clipViewImgIDX
            }).removeClass('imgCliped');
            $controlData.Css['$img-height'] = clipViewImgIDH + 'px';
            $controlData.Css.height = height;
            $("#data_" + this.controlId).text(JSON.stringify($controlData));

            smartViewFactory.pushTemp2History(this.controlId);
            return false;
        }

        this.$control.height(height);
        this.setCss('height', height, null);
        this.setData('height', height, false, null);
        this.refreshCss();
        return true;
    },
    setWidthAndHeight: function (width, height) {
        this.$control.width(width);
        this.setCss('width', width, null);
        this.setData('width', width, false, null);
        this.$control.height(height);
        this.setCss('height', height, null);
        this.setData('height', height, false, null);
        this.refreshCss();
    },
    upIndex: function () {
        var zIndex = this.$control.css("z-index");
        zIndex = parseInt(zIndex, 10);
        zIndex = zIndex + 1;
        this.$control.css('z-index', zIndex);
        this.setCss("zIndex", zIndex, null);
        this.setData("zIndex", zIndex, false);
        this.refreshCss();
    },
    toTopIndex: function () {
        var zmax = getViewMaxZindex1() + 1;
        this.$control.css('z-index', zmax);
        this.setCss("zIndex", zmax, null);
        this.refreshCss();
    },
    downIndex: function () {
        var zIndex = this.$control.css("z-index");
        zIndex = parseInt(zIndex, 10);
        zIndex = zIndex - 1;
        if (zIndex < 0) {
            zIndex = 0;
        }
        this.$control.css('z-index', zIndex);
        this.setCss("zIndex", zIndex, null);
        this.setData("zIndex", zIndex, false);
        this.refreshCss();
        if (zIndex == 0) {
            this._fixCrossZeroIdxCts(this.$control);
        }
    },
    toBottomIndex: function () {
        this.$control.css('z-index', 0);
        this.setCss("zIndex", 0, null);
        this.refreshCss();
        this._fixCrossZeroIdxCts(this.$control);
    },
    setZindex: function (zindex, notRefresh) {
        this.$control.css('z-index', zindex);
        this.setCss("zIndex", zindex, null);
        if (!notRefresh) {
            this.refreshCss();
        }
    },
    refreshCss: function () {
        var strData = JSON.stringify(this.controlData);
        this.$control.find('#data_' + this.controlId).html(strData);
        this.$control.data("status", this.controlData).addClass('smc');
        smartViewFactory.pushTemp2History(this.controlId);
        // 自动保存 一方化
        if (window.autoSavePage) {
            autoSavePage()
        }
    },
    refreshCssTag: function (css) {
        var ctagId = '#css' + this.controlId;
        ctagId = ctagId.replace('smv_', '');
        $(ctagId).html(css);
    },
    refreshView: function (callback) {
        var me = this;
        var setTimeoutFlag = this.$control.attr('sm_st_refreshFalg');
        if (typeof setTimeoutFlag !== 'undefined') {
            clearTimeout(this.setTimeOutFlag);
        }
        var refstu = me.$control.attr('refstu');
        if (typeof refstu !== 'undefined' && refstu != '') {
            //alert('当前控件正在进行刷新,请稍后');
            return;
        }
        me.$control.attr('refstu', 'do');
        this.setTimeOutFlag = setTimeout(function () {
            var item = {};
            item.id = me.controlId;
            //fix control get position data error when it is not in visiable window 
            item.x = parseInt(me.controlData.Css['offsetX']);
            item.y = parseInt(me.controlData.Css['offsetY']);
            item.areaId = me.$control.attr('areaId');
            item.type = me.$control.attr('ctype');
            item.pageId = me.$control.attr('cpid');
            item.cssStyle = me.$control.attr('cstyle');
            item.colorName = me.$control.attr('ccolor');
            item.parentId = me.$control.attr('pvid');
            if (typeof (item.parentId) == 'undefined') {
                item.parentId = '';
            }
            var viewData = me.controlData;
            item.Css = viewData.Css;
            item.Data = viewData.Data;
            item.ListData = viewData.ListData;
            item.ExtData = viewData.ExtData;
            item.isNeedRefreshData = true;
            smartViewFactory.encodeSmartViewData(item);
            item.children = buildRefreshViewChangedChildren(me.$control);
            refreshSmartView(item, function () {
                if (me.$control.attr('iscontainer') === 'True') {
                    var $chilrenView = me.$control.find('.smartAbs');
                    $chilrenView.each(function () {
                        var childId = '#' + $(this).attr('id');
                        bindSmartEnvents(childId);
                        $(childId).find('.ui-resizable-handle').hide();
                        // fix paste animate not execute
                        if ($(childId).hasClass('animated')) {
                            $(childId).smanimate();
                        }
                    });
                }
                me.$control.css({ 'opacity': 1 });
                me.$control.find('a').attr('href', 'javascript:void(0)');
                me.$control.removeAttr('refstu');
                if (typeof callback === 'function') {
                    callback();
                }
            }, function () {
                me.$control.removeAttr('refstu');
            });
            me.$control.addClass('smc');

        }, 100);
        this.$control.attr('sm_st_refreshFalg', this.setTimeOutFlag);
    },
    changeArea: function (area, newH, nr) {
        var minHeight = parseInt(area.$area.css('min-height'));
        var areaHeight = parseInt(area.height());
        if (newH > areaHeight) {
            area.changeHeight(parseInt(newH), nr);
            $('#arH_' + area.controlId).html('H:' + newH + 'px');
        } else {
            //var controlMaxTop = area.getControlsMaxTop();
            //if (areaHeight > minHeight && areaHeight > controlMaxTop) {
            //    area.changeHeight(parseInt(controlMaxTop), nr);
            //}
        }
    },
    changeAreaH: function (areaId, newH, nr) {
        if (areaId === '') {
            areaId = this.$control.attr('tareaid');
            if (areaId !== '') {
                areaId = 'smv_' + areaId;
            } else {
                areaId = 'smv_Main';
            }
        } else {
            areaId = "smv_" + areaId;
        }
        if (nr) {
            var data = $('#data_' + areaId).html();
            var areaData = JSON.parse(data);
            var area = new AreaInfo(areaId, areaData);
            var areaHeight = parseInt(area.height());
            if (newH > areaHeight) {
                area.changeHeight(parseInt(newH), true);
                $('#arH_' + area.controlId).html('H:' + parseInt(newH) + 'px');
                //fix 页面设置线不到底的bug
                $('#slinebottom_' + areaId).attr('style', '');
            } else if (areaHeight > parseInt(area.areaData.height)) {
                area.changeHeight(parseInt(areaHeight), true);
                //fix 页面设置线不到底的bug
                $('#slinebottom_' + areaId).attr('style', '');
            }
        } else {
            var $area = $('#' + areaId);
            var oldAreaHeight = parseInt($area.height());
            newH = parseInt(newH);
            if (newH > oldAreaHeight) {
                $area.height(newH);
                $('#arH_' + areaId).html('H:' + newH + 'px');
                //fix 页面设置线不到底的bug
                $('#slinebottom_' + areaId).attr('style', '');
            }
        }
        if (areaId === 'smv_Main') {
            smartViewFactory.fixArea1Height(newH);
        } else if (areaId === 'smv_Area1') {
            if (newH >= $('#smv_Area1').height()) {
                smartViewFactory.fixAreaMainHeight(newH);
            }
        }
    },
    getCurrentAreaId: function (aId) {
        var areaId = aId;
        if (areaId === "") {
            areaId = "smv_Main";
        } else {
            areaId = "svm_" + areaId;
        }
        return areaId;
    },
    changeColor: function (colorName, callback) {
        var pageId = this.$control.attr('cpid');
        changeSmartViewColor(pageId, this.controlId, colorName, callback);
    },
    changeStyle: function (styleName, colorName, panelRefresh, callback) {
        var me = this;
        var oldStyleName = this.$control.attr('cstyle');
        var oldTabName = this.$control.attr('tabname');
        this.$control.attr('cstyle', styleName);
        this.$control.attr('ccolor', colorName);
        this.$control.attr('tabname',oldTabName)
        if (oldStyleName === styleName) {
            this.refreshView(callback);
        } else {
            var controlId = this.controlId;
            var pageId = this.$control.attr('cpid');
            var changeStyleData = {
            };
            changeStyleData.pageId = pageId;
            changeStyleData.id = controlId;
            changeStyleData.x = this.controlData.Css['offsetX'];
            changeStyleData.y = this.controlData.Css['offsetY'];
            changeStyleData.type = this.viewType;
            changeStyleData.Css = this.controlData.Css;
            changeStyleData.Data = this.controlData.Data;
            changeStyleData.ExtData = this.controlData.ExtData;
            changeStyleData.colorName = colorName;
            changeStyleData.cssStyle = styleName;
            changeStyleData.isNeedRefreshData = false;
            changeSmartViewStyle(JSON.stringify(changeStyleData), function (d) {
                if (me.$control.attr('iscontainer') === 'True') {
                    var $chilrenView = me.$control.find('.smartAbs');
                    $chilrenView.each(function () {
                        var childId = '#' + $(this).attr('id');
                        bindSmartEnvents(childId);
                        $(childId).find('.ui-resizable-handle').hide();
                    });
                }
                me.$control.css({ 'opacity': 1 });
                me.$control.find('a').attr('href', 'javascript:void(0)');
                if (typeof callback === 'function') {
                    callback();
                }
            }, function (d) {
                if (typeof callback === 'function') {
                    callback();
                }
            }, panelRefresh);
        }
    },
    changeThemeColor: function (themeColor, cbFunc) {
        this.setCss("themeColorName", themeColor);
        this.refreshCss();
        var pageId = this.$control.attr('cpid');
        changeSmartViewThemeColor(pageId, this.controlId, themeColor, cbFunc);
    },
    setCss: function (key, value, cbFunc) {
        this.controlData.Css[key] = value;
        if (typeof (cbFunc) !== 'undefined' && cbFunc != null && typeof (cbFunc) == 'function') {
            cbFunc(key, value);
        }
    },
    getCss: function (key) {
        return this.controlData.Css[key];
    },
    getData: function (key) {
        return decodeURIComponent(this.controlData.Data[key]);
    },
    setData: function (key, value, needRefesh, cbFunc) {
        this.controlData.Data[key] = encodeURIComponent(value);
        if (needRefesh) {
            this.refreshCss();
            this.refreshView(cbFunc);
        } else {
            this.refreshCss();
            if (cbFunc != null && typeof (cbFunc) == 'function') {
                cbFunc(this.$control, key, value);
            }
        }
    },
    setDataV2: function (key, value, needRefesh, cbFunc) {
        this.controlData.Data[key] = encodeURIComponent(value);
        if (needRefesh) {
            this.refreshCss();
            this.refreshView(cbFunc);
        } else {
            if (cbFunc != null && typeof (cbFunc) == 'function') {
                cbFunc(this.$control, key, value);
            }
        }
    },
    setExtData: function (key, value, needRefresh, cbFunc) {
        this.controlData.ExtData[key] = encodeURIComponent(value);
        if (needRefresh) {
            this.refreshCss();
            this.refreshView(cbFunc);
        } else {
            this.refreshCss();
            if (cbFunc != null && typeof (cbFunc) == 'function') {
                cbFunc(this.$control, key, value);
            }
        }
    },
    setListData: function (key, value, needRefesh, cbFunc) {
        this.controlData['ListData'] = value;
        if (needRefesh) {
            this.refreshCss();
            this.refreshView(cbFunc);
            // 折叠面板控件新增/删除菜单后  重新展示下设置菜单
            var isPc = smartViewFactory.storage.deviceMode === 'Pc'
            if(this.$control && this.$control.attr('Ctype') === 'flexiblePanel' && isPc) {
                var mousePos = {};
                mousePos.left = this.$control.offset().left;
                mousePos.top = this.$control.offset().top;
                showConFastPropPanel(this, mousePos);
            }
        } else {
            this.refreshCss();
            if (cbFunc != null && typeof (cbFunc) == 'function') {
                cbFunc(this.$control, key, value);
            }
        }

    },
    setDegree: function (degree) {
        var angle = degree * Math.PI / 180;
        var degstr = 'rotate(' + degree + 'deg)';
        this.setCss('angle', angle, null);
        this.refreshCss();
        this.$control.css('transform', degstr);
        this.$control.css('-webkit-transform', degstr);
        this.$control.css('-ms-transform', degstr);
        this.$control.css('transform-origin', '50% 50%');
        this.$control.css('-webkit-transform-origin', '50% 50%');
        this.$control.css('-ms-transform-origin', '50% 50%');
        var $degree = this.$control.find('.handle-rotate');
        $degree.data('last_angle', angle);
        $degree.children('.degree').html(Math.floor(degree) + '<sup>o</sup>');

    },
    enableDrag: function () {
        this.$control.draggable("option", "disabled", false);
        this.$control.removeClass('smlocked');
    },
    disableDrag: function () {
        this.$control.draggable("option", "disabled", true);
        this.$control.addClass('smlocked');
    },
    locked: function () {
        this.setCss("smlocked", "1", null);
        this.refreshCss();
    },
    disableLocked: function () {
        this.setCss("smlocked", "0", null);
        this.refreshCss();
    },
    setFullScreen: function () {
        var marginLeft = this.controlData.Css['marginLeft'];
        if (typeof marginLeft === 'undefined') {
            marginLeft = 0;
        }
        var left = 0;
        if (this.$control.hasClass("smartFixed")) {
            var fixedPos = this.controlData.Css["fixedPosition"];
            var fleft = parseInt(this.controlData.Css["foffsetX"]);
            if (fixedPos !== "TopCenter" && fixedPos !== "BottomCenter") {
                left = fleft + 200;
            } else {
                left = fleft;
            }
            switch (fixedPos) {
                case 'TopLeft':
                case 'LeftCenter':
                case 'BottomLeft':
                    this.$control.css({
                        'left': left + 'px', 'width': '320px', 'right': 'auto'
                    });
                    break;
                case 'TopRight':
                case 'RightCenter':
                case 'BottomRight':
                    this.$control.css({
                        'right': left + 'px', 'width': '320px', 'left': 'auto'
                    });
                    break;
                case 'BottomCenter':
                case 'TopCenter':
                    this.$control.css({
                        'left': left + 'px', 'width': '320px', 'right': '0px'
                    });
            }
        } else {
            this.$control.css({
                'left': left + 'px', 'width': '100%'
            });
        }
        this.$control.children().first().addClass('yibuFullScreen').css({ 'margin': '0 ' }); //+ marginLeft + 'px' });
        this.$control.draggable("option", "axis", "y");
        var handles = this.$control.resizable("option", "handles");
        this.$control.attr('hisHandles', handles);
        if (handles !== 'n,s') {
            this.$control.resizable("option", "handles", "n,s");
        }
        var handlesArray = handles.split(',');
        var handleLen = handlesArray.length;
        for (var i = 0; i < handleLen; i++) {
            if (handlesArray[i] !== 'n' && handlesArray[i] !== 's') {
                this.$control.children('.ui-resizable-' + handlesArray[i]).hide();
            }
        }
        this.controlData.Css['isFullScreen'] = true;

        if (this.$control.attr('ctype') === 'image') {
            this.controlData.Css['width'] = '320';
            this.controlData.Css['marginLeft'] = '0';
            this.controlData.Css['marginRight'] = '0';
            this.controlData.Data['width'] = '320';
            //this.controlData.Css['height'] = 'auto';
        }
        this.onSetFullScreen();
        this.refreshCss();
    },
    cancelFullScreen: function () {
        this.$control.children().first().removeClass('yibuFullScreen').css({
            'margin': '0px'
        });
        this.$control.draggable("option", "axis", false);
        var left = parseInt(this.controlData.Css['offsetX']);
        var width = this.controlData.Css['width'];
        if (parseInt(width) === 0) {
            width = 320;
        }
        if (this.$control.hasClass("smartFixed")) {
            var fixedPos = this.controlData.Css["fixedPosition"];
            var fleft = parseInt(this.controlData.Css["foffsetX"]);
            if (fixedPos !== "TopCenter" && fixedPos !== "BottomCenter") {
                left = fleft + 200;
            } else {
                left = fleft;
            }
            switch (fixedPos) {
                case 'TopLeft':
                case 'LeftCenter':
                case 'BottomLeft':
                    this.$control.css({
                        'left': left + 'px', 'width': width + 'px', 'right': 'auto'
                    });
                    break;
                case 'TopRight':
                case 'RightCenter':
                case 'BottomRight':
                    this.$control.css({
                        'right': left + 'px', 'width': width + 'px', 'left': 'auto'
                    });
                    break;
                case 'BottomCenter':
                case 'TopCenter':
                    this.$control.css({
                        'left': left + 'px', 'width': width + 'px', 'right': '0px'
                    });
            }
        } else {
            this.$control.css({
                'left': left + 'px', 'width': width + 'px'
            });
        }
        var handles = this.$control.attr('hisHandles');
        if (typeof handles !== 'undefined') {
            var handlesArray = handles.split(',');
            var handleLen = handlesArray.length;
            for (var i = 0; i < handleLen; i++) {
                if (handlesArray[i] !== 'n' && handlesArray[i] !== 's') {
                    this.$control.children('.ui-resizable-' + handlesArray[i]).show();
                }
            }
            this.$control.resizable("option", "handles", handles);
        } else {
            this.$control.children('.ui-resizable-handle').show();
        }
        this.controlData.Css['isFullScreen'] = false;
        this.onCacnelFullScreen();
        this.refreshCss();
    },
    setHMargin: function (m) {
        this.$control.children().first().css({
            'margin': '0 ' + m + 'px'
        });
        this.controlData.Css['marginLeft'] = m;
        this.controlData.Css['marginRight'] = m;
        this.refreshCss();
    },
    onSmartViewCreated: function () {

    },
    onSmartViewPasted: function () { },
    onSmartViewDeleted: function () {
    },
    onSetFullScreen: function () {

    },
    onCacnelFullScreen: function () {

    },
    onSmartViewThemeChanged: function () {
    },
    _fixCrossZeroIdxCts: function (control) {
        var me = this;
        var cId = control.attr('id');
        var crect = {}
        crect.x1 = control.position().left;
        crect.y1 = control.position().top;
        crect.x2 = crect.x1 + control.outerWidth();
        crect.y2 = crect.y1 + control.outerHeight();
        var ctareaId = control.attr('tareaid');
        if (ctareaId === '') {
            ctareaId = 'smv_Main';
        }
        var $smvs = $('#' + ctareaId).find('.esmartMargin').filter(function () {
            var $this = $(this);
            var drect = {}
            drect.x1 = $this.position().left;
            drect.y1 = $this.position().top;
            drect.x2 = drect.x1 + $this.outerWidth();
            drect.y2 = drect.y1 + $this.outerHeight();
            return parseInt($this.css("z-index")) == 0 && $this.attr('id') != cId && me._checkTwoViewIsCrossed(crect, drect);
        });
        $smvs.each(function () {
            var wrapperView = smartViewFactory.getSmartViewWithJobj($(this));
            wrapperView.setZindex(1);
        });
    },
    _checkTwoViewIsCrossed: function (r1, r2) {
        if (Math.abs((r1.x1 + r1.x2) / 2 - (r2.x1 + r2.x2) / 2) < ((r1.x2 + r2.x2 - r1.x1 - r2.x1) / 2) && Math.abs((r1.y1 + r1.y2) / 2 - (r2.y1 + r2.y2) / 2) < ((r1.y2 + r2.y2 - r1.y1 - r2.y1) / 2)) {
            return true
        }
        return false
    },
    customFastSettingClick: function (type) {

    },
    setToFixed: function () {
        var tareaId = this.$control.attr('tareaid');
        if (tareaId === '') {
            tareaId = 'Main';
        }
        tareaId = '#smv_' + tareaId;
        var maxZIndex = getViewMaxZindex1() + 1;
        this.$control.css({ 'z-index': maxZIndex }).attr('pvid', '');
        this.setCss("zIndex", maxZIndex, null);
        this.$control.appendTo($(tareaId));
    }
});

var smartViewFactory = (function () {
    var _currentSelectedVType = null;
    function onSmartViewCreateSuccess(data, params) {
        params = params || {}

        var header = $('head');
        var areaId = data.areaId;
        if (!areaId) {
            areaId = "smv_Main";
        } else {
            areaId = "smv_" + areaId;
        }
        var body = null;
        if (data.ParentId !== "") {
            var $parent = $('#smv_' + data.ParentId);
            body = $parent.find('#smc_' + data.ParentAreaId).filter(function () {
                return $(this).attr('cid') == data.ParentId;
            }).first();

        } else {
            body = $('#' + areaId);
        }
        header.append(data.Css);
        var smartView = $(data.Html);
        body.append(smartView);
        smartView = $('#smv_' + data.ControlId);
        smartView.find('.lazyload')
            .each(function () {
                var $this = $(this);
                $this.attr('src', $this.attr('data-original'));
            });
        smartView.find('a').attr('href', 'javascript:void(0)');
        smartView.addClass(" smc");
        bindSmartEnventsWithObj(smartView, true);
        smartView.click();
        var zmax = getViewsMaxZindex(body) + 1;
        var $smartView = _getSmartViewWithObj(smartView);
        $smartView.setZindex(zmax, true);
        if (data.ParentId === "") {
            var smPos = smartView.position();
            var smTop = smPos.top, smLeft = smPos.left, smWidth = smartView.width();
            var smHeight = smartView.height();
            var area = _getAreaView(areaId);
            var areaWidth = area.$area.width();
            if (smTop + smHeight > area.height()) {
                area.changeHeight(smTop + smHeight);
                $smartView.changeAreaH(areaId.replace("smv_", ""), smTop + smHeight, true);
            } else {
                area.changeHeight(area.height());
            }
            if (smLeft + smWidth > areaWidth) {
                var newLeft = parseInt(smLeft - (smLeft + smWidth - areaWidth));
                if (newLeft < 0) {
                    newLeft = 0;
                }
                $smartView.setLeft(newLeft, true);
            }

        }
        $smartView.refreshCss();

        $smartView.onSmartViewCreated(params.onCreatedParams);
    }
    function onSmartViewDeleteSuccess(data) {
        if (data.ControlId !== "" && typeof (data.ControlId) !== "undefined") {
            var currentEditId = window.parent.nsmart.getCurrentEditControlId();
            var idArray = data.ControlId.split(',');
            var len = idArray.length;
            for (var i = 0; i < len; i++) {
                var $sm = $('#smv_' + idArray[i]);
                $sm.addClass("smart-deleted");
                var smView = _getSmartViewWithObj($sm);
                smView.onSmartViewDeleted();
                if (smView.controlId === currentEditId) {
                    window.parent.nsmart.hideRightPanel();
                }
            }
            hideConFastPropPanel();
            hideSmDegreeLayer();
        }
    }
    function onStripViewCreateSuccess(data) {
        onPastedSuccess(data);
        smartViewFactory.storage.notRefreshTempData = false;
    }
    function onPastedSuccess(data) {
        var header = $('head');
        var areaId = "";
        var body = null;
        clearSelectViews();
        var maxTop = 0, viewAreaId = "";
        for (var i = 0; i < data.length; i++) {
            if (areaId == "") {
                areaId = data[i].AreaId;
                if (areaId == "" || areaId == null) {
                    areaId = "smv_Main";
                } else {
                    areaId = "smv_" + areaId;
                }
            }
            var pid = data[i].ParentId;
            if (pid !== '' && pid !== null) {
                var $parent = $('#smv_' + pid);
                body = $parent.find('#smc_' + data[i].ParentAreaId).filter(function () {
                    return $(this).attr('cid') == pid;
                }).first();
            }
            if (body == null || body.length === 0) {
                body = $('#' + areaId);
            }
            header.append(data[i].Css);
            var smartView = $(data[i].Html);
            body.append(smartView);
            smartView = $('#smv_' + data[i].ControlId);
            if (pid == null || pid === '') {
                var h = smartView.height();
                if (smartView.position().top + h > maxTop) {
                    maxTop = parseInt(smartView.position().top + h);
                    viewAreaId = areaId;
                }
            }
            smartView.find('.lazyload')
                .each(function () {
                    var $this = $(this);
                    $this.attr('src', $this.attr('data-original'));
                });
            smartView.find('a').attr('href', 'javascript:void(0)');
            smartView.addClass("smart-resize smc");
            var $subViews = smartView.find('.smartAbs');

            $subViews.addClass('smc');

            bindSmartEnventsWithObj(smartView, false);
            // fix paste animate not execute
            if (smartView.hasClass('animated')) {
                smartView.smanimate();
            }
            $subViews.each(function () {
                var $this = $(this);
                if ($this.hasClass('animated')) {
                    $this.smanimate();
                }
            });
            $subViews.each(function () {
                var $this = $(this);
                bindSmartEnventsWithObj($this, false);
                $this.removeClass('smart-resize').find('.ui-resizable-handle').hide();
                smartViewFactory.getSmartViewWithOutType($this.attr("id")).onSmartViewPasted()
            });
            smartViewFactory.getSmartViewWithOutType(smartView.attr("id")).onSmartViewPasted()
        }
        if (maxTop > 0) {
            var area = _getAreaView(viewAreaId);
            if (maxTop > area.height()) {
                area.changeHeight(maxTop, true);
            }
        }
    }

    function onRollSuccess(data) {
        onSmartViewDeleteSuccess(data.Data);
        onPastedSuccess(data.Data.List);
    }

    function onSmartViewEditSuccess(pageId, controlId, data) {
        var controlData = smartViewFactory.getSmartViewData(controlId);
        window.parent.nsmart.refreshRightPanel(data, controlData);
    }
    // 设置面板
    function onCtrlTabHtmlSuccess(pageId, controlId, data) {
        var controlData = smartViewFactory.getSmartViewData(controlId);
        window.parent.nsmart.refreshCtrlTab(data, controlData);
    }
    function onshowSmartViewChange(pageId, controlId, data) {
        var controlData = smartViewFactory.getSmartViewData(controlId);
        window.parent.nsmart.refreshStyleChange(data, controlData);
    }
    function onSmartViewOptionFailed(msg) {
        window.parent.showFailure(msg)
    }
    function _getAreaView(id) {
        var d = '#data_' + id;
        var areaData = $(d).html();
        if (typeof (areaData) !== "undefined") {
            areaData = JSON.parse(areaData);
        } else {
            areaData = {
            };
        }
        return new AreaInfo(id, areaData);
    }
    function _smartViewBuilder(id, type, data) {
        var control = null;
        switch (type) {
            case 'button':
                control = new ButtonSmartView(id, data);
                break;
            case 'banner':
                control = new BannerSmartView(id, data);
                break;
            case 'image':
                control = new ImageSmartView(id, data);
                break;
            case 'slide':
                control = new SlideSmartView(id, data);
                break;
            case 'line':
                control = new LineSmartView(id, data);
                break;
            case 'area':
                control = new AreaSmartView(id, data);
                break;
            case 'text':
                control = new TextSmartView(id, data);
                break;
            case 'etext':
                control = new ETextSmartView(id, data);
                break;
            case 'etime':
                control = new ETimeSmartView(id, data);
                break;
            case 'elink':
                control = new ELinkSmartView(id, data);
                break;
            case 'elabel':
                control = new ELabelSmartView(id, data);
                break;
            case 'eproductcontent':
                control = new EProductContentSmartView(id, data);
                break;
            case 'code':
                control = new CodeSmartView(id, data);
                break;
            case 'map':
                control = new MapSmartView(id, data);
                break;
            case 'audio':
                control = new AudioSmartView(id, data);
                break;
            case 'video':
                control = new VideoSmartView(id, data);
                break;
            case 'list':
                control = new ListSmartView(id, data);
                break;
            case 'newslist':
                control = new NewsListSmartView(id, data);
                break;
            case 'productlist':
                control = new ProductListSmartView(id, data);
                break;
            case 'nav':
                control = new NavSmartView(id, data);
                break;
            case 'tab':
                control = new TabSmartView(id, data);
                break;
            case 'fullpage':
                control = new FullPageSmartView(id, data);
                break;
            case 'browserdevice':
                control = new BrowserDeviceSmartView(id, data);
                break;
            case 'search':
                control = new SearchSmartView(id, data);
                break;
            case 'languages':
                control = new LanguagesSmartView(id, data);
                break;
            case 'qrcode':
                control = new QrCodeSmartView(id, data);
                break;
            default:
                control = smartViewFactory.buildSmartView(type, id, data);
                break;
        }
        return control;
    }
    function _getSmartViewData(id, type, encode) {
        var sv = $("#" + id);
        var json = sv.data("status");
        if (json) {
            //return json;
        }
        var controlData = sv.find('#data_' + id).html();
        type = type || sv.attr('ctype');
        if (typeof (controlData) !== "undefined" && controlData != "") {
            controlData = JSON.parse(controlData);
            //fix text bug
            if (type !== 'text') {
                if (encode == "decode") {
                    _decodeSmartViewData(controlData);
                    _htmlDecodeSmartViewData(controlData);
                } else {
                    _htmlDecodeSmartViewData(controlData);
                    _encodeSmartViewData(controlData);
                }
            }
        } else {
            controlData = {};
        }
        sv.data("status", controlData);
        return controlData;
    }
    function _getSmartView(id, type) {
        var controlData = _getSmartViewData(id, type);
        return _smartViewBuilder(id, type, controlData);
    }
    function _getSmartViewWithObj($obj) {
        return _getSmartView($obj.attr('id'), $obj.attr('ctype'));
    }
    //该方法置为绑定控件的自定义事件服务
    function _getSimpleSmartViewWithObj($obj) {
        var controlData = {
        };
        return _smartViewBuilder($obj.attr('id'), $obj.attr('ctype'), controlData);
    }
    function _getCurrentWaitAddView() {
        return _currentSelectedVType;
    }
    function _setCurrentWaitAddView(t) {
        $('.smvContainer').click();//修复容器控件上添加控件没有关联到容器控件的bug
        _currentSelectedVType = t;
        $('.smvContainer').addClass('control-add-flag');//css("cursor", "crosshair");
        $('.smartAbs').addClass('control-add-flag').find('div').addClass('control-add-flag').find('a').addClass('control-add-flag');//.css("cursor", "crosshair"); //control - add - flag
    }
    function _clearCurrentWaitAddView() {
        _currentSelectedVType = null;
        //$('.smvContainer').css("cursor", "default");
        $('.smvContainer').removeClass('control-add-flag');
        $('.smartAbs').removeClass('control-add-flag').find('div').removeClass('control-add-flag').find('a').removeClass('control-add-flag');;
    }
    function _isSmartViewCanAdd(dType, sType, styleName) {
        if (typeof dType !== 'undefined') {
            var conflictArray = cnsmart.ctlConflictMap[dType];
            if (typeof conflictArray !== 'undefined') {
                var dstKey = sType;
                if (typeof styleName !== 'undefined' && styleName !== '') {
                    dstKey += "_" + styleName;
                }
                if ($.inArray(sType, conflictArray) !== -1) {
                    return false;
                }
                if ($.inArray(dstKey, conflictArray) !== -1) {
                    return false;
                }
                if (typeof sType !== 'undefined') {
                    var stripArray = sType.split("_");
                    if (stripArray.length == 3) {
                        if ($.inArray(stripArray[1], conflictArray) !== -1) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    //从容器拖控件出来时的计算方法
    function _getRelativePosition($view) {
        var position = {
        };
        if ($view.hasClass('smvContainer')) {
            position.x = 0;
            position.y = 0;
        } else {
            position.x = $view.position().left;
            position.y = $view.position().top;
            var pvid = $view.attr('pvid');
            if (pvid != '' && typeof (pvid) != 'undefined') {
                var $parentView = $('#smv_' + pvid);
                var ppositon = arguments.callee($parentView);
                var parentSmartView = _getSmartViewWithObj($parentView);
                ppositon.target = $view.parent();
                parentSmartView.fixControlPosition(ppositon);
                ppositon.target = null;
                position.x += ppositon.x
                position.y += ppositon.y
            }
        }
        position.x = parseInt(position.x);
        position.y = parseInt(position.y);
        return position;
    }
    //绑定页面的拖放事件
    function _bindDropableEvent() {
        $('.smvContainer').droppable({
            greedy: true,
            accept: '.esmartMargin',
            activeClass: "",
            hoverClass: "",
            drop: function (event, ui) {
                var ctype = ui.draggable.attr('ctype');
                //banner and fuupage not support to droppable to another container
                if (ctype === 'banner' || ctype === 'fullpage') {
                    return false;
                }
                var pageId = getCurrentPageId();
                smartViewFactory.onContainerDroppable(pageId, event, ui);

                return false;
            }
        }).click(function (event) {
            var pageId = getCurrentPageId();
            return smartViewFactory.bindContainerClick(pageId, event);
        });
    }
    //初始化快速设置面板事件
    function _initFastSettingEvent() {
        $('#sm_controlSetting .editorsTage-btn').click(function (e) {
            window.parent.wzAiHelp && window.parent.wzAiHelp.closeAsDialog();

            var $this = $(this);
            var $parent = window.parent.$;
            var type = $this.attr('type');
            var controlId = $this.parent().parent().attr('relcontrolid');
            if(!controlId) {
                controlId = $('#sm_controlSetting').attr('relcontrolid');
            }
            var pageId = getCurrentPageId();
            if (type === 'content' || type === 'design' || type === 'changeStyle') {
                clearTimeout(smartGlobalSettings.editSvTimeoutFlag);
                var currentCtonrolId = window.parent.nsmart.getCurrentEditControlId();
                if (type === 'content' || type === 'design') {
                    $parent('#layer-style-change') && ($parent('#layer-style-change').hide());
                }
                if (controlId != currentCtonrolId || !window.parent.nsmart.isSettingPanelOpen()) {
                    var $control = $('#' + controlId)
                    var ctype = $control.attr('ctype');
                    var cstyle = $control.attr('cstyle');
                    var ccolor = $control.attr('ccolor');
                    if (ctype !== 'error') {
                        smartGlobalSettings.editSvTimeoutFlag = setTimeout(function () {
                            smartViewFactory.backupPage2Temp({ desc: "设置", controlType: ctype, suffix: "高级属性", ctrlId: controlId });
                            if (type === 'changeStyle') {
                                smartViewFactory.showSmartViewStyleChange(pageId, controlId, ctype, cstyle, ccolor);
                            } else {
                                smartViewFactory.editSmartView(pageId, controlId, ctype, cstyle, ccolor);
                            }
                        }, 100);
                    } else {
                        alert('错误控件只能删除,不能编辑!');
                    }
                } else {
                    if (type === 'changeStyle' && $parent('#layer-style-change').is(':hidden')) {
                        $parent('#change-select-btn').click();
                    }
                }

            } else if (type === 'delete') {
                controlId = smartViewFactory.getWaitDelViewIds($('#' + controlId));
                smartViewFactory.deleteSmartView(pageId, controlId);

            } else if (type === 'lock') {
                var lblmenulock = $("#lblmenu_lock");
                if ($this.hasClass('lock')) {
                    smartViewFactory.enableDrag(controlId);
                    smartViewFactory.disableLocked(controlId);
                    lblmenulock.find('.icon').removeClass('icon-do-lock').addClass('icon-do-unlock');
                    lblmenulock.find(".lzprompt-txt").html("锁定");
                    $this.removeClass('lock').addClass('unlock');
                    $('#fs_controllockedText').html('锁定');
                } else {
                    smartViewFactory.disableDrag(controlId);
                    smartViewFactory.locked(controlId);
                    lblmenulock.find('.icon').removeClass('icon-do-unlock').addClass('icon-do-lock');
                    lblmenulock.find(".lzprompt-txt").html("解锁");
                    $this.removeClass('unlock').addClass('lock');
                    $('#fs_controllockedText').html('解锁');
                }
            } else if (type === 'stretch') {
                var ctrl = $('#' + controlId);
                if (ctrl.attr('isShowingOri') !== "true") {
                    smartViewFactory.beforeModify({ desc: "设置", controlType: ctrl.attr('ctype'), suffix: ($this.hasClass('stretch') ? "取消通栏" : "通栏"), ctrlId: controlId });
                }

                if ($this.hasClass('stretch')) {
                    smartViewFactory.cancelFullScreen(controlId);
                    $this.removeClass('stretch').addClass('unstretch');
                    $('#fs_controlstretchText').html('通栏');
                } else {
                    smartViewFactory.setFullScreen(controlId);
                    $this.removeClass('unstretch').addClass('stretch');
                    $('#fs_controlstretchText').html('取消通栏');
                }
            } else if (type === 'help') {
                var sv = $('#' + controlId);
                var ctype = sv.attr('ctype');
                var cstyle = sv.attr("cstyle");
                try {
                    var helpLink = cnsmart.controlHelpMap[ctype];
                    if (helpLink != null && helpLink !== '') {
                        if (helpLink[cstyle]) {
                            helpLink = helpLink[cstyle];
                        }
                        //var wtab = window.open();
                        //setTimeout(function () {
                        //    wtab.location = helpLink;
                        //}, 100);
                        window.open(helpLink, '_blank');
                    }
                } catch (e) {

                }
            }
            //  else if (type === 'ai') {
            //     // AI小梦 TODO controlId代表元素id
            //     smartViewFactory.openSmartViewAI(controlId);
                
            // }
            else {

                if(smartViewFactory.storage.isOemSimple){
                    if (type === "Data") {
                        editorsTageBtnHandle(e, controlId);
                    } else if (type === "AI") {
                    
                        // 打开ai窗口

                        var Setting = document.querySelector("#sm_controlSetting");
                        window.parent.wzAiHelp && window.parent.wzAiHelp.openAsDialog(Setting.getBoundingClientRect())
                        window.parent.nsmart.iframeScrollCancel = window.parent.nsmart.iframeScroll();

                        var $control = $('#' + controlId);
                        $control.attr('tabname', 'AI');
                        ConFastPropPanelActive("AI")
                    }
                    return
                }

                var smView = smartViewFactory.getSmartViewWithOutType(controlId);
                smView.customFastSettingClick(type);
            }
            return false;
        });
    }
    //记录容器点击的坐标，供粘贴时使用
    function _recordContinerPosition(ev, tg) {
        var x = parseInt(ev.offsetX);
        var y = parseInt(ev.offsetY);
        var areaId = tg.attr("id");
        var areaArray = areaId.split('_');
        var prex = areaArray[0];
        smartGlobalSettings.areaId = '';
        if (prex === "smv") {
            var tareaId = tg.attr('tareaid');
            if (typeof (tareaId) != 'undefined') {
                x += parseInt(tg.position().left);
                y += parseInt(tg.position().top);
            }
            smartGlobalSettings.areaId = areaArray.length === 2 ? areaArray[1] : '';
            if (smartGlobalSettings.areaId === 'Main') {
                smartGlobalSettings.areaId = '';
            }
            smartGlobalSettings.parentId = null;
            smartGlobalSettings.parentAreaId = null;
            smartGlobalSettings.lastX = x;
            smartGlobalSettings.lastY = y;
        } else if (prex === "smc") {
            smartGlobalSettings.parentId = tg.attr('cid');
            smartGlobalSettings.parentAreaId = areaArray.length === 2 ? areaArray[1] : 'Area0';
            smartGlobalSettings.areaId = $('#smv_' + smartGlobalSettings.parentId).attr('tareaid');
            smartGlobalSettings.lastX = x;
            smartGlobalSettings.lastY = y;
            if (x > tg.width()) {
                smartGlobalSettings.lastX = parseInt(tg.width() / 2);
            }
            if (y > tg.height()) {
                smartGlobalSettings.lastY = parseInt(tg.height() / 2);
            }
        }

    }
    function _getLastClickSmPos() {
        var r = {
        };
        r.x = 0, r.y = 0;
        if (typeof smartGlobalSettings.clastX !== 'undefined') {
            r.x = smartGlobalSettings.clastX, r.y = smartGlobalSettings.clastY;
        }
        return r;
    }
    //清除最后一个控件点击的坐标
    function _clearLastClaickSmPos() {
        smartGlobalSettings.clastX = 0;
        smartGlobalSettings.clastY = 0;
    }
    //记录控件点击的坐标
    function _recordLastClickSmPos(tg) {
        smartGlobalSettings.clastX = tg.position().left;
        smartGlobalSettings.clastY = tg.position().top;
    }
    //拖动内容区时，调整Area1的高度
    function _fixArea1Height(newH) {
        var $area1 = $('#smv_Area1');
        var areaHeight = $area1.height();
        var dHish = $area1.attr('dHish');
        if (typeof dHish === 'undefined' || dHish === '') {
            dHish = areaHeight;
            $area1.attr('dHish', dHish);
        } else {
            dHish = parseInt(dHish);
        }

        if (newH > areaHeight || newH > dHish) {
            $area1.height(newH);
        } else {
            $area1.height(dHish);
        }
    }
    //模板页中拖动Area1的高度时调整AreaMain的高度
    function _fixAreaMainHeight(newH) {
        $('#smv_MainContent').height(newH);
    }
    function _setingScrollWheel(dis) {
        var $scroll = $('#mobileDesign_scrollbar');
        if ($scroll.length == 0) {
            //deal pc scroll
            var scrollHeight = document.body.scrollHeight - $(window).height();
            if (scrollHeight > 0) {
                document.body.scrollTop = document.body.scrollTop + dis;
            }
        } else {
            var scrollHeight = $scroll[0].scrollHeight;
            var orgScrollTop = $scroll.scrollTop();
            if (scrollHeight > 480) {
                $scroll.scrollTop(orgScrollTop + dis);
            }
        }
    }
    function _builderArearBorderBottom(areaId, showLine) {
        var showLineClass = '';
        if (!showLine) {
            showLineClass = 'smv-noline';
        }
        var $area = $('#' + areaId);
        if ($area.length > 0) {
            if (areaId === 'smv_Area3') {
                $area.css({
                    'margin-bottom': '100px'
                });
            } else if (areaId === 'smv_Main' && $('#smv_Area3').length == 0) {
                $area.css({
                    'margin-bottom': '80px'
                });
            }
            var barray = new Array();
            barray.push('<div id="slinebottom_' + areaId + '" class="smv-line smv-linebottom ' + showLineClass + '" relArea="' + areaId + '">');
            barray.push('<div class="smv-tempset">');
            barray.push('<ul class="smv-tempset-box f-clearfix">');
            if (areaId === 'smv_Main') {
                barray.push('<div class="lzprompt-plan" style="margin-left:-106px;"><span class="lzprompt-txt">网站搬家<br>支持外部链接一键生成到当前网站</span><span class="lzprompt-point lzprompt-point-top"></span></div>');
                barray.push('</li>');
                //九云图下线
                //barray.push('<li class="smv-tempitem" id="upload_' + areaId + '" style="display:none;"><i class="upload--icon"></i><span class="upload--beta"><span>Beta</span></span>');
                //barray.push('<div class="lzprompt-plan" style="margin-left:-106px;"><span class="lzprompt-txt">支持导入本地文件内容到当前页面</span><span class="lzprompt-point lzprompt-point-top"></span></div>');
                //barray.push('</li>');
            }
            barray.push('<li class="smv-tempitem" id="seting_' + areaId + '"><i class="mw-iconfont">&#xb076;</i>');
            barray.push('<div class="lzprompt-plan" style="margin-left:-28px;"><span class="lzprompt-txt">设置</span><span class="lzprompt-point lzprompt-point-top"></span></div>');
            barray.push('</li>');
            barray.push('<li class="smv-tempitem smv-secitem" id="drgseting_' + areaId + '"><i class="mw-iconfont">&#xb161;</i>');
            barray.push('<div class="lzprompt-plan" style="margin-left:-39px;"><span class="lzprompt-txt" id="arH_' + areaId + '">H:' + $area.height() + 'px</span><span class="lzprompt-point lzprompt-point-top"></span></div>');
            barray.push('</li></ul></div></div>');
            var $border = $(barray.join(''));
            $border.draggable({
                axis: 'y',
                delay: 100,
                handle: '.smv-secitem',
                start: function (event, ui) {
                    smartViewFactory.beforeModify({ desc: "更改", controlType: '页面', suffix: '大小' });
                    var areaControl = _getAreaView(areaId);
                    var maxTop = areaControl.getControlsMaxTop();
                    areaControl.$area.attr('maxcTop', maxTop);

                    hideConFastPropPanel();
                    // 修改页面高度时  关闭设置面板
                    if(smartViewFactory.storage.deviceMode === 'Pc') {
                        window.parent.nsmart.hideCtrlTab();
                    }
                    //onSelecteClearOtherSmartViewsEffect();

                },
                drag: function (event, ui) {
                    var $dragBorder = ui.helper;
                    var maxTop = parseInt($area.attr('maxcTop'));
                    if (areaId === 'smv_Area0' || areaId == 'smv_Area3') {
                        maxTop = maxTop == 0 ? 60 : maxTop;
                    } else {
                        maxTop = maxTop < 400 ? 400 : maxTop;
                    }
                    var newH = parseInt($dragBorder.position().top + $dragBorder.height());
                    //fix 1 px deviation make can not drag error
                    if (newH < maxTop - 1) {
                        return false;
                    }
                    $('#arH_' + areaId).html('H:' + newH + 'px');
                    $area.height(newH);
                    if (areaId === 'smv_Main' && $('#smv_Area3').length == 1) {
                        _fixArea1Height(newH);
                    } else if (areaId === 'smv_Area1') {
                        _fixAreaMainHeight(newH);
                    }
                },
                stop: function (event, ui) {
                    var areaControl = _getAreaView(areaId);
                    var h = $area.height();
                    if (areaId === 'smv_Area0' || areaId == 'smv_Area3') {
                        h = h == 0 ? 60 : h;
                    } else {
                        h = h < 400 ? 400 : h;
                    }
                    $('#arH_' + areaId).html('H:' + h + 'px');
                    ui.helper.attr('style', '');
                    areaControl.changeHeight(h, true);
                    if (areaId === 'smv_Main') {
                        _fixArea1Height(h);
                    } else if (areaId === 'smv_Area1') {
                        _fixAreaMainHeight(h);
                    }
                    if (areaId === 'smv_Main' && $('#smv_Area3').length == 1) {
                        areaControl.$area.css({
                            'margin-bottom': '0px'
                        });
                    }
                    if (areaId !== 'smv_Area0' && areaId !== 'smv_Area1') {
                        _setingScrollWheel(ui.position.top - ui.originalPosition.top);
                    }
                }
            });
            $border.find('#seting_' + areaId).click(function () {
                smartViewFactory.backupPage2Temp({ desc: "设置", controlType: "页面", suffix: "属性" });
                var $dp = $('#design-pageproperties', window.parent.document).show();
                $('#design-right', window.parent.document).hide();
                $dp.parent().show();
            });
            if (areaId === 'smv_Main') {
                window.parent.isShowImportContentBtn(function () {
                    // 只有普通页支持内容导入
                    if (window.parent.pageTypeName === "ContentPage") {
                        $border.find('#upload_' + areaId).css({
                            'display': 'block'
                        });


                        $(window.parent.document).find('#contentCategoryControl .widgetShow-link[data-content=".m-widgetShow-importFile"]').addClass('z-current').parent().show();
                        $(window.parent.document).find('#contentCategoryControl .widgetShow-link[data-content=".m-widgetShow-text"]').removeClass('z-current');
                 
                    }
                });
                // 首次创建页面 出现内容导入提示弹窗,页面自动定位至底部
                if ($('#importContent', window.parent.document).attr('data-isfirst') == "true" && !smartViewFactory.storage.hasLoadModal) {
                    smartViewFactory.storage.hasLoadModal = true;
                    $('#importContent', window.parent.document).modal('show');
                    window.scrollTo(0, $('#smart-body').height());
                    
                }

                $border.find('#upload_' + areaId).off('cllick').on('click', function () {
                    window.parent.window.importLogType = 'bottomMenu';
                    $('#importContent', window.parent.document).removeAttr('import-mode');
                    if ($("#importContent", window.parent.document).find('.modal-backdrop.fade.in').length === 0) {
                        var div = '<div class="modal-backdrop fade in"></div>'
                        $("#importContent", window.parent.document).prepend(div);
                    }
                    $("#importContent", window.parent.document).addClass('in').show();
                    //window.parent.getImportPageFileList();

                    // GA-内容导入
                    window.gtag && gtag('event', 'event_import_content', {
                        'event_category': '内容导入',
                        'event_label': '导入按钮'
                    });
                });
            }

            $(window.parent.document).find('#importFileImg').on('click', function () {
                window.parent.window.importLogType = 'leftMenu';
                $('#importContent', window.parent.document).removeAttr('import-mode');

                if ($("#importContent", window.parent.document).find('.modal-backdrop.fade.in').length === 0) {
                    var div = '<div class="modal-backdrop fade in"></div>'
                    $("#importContent", window.parent.document).prepend(div);
                }
                $("#importContent", window.parent.document).addClass('in').show();
                //window.parent.getImportPageFileList();
                $(window.parent.document).find("#m-widgetShow-left").addClass("f-hide");
                $(window.parent.document).find(".m-widgetItem").removeClass("z-current");
                $(window.parent.document).find(".m-widgetShow-mask").addClass("f-hide");
              

                // GA-内容导入
                window.gtag && gtag('event', 'event_import_content', {
                    'event_category': '内容导入',
                    'event_label': '内容导入-导航栏'
                });
            })

            $border.appendTo($area);
        }
    }
    function _addMainAreaBorder() {
        $('#smv_Main').append('<div class="smv-line smv-linetop"></div><div class="smv-line smv-lineright"></div><div class="smv-line smv-lineleft"></div>');
        _builderArearBorderBottom('smv_Main', true);
    }
    function _addTemplateAreaBorder() {
        $('#smv_Area0').append('<div class="smv-line smv-linetop"></div><div class="smv-line smv-lineright"></div><div class="smv-line smv-lineleft"></div>');
        _builderArearBorderBottom('smv_Area0', true);
        $('#smv_Area1').append('</div><div class="smv-line smv-lineright"></div><div class="smv-line smv-lineleft"></div>');
        _builderArearBorderBottom('smv_Area1', false);
        $('#smv_Area3').append('<div class="smv-line smv-linetop"></div><div class="smv-line smv-lineright"></div><div class="smv-line smv-lineleft"></div>');
        _builderArearBorderBottom('smv_Area3', true);
    }
    function _addAreaBorder() {
        var $mainArea = $('#smv_Main');
        if ($mainArea.length === 1) {
            _addMainAreaBorder();
        } else {
            _addTemplateAreaBorder();
        }
    }
    function _decodeHtmlContent(c) {
        if (typeof c.length === 'undefined') {
            return c;
        }
        var s = "";
        if (c.length == 0) return "";
        s = c.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    }
    function _htmlDecodeSmartViewData(data) {
        var c = '';
        for (var k in data.Data) {
            c = data.Data[k];
            if (c != null) {
                data.Data[k] = _decodeHtmlContent(c);
            }
        }
        if (data.ExtData != null) {
            for (var k in data.ExtData) {
                c = data.ExtData[k];
                if (c != null) {
                    data.ExtData[k] = _decodeHtmlContent(c);
                }
            }
        }
        if (data.ListData != null) {
            var listLen = data.ListData.length;
            for (var i = 0; i < listLen; i++) {
                var listItem = data.ListData[i];
                for (var n in listItem) {
                    c = listItem[n];
                    if (c != null) {
                        data.ListData[i][n] = _decodeHtmlContent(c);
                    }
                }
            }
        }
    }
    function _encodeSmartViewData(data) {
        var decontent = '';
        for (var k in data.Data) {
            try {
                decontent = decodeURIComponent(data.Data[k]);
            } catch (e) {
                decontent = data.Data[k];
            }
            data.Data[k] = encodeURIComponent(decontent);
        }
        if (data.ExtData != null) {
            for (var k in data.ExtData) {
                try {
                    decontent = decodeURIComponent(data.ExtData[k]);
                } catch (e) {
                    decontent = data.ExtData[k];
                }
                data.ExtData[k] = encodeURIComponent(decontent);
            }
        }
        if (data.ListData != null) {
            var listLen = data.ListData.length;
            for (var i = 0; i < listLen; i++) {
                var listItem = data.ListData[i];
                for (var n in listItem) {
                    try {
                        decontent = decodeURIComponent(listItem[n]);
                    } catch (e) {
                        decontent = listItem[n];
                    }
                    data.ListData[i][n] = encodeURIComponent(decontent);
                }
            }
        }
    }
    function _decodeSmartViewData(data) {
        var decontent = '';
        for (var k in data.Data) {
            try {
                decontent = data.Data[k];
                data.Data[k] = decodeURIComponent(decontent);
            } catch (e) {
            }
        }
        if (data.ExtData != null) {
            for (var k in data.ExtData) {
                try {
                    decontent = decodeURIComponent(data.ExtData[k]);
                    data.ExtData[k] = decontent;
                } catch (e) {
                }

            }
        }
        if (data.ListData != null) {
            var listLen = data.ListData.length;
            for (var i = 0; i < listLen; i++) {
                var listItem = data.ListData[i];
                for (var n in listItem) {
                    try {
                        decontent = decodeURIComponent(listItem[n]);
                        data.ListData[i][n] = decontent;
                    } catch (e) {

                    }
                }
            }
        }
    }
    function _isControlFullOutOfContainer($v, $target) {
        var targetId = $target.attr('id');
        var pos = $v.position();
        var h = $v.height(), w = $v.width();
        var $parent = $v.parent();
        var ph = $parent.height(), pw = $parent.width();
        var isTargetIsAreaContainer = $target.hasClass('smvContainer');
        var $tSmv = isTargetIsAreaContainer ? $target : $('#smv_' + $target.attr('cid'));
        var tLeft = $tSmv.position().left;
        var tRight = tLeft + $target.width();
        var tTop = $tSmv.position().top;
        var tBottom = tTop + $target.height();
        if ($parent.hasClass('smvContainer')) {
            return true;
        }
        if (pos.left * -1 >= w || pos.left >= pw || pos.top * -1 >= h || pos.top >= ph) {
            return true;
        }
        //fix fullpage bug code: targetId.indexOf('fullpage')==-1
        if (!isTargetIsAreaContainer && pos.left >= tLeft && pos.left <= tRight && pos.top >= tTop && pos.top <= tBottom && targetId.indexOf('fullpage') == -1) {
            return true;
        }
        return false;
    }

    return {
        getAreaView: function (id) {
            return _getAreaView(id);
        },
        createSmartView: function (pageId, viewType, left, top, parentId, areaId, styleName, colorName, themeColor) {
            createSmartView(pageId,
                viewType,
                left,
                top,
                parentId,
                areaId,
                styleName,
                colorName,
                themeColor,
                onSmartViewCreateSuccess,
                onSmartViewDeleteSuccess);
        },
        createStripView: function (pageId, stripId, left, top, parentId, areaId) {
            createStripView(pageId,
                stripId,
                left,
                top,
                parentId,
                areaId,
                onStripViewCreateSuccess,
                onSmartViewOptionFailed)
        },
        getSmartView: function (id, type) {
            return _getSmartView(id, type);
        },
        getSmartViewWithOutType: function (id) {
            var $obj = $('#' + id);
            return _getSmartViewWithObj($obj);
        },
        getSmartViewData: function (id) {
            var controlData = _getSmartViewData(id, null, "decode");
            return controlData;
        },
        getSmartViewWithJobj: function ($obj) {
            return _getSmartViewWithObj($obj);
        },
        deleteSmartView: function (pageId, controlIds, callBack) {
            if (typeof callBack === "function") {
                deleteSmartView(pageId, controlIds, function (data) {
                    onSmartViewDeleteSuccess(data);
                    callBack();
                }, onSmartViewOptionFailed);
            } else {
                deleteSmartView(pageId, controlIds, onSmartViewDeleteSuccess, onSmartViewOptionFailed);
            }
        },
        merge2SameArea: function () {
            var $views = $('.smart-resize');
            if ($views.length <= 1) {
                return;
            }
            var parentId = null;
            for (var i = 0; i < $views.length; i++) {
                if (parentId === null) {
                    parentId = $views.eq(i).attr("pvid")
                }
                if (parentId != $views.eq(i).attr("pvid")) {
                    return;
                }
            }

            for (var i = 0; i < $views.length; i++) {
                var ctrl = $views.eq(i);
                if (!smartViewFactory.isSmartViewCanAdd('area', ctrl.attr('ctype'))) {
                    return;
                }
            }
            function GetCtrlLayout(list) {
                var arr = [];
                for (var i = 0; i < list.length; i++) {
                    var cssData = smartViewFactory.getSmartViewData(list.eq(i).attr("id")).Css;
                    arr.push({
                        bottom: cssData.offsetY * 1 + cssData.height * 1,
                        height: cssData.height * 1,
                        left: cssData.offsetX * 1,
                        right: cssData.offsetX * 1 + cssData.width * 1,
                        top: cssData.offsetY * 1,
                        width: cssData.width * 1,
                    })
                }
                return arr;
            }

            var layoutList = GetCtrlLayout($views);

            function GetMax(list, fieldName) {
                var num = null;
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var size = item[fieldName];
                    if ((size > num) || (num === null)) {
                        num = size;
                    }
                }
                return num || 0;
            }

            function GetMin(list, fieldName) {
                var num = null;
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var size = item[fieldName];
                    if ((size < num) || (num === null)) {
                        num = size;
                    }
                }
                return num || 0;
            }
            var firstCtrl = $views.eq(0);
            var left = GetMin(layoutList, "left");
            var top = GetMin(layoutList, "top");
            var width = GetMax(layoutList, "right") - left;
            var height = GetMax(layoutList, "bottom") - top;
            width = parseInt(width);
            height = parseInt(height);
            top = parseInt(top);
            left = parseInt(left);
            var self = this;

            function AfterAdd(data) {
                onSmartViewCreateSuccess(data);
                self.drop2Container("smv_" + data.ControlId, $views);
            }
            createSmartView(getCurrentPageId(), 'area', left, top, firstCtrl.attr("pvid"), firstCtrl.attr("areaid"), 'Style1', 'Item0', '', AfterAdd, null, JSON.stringify({
                "$width": width + "px",
                "$height": height + "px",
                "$background-color": "rgba(0, 0, 0, 0)",
                "width": width,
                "height": height,
                "offsetX": left,
                "offsetY": top,
            }));
        },
        bindViewCustomEvents: function ($v) {
            var $view = _getSimpleSmartViewWithObj($v);
            if ($view) {
                $view.bindCustomEvents();
            } else {
                console.info('该控件不存在:', $v)
            }
        },
        pasteSmartViews: function (controlData) {
            pasteSmartView(controlData, onPastedSuccess, onSmartViewOptionFailed);
        },
        rollSmartView: function (successCallback, errorCallback) {
            var selectedCtrl = $('.smart-resize');
            if (selectedCtrl.length == 1) {
                var ctrlId = selectedCtrl.eq(0).attr('id').replace('smv_', '');
                var successCallbackFunc = onRollSuccess;
                if (successCallback) {
                    successCallbackFunc = function (data) {
                        onRollSuccess(data);
                        successCallback()
                    }
                }
                var errorCallbackFunc = onSmartViewOptionFailed;
                if (errorCallback) {
                    errorCallbackFunc = function (data) {
                        onSmartViewOptionFailed(data);
                        errorCallback()
                    }
                }
                rollSmartView(ctrlId, successCallbackFunc, errorCallbackFunc);
            }
        },
        editSmartView: function (pageId, controlId, viewType, styleName, colorName) {
            editSmartView(pageId, controlId, viewType, styleName, colorName, onSmartViewEditSuccess, null);
        },
        showSmartViewStyleChange: function (pageId, controlId, viewType, styleName, colorName) {
            editSmartView(pageId, controlId, viewType, styleName, colorName, onshowSmartViewChange, null);
        },
        enableDrag: function (controlId) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.enableDrag();
        },
        disableDrag: function (controlId) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.disableDrag();
        },
        locked: function (controlId) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.locked();
        },
        disableLocked: function (controlId) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.disableLocked();
        },
        setFullScreen: function (controlId) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.setFullScreen();
        },
        cancelFullScreen: function (controlId) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.cancelFullScreen();
        },
        changeSmartViewCss: function (controlId, key, val) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.setCss(key, val, null);
            $smView.refreshCss();
        },

        changeSmartViewData: function (controlId, key, val, needRefresh, cbFun) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            if (key === 'ListData') {
                $smView.setListData(key, val, needRefresh, cbFun);
            } else {
                $smView.setData(key, val, needRefresh, cbFun);
            }
        },
        changeSmartViewExtData: function (controlId, key, val, needRefresh, cbFun) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.setExtData(key, val, needRefresh, cbFun);
        },
        changeSmartViewStyle: function (controlId, styleName, colorName) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.changeStyle(styleName, colorName);
        },
        changeSmartViewThemeColor: function (controlId, themeColor) {
        },
        refreshSmartView: function (controlId, callback) {
            var $obj = $('#' + controlId);
            var $smView = _getSmartViewWithObj($obj);
            $smView.refreshView(callback);
        },
        // 批量保存滤镜图片
        batchSaveFilterImageForSmartView: function (successFn, failFn, saveTitle) {
            if (saveTitle == "自动备份") {
                return successFn();
            }
            // save
            var pictureLish = [];
            var $changedImgViews = $('.smc[ctype="image"]', '#smart-body');
            $changedImgViews.each(function (i, element) {
                var smartView = smartViewFactory.getSmartViewWithOutType(element.id);
                var $img = smartView.$control.find('img');
                var src = $img.attr('src');
                // base64 临时图片待转正
                if (/^data:image\/(png|jpeg);base64,/.test(src.substring(0, 30))) {
                    var name = $img.attr('filter-preset-name');
                    //var title = smartView.getData('PictureTitle');
                    pictureLish.push({
                        TempId: element.id,
                        Base64Data: src,
                        //Title: title ? (decodeURIComponent(title) + '-' + name) : ('滤镜调节-' + name)
                        Title: '滤镜调节-' + name
                    });

                    (function () {
                        var names = name.split('-');
                        if (names[0] == '蒙层') {
                            window.gtag && gtag('event', '图片设置', {
                                'event_category': '图片设置',
                                'event_action': '滤镜调节',
                                'event_label': '无'
                            });
                            window.gtag && gtag('event', '图片设置', {
                                'event_category': '图片设置',
                                'event_action': '蒙层',
                                'event_label': '打开'
                            });
                        } else {
                            console.log('滤镜调节', names[0])
                            window.gtag && gtag('event', '图片设置', {
                                'event_category': '图片设置',
                                'event_action': '滤镜调节',
                                'event_label': names[0]
                            });

                            if (names[1] == '蒙层') {
                                window.gtag && gtag('event', '图片设置', {
                                    'event_category': '图片设置',
                                    'event_action': '蒙层',
                                    'event_label': '打开'
                                })
                            } else {
                                window.gtag && gtag('event', '图片设置', {
                                    'event_category': '图片设置',
                                    'event_action': '蒙层',
                                    'event_label': '关闭'
                                });
                            }
                        }

                    })()

                }

                // customFastSettingImage
            });
            if (pictureLish.length > 0) {
                batchSaveFilterImage(pictureLish, successFn, failFn)
            } else {
                successFn()
            }
        },
        savePageSmartViewChanges: function (pageId, funcSuccess, funcError, saveTitle) {

            smartViewFactory.batchSaveFilterImageForSmartView(
                function () {
                    var cArray = [];
                    var $changedViews = $('.smc', '#smart-body');
                    $changedViews.each(function (i, e) {
                        var $e = $(e);
                        var item = {
                        };
                        item.id = $e.attr('id');
                        item.x = parseInt($e.position().left, 10);
                        item.y = parseInt($e.position().top, 10);
                        item.areaId = $e.attr('areaid');
                        item.type = $e.attr('ctype');
                        item.pageId = $e.attr('cpid');
                        item.parentId = $e.attr('pvid');
                        if (typeof (item.parentId) == 'undefined') {
                            item.parentId = '';
                        }
                        var viewData = smartViewFactory.getSmartViewData(item.id);
                        item.Css = viewData.Css;
                        item.Data = viewData.Data;
                        item.ListData = viewData.ListData;
                        item.ExtData = viewData.ExtData;
                        //fix text bug
                        if (item.type !== 'text') {
                            _encodeSmartViewData(item);
                        }
                        cArray.push(item);
                    });
                    var aArray = [];
                    var $changedAreas = $('.avc', '#smart-body');
                    $changedAreas.each(function (i, e) {
                        var $e = $(e);
                        var areaId = $e.attr('id');
                        var areaData = JSON.parse($('#data_' + areaId).html());
                        areaData.areaId = areaId.split('_')[1];
                        aArray.push(areaData);
                    });

                    var controlData = JSON.stringify(cArray);
                    var areaData = JSON.stringify(aArray);
                    saveAllSmartViewsChanges(pageId,
                        controlData,
                        areaData,
                        function (data) {
                            if (saveTitle != "自动备份") {
                                $changedViews.removeClass('smc');
                                $changedAreas.removeClass('avc');
                            }

                            if (saveTitle != "自动备份" && saveTitle != "自动保存") {
                                
                                if(smartViewFactory.storage.deviceMode === 'Pc') {
                                    window.parent.nsmart.hideCtrlTab();
                                } else {
                                    window.parent.nsmart.hideRightPanel();
                                }
                            }


                            if (funcSuccess != null) {
                                funcSuccess(data);
                            }
                        },
                        funcError,
                        saveTitle);
                },
                funcError,
                saveTitle
            );

        },
        setCurrentWaitAddView: function (t) {
            var vw = {
            };
            vw.type = t;
            vw.styleName = 'Style1';
            vw.colorName = 'Item0';
            _setCurrentWaitAddView(vw);
        },
        setWaitAddView: function (t, s, c, tc) {
            var vw = {
            };
            vw.type = t;
            vw.styleName = s;
            vw.colorName = c;
            vw.themeColor = tc;
            _setCurrentWaitAddView(vw);
        },
        //目标控件,来源控件,样式名称
        isSmartViewCanAdd: function (dType, sType, styleName) {
            return _isSmartViewCanAdd(dType, sType, styleName);
        },
        getCurrentWaitAddView: function () {
            return _currentSelectedVType;
        },
        getRelativePosition: function ($view) {
            return _getRelativePosition($view);
        },
        clearCurrentWaitAddView: function () {
            _clearCurrentWaitAddView();
        },
        /*绑定容器单击事件*/
        bindContainerClick: function (pageId, event) {
            var wv = _getCurrentWaitAddView();
            if (wv != null) {
                _clearCurrentWaitAddView();
            }
            var $target = $(event.currentTarget);
            _recordContinerPosition(event, $target);
            if (wv == null || typeof (event.offsetX) === 'undefined') {
                return true;
            }
            var viewType = wv.type;
            var smrPos = _getLastClickSmPos();
            var left = parseInt(event.offsetX + smrPos.x);
            var top = parseInt(event.offsetY + smrPos.y);
            _clearLastClaickSmPos();
            var smType = $('#smv_' + $target.attr('cid')).attr('ctype');
            
            if (!_isSmartViewCanAdd(smType, viewType, wv.styleName)) {
                _clearCurrentWaitAddView();
                alert('不能把控件添加到该位置');
                return true;
            }
            var areaId = $target.attr("id");
            var areaArray = areaId.split('_');
            areaId = areaArray[1];
            var prex = areaArray[0];
            if (areaId === "Main") {
                areaId = "";
            }
            if (prex === "smv") {
                var tareaId = $target.attr('tareaid');
                if (typeof (tareaId) != 'undefined') {
                    areaId = tareaId;
                    left += parseInt($target.position().left);
                    top += parseInt($target.position().top);
                }
                if (wv.styleName !== 'strip') {
                    createSmartView(pageId,
                        viewType,
                        left,
                        top,
                        "",
                        areaId,
                        wv.styleName,
                        wv.colorName,
                        wv.themeColor,
                        onSmartViewCreateSuccess,
                        onSmartViewDeleteSuccess);
                } else {
                    createStripView(pageId,
                        viewType,
                        left,
                        top,
                        "",
                        areaId,
                        onStripViewCreateSuccess,
                        onSmartViewOptionFailed);
                }
            } else {
                var parentId = $target.attr("cid");
                if (wv.styleName !== 'strip') {
                    createSmartView(pageId,
                        viewType,
                        left,
                        top,
                        parentId,
                        areaId,
                        wv.styleName,
                        wv.colorName,
                        wv.themeColor,
                        onSmartViewCreateSuccess,
                        onSmartViewDeleteSuccess);
                } else {
                    createStripView(pageId,
                        viewType,
                        left,
                        top,
                        parentId,
                        areaId,
                        onStripViewCreateSuccess,
                        onSmartViewOptionFailed);
                }
            }
            return true;
        },
        // 绑定容器调整高度功能
        bindContainerResizable: function ($e) {
            $e.find('.smAreaC').each(function () {
                var $Container = $(this);
                if ($Container.hasClass("smContainer-resizeable")) {
                    var $sizeBox = null;
                    $Container.resizable({
                        handles: "s",
                        helper: "ui-resizable-helper",
                        minHeight: 50,
                        create: function (event, ui) {
                            $Container.addClass("smart-item-resize").children(".ui-resizable-handle").show().css("cursor", " row-resize");
                        },
                        start: function (event, ui) {
                            $sizeBox = $("<span></span>");
                            $sizeBox.css({
                                "z-index": 9999,
                                position: "absolute",
                                padding: "4px 6px",
                                background: "rgba(0,0,0,.2)",
                                color: "#fff",
                                "border-radius": "4px",
                                "box-shadow": "0 0 10px rgba(0,0,0,.2)",
                                transition: "left 100ms, top 100ms",
                                left: event.pageX + 20,
                                top: event.pageY - 20
                            }).text('h:' + ui.size.height);
                            $("body").append($sizeBox);

                        },
                        resize: function (event, ui) {
                            $sizeBox.css({
                                left: event.pageX + 20,
                                top: event.pageY - 20
                            }).text('h:' + ui.size.height);
                        },
                        stop: function (event, ui) {
                            $sizeBox.remove();
                            var $view = _getSmartViewWithObj($e);
                            if ($view.onContainerStopResize) {
                                $view.onContainerStopResize(event, ui);
                            }

                        }
                    });
                    $Container.click(function () {
                        $(this).children(".ui-resizable-handle").show();
                    })
                }
            })


        },
        recordLastClickSmPos: function (tg) {
            _recordLastClickSmPos(tg);
        },
        drop2Container(containerCtrlId, ctrl2Move) {
            var containerDroppableDom = $('#' + containerCtrlId).find(".ui-droppable");
            var firstCtrl = ctrl2Move.eq(0); //current draggable
            var dType = firstCtrl.attr('ctype'); //drag banner,fullpage,slidest not trigger dropable
            var smStyleName = firstCtrl.attr('cstyle');
            if (dType === 'banner' || dType === 'fullpage' || dType === 'slideset') {
                return;
            }
            var targetType = $('#smv_' + containerDroppableDom.attr('cid')).attr('ctype');
            if (!_isSmartViewCanAdd(targetType, dType, smStyleName)) {
                return;
            }
            var ttAreaId = ''; //模板area编号
            var pvid = '';
            var careaId = ''; //目标对象area编号
            if (containerDroppableDom.hasClass('smvContainer')) {
                ttAreaId = containerDroppableDom.attr('id').split('_')[1];
            } else {
                pvid = containerDroppableDom.attr('cid');
                ttAreaId = $('#smv_' + pvid).attr('tareaid');
                if (containerDroppableDom.hasClass('smAreaC')) {
                    careaId = containerDroppableDom.attr('id').split('_')[1];
                }
            }
            if (ttAreaId === '') {
                //当拖动目标所在的模板area为空，说明所在的页面是内容页
                ttAreaId = 'Main';
            }

            var ctAreaId = firstCtrl.attr('tareaid'); //模板area编号
            if (ctAreaId === '') {
                //如果ctAreaId为空，代表是在内容页
                ctAreaId = "Main";
            }
            ctrl2Move.each(function (i, e) {
                var ctrl = $(e);
                if (_isControlFullOutOfContainer(ctrl, containerDroppableDom)) {
                    var ctrlPos = _getRelativePosition(ctrl);
                    var parentPos = null;
                    var isSame = false;
                    if (containerDroppableDom.hasClass('smAreaC')) {
                        var $targetParent = $('#smv_' + containerDroppableDom.attr('cid'));
                        if ($targetParent.length === 1) {
                            if ($targetParent.selector == "#" + ctrl.attr("id")) {
                                isSame = true;
                            }
                            parentPos = _getRelativePosition($targetParent);
                            var smartView = _getSmartViewWithObj($targetParent);
                            parentPos.target = containerDroppableDom;
                            smartView.fixControlPosition(parentPos);
                            parentPos.target = null;
                        }
                    } else {
                        parentPos = _getRelativePosition(containerDroppableDom);
                    }
                    var left = parseInt(ctrlPos.x - parentPos.x);
                    if (left < 0) {
                        left = 0;
                    }
                    var top = parseInt(ctrlPos.y - parentPos.y);
                    if (top < 0) {
                        top = 0;
                    }
                    var $tarea = null;
                    if (careaId !== '' && typeof (careaId) !== 'undefined') {
                        $tarea = containerDroppableDom;
                    } else {
                        $tarea = $('#smv_' + ctAreaId);
                    }
                    var tareaHeight = $tarea.height();
                    if (top > tareaHeight) {
                        top = tareaHeight;
                    }
                    if (!isSame) {
                        ctrl.attr('pvid', pvid);
                        ctrl.appendTo(containerDroppableDom);
                        if (careaId !== '' && typeof (careaId) !== 'undefined') {
                            ctrl.attr('areaid', careaId);
                        } else {
                            ctrl.attr('areaid', '');
                        }
                        ctrl.attr('drpc', '1');
                        var redrection = ctrl.attr('re-direction');
                        var view = _getSmartViewWithObj(ctrl);
                        view.setPosition(left, top);
                        //if (redrection !== 'y') {
                        //    view.setPosition(left, top);
                        //} else {
                        //    view.setTop(left);
                        //}
                    } else {
                        setTimeout(function () {
                            $('.smart-resize').removeClass("smart-resize");
                        },
                            200);
                    }
                }
            });
        },

        onContainerDroppable: function (pageId, event, ui) {
            var $target = $(event.target);
            var $d = ui.draggable; //current draggable
            var dType = $d.attr('ctype'); //drag banner,fullpage,slidest not trigger dropable
            var smStyleName = $d.attr('cstyle');
            if (dType === 'banner' || dType === 'fullpage' || dType === 'slideset') {
                return;
            }
            var targetType = $('#smv_' + $target.attr('cid')).attr('ctype');
            if (!_isSmartViewCanAdd(targetType, dType, smStyleName)) {
                return;
            }
            var ttAreaId = ''; //模板area编号
            var pvid = '';
            var careaId = ''; //目标对象area编号
            if ($target.hasClass('smvContainer')) {
                ttAreaId = $target.attr('id').split('_')[1];
            } else {
                pvid = $target.attr('cid');
                ttAreaId = $('#smv_' + pvid).attr('tareaid');
                if ($target.hasClass('smAreaC')) {
                    careaId = $target.attr('id').split('_')[1];
                }
            }
            if (ttAreaId === '') {
                //当拖动目标所在的模板area为空，说明所在的页面是内容页
                ttAreaId = 'Main';
            }

            var oldPvid = $d.attr('pvid');
            var ctAreaId = $d.attr('tareaid'); //模板area编号
            var oldCareaId = $d.attr('areaid');
            if (ctAreaId === '') {
                //如果ctAreaId为空，代表是在内容页
                ctAreaId = "Main";
            }
            var needRefreshPosition = false;
            if ((pvid !== oldPvid && ctAreaId === ttAreaId) ||
                (pvid !== '' && pvid == oldPvid && careaId != oldCareaId)) {
                needRefreshPosition = true;
            }
            var sel = $('.smart-resize');
            sel.each(function (i, e) {
                var $dd = $(e);
                if (needRefreshPosition && _isControlFullOutOfContainer($dd, $target)) {
                    var p = _getRelativePosition($dd);
                    var pp = null;
                    var isSame = false;
                    if ($target.hasClass('smAreaC')) {
                        var $targetParent = $('#smv_' + $target.attr('cid'));
                        if ($targetParent.length === 1) {
                            if ($targetParent.selector == "#" + $dd.attr("id")) {
                                isSame = true;
                            }
                            pp = _getRelativePosition($targetParent);
                            var smartView = _getSmartViewWithObj($targetParent);
                            pp.target = $target;
                            smartView.fixControlPosition(pp);
                            pp.target = null;
                        }
                    } else {
                        pp = _getRelativePosition($target);
                        //if (oldPvid !== '') {
                        //    var parentSmartView = _getSmartViewWithObj($('#smv_' + oldPvid));
                        //    if (typeof parentSmartView !== 'undefined') {
                        //        //pp.target = $target;
                        //        parentSmartView.fixControlPosition(pp);
                        //        pp.target = null;
                        //    }
                        //}
                    }
                    var left = parseInt(p.x - pp.x);
                    if (left < 0) {
                        left = 0;
                    }
                    var top = parseInt(p.y - pp.y);
                    if (top < 0) {
                        top = 0;
                    }
                    var $tarea = null;
                    if (careaId !== '' && typeof (careaId) !== 'undefined') {
                        $tarea = $target;
                    } else {
                        $tarea = $('#smv_' + ctAreaId);
                    }
                    var tareaHeight = $tarea.height();
                    if (top > tareaHeight) {
                        top = tareaHeight;
                    }
                    if (!isSame) {
                        $dd.attr('pvid', pvid);
                        $dd.appendTo($target);
                        if (careaId !== '' && typeof (careaId) !== 'undefined') {
                            $dd.attr('areaid', careaId);
                        } else {
                            $dd.attr('areaid', '');
                        }
                        $dd.attr('drpc', '1');
                        var redrection = $dd.attr('re-direction');
                        var view = _getSmartViewWithObj($dd);
                        view.setPosition(left, top);
                        //if (redrection !== 'y') {
                        //    view.setPosition(left, top);
                        //} else {
                        //    view.setTop(left);
                        //}
                    } else {
                        setTimeout(function () {
                            $('.smart-resize').removeClass("smart-resize");
                        },
                            200);
                    }
                }
            });

        },
        isFirstTime: true,
        initDesignerEvent: function () {
            _addAreaBorder();
            _bindDropableEvent();
            bindSmartEnvents(".smvContainer .smartAbs", "n,e,s,w,ne,se,sw,nw");
            if (this.isFirstTime) {
                $('#smart-body,.smvContainer').click(function () {
                    //如果框选命中控件，就不释放选择操作
                    if (!cnsmart.selectBox.isHit) {
                        clearSelectViews();
                    } else {
                        cnsmart.selectBox.isHit = false;
                    }
                    var $this = $(this);
                    hideConFastPropPanel();
                    hideSmDegreeLayer();
                    if(smartViewFactory && smartViewFactory.storage && smartViewFactory.storage.deviceMode === 'Pc'){
                        // 关闭设置面板
                        window.parent.nsmart.hideCtrlTab();
                    }

                });
                initPageContextMenu();
                bindPageContextMenu();
                initContextMenu();
                bindContextMenu('.smart-resize');
                $("img.lazyload").lazyload({
                    skip_invisible: false,
                    effect: "fadeIn",
                    failure_limit: 15,
                    threshold: 100
                });
                //设计器内文字控件a标签链接保持不变并阻止跳转
                $('a:not(.aIgnore)').each(function (index, item) {
                    if ($(item).parents('[ctype="text"]').length) {
                        $(item).on('click', function () {
                            return false
                        })
                    } else {
                        //$(item).attr('href', 'javascript:void(0)')
                        // fix 点击打开空页面
                        $(item).removeAttr('href')
                    }
                })
                cnsmart.ruler.bindXHelpLineEvent();
                cnsmart.ruler.bindYHelpLineEvent();
                initSmRotateEvent();
                _initFastSettingEvent();
                $('.animated').smanimate();

                // 内容导入成功后刷新页面，定位到页面底部
                if (localStorage.getItem('importContentSuccess') === 'true') {
                    var oldHeight = localStorage.getItem('ImportContent_PageOldHeight');
                    if (oldHeight != undefined && parseInt(oldHeight) > 0) {
                        window.scrollTo(0, parseInt(oldHeight));
                    } else {
                        window.scrollTo(0, $('#smart-body').height());
                    }
                    localStorage.removeItem('importContentSuccess');
                    localStorage.removeItem('ImportContent_PageOldHeight');
                }
            } else {
                // 如果新的DOM具有smart-resize类，需要激活元素点击事件
                // fix: 撤销恢复更新dom时，smart-resize子控件的.ui-resizeable-handle不应该显示出来
                $('.smart-resize').click();
            }
            cnsmart.selectBox.init();
            this.isFirstTime = false;
        },
        clearCopyCache: function () {
            $.localStorage.remove('sm_copy');
        },
        setTemplateLayout: function (pageId) {
            var fun = window.parent.pageManage.headerfooter.edit.openEditPanel;
            if (typeof fun === 'function') {
                fun(pageId);
            }
        },
        encodeSmartViewData: function (data) {
            _encodeSmartViewData(data);
        },
        fixArea1Height: function (newH) {
            _fixArea1Height(newH);
        },
        fixAreaMainHeight: function (newH) {
            _fixAreaMainHeight(newH);
        },
        fixMainHeight: function (newH) {
            $('#smv_Main').height(newH);
        },
        hideFastPropPanel: function () {
            hideConFastPropPanel();
        },
        hideMainBottomSetting: function () {
            $('#slinebottom_smv_Main').hide();
            $('#smv_Main').css({ "margin-bottom": "0px" });
        },
        showMainBottomSetting: function () {
            $('#slinebottom_smv_Main').show();
            $('#smv_Main').css({ "margin-bottom": "80px" });
        },
        getWaitDelViewIds: function (views) {
            var idArray = new Array();
            views.each(function (i) {
                var $this = $(this);
                var isContainer = $this.attr('iscontainer');
                if (isContainer === 'True') {
                    var $child = $this.find('.esmartMargin');
                    $child.each(function () {
                        var $c = $(this);
                        idArray.push($c.attr('id').replace(/smv_/, ''))
                    });
                }
                idArray.push($this.attr('id').replace(/smv_/, ''))
            });
            return idArray.join(',');
        },
        afterAreaHeightChanged: function (area) { },

        redoConfig: {
            maxLevel: 20,
            ctrlMap: {
                "companyinfo": "公司信息",
                "companyIntroduction": "公司介绍",
                "image": "单张图片",
                "slide": "多图轮播",
                "slideset": "多图轮播",
                "altas": "多图列表",
                "logoimage": "Logo图片",
                "qrcode": "二维码",
                "qqservice": "联系浮窗",
                "video": "视频",
                "map": "地图",
                "category": "分类",
                "search": "搜索",
                "leaveword": "留言板",
                "comment": "评论区",
                "share": "分享",
                "music": "音乐",
                "login": "登录",
                "register": "会员注册",
                "loginstatu": "登录状态",
                "cart": "购物车",
                "favorites": "收藏夹",
                "nav": "导航",
                "breadcrumb": "面包屑",
                "languages": "语言切换",
                "browserdevice": "手机/PC切换",
                "utine-button": "按钮",
                "line": "线条",
                "banner": "自适应布局",
                "multicolumn": "多栏布局",
                "tab": "标签布局",
                "fullpage": "全屏排版",
                "dialog": "弹出窗口",
                "area": "容器",
                "baiduBridge": "爱番番",
                "newsItemTitleBind": "文章标题",
                "newsItemSummaryBind": "文章简介",
                "newsItemContentBind": "文章详情",
                "newsItemPreviousBind": "上一篇文章",
                "newsItemNextBind": "下一篇文章",
                "productSlideBind": "产品幻灯",
                "productTitleBind": "产品标题",
                "productSummaryBind": "产品简介",
                "productContentBind": "产品详情",
                "productPreviousBind": "上一个产品",
                "productNextBind": "下一个产品",
                "productCurrentPriceBind": "产品现价",
                "productOriginalPriceBind": "产品原价",
                "productSpecificationsBind": "产品规格",
                "cartQuantity": "购买数量",
                "cartSubmitButton": "购买按钮",
                "text": "文字",
                "alivideo": "阿里云视频",
                "baiduMap": "百度地图",
                "button": "按钮",
                "code": "代码",
                "codeCnzz": "CNZZ",
                "companyInfo": "公司信息",
                "formpanel": "表单",
                "listfile": "文件列表",
                "listnews": "文章列表",
                "listnewscategory": "文章分类结果列表",
                "listnewssearch": "文章搜索结果列表",
                "listproduct": "产品列表",
                "listproductcategory": "产品分类结果列表",
                "listproductsearch": "产品搜索结果列表",
                "navcontainer": "导航容器",
                "multinav": "多级导航",
                "newsItemCategoryCrumbs": "文章分类面包屑",
                "newsItemCreatedDatetimeBind": "文章创建时间",
                "newsItemCrumbsBind": "文章所在位置&分类",
                "newsItemFavoritesBind": "收藏文章",
                "newsItemHitsBind": "文章浏览量",
                "newsitemtitlebind": "文章标题",
                "productCategoryCrumbs": "产品分类面包屑",
                "productCreatedDatetimeBind": "产品创建时间",
                "productCrumbsBind": "产品所在位置&分类",
                "productFavoritesBind": "收藏产品",
                "productHitsBind": "产品浏览量",
                "productParameterBind": "产品参数",
                "productRelateBind": "相关产品",
                "fullpageSlide": "多图轮播（可加视频）",
                "flexiblePanel": "折叠面板",
            },
        },
        isMacOs: function () {
            return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        },
        //mousetrap在iframe中调用父级页面时传入数组会异常
        bindShortKey: function (mousetrap, keys, func, keyEvent) {
            if (typeof keys === "string") {
                if (typeof keyEvent !== "undefined") {
                    mousetrap.bind(keys, func, keyEvent);
                } else {
                    mousetrap.bind(keys, func);
                }
            } else {
                for (var i = 0; i < keys.length; i++) {
                    mousetrap.bind(keys[i], func);
                }
            }
        },
        initMousetrap: function (mousetrap) {
            this.bindShortKey(mousetrap,
                ['ctrl+a', 'command+a'],
                function (e) {
                    // 图片遮罩触发完成操作
                    $('#img_Clip_Complete_Btn').click();
                    var mainFlag = "#smv_Main";
                    var isTemplatePage = $(mainFlag).length === 0;

                    //todo 只选中一个容器时,全选容器的所有子级
                    //var selectItems = $('.smart-resize');

                    //if (selectItems.length === 1 && selectItems.eq(0).attr("iscontainer") === "True") {


                    //}

                    $(isTemplatePage ? "[id^=smv_Area]" : mainFlag).children('.smartAbs').each(function () {
                        var $this = $(this);
                        var pvid = $this.attr('pvid');
                        if (pvid === '') {
                            $this.addClass("smart-resize").children('.ui-resizable-handle').show();
                        }
                    });

                    onSelecteClearOtherSmartViewsEffect();
                    return false;
                });
            this.bindShortKey(mousetrap,
                ['ctrl+c', 'command+c'],
                function () {
                    // 图片遮罩触发完成操作
                    $('#img_Clip_Complete_Btn').click();
                    copySmartViews('.smart-resize');
                    return false;
                });

            /*this.bindShortKey(mousetrap, ['ctrl+v', 'command+v'], shortCut.ctrlV);*/

            this.bindShortKey(mousetrap, ['shift+c'], smartViewFactory.copyStyle);
            this.bindShortKey(mousetrap, ['shift+v'], shortCut.shiftV);
            this.bindShortKey(mousetrap, ['alt+v'], shortCut.altV);

            this.bindShortKey(mousetrap, ['alt+r'], smartViewFactory.rollSmartView);
            this.bindShortKey(mousetrap, ['ctrl+z', 'command+z'], shortCut.ctrlZ);

            this.bindShortKey(mousetrap, ['ctrl+y', 'command+shift+z'], shortCut.ctrlY);

            this.bindShortKey(mousetrap, ['ctrl+s', 'command+s'], shortCut.savePage);
            this.bindShortKey(mousetrap, ['ctrl+up', 'command+up'], shortCut.merge2SameArea);
            this.bindShortKey(mousetrap, ['shift+l'], window.parent.nsmart.showHierarchical);

            this.bindShortKey(mousetrap, ['alt+p'], function () {
                if (typeof (MobileSimulator) !== "undefined") {
                    MobileSimulator.SwitchSimulatorStatus();
                }

            });
            this.bindShortKey(mousetrap,
                ["backspace", "del", "shift+del"],
                function (e) {
                    var $views = $('.smart-resize');
                    var pageId = '';
                    var controlIds = '';
                    var len = $views.length;
                    if (len > 0) {
                        pageId = $views.first().attr('cpid');
                        controlIds = smartViewFactory.getWaitDelViewIds($views);
                        smartViewFactory.deleteSmartView(pageId, controlIds);
                    }
                });

            this.bindShortKey(mousetrap, ['shift+h'], shortCut.showLog);

            this.bindShortKey(mousetrap, ['shift+enter'], shortCut.ctrlStandardDetect);

            this.bindShortKey(mousetrap,
                'up',
                function (et) {
                    smartViewFactory.storage.isMoving = false;
                },
                'keyup');
            this.bindShortKey(mousetrap,
                'left',
                function (et) {
                    smartViewFactory.storage.isMoving = false;
                },
                'keyup');
            this.bindShortKey(mousetrap,
                'right',
                function (et) {
                    smartViewFactory.storage.isMoving = false;
                },
                'keyup');
            this.bindShortKey(mousetrap,
                'down',
                function (et) {
                    smartViewFactory.storage.isMoving = false;
                },
                'keyup');

            this.bindShortKey(mousetrap,
                'up',
                function (et) {
                    // 图片遮罩触发完成操作
                    $('#img_Clip_Complete_Btn').click();
                    if (!smartViewFactory.storage.isMoving) {
                        smartViewFactory.beforeModify({ desc: "向上移动" });
                        smartViewFactory.storage.isMoving = true;
                    }

                    $('.smart-resize').each(function (i, e) {
                        var $e = $(e);
                        var newTop = parseInt($e.css('top'));
                        newTop = isNaN(newTop) ? 0 : newTop - 1;
                        if (newTop < 0) {
                            newTop = 0;
                        }
                        var newH = newTop + $e.height();
                        $e.css({
                            'top': newTop
                        });
                        var smartView = smartViewFactory.getSmartViewWithOutType($e.attr('id'));
                        smartView.setTop(newTop);
                    });
                    if (et.preventDefault) {
                        et.preventDefault();
                    } else {
                        et.returnValue = false;
                    }
                    return false;
                });
            this.bindShortKey(mousetrap,
                'down',
                function (et) {
                    // 图片遮罩触发完成操作
                    $('#img_Clip_Complete_Btn').click();

                    if (!smartViewFactory.storage.isMoving) {
                        smartViewFactory.beforeModify({ desc: "向下移动" });
                        smartViewFactory.storage.isMoving = true;
                    }
                    $('.smart-resize').each(function (i, e) {
                        var $e = $(e);
                        var newTop = parseInt($e.css('top'));
                        newTop = isNaN(newTop) ? 0 : newTop + 1;
                        var newH = newTop + $e.height();
                        $(e).css({
                            'top': newTop
                        });
                        var smartView = smartViewFactory.getSmartViewWithOutType($e.attr('id'));
                        smartView.setTop(newTop);
                        var areaId = smartView.$control.attr('areaid');
                        var pvid = smartView.$control.attr('pvid');
                        var isNeedChangeArea = true;
                        if (typeof (pvid) != 'undefined' && pvid !== '') {
                            isNeedChangeArea = false;
                        }
                        if (isNeedChangeArea) {
                            if (areaId === '') {
                                areaId = 'smv_Main';
                            } else {
                                areaId = "smv_" + areaId;
                            }
                            var data = $('#data_' + areaId).html();
                            var areaData = JSON.parse(data);
                            var area = new AreaInfo(areaId, areaData);
                            smartView.changeArea(area, newH, true);
                        }
                    });
                    if (et.preventDefault) {
                        et.preventDefault();
                    } else {
                        et.returnValue = false;
                    }
                    return false;
                });
            this.bindShortKey(mousetrap,
                'left',
                function (et) {
                    // 图片遮罩触发完成操作
                    $('#img_Clip_Complete_Btn').click();

                    if (!smartViewFactory.storage.isMoving) {
                        smartViewFactory.beforeModify({ desc: "向左移动" });
                        smartViewFactory.storage.isMoving = true;
                    }
                    $('.smart-resize').each(function (i, e) {
                        var $e = $(e);
                        var left = parseInt($e.css('left'));
                        left = isNaN(left) ? 0 : left;
                        var smartView = smartViewFactory.getSmartViewWithOutType($e.attr('id'));
                        var newLeft = left - 1;
                        $(e).css({ 'left': newLeft });
                        smartView.setLeft(newLeft);
                    });
                    if (et.preventDefault) {
                        et.preventDefault();
                    } else {
                        et.returnValue = false;
                    }
                    return false;
                });
            this.bindShortKey(mousetrap,
                'right',
                function (et) {
                    // 图片遮罩触发完成操作
                    $('#img_Clip_Complete_Btn').click();

                    if (!smartViewFactory.storage.isMoving) {
                        smartViewFactory.beforeModify({ desc: "向右移动" });
                        smartViewFactory.storage.isMoving = true;
                    }
                    $('.smart-resize').each(function (i, e) {
                        var $e = $(e);
                        var $e = $(e);
                        var left = parseInt($e.css('left'));
                        left = isNaN(left) ? 0 : left;
                        var smartView = smartViewFactory.getSmartViewWithOutType($e.attr('id'));
                        var newLeft = left + 1;
                        $(e).css({ 'left': newLeft });
                        smartView.setLeft(newLeft);
                    });
                    if (et.preventDefault) {
                        et.preventDefault();
                    } else {
                        et.returnValue = false;
                    }
                    return false;
                });


        },
        //撤销恢复
        storage: {
            isMoving: false,
            notRefreshTempData: false,
            disableHandleHistory: false,
            handleHistory: [],
            isDeletingIdList: [],
            lastTempPageIdIndex: 0,
            redoIndex: -1,
            tempPageIdList: [],
            tempData: null,
            sliderList: {},
            hasLoadModal: false,
            deviceMode: null,
            languageCulture: null
        },
        initRedoPage: function () {
            this.beforeModify({ desc: "进入", controlType: "页面", ctrlId: null, suffix: "", refreshTempData: true });
            this.initMousetrap(Mousetrap);
            this.initMousetrap(window.parent.window.Mousetrap);
        },
        getLastTempPageId: function () {
            return this.storage.tempPageIdList[this.storage.lastTempPageIdIndex];
        },
        getAllControlList: function (body) {
            var list = body.find("[id^='smv_con_']");
            list.push.apply(list, body.find("[id^='smv_tem_']"));
            return list;
        },
        backUpPage: function (opt) {
            var redoInfo = this.initRedoInfo(opt);
            this.backUpPageByData(redoInfo);
            this.refreshHandleLogDisplayStatus(true);
            return redoInfo;
        },
        backUpPageByData: function (redoInfo) {
            this.storage.handleHistory.splice(this.storage.redoIndex + 1);
            this.storage.handleHistory.push(redoInfo);
            if (this.storage.handleHistory.length > this.redoConfig.maxLevel) {
                this.storage.handleHistory = this.storage.handleHistory.splice(this.storage.handleHistory.length - this.redoConfig.maxLevel);
            }
            // this.refreshHandleLogDisplayStatus();
        },
        refreshHandleLogDisplayStatus: function (notRefresAI) {

            var ctrlZCanDo = this.canCtrlZ();
            if (ctrlZCanDo) {
                $(window.parent.document.body).find("#ctrl_z").removeClass('disabled');
            } else {
                $(window.parent.document.body).find("#ctrl_z").addClass('disabled');
            }

            var ctrlYCanDo = this.canCtrlY();
            if (ctrlYCanDo) {
                $(window.parent.document.body).find("#ctrl_y").removeClass('disabled');
            } else {
                $(window.parent.document.body).find("#ctrl_y").addClass('disabled');
            }
            window.parent.nsmart.refreshHandleLog();

            if (!notRefresAI) {
                 window.parent.wzAiHelp && window.parent.wzAiHelp.fire('wz-refres-history');
            }
        },
        recoverCurrentPage2LastRecord: function () {
            if (this.storage.handleHistory.length > 0) {
                var lastRecord = this.storage.handleHistory[this.storage.handleHistory.length - 1];
                var backData = this.getBackUpData(lastRecord.opt);
                lastRecord.tempPageIdIndex = backData.tempPageIdIndex;
                lastRecord.body = backData.body;
                // $('#sm_controlSetting .editorsTage-btn').click()
                lastRecord.cssContentList = backData.cssContentList;
                lastRecord.cssTemplateList = backData.cssTemplateList;
            }
        },
        beforeModify: function (opt) {
            if (this.storage.disableHandleHistory) {
                return;
            }
            this.recoverCurrentPage2LastRecord();
            this.storage.notRefreshTempData = !opt.refreshTempData;
            var redoInfo = this.backUpPage(opt);
            this.storage.redoIndex = this.storage.handleHistory.length - 1;
            this.refreshHandleLogDisplayStatus();
            return redoInfo;
        },
        canCtrlZ: function () {
            return !(this.storage.handleHistory.length <= 1 || this.storage.redoIndex <= 0);
        },
        canCtrlY: function () {
            return !(this.storage.handleHistory.length <= 1 ||
                this.storage.redoIndex >= this.storage.handleHistory.length - 1);
        },
        //接口调用完毕后
        afterModifyPageViaApi: function (tempPageId) {
            var index = this.storage.tempPageIdList.indexOf(tempPageId);
            if (index === -1) {
                this.storage.tempPageIdList.push(tempPageId);
                this.storage.lastTempPageIdIndex = this.storage.tempPageIdList.length - 1;
            } else {
                this.storage.lastTempPageIdIndex = index;
            }
        },
        backupPage2Temp: function (opt) {
            this.storage.tempData = this.getBackUpData(opt);
        },
        pushTemp2History_Old: function (ctrlId) {
            if (this.storage.tempData !== null) {
                //获取最新的临时备份
                if (typeof ctrlId !== "undefined") {
                    this.storage.tempData.opt.controlType = $("#" + ctrlId).attr("ctype");
                    this.storage.tempData.desc = this.getDescByOpt(this.storage.tempData.opt);
                }
                if (this.storage.notRefreshTempData) {
                    this.backupPage2Temp(this.storage.tempData.opt);
                } else {
                    this.backUpPageByData(this.storage.tempData);
                    this.storage.tempData = null;
                    this.storage.redoIndex = this.storage.handleHistory.length - 1;
                    this.refreshHandleLogDisplayStatus();
                }
            }
            this.storage.notRefreshTempData = false;
        },
        pushTemp2History: function (ctrlId) {
            if (this.storage.tempData !== null) {
                //获取最新的临时备份
                if (typeof ctrlId !== "undefined") {
                    this.storage.tempData.opt.controlType = $("#" + ctrlId).attr("ctype");
                    this.storage.tempData.desc = this.getDescByOpt(this.storage.tempData.opt);
                }
                if (this.storage.notRefreshTempData) {
                    this.backupPage2Temp(this.storage.tempData.opt);
                } else {
                    this.backUpPageByData(this.initRedoInfo(this.storage.tempData.opt));

                    var lastRecord = this.storage.handleHistory[this.storage.handleHistory.length - 2];
                    lastRecord.tempPageIdIndex = this.storage.tempData.tempPageIdIndex;
                    lastRecord.body = this.storage.tempData.body;
                    lastRecord.cssContentList = this.storage.tempData.cssContentList;
                    lastRecord.cssTemplateList = this.storage.tempData.cssTemplateList;
                    this.storage.tempData = null;
                    this.storage.redoIndex = this.storage.handleHistory.length - 1;
                    this.refreshHandleLogDisplayStatus();
                }
            }
            this.storage.notRefreshTempData = false;
        },
        //撤销 Ctrl+Z
        onCtrlZ: function () {
            if (this.canCtrlZ()) {
                window.parent.wzAiHelp && window.parent.wzAiHelp.fire('wz-history-onCtrlZ');
                var isLeastHandler = this.storage.handleHistory.length === this.storage.redoIndex + 1;
                if (isLeastHandler) {
                    this.recoverCurrentPage2LastRecord();
                }
                var redoInfo = this.storage.handleHistory[--this.storage.redoIndex];
                this.restorePage(redoInfo);
            }
            this.refreshHandleLogDisplayStatus();
        },
        //恢复 Ctrl+Y
        onCtrlY: function () {
            if (this.canCtrlY()) {
                var redoInfo = this.storage.handleHistory[++this.storage.redoIndex];
                this.restorePage(redoInfo);
            }
            this.refreshHandleLogDisplayStatus();
        },
        redo2Index: function (index) {
            if (index === this.storage.redoIndex) {
                return;
            }
            var isLeastHandler = this.storage.handleHistory.length === this.storage.redoIndex + 1;
            if (isLeastHandler) {
                this.recoverCurrentPage2LastRecord();
            }
            this.storage.redoIndex = index;
            var redoInfo = this.storage.handleHistory[this.storage.redoIndex];;
            this.restorePage(redoInfo);
            this.refreshHandleLogDisplayStatus();
        },
        getDescByOpt: function (opt) {
            var color = "";
            switch (opt.desc) {
                case "添加":
                case "粘贴":
                case "新增":
                case "将":
                    {
                        color = "green";
                        break;
                    }
                case "更改":
                case "更换":
                case "向上移动":
                case "向左移动":
                case "向右移动":
                case "向下移动":
                case "拖动":
                case "编辑":
                case "打开":
                case "设置":
                case "旋转":
                case "应用":
                case "AI编辑":
                    {
                        color = "#188AD7";
                        break;
                    }
                case "移除":
                    {
                        color = "orangered";
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            return opt.desc + ('<strong style=\'color:' + color + '\'>' + (this.redoConfig.ctrlMap[opt.controlType] || opt.controlType || "") + "</strong>" + (opt.suffix === undefined ? "控件" : opt.suffix));

        },
        initRedoInfo: function (opt) {
            var now = new Date();
            var targetEle = $(".smart-resize");
            if (targetEle.length > 0) {
                opt.controlType = opt.controlType || targetEle.eq(0).attr('ctype');
                opt.ctrlId = opt.ctrlId || targetEle.eq(0).attr('id');
            }

            var redoInfo = {
                time: (now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours()) + ":" + (now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes()) + ":" + (now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds()),
                body: null,
                controlType: opt.controlType || "",
                cssContentList: [],
                cssTemplateList: [],
                opt: opt,
                ctrlId: (opt.ctrlId || "designer_box").split(',')[0],
            };
            redoInfo.desc = this.getDescByOpt(opt);

            return redoInfo;
        },
        getBackUpData: function (opt) {
            var redoInfo = this.initRedoInfo(opt);
            redoInfo.tempPageIdIndex = this.storage.lastTempPageIdIndex;
            redoInfo.body = $("#designer_box").clone();
            var controlList = this.getAllControlList(redoInfo.body);

            redoInfo.body.find('.smv-line').remove();
            var self = this;
            function handleSlider(ele, eleId) {
                //初始化时的容器控件备份
                if (self.storage.sliderList[eleId] !== undefined) {
                    //当前控件
                    var childControlList = self.getAllControlList(ele).remove();
                    var oriEle = $(self.storage.sliderList[eleId].html);
                    self.getAllControlList(oriEle).remove();
                    for (var controlIndex = 0; controlIndex < childControlList.length; controlIndex++) {
                        var ctrl = childControlList.eq(controlIndex);
                        oriEle.find("[cid=" + ctrl.attr('pvid') + "]" + "#smc_" + ctrl.attr('areaid')).append(ctrl);
                    }

                    for (var x = 0; x < oriEle.find('.content-box-inner').length; x++) {
                        var item = oriEle.find('.content-box-inner').eq(x);
                        item.attr("style", ele.find('.content-box-inner').eq(x).attr("style"));
                    }
                    ele.html(oriEle);
                }
            }

            for (var i = 0; i < controlList.length; i++) {
                var ele = controlList.eq(i);
                var eleId = ele.attr('id');
                ele.removeClass("ui-draggable");
                ele.removeClass("ui-resizable");
                ele.find(".ui-resizable-handle").remove();
                handleSlider(ele, eleId);
            };
            redoInfo.body = redoInfo.body.html();
            var cssContentList = $("style[id^=csscon_]");
            var cssTempList = $("style[id^=csstem_]");
            for (var i = 0; i < cssContentList.length; i++) {
                redoInfo.cssContentList.push(cssContentList.eq(i).clone());
            }
            for (var i = 0; i < cssTempList.length; i++) {
                redoInfo.cssTemplateList.push(cssTempList.eq(i).clone());
            }
            return redoInfo;
        },
        restorePage: function (redoInfo) {
            let newsProductsIds = []
            let beforeCtrlZData = []
            if(window.parent.isOemSimple) {
                // 文章列表/产品列表控件撤销恢复特殊处理（请求接口同步后台数据）
                newsProductsIds = getNewsProductControls()
                beforeCtrlZData = newsProductsIds.length > 0 ? getListData(newsProductsIds) : [];
            }

            jumpShowCtrlTab = true
            for (var i = 0; i < redoInfo.cssContentList.length; i++) {
                var ele = redoInfo.cssContentList[i];
                var currentEle = $("#" + ele.attr('id'));
                if (currentEle.length > 0) {
                    currentEle.remove();
                }
                $('head').append(ele.clone());
            }

            for (var i = 0; i < redoInfo.cssTemplateList.length; i++) {
                var ele = redoInfo.cssTemplateList[i];
                var currentEle = $("#" + ele.attr('id'));
                if (currentEle.length > 0) {
                    currentEle.remove();
                }
                $('head').append(ele.clone());
            }
            //     var oriMenu = $("#designer_box").find('.smv-line').detach();

            if (CKEDITOR && CKEDITOR.instances) {
                for (var key in CKEDITOR.instances) {
                    var item = CKEDITOR.instances[key];
                    item.destroy(true);
                }
            }
            //替换初始事件,避免重复加载事件
            redoInfo.body = redoInfo.body.replace(/InitImageSmv2/g, "var temp_Init_Image_Smv2=");
            redoInfo.body = redoInfo.body.replace(/InitImageSmv/g, "var temp_Init_Image_Smv=");


            $("#designer_box").html(redoInfo.body);
            window.parent.nsmart.hideFastPropPanel();
            this.initDesignerEvent();
            if (typeof (MobileSimulator) != 'undefined') {
                MobileSimulator.TryExec(function (instance) {
                    instance.OverwritePageAndLaunchAdjuster(true)
                });
            }

            // 撤销还原中的关闭右侧面板
            window.parent.nsmart.hideRightPanel();
            if(smartViewFactory.storage.deviceMode === 'Pc') {
                window.parent.nsmart.hideCtrlTab();
            }

            var ctrlList = this.getAllControlList($('#designer_box'));
            for (var i = 0; i < ctrlList.length; i++) {
                var ele = ctrlList.eq(i);
                if (ele.hasClass('animated')) {
                    ele.smanimate();
                }
            }

            this.storage.lastTempPageIdIndex = redoInfo.tempPageIdIndex;

            if(window.parent.isOemSimple) {
                // 文章列表/产品列表控件撤销恢复特殊处理（请求接口同步后台数据）
                let afterCtrlZData = newsProductsIds.length > 0 ? getListData(newsProductsIds) : [];
                const diffs = findArrayDifferences(beforeCtrlZData, afterCtrlZData)
                if(diffs.size > 0) {
                    diffs.forEach((value, key)=>{
                        recordListData(value)
                    })
                }
            }
        },
        addPasteEvent: function () {
            document.addEventListener('paste', e => {

                var data = (e.clipboardData || window.clipboardData).getData('text/plain');

                if (data.indexOf("#wz_data#") !== -1) {
                    // 粘贴微站原生控件
                    $.localStorage.set('sm_copy', data.replace("#wz_data#", ""));
                    shortCut.ctrlV();

                } else if (smartViewFactory.storage.deviceMode === 'Pc') {
                    // 只有pc支持

                    var $target = $(e.target)
                    // 上游控件是文本控件在粘贴中 \input \textArea \就忽略
                    if (

                        $target.parents('.editableContent').attr('contenteditable') === 'true' ||
                        $target.is('input') ||
                        $target.is('textArea')

                    ) {
                        return;
                    }


                    e.preventDefault()
                    smartViewFactory._pasteAndOCR(e.clipboardData || window.clipboardData)
                }

            }, true)
        },

        _pasteAndOCR: function (clipboardData) {
            // console.log(clipboardData.getData('text/html'))


            // 粘贴文件调用OCR识别
            var ajaxPasteOCR = function (files, callback) {
                //window.top.showSuccess('检测到图片， 将自动识别中')
                var formData = new FormData()
                for (var i = 0; i < files.length; i++) {
                    var file = files[i]
                    formData.append('files[]', file, file.name)
                }

                $.ajax({
                    type: "post",
                    url: "/Admin/Picture/BatchImageRecognize",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (f) {
                        if (f.isSuccess) {
                            callback(f.data);
                        } else {
                             window.parent.showFailure(f.message)
                        }
                        
                    },
                    error: function (f) {

                    }
                });

            }
            // 增加文本控件
            var addTextSmartView = function (content, successCallback) {

                var pageId = $('#smv_Main').attr('cpid') || $('#smv_Area0').attr('cpid');
                createSmartView(
                    pageId,
                    'text',
                    smartGlobalSettings.lastX += 4,
                    smartGlobalSettings.lastY += 4,
                    smartGlobalSettings.parentId,
                    smartGlobalSettings.parentAreaId,
                    'Style1',
                    'Item4',
                    '',
                    // 成功时
                    function (data) {
                        onSmartViewCreateSuccess(data)
                        var smartView = smartViewFactory.getSmartView('smv_' + data.ControlId, 'text')
                        smartView.$control.find('.editableContent').html(content)
                        smartView.setData('Content', content, false)

                        if (successCallback) {
                            successCallback()
                        }

                    },
                    onSmartViewDeleteSuccess
                );
            }
            // 增加图片控件
            var addImageSmartView = function (pictureInfo, successCallback) {


                var pageId = $('#smv_Main').attr('cpid') || $('#smv_Area0').attr('cpid');
                createSmartView(
                    pageId,
                    'image',
                    smartGlobalSettings.lastX += 4,
                    smartGlobalSettings.lastY += 4,
                    smartGlobalSettings.parentId,
                    smartGlobalSettings.parentAreaId,
                    'Style1',
                    'Item0',
                    '',
                    // 成功时
                    function (data) {

                        onSmartViewCreateSuccess(data, {
                            onCreatedParams: {
                                url: pictureInfo.pictureUrl,
                                picture: {
                                    Id: pictureInfo.pictureId,
                                    MimeType: pictureInfo.mimeType,
                                    Name: pictureInfo.pictureTitle,
                                    Width: pictureInfo.width,
                                    Height: pictureInfo.height
                                }
                            }
                        })
                        if (successCallback) {
                            successCallback()
                        }


                    },
                    onSmartViewDeleteSuccess
                );
            }

            var htmlstring = clipboardData.getData('text/html');
            if (htmlstring) {
                var _document = new DOMParser().parseFromString(htmlstring, 'text/html')

                if (!_document.querySelector('body').innerText) {
                    return
                }

                _document.querySelectorAll('img').forEach(function (img) {
                    // _document.body.removeChild(img)
                    if (img.parentElement) {
                        img.parentElement.remove()
                    }

                })

                //_document.querySelectorAll('body span, body img').forEach(function (tag) {
                //    if (tag.tagName === 'IMG') {
                //         img.parentNode.remove()
                //    }
                //    else {
                //        var fontSize = tag.style.fontSize

                //        if (fontSize) {
                //            tag.style.fontSize = tag.style.fontSize.replace(/(\d+(?:\.\d*)pt)/g, function (match, group0) {
                //                return Math.round(group0 * 96 / 72) + 'px';
                //            })
                //        }
                //    }


                //})

                var html = _document.querySelector('body').innerHTML

                html = html.replace(/(\d+(?:\.\d*)?)pt/g, function (match, group0) {
                    return Math.round(group0 * 96 / 72) + 'px';
                })

                var div = document.createElement('div')

                // 通过CKEDITOR转换html
                var editor = CKEDITOR.inline(div, {

                    extraAllowedContent: 'a(documentation);abbr[title];code',
                })

                editor.setData(html, {
                    callback: function () {
                        var Content = editor.getData()
                        if (Content) {
                            addTextSmartView(Content)
                        }
                        setTimeout(function () {
                            editor.destroy(true)
                            editor = null
                        }, 100)
                    }
                })

            } else {
                var text = clipboardData.getData('text/plain');
                text = text.trim()
                if (text) {
                    var Content = '<p><span style="line-height:1.75;font-size:16px;">' + text + '</span></p>'
                    addTextSmartView(Content)
                }
            }

            var files = clipboardData.files
            var newfiles = []


            for (var i = 0; i < files.length; i++) {
                var file = files[i]
                if ((/^image\//).test(file.type)) {
                    newfiles.push(file)
                }
            }

            if (newfiles.length > 0) {
                ajaxPasteOCR(files, function (resultList) {
                    var addViewlist = []
                    for (var i = 0; i < resultList.length; i++) {
                        var item = resultList[i];
                        if (item.haveContent) {

                            addViewlist.push({
                                fn: addTextSmartView,
                                data: '<p><span style="line-height:1.75;font-size:16px;">' + item.content + '</span></p>'
                            })

                        }
                        if (item.recognizeResultPictureInfo) {
                            // addImageSmartView(item.recognizeResultPictureInfo)

                            addViewlist.push({
                                fn: addImageSmartView,
                                data: item.recognizeResultPictureInfo
                            })
                        }
                    }

                    var eventLoop = function () {
                        if (addViewlist.length > 0) {
                            var viewOpt = addViewlist.pop()
                            viewOpt.fn(viewOpt.data, eventLoop)

                            // smartGlobalSettings.lastX += 40;
                            // smartGlobalSettings.lastY += 40;
                        }
                    }

                    eventLoop()


                })
            }






            //if (cpv.length === 0) {
            //    cpv = $('#smv_Area0');
            //}
            //var pageId = cpv.attr('cpid');
        },
        initDesigner: function () {
            smartViewFactory.addPasteEvent();
        },
        //复制样式
        getCtrlStyleTree: function (eleId) {
            var mainEle = $("#" + eleId);
            if (mainEle.length === 1) {
                var ctrlId = eleId.replace("smv_", "");
                var mainNode = {
                    EleId: eleId,
                    CtrlId: ctrlId,
                    CtrlType: mainEle.attr("ctype"),
                    AreaId: mainEle.attr("areaid"),
                    StyleName: mainEle.attr("cstyle"),
                    CssData: JSON.parse(mainEle.find("#data_" + eleId).text()).Css,
                    ParentCtrlId: mainEle.attr("pvid"),
                    Children: []
                };

                var childrenList = mainEle.find("[pvid=" + ctrlId + "]");
                childrenList.each(function (a, childEle) {
                    mainNode.Children.push(smartViewFactory.getCtrlStyleTree(childEle.id))
                });
                return mainNode;
            }
            else {
                return null;
            }
        },
        setPos: function (oriCtrlTreeInfo, targetCtrlTreeInfo) {
            smartViewFactory.setStyle(oriCtrlTreeInfo, targetCtrlTreeInfo, true);
        },
        setStyle: function (oriCtrlTreeInfo, targetCtrlTreeInfo, justPos) {
            var isTopNode = oriCtrlTreeInfo == undefined;
            var targetEle = $(".smart-resize");
            if (targetEle.length !== 1) {
                return;
            }
            oriCtrlTreeInfo = oriCtrlTreeInfo || JSON.parse(localStorage.getItem("copyStyle"));
            targetCtrlTreeInfo = targetCtrlTreeInfo || smartViewFactory.getCtrlStyleTree(targetEle.attr("id"));

            if (oriCtrlTreeInfo && targetCtrlTreeInfo && oriCtrlTreeInfo.EleId !== targetCtrlTreeInfo.EleId) {
                if (!justPos && oriCtrlTreeInfo.CtrlType !== targetCtrlTreeInfo.CtrlType) {
                    parent.showNormal("源控件类型和目标控件类型不一致,无法应用样式");
                    return;
                }

                if (!justPos && oriCtrlTreeInfo.StyleName !== targetCtrlTreeInfo.StyleName) {
                    parent.showNormal("源控件Style和目标控件Style不一致,无法应用样式");
                    return;
                }
                //AreaId有可能是随机字符串,所以只能用下标形式简单区分;
                var oriAreaIdList = oriCtrlTreeInfo.Children.map(i => i.AreaId);
                var oriCtrlDnaList = oriCtrlTreeInfo.Children.map(i => `${i.CtrlType}#${i.StyleName}#${oriAreaIdList.indexOf(i.AreaId)}`).sort();
                var oriCtrlDna = "";

                for (var x = 0; x < oriCtrlDnaList.length; x++) {
                    oriCtrlDna += `${oriCtrlDna === "" ? "" : "|"}${oriCtrlDnaList[x]}`;
                }

                var targetAreaIdList = targetCtrlTreeInfo.Children.map(i => i.AreaId);
                var targetCtrlDnaList = targetCtrlTreeInfo.Children.map(i => `${i.CtrlType}#${i.StyleName}#${targetAreaIdList.indexOf(i.AreaId)}`).sort();
                var targetCtrlDna = "";

                for (var x = 0; x < targetCtrlDnaList.length; x++) {
                    targetCtrlDna += `${targetCtrlDna === "" ? "" : "|"}${targetCtrlDnaList[x]}`;
                }
                if (isTopNode) {
                    smartViewFactory.beforeModify({ desc: "应用", controlType: targetCtrlTreeInfo.CtrlName, suffix: "样式", ctrlId: targetCtrlTreeInfo.EleId });
                }
                smartViewFactory.applyStyle(oriCtrlTreeInfo, targetCtrlTreeInfo, isTopNode, justPos)
                if (oriCtrlDna !== targetCtrlDna) {
                    parent.showNormal("源控件子级结构和目标控件结构不一致,仅应用相同层级的样式");
                    return;
                } else {
                    for (var x = 0; x < oriCtrlTreeInfo.Children.length; x++) {
                        smartViewFactory.setStyle(oriCtrlTreeInfo.Children[x], targetCtrlTreeInfo.Children[x], justPos)
                    }
                }
            }
        },
        applyStyle(oriCtrlInfo, targetCtrlInfo, isTopNode, justPos) {
            var ignoreKeys = ["foffsetX", "foffsetY", "offsetX", "offsetY"];

            var smartView = smartViewFactory.getSmartViewWithOutType(targetCtrlInfo.EleId);
            if (!justPos) {
                Object.keys(oriCtrlInfo.CssData).forEach(function (key) {
                    if ((ignoreKeys.indexOf(key) !== -1) || key === "$StyleItemAndColor") {
                        return;
                    }
                    else {
                        smartView.setCss(key, oriCtrlInfo.CssData[key], null);
                    }
                })
            }
            if (!isTopNode) {
                smartView.setPosition(oriCtrlInfo.CssData.offsetX, oriCtrlInfo.CssData.offsetY);
            }


            smartView.setWidthAndHeight(oriCtrlInfo.CssData.width, oriCtrlInfo.CssData.height);
            if (typeof smartView.refresh == "function") {
                smartView.refresh();
            }
            window.parent.nsmart.refreshCurControlCssTag(smartView, $(`#scss_${targetCtrlInfo.EleId}`).html());
        },
        copyStyle: function () {
            var ctrl = $(".smart-resize");
            if (ctrl.length === 1) {
                //让用户可以跨页面调用
                var data = smartViewFactory.getCtrlStyleTree(ctrl.attr("id"));
                localStorage.setItem("copyStyle", JSON.stringify(data))
                console.log(data);
                //只支持一个控件样式复制
                //控件类型不一样时不予赋值
                //控件层级一样时全部控件赋值
                //控件层级不一样时只赋值第一个
                //撤销恢复
                //撤销恢复后异常
            }
            else {
                parent.showNormal("样式拷贝仅支持单个控件!");
            }
        },
        getSelectedCtrl: function () {
            return $('.smart-resize');
        },
        // AI小梦
        // 这个函数下架不在使用了
        openSmartViewAI: function (controlId) {


            
            
        },
    };
})();
;
smartViewFactory.initDesigner();

window.updateList = function updateList(event) {
    if(!window.parent.isOemSimple || cnsmart.selectBox.isDragged){
        return
    }
    try {
        var handleEl = $(event.currentTarget);
        const controlId = handleEl.attr("data-control-id")
        const cStyle = $("#" + controlId).attr("cstyle")
        const cType = $("#" + controlId).attr("ctype")
        const title = handleEl.attr("data-list-title")
        const picUrl = handleEl.attr("data-list-picurl")
        const id = handleEl.attr("data-list-id")
        const newsHideImageList = ["Style1", "Style2", "Style3"]
        const parentDialog = window.parent.$("#news-product-edit-dialog");

        // 父窗口操作
        if(newsHideImageList.includes(cStyle) && cType == "listnews"){
            parentDialog.find("#listChangeImage").hide();
        } else {
            parentDialog.find("#listChangeImage").show();
        }
        parentDialog.find("#list-title").val(title)            
        parentDialog.find("#listImg").attr('src', picUrl);
        parentDialog.find("#changeListId").val(id)
        if (cType == "listnews") {
            parentDialog.find(".modal-header .modal-title").text("文章列表修改")
        } else {
            parentDialog.find(".modal-header .modal-title").text("产品列表修改")
        }
        parentDialog.find('#list-title').removeClass('error');
        parentDialog.find('#listChangeForm .error-container .has-error').hide();
        parentDialog.modal("show");
        
    } catch (error) {
        console.error("Failed to update list:", error);
        // 可添加错误恢复或用户提示逻辑
    }
}