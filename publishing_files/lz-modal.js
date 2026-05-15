+function (factory) {
    "use strict";
    if (typeof define === 'function') {
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module !== null) {
        module.exports = factory(jQuery);
    } else {
        factory(jQuery);
    }

}(function ($) {
    "use strict";
    var lzmodal = {

        version: '0.11.0',

        author: 'lzx',

        date: '2018-12-13'
    }

    $.extend({

        isObject: function (v) {
            return Object.prototype.toString.call(v) === '[object Object]';
        },

        isFunction: function (v) {
            return Object.prototype.toString.call(v) === '[object Function]';
        },

        isString: function (v) {
            return Object.prototype.toString.call(v) === '[object String]';
        },

        isNumber: function (v) {
            return Object.prototype.toString.call(v) === '[object Number]';
        }

    });


    var modalEvent = function (val) {
        var me = this;
        me.$ele = $(val);
        me.modalMethods = me.$ele.data('modalMethods');
        me.modalInit = me.$ele.data('modalInit');
        me.param = me.$ele.data('lzmodal-param');
        me.status = me.$ele.data('lzmodal-status');
        me.$ele.data('modalEvent', me);
    }

    modalEvent.prototype = {

        constructor: modalEvent,

        setEvent: function () {
            var event = this;
            $.each(event.param.event, function (index, val) {
                event[val] && event[val]();
            })
        },

        // 点击
        clickClose: function () {
            var me = this;
            var $self = me.modalInit.$self;
            $self.find('.lz-close,.close-btn,.lz-mask').on('click', function () {
                me.modalMethods._close(me.param.closeCallback || me.modalMethods._closeCallback);
            })
        },
        clickSubmit: function () {
            var me = this;
            var $self = me.modalInit.$self;
            $self.find('.submit-btn').on('click', function (event) {
                me.modalMethods._close(me.param.submitCallback || me.modalMethods._submitCallback);
            });
        }

    }

    // 方法集
    var modalMethods = function (val) {
        var me = this;
        me.$ele = $(val);
        me.param = me.$ele.data('lzmodal-param');
        me.status = me.$ele.data('lzmodal-status');
        me.modalInit = me.$ele.data('modalInit');
        me.$ele.data('modalMethods', me);
    }

    modalMethods.prototype = {

        constructor: modalMethods,

        // 关闭
        _close: function (fn) {
            var me = this;
            var $self = me.modalInit.$self;
            var param = me.param;
            !$.isFunction(fn) && (fn = function () { });

            if (fn() !== false) {
                clearInterval(me.tim);
                me.flag = false; // 避免回调执行两次
                me.tim = '';
                $self.fadeOut(300);
                $self.find('.lz-dialog').stop().animate({ top: param['full-height'] ? param.top : -100 }, 300);
            }

        },

        // 开启
        _open: function (fn) {
            var me = this;
            var $self = me.modalInit.$self;
            var param = me.param;
            fn = me._setTime();
            !$.isFunction(fn) && (fn = function () { });
            $self.find('.lz-dialog').data('timingMe', me);
            //$self.hide().fadeIn(300, fn);
            $self.fadeIn(300, fn);
            $self.find('.lz-dialog').css('top', param['full-height'] ? param.top : -100).stop().animate({ top: param.top ? param.top : '50%' }, 300, fn);
        },
        _setTime: function (fn) {
            var me = this;
            var $self = me.modalInit.$self;
            var param = me.param;
            if (!param['close-timing'] && param['submit-timing']) {
                $self.find('.submit-btn-time').html(' (' + param['submit-timing'] + 's)');
            } else if (!param['submit-timing'] && param['close-timing']) {
                $self.find('.close-btn-time').html(' (' + param['close-timing'] + 's)');
            } else {
                $self.find('.submit-btn-time').html('');
                $self.find('.close-btn-time').html('');
            }
            if (param['close-timing'] || param['submit-timing']) {
                return me._timing;
            }
        },
        _timing: function (me) {
            !me && (me = $(this).data('timingMe') || $(this).find('.lz-dialog').data('timingMe'));
            if (!me.flag) {
                me.flag = true;
                return false;
            }
            var closeTiming = me.param['close-timing'];
            var submitTiming = me.param['submit-timing'];
            var $self = me.modalInit.$self;
            me.tim = setInterval(function () {
                if (closeTiming && submitTiming) {
                    return false;
                } else if (closeTiming) {
                    closeTiming--;
                    $self.find('.close-btn-time').html(' (' + closeTiming + 's)');
                    if (closeTiming == 0) {
                        me._close(me.param._closeCallback || me._closeCallback);
                        $self.find('.close-btn-time').html('');
                        clearInterval(me.tim);
                    }
                } else if (submitTiming) {
                    submitTiming--;
                    $self.find('.submit-btn-time').html(' (' + submitTiming + 's)');
                    if (submitTiming == 0) {
                        me._close(me.param._submitCallback || me._submitCallback);
                        $self.find('.submit-btn-time').html('');
                        clearInterval(me.tim);
                    }
                }
            }, 1000);
        },
        _doingTiming: function () {
            var me = this;
            me.flag = true;
            var fn = me._setTime();
            $.isFunction(fn) && fn(me);
        }
    }

    // 初始化

    var modalInit = function (val, a) {
        var me = this;
        me.$ele = $(val);
        me.$ele.data('lzmodal-param', me._initParam(a));
        me.$ele.data('lzmodal-status', {});
        me.$ele.data('modalInit', me);
    }

    modalInit.prototype = {

        constructor: modalInit,

        defaults: {
            'title': '',
            'icon': '',
            'content': '',
            'top': '',
            'content-width': '416px',
            'content-height': '',
            'footer-align': 'right',
            'header-border': true,
            'x-padding': '',
            'header-padding': true,
            'footer-border': true,
            'footer-padding': true,
            'radius-btn': true,
            'full-height': false,
            'scroll': false,
            'no-submit': false,
            'no-cancel': false,
            'no-footer': false,
            'no-header': false,
            'submit-link': '',
            'submit-timing': '',
            'close-timing': '',
            'z-index':'1040',
            'event': ['clickClose', 'clickSubmit'],
        },

        // 初始化参数
        _initParam: function (a) {

            var param = this.defaults;

            if ($.isObject(a)) {
                param = $.extend(true, {}, param, a);
            }
            return param;
        },

        // 初始化版式
        _layout: function () {
            var me = this;
            var param = me.$ele.data('lzmodal-param');
            var status = me.$ele.data('lzmodal-status');

            var id = me.$ele.attr('id');
            var modalId = id + 'Dialog';

            var modalClass = me.$ele.attr('class');

            !modalClass && (modalClass = '');

            me.$ele.attr('class', '');

            var dialogTitle = $('#' + id).find('.dialog-title').html();
            var dialogBody = $('#' + id).find('.dialog-body').html();

            var iconShow = !param.icon ? 'none' : '';

            var footerAlign = param['footer-align'] || 'right';
            var closeBtn = param['close-btn'] || '取消';
            var submitBtn = param['submit-btn'] || '确定';

            var headerNoBorder = !param['header-border'] ? 'no-header-border' : '';
            var bottomNoBorder = !param['footer-border'] ? 'no-footer-border' : '';

            var radiusBtn = param['radius-btn'] ? "border-radius:18px" : "";

            var headerPadding = param['header-padding'] === true ? "" : $.isString(param['header-padding']) ? param['header-padding'] : 0;
            var footerPadding = param['footer-padding'] === true ? "" : $.isString(param['footer-padding']) ? param['footer-padding'] : 0;

            var noclose = param['no-close'] ? 'none' : '';
            var nosubmit = param['no-submit'] ? 'none' : '';
            var nocancel = param['no-cancel'] ? 'none' : '';
            var noheader = param['no-header'] ? 'none' : '';
            var nofooter = param['no-footer'] ? 'none' : '';

            var submitLink = param['submit-link'] ? param['submit-link'] : 'javascript:void(0)'
            var submitLink = param['submit-link'] ? param['submit-link'] : ''

            if (param['full-height']) {
                if (!param.top) {
                    param.top = '50px'
                }
                param.bottom = param.top;
                param['content-height'] = "calc(100% - 100px)";
            }

            var modl =
                '<div id="' + modalId + '" class="lz-modal ' + modalClass + '" style="z-index:' + param['z-index']+'">' +
                '<div class="lz-dialog" style="margin-left:' + -parseInt(param['content-width']) / 2 + 'px; top:' + param.top + ';bottom:' + param.bottom + '">' +
                '<div class="lzdialog-header f-clearfix ' + headerNoBorder + '" style="display:' + noheader + '">' +
                '<div class="f-right lz-close-box" style="display:' + noclose + '">' +
                '<i class="lz-close"></i>' +
                '</div>' +
                '<div class="lzdialog-title f-block">' + param.title + '</div>' +
                '</div>' +
                '<div class="lzdialog-body lzdialog-scroll" style="width:' + param['content-width'] + '; height:' + param['content-height'] + ';padding-bottom:' + footerPadding + ';padding-top:' + headerPadding + ';padding-left:' + param['x-padding'] + ';padding-right:' + param['x-padding'] + ';">' +
                '<div class="lzdialog-body-inner">' +
                '<div class="f-clearfix" style="padding-left:34px;padding-right:34px;">' +
                '<i class="icon f-left ' + param.icon + '" style="width:34px;height:34px;margin-right:10px;display:' + iconShow + '"></i>' +
                '<span class="f-block" style="padding-top:5px; line-height: 24px;">' + param.content + '</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="lzdialog-footer' + bottomNoBorder + '" style="display:' + nofooter + '">' +
                '<div style="text-align:' + footerAlign + '">' +
                '<button class="lz-btn close-btn" style="' + radiusBtn + ';display:' + nocancel + ';"><span class="close-btn-text">' + closeBtn + '</span><span class="close-btn-time"></span></button>' +
            '<button class="lz-btn submit-btn" style="' + radiusBtn + ';display:' + nosubmit + '"><a ' + (submitLink ? ('href="' + submitLink + '" target="newPage"') : '') + '><span class="submit-btn-text">' + submitBtn + '</span><span class="submit-btn-time"></span></a></button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            $('body').append(modl);

            var $mask = me.$ele;
            me.$self = $('#' + modalId);

            dialogTitle && me.$self.find('.lzdialog-header .lzdialog-title').html(dialogTitle);
            dialogBody && me.$self.find('.lzdialog-body .lzdialog-body-inner').html(dialogBody);

            if (!param['content-height']) {
                param['content-height'] = $('#' + modalId).find('.lzdialog-body').outerHeight();
            }

            var marginTopVal = param.top ? 0 : -(parseInt(param['content-height']) + 102) / 2;
            me.$self.find('.lz-dialog').css('marginTop', marginTopVal + 'px');

            param.scroll && me.$self.find('.lzdialog-scroll').lzscroll({ mode: 'hover' });

            me.$ele.find('.dialog-title,.dialog-body').remove();
            me.$self.hide().css('visibility', 'visible');
            me.$self.append($mask.addClass('lz-mask').show());

        },

        // 初始化事件
        _initEvent: function () {
            var me = this.$ele,
                param = me.data('lzmodal-param'),
                status = me.data('lzmodal-status'),
                event = new modalEvent(me);
            event.setEvent();
        },

        _init: function () {
            var self = this.$ele.get(0);
            this._layout();
            self.modalMethods = new modalMethods(self);
            this._initEvent();
        }

    }

    var tool = function (val) {
        var me = this;
        me.$ele = $(val);
        me.param = me.$ele.data('lzmodal-param');
        me.modalMethods = me.$ele.data('modalMethods');
        me.modalInit = me.$ele.data('modalInit');
        me.$ele.data('tool', me);
    }

    tool.prototype = {

        constructor: tool,

        show: function (fn) {
            this.modalMethods._open(fn)
        },

        hide: function (fn) {
            this.modalMethods._close(fn)
        },

        onClose: function (fn) {
            this.modalMethods._closeCallback = fn;
        },

        onSubmit: function (fn) {
            this.modalMethods._submitCallback = fn;
        },

        setModal: function (obj) {
            var me = this;
            var $self = me.modalInit.$self;
            if ($.isObject(obj)) {
                obj['title'] && $self.find('.lzdialog-title').html(obj.title);
                obj['content'] && $self.find('.lzdialog-body-inner').html(obj.content);
                obj['cancel-btn'] && $self.find('.close-btn-text').html(obj['cancel-btn']);
                obj['submit-btn'] && $self.find('.submit-btn-text').html(obj['submit-btn']);
                obj['submit-link'] && $self.find('.submit-btn a').attr({
                    'href': obj['submit-link'],
                    'target': 'newPage'
                });
                obj['no-header'] ? $self.find('.lzdialog-header').hide() : $self.find('.lzdialog-header').show();
                obj['no-footer'] ? $self.find('.lzdialog-footer').hide() : $self.find('.lzdialog-footer').show();
                obj['no-cancel'] ? $self.find('.close-btn').hide() : $self.find('.close-btn').show();
                obj['no-submit'] ? $self.find('.submit-btn').hide() : $self.find('.submit-btn').show();
                obj['no-close'] ? $self.find('.lz-close-box').hide() : $self.find('.lz-close-box').show();
                obj['no-event'] && $self.find('.lz-close,.close-btn,.lz-mask,.submit-btn').off('click');
                $.isNumber(obj['submit-timing']) && (me.param['submit-timing'] = obj['submit-timing']);
                $.isNumber(obj['close-timing']) && (me.param['close-timing'] = obj['close-timing']);
                $self.css('display') == 'block' && this.modalMethods._doingTiming()
            }

        }
    }

    // 插件入口
    $.fn.lzmodal = function (option, status) {
        return $.each(this, function (index, val) {
            var newModal = $(val).data('lzmodal');
            if (!newModal) {
                $.isObject(option) && (status = option);
                newModal = new modalInit(val, option, status)
                $(val).data('lzmodal', newModal);
            }

            if ($.isObject(option) && !newModal.status) {
                newModal.status = true;
                newModal._init(option);
            } else if ($.isString(option)) {
                var initTool = $(val).data('lzmodalTool');
                if (!initTool) {
                    initTool = new tool(val);
                    $(val).data('lzmodalTool', initTool);
                }
                !!initTool[option] && initTool[option](status);
            }
        });

        return tool;
    }
});