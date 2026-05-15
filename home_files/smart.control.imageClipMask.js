
// 上传图片
function uploadClipPic(_lasterImageData, fn, err, $img) {
    $.ajax({
        cache: false,
        url: "/admin/Picture/PastePictureUploadBase64",
        data: {
            base64img: _lasterImageData,
        },
        type: "post",
        success: function (data) {
            fn && fn(data);
        },
        error: function (f) {
            err && err(f);
        }
    });
}

/**
 * node: 返回 mouse || touch 的坐标
 * @param e {mouseEvent} 事件参数
**/
function getPageOptions(e) {
    return {
        pageX: (e.touches ? e.touches[0].pageX : e.pageX) || 0,
        pageY: (e.touches ? e.touches[0].pageY : e.pageY) || 0
    };
};

function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    };
    return c;
}


var oMaskClipTool = {};
var clipImageFactory = (function () {
    function F(configs) {
        this.opts = {
            target: "",
            imgUrl: "",
            controlID: "",
            fillType: '',
            deviceType: '',
            parent:null
        };
        for (var x in configs) {
            this.opts[x] = configs[x]
        };

        this.dataInit();
    };
    F.prototype.created = function () {
        this.createHTML();
        this.tagVisible(false);
        this.visible(true);
        this.toStage();
        //var $controlData = JSON.parse($("#data_" + _this.opts.controlID).text());
        //$controlData.Data.ClipPictureData = _this.clipMaskPopWrap.prop('outerHTML');
    };
    // 创建弹层
    F.prototype.createHTML = function (_sourceImage) {
        //var controlID = this.opts.controlID;
        var target = this.opts.target;
        var imgurl = this.opts.imgUrl;
        var fillType = this.opts.fillType;
        var controlSourceIdTransform = $('#' + this.opts.controlID).css('transform');
        var progressLaneOptions = this.progressLaneOptions;
        var $imgContainer = $('#' + this.opts.controlID + ' .image-clip-wrap');
        var $borderWidth = parseFloat($imgContainer.css('borderTopWidth')) || 0;
        var $border = $imgContainer.css('borderTopWidth') + ' ' + $imgContainer.css('borderTopStyle') + ' ' + $imgContainer.css('borderTopColor');
        var $boxShadow = $imgContainer.css('boxShadow');
        var $borderRadius = $imgContainer.css('borderTopLeftRadius');
        var $img = $('#img_' + this.opts.controlID);

        var imgw = $img.width();
        var imgh = $img.height();
        var imgTop = parseFloat($img.css('marginTop'));
        var imgLeft = parseFloat($img.css('marginLeft'));
        
        var tagw = target.width();
        var tagh = target.height();
        var tagTop = target.css('top');
        var tagLeft = target.css('left');
        var tagx = target.offset().left;
        var tagy = target.offset().top;
        //console.log(parseInt($imgContainer.parent().css('marginLeft')), 'marginleft', '$borderWidth', $borderWidth, '$border', $border, '$borderRadius', $borderRadius);
        var imgViewY = imgTop;
        //var imgViewY = fillType === 'pullFill' ? 0 : parseInt($imgContainer.parent().css('marginLeft'))//tagh - imgh) / 2;
        var imgViewX = imgLeft;
        //var imgViewX = fillType === 'pullFill' ? 0 : parseInt($imgContainer.parent().css('marginLeft'))//(tagw - imgw) / 2;
        var maskw = imgw; // fillType === 'pullFill' ? (imgw + 2 * $borderWidth) : imgw;
        var maskh = imgh;//fillType === 'pullFill' ? (imgh + 2 * $borderWidth) : imgh;

        var masky = imgViewY + $borderWidth;
        var maskx = imgViewX + $borderWidth;

        // 拉伸模式下 图片拉伸新增逻辑
        //imgw = fillType === 'pullFill' ? maskw : imgw;
        //imgh = fillType === 'pullFill' ? maskh : imgh;
        //imgTop = fillType === 'pullFill' ? masky : imgTop;
        //imgLeft = fillType === 'pullFill' ? maskx : imgLeft;

        var pbarx = '0';

        //var $controlData = JSON.parse($("#data_" + this.opts.controlID).text());
        //var decodeJSON = decodeURIComponent($controlData.Data.ClipPictureData); // decodeURIComponent();
        //if (typeof decodeJSON === "string" && !!decodeJSON) {
        //    decodeJSON = JSON.parse(decodeJSON);
        //};
        ////if (!!decodeJSON) {
            //console.log('hasss')
            //imgw = decodeJSON.maskw;
            //imgh = decodeJSON.maskh;
            //imgViewY = imgTop;//decodeJSON.masky;
            //imgViewX = imgLeft;//decodeJSON.maskx;
            ////debugger
            //maskw = decodeJSON.maskw;
            //maskh = decodeJSON.maskh;
            //maskx = imgViewX + $borderWidth;
            //masky = imgViewY + $borderWidth;

            //this.scaleValue = Math.max(imgh / tagh, imgw / tagw, 1);//decodeJSON.scale || 1;
            //pbarx = Math.min(130 * (this.scaleValue - 1) / 2,130);
            //progressLaneOptions.left = pbarx;

        ////};
        //var tagImg = target.find("#img_" + controlID);
        this.scaleValue = Math.max(imgh / tagh, imgw / tagw, 1);//decodeJSON.scale || 1;
        pbarx = Math.min(130 * (this.scaleValue - 1) / 2, 130);
        progressLaneOptions.left = pbarx;
        this.borderWidth = $borderWidth;

        var _htmlString = [
            '<div class="clipMaskPopWrap" style="z-index:10000;width:' + tagw + 'px;height:' + tagh + 'px;top:' + tagy + 'px;left:' + tagx + 'px;visibility:hidden;" id="img_clipMask_PopWrapper">',
            '<div class="clip_pa incScreen clipMask maskBoxID clipHandles" style="width:' + maskw + 'px;height:' + maskh + 'px;top:' + masky + 'px;left:' + maskx + 'px;">',
            '<i dir="tl" class="clip_pa handles tl"></i>',
            '<i dir="tr" class="clip_pa handles tr"></i>',
            '<i dir="bl" class="clip_pa handles bl"></i>',
            '<i dir="br" class="clip_pa handles br"></i>',
            '<i dir="mr" class="clip_pa handles mr"></i>',
            '<i dir="ml" class="clip_pa handles ml"></i>',
            '<i dir="tm" class="clip_pa handles tm"></i>',
            '<i dir="bm" class="clip_pa handles bm"></i>',
            '<img class="clip_pen incScreen" src="' + imgurl + '" />',
            '<i class="clip_pen incScreen clip_pa mask"></i>',
            '</div>',
            '<div class="clip_pa incScreen clipResizeWrapID disabled" style="width:' + tagw + 'px;height:' + tagh + 'px;border:' + $border + ';border-radius:' + $borderRadius + ';box-shadow:' + $boxShadow + ';">',
            '<img class="clip_pa clipViewImg clipViewImgID" src="' + imgurl + '" style="width:' + imgw + 'px;height:' + imgh + 'px;top:' + imgViewY + 'px;left:' + imgViewX + 'px;" />',
            '</div>',
            '<div id="clipControlHandles" class="clipHandles" style="width:' + tagw + 'px;height:' + tagh + 'px;">',
            '<i dir="tl" class="clip_pa handles tl"></i>',
            '<i dir="tr" class="clip_pa handles tr"></i>',
            '<i dir="bl" class="clip_pa handles bl"></i>',
            '<i dir="br" class="clip_pa handles br"></i>',
            '<i dir="mr" class="clip_pa handles mr"></i>',
            '<i dir="ml" class="clip_pa handles ml"></i>',
            '<i dir="tm" class="clip_pa handles tm"></i>',
            '<i dir="bm" class="clip_pa handles bm"></i>',
            '<i class="iconfont iconicon-move controlDragIcon"></i>',
            '<div class="clip_pa clipConSizeTips">' + '宽: ' + '<span class="clipConW">' + tagw + '</span>' + ' 高: ' + '<span class="clipConH">' + tagh + '</span>' + '</div>',
            '<div class="controlDraggerBorder controlDraggerBorderTop" style="height:' + $borderWidth + 'px"></div>',
            '<div class="controlDraggerBorder controlDraggerBorderBottom" style="height:' + $borderWidth + 'px"></div>',
            '<div class="controlDraggerBorder controlDraggerBorderLeft" style="width:' + $borderWidth + 'px"></div>',
            '<div class="controlDraggerBorder controlDraggerBorderRight" style="width:' + $borderWidth + 'px"></div>',
            '</div>',
            '<div class="scaleToolWrap">',
            '<div class="clip_pr scaleRange">',
            '<div id="clipMask_editImage" class="editContainerItem editImageContainer active">',
            '<i class="iconfont iconmaskpicture"></i>',
            '<div class="tooltips-layer">',
            '<span>编辑图片</span >',
            '<div class="triangle-border tb-border"></div>',
            '<div class="triangle-border tb-background"></div>',
            '</div >',
            '</div >',
            '<div id="clipMask_editControl" class="editContainerItem editControlContainer">',
            '<i class="iconfont iconicon-des-Mask"></i>',
            '<div class="tooltips-layer">',
            '<span>编辑遮罩</span >',
            '<div class="triangle-border tb-border"></div>',
            '<div class="triangle-border tb-background"></div>',
            '</div >',
            '</div >',
            //'<span class="clip_pr progressLane">',
            //'<em class="clip_pa barHandles" style="left:' + pbarx + 'px"><i class="clip_pa"></i></em>',
            //'</span>',
            '</div>',
            '<div class="cancel">取消</div>',
            '<div class="complete" id="img_Clip_Complete_Btn">完成</div>',
            '</div>',
            '</div>',
            '<div class="pop_documentBody_ID"></div>'
        ].join("");

        
        $("body").append(_htmlString); 

        if ($borderWidth == 0) {
            $('#img_clipMask_PopWrapper .clipResizeWrapID').css({
                outline: '1px dashed #5f9ee8'
            })
        }
        //console.log('controlSourceIdTransform', controlSourceIdTransform)
        if (controlSourceIdTransform) {
            $('#img_clipMask_PopWrapper').css({
                transform: controlSourceIdTransform,
                transformOrigin: '50% 50%'
            })
        }

        this.clipMaskPopWrap = $('#' + 'img_clipMask_PopWrapper');
        this.clipDocumentBody = $(".pop_documentBody_ID");

        var maskBoxID = this.clipMaskPopWrap.find('.maskBoxID');
        var controlDragIcon = this.clipMaskPopWrap.find('.controlDragIcon');

        // 蒙层初始化数据赋值
        this.maskDataOptions.width = maskBoxID.width();
        this.maskDataOptions.height = maskBoxID.height();
        this.maskDataOptions.left = parseFloat(maskBoxID.position().left);
        this.maskDataOptions.top = parseFloat(maskBoxID.position().top);

        this.targetDataOptions.width = tagw;
        this.targetDataOptions.height = tagh;
        this.targetDataOptions.left = tagLeft;
        this.targetDataOptions.top = tagTop;

        if (tagw > $('.pop_documentBody_ID').width()) {
            controlDragIcon.css({
                left: 0
            });
        }
        // 原始数据赋值
        //this.sourceMaskDataOptions = deepCopy(this.maskDataOptions,{});//Object.assign({}, this.maskDataOptions);
    };
    // 删除弹层
    F.prototype.destoryHTML = function (id) {
        var _id = id ? $("#" + id) : this.opts.target;

        this.tagVisible(true);
        this.visible(false);

        if (this.clipMaskPopWrap && this.clipMaskPopWrap.size()) {
            this.clipMaskPopWrap.remove();
            $(".pop_documentBody_ID").remove();
        };

        var target = _id;
        //var tagImg = target.find("#img_" + this.opts.controlID);

        //this.dataInit();
        target.css({
            "visibility": "visible"
        });

        this.dataInit();
        $('#g_frame_header', parent.document).unbind('click');
        $('.g-frame-sidebar', parent.document).unbind('click');
        $('.m-mobfra-setul', parent.document).unbind('click');
        $('.g-frameDesign-container', parent.document).unbind('click');
        //tagImg.removeAttr("style").removeAttr("ClipPictureData");
    };
    // 重置弹层
    F.prototype.resetHTML = function (id) {
        var _id = id ? id : this.opts.controlID;
        this.destoryHTML(id);

        var $controlData = JSON.parse($("#data_" + _id).text());
        $controlData.Data.ClipPictureData = "";
        $controlData.Data.hasCliped = "";
         
        $("#data_" + this.opts.controlID).text(JSON.stringify($controlData));
    };

    // 初始到舞台
    F.prototype.toStage = function () {
        // 图片编辑 图片拖拽
        this.maskDragDown();
        // 图片编辑 图片缩放
        this.maskResizeDown();
        // 控件编辑 控件缩放
        this.controlResizeDown();
        // 控件编辑 控件拖拽
        this.controlDragDown();
        // 图片缩放进度条
        this.scaleDown();

        // 图片编辑取消操作
        this.cancelButton();
        // 图片编辑完成操作
        this.completeButton();
        // 编辑区域以外 点击事件
        this.documentBody();

        // 切换图片编辑和控件编辑
        this.changeEditTarget();

        // 移动端 设置通栏时，禁止控件编辑
        this.disabledEditControl();
    };
    // 移动端 设置通栏时，禁止控件编辑
    F.prototype.disabledEditControl = function () {
        var $imgStyleID = $('.' + this.opts.controlID.slice(4));
        if ($imgStyleID.hasClass('yibuFullScreen')) {
            $('#clipMask_editControl').hide();
            $('#clipControlHandles').hide();
            $('.clipHandles').off('dblclick');
            $('.scaleToolWrap').css({ 'width': '176px' })
            $('#clipMask_editImage').click();
        }
    }
    // 蒙版层拖拽 图片拖拽
    F.prototype.maskDragDown = function () {
        var _this = this;
        var target = this.opts.target;
        var maskBoxID = this.clipMaskPopWrap.find('.maskBoxID');
        var clipResizeWrapID = this.clipMaskPopWrap.find('.clipResizeWrapID');
        var clipViewImgID = this.clipMaskPopWrap.find('.clipViewImgID');
        var maskDragDataOptions = this.maskDragDataOptions;
        var maskStatusOptions = this.maskStatusOptions;
        var maskDataOptions = this.maskDataOptions;
        var controlDataOptions = this.controlDataOptions;
        var controlStatusOptions = this.controlStatusOptions;
        var imgViewDataOptions = this.imgViewDataOptions;
        var sourceMaskDataOptions = this.sourceMaskDataOptions;

        maskBoxID.unbind("mousedown").bind("mousedown", function (e) {
            // 判断是否是指定类型
            if (e instanceof MouseEvent && e.which !== 1) {
                return;
            };
            maskStatusOptions.dragable = true;
            var mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                bx = maskBoxID.offset().left - target.offset().left;// - clipControllerID.css('borderWidth'),
            by = maskBoxID.offset().top - target.offset().top;// - clipControllerID.css('borderWidth');
            bw = maskBoxID.width(),
                bh = maskBoxID.height();

            maskDataOptions.width = bw;
            maskDataOptions.height = bh;

            maskDragDataOptions.mx = px;
            maskDragDataOptions.my = py;
            maskDragDataOptions.left = bx;
            maskDragDataOptions.top = by;

            $(document.documentElement).unbind("mousemove", dragMove).bind("mousemove", dragMove);
            $(document.documentElement).unbind("mouseup", dragUp).bind("mouseup", dragUp);

            e.stopPropagation();
            e.preventDefault();
        });
        function dragMove(e) {
            if (!maskStatusOptions.dragable) {
                return;
            };
            var mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                mx = maskDragDataOptions.mx,
                my = maskDragDataOptions.my,
                left = maskDragDataOptions.left,
                top = maskDragDataOptions.top;
            //console.log(py,px)
            maskDataOptions.left = px - mx + left;
            maskDataOptions.top = py - my + top;
            imgViewDataOptions.height = maskDataOptions.height;
            imgViewDataOptions.width = maskDataOptions.width;

            
           
            if (controlStatusOptions.hasEdited) {
                imgViewDataOptions.left = -controlDataOptions.left + maskDataOptions.left - _this.borderWidth;
                imgViewDataOptions.top = -controlDataOptions.top + maskDataOptions.top - _this.borderWidth;
            } else {
                imgViewDataOptions.left = maskDataOptions.left - _this.borderWidth;
                imgViewDataOptions.top = + maskDataOptions.top - _this.borderWidth;
            }

            sourceMaskDataOptions.left = imgViewDataOptions.left;
            sourceMaskDataOptions.top = imgViewDataOptions.top;

            maskBoxID.css(maskDataOptions);
            clipViewImgID.css(imgViewDataOptions);
        };
        function dragUp(e) {
            maskStatusOptions.dragable = false;
            $(document.documentElement).unbind('mousemove', dragMove);
            $(document.documentElement).unbind('mouseup', dragUp);
        };  
    };

    // 蒙版层缩放 图片编辑 图片缩放
    F.prototype.maskResizeDown = function () {
        var _this = this;
        var controlImgObj = $('#img_' + _this.opts.controlID);
        var target = this.opts.target;
        var maskBoxID = this.clipMaskPopWrap.find('.maskBoxID');
        var maskBoxHandlesID = maskBoxID.find('.handles');
        var clipResizeWrapID = this.clipMaskPopWrap.find('.clipResizeWrapID');
        var clipViewImgID = this.clipMaskPopWrap.find('.clipViewImgID');

        var progressLane = this.clipMaskPopWrap.find(".progressLane");
        var barHandles = progressLane.find(".barHandles");
        var maskStatusOptions = this.maskStatusOptions;
        var maskDataOptions = this.maskDataOptions;
        var imgViewDataOptions = this.imgViewDataOptions;
        var controlDataOptions = this.controlDataOptions;
        var targetDataOptions = this.targetDataOptions;
        var sourceMaskDataOptions = this.sourceMaskDataOptions;
        var controlStatusOptions = this.controlStatusOptions;
        var handlesDirectory = this.handlesDirectory;
        var progressLaneOptions = this.progressLaneOptions;
        var scaleValue = this.scaleValue;
        maskBoxHandlesID.unbind("mousedown").bind("mousedown", function (e) {
            // 判断是否是指定类型
            if (e instanceof MouseEvent && e.which !== 1) {
                return;
            };

            maskStatusOptions.resizable = true;
            var mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                bw = maskBoxID.width(),
                bh = maskBoxID.height(),
                bx = maskBoxID.offset().left - target.offset().left,
                by = maskBoxID.offset().top - target.offset().top,
                resizeOption = _this.maskResizeDataOptions,
                maskDataOptions = _this.maskDataOptions;

            maskDataOptions.width = bw;
            maskDataOptions.height = bh;
            maskDataOptions.left = bx;
            maskDataOptions.top = by;

            //resizeOption.right = target.offset().left;
            
            handlesDirectory = $(this).attr("dir");
            // 左上
            if ($(this).hasClass("tl")) {
                resizeOption.right = px + bw;
                resizeOption.fixLeft = bw + bx;
                resizeOption.bottom = py + bh;
                resizeOption.fixTop = bh + by;
            };
            // 右上
            if ($(this).hasClass("tr")) {
                resizeOption.left = px - bw;
                resizeOption.bottom = py + bh;
                resizeOption.fixTop = bh + by;
            };
            // 左下
            if ($(this).hasClass("bl")) {
                resizeOption.top = py - bh;
                resizeOption.right = px + bw;
                resizeOption.fixLeft = bw + bx;
            };
            // 右下
            if ($(this).hasClass("br")) {
                resizeOption.top = py - bh;
                resizeOption.left = px - bw;
            };
            // 左中
            if ($(this).hasClass("ml")) {
                resizeOption.right = px + bw;
                resizeOption.fixLeft = bw + bx;
                resizeOption.fixTop = bh / 2 + by;
            };
            // 右中
            if ($(this).hasClass("mr")) {
                resizeOption.left = px - bw;
                resizeOption.fixTop = bh / 2 + by;
            };
            // 上中
            if ($(this).hasClass("tm")) {
                resizeOption.fixLeft = bw / 2 + bx;
                resizeOption.bottom = py + bh;
                resizeOption.fixTop = bh + by;
            };
            // 下中
            if ($(this).hasClass("bm")) {
                resizeOption.fixLeft = bw / 2 + bx;
                resizeOption.bottom = py + bh;
                resizeOption.top = py - bh;
            };

            $(document.documentElement).unbind("mousemove", resizeMove).bind("mousemove", resizeMove);
            $(document.documentElement).unbind("mouseup", resizeUp).bind("mouseup", resizeUp);

            e.stopPropagation();
            e.preventDefault();
        });
        function resizeMove(e) {
            if (!maskStatusOptions.resizable) {
                return;
            };

            var minWidth = 20,
                minHeight = 20,// 参考现有控件缩放最小尺寸
                mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                resizeOption = _this.maskResizeDataOptions,
                // maskDataOptions = _this.maskDataOptions,
                offsetWidth,
                offsetHeight,
                fillType = _this.opts.fillType,
                wRatioH;
            //if (_this.opts.fillType === 'cutFill') {
                offsetWidth = controlImgObj.width();
                offsetHeight = controlImgObj.height();
            //} else {
                //offsetWidth = target.width();
                //offsetHeight = target.height();
            //}
            wRatioH = offsetWidth / offsetHeight;
            // 左中 右中 上中 下中
            if (handlesDirectory === "ml") {
                maskDataOptions.width = Math.max(resizeOption.right - px, minWidth);
                if (fillType !== 'pullFill') {
                    maskDataOptions.height = maskDataOptions.width / wRatioH;
                    if (maskDataOptions.height < minHeight) {
                        maskDataOptions.height = minHeight;
                        maskDataOptions.width = maskDataOptions.height * wRatioH;
                    }
                    maskDataOptions.top = resizeOption.fixTop - maskDataOptions.height / 2;
                }
                maskDataOptions.left = resizeOption.fixLeft - maskDataOptions.width;
            };
            if (handlesDirectory === "mr") {
                maskDataOptions.width = Math.max(px - resizeOption.left, minWidth);
                if (fillType !== 'pullFill') {
                    maskDataOptions.height = maskDataOptions.width / wRatioH;
                    if (maskDataOptions.height < minHeight) {
                        maskDataOptions.height = minHeight;
                        maskDataOptions.width = maskDataOptions.height * wRatioH;
                    }
                    maskDataOptions.top = resizeOption.fixTop - maskDataOptions.height / 2;
                }
                // maskDataOptions.top = (resizeOption.fixTop - maskDataOptions.height)/offsetWidth*offsetHeight;
            };
            if (handlesDirectory === "tm") {
                maskDataOptions.height = Math.max(resizeOption.bottom - py, minHeight);
                if (fillType !== 'pullFill') {
                    maskDataOptions.width = maskDataOptions.height * wRatioH;
                    if (maskDataOptions.width < minWidth) {
                        maskDataOptions.width = minWidth;
                        maskDataOptions.height = maskDataOptions.width / wRatioH;
                    }
                    maskDataOptions.left = resizeOption.fixLeft - maskDataOptions.width / 2;
                }
                maskDataOptions.top = resizeOption.fixTop - maskDataOptions.height;
            };
            if (handlesDirectory === "bm") {
                maskDataOptions.height = Math.max(py - resizeOption.top, minHeight);
                if (fillType !== 'pullFill') {
                    maskDataOptions.width = maskDataOptions.height * wRatioH;
                    if (maskDataOptions.width < minWidth) {
                        maskDataOptions.width = minWidth;
                        maskDataOptions.height = maskDataOptions.width / wRatioH;
                    }
                    maskDataOptions.left = resizeOption.fixLeft - maskDataOptions.width / 2;
                }
            };

            // 左上右上 左下右下
            if (handlesDirectory === "tl") {
                maskDataOptions.width = Math.max(resizeOption.right - px, minWidth);
                if (fillType !== 'pullFill') {
                    maskDataOptions.height = maskDataOptions.width / wRatioH;//Math.max(resizeOption.bottom - py, minHeight);

                    if (maskDataOptions.height < minHeight) {
                        maskDataOptions.height = minHeight;
                        maskDataOptions.width = maskDataOptions.height * wRatioH;
                    }
                } else {
                    maskDataOptions.height = Math.max(resizeOption.bottom - py, minHeight);
                }
                maskDataOptions.left = resizeOption.fixLeft - maskDataOptions.width;
                maskDataOptions.top = resizeOption.fixTop - maskDataOptions.height;
            };
            if (handlesDirectory === "tr") {
                maskDataOptions.width = Math.max(px - resizeOption.left, minWidth);
                if (fillType !== 'pullFill') {
                    maskDataOptions.height = maskDataOptions.width / wRatioH;//Math.max(resizeOption.bottom - py, minHeight);
                    if (maskDataOptions.height < minHeight) {
                        maskDataOptions.height = minHeight;
                        maskDataOptions.width = maskDataOptions.height * wRatioH;
                    }
                } else {
                    maskDataOptions.height = Math.max(resizeOption.bottom - py, minHeight);
                }
                maskDataOptions.top = resizeOption.fixTop - maskDataOptions.height;
            };
            if (handlesDirectory === "bl") {
                maskDataOptions.width = Math.max(resizeOption.right - px, minWidth);
                if (fillType !== 'pullFill') {
                    maskDataOptions.height = maskDataOptions.width / wRatioH;//Math.max(py - sideTop, minHeight);
                    if (maskDataOptions.height < minHeight) {
                        maskDataOptions.height = minHeight;
                        maskDataOptions.width = maskDataOptions.height * wRatioH;
                    }
                } else {
                    maskDataOptions.height = Math.max(py - resizeOption.top, minHeight);
                }
                maskDataOptions.left = resizeOption.fixLeft - maskDataOptions.width;
            };
            if (handlesDirectory === "br") {
                maskDataOptions.width = Math.max(px - resizeOption.left, minWidth);
                if (fillType !== 'pullFill') {
                    maskDataOptions.height = maskDataOptions.width / wRatioH; //;Math.max(py - sideTop, minHeight);
                    if (maskDataOptions.height < minHeight) {
                        maskDataOptions.height = minHeight;
                        maskDataOptions.width = maskDataOptions.height * wRatioH;
                    }
                } else {
                    maskDataOptions.height = Math.max(py - resizeOption.top, minHeight);
                }
            };

            //_this.scaleValue = scaleValue = (maskDataOptions.width / target.width()).toFixed(1) - 0;
            //progressLaneOptions.left = (maskDataOptions.width / target.width() - 1) / 10 * progressLane.width();

            // console.log( 'resizeMove:', scaleValue );

            imgViewDataOptions.height = maskDataOptions.height;
            imgViewDataOptions.width = maskDataOptions.width;

            if (controlStatusOptions.hasEdited) {
                imgViewDataOptions.left = -controlDataOptions.left + maskDataOptions.left - _this.borderWidth;
                imgViewDataOptions.top = -controlDataOptions.top + maskDataOptions.top - _this.borderWidth;
                //console.log(imgViewDataOptions.left, imgViewDataOptions.top)
            } else {
                imgViewDataOptions.left = maskDataOptions.left - _this.borderWidth;
                imgViewDataOptions.top = + maskDataOptions.top - _this.borderWidth;
            }

            // 工具栏缩放条
            progressLaneOptions.left = Math.min((Math.max(maskDataOptions.width / targetDataOptions.width, maskDataOptions.height / targetDataOptions.height, 1) - 1) / 2,1) * (progressLane.width() - 20);

            sourceMaskDataOptions.left = imgViewDataOptions.left;
            sourceMaskDataOptions.top = imgViewDataOptions.top;

            // 放大缩小滚动条
            barHandles.css(progressLaneOptions);
            // 更改蒙版层数据样式
            maskBoxID.css(maskDataOptions);
            // 同步clipViewImg属性
            clipViewImgID.css(imgViewDataOptions);

            e.stopPropagation();
            e.preventDefault();

        };
        function resizeUp(e) {
            //maskStatusOptions.resizable = false;
            var timer = setTimeout(function () {
                maskStatusOptions.resizable = false;
                clearTimeout(timer);
            })
            $(document.documentElement).unbind("mousemove", resizeMove);
            $(document.documentElement).unbind("mouseup", resizeUp);
            e.stopPropagation();
            e.preventDefault();
        };
    };
    // 蒙版层拖拽 控件拖拽
    F.prototype.controlDragDown = function () {
        var _this = this;
        var target = this.opts.target;
        var clipControlWrapID = $('#clipControlHandles');
        var clipResizeWrapID = this.clipMaskPopWrap.find('.clipResizeWrapID ');
        var clipViewImgID = this.clipMaskPopWrap.find('.clipViewImgID');
        var controlDragDataOptions = this.controlDragDataOptions;
        var controlStatusOptions = this.controlStatusOptions;
        var controlDataOptions = this.controlDataOptions;
        var targetDataOptions = this.targetDataOptions;
        var imgViewDataOptions = this.imgViewDataOptions;

        var maskBoxID = this.clipMaskPopWrap.find('.maskBoxID');
        var sourceMaskDataOptions = this.sourceMaskDataOptions;

        this.clipMaskPopWrap.find('.controlDragIcon, .controlDraggerBorder').unbind("mousedown").bind("mousedown", function (e) {
            // 判断是否是指定类型
            if (e instanceof MouseEvent && e.which !== 1) {
                return;
            };
            if (!controlStatusOptions.canDragable) return;
            controlStatusOptions.dragable = true;
            
            var mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                bx = clipControlWrapID.offset().left - target.offset().left,
                by = clipControlWrapID.offset().top - target.offset().top;
                bw = clipControlWrapID.width(),
                bh = clipControlWrapID.height();

            controlDataOptions.width = bw;
            controlDataOptions.height = bh;

            controlDragDataOptions.mx = px;
            controlDragDataOptions.my = py;
            controlDragDataOptions.left = bx;
            controlDragDataOptions.top = by;

            $(document.documentElement).unbind("mousemove", dragMove).bind("mousemove", dragMove);
            $(document.documentElement).unbind("mouseup", dragUp).bind("mouseup", dragUp);

            e.stopPropagation();
            e.preventDefault();
        });
        function dragMove(e) {
            if (!controlStatusOptions.dragable) {
                return;
            };
            controlStatusOptions.startDragged = true;
            var mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                mx = controlDragDataOptions.mx,
                my = controlDragDataOptions.my,
                left = controlDragDataOptions.left,
                top = controlDragDataOptions.top;

            controlDataOptions.left = parseInt(px - mx + left);
            controlDataOptions.top = parseInt(py - my + top);

            //sourceMaskDataOptions.left = maskDataOptions.left;
            //sourceMaskDataOptions.top = maskDataOptions.top;
            
            clipControlWrapID.css(controlDataOptions);
            clipResizeWrapID.css(controlDataOptions);

            var $controlTop = $('#' + _this.opts.controlID).offset().top;
            var $controlLeft = $('#' + _this.opts.controlID).offset().left;
            var $maskTop = maskBoxID.offset().top;
            var $maskLeft = maskBoxID.offset().left;
            var $controlWrapMaxTop = $maskTop - $controlTop;
            var $controlWrapMaxLeft = $maskLeft - $controlLeft;
            //console.log($controlWrapMaxTop, $controlWrapMaxLeft)
            
            imgViewDataOptions.width = maskBoxID.css('width');
            imgViewDataOptions.height = maskBoxID.css('height');
            if (controlDataOptions.top > $controlWrapMaxTop) {
                imgViewDataOptions.top = $controlWrapMaxTop - controlDataOptions.top - _this.borderWidth;
            } else {
                imgViewDataOptions.top = -clipResizeWrapID.offset().top + $maskTop - _this.borderWidth;
            }
            if (controlDataOptions.left > $controlWrapMaxLeft) {
                imgViewDataOptions.left = $controlWrapMaxLeft - controlDataOptions.left - _this.borderWidth;
            } else {
                imgViewDataOptions.left = -clipResizeWrapID.offset().left + $maskLeft - _this.borderWidth;
            }
            clipViewImgID.css(imgViewDataOptions);

            targetDataOptions.left = parseInt(target.css('left')) + parseFloat(controlDataOptions.left);
            targetDataOptions.top = parseInt(target.css('top')) + parseFloat(controlDataOptions.top);

            e.stopPropagation();
            e.preventDefault();
            
        };
        function dragUp(e) {
            controlStatusOptions.dragable = false;
            controlStatusOptions.hasEdited = true;
            setTimeout(function () {
                controlStatusOptions.startDragged = false;
            })
            $(document.documentElement).unbind('mousemove', dragMove);
            $(document.documentElement).unbind('mouseup', dragUp);
        };
    };
    // 控件编辑 控件缩放
    F.prototype.controlResizeDown = function () {
        var _this = this;
        var controlImgObj = $('#img_' + _this.opts.controlID);
        var target = this.opts.target;
        var clipControlWrapID = $('#clipControlHandles');
        var clipControlHandlesID = $('#clipControlHandles .handles');
        var clipResizeWrapID = this.clipMaskPopWrap.find('.clipResizeWrapID');
        var clipViewImgID = this.clipMaskPopWrap.find('.clipViewImgID');

        var progressLane = this.clipMaskPopWrap.find(".progressLane");
        var barHandles = progressLane.find(".barHandles");
        var progressLaneOptions = this.progressLaneOptions;

        var controlStatusOptions = this.controlStatusOptions;
        var controlResizeDataOptions = this.controlResizeDataOptions;
        var controlDataOptions = this.controlDataOptions;
        var targetDataOptions = this.targetDataOptions;
        var maskDataOptions = this.maskDataOptions;
        var imgViewDataOptions = this.imgViewDataOptions;
        var sourceMaskDataOptions = this.sourceMaskDataOptions;
        var handlesDirectory = this.handlesDirectory;
        clipControlHandlesID.unbind("mousedown").bind("mousedown", function (e) {
            // 判断是否是指定类型
            if (e instanceof MouseEvent && e.which !== 1) {
                return;
            };
            controlStatusOptions.resizable = true;
            controlStatusOptions.startResized = true;
            var mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                bw = clipControlWrapID.width(),
                bh = clipControlWrapID.height(),
                bx = clipControlWrapID.offset().left - target.offset().left,
                by = clipControlWrapID.offset().top - target.offset().top,
                resizeOption = _this.controlResizeDataOptions,
                controlDataOptions = _this.controlResizeDataOptions;

            controlDataOptions.width = bw;
            controlDataOptions.height = bh;
            controlDataOptions.left = bx;
            controlDataOptions.top = by;

            handlesDirectory = $(this).attr("dir");
            // 左上
            if ($(this).hasClass("tl")) {
                resizeOption.right = px + bw;
                resizeOption.fixLeft = bw + bx;
                resizeOption.bottom = py + bh;
                resizeOption.fixTop = bh + by;
            };
            // 右上
            if ($(this).hasClass("tr")) {
                resizeOption.left = px - bw;
                resizeOption.bottom = py + bh;
                resizeOption.fixTop = bh + by;
            };
            // 左下
            if ($(this).hasClass("bl")) {
                resizeOption.top = py - bh;
                resizeOption.right = px + bw;
                resizeOption.fixLeft = bw + bx;
            };
            // 右下
            if ($(this).hasClass("br")) {
                resizeOption.top = py - bh;
                resizeOption.left = px - bw;
            };
            // 左中
            if ($(this).hasClass("ml")) {
                resizeOption.right = px + bw;
                resizeOption.fixLeft = bw + bx;
                resizeOption.fixTop = bh / 2 + by;
            };
            // 右中
            if ($(this).hasClass("mr")) {
                resizeOption.left = px - bw;
                resizeOption.fixTop = bh / 2 + by;
            };
            // 上中
            if ($(this).hasClass("tm")) {
                resizeOption.fixLeft = bw / 2 + bx;
                resizeOption.bottom = py + bh;
                resizeOption.fixTop = bh + by;
            };
            // 下中
            if ($(this).hasClass("bm")) {
                resizeOption.fixLeft = bw / 2 + bx;
                resizeOption.bottom = py + bh;
                resizeOption.top = py - bh;
            };

            $(document.documentElement).unbind("mousemove", resizeMove).bind("mousemove", resizeMove);
            $(document.documentElement).unbind("mouseup", resizeUp).bind("mouseup", resizeUp);

            e.stopPropagation();
            e.preventDefault();
        });
        function resizeMove(e) {
            if (!controlStatusOptions.resizable) {
                return;
            };

            var minWidth = 20,
                minHeight = 20,// 参考现有控件缩放最小尺寸
                mev = getPageOptions(e),
                py = mev.pageY,
                px = mev.pageX,
                resizeOption = _this.controlResizeDataOptions,
                // maskDataOptions = _this.maskDataOptions,
                offsetWidth,
                offsetHeight,
                wRatioH;
            //if (_this.opts.fillType === 'cutFill') {
            //    offsetWidth = controlImgObj.width();
            //    offsetHeight = controlImgObj.height();
            //} else {
            //    offsetWidth = target.width();
            //    offsetHeight = target.height();
            //}
            offsetWidth = target.width();
            offsetHeight = target.height();
            wRatioH = offsetWidth / offsetHeight;
            //console.log(offsetWidth, offsetHeight);
            // 左中 右中 上中 下中
            if (handlesDirectory === "ml") {
                controlDataOptions.width = Math.max(resizeOption.right - px, minWidth);
                controlDataOptions.height = controlDataOptions.height || offsetHeight;
                controlDataOptions.left = resizeOption.fixLeft - controlDataOptions.width;
            };
            if (handlesDirectory === "mr") {
                controlDataOptions.width = Math.max(px - resizeOption.left, minWidth);
                controlDataOptions.height = controlDataOptions.height || offsetHeight;
                //controlDataOptions.top = resizeOption.fixTop - controlDataOptions.height;
            };
            if (handlesDirectory === "tm") {
                controlDataOptions.height = Math.max(resizeOption.bottom - py, minHeight);
                controlDataOptions.width = controlDataOptions.width || offsetWidth;
                controlDataOptions.top = resizeOption.fixTop - controlDataOptions.height;
            };
            if (handlesDirectory === "bm") {
                controlDataOptions.height = Math.max(py - resizeOption.top, minHeight);
                controlDataOptions.width = controlDataOptions.width || offsetWidth;
                //controlDataOptions.left = resizeOption.fixLeft - controlDataOptions.width;
            };

            // 左上右上 左下右下
            if (handlesDirectory === "tl") {
                controlDataOptions.width = Math.max(resizeOption.right - px, minWidth);
                controlDataOptions.height = Math.max(resizeOption.bottom - py, minHeight);
                controlDataOptions.left = resizeOption.fixLeft - controlDataOptions.width;
                controlDataOptions.top = resizeOption.fixTop - controlDataOptions.height;
            };
            if (handlesDirectory === "tr") {
                controlDataOptions.width = Math.max(px - resizeOption.left, minWidth);
                controlDataOptions.height = Math.max(resizeOption.bottom - py, minHeight);
                controlDataOptions.top = resizeOption.fixTop - controlDataOptions.height;
            };
            if (handlesDirectory === "bl") {
                controlDataOptions.width = Math.max(resizeOption.right - px, minWidth);
                controlDataOptions.height = Math.max(py - resizeOption.top, minHeight);
                controlDataOptions.left = resizeOption.fixLeft - controlDataOptions.width;
            };
            if (handlesDirectory === "br") {
                controlDataOptions.width = Math.max(px - resizeOption.left, minWidth);
                controlDataOptions.height = Math.max(py - resizeOption.top, minHeight);
            };
            clipControlWrapID.css(controlDataOptions);
            clipResizeWrapID.css(controlDataOptions);
            clipControlWrapID.find('.clipConW').text(controlDataOptions.width);
            clipControlWrapID.find('.clipConH').text(controlDataOptions.height);

            // 设置高亮图片的位置
            //imgViewDataOptions.height = _this.maskDataOptions.height;
            //imgViewDataOptions.width = _this.maskDataOptions.width;
            //console.log(_this.maskDataOptions.width, _this.maskDataOptions.height, '控件拖拽');
            imgViewDataOptions.left = maskDataOptions.left - _this.borderWidth - controlDataOptions.left;
            imgViewDataOptions.top = maskDataOptions.top - _this.borderWidth - controlDataOptions.top;

            sourceMaskDataOptions.left = imgViewDataOptions.left;
            sourceMaskDataOptions.top = imgViewDataOptions.top;
            //clipViewImgID.css(imgViewDataOptions);
            clipViewImgID.css({
                top: imgViewDataOptions.top,
                left: imgViewDataOptions.left
            });

            // 设置target尺寸
            targetDataOptions.width = controlDataOptions.width;
            targetDataOptions.height = controlDataOptions.height;
            targetDataOptions.left = parseFloat(target.css('left')) + parseFloat(controlDataOptions.left);
            targetDataOptions.top = parseFloat(target.css('top')) + parseFloat(controlDataOptions.top);

            // 工具栏缩放条
            progressLaneOptions.left = Math.min((Math.max(maskDataOptions.width / targetDataOptions.width, maskDataOptions.height / targetDataOptions.height, 1) - 1) / 2, 1) * (progressLane.width() - barHandles.width());
            barHandles.css(progressLaneOptions);

            e.stopPropagation();
            e.preventDefault();
        };
        function resizeUp(e) {
            controlStatusOptions.resizable = false;
            var timer = setTimeout(function () {
                // 控件缩放后 不触发鼠标单击事件
                controlStatusOptions.startResized = false;
                clearTimeout(timer);
            })
            controlStatusOptions.hasEdited = true;
            $(document.documentElement).unbind("mousemove", resizeMove);
            $(document.documentElement).unbind("mouseup", resizeUp);
            e.stopPropagation();
            e.preventDefault();
        };
    };

    // 大小控制器
    F.prototype.scaleDown = function () {
        // 缩放，是以控件宽度计算，最小为控件宽度的1倍，最大为控件宽度的三倍
        var _this = this;
        var target = this.opts.target;
        var controlImgObj = $('#img_' + _this.opts.controlID);
        var controlImgWH_radio = controlImgObj.width() / controlImgObj.height();
        var progressLane = this.clipMaskPopWrap.find(".progressLane");
        var barHandles = progressLane.find(".barHandles");

        var maskBoxID = this.clipMaskPopWrap.find('.maskBoxID');
        var clipResizeWrapID  = this.clipMaskPopWrap.find('.clipResizeWrapID ');
        var clipViewImgID = clipResizeWrapID .find('.clipViewImgID');

        var sourceMaskDataOptions = this.sourceMaskDataOptions;
        var targetDataOptions = this.targetDataOptions; // 获取控件编辑后的尺寸
        var maskDataOptions = this.maskDataOptions;
        var controlDataOptions = this.controlDataOptions;
        var imgViewDataOptions = this.imgViewDataOptions;
        var maskStatusOptions = this.maskStatusOptions;
        var progressLaneDragOptions = this.progressLaneDragOptions;

        var progressLaneOptions = this.progressLaneOptions;
        var scaleValue = this.scaleValue;
        progressLane.unbind("mousedown").bind("mousedown", function (e) {
            // 判断是否是指定类型
            if (e instanceof MouseEvent && e.which !== 1) {
                return;
            };
            maskStatusOptions.scaleable = true;
            var mev = getPageOptions(e),
                px = mev.pageX,
                bx = progressLaneOptions.left;

            progressLaneDragOptions.mx = px;
            progressLaneDragOptions.left = bx;

            $(document.documentElement).unbind("mousemove", scaleMove).bind("mousemove", scaleMove);
            $(document.documentElement).unbind("mouseup", scaleUp).bind("mouseup", scaleUp);

            e.stopPropagation();
            e.preventDefault();
        });
        function scaleMove(e) {
            if (!maskStatusOptions.scaleable) return;
            var mev = getPageOptions(e),
                px = mev.pageX,
                mx = progressLaneDragOptions.mx,
                left = progressLaneDragOptions.left;

            progressLaneOptions.left = px - mx + left;

            if (progressLaneOptions.left <= 0) {
                progressLaneOptions.left = 0;
            };
            if (progressLaneOptions.left >= progressLane.width() - barHandles.width()) {
                progressLaneOptions.left = progressLane.width() - barHandles.width();
            };
            barHandles.css(progressLaneOptions);

            scaleValue = (progressLaneOptions.left / (progressLane.width() - barHandles.width()) * 2 + 1).toFixed(1);
             //console.log( 'scaleMove:', _this.scaleValue );

            var scaleWidth = Math.max((targetDataOptions.width * scaleValue).toFixed(1),20);
            var scaleHeight = (targetDataOptions.height * scaleValue).toFixed(1);
            if (targetDataOptions.width / targetDataOptions.height > controlImgWH_radio) {
                scaleWidth = scaleHeight * controlImgWH_radio;
            }

            var scaleLeft = parseFloat(maskBoxID.css('left')) - (scaleWidth - maskDataOptions.width) / 2 * ((_this.scaleValue - scaleValue) === 0 ? 0 : 1)
            var scaleTop = parseFloat(maskBoxID.css('top')) - (scaleWidth / controlImgWH_radio - parseFloat(maskDataOptions.height)) / 2 * ((_this.scaleValue - scaleValue) === 0 ? 0 : 1);

            _this.scaleValue = scaleValue;

            maskDataOptions.width = scaleWidth;
            maskDataOptions.height = scaleWidth / controlImgWH_radio;
            maskDataOptions.left = scaleLeft;
            maskDataOptions.top = scaleTop;
            maskBoxID.css(maskDataOptions);

            // 同步clipViewImg属性
            imgViewDataOptions.height = maskDataOptions.height;
            imgViewDataOptions.width = maskDataOptions.width;

            if (_this.controlStatusOptions.hasEdited) {
                imgViewDataOptions.left = -controlDataOptions.left + maskDataOptions.left - _this.borderWidth;
                imgViewDataOptions.top = -controlDataOptions.top + maskDataOptions.top - _this.borderWidth;
                //console.log(imgViewDataOptions.left, imgViewDataOptions.top)
            } else {
                imgViewDataOptions.left = maskDataOptions.left - _this.borderWidth;
                imgViewDataOptions.top = + maskDataOptions.top - _this.borderWidth;
            }
            clipViewImgID.css(imgViewDataOptions);

            e.stopPropagation();
            e.preventDefault();
        };
        function scaleUp(e) {
            var timer = setTimeout(function () {
                maskStatusOptions.scaleable = false;
                clearTimeout(timer);
            })
            
            $(document.documentElement).unbind('mousemove', scaleMove);
            $(document.documentElement).unbind('mouseup', scaleUp);

            e.stopPropagation();
            e.preventDefault();
        };
    }

    // 切换编辑图片和编辑控件事件
    F.prototype.changeEditTarget = function () {
        var _this = this;
        var $items = $('.editContainerItem');
        var currentIndex = 0;
        var clickTimer = null;
        $('.editContainerItem').click(function (e) {
            var $this = $(this);
            index = $this.index();
            if ($this.hasClass('active')) {
                return;
            }
            changeEditStatus(index);
            e.stopPropagation();
            e.preventDefault();
        })
        $('.clipHandles')
            .bind("selectstart", function (e) {
                e.stopPropagation();
                e.preventDefault();
                // 取消双击选中事件
                return false;
            })
            .off('click').click(function (e) {
                // 单击编辑区域进入图片编辑
                // 控件缩放和拖拽后 不触发鼠标单击事件
                if (_this.controlStatusOptions.startResized === true || _this.controlStatusOptions.startDragged === true) {
                    return;
                }
                var $target = $(e.target);
                if ($target.hasClass('clipHandles')) {
                    clearTimeout(clickTimer);
                    clickTimer = setTimeout(function () {
                        console.log('click')
                        if (currentIndex === 0) return;
                        changeEditStatus(0);
                    }, 300);
                }
                e.stopPropagation();
                e.preventDefault();
            })
            .off('dblclick').dblclick(function (e) {
                // 双击编辑区域进入控件编辑
                var $target = $(e.target)
                if ($target.hasClass('clipHandles')) {
                    clearTimeout(clickTimer);
                    console.log('dblClick')
                    if (currentIndex === 1) return;
                    changeEditStatus(1);
                }
                e.stopPropagation();
                e.preventDefault();
        })
        function changeEditStatus(index) {
            currentIndex = index;
            if (index) {
                _this.controlStatusOptions.canDragable = true;
                $('#clipControlHandles').find('.handles,.controlDragIcon,.clipConSizeTips, .controlDraggerBorder').show();
                $('.maskBoxID').find('.handles').hide();
            } else {
                _this.controlStatusOptions.canDragable = false;
                $('#clipControlHandles').find('.handles,.controlDragIcon,.clipConSizeTips, .controlDraggerBorder').hide();
                $('.maskBoxID').find('.handles').show();
            }
            $items.removeClass('active');
            $($items[currentIndex]).addClass('active');
        }
        // 默认选中编辑遮罩
        changeEditStatus(1);
    }
    // 取消事件
    F.prototype.cancelButton = function () {
        var _this = this;
        //var target = this.opts.target; 
        //var tagImg = target.find("#img_" + controlID);
        //var clipControllerID = this.clipMaskPopWrap.find('.clipController');
        //var clipViewImgID = clipControllerID.find('.clipViewImgID');
        var closeID = this.clipMaskPopWrap.find('.cancel');
        var clipBaseLoading = this.clipMaskPopWrap.find(".tiploading");
        closeID.unbind("click").bind("click", function (e) {
            if (clipBaseLoading.is(":visible")) {
                return;
            };
            _this.destoryHTML();
        });
    };
    // 确认事件
    F.prototype.completeButton = function () {
        var _this = this;
        var target = _this.opts.target;
        var tagImgWrap = target.find('.image-clip-wrap');
        var tagImg = target.find("#img_" + _this.opts.controlID);
        var completeID = _this.clipMaskPopWrap.find('.complete');
        var progressLaneOptions = _this.progressLaneOptions;
        var targetDataOptions = this.targetDataOptions;
        completeID.unbind("click").bind("click", function (e) {
            //var maskBoxID = _this.clipMaskPopWrap.find('.maskBoxID');
            var clipViewImgID = _this.clipMaskPopWrap.find('.clipViewImgID');
            var $controlData = JSON.parse($("#data_" + _this.opts.controlID).text());

            var clipViewImgIDX = clipViewImgID.position().left;
            var clipViewImgIDY = clipViewImgID.position().top;
            var clipViewImgIDW = clipViewImgID.width();
            var clipViewImgIDH = clipViewImgID.height();
            target.addClass("smc");
            // $("body").append(_this.completeOptions);
            $controlData.Data.ClipPictureData = JSON.stringify({
                //tagw: targetDataOptions.width,//target.width(),
                //tagh: targetDataOptions.height,//target.height(),
                //tagx: targetDataOptions.left,//target.offset().left,
                //tagy: targetDataOptions.top,//target.offset().top,
                maskw: clipViewImgIDW,
                maskh: clipViewImgIDH,
                maskx: clipViewImgIDX,
                masky: clipViewImgIDY,
                pbarx: progressLaneOptions.left,
                scale: _this.scaleValue
            }); 
            tagImg.css({
                width: clipViewImgIDW,
                height: clipViewImgIDH,
                marginTop: clipViewImgIDY,
                marginLeft: clipViewImgIDX
            });
            target.css({
                width: targetDataOptions.width,//target.width(),
                height: targetDataOptions.height,//target.height(),
                top: targetDataOptions.top,//target.offset().left,
                left: targetDataOptions.left,//target.offset().top,
            });
            tagImgWrap.css({
                width: targetDataOptions.width,
                height: targetDataOptions.height
            });
            tagImg.removeClass('imgCliped');
            $controlData.Css['$img-width'] = clipViewImgIDW + 'px';
            $controlData.Css['$img-height'] = clipViewImgIDH + 'px';
            $controlData.Css['$img-marginTop'] = clipViewImgIDY + 'px';
            $controlData.Css['$img-marginLeft'] = clipViewImgIDX + 'px';
            $controlData.Css.width = targetDataOptions.width;
            $controlData.Css.height = targetDataOptions.height;
            $controlData.Data.width = targetDataOptions.width;
            $controlData.Data.height = targetDataOptions.height;
            $controlData.Css.offsetX = parseInt(targetDataOptions.left);
            $controlData.Css.offsetY = parseInt(targetDataOptions.top);
            $controlData.Data.hasCliped = 'true';

            _this.destoryHTML();
            $("#data_" + _this.opts.controlID).text(JSON.stringify($controlData));
            //_this.opts.parent.refreshCss();
             //refresh AreaHeight
            var newH = parseInt(target.position().top + target.height());
            var areaId = target.attr('areaid');
            var pvid = target.attr('pvid');

            if (!(typeof (pvid) != 'undefined' && pvid !== '')) {
                _this.opts.parent.changeAreaH(areaId, newH, true);
            }

            // 前进后退 --完成
            smartViewFactory.pushTemp2History(_this.opts.controlID);

            window.gtag && gtag('event', 'event_image_mask', {
                'event_category': '图片遮罩-' + _this.opts.deviceType,
                'event_action': '点击完成按钮',
                'event_label': '遮罩完成'
            });
            // refresh 控件尺寸
            //_this.opts.parent.setWidthAndHeight(targetDataOptions.width, targetDataOptions.height);
        });
    };

    // 点击外侧确认裁剪
    F.prototype.documentBody = function () {
        //debugger
        var _this = this;
        var pop_documentBody_ID = $(".pop_documentBody_ID");
        var clipBaseLoading = this.clipMaskPopWrap.find(".tiploading");
        if (!!pop_documentBody_ID && pop_documentBody_ID.size()) {
            pop_documentBody_ID.unbind("click").bind("click", function (e) {
                finishClip();
            });
            $('.clipMaskPopWrap').unbind('click').bind('click', function (e) {
                if ($(e.target).is('.clipMaskPopWrap')) {
                    finishClip();
                }
                e.stopPropagation();
                e.preventDefault();
            })
            $('#g_frame_header', parent.document).unbind('click').bind("click", function (e) {
                finishClip();
            });
            $('.g-frame-sidebar', parent.document).unbind('click').bind("click", function (e) {
                finishClip();
            });
            $('.m-mobfra-setul', parent.document).unbind('click').bind("click", function (e) {
                finishClip();
            });
            $('.g-frameDesign-container', parent.document).unbind('click').bind("click", function (e) {
                var $target = $(e.target);
                if ($target.is('#g_mobile_cover') || $target.is('.g-mobfra-header') || $target.is('.g-mobfra-footer')) {
                    finishClip();
                }
            });
        };

        function finishClip() {
            if (!_this.maskStatusOptions.resizable && !_this.controlStatusOptions.startResized && !_this.maskStatusOptions.scaleable) {
                _this.clipMaskPopWrap.find('.complete').click();
                _this.destoryHTML();
            }
        }
    };

    // 初始化的属性设置
    F.prototype.dataInit = function () {
        this.maskDragDataOptions = { mx: 0, my: 0, left: 0, top: 0, width: 0, height: 0 };
        this.controlDragDataOptions = { mx: 0, my: 0, left: 0, top: 0, width: 0, height: 0 };
        this.maskResizeDataOptions = { mx: 0, my: 0, fixLeft: 0, fixTop: 0, left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
        this.controlResizeDataOptions = { mx: 0, my: 0, fixLeft: 0, fixTop: 0, left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };

        this.controlDataOptions = { left: 0, top: 0, width: 0, height: 0 };
        this.targetDataOptions = { left: 0, top: 0, width: 0, height: 0 };
        this.maskDataOptions = { left: 0, top: 0, width: 0, height: 0 };
        this.imgViewDataOptions = { left: 0, top: 0, width: 0, height: 0 };
        this.sourceMaskDataOptions = { left: 0, top: 0, width: 0, height: 0 };
        
        this.progressLaneDragOptions = { mx: 0, left: 0 };
        this.progressLaneOptions = { left: 0 };

        // 完成时的状态记录
        this.completeOptions = {};

        this.maskStatusOptions = {
            dragable: false,
            resizable: false,
            scaleable: false
        };
        this.controlStatusOptions = {
            canDragable: false,
            dragable: false,
            resizable: false,
            scaleable: false,
            hasEdited: false,
            startResized: false,
            startDragged:false
        };

        this.scaleValue = 1;
        this.borderWidth = 0;
        this.handlesDirectory = "";
    };

    // 返回图片原始属性的数据
    F.prototype.getImageAttr = function (url, fn) {
        var _img = new Image();
        _img.setAttribute('crossOrigin', 'anonymous');
        _img.src = url + "?v=" + Math.random();
        _img.onload = function () {
            fn && fn(_img);
        };
    };
    // canvas 转换图片
    F.prototype.cavasClipToBase = function (url, fn) {
        var target = this.opts.target;
        var clipControllerID = this.clipMaskPopWrap.find('.clipController');
        var clipViewImgID = clipControllerID.find('.clipViewImgID');
        var scaleNumber = 5;
        this.getImageAttr(url, function (_img) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            var bw = target.width() * scaleNumber;
            var bh = target.height() * scaleNumber;

            var sx = clipViewImgID.position().left * scaleNumber;
            var sy = clipViewImgID.position().top * scaleNumber;
            var sw = clipViewImgID.width() * scaleNumber;
            var sh = clipViewImgID.height() * scaleNumber;

            ctx.clearRect(0, 0, bw, bh);
            $(canvas).attr({
                width: bw,
                height: bh
            }).css({
                width: bw,
                height: bh
            });
            ctx.fillStyle = '#FFF ';
            ctx.fillRect(0, 0, bw, bh);
            ctx.drawImage(_img, sx, sy, sw, sh);
            var dataBaseUrl = canvas.toDataURL('image/jpg', 0.8)
            fn && fn(dataBaseUrl);
            canvas = null;
        })
    };

    // 是否包含的判断
    F.prototype.isInclusion = function (tag, ctx, opts) {
        var motionSpace = {
            width: ctx.width() - tag.width(),
            height: ctx.height() - tag.height()
        },
            left = 0,
            top = 0;

        if (opts.top >= 0) {
            top = 0;
        } else {
            top = -motionSpace.height;
        };
        if (opts.left >= 0) {
            left = 0;
        } else {
            left = -motionSpace.width;
        };
        // console.log('运动空间的坐标：', left, top);

        return { top: top, left: left };
    };

    // 隐藏 || 显示 功能
    F.prototype.visible = function (sta) {
        //var styleTag = this.opts.target.find(".image-clip-wrap");
        var popbox = this.clipMaskPopWrap;
        sta ? popbox.css("visibility", "visible") : popbox.css("visibility", "hidden");

        //// 同步一些样式
        //popbox.css({
        //    "border": styleTag.css("border")
        //});
    };
    // 是否显示target目标袁术
    F.prototype.tagVisible = function (sta) {
        var target = this.opts.target;
        var smControlSetting = $("#sm_controlSetting");
        sta ? target.css("visibility", "visible") : target.css("visibility", "hidden");
        sta ? target.find(".ui-resizable-pulldown").css('opacity', 1) : target.find(".ui-resizable-pulldown").css('opacity', 0);
        sta ? smControlSetting.show() : smControlSetting.hide();
    };

    return F;
})();