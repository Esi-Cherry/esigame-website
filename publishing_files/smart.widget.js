var _smartImgEditor;
$.fn.extend({
    // 给当前添加选中样式，同胞元素移除选中样式
    siblingsSelect: function (className, jqSelect) {
        $(this).addClass(className).siblings(jqSelect).removeClass(className);
    }
});
function YibuTrimPx(strPx, ext) {
    if (typeof strPx == "number") {
        return strPx;
    }
    ext = ext || "px";
    var index = strPx.toLowerCase().indexOf(ext);
    if (index > 0) {
        return parseInt(strPx.substring(0, strPx.length - ext.length));
    } else if (!isNaN(strPx)) {
        return strPx;
    }
    return 0;
}
function YibuTrimFloatPx(strPx, ext) {
    if (typeof strPx == "number") {
        return strPx;
    }
    var index = strPx.toLowerCase().indexOf(ext || "px");
    if (index > 0) {
        return parseFloat(strPx.substring(0, strPx.length - 2));
    } else if (!isNaN(strPx)) {
        return strPx;
    }
    return 0;
}
//通过key和Value初始化下拉控件
function smartInitDropdownList(wigdet, seletor, key, value) {
    var selectWrap = wigdet.find(seletor);
    var text = selectWrap.find("li[data-role='" + value + "']").text();
    selectWrap.find("input[data-role='" + key + "']").val(value);
    selectWrap.find(".select_txt").text(text);
}

//xspinner 数字控件
(function ($) {
    function t(fn) {
        return function () {
            var t = this.element.val();
            fn.apply(this, arguments),
                this._refresh(),
                t !== this.element.val() && this._trigger("change");
        }
    }

    $.widget("smart.xspinner", {
        version: "1.0.0",
        defaultElement: "<input>",
        widgetEventPrefix: "xspinner",
        options: {
            culture: null,
            icons: {
                down: "input-arrow-down",
                up: "input-arrow-up"
            },
            incremental: true,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max),
                this._setOption("min", this.options.min),
                this._setOption("step", this.options.step),
                "" !== this.value() && this._value(this.element.val(), true),
                this._draw(),
                this._on(this._events),
                this._refresh(),
                this._on(this.window, {
                    beforeunload: function () {
                        this.element.removeAttr("autocomplete");
                    }
                });
        },
        _getCreateOptions: function () {
            var t = {}, i = this.element;
            return $.each(["min", "max", "step"], function (e, s) {
                var a = i.attr(s);
                undefined !== a && a != null && a.length && (t[s] = a);
            }),
                t;
        },
        _events: {
            keydown: function (e) {
                this._start(e) && this._keydown(e) && e.preventDefault();
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val();
            },
            blur: function (e) {
                return this.cancelBlur ? (delete this.cancelBlur,
                    void 0) : (this._stop(),
                        this._refresh(),
                        this.previous !== this.element.val() && this._trigger("change", e),
                        void 0);

            },
            mousewheel: function (e, t) {
                if (t) {
                    if (!this.spinning && !this._start(e))
                        return false;
                    this._spin((t > 0 ? 1 : -1) * this.options.step, e),
                        clearTimeout(this.mousewheelTimer),
                        this.mousewheelTimer = this._delay(function () {
                            this.spinning && this._stop(e);
                        }, 100),
                        e.preventDefault();
                }
            },
            "mousedown .u-input-arrow li": function (t) {
                var s;

                function i() {
                    var e = this.element[0] === this.document[0].activeElement;
                    e || (this.element.focus(),
                        this.previous = s,
                        this._delay(function () {
                            this.previous = s;
                        }));
                }

                s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(),
                    t.preventDefault(),
                    i.call(this),
                    this.cancelBlur = true,
                    this._delay(function () {
                        delete this.cancelBlur,
                            i.call(this);
                    }),
                    this._start(t) !== false && this._repeat(null, $(t.currentTarget).hasClass("input-arrow-up") ? 1 : -1, t);
            },
            "mouseup .u-input-arrow li": "_stop",
            "mouseenter .u-input-arrow li": function (t) {
                return $(t.currentTarget).hasClass("ui-state-active") ? this._start(t) === false ? false : (this._repeat(null, $(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t),
                    void 0) : void 0;
            },
            "mouseleave .u-input-arrow li": "_stop"
        },
        _draw: function () {
            var e = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"),
                this.buttons = e.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"),
                this.buttons.height() > Math.ceil(.5 * e.height()) && e.height() > 0 && e.height(e.height()),
                this.options.disabled && this.disable();
        },
        _keydown: function (t) {
            var i = this.options, s = $.ui.keyCode;
            switch (t.keyCode) {
                case s.UP:
                    return this._repeat(null, 1, t),
                        true;
                case s.DOWN:
                    return this._repeat(null, -1, t),
                        true;
                case s.PAGE_UP:
                    return this._repeat(null, i.page, t),
                        true;
                case s.PAGE_DOWN:
                    return this._repeat(null, -i.page, t),
                        true;
            }
            return false;
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
        },
        _buttonHtml: function () {
            return '<ul class="u-input-arrow"><li class="' + this.options.icons.up + '"><i class="icon icon-jt-up hewi8"></i></li><li class="' + this.options.icons.down + '"><i class="icon icon-jt-down hewi8"></i></li></ul>';
        },
        _start: function (e) {
            return this.spinning || this._trigger("start", e) !== false ? (this.counter || (this.counter = 1),
                this.spinning = true,
                true) : false;
        },
        _repeat: function (e, t, i) {
            e = e || 500,
                clearTimeout(this.timer),
                this.timer = this._delay(function () {
                    this._repeat(40, t, i);
                }, e),
                this._spin(t * this.options.step, i);
        },
        _spin: function (e, t) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1),
                i = this._adjustValue(i + e * this._increment(this.counter)),
                this.spinning && this._trigger("spin", t, {
                    value: i
                }) === false || (this._value(i),
                    this.counter++);
        },
        _increment: function (t) {
            var i = this.options.incremental;
            return i ? $.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1;
        },
        _precision: function () {
            var e = this._precisionOf(this.options.step);
            return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))),
                e;
        },
        _precisionOf: function (e) {
            var t = "" + e, i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1;
        },
        _adjustValue: function (e) {
            var t, i, s = this.options;
            return t = null !== s.min ? s.min : 0,
                i = e - t,
                i = Math.round(i / s.step) * s.step,
                e = t + i,
                e = parseFloat(e.toFixed(this._precision())),
                null !== s.max && e > s.max ? s.max : null !== s.min && s.min > e ? s.min : e;
        },
        _stop: function (e) {
            this.spinning && (clearTimeout(this.timer),
                clearTimeout(this.mousewheelTimer),
                this.counter = 0,
                this.spinning = false,
                this._trigger("stop", e));
        },
        _setOption: function (e, t) {
            if ("culture" === e || "numberFormat" === e) {
                var i = this._parse(this.element.val());
                return this.options[e] = t,
                    this.element.val(this._format(i)),
                    void 0;
            }
            ("max" === e || "min" === e || "step" === e) && "string" == typeof t && (t = this._parse(t)),
                "icons" === e && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),
                    this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),
                this._super(e, t),
                "disabled" === e && (t ? (this.element.prop("disabled", true),
                    this.buttons.button("disable")) : (this.element.prop("disabled", false),
                        this.buttons.button("enable")));
        },
        _setOptions: t(function (e) {
            this._super(e),
                this._value(this.element.val());
        }),
        _parse: function (e) {
            return "string" == typeof e && "" !== e && (e = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(e, 10, this.options.culture) : +e),
                "" === e || isNaN(e) ? null : e;
        },
        _format: function (e) {
            return "" === e ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(e, this.options.numberFormat, this.options.culture) : e;
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            });
        },
        _value: function (e, t) {
            var i;
            "" !== e && (i = this._parse(e),
                null !== i && (t || (i = this._adjustValue(i)),
                    e = this._format(i))),
                this.element.val(e),
                this._refresh();
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
                this.uiSpinner.replaceWith(this.element);
        },
        stepUp: t(function (e) {
            this._stepUp(e);
        }),
        _stepUp: function (e) {
            this._start() && (this._spin((e || 1) * this.options.step),
                this._stop());
        },
        stepDown: t(function (e) {
            this._stepDown(e);
        }),
        _stepDown: function (e) {
            this._start() && (this._spin((e || 1) * -this.options.step),
                this._stop());
        },
        pageUp: t(function (e) {
            this._stepUp((e || 1) * this.options.page);
        }),
        pageDown: t(function (e) {
            this._stepDown((e || 1) * this.options.page);
        }),
        value: function (e) {
            return arguments.length ? (t(this._value).call(this, e),
                void 0) : this._parse(this.element.val());
        },
        widget: function () {
            return this.uiSpinner;
        }
    });
})(jQuery);

//xdropdown 下拉控件 暂时无用
(function ($) {
    function t(fn) {
        return function () {
            var t = this.element.val();
            fn.apply(this, arguments),
                this._refresh(),
                t !== this.element.val() && this._trigger("change");
        }
    }

    $.widget("smart.xdropdown", {
        version: "1.0.0",
        defaultElement: "<input>",
        widgetEventPrefix: "xdropdown",
        options: {
            culture: null,
            icons: {
                down: "input-arrow-down",
                up: "input-arrow-up"
            },
            incremental: true,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max),
                this._setOption("min", this.options.min),
                this._setOption("step", this.options.step),
                "" !== this.value() && this._value(this.element.val(), true),
                this._draw(),
                this._on(this._events),
                this._refresh(),
                this._on(this.window, {
                    beforeunload: function () {
                        this.element.removeAttr("autocomplete");
                    }
                });
        },
        _getCreateOptions: function () {
            var t = {}, i = this.element;
            return $.each(["min", "max", "step"], function (e, s) {
                var a = i.attr(s);
                void 0 !== a && a.length && (t[s] = a);
            }),
                t;
        },
        _events: {
            keydown: function (e) {
                this._start(e) && this._keydown(e) && e.preventDefault();
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val();
            },
            blur: function (e) {
                return this.cancelBlur ? (delete this.cancelBlur,
                    void 0) : (this._stop(),
                        this._refresh(),
                        this.previous !== this.element.val() && this._trigger("change", e),
                        void 0);
            },
            mousewheel: function (e, t) {
                if (t) {
                    if (!this.spinning && !this._start(e))
                        return false;
                    this._spin((t > 0 ? 1 : -1) * this.options.step, e),
                        clearTimeout(this.mousewheelTimer),
                        this.mousewheelTimer = this._delay(function () {
                            this.spinning && this._stop(e);
                        }, 100),
                        e.preventDefault();
                }
            },
            "mousedown .u-input-arrow li": function (t) {
                function i() {
                    var e = this.element[0] === this.document[0].activeElement;
                    e || (this.element.focus(),
                        this.previous = s,
                        this._delay(function () {
                            this.previous = s;
                        }));
                }

                var s;
                s = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(),
                    t.preventDefault(),
                    i.call(this),
                    this.cancelBlur = true,
                    this._delay(function () {
                        delete this.cancelBlur,
                            i.call(this);
                    }),
                    this._start(t) !== false && this._repeat(null, $(t.currentTarget).hasClass("input-arrow-up") ? 1 : -1, t);
            },
            "mouseup .u-input-arrow li": "_stop",
            "mouseenter .u-input-arrow li": function (t) {
                return $(t.currentTarget).hasClass("ui-state-active") ? this._start(t) === false ? false : (this._repeat(null, $(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t),
                    void 0) : void 0;
            },
            "mouseleave .u-input-arrow li": "_stop"
        },
        _draw: function () {
            var e = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"),
                this.buttons = e.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"),
                this.buttons.height() > Math.ceil(.5 * e.height()) && e.height() > 0 && e.height(e.height()),
                this.options.disabled && this.disable()
        },
        _keydown: function (t) {
            var i = this.options, s = $.ui.keyCode;
            switch (t.keyCode) {
                case s.UP:
                    return this._repeat(null, 1, t),
                        true;
                case s.DOWN:
                    return this._repeat(null, -1, t),
                        true;
                case s.PAGE_UP:
                    return this._repeat(null, i.page, t),
                        true;
                case s.PAGE_DOWN:
                    return this._repeat(null, -i.page, t),
                        true;
            }
            return false;
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
        },
        _buttonHtml: function () {
            return '<ul class="u-input-arrow"><li class="' + this.options.icons.up + '"><i class="icon icon-jt-up hewi8"></i></li><li class="' + this.options.icons.down + '"><i class="icon icon-jt-down hewi8"></i></li></ul>';
        },
        _start: function (e) {
            return this.spinning || this._trigger("start", e) !== false ? (this.counter || (this.counter = 1),
                this.spinning = true,
                true) : false;
        },
        _repeat: function (e, t, i) {
            e = e || 500,
                clearTimeout(this.timer),
                this.timer = this._delay(function () {
                    this._repeat(40, t, i)
                }, e),
                this._spin(t * this.options.step, i)
        },
        _spin: function (e, t) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1),
                i = this._adjustValue(i + e * this._increment(this.counter)),
                this.spinning && this._trigger("spin", t, {
                    value: i
                }) === false || (this._value(i),
                    this.counter++)
        },
        _increment: function (t) {
            var i = this.options.incremental;
            return i ? $.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
        },
        _precision: function () {
            var e = this._precisionOf(this.options.step);
            return null !== this.options.min && (e = Math.max(e, this._precisionOf(this.options.min))),
                e
        },
        _precisionOf: function (e) {
            var t = "" + e, i = t.indexOf(".");
            return -1 === i ? 0 : t.length - i - 1
        },
        _adjustValue: function (e) {
            var t, i, s = this.options;
            return t = null !== s.min ? s.min : 0,
                i = e - t,
                i = Math.round(i / s.step) * s.step,
                e = t + i,
                e = parseFloat(e.toFixed(this._precision())),
                null !== s.max && e > s.max ? s.max : null !== s.min && s.min > e ? s.min : e
        },
        _stop: function (e) {
            this.spinning && (clearTimeout(this.timer),
                clearTimeout(this.mousewheelTimer),
                this.counter = 0,
                this.spinning = false,
                this._trigger("stop", e));
        },
        _setOption: function (e, t) {
            if ("culture" === e || "numberFormat" === e) {
                var i = this._parse(this.element.val());
                return this.options[e] = t,
                    this.element.val(this._format(i)),
                    void 0;
            }
            ("max" === e || "min" === e || "step" === e) && "string" == typeof t && (t = this._parse(t)),
                "icons" === e && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(t.up),
                    this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(t.down)),
                this._super(e, t),
                "disabled" === e && (t ? (this.element.prop("disabled", true),
                    this.buttons.button("disable")) : (this.element.prop("disabled", false),
                        this.buttons.button("enable")));
        },
        _setOptions: t(function (e) {
            this._super(e),
                this._value(this.element.val());
        }),
        _parse: function (e) {
            return "string" == typeof e && "" !== e && (e = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(e, 10, this.options.culture) : +e),
                "" === e || isNaN(e) ? null : e;
        },
        _format: function (e) {
            return "" === e ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(e, this.options.numberFormat, this.options.culture) : e
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function (e, t) {
            var i;
            "" !== e && (i = this._parse(e),
                null !== i && (t || (i = this._adjustValue(i)),
                    e = this._format(i))),
                this.element.val(e),
                this._refresh();
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", false).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
                this.uiSpinner.replaceWith(this.element);
        },
        stepUp: t(function (e) {
            this._stepUp(e);
        }),
        _stepUp: function (e) {
            this._start() && (this._spin((e || 1) * this.options.step),
                this._stop());
        },
        stepDown: t(function (e) {
            this._stepDown(e);
        }),
        _stepDown: function (e) {
            this._start() && (this._spin((e || 1) * -this.options.step),
                this._stop());
        },
        pageUp: t(function (e) {
            this._stepUp((e || 1) * this.options.page);
        }),
        pageDown: t(function (e) {
            this._stepDown((e || 1) * this.options.page);
        }),
        value: function (e) {
            return arguments.length ? (t(this._value).call(this, e),
                void 0) : this._parse(this.element.val());
        },
        widget: function () {
            return this.uiSpinner;
        }
    });
})(jQuery);

//字体修改控件
(function ($) {

    function font_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }

    $.widget("smart.fontEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "fontEditor",

        options: {
            titleName: "字体",
            lineHeightName: "行高（px）",
            targetSelector: "",
            frameName: "",
            cssPrefix: "",
            value: {},
            cssVars: ["font-size", "color", "font-style", "font-family", "font-weight", "text-decoration", "text-align", "line-height"],
            display: {
                "font-family": true,
                "font-size": true,
                "color": true,
                "font-style": true,
                "font-align": true,
                "line-height": false
            },
            fontmin: 12,
            fontmax: 24,
            lhmin: 12,
            lhmax: 50,
            innerText: "",
            change: null,
            cssChange: null
        },

        _create: function () {

            this._draw();
            this._on(this._events);
            this._refresh();

            // turning off autocomplete prevents the browser from remembering the
            // value when navigating through history, so we re-enable autocomplete
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        reload: function (opt) {
            var num = this.uifontEditor.find(".number").val();
            this.uifontEditor.find(".number").xspinner('option', 'min', opt.fontmin);
            this.uifontEditor.find(".number").xspinner('option', 'max', opt.fontmax);
            if (num > opt.fontmax) {
                this.uifontEditor.find(".number").val(opt.fontmax);
                num = opt.fontmax;
            }
            if (num < opt.fontmin) {
                this.uifontEditor.find(".number").val(opt.fontmin);
                num = opt.fontmin;
            }
            this.options.fontmin = opt.fontmin;
            this.options.fontmax = opt.fontmax;
            this._buildCss("font-size", num + "px");
        },
        fillCss: function (cssStr, oldCssArr) {

            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var cssVars = this.options.cssVars;
            var that = this;
            var validCss = {};
            var prefix = that.options.cssPrefix;
            for (var key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }

                switch (keyWithOutPrefix) {
                    case "font-family"://字体名
                        var text = that.uifontEditor.find(".dropdown-list a[data-role='" + value + "']").text();
                        that.uifontEditor.find(".showtext").html(text);
                        validCss[keyWithPrefix] = value;
                        isBgKey = true;
                        break;
                    case "font-size"://字体大小
                        that.uifontEditor.find("input[data-role='font-size']").val(YibuTrimPx(value));
                        validCss[keyWithPrefix] = value;
                        isBgKey = true;
                        break;
                    case "color"://设置字体颜色
                        that.uifontEditor.find(".color").spectrum("set", value);
                        validCss[keyWithPrefix] = value;
                        isBgKey = true;
                        break;
                    case "font-style"://设置字体样式等
                    case "font-weight":
                    case "text-decoration":
                        var li = that.uifontEditor.find(".u-font-style-box[data-role='" + keyWithOutPrefix + "']");
                        if (li.attr("on") == value) {
                            li.addClass("current");
                        } else {
                            li.removeClass("current");
                        }
                        validCss[keyWithPrefix] = value;
                        break;
                    case "text-align":
                        var target = that.uifontEditor.find(".u-font-algin-box[data-role='" + value + "']");
                        target.addClass("current").siblings().removeClass("current");
                        validCss[keyWithPrefix] = value;
                        break;
                    case "line-height"://设置列表行高
                        that.uifontEditor.find(".x-line-height").lzsliding("value", YibuTrimPx(value));
                        validCss[keyWithPrefix] = value;
                        break;
                }
            }

            that._value(validCss);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _getCreateOptions: function () {
            var options = {},
                element = this.element;

            $.each(["targetSelector", "frameName"], function (i, option) {
                var value = element.attr(option);
                if (value !== undefined && value.length) {
                    options[option] = value;
                }
            });

            return options;
        },
        _draw: function () {
            var uifontEditor = this.uifontEditor = this.element
            this.element.attr("role", "fontEditor");
            //this.element.val(this.options.value);
            var that = this;
            var isshowFontFamily = this.options.display["font-family"];
            var isshowFontSize = this.options.display["font-size"];
            var isshowColor = this.options.display["color"];
            var isshowFontStyle = this.options.display["font-style"];
            var isshowFontAlign = this.options.display["font-align"];
            var isshowLineHeight = this.options.display["line-height"];
            var isshowInnerText = this.options.innerText.length > 0;
            uifontEditor.find(".number").xspinner({
                max: that.options.fontmax,
                min: that.options.fontmin,
                change: function (event, ui) {
                    var value = parseInt($(this).val());
                    if (value > that.options.fontmax) {
                        value = that.options.fontmax;
                    }
                    if (value < that.options.fontmin) {
                        value = that.options.fontmin;
                    }
                    that.uifontEditor.find(".number").val(value);
                    var fontsize = value + "px";
                    that._buildCss("font-size", fontsize);
                }
            });
            uifontEditor.find(".color").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._buildCss("color", (color != null && color != "") ? color.toHexString() : "transparent"); // #ff0000
                }
            });
            uifontEditor.find(".lhnumber").xspinner({
                change: function (event, ui) {
                    var value = parseInt($(this).val());
                    var fontsize = parseInt(that.uifontEditor.find(".number").val());
                    if (value > that.options.lhmax) {
                        value = that.options.lhmax;
                    }
                    if (value < fontsize) {
                        value = fontsize;
                    }
                    if (value < that.options.lhmin) {
                        value = that.options.lhmin;
                    }
                    that.uifontEditor.find(".lhnumber").val(value);
                    var lineheight = value + "px";
                    that._buildCss("line-height", lineheight);
                }
            });
            uifontEditor.find(".x-line-height").find(".u-sliding")
                .attr("data-lzmin", this.options.lhmin)
                .attr("data-lzmax", this.options.lhmax);
            uifontEditor.find(".x-line-height").lzsliding({
                valSelect: { val: ".lhnumber", unit: '' },
                openUnit: [true, ""],
                effect: function () {
                    var value = parseInt(this.value());
                    var fontsize = parseInt(that.uifontEditor.find(".number").val());
                    if (value > that.options.lhmax) {
                        value = that.options.lhmax;
                    }
                    if (value < fontsize) {
                        value = fontsize;
                    }
                    if (value < that.options.lhmin) {
                        value = that.options.lhmin;
                    }
                    that.uifontEditor.find(".lhnumber").val(value);
                    var lineheight = value + "px";
                    that._buildCss("line-height", lineheight);
                }
            });
            uifontEditor.find(".x-line-height-title").text(this.options.lineHeightName);
            uifontEditor.find(".x-innerText").text(this.options.innerText).toggle(isshowInnerText);
            if (!isshowFontFamily) {
                uifontEditor.find(".x-font-family").hide();
            }
            if (!isshowFontSize) {
                uifontEditor.find(".x-font-size").hide();
            }
            if (!isshowColor) {
                uifontEditor.find(".x-color").hide();
            }
            if (!isshowFontStyle) {
                uifontEditor.find(".x-font-style").hide();
            }
            if (!isshowFontAlign) {
                uifontEditor.find(".x-font-align").hide();
            }
            if (!isshowLineHeight) {
                uifontEditor.find(".x-line-height").hide();
            }
            if (!isshowFontFamily && !isshowFontSize && isshowColor && isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style1");
                return;
            }
            if (!isshowFontFamily && isshowFontSize && isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style2");
                return;
            }
            if (isshowFontFamily && !isshowFontSize && isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style3");
                return;
            }
            if (isshowFontFamily && isshowFontSize && !isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style3");
                return;
            }
            if (isshowFontFamily && !isshowFontSize && isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style3");
                return;
            }
            if (isshowFontFamily && !isshowFontSize && isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style3");
                return;
            }
            if (isshowInnerText && !isshowFontFamily && !isshowFontSize && isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style3");
                return;
            }
            if (isshowInnerText && !isshowFontFamily && isshowFontSize && !isshowColor && !isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style3");
                return;
            }
            if (!isshowFontFamily && isshowFontSize && isshowColor && !(isshowFontStyle && isshowFontAlign)) {
                uifontEditor.addClass("u-font-style5");
                return;
            }
            if (isshowFontFamily && isshowFontSize && !isshowColor && !(isshowFontStyle && isshowFontAlign)) {
                uifontEditor.addClass("u-font-style5");
                return;
            }
            if (isshowInnerText && !isshowFontFamily && !isshowFontSize && !isshowColor && !isshowFontStyle && isshowFontAlign) {
                uifontEditor.addClass("u-font-style4");
                return;
            }
            if (isshowInnerText && !isshowFontFamily && !isshowFontSize && !isshowColor && isshowFontStyle && !isshowFontAlign) {
                uifontEditor.addClass("u-font-style4");
                return;
            }
        },

        // update the value without triggering change
        _value: function (value, allowAny) {
            //var valString = convertCssArrayToString(value);
            //this.element.val(valString);
            $.data(this.element, "cssData", value);
            this._refresh();
        },

        _setOptions: function (options) {
            this._super(options);
            this._value(this.element.val());
        },

        _buildCss: function (key, value) {
            var tempKey = key;
            var uifontEditor = this.uifontEditor = this.element
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            this.value(cssData);
            var data = {};
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            this._fontTarget().css(key, value);
        },
        _events: {
            //字体名称
            "click ul.dropdown-list li": function (event) {
                var value = $(event.currentTarget).text();
                var key = $(event.currentTarget).find("a").attr("data-role");
                if (typeof (key) === 'undefined' || key == null) {
                    key = value;
                }
                this.uifontEditor.find(".font-family").find(".showtext").text(value);
                this._buildCss("font-family", key);
            },
            //字体大小
            "change .number": function (event) {
                var value = parseInt($(event.currentTarget).val());
                value = isNaN(value) ? 0 : value;
                if (value > this.options.fontmax) {
                    value = this.options.fontmax;
                }
                if (value < this.options.fontmin) {
                    value = this.options.fontmin;
                }
                this.uifontEditor.find(".number").val(value);
                var fontsize = value + "px";
                this._buildCss("font-size", fontsize);
            },
            //行高
            "change .lhnumber": function (event) {
                var value = parseInt($(event.currentTarget).val());
                value = isNaN(value) ? 0 : value;
                var fontsize = parseInt(this.uifontEditor.find(".number").val());
                if (value > this.options.lhmax) {
                    value = this.options.lhmax;
                }
                if (value < fontsize) {
                    value = fontsize;
                }
                if (value < this.options.lhmin) {
                    value = this.options.lhmin;
                }
                this.uifontEditor.find(".lhnumber").val(value);
                var lineheight = value + "px";
                this._buildCss("line-heiht", lineheight);
            },
            //文字的位置
            "click .u-font-algin-box": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current").siblings().removeClass("current");
                var align = target.attr("data-role");
                if (target.hasClass("current")) {
                    this._buildCss("text-align", align);
                }
            },
            //文字加粗、斜体、下划线等
            "click .u-font-style-box": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current");
                var cssName = target.attr("data-role");
                this._buildCss(cssName, target.hasClass("current") ? target.attr("on") : target.attr("off"));
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        _fontTarget: function () {
            return this.options.frameName != "" ? $(this.options.targetSelector, $("#" + this.options.frameName)[0].contentWindow.document)
                : $(this.options.targetSelector);
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            font_modifier(this._value).call(this, newVal);

        },

        widget: function () {
            return this.uifontEditor;
        }
    });
})(jQuery);

//背景控件
(function ($) {
    function background_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    //背景
    $.widget("smart.backgroundEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "backgroundEditor",
        options: {
            stitle: "",
            cssPrefix: "",
            titleName: "背景",
            targetSelector: "",
            frameName: "",
            cssVars: ["background-position", "background-repeat", "background-size", "background-color", "background-gradient-top", "background-gradient-bottom", "background-image", "background-scroll"],
            bgimageId: "0",
            value: {},
            change: null,
            imageColor: false,
            imageGradient: false,
            imageScroll: false,
            display: {
                "background-color": true,
                "background-gradient": true,
                "background-image": true,
                "background-none": true,
                "background-opacity": true,//背景颜色透明度
                "cover": false,
                "contain": false,
                "100% 100%": false,
                "repeat": true,
                "repeat-x": true,
                "repeat-y": true,
                "no-repeat": true
            },
            cssChange: null
        },

        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });

        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var rolename = "bg_none";
            //没有设置为背景
            if ((cssStr[that.options.cssPrefix + "background-image"] != undefined && cssStr[that.options.cssPrefix + "background-image"] != "none")) {
                rolename = "bg_image";
            }
            else if (cssStr[that.options.cssPrefix + "background-gradient-top"] != undefined && cssStr[that.options.cssPrefix + "background-gradient-top"] != "none" && cssStr[that.options.cssPrefix + "background-gradient-top"] != "transparent") {
                rolename = "bg_gradientcolor";
            }
            else if ((cssStr[that.options.cssPrefix + "background-color"] != undefined && cssStr[that.options.cssPrefix + "background-color"] != "transparent") && cssStr[that.options.cssPrefix + "background-color"] != "none") {
                rolename = "bg_color";
            }

            that.uibackgroundEditor.find(".set-bgnav li[data-role='" + rolename + "'] a").tab("show");

            if (rolename == "bg_image") {
                var srolename = "";
                if (this.options.imageColor && this.options.imageGradient) {
                    if (cssStr[that.options.cssPrefix + "background-gradient-top"] != undefined && cssStr[that.options.cssPrefix + "background-gradient-top"] != "none" && cssStr[that.options.cssPrefix + "background-gradient-top"] != "transparent") {
                        srolename = "bg_image_gradientcolor";
                    }
                    else if ((cssStr[that.options.cssPrefix + "background-color"] != undefined && cssStr[that.options.cssPrefix + "background-color"] != "transparent") && cssStr[that.options.cssPrefix + "background-color"] != "none") {
                        srolename = "bg_image_color";
                    }
                } else if (this.options.imageColor) {
                    srolename = "bg_image_color";
                } else if (this.options.imageGradient) {
                    srolename = "bg_image_gradientcolor";
                }
                if (srolename.length > 1) {
                    that.uibackgroundEditor.find(".set-image-bgnav li[data-role='" + srolename + "'] a").tab("show");
                }
            }

            var cssVars = this.options.cssVars;
            var validCss = {};
            var prefix = that.options.cssPrefix;
            for (key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case "background-position":
                        that.uibackgroundEditor.find("ul.bgimg-bearing li[data-role='" + value + "']").addClass("current").siblings().removeClass("current");
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        that.uibackgroundEditor.find(".x-background-image").find(".change-bgimg-inner").css("background-position", value);
                        break;
                    case "background-repeat"://设置线型
                        var repeatli = that.uibackgroundEditor.find(".zoom-select .dropdown-list li[data-role='" + value + "']");
                        repeatli.addClass("current").siblings().removeClass("current");
                        var text = repeatli.text();
                        that.uibackgroundEditor.find(".zoom-select .showtext").text(text);
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        break;
                    case "background-size"://设置线型(裁剪填充),非裁剪填充直接跳出
                        if (value != "cover" && value != "100% 100%" && value != "contain") {
                            break;
                        }
                        var repeatli = that.uibackgroundEditor.find(".zoom-select .dropdown-list li[data-role='" + value + "']");
                        repeatli.addClass("current").siblings().removeClass("current");
                        var text = repeatli.text();
                        that.uibackgroundEditor.find(".zoom-select .showtext").text(text);
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        break;
                    case "background-color"://设置背景颜色
                        that.uibackgroundEditor.find(".background-color").spectrum("set", value == "none" ? "transparent" : value);
                        that.uibackgroundEditor.find(".background-image-color").spectrum("set", value == "none" ? "transparent" : value);
                        var color = that.uibackgroundEditor.find(".background-color").spectrum("get");
                        var alpha = color == null ? 1 : color.alpha;
                        that.uibackgroundEditor.find(".x-color-sliding").lzsliding("value", alpha * 100);
                        that.uibackgroundEditor.find(".bg-image-color-sliding").lzsliding("value", alpha * 100);
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        break;
                    case "background-gradient-top":
                    case "background-gradient-bottom":
                        that.uibackgroundEditor.find("." + keyWithOutPrefix + ",.image-" + keyWithOutPrefix).spectrum("set", value == "none" ? "transparent" : value);
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        break;
                    case "background-image"://设置背景图片
                        that.uibackgroundEditor.find(".x-background-image").find(".change-bgimg-inner").css("background-image", value);
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        if (value != "none") {
                            that.uibackgroundEditor.find(".x-image-background").show();
                            that.uibackgroundEditor.find(".x-background-scroll").show();
                        } else {
                            that.uibackgroundEditor.find(".x-image-background").hide();
                            that.uibackgroundEditor.find(".x-background-scroll").hide();
                        }
                        break;
                    case "background-scroll":// 设置背景滚动效果
                        that.uibackgroundEditor.find(".x-background-scroll").find(".animat-thumbnail-itme[data-role='" + value + "']").siblingsSelect("current");
                        that._scrollOptionsDisplay(value);
                        break;

                }
            }
            that._value(validCss);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
            var backgroundDiv = this.uibackgroundEditor.find(".fb_bg_img");
            var backgroundPosition = this.uibackgroundEditor.find("input[name='hf_background-position']");
            var backgroundRepeat = this.uibackgroundEditor.find("input[name='hf_background-repeat']");
            backgroundDiv.css("background-position", backgroundPosition.val());
            backgroundDiv.css("background-repeat", backgroundRepeat.val());
        },
        _getCreateOptions: function () {
            var options = {},
                element = this.element;

            $.each(["targetSelector", "frameName", "bgimageId"], function (i, option) {
                var value = element.attr(option);
                if (value != null && typeof (value) !== 'undefined' && value.length) {
                    options[option] = value;
                }
            });

            return options;
        },
        _draw: function () {
            var uibackgroundEditor = this.uibackgroundEditor = this.element;
            this.element.attr("role", "backgroundEditor");
            this.element.val(this.options.value);
            var that = this;

            uibackgroundEditor.find(".x-color-sliding").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, "%"],
                effect: function () {
                    that._clearGradient();
                    that._clearImageGradient();
                    that._clearImage();
                    var color = that.uibackgroundEditor.find(".background-color").spectrum("get");
                    var alphy = this.value() / 100;
                    var colorT = that._toColorT(color, alphy);
                    that.uibackgroundEditor.find(".background-color").spectrum("set", colorT.colorStr)
                    that._buildCss("background-color", colorT.colorStr); // #ff0000
                }
            });
            uibackgroundEditor.find(".bg-image-color-sliding").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, "%"],
                effect: function () {
                    that._clearGradient();
                    that._clearImageGradient();
                    var color = that.uibackgroundEditor.find(".background-image-color").spectrum("get");
                    var alphy = this.value() / 100;
                    var colorT = that._toColorT(color, alphy);
                    that.uibackgroundEditor.find(".background-image-color").spectrum("set", colorT.colorStr);
                    that._buildCss("background-color", colorT.colorStr); // #ff0000
                }
            });
            uibackgroundEditor.find(".bg-image-sliding").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, "%"],
                effect: function () {
                    var alphy = this.value() / 100;
                }
            });
            uibackgroundEditor.find(".background-color").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._setColorAlpha(color);
                    that._clearGradient();
                    that._clearImageGradient();
                    that._clearImage();
                }
            });
            uibackgroundEditor.find(".background-image-color").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._clearGradient();
                    that._clearImageGradient();
                    var colorT = that._toColorT(color);
                    that.uibackgroundEditor.find(".bg-image-color-sliding").lzsliding("value", colorT.alpha * 100);
                    that._buildCss("background-color", colorT.colorStr);
                }
            });

            uibackgroundEditor.find(".background-gradient-top").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._clearImage();
                    that._clearColor();
                    that._clearImageColor();
                    that._clearImageGradient();
                    that._buildCss("background-gradient-top", (color != null && color != "") ? color.toHexString() : "none"); // #ff0000
                }
            });
            uibackgroundEditor.find(".image-background-gradient-top").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._clearColor();
                    that._clearImageColor();
                    that._buildCss("background-gradient-top", (color != null && color != "") ? color.toHexString() : "none"); // #ff0000
                }
            });

            uibackgroundEditor.find(".background-gradient-bottom").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._clearImage();
                    var colorT = that._toColorT(color);
                    that.uibackgroundEditor.find(".x-color-sliding").lzsliding("value", colorT.alpha * 100);
                    that._buildCss("background-color", colorT.colorStr); // #ff0000
                    that._buildCss("background-image-color", colorT.colorStr); // #ff0000
                    that.uibackgroundEditor.find(".background-color").spectrum("set", color);
                    that.uibackgroundEditor.find(".background-image-color").spectrum("set", color);
                    that._buildCss("background-gradient-bottom", (color != null && color != "") ? color.toHexString() : "none"); // #ff0000
                }
            });
            uibackgroundEditor.find(".image-background-gradient-bottom").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that._clearColor();
                    that._clearImageColor();
                    that._buildCss("background-gradient-bottom", (color != null && color != "") ? color.toHexString() : "none"); // #ff0000
                }
            });

            if (!this.options.display["background-color"]) {
                uibackgroundEditor.find(".x-background-color").hide();
            }
            if (!this.options.display["background-opacity"]) {
                uibackgroundEditor.find(".x-background-opacity").hide();
            }
            if (!this.options.display["background-gradient"]) {
                uibackgroundEditor.find(".x-background-gradient").hide();
            }
            if (!this.options.display["background-image"]) {
                uibackgroundEditor.find(".x-background-image").hide();
            }
            if (!this.options.display["background-none"]) {
                uibackgroundEditor.find(".x-background-none").hide();
            }
            if (!this.options.display["repeat"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='repeat']").hide();
            }
            if (!this.options.display["no-repeat"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='no-repeat']").hide();
            }
            if (!this.options.display["repeat-x"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='repeat-x']").hide();
            }
            if (!this.options.display["repeat-y"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='repeat-y']").hide();
            }
            if (!this.options.display["cover"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='cover']").hide();
            }
            if (!this.options.display["contain"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='contain']").hide();
            }
            if (!this.options.display["100% 100%"]) {
                uibackgroundEditor.find(".dropdown-list li[data-role='100% 100%']").hide();
            }
            if (!this.options.display["background-gradient"] && !this.options.display["background-image"] && !this.options.display["background-none"]) {
                uibackgroundEditor.find(".set-bgnav").hide();
                uibackgroundEditor.find(".x-background-color-title").html(this.options.stitle);
            }
            if (!this.options.imageColor && !this.options.imageGradient) {
                uibackgroundEditor.find(".x-image-background").remove();
            } else {
                if (!this.options.imageColor || !this.options.imageGradient) {
                    uibackgroundEditor.find(".x-image-background-nav").remove();
                }
                if (!this.options.imageColor) {
                    uibackgroundEditor.find(".x-image-background-color").remove();
                }
                if (!this.options.imageGradient) {
                    uibackgroundEditor.find(".x-image-background-gradient").remove();
                }
            }
            if (!this.options.imageScroll) {
                uibackgroundEditor.find(".x-background-scroll").remove();
            }
            //将背景图片ID传递过来
            var hfIamgeId = this.uibackgroundEditor.find("input[name='background-image_Id']");
            hfIamgeId.val(this.options.bgimageId);
            //this.fillCss(null);
        },

        // update the value without triggering change
        _value: function (value, allowAny) {
            //var valString = convertCssArrayToString(value);
            //this.element.val(valString);
            $.data(this.element, "cssData", value);
            this._refresh();
        },

        _setOptions: background_modifier(function (options) {
            this._super(options);
            this._value(this.element.val());
        }),

        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            this.value(cssData);
            var data = {};
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            this._cssTarget().css(key, value);
        },

        _events: {
            //背景的形式，颜色还是背景图
            "click .set-bgnav li[data-role='bg_none']": function () {
                this._clearColor();
                this._clearImageColor();
                this._clearGradient();
                this._clearImageGradient();
                this._clearImage();
                this._clearTag();
            },
            //背景的平铺方式
            "click .zoom-select .dropdown-list li": function (event) {
                var target = $(event.currentTarget);
                var value = target.text();
                this.uibackgroundEditor.find(".zoom-select").find(".showtext").text(value);
                this.uibackgroundEditor.find(".zoom-select").find("ul.dropdown-list li").removeClass("current");
                target.toggleClass("current", true).siblings().removeClass("current");
                var cssValue = target.attr("data-role");
                //裁剪填充
                if (cssValue == "cover" || cssValue == "contain" || cssValue == "100% 100%") {
                    //先设置不平铺再做裁剪
                    this._buildCss("background-repeat", "no-repeat");
                    this._buildCss("background-size", cssValue);
                }
                else {
                    this._buildCss("background-repeat", cssValue);
                    this._buildCss("background-size", "auto");
                }
            },

            //背景的位置
            "click ul.bgimg-bearing li": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current", true).siblings().removeClass("current");
                var key = $(target).attr("data-role");
                this.uibackgroundEditor.find(".x-background-image").find(".change-bgimg-inner").css("background-position", key);
                this._buildCss("background-position", key);
            },
            //选择图片的界面
            "click .bgimg-title": function (event) {
                //var hfIamgeId = this.uibackgroundEditor.find("input[name='background-image_Id']");
                //var backgroundDiv = this.uibackgroundEditor.find(".fb_bg_img");
                var that = this;
                ShowPictureDialog(1, function (data) {
                    if (!that.options.imageColor) {
                        that._clearColor();
                        that._clearImageColor();
                    }
                    if (!that.options.imageGradient) {
                        that._clearGradient();
                        that._clearImageGradient();
                    }
                    if (data.length == 1) {
                        that.uibackgroundEditor.find(".x-image-background").show();
                        that.uibackgroundEditor.find(".x-background-scroll").show();
                        var pictureUrl = data[0].PicUrl;
                        var pictureThumUrl = data[0].PicThumUrl;
                        //var pictureTitle = data[0].PictureTitle;
                        var pictureId = data[0].PictureId;
                        var mimeType = data[0].MimeType;
                        that.uibackgroundEditor.find(".x-background-image").find(".change-bgimg-inner")
                            .css("background-image", "url(" + pictureThumUrl + ")")
                            .attr("data-imageId", pictureId)
                            .attr("data-pictureUrl", pictureUrl)
                            .attr("mime-type", mimeType);
                        that._buildCss("background-imageId", pictureId || "0");
                        that._buildCss("background-image", "url(" + pictureUrl + ")"); // 清空背景图片
                    } else {
                        that._clearImage();
                    }
                });
            },
            "click .x-background-scroll-options": function (event) {
                var target = $(event.currentTarget);
                target.siblingsSelect("current");
                var key = $(target).attr("data-role");
                this._scrollOptionsDisplay(key);
                this._buildCss("background-scroll", key);
            }
        },
        _toColorT: function (color, inputalphy) {
            var colorStr = "transparent";
            var alpha = 1;
            if (color != null && color != "") {
                alpha = color.alpha;
                colorStr = color.toRgbString(inputalphy);
            }
            var alpha = inputalphy || alpha;
            return {
                alpha: alpha,
                colorStr: colorStr
            };
        },
        _setColor: function (color, alphy) {
            var colorT = this._toColorT(color, alphy);
            this._buildCss("background-color", colorT.colorStr);
        },
        _setColorAlpha: function (color, alphy) {
            var colorT = this._toColorT(color, alphy);
            this.uibackgroundEditor.find(".x-color-sliding").lzsliding("value", colorT.alpha * 100);
            this._buildCss("background-color", colorT.colorStr);
        },
        _setImageColorAlpha: function (color, alphy) {
            var colorT = this._toColorT(color, alphy);
            this.uibackgroundEditor.find(".x-color-sliding").lzsliding("value", colorT.alpha * 100);
            this._buildCss("background-color", colorT.colorStr);
        },
        _clearColor: function () {
            this._buildCss("background-color", "transparent");
            this.uibackgroundEditor.find(".background-color").spectrum("set", "transparent");
        },
        _clearImageColor: function () {
            this.uibackgroundEditor.find(".background-image-color").spectrum("set", "transparent");
        },
        _clearGradient: function () {
            this._buildCss("background-gradient-top", "none"); // 清空渐变
            this._buildCss("background-gradient-bottom", "none"); // 清空渐变
            this.uibackgroundEditor.find(".background-gradient-top,.background-gradient-bottom").spectrum("set", "transparent");
        },
        _clearImageGradient: function () {
            this.uibackgroundEditor.find(".image-background-gradient-top,.image-background-gradient-bottom").spectrum("set", "transparent");
        },
        _clearImage: function () {
            this._buildCss("background-image", "none"); // 清空背景图片
            this._buildCss("background-imageId", "0");
            this._buildCss("background-size", "auto");
            this._buildCss("background-scroll", "none");
            this.uibackgroundEditor.find(".x-image-background").hide();
            this.uibackgroundEditor.find(".x-background-scroll").hide();
            this.uibackgroundEditor.find(".x-background-scroll").find(".animat-thumbnail-itme[data-role='none']").siblingsSelect("current");
            this._scrollOptionsDisplay("none");
            this.uibackgroundEditor.find(".x-background-image").find(".change-bgimg-inner").css("background-image", "none");
        },
        _clearTag: function () {
            this._buildCss("background-clear", "clear");
        },
        _scrollOptionsDisplay: function (key) {
            if (key == "scroll") {
                this.uibackgroundEditor.find(".dropdown-list li[data-role='no-repeat']").hide();
                this.uibackgroundEditor.find(".dropdown-list li[data-role='repeat-x']").hide();
                this.uibackgroundEditor.find(".dropdown-list li[data-role='repeat-y']").hide();
                this.uibackgroundEditor.find(".dropdown-list li[data-role='contain']").hide();
                var zoomvalue = this.uibackgroundEditor.find(".dropdown-list li.current").attr("data-role");
                if (zoomvalue == "no-repeat" || zoomvalue == "repeat-x" || zoomvalue == "repeat-y" || zoomvalue == "contain") {
                    this.uibackgroundEditor.find(".dropdown-list li[data-role='repeat']").click();
                }
            } else {
                if (this.options.display["no-repeat"]) {
                    this.uibackgroundEditor.find(".dropdown-list li[data-role='no-repeat']").show();
                }
                if (this.options.display["repeat-x"]) {
                    this.uibackgroundEditor.find(".dropdown-list li[data-role='repeat-x']").show();
                }
                if (this.options.display["repeat-y"]) {
                    this.uibackgroundEditor.find(".dropdown-list li[data-role='repeat-y']").show();
                }
                
                // this.uibackgroundEditor.find(".dropdown-list li[data-role='contain']").show();
                if (this.options.display["contain"]) {
                    this.uibackgroundEditor.find(".dropdown-list li[data-role='contain']").show();
                }
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        _cssTarget: function () {
            return this.options.frameName != "" ? $(this.options.targetSelector, $("#" + this.options.frameName)[0].contentWindow.document)
                : $(this.options.targetSelector);
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            background_modifier(this._value).call(this, newVal);

        },

        widget: function () {
            return this.uibackgroundEditor;
        }
    });
})(jQuery);

//颜色控件
(function ($) {
    //颜色
    $.widget("smart.colorEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "colorEditor",
        options: {
            stitle: "",
            titleName: "颜色",
            targetSelector: "",
            frameName: "",
            cssVars: ["color"],
            value: {},
            change: null,
            cssChange: null
        },
        _create: function () {

            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });

        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var cssVars = this.options.cssVars;
            var validCss = {};
            var prefix = that.options.cssPrefix;
            for (key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case "color"://设置颜色
                        that.uicolorEditor.find(".color").spectrum("set", value == "none" ? "transparent" : value);
                        var color = that.uicolorEditor.find(".color").spectrum("get");
                        var alpha = color == null ? 1 : color.alpha;
                        that.uicolorEditor.find(".color-sliding").lzsliding("value", alpha * 100);
                        validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                        break;

                }
            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });

        },
        _draw: function () {
            var uicolorEditor = this.uicolorEditor = this.element;
            this.element.attr("role", "colorEditor");
            this.element.val(this.options.value);
            var that = this;
            uicolorEditor.find(".color-sliding").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, "%"],
                effect: function () {
                    var color = that.uicolorEditor.find(".color").spectrum("get");
                    var alphy = this.value() / 100;
                    var colorString = (color != null && color != "") ? color.toRgbString(alphy) : "transparent";
                    that.uicolorEditor.find(".color").spectrum("set", colorString);
                    that._buildCss("color", colorString); // #ff0000
                }
            });
            uicolorEditor.find(".color").spectrum({
                allowEmpty: true,
                color: "",
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    var alpha = (color != null && color != "") ? color.alpha : 1;
                    that._buildCss("color", (color != null && color != "") ? color.toRgbString(alpha) : "transparent");
                }
            });
            if (this.options.stitle) {
                if (this.options.stitle.length > 0) {
                    this.uicolorEditor.find(".x-color-title").html(this.options.stitle).show();
                }
            }
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            var data = {};
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);

        },

        _events: {
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.uicolorEditor;
        }
    });
})(jQuery);

//分割线控件
(function ($) {
    function divider_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("smart.dividerEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "dividerEditor",
        options: {
            targetSelector: "",
            frameName: "",
            titleName: "分割线",
            cssVars: ["border-bottom-style", "border-left-style", "border-right-style", "border-top-style", "border-bottom-width", "border-left-width", "border-right-width", "border-top-width", "border-bottom-color", "border-left-color", "border-right-color", "border-top-color"],
            value: {},
            cssPrefix: "",
            position: "bottom",
            change: null,
            oneCssChange: null
        },

        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        //将初始CSS值填充为控件
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            cssVars = this.options.cssVars;
            var validCss = {};
            var prefix = that.options.cssPrefix;
            var position = that.options.position;
            for (key in cssVars) {
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case "border-" + position + "-style"://设置线型
                        that.uiborderEditor.find("li[data-role='" + value + "']").addClass("current").siblings().removeClass("current");
                        that.uiborderEditor.find("input[data-role='border-" + position + "-style']").val(value);
                        validCss[keyWithPrefix] = value;
                        break;
                    case "border-" + position + "-color"://设置边框颜色
                        that.uiborderEditor.find(".spectrumfull").spectrum("set", value);
                        validCss[keyWithPrefix] = value;
                        break;
                    case "border-" + position + "-width"://设置边框宽度
                        that.uiborderEditor.find("input[name='divider_border-bottom-width']").val(YibuTrimPx(value));
                        validCss[keyWithPrefix] = value;
                        break;
                }
            }
            that._value(validCss);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });

        },
        _getCreateOptions: function () {
            var options = {},
                element = this.element;

            $.each(["targetSelector", "frameName"], function (i, option) {
                var value = element.attr(option);
                if (value !== undefined && value.length) {
                    options[option] = value;
                }
            });

            return options;
        },
        _draw: function () {
            var uiborderEditor = this.uiborderEditor = this.element;

            this.element.attr("role", "border-" + this.options.position + "-style");
            this.element.val(this.options.value);
            var that = this;
            //线宽
            uiborderEditor.find("input[name='divider_border-bottom-width']").spinner({
                change: function (event, ui) {
                    that._buildCss("border-" + that.options.position + "-width", $(this).val() + "px");
                }
            });
            uiborderEditor.find(".spectrumfull").spectrum({
                allowEmpty: true,
                Item_border_color: "#ECC",
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (Item_border_color) {
                    that._buildCss("border-" + that.options.position + "-color", (Item_border_color != null && Item_border_color != "") ? Item_border_color.toHexString() : "transparent"); // #ff0000
                }

            });
            this.fillCss(null);
        },

        // update the value without triggering change
        _value: function (value, allowAny) {
            //var valString = convertCssArrayToString(value);
            //this.element.val(valString);
            $.data(this.element, "cssData", value);
        },
        _setOptions: divider_modifier(function (options) {
            this._super(options);
            this._value(this.element.val());
        }),

        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            this.value(cssData);
            this._trigger("oneCssChange", null, key + ":" + value);
            this._cssTarget().css(key, value);
        },

        _events: {
            //边框线型的选择
            "click .fc_borderstyle_wrap li": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current").siblings().removeClass("current");
                target.parent().next().val(target.attr("data-role"));

                var cssValue = target.attr("data-role");
                this._buildCss("border-" + this.options.position + "-style", cssValue);

            },

            //线宽
            "change input[name='divider_border-bottom-width']": function (event) {
                var borderwidth = $(event.currentTarget).val() + "px";
                this._buildCss("border-" + this.options.position + "-width", borderwidth);
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        _cssTarget: function () {
            return this.options.frameName != "" ? $(this.options.targetSelector, $("#" + this.options.frameName)[0].contentWindow.document)
                : $(this.options.targetSelector);
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            divider_modifier(this._value).call(this, newVal);

        },
        changePosition: function (position) {
            this.options.position = position;
        },
        widget: function () {
            return this.uiborderEditor;
        }
    });
    function border_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
})(jQuery);

//阴影控件
(function ($) {
    function shadow_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("smart.shadowEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "shadowEditor",
        options: {
            titleName: "阴影",
            targetSelector: "",
            cssVars: ["box-shadow-x", "box-shadow-y", "box-shadow-blur", "box-shadow-color"],
            frameName: "",
            value: { "box-shadow": "0px 0px 0px transparent" },
            change: null,
            cssChange: null
        },

        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var cssVars = this.options.cssVars;
            var validCss = {};
            var prefix = that.options.cssPrefix;
            var x, y;
            for (key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case "box-shadow-x":
                        x = YibuTrimFloatPx(value);
                        validCss[keyWithPrefix] = value;
                        if (y != undefined) {
                            var size = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
                            that.uishadowEditor.find(".shadown-size").lzsliding("value", size);
                            if (size == 0) {
                                size = 1;
                            }
                            var degree = Math.asin(-x / size) / Math.PI * 180;
                            degree = Math.round(degree);
                            if (degree < 0) {
                                degree = 360 + degree;
                            } else if (degree < 180 && degree > 90) {
                                degree = 180 - degree;
                            }
                            that.uishadowEditor.find(".shadown-degrees").lzsliding("value", degree);
                        }
                        break;
                    case "box-shadow-y":
                        y = YibuTrimFloatPx(value);
                        validCss[keyWithPrefix] = value;
                        if (x != undefined) {
                            // 此处算法计算还有bug
                            var size = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
                            that.uishadowEditor.find(".shadown-size").lzsliding("value", size);
                            if (size == 0) {
                                size = 1;
                            }
                            var degree = Math.asin(-x / size) / Math.PI * 180;
                            degree = Math.round(degree);
                            if (degree < 0) {
                                degree = 360 + degree;
                            } else if (degree < 180 && degree > 90) {
                                degree = 180 - degree;
                            }
                            that.uishadowEditor.find(".shadown-degrees").lzsliding("value", degree);
                        }
                        break;
                    case "box-shadow-blur":
                        validCss[keyWithPrefix] = value;
                        that.uishadowEditor.find(".shadown-blur").lzsliding("value", YibuTrimFloatPx(value));
                        break;
                    case "box-shadow-color":
                        that.uishadowEditor.find(".color").spectrum("set", value);
                        var color = that.uishadowEditor.find(".color").spectrum("get");
                        var alpha = color == null ? 1 : color.alpha;
                        that.uishadowEditor.find(".shadown-color").lzsliding("value", alpha * 100);
                        validCss[keyWithPrefix] = value;
                        break;
                }
            }
            that._value(validCss);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });

        },
        _getCreateOptions: function () {
            var options = {},
                element = this.element;

            $.each(["targetSelector", "frameName"], function (i, option) {
                var value = element.attr(option);
                if (value !== undefined && value.length) {
                    options[option] = value;
                }
            });

            return options;
        },
        _draw: function () {
            var uishadowEditor = this.uishadowEditor = this.element;

            this.element.attr("role", "shadowEditor");
            this.element.val(this.options.value);
            var that = this;

            uishadowEditor.find(".xspinner").xspinner();
            uishadowEditor.find(".shadown-size").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, ""],
                effect: function () {
                    var size = this.value();
                    var degrees = that.uishadowEditor.find(".shadown-degrees").lzsliding("value");
                    var x = -Math.sin(Math.PI * 2 / 360 * degrees) * size;
                    var y = Math.cos(Math.PI * 2 / 360 * degrees) * size;
                    that._buildCss("box-shadow-x", x.toFixed(6) + "px");
                    that._buildCss("box-shadow-y", y.toFixed(6) + "px");
                }
            });
            uishadowEditor.find(".shadown-blur").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, ""],
                effect: function () {
                    that._buildCss("box-shadow-blur", this.value() + "px");
                }
            });
            uishadowEditor.find(".shadown-degrees").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, "°"],
                effect: function () {
                    var size = that.uishadowEditor.find(".shadown-size").lzsliding("value");
                    var degrees = this.value();
                    var x = -Math.sin(Math.PI / 180 * degrees) * size;
                    var y = Math.cos(Math.PI / 180 * degrees) * size;
                    that._buildCss("box-shadow-x", x.toFixed(6) + "px");
                    that._buildCss("box-shadow-y", y.toFixed(6) + "px");
                }
            });

            uishadowEditor.find(".shadown-color").lzsliding({
                valSelect: { val: '.txt-num', unit: '' },
                openUnit: [true, "%"],
                effect: function () {
                    var color = that.uishadowEditor.find(".color").spectrum("get");
                    var alphy = this.value() / 100;
                    var colorString = (color != null && color != "") ? color.toRgbString(alphy) : "transparent";
                    that.uishadowEditor.find(".color").spectrum("set", colorString);
                    that._buildCss("box-shadow-color", colorString); // #ff0000
                }
            });

            uishadowEditor.find(".color").spectrum({
                allowEmpty: true,
                color: "#ECC",
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    that.uishadowEditor.find(".shadown-color").lzsliding("value", color.alpha * 100);
                    that._buildCss("box-shadow-color", (color != null && color != "") ? color.toRgbString() : "transparent"); // #ff0000
                }

            });

            this.fillCss(null);
        },

        // update the value without triggering change
        _value: function (value, allowAny) {

            $.data(this.element, "cssData", value);
        },

        _setOptions: shadow_modifier(function (options) {
            this._super(options);
            this._value(this.element.val());
        }),

        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            this.value(cssData);
            var data = {};
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            this._cssTarget().css(key, value);
        },

        _events: {
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        _cssTarget: function () {
            return this.options.frameName != "" ? $(this.options.targetSelector, $("#" + this.options.frameName)[0].contentWindow.document)
                : $(this.options.targetSelector);
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            shadow_modifier(this._value).call(this, newVal);

        },

        widget: function () {
            return this.uishadowEditor;
        }
    });
})(jQuery);

//数字控件
(function ($) {

    $.widget("smart.spinnerEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "spinnerEditor",
        options: {
            titleName: "数字框",
            cssPrefix: "$",
            targetSelector: "",
            cssVars: ["content-width"],
            step: 1,
            frameName: "",
            change: null,
            cssChange: null
        },

        _create: function () {

            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var cssVars = this.options.cssVars;
            var prefix = that.options.cssPrefix;
            for (key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                if (keyWithOutPrefix == this.options.cssVars[0]) {
                    that.spinnerEditor.find("input[data-role=smart_spinnerEditor]").val(YibuTrimPx(value));
                    break;
                }

            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var spinnerEditor = this.spinnerEditor = this.element;
            this.element.attr("role", "spinnerEditor");
            this.element.val(this.options.value);
            var that = this;
            //各种值的改变事件
            spinnerEditor.find(".number").spinner({
                step: that.options.step,
                numberFormat: "n",
                change: function (event, ui) {
                    var data_role = that.options.cssVars[0];
                    that._buildCss(data_role, $(this).val() + "px");
                }
            });
            this.fillCss(null);
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var data = {};
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
        },

        _events: {
            //线宽
            "change .number": function (event) {
                var target = $(event.currentTarget);
                var data_role = this.options.cssVars[0];
                this._buildCss(data_role, target.val() + "px");
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.spinnerEditor;
        }
    });
})(jQuery);

//分页控件
(function ($) {
    $.widget("smart.paginationEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "paginationEditor",
        options: {
            titleName: "分页",
            cssPrefix: "$",
            targetSelector: "",
            cssVars: ["pg-type", "pg-color"],
            frameName: "",
            change: null,
            cssChange: null
        },

        _create: function () {

            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var cssVars = this.options.cssVars;
            var prefix = that.options.cssPrefix;
            for (key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case 'pg-type':
                        smartInitDropdownList(that.paginationEditor, ".pgtype_select", keyWithOutPrefix, value);
                        break;
                    case 'pg-color':
                        smartInitDropdownList(that.paginationEditor, ".pgcolor_select", keyWithOutPrefix, value);
                        break;
                }
            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });

        },
        _draw: function () {
            var paginationEditor = this.paginationEditor = this.element;
            this.element.attr("role", "paginationEditor");
            this.element.val(this.options.value);
            var that = this;
            this.fillCss(null);
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var data = {};
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
        },

        _events: {
            //线宽
            "click .select": function (event) {
                $(event.currentTarget).children("ul.select_list").toggle();
            },
            //字体名称
            "click ul.select_list li": function (event) {
                var $target = $(event.currentTarget);
                var value = $target.text();
                var key = $target.attr("data-role");
                var type = $target.attr('key');
                $target.parent().siblings(".select_txt").text(value).attr('key', key);
                if (typeof (key) === 'undefined' || key == null) {
                    key = value;
                }
                var $current = $(event.currentTarget).parent().parent().find("input");
                var currentValue = $current.val();
                if (currentValue !== key) {
                    $current.val(key);
                    this._buildCss(type, key);
                }
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.paginationEditor;
        }
    });
})(jQuery);

//图标控件
(function ($) {
    $.widget("smart.iconEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "iconEditor",
        options: {
            titleName: "图标",
            cssPrefix: "$",
            targetSelector: "",
            cssVars: ["Icon"],
            frameName: "",
            change: null,
            cssChange: null
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillData: function (dataVals) {
            var iconText = dataVals.Icon == '' || dataVals.Icon == null ? '无' : dataVals.Icon;
            this.iconEditor.find('.square-box-content .mw-iconfont').html(decodeURIComponent(iconText));

            var iconModal = this.iconEditor.find('.m-swtch-modal');
            iconModal.find(".z-current").removeClass("z-current");
            if (dataVals.IdiomaticIconId && dataVals.IdiomaticIconId != "null") {
                var currentli = iconModal.find(".icon-pane-itme[data-target='idiomatic'] i.mw-iconfont:contains('" + iconText + "')[iconId='" + dataVals.IdiomaticIconId +"']").closest("li").addClass("z-current");
                var panel = currentli.closest(".icon-pane-itme");
                var target = panel.attr("data-target");
                panel.addClass("active").siblings().removeClass("active");
                iconModal.find(".modal-title-nav li[data-target='" + target + "']").addClass("active").siblings().removeClass("active");
            } else {
                var currentli = iconModal.find(".icon-pane-itme:not([data-target='idiomatic']) i.mw-iconfont:contains('" + iconText + "')").closest("li").addClass("z-current");
                var panel = currentli.closest(".icon-pane-itme");
                var target = panel.attr("data-target");
                panel.addClass("active").siblings().removeClass("active");
                iconModal.find(".modal-title-nav li[data-target='" + target + "']").addClass("active").siblings().removeClass("active");
            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var iconEditor = this.iconEditor = this.element;
            this.element.attr("role", "iconEditor");
            var that = this;

            //iconModal对象在绑定事件后会产生一个闭包,一直驻留在事件回调方法的内部
            var iconModal = iconEditor.find('.m-swtch-modal');

            //绑定弹窗显示事件与滚轮事件
            iconEditor.find('.icon-change-btn>a').off('click').on('click', function () {
                $('body').append(iconModal);
                iconModal.modal('show');

            });
            iconModal.find('.fixation-scroll').lzscroll({ mode: 'hover', listenChange: false, speed: 30 });

            //绑定tab切换事件
            iconModal.find('.modal-title-nav>li').off('click').on('click', function () {
                //if ($(this).attr('data-target') == 'line') {
                //    iconModal.find('.tab-content>li').last().removeClass('active');
                //    iconModal.find('.tab-content>li').first().addClass('active');
                //} else {
                //    iconModal.find('.tab-content>li').first().removeClass('active');
                //    iconModal.find('.tab-content>li').last().addClass('active');
                //}
                iconModal.find('.tab-content>li').removeClass('active');
                iconModal.find('.tab-content>li[data-target="' + $(this).attr("data-target") + '"]').addClass('active')
            });

            iconModal.find(".m-icon-choose>li").off('click').on('click', function () {
                iconModal.find(".z-current").removeClass("z-current");
                $(this).addClass("z-current");
                var panel = $(this).closest(".icon-pane-itme");
                var target = panel.attr("data-target");
                panel.addClass("active").siblings().removeClass("active");
                iconModal.find(".modal-title-nav li[data-target='" + target + "']").addClass("active").siblings().removeClass("active");
                var value = $(this).find('i').html();
                var idiomaticIconId = $(this).find('i').attr('iconId');
                var fontColor = $(this).find('i').attr('fontColor');
                var fontSize = $(this).find('i').attr('fontSize');
                var fontWeight = $(this).find('i').attr('fontWeight');
                that._buildCss("Icon", value, idiomaticIconId, fontColor, fontSize, fontWeight);
                iconModal.modal('hide');
            });
        },
        _buildCss: function (key, value, idiomaticIconId, fontColor, fontSize, fontWeight) {
            var data = {};
            data.key = key;
            data.value = value;
            data.needRefresh = true;
            data.callBack = null;
            if (data.value === "无") {
                data.value = "";
            }
            data.idiomaticIconId = idiomaticIconId;
            data.fontColor = fontColor;
            data.fontSize = fontSize;
            data.fontWeight = fontWeight;
            this.iconEditor.find('.square-box-content .mw-iconfont').html(value);
            this._trigger("cssChange", null, data);
            //this.iconEditor.find('.m-swtch-modal').modal('hide');
        },
        _events: {
            //选择图标事件
            "click .m-icon-choose>li": function (event) {
                var $target = $(event.currentTarget);
                var value = $target.find('i').html();
                this._buildCss("Icon", value);
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.iconEditor;
        }
    });
})(jQuery);

//线条控件
(function ($) {
    function border_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("ui.lineEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "lineEditor",
        options: {
            titleName: "线条",
            targetSelector: "",
            frameName: "",
            cssVars: ["border-style", "border-width", "border-color"],
            isSimple: false,//是否是精简版
            change: null,
            cssChange: null
        },

        _create: function () {

            this._draw();
            this._on(this._events);
            this._refresh();

            // turning off autocomplete prevents the browser from remembering the
            // value when navigating through history, so we re-enable autocomplete
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        //将初始CSS值填充为控件
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var validCss = {
            };
            var prefix = that.options.cssPrefix;
            var cssVars = this.options.cssVars;
            for (key in cssVars) {
                var isBgKey = false;
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {

                    case "border-style":
                        {
                            if (typeof (value) != "undefined" && value != "") {

                                that.uiborderEditor.find("li[data-role='" + value + "']").addClass("current active").siblings().removeClass("current active");

                                that.uiborderEditor.find("input[data-role='border-style']").val(value);
                            }
                            break;
                        }
                    case "border-color":
                        if (value == "none" || value == "transparent") {
                            value = "rgba(0, 0, 0, 0)";
                        }
                        that.uiborderEditor.find(".spectrumfull").spectrum("set", value);
                        validCss[keyWithPrefix] = value;
                        break;
                    case "border-width"://设置边框宽度
                        if (value != 'none') {
                            that.uiborderEditor.find("input[name='border-width']").val(YibuTrimPx(value));
                        }

                        validCss[keyWithPrefix] = value;
                        break;
                    case "border-radius":
                        that.uiborderEditor.find("input[name='border-radius']").val(YibuTrimPx(value));
                        validCss[keyWithPrefix] = value;
                        break;
                }
            }
            that._value(validCss);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });

        },
        _getCreateOptions: function () {
            var options = {},
                element = this.element;

            $.each(["targetSelector", "frameName"], function (i, option) {
                var value = element.attr(option);
                if (value !== undefined && value.length) {
                    options[option] = value;
                }
            });
            return options;
        },
        _draw: function () {
            var uilineEditor = this.uilineEditor = this.element;

            this.element.attr("role", "lineEditor");
            this.element.val(this.options.value);
            var that = this;
            //线宽
            uilineEditor.find("input[name='border-width']").spinner({
                change: function (event, ui) {
                    var borderwidth = $(this).val() + "px";
                    //修改已经选中的边框的样式
                    that._buildCss("border-width", borderwidth);
                }
            });

            uilineEditor.find(".spectrumfull").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    //修改已经选中的边框的样式
                    var borderColor = (color != null && color != "") ? color.toHexString() : "transparent";
                    that._buildCss("border-color", borderColor);
                }

            });
            this.fillCss(null);
        },

        // update the value without triggering change
        _value: function (value, allowAny) {

            $.data(this.element, "cssData", value);
        },

        _setOptions: border_modifier(function (options) {
            this._super(options);
            this._value(this.element.val());
        }),

        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[tempKey] = value;
            var data = {
            };
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            //this._cssTarget().css(key, value);
        },
        //获取当前正在设置的边框数组，某一侧边框，或者所有边框
        _getPrefix: function () {
            var target = this.uiborderEditor.find(".fb_border_wrap .fb_border_current");
            var prefixs = new Array();
            var attrVal = "";
            target.each(function (index, el) {
                attrVal = $(el).attr("data-role");
                if (attrVal != "border") {
                    prefixs.push($(el).attr("data-role"));
                }
            });
            return prefixs;
        },

        _events: {

            //边框线型的选择
            "click .fc_borderstyle_wrap li": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current active").siblings().removeClass("current active");
                target.parent().next().val(target.attr("data-role"));
                var cssValue = target.attr("data-role");
                var that = this;
                that._buildCss("border-style", cssValue);

            },

            //线宽
            "change input[name='border-width']": function (event) {
                var borderwidth = $(event.currentTarget).val() + "px";
                var that = this;
                //修改已经选中的边框的样式
                var prefixs = this._getPrefix();
                $.each(prefixs, function (i, prefix) {
                    if (borderwidth == "px") {
                        borderwidth = "0px";
                    }
                    that._buildCss(prefix + "-width", borderwidth);
                });
            }

        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        _cssTarget: function () {
            return this.options.frameName != "" ? $(this.options.targetSelector, $("#" + this.options.frameName)[0].contentWindow.document)
                : $(this.options.targetSelector);
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            border_modifier(this._value).call(this, newVal);

        },

        widget: function () {
            return this.uiborderEditor;
        }
    });
})(jQuery);

//下拉选择框控件
(function ($) {
    //颜色 selectData格式array() arrayItem={},arrayItem.itemText="",arrayItem.itemValue=""
    $.widget("smart.selectEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "selectEditor",
        options: {
            cssPrefix: "",
            cssVars: [""],
            reminder: null,
            cssChange: null,
            selectData: null,
            needRefresh: false
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });

        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var selectValue;
            if (typeof cssStr == "string" || typeof cssStr == "number") {
                selectValue = cssStr;
            } // 样式
            else if (typeof cssStr == "object") {
                var cssVars = this.options.cssVars;
                var validCss = {};
                var prefix = that.options.cssPrefix;
                for (key in cssVars) {
                    var isBgKey = false;
                    var keyWithOutPrefix = cssVars[key];
                    var keyWithPrefix = prefix + keyWithOutPrefix;
                    var value = cssStr[keyWithPrefix];
                    if (value == null || typeof (value) === 'undefined') {
                        continue;
                    }
                    switch (keyWithOutPrefix) {
                        case cssVars[0]:
                            selectValue = value;
                            validCss[keyWithPrefix] = cssStr[keyWithPrefix];
                            break;
                    }
                }
                that._value(validCss);
            }
            if (typeof selectValue != "undefined") {
                var selectli = that.selectEditor.find("ul.dropdown-list li[data-role='" + selectValue + "']");
                if (selectli.length == 0) {
                    selectli = that.selectEditor.find("ul.dropdown-list li:eq(0)");
                    if (selectli.length > 0) {
                        selectli.click();
                        return;
                    }
                } else {selectli.click();}
                selectli.addClass("current").siblings().removeClass("current");
                console.log(selectli.text(),'texttext')
                that.selectEditor.find(".showtext").html(selectli.text());
            }
        },
        reDraw: function (data) {
            var that = this;
            if (data != null) {
                var len = data.length;
                var html = new Array();
                for (var i = 0; i < len; i++) {
                    var item = data[i];
                    html.push("<li data-role=\"" + item.itemValue + "\"><a href='javascript:void(0)' class='dropLink'>" + item.itemText + "</a><i class='check icon icon-check hewi10'></i></li>");
                }
                var htmlStr = html.join("");
                that.selectEditor.find('.dropdown-list').html(htmlStr);
            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });

        },
        _draw: function () {
            var selectEditor = this.selectEditor = this.element;
            this.element.attr("role", "selectEditor");
            var that = this;
            if (that.options.selectData != null) {
                var len = that.options.selectData.length;
                var html = new Array();
                for (var i = 0; i < len; i++) {
                    var item = that.options.selectData[i];
                    html.push("<li data-role=\"" + item.itemValue + "\"><a href='javascript:void(0)' class='dropLink'>" + item.itemText + "</a><i class='check icon icon-check hewi10'></i></li>");
                }
                var htmlStr = html.join("");
                that.selectEditor.find('.dropdown-list').html(htmlStr);
            }
            that.selectEditor.find(".dropdown").on("shown.bs.dropdown", function () {
                var height = that.selectEditor.outerHeight();
                var dropheight = that.selectEditor.find(".dropdown-list").outerHeight();
                that.selectEditor.parent().css("min-height", (height + dropheight + 38) + "px");
            });
            that.selectEditor.find(".dropdown").on("hidden.bs.dropdown", function () {
                var height = that.selectEditor.outerHeight();
                var dropheight = that.selectEditor.find(".dropdown-list").outerHeight();
                that.selectEditor.parent().css("min-height", (height + dropheight) + "px");
            });
            if (that.options.reminder != null) {
                that.selectEditor.find('.lztip').removeClass("f-hide");
                that.selectEditor.find('.lztip').attr("data-lztitle", that.options.reminder);
            }
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[tempKey] = value;
            var data = {};
            data.key = tempKey;
            data.value = value;
            data.needRefresh = this.options.needRefresh;
            this._trigger("cssChange", null, data);

        },
        // update the value without triggering change
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
        },
        _events: {
            //选择框项单击事件
            "click ul.dropdown-list li": function (event) {
                var selectli = $(event.currentTarget);
                var value = selectli.attr("data-role");
                var text = selectli.text();
                if (typeof (value) === 'undefined' || value == null) {
                    value = text;
                }
                this.selectEditor.find(".showtext").html(text);
                selectli.addClass("current").siblings().removeClass("current");
                this._buildCss(this.options.cssVars[0], value);
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.selectEditor;
        }
    });
}(jQuery));

//边框控件
(function ($) {
    function border_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }

    function shadow_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }

    var borders = {
        init: function () {
            this.border();
            this.fullBorder();
        },
        border: function () {
            $.widget("ui.borderEditor", {
                version: "1.10.3",
                defaultElement: "<input type='hidden'/>",
                widgetEventPrefix: "borderEditor",
                options: {
                    titleName: "边框",
                    targetSelector: "",
                    frameName: "",
                    cssVars: ["border-style", "border-width", "border-color", "border-radius"],
                    isSimple: false,//是否是精简版
                    change: null,
                    cssChange: null,
                    minBorderWidth: 0,//最小线宽宽度
                    maxBorderWidth: 5,//最大线宽宽度
                    minRadiusWidth: 0,//最小圆角宽度
                    maxRadiusWidth: 100,//最大圆角宽度
                    display: {
                        "border-width": true,
                        "border-color": true,
                        "border-style": true,
                        "border-square": true,
                        "border-radius": false
                    }
                },

                _create: function () {
                    this._draw();
                    this._on(this._events);
                    this._refresh();

                    // turning off autocomplete prevents the browser from remembering the
                    // value when navigating through history, so we re-enable autocomplete
                    // if the page is unloaded before the widget is destroyed. #7790
                    this._on(this.window, {
                        beforeunload: function () {
                            this.element.removeAttr("autocomplete");
                        }
                    });
                },
                //将初始CSS值填充为控件
                fillCss: function (cssStr, oldCssArr) {
                    if (cssStr == null || typeof (cssStr) === 'undefined') {
                        return;
                    }
                    var that = this;
                    var validCss = {
                    };
                    var prefix = that.options.cssPrefix;
                    var cssVars = this.options.cssVars;

                    for (key in cssVars) {
                        var isBgKey = false;
                        var keyWithOutPrefix = cssVars[key];
                        var keyWithPrefix = prefix + keyWithOutPrefix;
                        var value = cssStr[keyWithPrefix];
                        if (value == null || typeof (value) === 'undefined') {
                            continue;
                        }
                        switch (keyWithOutPrefix) {
                            case "border-style":
                                {
                                    if (typeof (value) != "undefined" && value != "") {
                                        that.uiborderEditor.find("div[data-role='" + value + "']").addClass("current active").siblings().removeClass("current active");
                                    }
                                    break;
                                }
                            case "border-color":
                                if (value == "none" || value == "transparent") {
                                    value = "rgba(0, 0, 0, 0)";
                                }
                                that.uiborderEditor.find(".background-color").spectrum("set", value);
                                validCss[keyWithPrefix] = value;
                                break;
                            case "border-width"://设置边框宽度
                                if (value != 'none') {
                                    value = YibuTrimPx(value);
                                    if (that.options.maxBorderWidth !== null && that._isInteger(that.options.maxBorderWidth)
                                        && value !== null && value !== '' && that.options.maxBorderWidth < value) {
                                        value = that.options.maxBorderWidth;
                                    }

                                    if (that.options.minBorderWidth != null
                                        && that._isInteger(that.options.minBorderWidth)
                                        && value !== null && value !== '' && that.options.minBorderWidth > value) {
                                        value = that.options.minBorderWidth;
                                    }

                                    that.uiborderEditor.find("[identify-width]").lzsliding("value", YibuTrimPx(value));
                                }

                                validCss[keyWithPrefix] = value;
                                break;
                            case "border-radius":
                                that.uiborderEditor.find("[identify-radius]").lzsliding("value", YibuTrimPx(value));
                                validCss[keyWithPrefix] = value;
                                break;
                        }
                    }
                    that._value(validCss);
                },
                _refresh: function () {
                    this.element.attr({
                        // TODO: what should we do with values that can't be parsed?
                        "aria-valuenow": this.element.val()
                    });

                },
                _getCreateOptions: function () {
                    var options = {},
                        element = this.element;

                    $.each(["targetSelector", "frameName"], function (i, option) {
                        var value = element.attr(option);
                        if (value !== undefined && value.length) {
                            options[option] = value;
                        }
                    });
                    return options;
                },
                _draw: function () {
                    var uiborderEditor = this.uiborderEditor = this.element;

                    this.element.attr("role", "borderEditor");
                    this.element.val(this.options.value);
                    var that = this;

                    //滑块输入框的上下箭头点击事件
                    function slidingArrow($sliding, successCallback) {
                        var me = $sliding,
                            max = me.getData().max,
                            min = me.getData().min;
                        $(me.ele).find('.input-arrow-up,.input-arrow-down').off().on('click', function (val) {
                            var $this = $(this),
                                $input = me.getInput();
                            val = me.filter($input);
                            if ($this.hasClass('input-arrow-up')) {
                                val < max ? val++ : max;
                                me.value(val);
                            } else {
                                val > min ? val-- : min;
                                me.value(val);
                            }
                            successCallback(val);
                        })
                    }

                    uiborderEditor.find("[identify-width]").find(".u-sliding")
                        .attr("data-lzmin", that.options.minBorderWidth)
                        .attr("data-lzmax", that.options.maxBorderWidth);
                    //线宽
                    var borderWidthSliding = uiborderEditor.find("[identify-width]").lzsliding({
                        valSelect: {
                            val: '.txt-num', unit: ''
                        },
                        openUnit: [true, ""],
                        effect: function () {
                            var borderWidth = this.value();
                            if (that.options.maxBorderWidth != null && that._isInteger(that.options.maxBorderWidth)
                                && borderWidth !== null && borderWidth !== '' && that.options.maxBorderWidth < borderWidth) {
                                borderWidth = that.options.maxBorderWidth;
                            }

                            if (that.options.minBorderWidth != null && that._isInteger(that.options.minBorderWidth)
                                && borderWidth !== null && borderWidth !== '' && that.options.minBorderWidth > borderWidth) {
                                borderWidth = that.options.minBorderWidth;
                            }
                            this.value(borderWidth);

                            that._buildCss("border-width", borderWidth + "px", true);
                        }
                    });
                    slidingArrow(borderWidthSliding, function (val) {
                        if (that.options.maxBorderWidth != null && that._isInteger(that.options.maxBorderWidth)
                            && val !== null && val !== '' && that.options.maxBorderWidth < val) {
                            val = that.options.maxBorderWidth;
                        }

                        if (that.options.minBorderWidth != null && that._isInteger(that.options.minBorderWidth)
                            && val !== null && val !== '' && that.options.minBorderWidth > val) {
                            val = that.options.minBorderWidth;
                        }
                        that.uiborderEditor.find("[identify-width]").lzsliding("value", YibuTrimPx(val));
                        that._buildCss("border-width", val + 'px', true);
                    });

                    uiborderEditor.find("[identify-radius]").find(".u-sliding")
                        .attr("data-lzmin", that.options.minRadiusWidth)
                        .attr("data-lzmax", that.options.maxRadiusWidth);
                    //圆角
                    var borderRadiusSliding = uiborderEditor.find("[identify-radius]").lzsliding({
                        valSelect: {
                            val: '.txt-num', unit: ''
                        },
                        openUnit: [true, ""],
                        effect: function () {
                            var borderradius = this.value() + "px";
                            that._buildCss("border-radius", borderradius, true);
                        }
                    });
                    slidingArrow(borderRadiusSliding, function (val) {
                        that._buildCss("border-radius", val + 'px', true);
                    });

                    //边框颜色
                    uiborderEditor.find(".background-color").spectrum({
                        allowEmpty: true,
                        showInput: true,
                        containerClassName: "full-spectrum",
                        showInitial: true,
                        showSelectionPalette: true,
                        showAlpha: false,
                        preferredFormat: "hex",
                        localStorageKey: "spectrum.demo",
                        change: function (color) {
                            //修改已经选中的边框的样式
                            var borderColor = (color != null && color != "") ? (that.options.showAlpha ? color.toRgbString() : color.toHexString()) : "transparent";
                            that._buildCss("border-color", borderColor, true);
                        }
                    });

                    if (!this.options.display["border-width"]) {
                        uiborderEditor.find(".x-border-width").hide();
                    }
                    if (!this.options.display["border-color"]) {
                        uiborderEditor.find(".x-border-color").hide();
                    }
                    if (!this.options.display["border-style"]) {
                        uiborderEditor.find(".x-border-style").hide();
                    } else {
                        uiborderEditor.find(".x-border-style").show();
                    }
                    if (!this.options.display["border-radius"]) {
                        uiborderEditor.find(".x-border-radius").hide();
                    }
                    if (!this.options.display["border-square"]) {
                        uiborderEditor.find(".border-square").parent().hide();
                    }
                    this.fillCss(null);
                },
                // update the value without triggering change
                _value: function (value, allowAny) {
                    $.data(this.element, "cssData", value);
                },
                _setOptions: border_modifier(function (options) {
                    this._super(options);
                    this._value(this.element.val());
                }),
                _buildCss: function (key, value) {
                    var tempKey = key;
                    if (this.options.cssPrefix != null) {
                        tempKey = this.options.cssPrefix + key;
                    }
                    var cssData = $.data(this.element, "cssData");
                    if (cssData == undefined) {
                        cssData = {
                        };
                    }
                    cssData[tempKey] = value;
                    var data = {
                    };
                    data.key = tempKey;
                    data.value = value;
                    this._trigger("cssChange", null, data);
                },
                _events: {
                    //边框线型的选择
                    "click .x-border-style div": function (event) {
                        var target = $(event.currentTarget);
                        target.toggleClass("current active").siblings().removeClass("current active");
                        var cssValue = target.attr("data-role");
                        this._buildCss("border-style", cssValue, true);
                    },
                },
                _destroy: function () {
                    this.element.removeAttr("role");
                    $.data(this.element, "cssData", null);
                    this.uiIconSel.replaceWith(this.element);
                },
                _cssTarget: function () {
                    return this.options.frameName != "" ? $(this.options.targetSelector, $("#" + this.options.frameName)[0].contentWindow.document)
                        : $(this.options.targetSelector);
                },
                value: function (newVal) {
                    if (!arguments.length) {
                        return this.element.val();
                    }
                    border_modifier(this._value).call(this, newVal);
                },
                _isInteger: function (obj) {
                    return typeof obj === 'number' && obj % 1 === 0
                },
                widget: function () {
                    return this.uiborderEditor;
                }
            });
        },
        fullBorder: function () {
            $.widget("ui.fullborderEditor", {
                version: "1.10.3",
                defaultElement: "<input type='hidden'/>",
                widgetEventPrefix: "fullborderEditor",
                options: {
                    titleName: "边框",
                    targetSelector: "",
                    frameName: "",
                    isSetAll: false,
                    cssVars: ["border-top-width", "border-left-width", "border-bottom-width", "border-right-width", "border-top-style", "border-left-style", "border-bottom-style", "border-right-style", "border-top-color", "border-left-color", "border-bottom-color", "border-right-color", "border-radius"],
                    display: {
                        "border-width": true,
                        "border-color": true,
                        "border-style": true,
                        "border-square": true,
                        "border-radius": true
                    },
                    hiddenParts: [],//"border-left", "border-right", "border-top", "border-bottom"
                    minBorderWidth: 0,//最小线宽宽度
                    maxBorderWidth: 5,//最大线宽宽度
                    minRadiusWidth: 0,//最小圆角宽度
                    maxRadiusWidth: 100,//最大圆角宽度
                    isSimple: false,//是否是精简版
                    change: null,
                    cssChange: null
                },

                _create: function () {
                    this._draw();
                    this._on(this._events);
                    this._refresh();

                    // turning off autocomplete prevents the browser from remembering the
                    // value when navigating through history, so we re-enable autocomplete
                    // if the page is unloaded before the widget is destroyed. #7790
                    this._on(this.window, {
                        beforeunload: function () {
                            this.element.removeAttr("autocomplete");
                        }
                    });
                },
                //将初始CSS值填充为控件
                fillCss: function (cssStr, oldCssArr) {
                    if (cssStr == null || typeof (cssStr) === 'undefined') {
                        return;
                    }
                    var that = this;
                    var validCss = {
                    };
                    var prefix = that.options.cssPrefix;
                    var borderIsSelectOne = false;
                    var colorIsSelectOne = false;
                    var borderKey = '';
                    var colorKey = '';
                    var widthKey = '';
                    var cssVars = this.options.cssVars;
                    for (var key = 0; key < cssVars.length; key++) {
                        //隐藏项不做赋值处理
                        var isPass = false;
                        for (var i = 0; i < this.options.hiddenParts.length; i++) {
                            if (cssVars[key].indexOf(this.options.hiddenParts[i]) == 0) {
                                isPass = true;
                            }
                        }
                        if (isPass) {
                            continue;
                        }
                        var keyWithOutPrefix = cssVars[key];
                        var keyWithPrefix = prefix + keyWithOutPrefix;
                        var value = cssStr[keyWithPrefix];
                        if (value == null || typeof (value) === 'undefined') {
                            continue;
                        }
                        switch (keyWithOutPrefix) {
                            case "border-top-style":
                            case "border-left-style":
                            case "border-right-style":
                            case "border-bottom-style":
                                {
                                    if (value != undefined && value != "none" && value != '') {
                                        borderKey = keyWithOutPrefix.replace('-style', '');
                                        if (!that.uiborderEditor.find("li.border-line").hasClass("current")) {
                                        that.uiborderEditor.find("li[data-role='" + borderKey + "']").addClass("current");
                                    }
                                        if (that.uiborderEditor.find("li[data-role='" + borderKey + "']").hasClass("current")) {
                                            //that.uiborderEditor.find("input[data-role='border-style']").val(value);
                                            that.uiborderEditor.find("div[data-role='" + value + "']").addClass("current").siblings().removeClass("current");
                                        }
                                    }
                                }
                                validCss[keyWithPrefix] = value;
                                break;
                            case "border-style":
                                break;
                            case "border-top-color":
                            case "border-left-color":
                            case "border-right-color":
                            case "border-bottom-color"://设置边框颜色
                                if (value != undefined && value != "none" && value != '') {
                                    colorKey = keyWithOutPrefix.replace('-color', '');
                                    if (!that.uiborderEditor.find("li.border-line").hasClass("current")) {
                                        that.uiborderEditor.find("li[data-role='" + borderKey + "']").addClass("current");
                                    }
                                    if (that.uiborderEditor.find("li[data-role='" + colorKey + "']").hasClass("current")) {
                                        //that.uiborderEditor.find("input[data-role='border-style']").val(value);
                                        that.uiborderEditor.find("div[data-role='" + value + "']").addClass("current").siblings().removeClass("current");
                                        that.uiborderEditor.find(".background-color").spectrum("set", value);
                                    }
                                }
                                validCss[keyWithPrefix] = value;
                                break;
                            case "border-color":
                                that.uiborderEditor.find(".background-color").spectrum("set", value);
                                validCss[keyWithPrefix] = value;
                                break;
                            case "border-top-width":
                            case "border-left-width":
                            case "border-right-width":
                            case "border-bottom-width"://设置边框宽度
                                if (value != undefined && value != "none" && value != '') {
                                    widthKey = keyWithOutPrefix.replace('-width', '');
                                    if (!that.uiborderEditor.find("li.border-line").hasClass("current")) {
                                        that.uiborderEditor.find("li[data-role='" + widthKey + "']").addClass("current");
                                    }
                                    if (that.uiborderEditor.find("li[data-role='" + widthKey + "']").hasClass("current")) {
                                        that.uiborderEditor.find("[identify-width]").lzsliding("value", YibuTrimPx(value));
                                    }
                                }
                                validCss[keyWithPrefix] = value;
                                break;
                            case "border-radius":
                                that.uiborderEditor.find("[identify-radius]").lzsliding("value", YibuTrimPx(value));
                                validCss[keyWithPrefix] = value;
                                break;
                        }
                    }
                    if (that.options.isSetAll) {
                        that.uiborderEditor.find("li[data-role='border']").addClass("current").siblings().removeClass("current");
                    }
                    $.data(this.element, "cssData", validCss);
                    if (borderKey != '') {
                        var tem = borderKey.replace('-', '_');
                        that.uiborderEditor.find(".fb_" + tem).click();
                    }
                },
                _refresh: function () {
                    this.element.attr({
                        // TODO: what should we do with values that can't be parsed?
                        "aria-valuenow": this.element.val()
                    });

                },
                _draw: function () {
                    var uiborderEditor = this.uiborderEditor = this.element;

                    this.element.attr("role", "fullborderEditor");
                    this.element.val(this.options.value);
                    var that = this;
                    for (var i = 0; i < that.options.hiddenParts.length; i++) {
                        var part = that.options.hiddenParts[i];
                        uiborderEditor.find("li[data-role='" + part + "']").hide();
                        switch (part) {
                            case "border-left":
                            case "border-right":
                                var width = uiborderEditor.find("li[data-role='border']").width();
                                uiborderEditor.find("li[data-role='border']").width(width + 5);
                                break;
                        }
                    }
                    //边框颜色
                    uiborderEditor.find(".background-color").spectrum({
                        allowEmpty: true,
                        showInput: true,
                        containerClassName: "full-spectrum",
                        showInitial: true,
                        showSelectionPalette: true,
                        showAlpha: false,
                        preferredFormat: "hex",
                        localStorageKey: "spectrum.demo",
                        change: function (color) {
                            //修改已经选中的边框的样式
                            var borderColor = (color != null && color != "") ? color.toHexString() : "transparent";
                            uiborderEditor.find(".background-color").spectrum("set", borderColor);
                            var prefixs = that._getPrefix();
                            if (prefixs.length == 0) {
                                that._buildCss("border-color", borderColor, true);
                            } else {
                                $.each(prefixs, function (i, prefix) {
                                    that._buildCss(prefix + "-color", borderColor, true);
                                });
                            }
                        }
                    });

                    // 边框数量选择
                    function setBorderStyle() {
                        //根据选择边线的位置，构造所有边线的CSS变量
                        var prefixs = that._getPrefix();
                        var curCssPrefix = that.options.cssPrefix;

                        var keyValArray = $.data(that.element, "cssData");
                        if (keyValArray != undefined) {
                            var tmpBdColor, tmpBdStyle, tmpBdWidth;
                            if (prefixs.length > 0) {
                                tmpBdColor = keyValArray[curCssPrefix + prefixs[0] + "-color"];
                                tmpBdStyle = keyValArray[curCssPrefix + prefixs[0] + "-style"];
                                tmpBdWidth = keyValArray[curCssPrefix + prefixs[0] + "-width"];
                                // 单多选的时候判断是否参数相同，相同则显示，不同则显示为空
                                for (var prefixcount = 1; prefixcount < prefixs.length; prefixcount++) {
                                    if (tmpBdColor != undefined && tmpBdColor != keyValArray[curCssPrefix + prefixs[prefixcount] + "-color"]) {
                                        tmpBdColor = undefined;
                                    }
                                    if (tmpBdStyle != undefined && tmpBdStyle != keyValArray[curCssPrefix + prefixs[prefixcount] + "-style"]) {
                                        tmpBdStyle = undefined;
                                    }
                                    if (tmpBdWidth != undefined && tmpBdWidth != keyValArray[curCssPrefix + prefixs[prefixcount] + "-width"]) {
                                        tmpBdWidth = undefined;
                                    }
                                }
                            }
                            // color
                            if (tmpBdColor == undefined || tmpBdColor == "none" || tmpBdColor == "transparent") {
                                tmpBdColor = null;
                            }
                            uiborderEditor.find(".background-color").spectrum("set", tmpBdColor);
                            // style
                            if (tmpBdStyle == undefined) {
                                uiborderEditor.find('.x-border-style div.square-box').removeClass('current');
                            } else {
                                that.uiborderEditor.find("div[data-role='" + tmpBdStyle + "']").addClass("current").siblings().removeClass("current");
                            }
                            // width
                            if (tmpBdWidth == undefined || tmpBdWidth == "0px") {
                                tmpBdWidth = '';
                            } else {
                                tmpBdWidth = tmpBdWidth.replace('px', '');
                            }
                            that.uiborderEditor.find("[identify-width]").lzsliding("value", YibuTrimPx(tmpBdWidth));
                        }
                    }

                    var $parent = uiborderEditor.find('.border-square'),
                        $line = $parent.find('.line-click'),
                        $borderCore = $parent.find('.border-core');

                    $line.off('click').on('click', function () {
                        var prefixs = that._getPrefix();
                        $line.removeClass('current');
                        $borderCore.removeClass('current');
                        uiborderEditor.find('.icon-line_none').closest('.square-box').removeClass('current');
                        $(this).addClass('current');

                        setBorderStyle();
                    });

                    $borderCore.off('click').on('click', function () {
                        $(this).addClass('current');
                        $line.addClass('current');
                        uiborderEditor.find('.icon-line_none').closest('.square-box').removeClass('current');
                        setBorderStyle();
                    });


                    //滑块输入框的上下箭头点击事件
                    function slidingArrow($sliding, successCallback) {
                        var me = $sliding,
                            max = me.getData().max,
                            min = me.getData().min;
                        $(me.ele).find('.input-arrow-up,.input-arrow-down').off().on('click', function (val) {
                            var $this = $(this),
                                $input = me.getInput();
                            val = me.filter($input);
                            if ($this.hasClass('input-arrow-up')) {
                                val < max ? val++ : max;
                                me.value(val);
                            } else {
                                val > min ? val-- : min;
                                me.value(val);
                            }
                            successCallback(val);
                        })
                    }

                    uiborderEditor.find("[identify-width]").find(".u-sliding")
                        .attr("data-lzmin", that.options.minBorderWidth)
                        .attr("data-lzmax", that.options.maxBorderWidth);
                    //线宽
                    var borderWidthSliding = uiborderEditor.find("[identify-width]").lzsliding({
                        valSelect: {
                            val: '.txt-num', unit: ''
                        },
                        openUnit: [true, ""],
                        effect: function () {
                            var borderWidth = this.value();
                            if (that.options.maxBorderWidth != null && that._isInteger(that.options.maxBorderWidth)
                                && borderWidth !== null && borderWidth !== '' && that.options.maxBorderWidth < borderWidth) {
                                borderWidth = that.options.maxBorderWidth;
                            }

                            if (that.options.minBorderWidth != null && that._isInteger(that.options.minBorderWidth)
                                && borderWidth !== null && borderWidth !== '' && that.options.minBorderWidth > borderWidth) {
                                borderWidth = that.options.minBorderWidth;
                            }
                            this.value(borderWidth);
                            //修改已经选中的边框的样式
                            var prefixs = that._getPrefix();
                            $.each(prefixs, function (i, prefix) {
                                that._buildCss(prefix + "-width", borderWidth + "px", true);
                            });
                        }
                    });
                    slidingArrow(borderWidthSliding, function (val) {
                        if (that.options.maxBorderWidth != null && that._isInteger(that.options.maxBorderWidth)
                            && val !== null && val !== '' && that.options.maxBorderWidth < val) {
                            val = that.options.maxBorderWidth;
                        }

                        if (that.options.minBorderWidth != null && that._isInteger(that.options.minBorderWidth)
                            && val !== null && val !== '' && that.options.minBorderWidth > val) {
                            val = that.options.minBorderWidth;
                        }
                        that.uiborderEditor.find("[identify-width]").lzsliding("value", YibuTrimPx(val));
                        var prefixs = that._getPrefix();
                        $.each(prefixs, function (i, prefix) {
                            that._buildCss(prefix + "-width", val + 'px', true);
                        });
                    });

                    uiborderEditor.find("[identify-radius]").find(".u-sliding")
                        .attr("data-lzmin", that.options.minRadiusWidth)
                        .attr("data-lzmax", that.options.maxRadiusWidth);
                    //圆角
                    var borderRadiusSliding = uiborderEditor.find("[identify-radius]").lzsliding({
                        valSelect: {
                            val: '.txt-num', unit: ''
                        },
                        openUnit: [true, ""],
                        effect: function () {
                            var borderradius = this.value() + "px";
                            that._buildCss("border-radius", borderradius, true);
                        }
                    });
                    slidingArrow(borderRadiusSliding, function (val) {
                        that._buildCss("border-radius", val + 'px', true);
                    });

                    if (!this.options.display["border-width"]) {
                        uiborderEditor.find(".x-border-width").hide();
                    }
                    if (!this.options.display["border-color"]) {
                        uiborderEditor.find(".x-border-color").hide();
                    }
                    if (!this.options.display["border-style"]) {
                        uiborderEditor.find(".x-border-style").hide();
                        uiborderEditor.find(".x-border-color").addClass("f-mt20");
                    }
                    if (!this.options.display["border-radius"]) {
                        uiborderEditor.find(".x-border-radius").hide();
                    }
                    if (!this.options.display["border-square"]) {
                        uiborderEditor.find(".border-square").parent().hide();
                    }
                    if (!this.options.display["border-width"] && !this.options.display["border-color"] && !this.options.display["border-style"]) {
                        uiborderEditor.find(".border-main-set").hide();
                    }
                    this.fillCss(null);
                },
                _setOptions: function (options) {
                    this._super(options);
                    //this._value(this.element.val());
                },

                _buildCss: function (key, value, isTrigger) {
                    var tempKey = key;
                    if (this.options.cssPrefix != null) {
                        tempKey = this.options.cssPrefix + key;
                    }
                    var cssData = $.data(this.element, "cssData");
                    if (cssData == undefined) {
                        cssData = {
                        };
                    }
                    cssData[tempKey] = value;
                    $.data(this.element, "cssData", cssData);
                    var data = {
                    };
                    data.key = tempKey;
                    data.value = value;
                    if (isTrigger) {
                        this._trigger("cssChange", null, data);
                    }
                },
                //获取当前正在设置的边框数组，某一侧边框，或者所有边框
                _getPrefix: function () {
                    var target = this.uiborderEditor.find(".line-click.current:visible");
                    var prefixs = new Array();
                    var attrVal = "";
                    target.each(function (index, el) {
                        attrVal = $(el).attr("data-role");
                        if (attrVal != "border") {
                            prefixs.push($(el).attr("data-role"));
                        }
                    });
                    return prefixs;
                },
                _events: {
                    //边框线型的选择
                    "click .x-border-style div": function (event) {
                        var target = $(event.currentTarget);
                        target.toggleClass("current").siblings().removeClass("current");
                        var cssValue = target.attr("data-role");
                        var that = this;
                        //修改已经选中的边框的样式
                        var prefixs = this._getPrefix();
                        $.each(prefixs, function (i, prefix) {
                            that._buildCss(prefix + "-style", cssValue, true);
                        });
                    },
                },
                _destroy: function () {
                    this.element.removeAttr("role");
                    $.data(this.element, "cssData", null);
                },
                _isInteger: function (obj) {
                    return typeof obj === 'number' && obj % 1 === 0
                },
                widget: function () {
                    return this.uiborderEditor;
                }
            });
        }
    };

    borders.init();

})(jQuery);

//开关控件
(function ($) {
    $.widget("smart.switchEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "switchEditor",
        options: {
            cssPrefix: "",
            cssVars: [""],
            //需要操作的widgetId,有多个的时候用,分开
            widgetIds: null,
            //需要操作的jquery对象
            widgetJQuery: null,
            //开关的状态 on/off
            switchState: 'on',
            onValue: "block",
            offValue: "none",
            //开关开启后的回调
            onSwitchOn: null,
            //开关关闭后的回调
            onSwitchOff: null,
            cssChange: null,
            needRefresh: false,
            ableSwitch: function () {
                return true;
            }
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var ischecked = false;
            // 值类型
            if (typeof cssStr == "string" || typeof cssStr == "boolean") {
                ischecked = cssStr == this.options.onValue || cssStr == true || cssStr == "on" || cssStr == "true";
            } // 样式
            else if (typeof cssStr == "object") {
                var cssVars = this.options.cssVars;
                var that = this;
                var validCss = {};
                var prefix = that.options.cssPrefix;
                for (var key in cssVars) {
                    var isBgKey = false;
                    var keyWithOutPrefix = cssVars[key];
                    var keyWithPrefix = prefix + keyWithOutPrefix;
                    var value = cssStr[keyWithPrefix];
                    if (value == null || typeof (value) === 'undefined') {
                        continue;
                    }
                    // 命中第一个为值
                    ischecked = value == that.options.onValue;
                    break;
                }
            }
            this.options.switchState = ischecked ? "on" : "off";
            this.defaultValue(ischecked);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var switchEditor = this.switchEditor = this.element;
            switchEditor.find('.x-switch').off('click').on("click", function () {
                $(this).toggleClass("checked");
            });

            this.element.attr("role", "switchEditor");

            // 如果非jquery元素则置为null
            if (!(this.options.widgetJQuery instanceof jQuery)) {
                this.options.widgetJQuery = null;
            }
            this.defaultValue(this.options.switchState == 'on');
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            $.data(this.element, "cssData", cssData);
            var data = {};
            data.key = tempKey;
            data.value = value;
            data.needRefresh = this.options.needRefresh;
            this._trigger("cssChange", null, data);
        },
        _events: {
            //开关点击
            "click input[type='checkbox']": function () {         
                if (!this.options.ableSwitch()) {
                    this.defaultValue(this.options.switchState == "on"?true:false)
                    return;
                }
                if (this.options.switchState == 'on') {
                    this.options.switchState = 'off';
                    if (typeof (this.options.onSwitchOff) == 'function') {
                        var data = {};
                        data.key = this.options.cssPrefix + this.options.cssVars[0];
                        data.value = this.option.offValue;
                        this.options.onSwitchOff(null, data);
                    }
                    this._buildCss(this.options.cssVars[0], this.options.offValue);
                } else {
                    this.options.switchState = 'on';
                    if (typeof (this.options.onSwitchOn) == 'function') {
                        var data = {};
                        data.key = this.options.cssPrefix + this.options.cssVars[0];
                        data.value = this.option.offValue;
                        this.options.onSwitchOn(null, data);
                    }
                    this._buildCss(this.options.cssVars[0], this.options.onValue);
                }
                this.defaultValue(this.options.switchState == "on");
            }
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        defaultValue: function (isOn) {
            this.switchEditor.find('.x-switch').toggleClass("checked", isOn);
            if (this.options.widgetIds != null) {
                var widgetIdArray = this.options.widgetIds.split(',');
                for (var i = 0; i < widgetIdArray.length; i++) {
                    $('#' + widgetIdArray[i]).toggleClass('f-hide', !isOn).toggle(isOn);
                }
            }
            if (this.options.widgetJQuery != null) {
                this.options.widgetJQuery.toggleClass('f-hide', !isOn).toggle(isOn);
            }
        },
        widget: function () {
            return this.switchEditor;
        }
    });
})(jQuery);

//UrlLink选择器
(function ($) {
    function urllink_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("smart.urllinkEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "urllinkEditor",
        options: {
            cssPrefix: "",
            containsSystemPage: "",//"key1,key2"
            display: {
                "outsite": true,
                "page": true,
                "news": true,
                "product": true,
                "email": true,
                "file": true,
                "phone": true,
                "cart": false,
                "mine": false,
                "category": false,
                "dialog": false
            },
            min: 1,
            max: 1,
            cssChange: null
        },
        _selectData: [],
        _onOpen: false,
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            this._selectData = [];
            this.urllinkEditor.attr("linkType", cssStr.linkType);
            this.urllinkEditor.find(".n-linktype").find("li").removeClass("active");
            this.urllinkEditor.find(".n-linktype").find("li.x-" + cssStr.linkType).addClass("active");
            this.urllinkEditor.find(".n-linktypepanel").find("li").removeClass("active").find("input").val("").removeAttr("data-url");
            this.urllinkEditor.find(".n-linktypepanel").find("li.x-" + cssStr.linkType).addClass("active").find("input")
                .val(cssStr.linkValueText)
                .attr("data-url", cssStr.linkUrl)
                .attr("data-linkValue", cssStr.linkValue);
            this._selectData.push(cssStr.linkValue);
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var urllinkEditor = this.urllinkEditor = this.element;
            this.element.attr("role", "urllinkEditor");
            var that = this;

            urllinkEditor.find('.n-linktype a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var linkType = $(e.target).parent().attr("data-role");
                urllinkEditor.attr("linkType", linkType);
                var val = that.urllinkEditor.find(".n-linktypepanel li.active").find("input").val();
                if (linkType == 'outsite' && val == '') {
                    that.urllinkEditor.find(".n-linktypepanel li.active").find("input").val('#');
                }
                that._buildCss(that.options.cssPrefix, that.urllinkEditor.find(".n-linktypepanel li.active").find("input").val());
            });
            if (!this.options.display["outsite"]) {
                urllinkEditor.find(".x-outsite").hide();
            }
            if (!this.options.display["page"]) {
                urllinkEditor.find(".x-page").hide();
            }
            if (!this.options.display["news"]) {
                urllinkEditor.find(".x-news").hide();
            }
            if (!this.options.display["product"]) {
                urllinkEditor.find(".x-product").hide();
            }
            if (!this.options.display["email"]) {
                urllinkEditor.find(".x-email").hide();
            }
            if (!this.options.display["file"]) {
                urllinkEditor.find(".x-file").hide();
            }
            if (!this.options.display["phone"]) {
                urllinkEditor.find(".x-phone").hide();
            }
            if (!this.options.display["cart"]) {
                urllinkEditor.find(".x-cart").hide();
            }
            if (!this.options.display["category"]) {
                urllinkEditor.find(".x-category").hide();
            }
            if (!this.options.display["mine"]) {
                urllinkEditor.find(".x-mine").hide();
            }
            if (!this.options.display["dialog"]) {
                urllinkEditor.find(".x-dialog").hide();
            }
        },
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
            this._refresh();
        },
        _buildCss: function (key, value) {
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[key] = value;
            this.value(cssData);
            var data = {};
            data.key = key;
            data.value = {
                linkType: this.getLinkType(),
                linkValue: this.getSelectedData(),
                linkValueText: value,
                linkUrl: this.getLinkUrl(this.getLinkType())
            };

            this._trigger("cssChange", null, data);
        },
        _events: {
            "change .n-linktypepanel li input": function (event) {
                var target = $(event.currentTarget);
                var linkUrl = target.val();
                linkUrl = this._clearHost(linkUrl);
                this._buildCss(this.options.cssPrefix, linkUrl);
            },
            "click .link-select-file": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                $("#layer-link-file").remove();
                $.ajax({
                    url: "/Designer/Common/GetFileList",
                    type: "GET",
                    dataType: "html",
                    data: { modelId: "layer-link-file" }
                }).done(function (data) {
                    $('body').append(data);
                    that._bindDataCallBackEvents("file");
                    that._onOpen = false;
                });
            },
            "click .link-select-news": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                $("#layer-link-news").remove();
                $.ajax({
                    url: "/Designer/Common/GetNewsList",
                    type: "GET",
                    dataType: "html",
                    data: { modelId: "layer-link-news" }
                }).done(function (data) {
                    $('body').append(data);
                    that._bindDataCallBackEvents("news");
                    that._onOpen = false;
                });
            },
            "click .link-select-product": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                $("#layer-link-product").remove();
                $.ajax({
                    url: "/Designer/Common/GetProductList",
                    type: "GET",
                    dataType: "html",
                    data: { modelId: "layer-link-product" }
                }).done(function (data) {
                    $('body').append(data);
                    that._bindDataCallBackEvents("product");
                    that._onOpen = false;
                });
            },
            "click .link-select-page": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                //$('body').append($("#layer-link-page").modal('show'));
                $('body').append($("[id=layer-link-page]"));
                $("#layer-link-page").removeClass("hide");
                $("#layer-link-page").modal('show');
                that._queryPage(0);
            },
            "click .link-select-dialog": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                $('body').append($("#layer-link-dialog"));
                $("#layer-link-dialog").modal('show');
                that._queryDialog(0);
            },
        },
        _bindDataCallBackEvents: function (xtype) {
            var that = this;
            that._queryData(xtype);
            var modal = $("#layer-link-" + xtype);
            modal.find(".n-showAll").click(function () {
                that._queryData(xtype);
            });
            modal.find(".n-showOne li").click(function () {
                that._queryData(xtype, $(this).attr("data-Id"));
            });
            modal.find(".n-showOne").css("overflow", "hidden").css("max-height", "340px").lzscroll();
            modal.find(".n-submit").click(function () {
                var valueitem = that.urllinkEditor.find(".x-" + xtype).find("input");
                if (valueitem.attr("data-text")) {
                    valueitem.val(valueitem.attr("data-text"));
                }
                valueitem.trigger("change");
                modal.remove();
            });

            modal.find(".n-orderbyfield li").click(function () {
                var text = $(this).text();
                modal.find(".n-orderbyfield .showtext").html(text);
                var field = $(this).attr("data-role");
                modal.find(".n-orderbyfield").attr("data-orderbyfield", field);
                $(this).siblings().find("a.current").removeClass("current");
                $(this).find("a").addClass("current");
                that._queryData(xtype);
            });
            modal.find(".n-orderbytype li").click(function () {
                var text = $(this).text();
                modal.find(".n-orderbytype .showtext").html(text);
                var field = $(this).attr("data-role");
                modal.find(".n-orderbytype").attr("data-orderbytype", field);
                $(this).siblings().find("a.current").removeClass("current");
                $(this).find("a").addClass("current");
                that._queryData(xtype);
            });
            modal.modal("show");
        },
        _getPagerHtml: function (pageindex, totalpage) {
            pageindex = parseInt(pageindex) + 1;
            totalpage = parseInt(totalpage);
            var prev = pageindex > 1 ? pageindex - 1 : 1;
            var next = pageindex < totalpage ? pageindex + 1 : totalpage;
            var pageHtml =
                '<li class="page-item"><a href="javascript:void(0)" data-pageid="1" class="nthLink"><i class="icon icon-double-arrowL"></i></a></li>' +
                '<li class="page-item"><a href="javascript:void(0)" data-pageid="' + prev + '" class="nthLink"><i class="icon icon-arrowleft"></i></a></li>';
            for (var i = Math.max(1, pageindex - 2); i < pageindex; i++) {
                pageHtml += '<li class="page-item"><a href="javascript:void(0)" data-pageid="' + i + '" class="normalLink">' + i + '</a></li>';
            }
            pageHtml += '<li class="page-item"><a href="javascript:void(0)" data-pageid="' + pageindex + '" class="normalLink current">' + pageindex + '</a></li>';
            for (var i = pageindex + 1; i <= Math.min(totalpage, pageindex + 2); i++) {
                pageHtml += '<li class="page-item"><a href="javascript:void(0)" data-pageid="' + i + '" class="normalLink">' + i + '</a></li>';
            }
            pageHtml +=
                '<li class="page-item"><a href="javascript:void(0)" data-pageid="' + next + '" class="nthLink"><i class="icon icon-arrowright"></i></a></li>' +
                '<li class="page-item"><a href="javascript:void(0)" data-pageid="' + totalpage + '" class="nthLink"><i class="icon icon-double-arrowR"></i></a></li>'
            return pageHtml;
        },
        _bindPagerEvents: function (xtype, cid) {
            var that = this;
            $("#layer-link-" + xtype).find(".n-pager").find("a").not(".current").click(function () {
                that._queryData(xtype, cid, parseInt($(this).attr("data-pageid")) - 1);
            });
        },
        _queryData: function (xtype, cid, pageindex) {
            pageindex = pageindex || 0;
            switch (xtype) {
                case "file":
                    return this._queryFile(cid, pageindex);
                case "news":
                    return this._queryNews(cid, pageindex);
                case "product":
                    return this._queryProduct(cid, pageindex);
                case "page":
                    return this._queryPage(pageindex);
                case "dialog":
                    return this._queryDialog(pageindex);
            }
            return;
        },
        _queryFile: function (cid, pageindex) {
            var that = this;
            var pdata = {};
            if (cid) {
                pdata.selectCategory = cid;
            }
            pdata.dataType = "file";
            pdata.pageindex = pageindex;
            pdata.pagesize = 9;
            pdata.dateFormater = "yy-MM-dd";
            pdata.orderByField = $("#layer-link-file").find(".n-orderbyfield").attr("data-orderbyfield");
            pdata.orderByType = $("#layer-link-file").find(".n-orderbytype").attr("data-orderbytype");
            pdata.isDesign = true;
            pdata.es = true;
            $.ajax({
                url: "/Designer/Common/GetData",
                type: "POST",
                dataType: "json",
                data: pdata
            }).done(function (data) {
                var totalCount = data.TotalCount;
                var totalPage = data.TotalPages;
                var pageIndex = data.PageIndex;
                var pageSize = data.PageSize;
                var dataModel = data.Data;
                var itemStr = "";
                for (var i = 0; i < dataModel.length; i++) {
                    var currentCss = that._selectData.contains(dataModel[i].Id) ? "current" : "";
                    var checkCss = that._selectData.contains(dataModel[i].Id) ? "checked" : "";
                    itemStr += '<li class="n-item m-radio radio-itme radio ' + currentCss + '" data-Id="' + dataModel[i].Id + '" data-url="' + dataModel[i].LinkUrl + '">' +
                        '<label class="radio-custom radio-custom317">' +
                        '<input type="radio" name="radio"><i class="' + checkCss + '"></i>' +
                        '<span>' +
                        dataModel[i].Name +
                        '</span></label>' +
                        '<span class="time">' +
                        dataModel[i].QTime +
                        '</span></li>';
                }
                $("#layer-link-file").find(".n-datapanel").html(itemStr);
                $("#layer-link-file").find(".n-pager").html(that._getPagerHtml(pageIndex, totalPage));
                that._bindPagerEvents("file", cid);
                $("#layer-link-file").find(".n-datapanel li").click(function () {
                    var fileId = $(this).attr("data-Id");
                    var url = $(this).attr("data-url");
                    var fileText = $(this).find(".radio-custom").text();
                    $("#layer-link-file").find(".n-datapanel").find("li.n-item").removeClass("current").find("i").removeClass("checked");
                    $(this).addClass("current").find("i").addClass("checked");
                    that._flushData({ text: fileText, value: fileId, url: url });
                    return false;
                });
            });
        },
        _queryNews: function (cid, pageindex) {
            var that = this;
            var pdata = {};
            if (cid) {
                pdata.selectCategory = cid;
            }
            pdata.dataType = "news";
            pdata.pageindex = pageindex;
            pdata.pagesize = 9;
            pdata.dateFormater = "yy-MM-dd";
            pdata.orderByField = $("#layer-link-news").find(".n-orderbyfield").attr("data-orderbyfield");
            pdata.orderByType = $("#layer-link-news").find(".n-orderbytype").attr("data-orderbytype");
            pdata.isDesign = true;
            $.ajax({
                url: "/Designer/Common/GetData",
                type: "POST",
                dataType: "json",
                data: pdata
            }).done(function (data) {
                var totalCount = data.TotalCount;
                var totalPage = data.TotalPages;
                var pageIndex = data.PageIndex;
                var pageSize = data.PageSize;
                var dataModel = data.Data;
                var itemStr = "";
                for (var i = 0; i < dataModel.length; i++) {
                    var currentCss = that._selectData.contains(dataModel[i].Id) ? "current" : "";
                    var checkCss = that._selectData.contains(dataModel[i].Id) ? "checked" : "";
                    itemStr += '<li class="n-item m-radio radio-itme radio ' + currentCss + '" data-Id="' + dataModel[i].Id + '" data-url="' + dataModel[i].LinkUrl + '">' +
                        '<label class="radio-custom radio-custom317">' +
                        '<input type="radio" name="radio"><i class="' + checkCss + '"></i>' +
                        '<span>' +
                        dataModel[i].Name +
                        '</span></label>' +
                        '<span class="time">' +
                        dataModel[i].QTime +
                        '</span></li>';
                }
                $("#layer-link-news").find(".n-datapanel").html(itemStr);
                $("#layer-link-news").find(".n-pager").html(that._getPagerHtml(pageIndex, totalPage));
                that._bindPagerEvents("news", cid);
                $("#layer-link-news").find(".n-datapanel li").click(function () {
                    var fileId = $(this).attr("data-Id");
                    var url = $(this).attr("data-url");
                    var fileText = $(this).find(".radio-custom").text();
                    $("#layer-link-news").find(".n-datapanel").find("li.n-item").removeClass("current").find("i").removeClass("checked");
                    $(this).addClass("current").find("i").addClass("checked");
                    that._flushData({ text: fileText, value: fileId, url: url });
                    return false;
                });
            });
        },
        _queryProduct: function (cid, pageindex) {
            var that = this;
            var pdata = {};
            if (cid) {
                pdata.selectCategory = cid;
            }
            pdata.dataType = "product";
            pdata.pageindex = pageindex;
            pdata.pagesize = 9;
            pdata.dateFormater = "yy-MM-dd";
            pdata.orderByField = $("#layer-link-product").find(".n-orderbyfield").attr("data-orderbyfield");
            pdata.orderByType = $("#layer-link-product").find(".n-orderbytype").attr("data-orderbytype");
            pdata.isDesign = true;
            $.ajax({
                url: "/Designer/Common/GetData",
                type: "POST",
                dataType: "json",
                data: pdata
            }).done(function (data) {
                var totalCount = data.TotalCount;
                var totalPage = data.TotalPages;
                var pageIndex = data.PageIndex;
                var pageSize = data.PageSize;
                var dataModel = data.Data;
                var itemStr = "";
                for (var i = 0; i < dataModel.length; i++) {
                    var currentCss = that._selectData.contains(dataModel[i].Id) ? "current" : "";
                    var checkCss = that._selectData.contains(dataModel[i].Id) ? "checked" : "";
                    itemStr += '<li class="n-item m-radio radio-itme radio ' + currentCss + '" data-Id="' + dataModel[i].Id + '" data-url="' + dataModel[i].LinkUrl + '">' +
                        '<label class="radio-custom radio-custom317">' +
                        '<input type="radio" name="radio"><i class="' + checkCss + '"></i>' +
                        '<span>' +
                        dataModel[i].Name +
                        '</span></label>' +
                        '<span class="time">' +
                        dataModel[i].QTime +
                        '</span></li>';
                }
                $("#layer-link-product").find(".n-datapanel").html(itemStr);
                $("#layer-link-product").find(".n-pager").html(that._getPagerHtml(pageIndex, totalPage));
                that._bindPagerEvents("product", cid);
                $("#layer-link-product").find(".n-datapanel li").click(function () {
                    var fileId = $(this).attr("data-Id");
                    var url = $(this).attr("data-url");
                    var fileText = $(this).find(".radio-custom").text();
                    $("#layer-link-product").find(".n-datapanel").find("li.n-item").removeClass("current").find("i").removeClass("checked");
                    $(this).addClass("current").find("i").addClass("checked");
                    that._flushData({ text: fileText, value: fileId, url: url });
                    return false;
                });
            });
        },
        _queryPage: function (pageindex) {
            var that = this;
            $.ajax({
                url: "/Designer/Page/GetContentPageList",
                type: "POST",
                data: { pageIndex: pageindex, pageSize: 10, containsSystemPage: that.options.containsSystemPage }
            }).done(function (result) {
                that._onOpen = false;
                var pageList = [];
                var thirdPageList = [];
                result.Data.pages.forEach(function (item) {
                    if (item[4] == "True") {
                        thirdPageList.push(item)
                    } else {
                        pageList.push(item)
                    }
                })
                var pageitems = "";
                if (thirdPageList.length) {
                    pageitems = template("temp_linkurl_page", { Data: { pages: pageList } });
                    pageitems += template("temp_linkurl_thirdPage", { Data: { pages: thirdPageList }, Title: window.pageManage ? pageManage.__StandalonTitle : '' });
                } else {
                    pageitems = template("temp_linkurl_page", result);
                }
                $("#layer-link-page").find(".u-link-box").html(pageitems);
                that._bindPageEvents();
                $("#layer-link-page").removeClass("f-hide");
                $("#layer-link-page").find(".n-pager").html(that._getPagerHtml(pageindex, result.Data.total));
                that._bindPagerEvents("page", null);
            });
        },
        _queryDialog: function (pageindex) {
            var that = this;
            that._onOpen = false;
            var result = {
                Data: {
                    pages: [],
                    total: 1
                }
            };
            $('#mainFrame').contents().find(".smartAbs[ctype='dialog']").each(function () {
                var id = $(this).attr("id");
                var caption = $(this).find(".w-modal-data").attr("data-title");
                var cid = $(this).find(".w-modal-data").attr("data-cid");
                result.Data.pages.push([id, caption, "showWZDialog('" + cid + "')"]);
            });

            var pageitems = template("temp_linkurl_page", result);

            $("#layer-link-dialog").find(".u-link-box").html(pageitems);
            var linkValue = $("#LinkUrlto-dialog").find("input").attr("data-linkValue");
            var $radio = $("#layer-link-dialog").find("input[type='radio'][data-pageid='" + linkValue + "']");
            $radio.next("i").addClass("checked");
            $radio.parent().addClass("checked");
            that._bindDialogEvents();
            //$("#layer-link-dialog").find(".n-pager").html(that._getPagerHtml(pageindex, result.Data.total));
            that._bindDialogEvents("dialog", null);
        },
        _bindPageEvents: function () {
            var $that = (this);
            var that = this;
            //绑定滚轮事件
            $('#layer-link-page').find('.fixation-scroll').lzscroll({ mode: 'hover', listenChange: false, speed: 30 });
            //绑定单选框的点击事件
            $('#layer-link-page').find('.radio-custom > input[type=radio]').each(function () {
                var $this = $(this);
                if ($this.data('radio')) return;
                $this.radio($this.data());
            });
            //记录点击过的按钮
            $('#layer-link-page').find('.radio-custom > input[type=radio]').click(function () {
                var currentPageId = $(this).attr('data-pageid');
                var currentPageTitle = $(this).attr('data-pagetitle');
                var currentPageUrl = $(this).attr('data-pageurl');
                $that.urllinkEditor.find(".x-page input").val(currentPageTitle);

                that._flushData({ text: currentPageTitle, value: currentPageId, url: "/" + currentPageUrl });
            });
            $("#layer-link-page").find(".n-submit").click(function () {
                that.urllinkEditor.find(".x-page").find("input").trigger("change");
                $("#layer-link-page").modal('hide');
            })

            $("#layer-link-page").modal("show");
        },
        _bindDialogEvents: function () {
            var $that = (this);
            var that = this;
            var linkValue = this.urllinkEditor.find(".n-linktypepanel").find("li.x-dialog").addClass("actve").find("input").attr("data-linkValue");
            //绑定滚轮事件
            $('#layer-link-dialog').find('.fixation-scroll').lzscroll({ mode: 'hover', listenChange: false, speed: 30 });
            //绑定单选框的点击事件
            $('#layer-link-dialog').find('.radio-custom > input[type=radio]').each(function () {
                var $this = $(this);
                if ($this.data('radio')) return;
                $this.radio($this.data());
                var currentDialogId = $this.attr("data-pageid");
                if (currentDialogId == linkValue) {
                    $this.parent().addClass("checked");
                    $this.next().addClass("checked");
                }
                else {
                    $this.parent().removeClass("checked");
                    $this.next().removeClass("checked");
                }
            });
            //记录点击过的按钮
            $('#layer-link-dialog').find('.radio-custom > input[type=radio]').click(function () {
                var currentPageId = $(this).attr('data-pageid');
                var currentPageTitle = $(this).attr('data-pagetitle');
                var currentPageUrl = $(this).attr('data-pageurl');
                $that.urllinkEditor.find(".x-dialog input").val(currentPageTitle);

                that._flushData({ text: currentPageTitle, value: currentPageId, url: currentPageUrl });
            });
            $("#layer-link-dialog").find(".n-submit").click(function () {
                that.urllinkEditor.find(".x-dialog").find("input").trigger("change");
                $("#layer-link-dialog").modal('hide');
            })

            $("#layer-link-dialog").modal("show");
        },
        // item={text,value} text:linkValueText value:linkValue
        _flushData: function (item) {
            this.urllinkEditor.find(".n-linktypepanel").find("li.x-" + this.getLinkType()).find("input")
                .attr("data-text", item.text)
                .attr("data-url", item.url)
                .attr("data-linkvalue", item.value);
            if (this.options.max >= this._selectData.length) {
                this._selectData.pop();
            }
            this._selectData.push(item.value);
        },
        getSelectedData: function () {
            return this._selectData.join(",");
        },
        _destory: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            urllink_modifier(this._value).call(this, newVal);
        },
        getLinkType: function () {
            return this.urllinkEditor.attr("linkType");
        },
        getLinkUrl: function (xtype) {
            var url = this.urllinkEditor.find(".n-linktypepanel").find("li.x-" + xtype).find("input").val();
            switch (xtype) {
                case "news":
                case "product":
                case "file":
                case "page":
                    var url = this.urllinkEditor.find(".n-linktypepanel").find("li.x-" + xtype).find("input").attr("data-url") ? this.urllinkEditor.find(".n-linktypepanel").find("li.x-" + xtype).find("input").attr("data-url") : 'javascript:;';
                    return url;
                case 'outsite':
                    if (url != null && url != '' && url.indexOf('http://') != 0 && url.indexOf('https://') != 0 && url.indexOf('#') != 0 && url.indexOf('/') != 0) {
                        url = 'http://' + url;
                    }
                    url = this._clearHost(url);
                    break;
                case 'email':
                    if (url != null && url != '' && url.indexOf('mailto:') != 0) {
                        url = 'mailto:' + url;
                    }
                    break;
                case 'phone':
                    if (url != null && url != '' && url.indexOf('tel:') != 0) {
                        url = 'tel:' + url;
                    }
                    break;
            }
            return url;
        },
        _clearHost: function (linkUrl) {
            if (typeof String.prototype.startsWith != 'function') {
                String.prototype.startsWith = function (prefix) {
                    return this.slice(0, prefix.length) === prefix;
                };
            }
            var lowerLinkUrl = linkUrl.toLowerCase();
            var host = location.host.toLowerCase();
            if (lowerLinkUrl.startsWith("http://" + host)) {
                linkUrl = linkUrl.substring(("http://" + host).length);
            } else if (lowerLinkUrl.startsWith(location.host)) {
                linkUrl = linkUrl.substring(host.length);
            }
            if (lowerLinkUrl.length > 0 && linkUrl.length == 0) {
                linkUrl = "/";
            }
            return linkUrl;
        },
        widget: function () {
            return this.urllinkEditor;
        }
    });
})(jQuery);

//listdata选择器
(function ($) {
    function listdata_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }

    var treeMenu = function treeMenu(a) {
        this.tree = a || [];
        this.groups = {};
        this.checked = [];
        this.init = function (checkIds) {
            this.toTree();
            this.checked = [];
            for (var i = 0; i < checkIds.length; i++) {
                this.checked.push(checkIds[i]);
            }
            return this.getDom(this.groups[0]);
        };
        this.IsChecked = function (val) {
            return $.inArray(val + "", this.checked) >= 0;
        };
        this.toTree = function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (!this.groups[this.tree[i].ParentId]) {
                    this.groups[this.tree[i].ParentId] = [];
                }
                this.groups[this.tree[i].ParentId].push(this.tree[i]);
            }
        };
        this.getDom = function (e) {
            if (!e) {
                return '';
            }
            var html = '<ul class="u-tree-item-box">';
            for (var i = 0; i < e.length; i++) {
                var ischecked = this.IsChecked(e[i].Id);
                var checkedClass = ischecked ? "current" : "";
                html += '<li class="u-tree-item"><div class="u-tree-item-inner ' + checkedClass + ' f-clearfix" data-cId="' + e[i].Id + '">';
                if (this.groups[e[i].Id]) {
                    html += '<span class="u-tree-hasChild icon icon-rotate-90 hewi8 f-left"><i class="icon-boder-right"></i></span>';
                }
                var checkedboxClass = ischecked ? "icon-checkbox-ok" : "icon-checkbox-no";
                html += '<span class="u-tree-checkbox f-left"><input type="checkbox"><i class="icon n-tree-checkbox ' + checkedboxClass + ' hewi14"></i></span>';
                html += '<span class="u-tree-txt f-left">' + e[i].Name + '</span>';
                html += '</div>';
                html += this.getDom(this.groups[e[i].Id]);
                html += '</li>';
            }
            html += '</ul>';
            return html;
        };
    }
    var treeCategoryMenu = function treeCategoryMenu(a) {
        this.tree = a || [];
        this.groups = {};
        this.checked = [];
        this.init = function (checkIds) {
            this.toTree();
            this.checked = [];
            for (var i = 0; i < checkIds.length; i++) {
                this.checked.push(checkIds[i]);
            }
            return this.getDom(this.groups[0]);
        };
        this.IsChecked = function (val) {
            return $.inArray(val + "", this.checked) >= 0;
        };
        this.toTree = function () {
            for (var i = 0; i < this.tree.length; i++) {
                if (!this.groups[this.tree[i].ParentId]) {
                    this.groups[this.tree[i].ParentId] = [];
                }
                this.groups[this.tree[i].ParentId].push(this.tree[i]);
            }
        };
        this.getDom = function (e, tag) {
            if (!e) {
                return '';
            }
            if (tag) {
                var html = '<ul class="u-tree-item-box f-hide">';
            } else {
                var html = '<ul class="u-tree-item-box">';
            }
            for (var i = 0; i < e.length; i++) {
                var ischecked = this.IsChecked(e[i].Id);
                var checkedClass = ischecked ? "current" : "";
                html += '<li class="u-tree-item"><div class="u-tree-item-inner ' + checkedClass + ' f-clearfix" data-cId="' + e[i].Id + '">';
                if (this.groups[e[i].Id]) {
                    html += '<span class="u-tree-hasChild icon icon-rotate-0 hewi8 f-left"><i class="icon-boder-right"></i></span>';
                }
                var checkedboxClass = ischecked ? "icon-checkbox-ok" : "icon-checkbox-no";
                html += '<span class="u-tree-checkbox f-left"><input type="checkbox"><i class="icon n-tree-checkbox ' + checkedboxClass + ' hewi14"></i></span>';
                html += '<span class="u-tree-txt f-left">' + e[i].Name + '</span>';
                html += '</div>';
                html += this.getDom(this.groups[e[i].Id], true);
                html += '</li>';
            }
            html += '</ul>';
            return html;
        };
    }
    var listMenu = function listMenu(a) {
        this.list = a || [];
        this.checked = [];
        this.init = function (checkIds) {
            this.checked = [];
            for (var i = 0; i < checkIds.length; i++) {
                this.checked.push(checkIds[i]);
            }
            return this.getDom(this.list);
        };
        this.IsChecked = function (val) {
            return $.inArray(val + "", this.checked) >= 0;
        };
        this.getDom = function (e) {
            if (!e) {
                return '';
            }
            var html = '';
            for (var i = 0; i < e.length; i++) {
                var ischecked = this.IsChecked(e[i].Id);
                var checkedClass = ischecked ? "checkbox-hover" : "";
                html += '<li class="account-system-checkbox ' + checkedClass + '" data-cId="' + e[i].Id + '"><div class="m-checkbox checkbox"><label class="checkbox-custom checked">';
                var checkedboxClass = ischecked ? "checked" : "";
                html += '<i class="' + checkedboxClass + '"></i><span>' + e[i].Name + '</span>';
                html += '</label></div></li>';
            }
            html += '';
            return html;
        };
    }

    var selectListMenu = function listMenu(a) {
        this.list = a || [];
        this.checked = [];
        this.init = function (checkIds) {
            this.checked = [];
            for (var i = 0; i < checkIds.length; i++) {
                this.checked.push(checkIds[i]);
            }
            return this.getDom(this.list);
        };
        this.IsChecked = function (val) {
            return $.inArray(val + "", this.checked) >= 0;
        };
        this.getDom = function (e) {
            if (!e) {
                return '';
            }
            var html = '';
            for (var i = 0; i < e.length; i++) {
                var ischecked = this.IsChecked(e[i].Id);
                if (!ischecked) continue;
                html += '<li class="account-system-checkbox f-clearfix" data-cId="' + e[i].Id + '"><label class="no-checked">';
                html += e[i].Name;
                html += '</label><span>×</span></li>';
            }
            html += '';
            return html;
        };
    }
    $.widget("smart.listdataEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "listdataEditor",
        options: {
            cssPrefix: "",
            dataType: "",
            cssChange: null,
            addCategory: null,
            cmax: 200,
            max: 200
            //orderByField: []
        },
        _selectCategoryIds: [],
        _selectIds: [],
        _selectData: [],
        _curSelectCategoryIds: [],
        _curSelectIds: [],
        _curSelectData: [],
        _onOpen: false,
        _onQuery: false,
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            this._selectData = [];
            this._selectCategoryIds = [];
            this._selectIds = [];
            this.options.dataType = cssStr.linkType;
            this.listdataEditor.attr("linkType", cssStr.linkType);
            var modal = this._getModal();
            if (cssStr.categoryIds) {
                var cIds = cssStr.categoryIds.split(",");
                for (var i = 0; i < cIds.length; i++) {
                    this._selectCategoryIds.push(cIds[i]);
                }
                modal.find(".modal-title-nav > li[data-role='selectcategory']").tab("show");
            }
            if (cssStr.Ids) {
                var ids = cssStr.Ids.split(",");
                for (var i = 0; i < ids.length; i++) {
                    this._selectIds.push(ids[i]);
                }
                modal.find(".modal-title-nav > li[data-role='selectid']").tab("show");
            }
            if (cssStr.ListData) {
                for (var i = 0; i < cssStr.ListData.length; i++) {
                    this._selectData.push(cssStr.ListData[i]);
                }
            }
            
            modal.find(".n-orderbyfield li[data-role='" + cssStr.orderByField + "']").click();
            modal.find(".n-orderbytype li[data-role='" + cssStr.orderByType + "']").click();
            modal.find(".n-orderbyfield").attr("data-orderbyfield", cssStr.orderByField)
            modal.find(".n-orderbytype").attr("data-orderbytype", cssStr.orderByType)
            this._refreshCategoryNum(modal, this._selectCategoryIds);
            this._refreshNum(modal, this._selectIds);

            //var field = orderby.attr("data-orderbyfield-new");
            //if (field == 'customsort') {
            //    $('.n-tree-checkbox').addClass('icon-checkbox-radius')
            //}

        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var listdataEditor = this.listdataEditor = this.element;
            this.element.attr("role", "listdataEditor");
            //var fields = this.options.orderByField;
            //if (fields) {
            //    var html = '';
            //    for (var i = 0; i < fields.length; i++) {

            //    }
            //    listdataEditor.find(".n-orderbytype li").html(html);
            //}
            var cstyle = nsmart.getCurSmartView().$control.attr('cstyle')
            if (cstyle === 'Style2' && this.options.dataType === 'news') {
                this.element.append('<div class="alert alert-warning" role="alert" style="margin:10px 0 0;">最多显示20条数据</div>')
            }
            

            var that = this;
            var modal = that._getModal();

            listdataEditor.find(".n-orderbyfield").on("hidden.bs.dropdown", function () {
                field = $(".n-orderbyfield").attr("data-orderbyfield-new");
                if (field == 'customsort') {
                    if (that._curSelectCategoryIds.length > 1) {
                        that._clearSelectCategory();
                    }
                    
                    //$('.n-tree-checkbox').addClass('icon-checkbox-radius')
                } else {
                    //$('.n-tree-checkbox').removeClass('icon-checkbox-radius')
                }
            });

            modal.find(".n-submit").click(function () {
                if (that._curSelectCategoryIds.length > that.options.cmax) {
                    alert("最大选择数量为：" + that.options.cmax + "");
                    return;
                }
                if (that._curSelectIds.length > that.options.max) {
                    alert("最大选择数量为：" + that.options.max + "");
                    return;
                }
                that._selectCategoryIds = that._curSelectCategoryIds;
                that._selectIds = that._curSelectIds;
                that._selectData = that._curSelectData;
                var orderbyfield = modal.find(".n-orderbyfield");
                orderbyfield.attr("data-orderbyfield", orderbyfield.attr("data-orderbyfield-new"));
                var orderbytype = modal.find(".n-orderbytype");
                orderbytype.attr("data-orderbytype", orderbytype.attr("data-orderbytype-new"));
                that._buildCss("OrderByField", orderbyfield.attr("data-orderbyfield"));
                that._buildCss("OrderByType", orderbytype.attr("data-orderbytype"));
                that._buildCss("SelectCategoryIds", that._curSelectCategoryIds.join(","));
                that._buildCss("SelectIds", that._curSelectIds.join(","));
                modal.modal("hide");
            });
            modal.find(".n-orderbyfield li").click(function () {
                var text = $(this).text();
                modal.find(".n-orderbyfield .showtext").html(text);
                var field = $(this).attr("data-role");
                modal.find(".n-orderbyfield").attr("data-orderbyfield-new", field);
                $(this).siblings().find("a.current").removeClass("current");
                $(this).find("a").addClass("current");
            })
            modal.find(".n-orderbytype li").click(function () {
                var text = $(this).text();
                modal.find(".n-orderbytype .showtext").html(text);
                var field = $(this).attr("data-role");
                modal.find(".n-orderbytype").attr("data-orderbytype-new", field);
                $(this).siblings().find("a.current").removeClass("current");
                $(this).find("a").addClass("current");
            })
            modal.find(".n-search").keypress(function (event) {
                if (event.keyCode == "13") {
                    that._queryData();
                }
            });
            modal.find(".select-all").click(function () {
                var canSelect = modal.find(".u-tree-public .u-tree-item-inner");
                var notSelect = canSelect.not(".current");
                if (canSelect.length > 0) {
                    if (notSelect.length == 0) {
                        that._clearSelectCategory();
                    } else {
                        that._selectAllCategory(true);
                    }
                } else {
                    modal.find(".select-all").toggleClass("current");
                    that._selectAllCategory(modal.find(".select-all").hasClass("current"));
                }
                that._clearSelectId();
            });
            modal.find(".n-addCategory").click(function () {
                if (typeof (that.options.addCategory) == 'function') {
                    that.options.addCategory();
                }
            });
            modal.find(".n-select-type li[data-toggle='tab']").on("shown.bs.tab", function (e) {
                var type = $(e.target).attr("data-role");
                modal.find(".n-submit").show().parent().removeAttr("style");
                if (type == "selectid") {
                    modal.find(".n-select-category").hide();
                    modal.find(".n-select-id").show();
                    if (that._curSelectIds.length == 0) {
                        modal.find(".n-submit").hide().parent().attr("style", "border:none");
                    }
                } else {
                    modal.find(".n-select-category").show();
                    modal.find(".n-select-id").hide();
                    if (that._curSelectCategoryIds.length == 0) {
                        modal.find(".n-submit").hide().parent().attr("style", "border:none");
                    }
                }
            });
        },
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
            this._refresh();
        },
        _buildCss: function (key, value) {
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[key] = value;
            this.value(cssData);
            var data = {};
            data.key = key;
            data.value = value;
            this._trigger("cssChange", null, data);
        },
        _events: {
            "click .n-select": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                var modal = that._getModal();

                that._curSelectCategoryIds = that._selectCategoryIds.slice();
                that._curSelectIds = that._selectIds.slice();
                modal.find(".modal-title-nav > li[data-role='selectcategory']").tab("show");
                if (that._curSelectIds.length > 0) {
                    modal.find(".modal-title-nav > li[data-role='selectid']").tab("show");
                }
                that._curSelectData = that._selectData.slice();
                //var orderby = modal.find(".n-orderbyfield");
                //orderby.attr("data-orderbyfield-new", orderby.attr("data-orderbyfield"));
                //orderby.attr("data-orderbytype-new", orderby.attr("data-orderbytype"));
                //var target = $(event.currentTarget);
                var orderbyfield = modal.find(".n-orderbyfield");
                //orderbyfield.attr("data-orderbyfield-new", orderbyfield.attr("data-orderbyfield"))

                var orderbytype = modal.find(".n-orderbytype");
                //orderbytype.attr("data-orderbytype-new", orderbytype.attr("data-orderbyfield"))

                modal.find(".n-orderbyfield li[data-role='" + orderbyfield.attr("data-orderbyfield") + "']").click();
                modal.find(".n-orderbytype li[data-role='" + orderbytype.attr("data-orderbytype") + "']").click();
                
                var isInitial = that.listdataEditor.attr("data-ok");

                if (isInitial) {
                    modal.modal("show");
                } else {
                    $('#rightEditContainer > #' + modal.attr("id")).remove();
                    $('#rightEditContainer').append(modal.modal("show"));
                    //$("#" + mId).find(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                    that.listdataEditor.attr("data-ok", "true")
                }

                var cdata = {};
                cdata.dataType = that.options.dataType;
                $.ajax({
                    url: "/Designer/Common/GetDataCategory",
                    type: "POST",
                    dataType: "json",
                    data: cdata
                }).done(function (data) {
                    var tree = new treeMenu(data.Data);
                    var html = tree.init(that._curSelectCategoryIds);
                    modal.find(".u-tree-public")
                        .html(html)
                        .show();

                    modal.find(".u-tree-public").find(".u-tree-item-inner").click(function () {
                        var ischecked = !$(this).hasClass("current");
                        if (ischecked && that._curSelectCategoryIds.length >= that.options.cmax) {
                            alert("最大选择数量为：" + that.options.cmax + "");
                            return;
                        }

                        var field = $(".n-orderbyfield").attr("data-orderbyfield-new");
                        if (field == 'customsort') {
                            var isChecedAll = that._getIndexOf(that._curSelectCategoryIds, 0) > -1
                            if (isChecedAll) {
                                ischecked = true
                            }
                            that._clearSelectCategory();
                        }

                        $(this).toggleClass("current", ischecked);
                        $(this).find(".n-tree-checkbox").toggleClass("icon-checkbox-ok", ischecked).toggleClass("icon-checkbox-no", !ischecked);
                        var cId = $(this).attr("data-cId");
                        if (!ischecked) {
                            that._cancelAll();
                        }
                        var index = that._getIndexOf(that._curSelectCategoryIds, cId);
                        if (ischecked) {
                            if (index == -1) {
                                that._curSelectCategoryIds.push(cId);
                                
                            }
                        } else {
                            if (index > -1) {
                                that._curSelectCategoryIds.splice(index, 1);
                            }
                        }
                        that._refreshCategoryNum(modal, that._curSelectCategoryIds);
                        that._clearSelectId();
                        that._refreshAll();
                    });
                    that._selectAllCategory();
                    that._refreshAll();
                    that._onOpen = false;
                });
                that._queryData();
            }
        },
        _getModal: function () {
            var mId = this.listdataEditor.attr("data-modalId");
            return $("#" + mId);
        },
        _queryData: function () {
            var that = this;
            that._onQuery = true;
            var modal = that._getModal();
            var pdata = {};
            pdata.dataType = that.options.dataType;
            pdata.key = modal.find(".n-search").val();
            pdata.selectCategory = "0";
            pdata.setTop = true;
            pdata.pageSize = 50;
            pdata.isDesign = true;
            pdata.es = true;
            $.ajax({
                url: "/Designer/Common/GetData",
                type: "POST",
                dataType: "json",
                data: pdata
            }).done(function (data) {
                var list = new listMenu(data.Data);
                var html = list.init(that._curSelectIds);
                modal.find(".false-box .no-found").toggleClass("f-hide", html.length > 0);
                modal.find(".in-false-box")
                    .html(html)
                modal.find(".in-false-box").find("li.account-system-checkbox").click(function () {
                    var ischecked = !$(this).hasClass("checkbox-hover");
                    if (ischecked && that._curSelectIds.length >= that.options.max) {
                        alert("最大选择数量为：" + that.options.max + "");
                        return;
                    }
                    $(this).toggleClass("checkbox-hover", ischecked);
                    $(this).find("i").toggleClass("checked", ischecked);
                    var cId = $(this).attr("data-cId");
                    var index = that._getIndexOf(that._curSelectIds, cId);
                    if (ischecked) {
                        if (index == -1) {
                            that._curSelectIds.push(cId);
                            if (!that._hasCurSelectData(cId)) {
                                that._curSelectData.push({ Id: cId, Name: nsmart.htmlEncode($(this).text()) });
                            }
                            that._refreshTrue();
                        }
                    } else {
                        if (index > -1) {
                            that._curSelectIds.splice(index, 1);
                            modal.find(".in-true-box").find("li.account-system-checkbox[data-cId='" + cId + "']").remove();
                        }
                    }
                    that._refreshNum(modal, that._curSelectIds);
                    that._clearSelectCategory();
                });
                that._refreshTrue();
                that._onQuery = false;
            });
        },
        _refreshTrueTarget: null,
        _refreshTrue: function () {
            clearTimeout(this._refreshTrueTarget);
            var that = this;
            this._refreshTrueTarget = setTimeout(function () {
                var modal = that._getModal();
                var html = "";
                for (var i = 0; i < that._curSelectData.length; i++) {
                    if ($.inArray(that._curSelectData[i].Id + "", that._curSelectIds) >= 0) {
                        html += that._trueHtml(that._curSelectData[i]);
                    }
                }
                modal.find(".true-box .no-found").toggleClass("f-hide", html.length > 0);
                modal.find(".in-true-box").html(html);
                modal.find(".in-true-box").find("li.account-system-checkbox span").click(function () {
                    var curli = $(this).closest("li");
                    var cId = curli.attr("data-cId");
                    var index = that._getIndexOf(that._curSelectIds, cId);
                    if (index != -1) {
                        that._curSelectIds.splice(index, 1);
                        that._refreshNum(modal, that._curSelectIds);
                    }
                    modal.find(".in-false-box").find("li.account-system-checkbox[data-cId='" + cId + "']")
                        .toggleClass("checkbox-hover", false)
                        .find("i").toggleClass("checked", false);
                    curli.remove();
                });
            }, 50);
        },
        _selectAllCategory: function (ischecked) {
            var that = this;
            var modal = that._getModal();
            if (ischecked == undefined) {
                if (this._getIndexOf(this._curSelectCategoryIds, 0) == -1) {
                    return;
                }
                modal.find(".select-all").toggleClass("current", true);
                ischecked = true;
            }
            modal.find(".u-tree-public .u-tree-item-inner").toggleClass("current", ischecked).find(".n-tree-checkbox").toggleClass("icon-checkbox-ok", ischecked).toggleClass("icon-checkbox-no", !ischecked);
            this._refreshAll();
            this._refreshNum(modal, that._curSelectIds);
        },
        _refreshAllTarget: null,
        _refreshAll: function () {
            clearTimeout(this._refreshAllTarget);
            var that = this;
            this._refreshAllTarget = setTimeout(function () {
                var modal = that._getModal();
                var canSelect = modal.find(".u-tree-public .u-tree-item-inner");
                var ischecked = canSelect.not(".current").length == 0;
                if (canSelect.length == 0) {
                    ischecked = modal.find(".select-all").hasClass("current");
                }
                modal.find(".select-all").toggleClass("current", ischecked)
                modal.find(".select-all").find("i").toggleClass("checked", ischecked);
                if (ischecked) {
                    that._curSelectCategoryIds = [];
                    that._curSelectCategoryIds.push(0);
                    that._refreshCategoryNum(modal, that._curSelectCategoryIds);
                }
            }, 50);
        },
        _clearSelectCategory: function () {
            this._curSelectCategoryIds = [];
            this._selectAllCategory(false);
            var modal = this._getModal();
            this._refreshCategoryNum(modal, this._curSelectCategoryIds);
            modal.find(".n-submit").show();
        },
        _clearSelectId: function () {
            this._curSelectIds = [];
            var modal = this._getModal();
            // 取消数据选取选中状态
            modal.find(".in-false-box").find("li.account-system-checkbox").removeClass("checkbox-hover").find("i").removeClass("checked");
            this._refreshTrue();
            this._refreshNum(modal, this._curSelectIds)
            modal.find(".n-submit").show();
        },
        _cancelAll: function () {
            var that = this;
            if (this._getIndexOf(this._curSelectCategoryIds, 0) > -1) {
                var modal = this._getModal();
                this._curSelectCategoryIds = [];
                modal.find(".u-tree-public .u-tree-item-inner").each(function () {
                    that._curSelectCategoryIds.push($(this).attr("data-cId") + "");
                });
            }
        },
        _hasCurSelectData: function (cId) {
            for (var i = 0; i < this._curSelectData.length; i++) {
                if (this._curSelectData[i].Id == cId) {
                    return true;
                }
            }
            return false;
        },
        _trueHtml: function (data) {
            var html = '<li class="account-system-checkbox f-clearfix" data-cId="' + data.Id + '"><label class="no-checked">';
            html += data.Name;
            html += '</label><span>×</span></li>';
            return html
        },
        _refreshCategoryNum: function (modal, categoryIds) {
            var strHtml = "";
            if (this._getIndexOf(categoryIds, 0) == -1) {
                strHtml = categoryIds.length;
                modal.find(".n-categoryext").html("个");
            } else {
                strHtml = "全部"
                modal.find(".n-categoryext").html("");
            }
            modal.find(".n-categorynum").html(strHtml);
        },
        _refreshNum: function (modal, ids) {
            modal.find(".n-datanum").html(ids.length);
            modal.find(".n-dataext").html(this._getCurExt());
        },
        _getCurExt: function () {
            switch (this.options.dataType) {
                case "news":
                    return "篇";
                case "product":
                    return "个";
                case "file":
                    return "个";
            }
            return "个";
        },
        _getIndexOf: function (array, val) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == val) return i;
            }
            return -1;
        },
        getSelectedData: function () {
            return this._selectData.toString();
        },
        _destory: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            listdata_modifier(this._value).call(this, newVal);
        },
        getLinkUrl: function (xtype) {
            return this.listdataEditor.find(".n-linktypepanel").find("li.x-" + xtype).find("input").attr("data-url");
        },
        widget: function () {
            return this.listdataEditor;
        }
    });
    $.widget("smart.categorydataEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "categorydataEditor",
        options: {
            cssPrefix: "",
            dataType: "",
            listLevel: 3,
            cssChange: null,
            addCategory: null,
            cmax: 200,
            max: 200
            //orderByField: []
        },
        _selectCategoryIds: [],
        _curCategoryType: "news",
        _selectIds: [],
        _selectData: [],
        _curSelectCategoryIds: [],
        _curSelectIds: [],
        _curSelectData: [],
        _onOpen: false,
        _onQuery: false,
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            this._selectData = [];
            this._selectCategoryIds = [];
            this._selectIds = [];
            this.options.dataType = cssStr.linkType;
            this.listdataEditor.attr("linkType", cssStr.linkType);
            var modal = this._getModal();
            if (cssStr.categoryIds) {
                var cIds = cssStr.categoryIds.split(",");
                for (var i = 0; i < cIds.length; i++) {
                    this._selectCategoryIds.push(cIds[i]);
                }
                var nav;
                if (cssStr.curCategoryType == "news") {
                    nav = modal.find(".modal-title-nav > li[data-role='selectnewscategory']");
                    modal.find(".n-select-category").show();
                    modal.find(".n-select-id").hide();
                } else {
                    nav = modal.find(".modal-title-nav > li[data-role='selectproductcategory']");
                    modal.find(".n-select-category").hide();
                    modal.find(".n-select-id").show();
                }
                nav.tab("show");
                this._curCategoryType = cssStr.curCategoryType;
            } else {
                if (cssStr.curCategoryType == "news") {
                    modal.find(".n-select-category").show();
                    modal.find(".n-select-id").hide();
                } else {
                    modal.find(".n-select-category").hide();
                    modal.find(".n-select-id").show();
                }
            }
            if (cssStr.ListData) {
                for (var i = 0; i < cssStr.ListData.length; i++) {
                    this._selectData.push(cssStr.ListData[i]);
                }
            }



        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var listdataEditor = this.listdataEditor = this.element;
            this.element.attr("role", "listdataEditor");
            var that = this;
            var modal = that._getModal();

            modal.find(".n-submit").click(function () {
                if (that._curSelectCategoryIds.length > that.options.cmax) {
                    alert("最大选择数量为：" + that.options.cmax + "");
                    return;
                }
                if (that._curSelectIds.length > that.options.max) {
                    alert("最大选择数量为：" + that.options.max + "");
                    return;
                }
                that._selectCategoryIds = that._curSelectCategoryIds;
                var ccount = that._selectCategoryIds.length;
                that._selectIds = that._curSelectIds;
                that._selectData = that._curSelectData;
                var orderbyfield = modal.find(".n-orderbyfield");
                orderbyfield.attr("data-orderbyfield", orderbyfield.attr("data-orderbyfield-new"));
                var orderbytype = modal.find(".n-orderbytype");
                orderbytype.attr("data-orderbytype", orderbytype.attr("data-orderbytype-new"));
                that._buildCss("OrderByField", orderbyfield.attr("data-orderbyfield"));
                that._buildCss("OrderByType", orderbytype.attr("data-orderbytype"));
                that._buildCss("SelectCategoryIds", that._curSelectCategoryIds.join(","));
                that._buildCss("CurCategoryType", that._curCategoryType);
                modal.modal("hide");
            });
            modal.find(".n-orderbyfield li").click(function () {
                var text = $(this).text();
                modal.find(".n-orderbyfield .showtext").html(text);
                var field = $(this).attr("data-role");
                modal.find(".n-orderbyfield").attr("data-orderbyfield-new", field);
                $(this).siblings().find("a.current").removeClass("current");
                $(this).find("a").addClass("current");
            });
            modal.find(".n-orderbytype li").click(function () {
                var text = $(this).text();
                modal.find(".n-orderbytype .showtext").html(text);
                var field = $(this).attr("data-role");
                modal.find(".n-orderbytype").attr("data-orderbytype-new", field);
                $(this).siblings().find("a.current").removeClass("current");
                $(this).find("a").addClass("current");
            });
            modal.find(".select-all").click(function () {
                var canSelect = modal.find(".u-tree-public.newCategory .u-tree-item-inner");
                var selectAll = modal.find(".select-all.newsList");
                if (that._curCategoryType == "product") {
                    canSelect = modal.find(".u-tree-public.productCategory .u-tree-item-inner");
                    selectAll = modal.find(".select-all.productList");
                }
                var notSelect = canSelect.not(".current");
                if (canSelect.length > 0) {
                    if (notSelect.length == 0) {
                        that._clearSelectCategory();
                    } else {
                        that._selectAllCategory(true);
                    }
                } else {
                    $(this).toggleClass("current");
                    that._selectAllCategory(selectAll.hasClass("current"));
                }
                that._clearSelectId();
            });
            modal.find(".n-addCategory").click(function () {
                if (typeof (that.options.addCategory) == 'function') {
                    that.options.addCategory(that._curCategoryType);
                }
            });
            modal.find(".n-select-type li[data-toggle='tab']").on("shown.bs.tab", function (e) {
                var type = $(e.target).attr("data-role");
                that._clearSelectCategory();
                if (type == "selectproductcategory") {
                    modal.find(".n-select-category").hide();
                    modal.find(".n-select-id").show();
                    that._curCategoryType = "product";
                    if ($("#ListDataselect-to-productclass .u-tree-item-box li").length == 0) {
                        $(".modal-footer .n-submit").addClass("disabled");
                    } else {
                        $(".modal-footer .n-submit").removeClass("disabled");
                    }

                } else {
                    modal.find(".n-select-category").show();
                    modal.find(".n-select-id").hide();
                    that._curCategoryType = "news";
                    if ($("#ListDataselect-to-newclass .u-tree-item-box li").length == 0) {
                        $(".modal-footer .n-submit").addClass("disabled");
                    } else {
                        $(".modal-footer .n-submit").removeClass("disabled");
                    }
                }
            });
        },
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
            this._refresh();
        },
        _buildCss: function (key, value) {
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[key] = value;
            this.value(cssData);
            var data = {
            };
            data.key = key;
            data.value = value;
            data.type = this._curCategoryType;
            this._trigger("cssChange", null, data);
        },
        _parentClick: function (tag) {
            var that = this;
            var $tag = $(tag);
            var $prev = $tag.parents(".u-tree-item-box:first").prev();

            if ($prev.hasClass("u-tree-item-inner")) {
                var datacId = $prev.attr("data-cid");
                if ($tag.hasClass("current")) {
                    if (!$prev.hasClass("current")) {
                        $prev.addClass("current");
                        $prev.find("i:last").removeClass("icon-checkbox-no");
                        $prev.find("i:last").addClass("icon-checkbox-ok");
                        that._curSelectCategoryIds.push(datacId);
                        that._parentClick($prev);
                    }
                } else {
                    if (!$tag.parents(".u-tree-item-box:first").find(".u-tree-item-inner").hasClass("current")) {
                        var index = that._getIndexOf(that._curSelectCategoryIds, datacId);
                        $prev.removeClass("current");
                        $prev.find("i:last").removeClass("icon-checkbox-ok");
                        $prev.find("i:last").addClass("icon-checkbox-no");
                        that._curSelectCategoryIds.splice(index, 1);
                        that._parentClick($prev);
                    }
                }
            }
        },
        _childClick: function (tag) {
            var that = this;
            var $tag = $(tag);
            var $next = $tag.next();

            if ($next.hasClass("u-tree-item-box")) {
                var datacId = "";
                if ($tag.hasClass("current")) {
                    $next.find(".u-tree-item-inner").addClass("current");
                    $next.find(".u-tree-item-inner").each(function () {
                        $(this).find("i:last").removeClass("icon-checkbox-no");
                        $(this).find("i:last").addClass("icon-checkbox-ok");
                        datacId = $(this).attr("data-cid");
                        that._curSelectCategoryIds.push(datacId);
                    })
                } else {
                    $next.find(".u-tree-item-inner").removeClass("current");
                    $next.find(".u-tree-item-inner").each(function () {
                        $(this).find("i:last").removeClass("icon-checkbox-ok");
                        $(this).find("i:last").addClass("icon-checkbox-no");
                        datacId = $(this).attr("data-cid");
                        var index = that._getIndexOf(that._curSelectCategoryIds, datacId);
                        that._curSelectCategoryIds.splice(index, 1);
                    })
                }
                that._childClick($next);
            }
        },
        _initClick: function (modal, data, categoryType) {
            var that = this;
            var tree = new Object();
            var html = "";
            var $utree = $(modal).find(".u-tree-public.newCategory");
            var $utreeNumber = $(modal).find(".n-categorynum");
            if (that._curCategoryType == categoryType) {
                tree = new treeCategoryMenu(data.NewData);
            } else {
                tree = new treeCategoryMenu(data.ProductData);
                $utree = $(modal).find(".u-tree-public.productCategory");
                $utreeNumber = $(modal).find(".n-datanum");
            }
            html = tree.init(that._curSelectCategoryIds, that.options.listLevel)
            $utree.html(html).show();
            $utree.find(".u-tree-item-inner .icon.u-tree-hasChild").click(function () {
                var $innerUl = $(this).closest(".u-tree-item-inner").next();
                if ($(this).hasClass("icon-rotate-90")) {
                    $(this).removeClass("icon-rotate-90").addClass("icon-rotate-0");
                    $innerUl.addClass("f-hide");
                } else {
                    $(this).removeClass("icon-rotate-0").addClass("icon-rotate-90");
                    $innerUl.removeClass("f-hide");
                }
            });
            $utree.find(".u-tree-item-inner .icon.hewi14").click(function () {
                var $inner = $(this).closest(".u-tree-item-inner");
                var ischecked = !$inner.hasClass("current");
                if (ischecked && that._curSelectCategoryIds.length >= that.options.cmax) {
                    alert("最大选择数量为：" + that.options.cmax + "");
                    return;
                }
                $inner.toggleClass("current", ischecked);
                $(this).toggleClass("icon-checkbox-ok", ischecked).toggleClass("icon-checkbox-no", !ischecked);
                var cId = $inner.attr("data-cId");
                if (!ischecked) {
                    that._cancelAll();
                }
                var index = that._getIndexOf(that._curSelectCategoryIds, cId);
                if (ischecked) {
                    if (index == -1) {
                        that._curSelectCategoryIds.push(cId);
                    }
                } else {
                    if (index > -1) {
                        that._curSelectCategoryIds.splice(index, 1);
                    }
                }
                //初始化子节点级联事件
                that._childClick($inner);
                //初始化父节点级联事件
                that._parentClick($inner);

                if ($utree.hasClass("newCategory")) {
                    that._curCategoryType = "news";
                } else {
                    that._curCategoryType = "product";
                }
                $utreeNumber.html(that._curSelectCategoryIds.length + "个");
            });
        },
        _events: {
            "click .n-select": function (event) {
                var that = this;
                if (that._onOpen) {
                    return;
                }
                that._onOpen = true;
                var modal = that._getModal();

                that._curSelectCategoryIds = that._selectCategoryIds.slice();
                that._curSelectIds = that._selectIds.slice();
                that._curSelectData = that._selectData.slice();
                var orderby = modal.find(".n-orderbyfield");
                orderby.attr("data-orderbyfield-new", orderby.attr("data-orderbyfield"));
                orderby.attr("data-orderbytype-new", orderby.attr("data-orderbytype"));
                var target = $(event.currentTarget);
                var isInitial = that.listdataEditor.attr("data-ok");


                if (isInitial) {
                    modal.modal("show");
                } else {
                    $('#rightEditContainer > #' + modal.attr("id")).remove();
                    $('#rightEditContainer').append(modal.modal("show"));
                    //$("#" + mId).find(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                    that.listdataEditor.attr("data-ok", "true")
                }

                $.ajax({
                    url: "/Designer/Common/GetDataCategorys",
                    type: "POST",
                    dataType: "json"
                }).done(function (data) {
                    //初始化弹框文章与产品分类列表
                    that._initClick(modal, data, "news");
                    that._initClick(modal, data, "product");

                    that._selectAllCategory();
                    that._onOpen = false;
                    if (that._curCategoryType == "product") {
                        modal.find(".n-datanum").html(that._selectCategoryIds.length);
                        modal.find(".n-categorynum").html("0个");
                    } else {
                        modal.find(".n-categorynum").html(that._selectCategoryIds.length);
                        modal.find(".n-datanum").html("0个");
                    }

                });
            }
        },
        _getModal: function () {
            var mId = this.listdataEditor.attr("data-modalId");
            return $("#" + mId);
        },
        _refreshTrueTarget: null,
        _refreshTrue: function () {
            clearTimeout(this._refreshTrueTarget);
            var that = this;
            this._refreshTrueTarget = setTimeout(function () {
                var modal = that._getModal();
                var html = "";
                for (var i = 0; i < that._curSelectData.length; i++) {
                    if ($.inArray(that._curSelectData[i].Id + "", that._curSelectIds) >= 0) {
                        html += that._trueHtml(that._curSelectData[i]);
                    }
                }
                modal.find(".true-box .no-found").toggleClass("f-hide", html.length > 0);
                modal.find(".in-true-box").html(html);
                modal.find(".in-true-box").find("li.account-system-checkbox span").click(function () {
                    var curli = $(this).closest("li");
                    var cId = curli.attr("data-cId");
                    var index = that._getIndexOf(that._curSelectIds, cId);
                    if (index != -1) {
                        that._curSelectIds.splice(index, 1);
                    }
                    modal.find(".in-false-box").find("li.account-system-checkbox[data-cId='" + cId + "']")
                        .toggleClass("checkbox-hover", false)
                        .find("i").toggleClass("checked", false);
                    curli.remove();
                });
            }, 50);
        },
        _selectAllCategory: function (ischecked) {
            var that = this;
            var modal = that._getModal();
            var $treeinner = modal.find(".u-tree-public.newCategory .u-tree-item-inner");
            var selectAll = modal.find(".select-all.newsList");
            if (that._curCategoryType == "product") {
                selectAll = modal.find(".select-all.productList");
                $treeinner = modal.find(".u-tree-public.productCategory .u-tree-item-inner");
            }
            if (ischecked == undefined) {
                if (this._getIndexOf(this._curSelectCategoryIds, 0) == -1) {
                    return;
                }
                selectAll.toggleClass("current", true);
                ischecked = true;
            }

            $treeinner.toggleClass("current", ischecked).find(".icon.hewi14").toggleClass("icon-checkbox-ok", ischecked).toggleClass("icon-checkbox-no", !ischecked);
            this._refreshAll();
        },
        _refreshAllTarget: null,
        _refreshAll: function () {
            clearTimeout(this._refreshAllTarget);
            var that = this;
            this._refreshAllTarget = setTimeout(function () {
                var modal = that._getModal();
                var selectAll = modal.find(".select-all.newsList");
                var cannSelect = modal.find(".u-tree-public.newCategory .u-tree-item-inner");
                var $utreeNumber = $(modal).find(".n-categorynum");
                if (that._curCategoryType == "product") {
                    cannSelect = modal.find(".u-tree-public.productCategory .u-tree-item-inner");
                    $utreeNumber = $(modal).find(".n-datanum");
                    selectAll = modal.find(".select-all.productList");
                }
                var ischecked = cannSelect.not(".current").length == 0;
                if (cannSelect.length == 0) {
                    ischecked = selectAll.hasClass("current");
                }
                selectAll.toggleClass("current", ischecked)
                selectAll.find("i").toggleClass("checked", ischecked);

                if (ischecked) {
                    that._curSelectCategoryIds = [];
                    that._curSelectCategoryIds.push(0);
                }
                $utreeNumber.html(that._curSelectCategoryIds.length == 1 ? "全选" : "0个");
            }, 50);
        },
        _clearSelectCategory: function () {
            this._curSelectCategoryIds = [];
            this._selectAllCategory(false);
            var modal = this._getModal();
            var $treenum = modal.find(".n-categorynum");
            if (this._curCategoryType == "product") {
                $treenum = modal.find(".n-datanum");
            }
            $treenum.html(this._curSelectCategoryIds.length + "个");
        },
        _clearSelectId: function () {
            this._curSelectIds = [];
            var modal = this._getModal();
            // 取消数据选取选中状态
            modal.find(".in-false-box").find("li.account-system-checkbox").removeClass("checkbox-hover").find("i").removeClass("checked");
            this._refreshTrue();
        },
        _cancelAll: function () {
            var that = this;
            if (this._getIndexOf(this._curSelectCategoryIds, 0) > -1) {
                var modal = this._getModal();
                this._curSelectCategoryIds = [];
                var $treeinner = modal.find(".u-tree-public.newCategory .u-tree-item-inner");
                if (that._curCategoryType == "product") {
                    $treeinner = modal.find(".u-tree-public.productCategory .u-tree-item-inner");
                }
                $treeinner.each(function () {
                    that._curSelectCategoryIds.push($(this).attr("data-cId") + "");
                });
            }
        },
        _hasCurSelectData: function (cId) {
            for (var i = 0; i < this._curSelectData.length; i++) {
                if (this._curSelectData[i].Id == cId) {
                    return true;
                }
            }
            return false;
        },
        _trueHtml: function (data) {
            var html = '<li class="account-system-checkbox f-clearfix" data-cId="' + data.Id + '"><label class="no-checked">';
            html += data.Name;
            html += '</label><span>×</span></li>';
            return html
        },
        _getIndexOf: function (array, val) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] == val) return i;
            }
            return -1;
        },
        getSelectedData: function () {
            return this._selectData.toString();
        },
        _destory: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            listdata_modifier(this._value).call(this, newVal);
        },
        getLinkUrl: function (xtype) {
            return this.listdataEditor.find(".n-linktypepanel").find("li.x-" + xtype).find("input").attr("data-url");
        },
        widget: function () {
            return this.listdataEditor;
        }
    });
})(jQuery);

//bannerSlideBtn控件
(function ($) {
    function bannerSlideBtn_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("smart.bannerSlideBtnEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "bannerSlideBtnEditor",
        options: {
            isPager: true,
            isGoto: true,
            isMore: true,
            cssChange: null
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var paging = cssStr;
            var that = this;
            that.bannerSlideBtnEditor.find(".n-pagesize").lzsliding("value", paging.PageSize);
            that.bannerSlideBtnEditor.find(".n-switch").switchEditor("fillCss", paging.IsPaging);
            var mId = that.bannerSlideBtnEditor.find(".n-change-pagerstyle").attr("data-modalId");
            var pagerStyleEle = $("#" + mId).find(".u-col[data-role='" + paging.BackgroundStyle + "']");
            $("#" + mId).find(".n-pagerstylepanel .u-colimg").removeClass("z-current");
            pagerStyleEle.find(".u-colimg").addClass("z-current");
            that.bannerSlideBtnEditor.find(".n-pager").find("img").attr("src", pagerStyleEle.find("img").attr("src"));

            that.bannerSlideBtnEditor.find(".n-pager").children(".bannerSlideBtnSet").addClass("f-hide");
/*            let a = that.bannerSlideBtnEditor.find(".n-pager").children(".bannerSlideBtnSet");
            that.bannerSlideBtnEditor.find(".n-pager").children(".bannerSlideBtnSet").eq(paging.BackgroundStyle - 1).removeClass("f-hide");
*/
            that.bannerSlideBtnEditor.find(".u-font-algin-box[data-role='" + paging.PagerAlign + "']").addClass("current")
                .siblings().removeClass("current");
            if (paging.IsPaging == false || paging.IsPaging == "off" || paging.IsPaging == "false") {
                that.bannerSlideBtnEditor.find(".m-switch-notxt").removeClass("checked");
            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var bannerSlideBtnEditor = this.bannerSlideBtnEditor = this.element;
            this.element.attr("role", "bannerSlideBtnEditor");
            var that = this;
            bannerSlideBtnEditor.find(".xspinner").xspinner();
            bannerSlideBtnEditor.find(".n-pagesize").lzsliding({
                valSelect: {
                    val: '.txt-num', unit: ''
                },
                openUnit: [true, ""],
                effect: function () {
                    var count = this.value()
                    that._buildCss("PageSize", count); // #ff0000
                }
            });
            bannerSlideBtnEditor.find(".n-switch").switchEditor({
                widgetIds: "",
                widgetJQuery: that.bannerSlideBtnEditor.find(".n-pager"),
                onSwitchOn: function () {
                    that.bannerSlideBtnEditor.find(".m-switch-notxt").addClass("checked");
                    that._buildCss("IsPaging", true);
                },
                onSwitchOff: function () {
                    that.bannerSlideBtnEditor.find(".m-switch-notxt").removeClass("checked");
                    that._buildCss("IsPaging", false);
                }
            });
            bannerSlideBtnEditor.find(".x-pager").toggle(this.options.isPager);
            bannerSlideBtnEditor.find(".x-goto").toggle(this.options.isGoto);
            bannerSlideBtnEditor.find(".x-more").toggle(this.options.isMore);
            var mId = bannerSlideBtnEditor.find(".n-change-pagerstyle").attr("data-modalId");
            $("#" + mId + ".x-pager-dialog-open").remove();
        },
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
            this._refresh();
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[tempKey] = value;
            this.value(cssData);
            var data = {
            };
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            //this._cssTarget().css(key, value);
        },
        _events: {
            //文字的位置
            "click .u-font-algin-box": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current").siblings().removeClass("current");
                var align = target.attr("data-role");
                if (target.hasClass("current")) {
                    this._buildCss("PagerAlign", align);
                }
            },
            "click .n-change-pagerstyle": function (event) {
                var target = $(event.currentTarget);
                var isInitial = target.attr("data-ok");
                var mId = target.attr("data-modalId");
                var that = this;
                if (isInitial) {
                    $("#" + mId).modal("show");
                } else {
                    $('#rightEditContainer').append($("#" + mId).modal("show").addClass("x-pager-dialog-open"));
                    $("#" + mId).find(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                    $("#" + mId).find(".u-col").click(function () {
                        $("#" + mId).find(".n-pagerstylepanel .u-colimg").removeClass("z-current");
                        $(this).find(".u-colimg").addClass("z-current");
                        var smartView = nsmart.getCurSmartView();
                        smartView.$control.find(".slideArrow").removeClass("f-hide");
                        that._buildCss("bannerSlideBtnStyle", $(this).attr("data-color"));
/*                        target.parent().parent().find(".n-pager").children(".bannerSlideBtnSet").addClass("f-hide");
                        target.parent().parent().find(".n-pager").children(".bannerSlideBtnSet").eq($(this).attr("data-color") - 1).removeClass("f-hide");
*/                   var imgUrl = $(this).find("img").attr("src");
                        target.parent().find("img").attr("src", imgUrl);
                    });
                    target.attr("data-ok", "true");
                }
            }
        },
        _destory: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            bannerSlideBtn_modifier(this._value).call(this, newVal);
        },
        widget: function () {
            return this.bannerSlideBtnEditor;
        }
    });
})(jQuery);

// bannerArrow控件
(function ($) {
    function bannerArrow_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("smart.bannerArrowEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "bannerArrowEditor",
        options: {
            isPager: true,
            isGoto: true,
            isMore: true,
            cssChange: null
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var paging = cssStr;
            var that = this;
            that.bannerArrowEditor.find(".n-pagesize").lzsliding("value", paging.PageSize);
            that.bannerArrowEditor.find(".n-switch").switchEditor("fillCss", paging.IsPaging);
            var mId = that.bannerArrowEditor.find(".n-change-pagerstyle").attr("data-modalId");
            var pagerStyleEle = $("#" + mId).find(".u-col[data-role='" + paging.ArrowStyle + "']");
            $("#" + mId).find(".n-pagerstylepanel .u-colimg").removeClass("z-current");
            pagerStyleEle.find(".u-colimg").addClass("z-current");
            that.bannerArrowEditor.find(".u-font-algin-box[data-role='" + paging.PagerAlign + "']").addClass("current")
                .siblings().removeClass("current");
            that.bannerArrowEditor.find(".n-pager").find("img").attr("src", pagerStyleEle.find("img").attr("src"));
            if (paging.IsPaging == false || paging.IsPaging == "off" || paging.IsPaging == "false") {
                that.bannerArrowEditor.find(".m-switch-notxt").removeClass("checked");
            } 
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var bannerArrowEditor = this.bannerArrowEditor = this.element;
            this.element.attr("role", "bannerArrowEditor");
            var that = this;
            bannerArrowEditor.find(".xspinner").xspinner();
            bannerArrowEditor.find(".n-pagesize").lzsliding({
                valSelect: {
                    val: '.txt-num', unit: ''
                },
                openUnit: [true, ""],
                effect: function () {
                    var count = this.value()
                    that._buildCss("PageSize", count); // #ff0000
                }
            });
            bannerArrowEditor.find(".n-switch").switchEditor({
                widgetIds: "",
                widgetJQuery: that.bannerArrowEditor.find(".n-pager"),
                onSwitchOn: function () {
                    that.bannerArrowEditor.find(".m-switch-notxt").addClass("checked");
                    that._buildCss("IsPaging", true);
                },
                onSwitchOff: function () {
                    that.bannerArrowEditor.find(".m-switch-notxt").removeClass("checked");
                    that._buildCss("IsPaging", false);
                }
            });
            bannerArrowEditor.find(".x-pager").toggle(this.options.isPager);
            bannerArrowEditor.find(".x-goto").toggle(this.options.isGoto);
            bannerArrowEditor.find(".x-more").toggle(this.options.isMore);
            var mId = bannerArrowEditor.find(".n-change-pagerstyle").attr("data-modalId");
            $("#" + mId + ".x-pager-dialog-open").remove();
        },
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
            this._refresh();
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[tempKey] = value;
            this.value(cssData);
            var data = {
            };
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            //this._cssTarget().css(key, value);
        },
        _events: {
            //文字的位置
            "click .u-font-algin-box": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current").siblings().removeClass("current");
                var align = target.attr("data-role");
                if (target.hasClass("current")) {
                    this._buildCss("PagerAlign", align);
                }
            },
            "click .n-change-pagerstyle": function (event) {
                var target = $(event.currentTarget);
                var isInitial = target.attr("data-ok");
                var mId = target.attr("data-modalId");
                var that = this;
                if (isInitial) {
                    $("#" + mId).modal("show");
                } else {
                    $('#rightEditContainer').append($("#" + mId).modal("show").addClass("x-pager-dialog-open"));
                    $("#" + mId).find(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                    $("#" + mId).find(".u-col").click(function () {
                        $("#" + mId).find(".n-pagerstylepanel .u-colimg").removeClass("z-current");
                        $(this).find(".u-colimg").addClass("z-current");
                        var imgUrl = $(this).find("img").attr("src");
                        target.parent().find("img").attr("src", imgUrl);
                        that._buildCss("arrowStyle", $(this).attr("data-color"));
                    });
                    target.attr("data-ok", "true");
                }
            }
        },
        _destory: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            bannerArrow_modifier(this._value).call(this, newVal);
        },
        widget: function () {
            return this.bannerArrowEditor;
        }
    });
})(jQuery);

//pager控件
(function ($) {
    function pager_modifier(fn) {
        return function () {
            var previous = this.element.val();
            fn.apply(this, arguments);
            this._refresh();
            if (previous !== this.element.val()) {
                this._trigger("change", null, this.element);
            }
        };
    }
    $.widget("smart.pagerEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "pagerEditor",
        options: {
            isPager: true,
            isGoto: true,
            isMore: true,
            cssChange: null
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var paging = cssStr;
            var that = this;
            that.pagerEditor.find(".n-pagesize").lzsliding("value", paging.PageSize);
            that.pagerEditor.find(".n-switch").switchEditor("fillCss", paging.IsPaging);
            var mId = that.pagerEditor.find(".n-change-pagerstyle").attr("data-modalId");
            var pagerStyleEle = $("#" + mId).find(".u-col[data-role='" + paging.PagerStyle + "']");
            $("#" + mId).find(".n-pagerstylepanel .u-colimg").removeClass("z-current");
            pagerStyleEle.find(".u-colimg").addClass("z-current");
            that.pagerEditor.find(".n-pager").find("img").attr("src", pagerStyleEle.find("img").attr("src"));

            that.pagerEditor.find(".u-font-algin-box[data-role='" + paging.PagerAlign + "']").addClass("current")
                .siblings().removeClass("current");
            if (paging.IsPaging == false || paging.IsPaging == "off" || paging.IsPaging == "false") {
                that.pagerEditor.find(".m-switch-notxt").removeClass("checked");
            }
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var pagerEditor = this.pagerEditor = this.element;
            this.element.attr("role", "pagerEditor");
            var that = this;
            pagerEditor.find(".xspinner").xspinner();
            pagerEditor.find(".n-pagesize").lzsliding({
                valSelect: {
                    val: '.txt-num', unit: ''
                },
                openUnit: [true, ""],
                effect: function () {
                    var count = this.value()
                    that._buildCss("PageSize", count); // #ff0000
                }
            });
            pagerEditor.find(".n-switch").switchEditor({
                widgetIds: "",
                widgetJQuery: that.pagerEditor.find(".n-pager"),
                onSwitchOn: function () {
                    that.pagerEditor.find(".m-switch-notxt").addClass("checked");
                    that._buildCss("IsPaging", true);
                },
                onSwitchOff: function () {
                    that.pagerEditor.find(".m-switch-notxt").removeClass("checked");
                    that._buildCss("IsPaging", false);
                }
            });
            pagerEditor.find(".x-pager").toggle(this.options.isPager);
            pagerEditor.find(".x-goto").toggle(this.options.isGoto);
            pagerEditor.find(".x-more").toggle(this.options.isMore);
            var mId = pagerEditor.find(".n-change-pagerstyle").attr("data-modalId");
            $("#" + mId + ".x-pager-dialog-open").remove();
        },
        _value: function (value, allowAny) {
            $.data(this.element, "cssData", value);
            this._refresh();
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[tempKey] = value;
            this.value(cssData);
            var data = {
            };
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
            //this._cssTarget().css(key, value);
        },
        _events: {
            //文字的位置
            "click .u-font-algin-box": function (event) {
                var target = $(event.currentTarget);
                target.toggleClass("current").siblings().removeClass("current");
                var align = target.attr("data-role");
                if (target.hasClass("current")) {
                    this._buildCss("PagerAlign", align);
                }
            },
            "click .n-change-pagerstyle": function (event) {
                var target = $(event.currentTarget);
                var isInitial = target.attr("data-ok");
                var mId = target.attr("data-modalId");
                var that = this;
                if (isInitial) {
                    $("#" + mId).modal("show");
                } else {
                    $('#rightEditContainer').append($("#" + mId).modal("show").addClass("x-pager-dialog-open"));
                    $("#" + mId).find(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                    $("#" + mId).find(".u-col").click(function () {
                        $("#" + mId).find(".n-pagerstylepanel .u-colimg").removeClass("z-current");
                        $(this).find(".u-colimg").addClass("z-current");
                        var imgUrl = $(this).find("img").attr("src");
                        target.parent().find("img").attr("src", imgUrl);
                        that._buildCss("PagerColor", $(this).attr("data-color"));
                        that._buildCss("PagerStyle", $(this).attr("data-role"));
                    });
                    target.attr("data-ok", "true");
                }
            }
        },
        _destory: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (!arguments.length) {
                return this.element.val();
            }
            pager_modifier(this._value).call(this, newVal);
        },
        widget: function () {
            return this.pagerEditor;
        }
    });
})(jQuery);

//宽高控件
(function ($) {
    $.widget("smart.sizeEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "sizeEditor",
        options: {
            cssPrefix: "",
            cssVars: ["height", "width"],
            defaultValue: "auto",
            maxWidth: 1000,
            minWidth: 0,
            maxHeight: 1000,
            minHeight: 0,
            //宽度变化时触发
            onXChange: null,
            //高度变化时触发
            onYChange: null,
            cssChange: null,
            display: {
                "width": true,
                "height": true,
            }
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var sizeEditor = this.sizeEditor = this.element;
            if (!this._isInteger(this.options.maxWidth)) {
                this.options.maxWidth = null;
            }
            if (!this._isInteger(this.options.minWidth)) {
                this.options.minWidth = null;
            }
            if (!this._isInteger(this.options.maxHeight)) {
                this.options.maxHeight = null;
            }
            if (!this._isInteger(this.options.minHeight)) {
                this.options.minHeight = null;
            }
            var that = this;
            this.element.attr("role", "sizeEditor");
            sizeEditor.find(".x-size-width").find(".u-sliding")
                .attr("data-lzmin", this.options.minWidth)
                .attr("data-lzmax", this.options.maxWidth);
            sizeEditor.find(".x-size-width").lzsliding({
                valSelect: { val: ".x-width", unit: '' },
                openUnit: [true, ""],
                effect: function () {
                    var value = parseInt(this.value());
                    value = that._comValue(value, that.options.minWidth, that.options.maxWidth);
                    that.sizeEditor.find(".x-size-width").lzsliding("value", value);
                    var cssValue = that._getFormatCssValue(value);
                    that._buildCss(that.options.cssPrefix + "width", cssValue);
                    that._triggerWidthEvent(value);
                }
            });
            sizeEditor.find(".x-size-height").find(".u-sliding")
                .attr("data-lzmin", this.options.minHeight)
                .attr("data-lzmax", this.options.maxHeight);
            sizeEditor.find(".x-size-height").lzsliding({
                valSelect: { val: ".x-height", unit: '' },
                openUnit: [true, ""],
                effect: function () {
                    var value = parseInt(this.value());
                    value = that._comValue(value, that.options.minHeight, that.options.maxHeight);
                    that.sizeEditor.find(".x-size-height").lzsliding("value", value);
                    var cssValue = that._getFormatCssValue(value);
                    that._buildCss(that.options.cssPrefix + "height", cssValue);
                    that._triggerHeightEvent(value);
                }
            });
            var that = this;
            if (!this.options.display["width"]) {
                sizeEditor.find(".x-size-width").hide();
            }
            if (!this.options.display["height"]) {
                sizeEditor.find(".x-size-height").hide();
            }
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            var cssVars = this.options.cssVars;
            var validCss = {};
            var prefix = that.options.cssPrefix;
            var x, y;
            for (key in cssVars) {
                var keyWithOutPrefix = cssVars[key];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case "width":
                        value = that._getUnFormatCssValue(value);
                        value = that._comValue(value, that.options.minWidth, that.options.maxWidth);
                        that.sizeEditor.find(".x-size-width").lzsliding("value", value);
                        break;
                    case "height":
                        value = that._getUnFormatCssValue(value);
                        value = that._comValue(value, that.options.minHeight, that.options.maxHeight);
                        that.sizeEditor.find(".x-size-height").lzsliding("value", value);
                        break;
                }
            }
            $.data(this.element, "cssData", validCss);
        },
        _buildCss: function (key, value) {
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[key] = value;
            $.data(this.element, "cssData", cssData);
            var data = {
            };
            data.key = key;
            data.value = value;
            this._trigger("cssChange", null, data);
        },
        _events: {
            //"change input.x-width": function () {
            //    var value = this.sizeEditor.find('input.x-width').val();
            //    value = this._comValue(value, this.options.minWidth, this.options.maxWidth);
            //    var cssValue = this._getFormatCssValue(value);
            //    this.sizeEditor.find('input.x-width').val(value);
            //    this._buildCss(this.options.cssPrefix + "width", cssValue);
            //    this._triggerWidthEvent(value);
            //},
            //"change input.x-height": function () {
            //    var value = this.sizeEditor.find('input.x-height').val();
            //    value = this._comValue(value, this.options.minHeight, this.options.maxHeight);
            //    var cssValue = this._getFormatCssValue(value);
            //    this.sizeEditor.find('input.x-height').val(value);
            //    this._buildCss(this.options.cssPrefix + "height", cssValue);
            //    //高度改变事件
            //    this._triggerHeightEvent(value);
            //}
        },
        _comValue: function (value, min, max) {
            value = this._getUnFormatCssValue(value);
            if (max !== null && max < value) {
                value = max;
            } else if (min !== null && min > value) {
                value = min;
            }
            return value;
        },
        _triggerWidthEvent: function (value) {
            //宽度改变事件
            if (typeof (this.options.onXChange) == 'function') {
                this.options.onXChange(value);
            }
        },
        _triggerHeightEvent: function (value) {
            //宽度改变事件
            if (typeof (this.options.onYChange) == 'function') {
                this.options.onYChange(value);
            }
        },
        _getFormatCssValue: function (value) {
            if (value == "") {
                value = this.options.defaultValue;
            } else if ($.trim(value) != 'auto') {
                value = YibuTrimPx(value);
                if (value < 0) {
                    value = 0;
                }
                value += 'px';
            }
            return value;
        },
        _getUnFormatCssValue: function (value) {
            //if (value == this.options.defaultValue) {
            //    return "";
            //}
            value = YibuTrimPx(value);
            if (value < 0) {
                value = 0;
            }
            return value;
        },
        _isInteger: function (obj) {
            return typeof obj === 'number' && obj % 1 === 0;
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.sizeEditor;
        }
    });
})(jQuery);

//滑块控件
(function ($) {
    $.widget("smart.slidingEditor", {
        version: "1.0.0",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "slidingEditor",
        options: {
            cssPrefix: "",
            cssVars: [""],
            cssExt: "",
            onMouseUp: null,
            mouseDownTag: false,
            minVal: 0,
            maxVal: 20,
            cssChange: null
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._refresh();
            // if the page is unloaded before the widget is destroyed. #7790
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _refresh: function () {
            this.element.attr({
                // TODO: what should we do with values that can't be parsed?
                "aria-valuenow": this.element.val()
            });
        },
        _draw: function () {
            var slidingEditor = this.slidingEditor = this.element;
            this.element.attr("role", "slidingEditor");
            var that = this;

            var slidingSection = slidingEditor.find('section');
            slidingSection.attr('data-lzmin', this.options.minVal);
            slidingSection.attr('data-lzmax', this.options.maxVal);

            //滑块输入框的上下箭头点击事件
            function slidingArrow($sliding, successCallback) {
                var me = $sliding,
                    max = me.getData().max,
                    min = me.getData().min;
                $(me.ele).find('.input-arrow-up,.input-arrow-down').off().on('click', function (val) {
                    var $this = $(this),
                        $input = me.getInput();
                    val = me.filter($input);
                    if ($this.hasClass('input-arrow-up')) {
                        val < max ? val++ : max;
                        me.value(val);
                    } else {
                        val > min ? val-- : min;
                        me.value(val);
                    }
                    successCallback(val);
                })
            }

            var sliding = slidingEditor.find(".lz-sliding").lzsliding({
                valSelect: {
                    val: '.txt-num', unit: ''
                },
                openUnit: [true, that.options.cssExt],
                effect: function () {
                    var slidingThis = this;
                    $(that.options.cssVars).each(function (index, item) {
                        that._buildCss(item, slidingThis.value());
                        var val = sliding.filter(sliding.getInput());
                        if (typeof that.options.onMouseUp == "function") {
                            that.options.onMouseUp(val);
                        }
                    });
                }
            });

            slidingArrow(sliding, function (val) {
                $(that.options.cssVars).each(function (index, item) {
                    that._buildCss(item, val);
                    var value = sliding.filter(sliding.getInput());
                    if (typeof that.options.onMouseUp == "function") {
                        that.options.onMouseUp(value);
                    }
                });
            });
            slidingEditor.find(".u-sliding").mousedown(function () {
                that.options.mouseDownTag = true;
            });
            slidingEditor.find(".u-sliding-box").mouseleave(function () {
                var val = sliding.filter(sliding.getInput());
                if (typeof that.options.onMouseUp == "function" && that.options.mouseDownTag) {
                    that.options.onMouseUp(val);
                    that.options.mouseDownTag = false;
                }
            });
            slidingEditor.find(".u-sliding").mouseup(function () {
                var val = sliding.filter(sliding.getInput());
                if (typeof that.options.onMouseUp == "function") {
                    that.options.onMouseUp(val);
                }
            });
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var that = this;
            if (typeof cssStr == "string" || typeof cssStr == "number") {
                that.slidingEditor.find(".lz-sliding").lzsliding("value", YibuTrimPx(cssStr, this.options.cssExt));
            } // 样式
            else if (typeof cssStr == "object") {
                var cssVars = this.options.cssVars;
                var validCss = {
                };
                var prefix = that.options.cssPrefix;
                for (key in cssVars) {
                    var keyWithOutPrefix = cssVars[key];
                    var keyWithPrefix = prefix + keyWithOutPrefix;
                    var value = cssStr[keyWithPrefix];
                    if (value == null || typeof (value) === 'undefined') {
                        continue;
                    }

                    that.slidingEditor.find(".lz-sliding").lzsliding("value", YibuTrimPx(value, this.options.cssExt));
                    break;
                }
            }
        },
        _buildCss: function (key, value) {
            var tempKey = key;
            value = value + this.options.cssExt;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = $.data(this.element, "cssData");
            if (cssData == undefined) {
                cssData = {
                };
            }
            cssData[tempKey] = value;
            var data = {
            };
            data.key = tempKey;
            data.value = value;
            this._trigger("cssChange", null, data);
        },
        _events: {
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        widget: function () {
            return this.slidingEditor;
        }
    });
})(jQuery);

//滤镜控件
(function ($) {
    // 滤镜
    $.widget("smart.imageFilterEditor", {
        version: "1.10.3",
        defaultElement: "<input type='hidden'/>",
        widgetEventPrefix: "imageFilterEditor",
        options: {
            disabled: false,
            stitle: "",
            cssPrefix: "",
            titleName: "滤镜",
            cssVars: [
                'filter-preset',
                'filter-custom',
                'filter-layer',
                'brightness',
                'contrast',
                'saturation',
                'hue',
                'sharpen',
                'stackBlur',
                'layer-gradient-type',
                'layer-gradient-direction',
                'layer-color',
                'layer-start-color',
                'layer-last-color',
                'layer-opacity'
            ],
            // 
            filterPreset: [
                {
                    key: 'none',
                    name: '无'
                },
                {
                    key: 'common',
                    name: '通用色调'
                },
                 {
                    key: 'clarity',
                    name: '商务办公'
                },
                 {
                    key: 'hazyDays',
                    name: '人像摄影'
                },
                  {
                    key: 'concentrate',
                    name: '医药保健'
                },
                   {
                    key: 'oldBoot',
                    name: '科技网络'
                },
                   {
                    key: 'jarques',
                    name: '建筑设备'
                },
                   {
                    key: 'crossProcess',
                    name: '宠物林牧'
                },
                   {
                    key: 'herMajesty',
                    name: '美容护肤'
                },
                   {
                    key: 'sunrise',
                    name: '服装饰品'
                },
                    {
                    key: 'orangePeel',
                    name: '家居电器'
                },
                  {
                    key: 'love',
                    name: '广告传媒'
                },
                 {
                    key: 'lomo',
                    name: '风景旅游'
                },
                {
                    key: 'vintage',
                    name: '教育组织'
                },
               {
                    key: 'glowingSun',
                    name: '食物餐饮'
                },
                {
                    key: 'hemingway',
                    name: '货物物流'
                },
                 {
                    key: 'nostalgia',
                    name: '机械五金'
                },
                 {
                    key: 'pinhole',
                    name: '黑白灰调'
                }
                
            ],
            value: {
                '$filter-preset': 'none',
                '$filter-custom': 'off',
                '$filter-layer': 'off',
                '$brightness': 0,
                '$contrast': 0,
                '$saturation': 0,
                '$hue': 0,
                '$sharpen': 0,
                '$stackBlur': 0,
                '$layer-gradient-type': 'color',
                '$layer-gradient-direction': 'left',
                '$layer-color': 'transparent',
                '$layer-start-color': 'transparent',
                '$layer-last-color': 'transparent',
                '$layer-opacity': 100
            },
            display: {
                
            },
            cssChange: null
        },
        disable: function () {
            return this._setOption("disabled", true);
        },
        enable: function () {
            return this._setOption("disabled", false);
        },
        _create: function () {
            this._draw();
            this._on(this._events);
            this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete");
                }
            });
            this.refresh();
        },
        _draw: function () {
            var element = this.element;
            element.attr("role", "imageFilterEditor");
            //this.val(this.options.value);
            var that = this;
            this._drawPresetDom();
            // 自定义开关
            element.find(".setCustomFilter-switch").switchEditor({
             widgetIds: 'custom-filter-box',
             //开关的状态 on/off
             switchState: 'off',
             onSwitchOff: function () {
                 //element.find(".custom-filter-box").addClass('f-hide');
                 that._buildCss("filter-custom", 'off');
                 //that._buildCss('filter-preset', 'none');
            },
            onSwitchOn: function () {
                // element.find(".custom-filter-box").removeClass('f-hide');
                element.find('[filter-preset="none"]').click();
                that._buildCss("filter-custom", 'on');
            }
         });
            // 滤镜开关
            element.find(".setLayer-switch").switchEditor({
             widgetIds: 'layer-box',
             switchState: 'off',
             onSwitchOff: function () {
                 //element.find(".layer-box").addClass('f-hide');
                 that._buildCss("filter-layer", 'off');
            },
            onSwitchOn: function () {
                //element.find(".layer-box").removeClass('f-hide');
                that._buildCss("filter-layer", 'on');
            }
         });
            // 自定义滑块
            element.find("[filter-set]").each(function () {
                var $this = $(this);
                $this.lzsliding({
                    valSelect: {
                        val: '.txt-num', unit: ''
                    },
                    openUnit: [true, ""],
                    effect: function () {
                        var name = this.ele.attr('filter-set')
                        var value = parseInt(this.value());
                        that._buildCss(name, value); // #ff0000
                    }
                });
                $this.find('.input-arrow-up,.input-arrow-down').off().on('click', function (val) {
                    var sliding = $this[0].sliding;
                    var max = sliding.getData().max;
                    var min = sliding.getData().min;
                    $input = sliding.getInput();
                    val = sliding.valNum;
                    if ($(this).hasClass('input-arrow-up')) {
                        val < max ? val++ : max;
                        sliding.value(val);
                    } else {
                        val > min ? val-- : min;
                        sliding.value(val);
                    }
                    sliding.effect();
                })
            })

            // 蒙层透明度 滑块
            element.find("[layer-opacity]").lzsliding({
                    valSelect: {
                        val: '.txt-num', unit: '%'
                    },
                    openUnit: [true, "%"],
                    effect: function () {
                        var value = parseInt(this.value());
                        that._buildCss("layer-opacity", value); 
                    }
                }); 
           
            // 单色
            element.find(".layer-single-color").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                   var hex = color.alpha === 0 ? 'transparent' : color.toHexString();
                    that._buildCss("layer-color", hex); // #ff0000
                }
            });
            // 线性渐变色 开始色
            element.find(".layer-linear-color1").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    var hex = color.toRgbString();
                    //element.find(".layer-radial-color1").spectrum('set', hex)
                    that._buildCss("layer-start-color", hex);
                }
            });
            // 线性渐变色 结束色
            element.find(".layer-linear-color2").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    var hex = color.toRgbString();
                    //element.find(".layer-radial-color2").spectrum('set', hex)
                    that._buildCss("layer-last-color", hex);
                }
            });
            // 径向渐变色 开始色
            element.find(".layer-radial-color1").spectrum({
                allowEmpty: true,
                showInput: true,
                containerClassName: "full-spectrum",
                showInitial: true,
                showSelectionPalette: true,
                showAlpha: false,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                change: function (color) {
                    var hex = (color != null && color != "") ? color.toHexString() : "none"
                    //element.find(".layer-linear-color1").spectrum('set', hex)
                    that._buildCss("layer-start-color", hex);
                }
            });
            // 径向渐变色 结束色
            element.find(".layer-radial-color2").spectrum({
            allowEmpty: true,
            showInput: true,
            containerClassName: "full-spectrum",
            showInitial: true,
            showSelectionPalette: true,
            showAlpha: false,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",
            change: function (color) {
                var hex = (color != null && color != "") ? color.toHexString() : "none"
                //element.find(".layer-linear-color2").spectrum('set', hex)
                that._buildCss("layer-last-color", hex);
            }
        });
        },
        _drawPresetDom: function () {
            var filterPresetDomStr = '';
            $.each(this.options.filterPreset, function (i, item) {
                var current = item.key === 'none' ?  'current': ''
                var domArr = [];
                domArr.push('<dl class="animat-thumbnail-itme f-left ' + current  + '" filter-preset="' + item.key + '" filter-preset-mame="'+ item.name +'">');
                domArr.push('<dt class="square-box square-biggest">')
                domArr.push('<span class="square-box-content img-fill-icon img-fill-magnify">')
                domArr.push('<i class="icon '+ ('icon-'+item.key) +'"></i>')
                domArr.push('</span>')
                domArr.push(' </dt>')
                domArr.push('<dd class="thumbnail-txt">' + item.name + '</dd>')
                domArr.push('</dl>');
                filterPresetDomStr += domArr.join('');
            });
             this.element.find('.filter-preset_box').html(filterPresetDomStr)
        },
        _events: {
            //背景的形式，颜色还是背景图
            "click dl[filter-preset]": function (event) {
                var target = $(event.currentTarget);
                var preset =  target.attr('filter-preset')
                  target.addClass('current').siblings().removeClass('current');
                  this._buildCss('filter-preset', preset);
                if (preset !== 'none') {
                    this.element.find(".setCustomFilter-switch").switchEditor('fillCss', 'off');
                    this._buildCss("filter-custom", 'off');
                }
                
            },
            "click a[layer-gradient-type]": function (event) {
                var target = $(event.currentTarget);
                //if (target.attr('aria-expanded') == 'true') return;
                $(target.attr('tab-id')).tab('show');
                var gradientType = target.attr('layer-gradient-type');
                this._buildCss('layer-gradient-type', gradientType);
                this._clearColor();
            },
            "click #layer-gradient-direction li[data-role]": function (event) {
                var target = $(event.currentTarget);
                var role = target.attr('data-role');
                $('#layer-gradient-direction .showtext').text(target.find('a').text());
                this._buildCss('layer-gradient-direction', role);
            }
        },
        fillCss: function (cssStr, oldCssArr) {
            if (cssStr == null || typeof (cssStr) === 'undefined') {
                return;
            }
            var cssVars = this.options.cssVars;
            var validCss = {};
            var prefix = this.options.cssPrefix;
            for (var i = 0; i < cssVars.length; i++) {
                var keyWithOutPrefix = cssVars[i];
                var keyWithPrefix = prefix + keyWithOutPrefix;
                var value = cssStr[keyWithPrefix];
                validCss[keyWithPrefix] = value;
                if (value == null || typeof (value) === 'undefined') {
                    continue;
                }
                switch (keyWithOutPrefix) {
                    case 'filter-preset':
                        this.element.find('[filter-preset="' + value + '"]').addClass('current').siblings().removeClass('current');
                        break;
                    case 'filter-custom':
                        this.element.find(".setCustomFilter-switch").switchEditor('fillCss', value)
                        break;
                    case 'filter-layer':
                        this.element.find(".setLayer-switch").switchEditor('fillCss', value)
                        break;
                    case 'layer-gradient-type':
                        var typeDom = this.element.find("[layer-gradient-type='" + value + "']");
                        typeDom.parent().addClass('active').siblings().removeClass('active');
                        $(typeDom.attr('tab-id')).tab('show');
                        break;
                    case 'layer-gradient-direction':
                        $('#layer-gradient-direction .showtext').text(this.element.find('[data-role="' + value + '"]').find('a').text());
                        break;
                    case 'layer-color':
                        this.element.find(".layer-single-color").spectrum('set', value);
                        break;
                    case 'layer-start-color':
                        // 线性渐变色 开始色
                        this.element.find(".layer-linear-color1").spectrum('set', value);
                        // 径向渐变色 开始色
                        this.element.find(".layer-radial-color1").spectrum('set', value);
                        break;
                    case 'layer-last-color':
                        // 线性渐变色 结束色
                        this.element.find(".layer-linear-color2").spectrum('set', value);
                        // 径向渐变色 结束色
                        this.element.find(".layer-radial-color2").spectrum('set', value);
                        break;
                    case 'layer-opacity':
                        this.element.find("[layer-opacity]").lzsliding('value', value);
                        break;
                    default:
                        this.element.find("[filter-set='"+keyWithOutPrefix+"']").lzsliding('value', value);
                }
            }
            this.value(validCss);

            /**
            this._value(cssStr);
            this.element.find('[filter-preset="' + cssStr['$filter-preset'] + '"]').addClass('current').siblings().removeClass('current');  
            this.element.find(".setCustomFilter-switch").switchEditor('fillCss', cssStr['$filter-custom'])
            this.element.find(".setLayer-switch").switchEditor('fillCss', cssStr['$filter-layer'])
            this.element.find("[filter-set]").each(function () {
                var $this = $(this);
                $this.lzsliding('value', cssStr['$' + $this.attr("filter-set")])
            })

            $(this.element.find("[layer-gradient-type='" + cssStr['$layer-gradient-type'] + "']").attr('tab-id')).tab('show');

            $('#layer-gradient-direction .showtext').text(this.element.find('[data-role="'+ cssStr['$layer-gradient-direction'] +'"]').find('a').text());


            this.element.find(".layer-single-color").spectrum('set', cssStr['$layer-color']);
            // 线性渐变色 开始色
            this.element.find(".layer-linear-color1").spectrum('set', cssStr['$layer-start-color']);
            // 线性渐变色 结束色
            this.element.find(".layer-linear-color2").spectrum('set', cssStr['$layer-last-color']);
            // 径向渐变色 开始色
            this.element.find(".layer-radial-color1").spectrum('set', cssStr['$layer-start-color']);
            // 径向渐变色 结束色
            this.element.find(".layer-radial-color2").spectrum('set', cssStr['$layer-last-color']);
            this.element.find("[layer-opacity]").lzsliding('value', cssStr["$layer-opacity"])
            */
            
            //element.find("[filter-set]").lzsliding.setCurrentSize 
        },
        refresh: function () {
            this.fillCss(this.options.value);
        },
       
        // update the value without triggering change
        //_value: function (value) {
        //    $.data(this.element, "cssData", value);
        //    this._refresh();
        //},

        //_setOptions: background_modifier(function (options) {
        //    //this._super(options);
        //    //this._value(this.element.val());
        //}),

        _buildCss: function (key, value) {

            var tempKey = key;
            if (this.options.cssPrefix != null) {
                tempKey = this.options.cssPrefix + key;
            }
            var cssData = this.options.value;
            if (cssData == undefined) {
                cssData = {};
            }
            cssData[tempKey] = value;
            this.value(cssData);
            //var data = {};
            //data.key = tempKey;
            //data.value = value;
            //this._trigger("cssChange", null, cssData);
            //this.disable();

            clearTimeout(this._timer);
            var $this = this;
            this._timer = setTimeout(function () {
                $this._trigger("cssChange", null, cssData);
                $this.disable();
            }, 300)

            //this.refresh();
        },
        _clearColor: function () {
            var cssVars = this.options.cssPrefix;
            var value = this.options.value

            value[cssVars + 'layer-color'] = 'transparent';
            value[cssVars + 'layer-start-color'] = 'transparent';
            value[cssVars + 'layer-last-color'] =  'transparent'
            this.options.value = value
            this.refresh();
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        value: function (newVal) {
            if (newVal === undefined) {
                return this.options.value;
            }
            this.options.value = newVal;
        },
        widget: function () {
            return this.element;
        }
    });
})(jQuery);

/**
 * 页面ZIndex编辑器
 * @version 1.0.0
 * 
 * 页头内容区页脚 记录为[headerZIndex, bodyIndex, footerIndex]
 * 通过data-value的值split分割成数组
 * 
 */
(function ($) {
    $.widget("smart.pageZIndexEditor", {
        version: "1.0.0",
        widgetName: "pageZIndexEditor",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        // 组件的默认值
        defaultValue: {
            headerZIndex: 'auto',
            bodyIndex: 'auto',
            footerIndex: 'auto'
        },
        options: {
            //cssPrefix: "",//CSS变量的前缀，如果是悬停颜色设置等则需要加入Hover_作为前缀,
            display: {},
            value: {
                headerZIndex: 'auto',
                bodyIndex: 'auto',
                footerIndex: 'auto'
            },

            cssChange: null
        },

        _create: function () {
            this.element.attr("role", "pageZIndexEditor");
            this._on(this._events);
            this._refresh();
        },
        _destroy: function () {
            this.element.removeAttr("role");
        },
        _autoFormat: function (value) {
            if (!value || value === 'auto') {
                return '0'
            }
            if (value === '0') {
                return 'auto'
            }
            return value
        },
        _refresh: function () {
            // 刷新DOM
            var value = this.value();
            var data = [
                this._autoFormat(value.headerZIndex),
                this._autoFormat(value.bodyIndex),
                this._autoFormat(value.footerIndex)
            ];
            var selectData = data.join('');
            this.element.find('[data-value="' + selectData + '"]').siblingsSelect('current');
        },
        fillCss: function (cssStr) {
            if (!cssStr) {
                return;
            }

            var defaultValue = this.defaultValue;

            var validCss = {
                bodyIndex: cssStr["bodyIndex"] || defaultValue.bodyIndex,
                footerIndex: cssStr["footerIndex"] || defaultValue.bodyIndex,
                headerZIndex: cssStr["headerZIndex"] || defaultValue.bodyIndex,
            };
            this.value(validCss);
            this._refresh();
        },

        _buildCss: function (key, value) {
            this._trigger("cssChange", null, data);
        },

        _events: {
            //背景的形式，颜色还是背景图
            "click .animat-thumbnail-itme": function (event) {
                var data = $(event.currentTarget).attr('data-value');
                data = data.split('');
                this.fillCss({
                    headerZIndex: this._autoFormat(data[0]),
                    bodyIndex: this._autoFormat(data[1]),
                    footerIndex: this._autoFormat(data[2]),
                });

                this._trigger("cssChange", event, this.value());
            }
        },
        value: function (newVal) {
            if (newVal === undefined) {
                return this.options.value
            } else {
                this.options.value = newVal;
            }
        },
        widget: function () {
            return this.element;
        }
    });
})(jQuery);