; (function ($) {

    var status = {

        cx: null, //元素距离窗口左侧的距离

        cy: null, //元素距离窗口顶部的距离

        cw: null, //元素的宽度

        ch: null, //元素的高度

        pw: null, //提示框的宽度

        ph: null, //提示框的高度

        ww: null, //窗口的宽度

        wh: null, //窗口的高度

        prompt: null, //提示框元素

        arr: [], //提示框的相关数据

        timer: false, //计时器

        elem: null, //当前执行的元素

        stamp: 1

    }

    var param = {

        speed: 200,  //动画执行的时间

        context: '', //上下文

        pos: 15, //动画前到元素的距离

        dis: 10 //移动的距离

    }

    // 初始化param中的参数

    function initParam(a) {

        param = $.extend({}, param, a);

        isNaN(param.speed) && (param.speed = 200);

        isNaN(param.pos) && (param.pos = 15);

        isNaN(param.dis) && (param.dis = 10);

        !$(param.context).length && (param.context = 'body');

    }

    // 初始化status中的参数

    function initStatus(val) {

        var me = $(val);
        status.cx = me.offset().left - $(window).scrollLeft();
        status.cy = me.offset().top - $(window).scrollTop();



        status.cw = me.outerWidth();

        status.ch = me.outerHeight();

        status.pw = status.prompt.outerWidth();

        status.ph = status.prompt.outerHeight();

        status.ww = $(window).width();

        status.wh = $(window).height();

    }

    // 判断是否要更改方向

    function changeDir(val) {

        var me = $(val),

            flag = true;

        // 当元素的位置减去提示框的宽高大于50(此数可以更改)

        (me.hasClass('lzprompt-top') && status.cy < status.ph + 50) && (flag = false);

        (me.hasClass('lzprompt-left') && status.cx < status.pw + 50) && (flag = false);

        (me.hasClass('lzprompt-bottom') && status.wh - status.cy - status.ch < status.ph + 50) && (flag = false);

        (me.hasClass('lzprompt-right') && status.ww - status.cx - status.cw < status.pw + 50) && (flag = false);

        return promptCal(me, flag);

    }

    // 判断需要进行那个方向的计算

    function promptCal(val, flag) {

        var me = $(val),

            str = null;

        if (!flag) {

            me.hasClass('lzprompt-top') && (str = 'bottom');

            me.hasClass('lzprompt-left') && (str = 'right');

            me.hasClass('lzprompt-bottom') && (str = 'top');

            me.hasClass('lzprompt-right') && (str = 'left');

        } else {

            me.hasClass('lzprompt-top') && (str = 'top');

            me.hasClass('lzprompt-left') && (str = 'left');

            me.hasClass('lzprompt-bottom') && (str = 'bottom');

            me.hasClass('lzprompt-right') && (str = 'right');

        }

        return paramCal(str);

    }

    // 或得相关计算数据

    function paramCal(dir) {

        var x, //提示框距离窗口左边的距离

            y, //提示框距离窗口顶部的距离

            k, //区别上下或者左右

            t, //区别上下和左右

            arr,

            pos = param.pos;

        if (dir === 'top') {
           
            x = status.cw / 2 - status.pw / 2;

            y = -status.ph - pos - 8;

            k = 1;

            t = true;

        } else if (dir === 'bottom') {
            x = status.cw / 2 - status.pw / 2;

            y = status.ch + pos + 8;

            k = -1;

            t = true;

        } else if (dir === 'left') {

            x = -status.pw - pos - 8;

            y = status.ch / 2 - status.ph / 2;

            k = 1;

            t = false;

        } else if (dir == 'right') {

            x = status.cw + pos + 8;

            y = status.ch / 2 - status.ph / 2;

            k = -1;

            t = false;

        }

        x = x + status.cx;

        y = y + status.cy;

        arr = [x, y, k, t, dir];

        return fixCal(arr);

    }

    // 根据窗体适当修改提示框位置以避免溢出浏览器

    function fixCal(arr) {

        var k;

        (arr[0] < 5) && (arr[0] = 5);

        (arr[0] > status.ww - status.pw - 5) && (arr[0] = status.ww - status.pw - 5);

        (arr[1] < 5) && (arr[1] = 5);

        (arr[1] > status.wh - status.ph - 5) && (arr[1] = status.wh - status.ph - 5);

        // 计算箭头位置

        if (arr[3]) {

            k = status.cx + status.cw / 2 - arr[0];

        } else {

            k = status.cy + status.ch / 2 - arr[1];

        }

        arr.push(k);

        return arr;

    }

    // 将相关数据打包成对象形式以传给css和animate

    function makeObj(arr, i, o) {

        var move = [],

            dis = param.dis;

        move.push({ left: arr[0], top: arr[1] });

        arr[3] === true ? (move.push({ opacity: o, top: arr[1] + arr[2] * dis * i })) : (move.push({ opacity: o, left: arr[0] + arr[2] * dis * i }));

        move.push('lzprompt-point-' + arr[4]);

        arr[3] === true ? (move.push({ left: arr[5], top: '' })) : (move.push({ top: arr[5], left: '' }));

        return move;

    }

    // 获取参数

    function getArr(val) {

        return changeDir(val);

    }

    $.lzprompt = function (a) {

        var inner = '<div id="lzprompt-plan"><span id="lzprompt-txt"></span><span id="lzprompt-point"></span></div>';

        $('#lzprompt-plan').length === 0 && $('body').append(inner);

        status.prompt = $('#lzprompt-plan');

        initParam(a);

        $(param.context).off('mouseenter.lzprompt').on('mouseenter.lzprompt', '.lzprompt-top,.lzprompt-bottom,.lzprompt-left,.lzprompt-right',function () {

            if ($(this).hasClass('lz-stop')) return false;

            var me = $(this),

                prompt = status.prompt;

            clearTimeout(status.timer);

            status.timer = null;

            if (me.data('lzprompt-stamp') == status.stamp) return false;

            status.stamp = new Date().getTime();

            me.data('lzprompt-stamp', status.stamp);

            status.elem = me;

            prompt.show().find('#lzprompt-txt').html(me.data('lztitle'));

            initStatus(me);

            status.arr = getArr(me);

            var move = makeObj(status.arr, 1, 1);

            $('#lzprompt-point').removeClass().addClass(move[2]);

            move[3] && $('#lzprompt-point').css(move[3]);

            prompt.css(move[0]).stop().animate(move[1], param.speed);

        }).off('mouseleave.lzprompt').on('mouseleave.lzprompt', '.lzprompt-top,.lzprompt-bottom,.lzprompt-left,.lzprompt-right',function () {

            if ($(this).hasClass('lz-stop')) return false;

            var me = $(this),

                prompt = status.prompt,

                move = makeObj(status.arr, 2, 0);

            status.timer = setTimeout(function () {

                clearTimeout(status.timer);

                status.timer = null;

                status.stamp = 1;

                prompt.stop().animate(move[1], param.speed, function () {

                    prompt.css('display', 'none');

                });

            }, 100)

            }).off('mousedown.lzprompt').on('mousedown.lzprompt', '.lzprompt-top,.lzprompt-bottom,.lzprompt-left,.lzprompt-right',function () {

                $(this).hasClass('lz-hidden') && (status.prompt.hide(), $(this).addClass('lz-stop'), status.$target = $(this));

        }).off('mouseup.lzprompt').on('mouseup.lzprompt', function () {
            status.$target && (status.$target.hasClass('lz-hidden') && status.$target.removeClass('lz-stop'));

        });

        $(status.prompt).off('mouseenter.lzprompt').on('mouseenter.lzprompt', function () {

            clearTimeout(status.timer);

            status.timer = null;

        }).off('mouseleave.lzprompt').on('mouseleave.lzprompt', function () {

            var me = status.elem,

                prompt = status.prompt,

                move = makeObj(status.arr, 2, 0);

            status.timer = setTimeout(function () {

                clearTimeout(status.timer);

                status.timer = null;

                status.stamp = 1;

                prompt.stop().animate(move[1], param.speed, function () {

                    prompt.css('display', 'none');

                });

            }, 100)

        });

    }

})(jQuery)