(function ($) {
    var lzparallax = {

        name: '样式面板滑块',

        version: '0.0.3',

        author: 'lzx',

        date: '2017-09-22'
    }

    $.extend({
        isNumber: function (v) {
            return Object.prototype.toString.call(v) === "[object Number]";
        },
        isArray: function (v) {
            return Object.prototype.toString.call(v) === "[object Array]";
        },
        isString: function (v) {
            return Object.prototype.toString.call(v) === "[object String]";
        }
    });
    function layout(el, a) {
        this.ele = $(el);
        this.ele.data("_lzSave", a);
        this.effect = a.effect;
        this._setPv();
    }
    layout.prototype.lzfind = function (a) {
        return this.ele.find(a);
    };
    layout.prototype._setPv = function () {
        var studes = this.ele.data("_lzSave");
        this.select = [studes.ctrlSelect.box, studes.ctrlSelect.bar, studes.ctrlSelect.point];
        this.valSelect = [studes.valSelect.val, studes.valSelect.unit];
        this.wid = {
            bw: null,
            inw: null
        };
        if ($.isNumber(studes.fixed)) {
            this.fixed = Math.abs(studes.fixed | 0);
        } else {
            this.fixed = 0;
        }
        this.openUnit = [studes.openUnit[0], studes.openUnit[1]], this.valNum = 0;
    };
    layout.prototype.getData = function () {
        return this.val = {
            max: this.lzfind(this.select[0]).data("lzmax"),
            min: this.lzfind(this.select[0]).data("lzmin")
        };
    };
    layout.prototype.getAllSize = function () {
        this.wid.bw = this.lzfind(this.select[0]).width();
    };
    layout.prototype.getInput = function () {
        var me = this, $val = this.lzfind(me.valSelect[0]);
        if ($val.length == 0 || $val.get(0).tagName != "INPUT") {
            $val = $val.find("input");
            if ($val.length == 0) {
                $val = this.lzfind("input");
            }
        }
        return $val;
    };
    layout.prototype.setCurrentSize = function () {
        var me = this, currentSize = me.wid.inw / me.wid.bw * 100;
        me.lzfind(this.select[1]).css("width", currentSize + "%");
    };
    layout.prototype.getVal = function () {
        var me = this, val = ((me.val.max - me.val.min) * (me.wid.inw / me.wid.bw) + me.val.min).toFixed(me.fixed);
        if (me.fixed > 0) {
            isNaN(val) && (val = me.val.min.toFixed(me.fixed));
            valArr = val.match(/\d+\.\d+/g);
            for (var i in val) {
                val = val.replace(valArr[i], parseFloat(valArr[i]));
            }
        }
        me.ele.data("_lzValue", parseFloat(val));
        me.valNum = me.ele.data("_lzValue");
    };
    layout.prototype.value = function (a) {
        var me = this;
        if (a === undefined) {
            return me.ele.data("_lzValue");
        } else {
            var $val = me.getInput();
            $val.val(a);
            me.getPlace(a);
            me.setCurrentSize();
            me.setVal();
        }
    };
    layout.prototype.getUnit = function () {
        return this.openUnit[0] ? this.openUnit[1] : null;
    };
    layout.prototype.setVal = function () {
        var me = this, unit = me.getUnit();
        $val = me.getInput();
        me.getVal();
        $val.val(me.valNum + unit);
    };
    layout.prototype.drag = function () {
        var me = this, progressBox = me.lzfind(me.select[0]), progressBar = me.lzfind(me.select[1]), point = me.lzfind(me.select[2]);
        var flag = false;
        point.on("touchstart mousedown", function (e) {
            flag = true;
            me.getAllSize();
        });
        $(document).on("touchmove", function (e) {
            if (flag) {
                var touch = e.originalEvent.touches[0], move = touch.pageX - progressBox.offset().left;
                if (move < 0) {
                    move = 0;
                } else if (move > progressBox.width()) {
                    move = progressBox.width();
                }
                me.wid.inw = move / progressBox.width() * me.wid.bw;
                me.setCurrentSize();
                me.setVal();
                return me.effect();
            }
        });
        $(document).on("mousemove", function (e) {
            if (flag) {
                var move = e.pageX - progressBox.offset().left;
                if (move < 0) {
                    move = 0;
                } else if (move > progressBox.width()) {
                    move = progressBox.width();
                }
                me.wid.inw = move / progressBox.width() * me.wid.bw;
                me.setCurrentSize();
                me.setVal();
                return me.effect();
            }
        });
        $(document).on("touchend mouseup", function (e) {
            flag = false;
        });
    };
    layout.prototype.validation = function () {
        var regCN = new RegExp("。"), $val = this.getInput(), regNum = new RegExp("[^\\d\\.-]+"), currentVal;
        currentVal = $val.val();
        currentVal = currentVal.replace(regCN, ".");
        currentVal = currentVal.replace(regNum, "");
        var unit = this.getUnit();
        $val.val(currentVal + unit);
        return currentVal;
    };
    layout.prototype.filter = function ($this) {
        this.getAllSize();
        currentVal = this.validation();
        return currentVal;
    };
    layout.prototype.lzFocus = function () {
        var me = this, $val = me.getInput();
        $val.on("focus", function (currentVal) {
            var $this = $(this);
            me.filter($this);
            $this.on("keyup", function (e) {
                e.keyCode != 37 && e.keyCode != 39 && me.validation();
                e.keyCode == 13 && $val.blur();
            });
        });
    };
    layout.prototype.getPlace = function (currentVal) {
        var me = this;
        return me.wid.inw = me.wid.bw * ((currentVal - me.val.min) / (me.val.max - me.val.min));
    };
    layout.prototype.lzBlur = function () {
        var me = this, $val = me.getInput(), currentVal, unit;
        $val = me.getInput();
        $val.on("blur", function () {
            unit = me.getUnit();
            currentVal = me.filter();
            if (parseInt(currentVal) !== me.valNum) {
                if (currentVal !== '' && !isNaN(currentVal)) {
                    if (currentVal >= me.val.min && currentVal <= me.val.max) {
                        switch (true) {
                            case currentVal > me.val.max:
                                $val.val(me.val.max);
                                currentVal = me.val.max;
                                break;

                            case currentVal < me.val.min:
                                $val.val(me.val.min);
                                currentVal = me.val.min;
                                break;
                        }
                    } else {
                        currentVal = me.valNum;
                    }
                } else {
                    currentVal = me.valNum;
                }
                me.getPlace(currentVal);
                me.setCurrentSize();
                me.setVal();
                return me.effect();
            }
            return false;
        });
    };
    layout.prototype.on = function (str, fn) {
        var $me = this.ele, me = this;
        if (typeof fn === "function") {
            $.each($me, function (index, el) {
                str === "effect" && (me.effect = fn);
            });
        }
    };
    $.fn.lzslidingTool = function () {
        var me = this, sliding;
        $.each(me, function (index, el) {
            sliding = el.sliding;
            console.log(index);
            console.log(sliding);
        });
    };
    $.fn.lzsliding = function (opts) {
        if (typeof opts == "string") {
            var returnValue = this;
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var sliding = $(this)[0].sliding;
                if (sliding) {
                    switch (opts) {
                        case "value":
                            if (args.length > 0) {
                                returnValue = sliding.value(args);
                            } else {
                                returnValue = sliding.value();
                            }
                            break;
                    }
                }
            });
            return returnValue;
        }
        var defaultOpt = {
            ctrlSelect: {
                box: ".u-sliding",
                bar: ".u-sliding-inner",
                point: ".u-sliding-bar"
            },
            valSelect: {
                val: ".txt-num",
                unit: ""
            },
            fixed: 0,
            openUnit: [true, ""],
            effect: function () { }
        };
        var options = $.extend(defaultOpt, opts || {});
        var me = $(this), sliding;
        $.each(me, function (index, el) {
            el.sliding = new layout(el, options);
            sliding = el.sliding;
            el.sliding.getInput();
            el.sliding.getData();
            el.sliding.drag();
            el.sliding.lzFocus();
            el.sliding.lzBlur();
            el.sliding.getAllSize();
        });
        return sliding;
    };
})(jQuery);