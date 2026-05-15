smartViewFactory.buildSmartView = function (type, id, data) {
    switch (type) {
        case "area":
            return new AreaSmartView(id, data);
        case "banner":
            return new BannerSmartView(id, data);
        case "listfile":
            return new ListFileSmartView(id, data);
        case "listproduct":
            return new ListProductSmartView(id, data);
        case "listproductsearch":
            return new ListProductSearchSmartView(id, data);
        case "listproductcategory":
            return new ListProductCategorySmartView(id, data);
        case "listnews":
            return new ListNewsSmartView(id, data);
        case "listnewssearch":
            return new ListNewsSearchSmartView(id, data);
        case "listnewscategory":
            return new ListNewsCategorySmartView(id, data);
        case "altas":
            return new AltasSmartView(id, data);
        case "music":
            return new MusicSmartView(id, data);
        case "leaveword":
            return new LeavewordSmartView(id, data);
        case "newsItemCrumbsBind":
            return new NewsItemCrumbsBindSmartView(id, data);
        case "newsItemTitleBind":
            return new NewsItemTitleBindSmartView(id, data);
        case "newsItemCreatedDatetimeBind":
            return new NewsItemCreatedDatetimeBindSmartView(id, data);
        case "newsItemHitsBind":
            return new NewsItemHitsBindSmartView(id, data);
        case "newsItemFavoritesBind":
            return new NewsItemFavoritesBindSmartView(id, data);
        case "newsItemSummaryBind":
            return new NewsItemSummaryBindSmartView(id, data);
        case "newsItemContentBind":
            return new NewsItemContentBindSmartView(id, data);
        case "newsItemPreviousBind":
            return new NewsItemPreviousBindSmartView(id, data);
        case "newsItemNextBind":
            return new NewsItemNextBindSmartView(id, data);
        case "productCrumbsBind":
            return new ProductCrumbsBindSmartView(id, data);
        case "productTitleBind":
            return new ProductTitleBindSmartView(id, data);
        case "productCreatedDatetimeBind":
            return new ProductCreatedDatetimeBindSmartView(id, data);
        case "productHitsBind":
            return new ProductHitsBindSmartView(id, data);
        case "productFavoritesBind":
            return new ProductFavoritesBindSmartView(id, data);
        case "productSummaryBind":
            return new ProductSummaryBindSmartView(id, data);
        case "productContentBind":
            return new ProductContentBindSmartView(id, data);
        case "productPreviousBind":
            return new ProductPreviousBindSmartView(id, data);
        case "productNextBind":
            return new ProductNextBindSmartView(id, data);
        case "productParameterBind":
            return new ProductParameterBindSmartView(id, data);
        case "productSpecificationsBind":
            return new ProductSpecificationsBindSmartView(id, data);
        case "login":
            return new LoginSmartView(id, data);
        case "register":
            return new RegisterSmartView(id, data);
        case "loginstatu":
            return new LoginStatuSmartView(id, data);
        case "breadcrumb":
            return new BreadCrumbSmartView(id, data);
        case "category":
            return new CategorySmartView(id, data);
        case "cartQuantity":
            return new CartQuantitySmartView(id, data);
        case "productOriginalPriceBind":
            return new ProductOriginalPriceBindSmartView(id, data);
        case "map":
            return new MapSmartView(id, data);
        case "slideset":
            return new SlideSetSmartView(id, data);
        case "cartSubmitButton":
            return new CartSubmitButtonSmartView(id, data);
        case "productCurrentPriceBind":
            return new ProductCurrentPriceBindSmartView(id, data);
        case "tab":
            return new TabSmartView(id, data);
        case "fullpage":
            return new FullPageSmartView(id, data);
        case "productSlideBind":
            return new ProductSlideBindSmartView(id, data);
        case "comment":
            return new CommentSmartView(id, data);
        case "productRelateBind":
            return new ProductRelateBindSmartView(id, data);
        case "qqservice":
            return new QQServiceSmartView(id, data);
        case "cart":
            return new Cart(id, data);
        case "baiduBridge":
            return new BaiduBridgeSmartView(id, data);
        case "baiduMap":
            return new BaiduMapSmartView(id, data);
        case "multicolumn":
            return new MultiColumnSmartView(id, data);
        case "share":
            return new ShareSmartView(id, data);
        case "favorites":
            return new FavoritesSmartView(id, data);
        case "video":
            return new VideoSmartView(id, data);
        case "codeCnzz":
            return new CodeCnzzSmartView(id, data);
        case "button_Test":
            return new ButtonTestSmartView(id, data);
        case "formpanel":
            return new FormPanelSmartView(id, data);
        case "dialog":
            return new DialogSmartView(id, data);
        case "mustache":
            return new MustacheSmartView(id, data);
        case "logoimage":
            return new LogoImageSmartView(id, data);
        case "companyIntroduction":
            return new CompanyIntroductionSmartView(id, data);
        case "companyinfo":
            return new CompanyInfoSmartView(id, data);
        case "alivideo":
            return new AliVideoSmartView(id, data);
        case "newsItemCategoryCrumbs":
            return new NewsItemCategoryCrumbsSmartView(id, data);
        case "productCategoryCrumbs":
            return new ProductCategoryCrumbsSmartView(id, data);
        case "navcontainer":
            return new NavContainerSmartView(id, data);
        case "multinav":
            return new MultiNavSmartView(id, data);
        case "uetitle":
            return new UeTitleSmartView(id, data);
        case "uesubtitle":
            return new UeSubTitleSmartView(id, data);
        case "uecontent":
            return new UeContentSmartView(id, data);
        case "fullpageSlide":
            return new FullpageSlideSmartView(id, data);
        case "flexiblePanel":
            return new FlexiblePanelSmartView(id, data);
    }
}

// 多图轮播限制添加控件
//var slidesetCtlConflictList = ['listnews', 'listproduct', 'listfile', 'comment', 'listproductsearch', 'listproductcategory', 'navcontainer', 'multinav', 'nav', 'category', 'qqservice', 'breadcrumb', 'languages'];
var slidesetCtlConflictList = ['listnews', 'listproduct', 'listfile', 'comment', 'listproductsearch', 'listproductcategory', 'navcontainer', 'multinav', 'nav', 'category', 'qqservice', 'tab'];

cnsmart.ctlConflictMap["area"] = ['banner', 'multicolumn', 'slideset_Style1', 'slideset_Style3', 'fullpage', 'slide_Style1', 'dialog', 'slidesetlimit', 'slidelimit'];
cnsmart.ctlConflictMap["banner"] = ['banner', 'slideset_Style1', 'slideset_Style3', 'fullpage', 'slide_Style1', 'dialog', 'slidesetlimit', 'slidelimit'];
cnsmart.ctlConflictMap["multicolumn"] = ['banner', 'multicolumn', 'slideset_Style1', 'slideset_Style3', 'fullpage', 'slide_Style1', 'dialog', 'slidesetlimit', 'slidelimit'];
cnsmart.ctlConflictMap["tab"] = ['banner', 'multicolumn', 'slideset_Style1', 'slideset_Style3', 'fullpage', 'slide_Style1', 'dialog', 'slidesetlimit', 'slidelimit', 'listproduct_Style7', 'listnews_Style10', 'fullpageSlide', 'multinav', 'navcontainer', 'tab_Style10', 'tab_Style11'];
cnsmart.ctlConflictMap["slideset"] = ['alivideo', 'banner', 'multicolumn', 'slideset', 'fullpage', 'slide', 'listproduct_Style3', 'listproductsearch_Style3', 'listproductcategory_Style3', 'dialog'].concat(slidesetCtlConflictList);
cnsmart.ctlConflictMap["fullpage"] = ['fullpage', 'multicolumn_Style2', 'banner_Style3', 'dialog', 'multicolumnlimit'];
cnsmart.ctlConflictMap["dialog"] = ['dialog', 'banner', 'fullpage', 'multicolumn', 'slideset_Style1', 'slideset_Style3', 'slide_Style1', 'slidesetlimit', 'slidelimit'];
cnsmart.ctlConflictMap["flexiblePanel"] = ['flexiblePanel', 'banner', 'multicolumn', 'slideset_Style1', 'slideset_Style3', 'fullpage', 'slide_Style1', 'dialog', 'slidesetlimit', 'slidelimit', 'listproduct_Style7', 'listnews_Style10', 'fullpageSlide', 'multinav', 'navcontainer'];

// 基于slideset
cnsmart.ctlConflictMap["fullpageSlide"] = ['fullpageSlide'].concat(cnsmart.ctlConflictMap["slideset"]);


function YibuTrimPx(strPx, ext) {
    strPx = strPx + "";
    var index = strPx.toLowerCase().indexOf(ext || "px");
    if (index > 0) {
        return parseInt(strPx.substring(0, strPx.length - 2));
    } else if (!isNaN(strPx)) {
        return parseInt(strPx);
    }
    return 0;
}


var ButtonSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'button', controlData);
    },
    _onResize: function (width, height) {
        var btn = $('#' + this.controlId).find('.w-button');
        var leftborder = YibuTrimPx(this.getCss("$border-left-width"));
        var rightborder = YibuTrimPx(this.getCss("$border-right-width"));
        var topborder = YibuTrimPx(this.getCss("$border-top-width"));
        var bottomborder = YibuTrimPx(this.getCss("$border-bottom-width"));
        var realWidth = parseInt(width) - leftborder - rightborder;
        var realHeight = parseInt(height) - topborder - bottomborder;
        btn.css({
            'width': realWidth + "px",
            'height': realHeight + "px",
            'line-height': realHeight + "px"
        });
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    bindCustomEvents: function () {
        var controlId = this.controlId;
        var imgConId = controlId.replace(/smv_/g, '');
        $('.' + imgConId).dblclick(function (event) {
            event.stopPropagation();
            event.preventDefault();
            window.parent.nsmart.hideCtrlTab();

            const $editable = $(this).find(".w-button-text span");
            $editable.on("mousedown", function (e) {
                e.stopImmediatePropagation();
            });
            $editable.prop('contenteditable', true)
                .focus()
                .css('border', '1px dashed currentColor')
                .one('blur', handleBlur)
                .on('keydown', function (e) {
                    if (e.keyCode === 13) { // 回车键
                        e.preventDefault();
                        $(this).blur();
                    }
                });
        });

        function handleBlur() {
            const $elem = $(this);
            $elem.prop('contenteditable', false);
            var smView = smartViewFactory.getSmartViewWithJobj($("#" + controlId));
            var text = $elem.text();
            smView.setData("Text", text, false, null);
            $elem.css('border', 'none');
        }
    }
});



var ImageSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'image', controlData);
    },
    _onResize: function (ui) {
        var width = ui.size.width;
        var height = ui.size.height;
        var originalWidth = ui.originalSize.width;
        var originalHeight = ui.originalSize.height;
        this._caculateSize(width, height, originalWidth, originalHeight, ui);
    },
    _caculateSize: function (width, height, originalWidth, originalHeight, ui) {
        var img = $('#img_' + this.controlId);
        var $control = $('#' + this.controlId);
        var box = $('#' + this.controlId).find('.w-image-box');
        var fillType = box.attr("data-fillType");
        var leftborder = YibuTrimPx(this.getCss("$border-left-width"));
        var realWidth = parseInt(width) - leftborder * 2;
        var realHeight = parseInt(height) - leftborder * 2;
        var smart = this;
        var hasCliped = this.controlData.Data.hasCliped;
        if (hasCliped === 'true') return;

        if (fillType == "2") {
            box.css({
                'width': parseInt(width) + "px",
                'height': parseInt(height) + "px"
            });
            img.css("width", "100%").css("height", "100%").css("margin", 0);
        } else if (fillType == "1") {
            var natureWidth;//原始宽度
            var natureHeight;//原始高度
            var vs;//图片宽高比
            natureWidth = img[0].naturalWidth;
            halfIntWidth = realWidth / 2;
            natureHeight = img[0].naturalHeight;
            halfIntHeight = realHeight / 2;
            vs = natureWidth / natureHeight;
            box.css({
                'width': parseInt(width) + "px",
                'height': parseInt(height) + "px"
            });
            //缩略图比例240:160(等于1.5)
            if (vs >= 1.5) {//横图则固定高度
                if (realWidth > realHeight * vs) {
                    $(img).css("width", realWidth + "px").css("height", "auto").css("marginTop", (halfIntHeight - (halfIntWidth * parseInt(natureHeight) / parseInt(natureWidth))) + "px").css("marginLeft", "0px");

                } else {
                    $(img).css("width", "auto").css("height", realHeight + "px").css("marginLeft", (halfIntWidth - (halfIntHeight * parseInt(natureWidth) / parseInt(natureHeight))) + "px").css("marginTop", "0px");
                }
            }
            else {
                if (realHeight > realWidth / vs) {
                    $(img).css("width", "auto").css("height", realHeight + "px").css("marginLeft", (halfIntWidth - (halfIntHeight * parseInt(natureWidth) / parseInt(natureHeight))) + "px").css("marginTop", "0px");
                } else {
                    $(img).css("width", realWidth + "px").css("height", "auto").css("marginTop", (halfIntHeight - (halfIntWidth * parseInt(natureHeight) / parseInt(natureWidth))) + "px").css("marginLeft", "0px");
                }
            }
        } else {
            
            var redirect = 'x';
            if (originalHeight === height) {
                redirect = "x";
            } else if (originalWidth === width) {
                redirect = "y";
            }
          
            if (ui) {
               redirect = $.data(ui.helper, 'redirect');
            }

            var dst = {};
            dst = img.FixFill(realWidth, realHeight, redirect);
            img.css({ 'height': dst.height, 'width': dst.width, 'margin': 0 });
            box.css({ 'height': dst.height, 'width': dst.width });
            var controlHeight = parseInt(dst.height);
            $control.css({ 'height': controlHeight, 'width': dst.width });
            if (typeof (ui) !== "undefined") {
                ui.size.width = dst.width;
                ui.size.height = dst.height;
            }
            var obj = {
                width: dst.width,
                height: controlHeight
            };

            smart.setWidthAndHeight(dst.width, controlHeight);
            return obj;
        }

    },
    _initClipData: function () {
        // 遮罩初始化
        var controlId = this.controlId;
        var smart = this;
        $("#" + controlId + " img").removeClass('imgCliped');
        smart.setData("ClipPictureData", "");
        smart.setData("hasCliped", "");
        //this.refresh();
    },
    startResize: function (event, ui) {
        this._super(event, ui);
        var redirect = 'x';
        var $target = $(event.originalEvent.target);
        if ($target.hasClass('ui-resizable-n') || $target.hasClass('ui-resizable-s')) {
            redirect = "y";
        }
        $.data(ui.helper, 'redirect', redirect);
    },
    onResize: function (event, ui) {
        this._onResize(ui);
        this._super(event, ui);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        $.removeData(ui.helper, 'redirect');
    },
    refresh: function () {
        this._caculateSize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    onSmartViewCreated: function (onCeatedParams) {
        //触发编辑控件快捷操作
        var controlId = this.controlId;
        var $control = $('#' + controlId);
        var style = $control.attr("cstyle");
        var smart = this;
        function imgInit(data) {
            $("#" + controlId + " img").attr("src", data[0].PicUrl);
            smart.setData("PictureId", data[0].PictureId, false, null);
            smart.setData("MimeType", data[0].MimeType, false, null);
            smart.setData("PictureTitle", data[0].PictureTitle, false, null);
            smart.setData("PictureUrl", data[0].PicUrl, false, null);
            window.parent.GetPictureInfo(data)
        }
        function firstLoadChangeWH(data) {
            // 初次选择图片

            var ChangeImageViewWH = function (data, nImg) {
                var width = nImg.width, height = nImg.height;
                var img = $('#img_' + controlId);
                var box = $control.find('.image-clip-wrap');

                if (width > 800 || height > 800) {
                    if (width > height) {
                        // 有小数，保存不上
                        height = parseInt(height / width * 800);
                        width = 800;
                    } else {
                        width = parseInt(width / height * 800);
                        height = 800;
                    }
                }
                //if (img[0].complete) {
                //    smart.setWidthAndHeight(width, height);
                //} else {
                //    img.load(function () {
                //        smart.setWidthAndHeight(width, height);
                //    });
                //}
                smart.setWidthAndHeight(width, height);
                img.css({ "width": width + "px", "height": height + "px", "margin": "0" });
                box.css({ "width": width + "px", "height": height + "px" });
                $control.css({ "width": width + "px", "height": height + "px" });

                // refresh AreaHeight
                var newH = parseInt($control.position().top + $control.height());
                var areaId = $control.attr('areaid');
                var pvid = $control.attr('pvid');
                var isNeedChangeArea = true;
                if (typeof (pvid) != 'undefined' && pvid !== '') {
                    isNeedChangeArea = false;
                }
                if (isNeedChangeArea) {
                    smart.changeAreaH(areaId, newH, true);
                }
            }

            if (data[0].Width && data[0].Height) {
                ChangeImageViewWH(data, {
                    width: data[0].Width,
                    height: data[0].Height,
                })
            } else {
                var nImg = new Image();
                nImg.src = data[0].PicUrl;
                nImg.onload = function () {
                    ChangeImageViewWH(data, nImg)
                }
            }


        }



        if (window.uploadImgFromPasteUrl) {
            var r = window.uploadImgFromPasteUrl;
            var initOption = [{
                PicUrl: r.url,
                PictureId: r.picture.Id,
                MimeType: r.picture.MimeType,
                PictureTitle: r.picture.Name,
                Width: r.picture.Width,
                Height: r.picture.Height,
            }]

            imgInit(initOption);
            if (style === 'Style1') {
                firstLoadChangeWH(initOption)
            }
            delete window.uploadImgFromPasteUrl
        } else if (onCeatedParams) {
            var r = onCeatedParams;
            var initOption = [{
                PicUrl: r.url,
                PictureId: r.picture.Id,
                MimeType: r.picture.MimeType,
                PictureTitle: r.picture.Name,
                Width: r.picture.Width,
                Height: r.picture.Height,
            }]

            imgInit(initOption);
            if (style === 'Style1') {
                firstLoadChangeWH(initOption)
            }
        } else {
            window.parent.ShowPictureDialog(1, function (data) {

                imgInit(data);

                if (style === 'Style1') {
                    firstLoadChangeWH(data)
                }
            });
        }

    },
    customFastSettingClick: function (type) {
        var controlId = this.controlId;
        var $control = $('#' + this.controlId);
        var smart = this;
        //$('#pcontrolId').val(me.controlId);
        //美图快捷操作
        if (type === 'xiuxiu') {
            var controlId = this.controlId;
            //美图快捷操作
            window.parent.ShowXiuXiu(controlId);
        } else if (type == "original") {

            //原图填充快捷操作
            var img = $('#img_' + this.controlId);

            // 遮罩初始化
            img.removeClass('imgCliped');
            smart.setData("ClipPictureData", "");
            smart.setData("hasCliped", "");

            var box = $('#' + this.controlId).find('.w-image-box');
            var width = img[0].naturalWidth;
            var height = img[0].naturalHeight;
            if (img.css('height') !== (height + "px") || img.css('width') !== (width + "px")) {
                smartViewFactory.storage.tempData = null;
                if (smartViewFactory.storage.deviceMode === 'Pc') {
                    window.parent.nsmart.hideCtrlTab();
                } else {
                    window.parent.nsmart.hideRightPanel();
                }
                smartViewFactory.beforeModify({ desc: "设置", controlType: $control.attr('ctype'), suffix: "为原图" });
            }
            img.css({ "width": width + "px", "height": height + "px", "margin": "0" });
            box.css({ "width": width + "px", "height": height + "px" });
            $control.css({ "width": width + "px", "height": height + "px" });
            this.setWidthAndHeight(width, height);
        }
        else if (type == "changeimg") {
            window.parent.ShowPictureDialog(1, this.customFastSettingImage, false, this);
        } else if (type === "mask") {
            console.log('enter mask', controlId);
            // 前进后退 --开始 
            smartViewFactory.backupPage2Temp({ desc: "设置", controlType: "单张图片", suffix: "遮罩" });

            window.gtag && gtag('event', 'event_image_mask', {
                'event_category': '图片遮罩-PC',
                'event_action': '点击遮罩按钮',
                'event_label': '图片遮罩'
            });
            // 关闭右侧面板
            if (smartViewFactory.storage.deviceMode === 'Pc') {
                window.parent.nsmart.hideCtrlTab();
            } else {
                window.parent.nsmart.hideRightPanel();
            }
            var $control = $('#' + this.controlId);
            var $maskImg = $('#img_' + controlId);
            var fillTypeValue = $control.find('.w-image-box').attr('data-filltype');
            if (!$(".pop_" + this.controlId).size()) {
                // oMaskClipTool
                window['oMaskClipTool'] = new clipImageFactory({
                    target: $control,
                    imgUrl: $maskImg.attr("src"),
                    controlID: smart.controlId,
                    fillType: fillTypeValue === '0' ? 'fixFill' : fillTypeValue === '1' ? 'cutFill' : 'pullFill',
                    parent: smart,
                    deviceType: 'PC'
                });
            };
            window['oMaskClipTool'].created();
        } else if (type === "radius") {
            //console.log("enter radius");

        } else if (type === "toastUI") {
            // 点击工具栏图片美化按钮
            var me = this;
            var img = $('#img_' + this.controlId);
            window.parent.$.ToastUI.ImageEditorOnClick(
                img.attr('src'),
                function (res) {
                    me.customFastSettingImage([{
                        PictureId: res.picture.Id,
                        MimeType: res.picture.MimeType,
                        PictureTitle: '',
                        PicUrl: res.url
                    }])
                }
            )
        }
    },
    customFastSettingImage: function (data) {
        if (window.parent && window.parent.wzAiHelp && window.parent.wzAiHelp.ui) {
            window.parent.wzAiHelp.removeGeneratingImg()
        }
        var me = this;
        var $control = $('#' + me.controlId);
        //$('#pcontrolId').val(me.controlId);
        var width = $control.width();
        var height = $control.height();
        var $img = $control.find('img');

        // 删除useCaman
        var useCaman = this.$control.data('useCaman');
        if (useCaman) {
            this.$control.data('useCaman', null);
            useCaman.destroy();
        }


        //debugger;
        //if (window.parent.GetPictureInfo && typeof window.parent.GetPictureInfo === 'function') {
        //    //debugger
        //    // 更新右侧面板数据
        //    //window.parent.GetPictureInfo(data);
        //    // 初始化图片遮罩层数据
        //    me.setData("ClipPictureData", "");
        //    me.setData("hasCliped", "");
        //    $img.removeClass('imgCliped').attr("src", data[0].PicUrl);
        //    me.setData("PictureId", data[0].PictureId, false);
        //    me.setData("MimeType", data[0].MimeType);
        //    me.setData("PictureTitle", data[0].PictureTitle);
        //    me.setData("PictureUrl", data[0].PicUrl);
        //} else {
        //debugger
        $img.removeClass('imgCliped').attr("src", data[0].PicUrl);
        me.setData("PictureId", data[0].PictureId, false);
        me.setData("MimeType", data[0].MimeType);
        // me.setData("PictureTitle", data[0].PictureTitle);
        me.setData("PictureUrl", data[0].PicUrl);
        me.setData("ClipPictureData", "");
        me.setData("hasCliped", "");

        // 修复裁剪方式 图片工具栏更换图片 样式bug
        if ($img[0].complete) {
            //setTimeout(function () {
            resetSize();
            //})

        } else {
            $img.load(function () {
                //setTimeout(function () {
                resetSize();
                //})
            });
        }
        function resetSize() {
            me._caculateSize(width, height, width, height);
            // refresh AreaHeight
            var newH = parseInt($control.position().top + $control.height());
            var areaId = $control.attr('areaid');
            var pvid = $control.attr('pvid');
            var isNeedChangeArea = true;
            if (typeof (pvid) != 'undefined' && pvid !== '') {
                isNeedChangeArea = false;
            }
            if (isNeedChangeArea) {
                me.changeAreaH(areaId, newH, true);
            }
        }
        //}

        if (smartViewFactory.storage.deviceMode === 'Pc') {
            window.parent.nsmart.hideCtrlTab();
        } else {
            window.parent.nsmart.hideRightPanel();
        }
    },
    imageFilter: function (cb) {
        if (window.parent && window.parent.wzAiHelp && window.parent.wzAiHelp.ui) {
            window.parent.wzAiHelp.removeGeneratingImg()
        }
        var useCaman = this.$control.data('useCaman');
        if (!useCaman) {
            useCaman = new UseCaman(decodeURIComponent(this.controlData.Data.PictureUrl), cb);
            this.$control.data('useCaman', useCaman);
        } else {
            // 更新图片
            useCaman.pictureUrl = decodeURIComponent(this.controlData.Data.PictureUrl);
            cb.call(useCaman)
        }
        // return useCaman;
    }
    //hasFilter: function () {
    //    var useCaman = this.$control.data('useCaman');
    //    return !!useCaman;
    //}
});

cnsmart.controlResMap["logoimage"] = "Logo图片";
var LogoImageSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'logoimage', controlData);
    },
    _onResize: function (ui) {
        var width = ui.size.width;
        var height = ui.size.height;
        var originalWidth = ui.originalSize.width;
        var originalHeight = ui.originalSize.height;
        this._caculateSize(width, height, originalWidth, originalHeight, ui);
    },
    //_caculateSize2: function (width, height, originalWidth, originalHeight, ui) {
    //    var img = $('#img_' + this.controlId);
    //    var $control = $('#' + this.controlId);
    //    var box = $('#' + this.controlId).find('.w-image-box');
    //    var fillType = box.attr("data-fillType");
    //    var leftborder = YibuTrimPx(this.getCss("$border-left-width"));
    //    var realWidth = parseInt(width) - leftborder * 2;
    //    var realHeight = parseInt(height) - leftborder * 2
    //    if (fillType == "2") {
    //        box.css({
    //            'width': parseInt(width) + "px",
    //            'height': parseInt(height) + "px"
    //        });
    //        img.css("width", "100%").css("height", "100%").css("margin", 0);
    //    } else if (fillType == "1") {
    //        var natureWidth;//原始宽度
    //        var natureHeight;//原始高度
    //        var vs;//图片宽高比
    //        natureWidth = img[0].naturalWidth;
    //        halfIntWidth = realWidth / 2;
    //        natureHeight = img[0].naturalHeight;
    //        halfIntHeight = realHeight / 2;
    //        vs = natureWidth / natureHeight;
    //        box.css({
    //            'width': parseInt(width) + "px",
    //            'height': parseInt(height) + "px"
    //        });
    //        //缩略图比例240:160(等于1.5)
    //        if (vs >= 1.5) {//横图则固定高度
    //            if (realWidth > realHeight * vs) {
    //                $(img).css("width", realWidth + "px").css("height", "auto").css("marginTop", (halfIntHeight - (halfIntWidth * parseInt(natureHeight) / parseInt(natureWidth))) + "px").css("marginLeft", "0px");

    //            } else {
    //                $(img).css("width", "auto").css("height", realHeight + "px").css("marginLeft", (halfIntWidth - (halfIntHeight * parseInt(natureWidth) / parseInt(natureHeight))) + "px").css("marginTop", "0px");
    //            }
    //        }
    //        else {
    //            if (realHeight > realWidth / vs) {
    //                $(img).css("width", "auto").css("height", realHeight + "px").css("marginLeft", (halfIntWidth - (halfIntHeight * parseInt(natureWidth) / parseInt(natureHeight))) + "px").css("marginTop", "0px");
    //            } else {
    //                $(img).css("width", realWidth + "px").css("height", "auto").css("marginTop", (halfIntHeight - (halfIntWidth * parseInt(natureHeight) / parseInt(natureWidth))) + "px").css("marginLeft", "0px");
    //            }
    //        }
    //    } else {
    //        var redirect = 'x';
    //        if (originalHeight === height) {
    //            redirect = "x";
    //        } else if (originalWidth === width) {
    //            redirect = "y";
    //        }
    //        var dst = {};
    //        dst = img.FixFill(realWidth, realHeight, redirect);
    //        img.css({ 'height': dst.height, 'width': dst.width, 'margin': 0 });
    //        box.css({ 'height': dst.height, 'width': dst.width });
    //        var controlHeight = parseInt(dst.height);
    //        $control.css({ 'height': controlHeight, 'width': dst.width });
    //        if (typeof (ui) !== "undefined") {
    //            ui.size.width = dst.width;
    //            ui.size.height = dst.height;
    //        }
    //        var obj = {
    //            width: dst.width,
    //            height: controlHeight
    //        };
    //        return obj;
    //    }
    //},
    _caculateSize: function (width, height, originalWidth, originalHeight, ui) {
        var $control = this.$control;
        var $box = $control.find('.w-image-box');
        var $img = $control.find('#img_' + this.controlId);

        var fillType = $box.attr("data-fillType");
        var sizeStyle = {
            'width': parseInt(width) + "px",
            'height': parseInt(height) + "px"
        }
        $box.css(sizeStyle);
        $img.css(sizeStyle)

        // 裁剪填充
        if (fillType == "1") {
            $img.css({
                'object-fit': 'cover',
                'object-osition': 'initial'
            })
            // img.style.objectFit = 'cover'
        } else if (fillType == "2") {
            $img.css({
                'object-fit': 'fill',
                'object-osition': 'initial'
            })
        } else {
            $img.css({
                'object-fit': 'contain',
                'object-position': 'left'
            })
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    //onSmartViewCreated: function () {
    //    //触发编辑控件快捷操作
    //    var controlId = this.controlId;
    //    var smart = this;
    //    window.parent.ShowPictureDialog(1, function (data) {
    //        $("#" + controlId + " img").attr("src", data[0].PicUrl);
    //        smart.setData("PictureId", data[0].PictureId, false, null);
    //        smart.setData("MimeType", data[0].MimeType, false, null);
    //        smart.setData("PictureTitle", data[0].PictureTitle, false, null);
    //        smart.setData("PictureUrl", data[0].PicUrl, false, null);
    //    });
    //},
    customFastSettingClick: function (type) {
        var controlId = this.controlId;
        //美图快捷操作
        if (type === 'xiuxiu') {
            //美图快捷操作
            window.parent.ShowXiuXiu(controlId);
        } else if (type === "original") {
            //原图填充快捷操作
            var img = $('#img_' + this.controlId);
            var $control = $('#' + this.controlId);
            var box = $('#' + this.controlId).find('.w-image-box');
            var width = img[0].naturalWidth;
            var height = img[0].naturalHeight;
            if (img.css('height') !== (height + "px") || img.css('width') !== (width + "px")) {
                smartViewFactory.storage.tempData = null;
                if (smartViewFactory.storage.deviceMode === 'Pc') {
                    window.parent.nsmart.hideCtrlTab();
                } else {
                    window.parent.nsmart.hideRightPanel();
                }
                smartViewFactory.beforeModify({ desc: "设置", controlType: $control.attr('ctype'), suffix: "为原图" });
            }
            img.css({ "width": width + "px", "height": height + "px", "margin": "0" });
            box.css({ "width": width + "px", "height": height + "px" });
            $control.css({ "width": width + "px", "height": height + "px" });
            this.setWidth(width);
            this.setHeight(height);
        }
        else if (type === "changeimg") {
            window.parent.ShowPictureDialog(1, this.customFastSettingImage, false, this);
        }
        else if (type === "toastUI") {
            // 点击工具栏图片美化按钮
            var me = this;
            var img = $('#img_' + this.controlId);
            window.parent.$.ToastUI.ImageEditorOnClick(
                img.attr('src'),
                function (res) {
                    me.customFastSettingImage([{
                        PictureId: res.picture.Id,
                        MimeType: res.picture.MimeType,
                        PictureTitle: '',
                        PicUrl: res.url
                    }])
                }
            )
        }
    },
    customFastSettingImage: function (data) {
        var me = this;
        var $control = $('#' + me.controlId);
        var $img = $control.find('img');
        $img.attr("src", data[0].PicUrl);
        me.setData("PictureId", data[0].PictureId, false);
        me.setData("MimeType", data[0].MimeType);
        me.setData("PictureTitle", data[0].PictureTitle);
        me.setData("PictureUrl", data[0].PicUrl);
    }
});

var LineSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'line', controlData);
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height)

        this._super(event, ui);
    },
    _onResize: function (width, height) {
        var line = $('#' + this.controlId).find('.w-line');
        var lineType = line.attr('linetype');
        if ('horizontal' == lineType) {
            line.css({ 'width': width + "px" });
        } else {
            line.css({ 'height': height + "px" });
        }
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});


var TextSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'text', controlData);
    },
    refreshView: function (callback) {
        // 重写refreshView方法，调用后选取就找不到了，影响AI获取选取
        var $this = this;
        var newCallback = function () {
            callback && callback();
            // 如果CKEditor已经实例化 直接修改DOM导致CKEditor 缓存报错, 清空选区
            var editor = $this.getCKEditor();
            if (editor) {
                //editor.getSelection().removeAllRanges();
                editor.destroy();

            }
        }
        this._super(newCallback);
    },
    disableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", true);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.disableParentDrag(pvid);
        }
    },
    enableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", false);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.enableParentDrag(pvid);
        }
    },
    //disableEditcontentFlag: function () {
    //    var editConId = this.controlId;
    //    editConId = editConId.replace(/smv_/g, '');
    //    editConId = 'txtc_' + editConId;
    //    $('#' + editConId).addClass('ai-editcontent-disable');
    //    $('#' + editConId).mousedown(function (event) {
    //        event.stopPropagation();
    //    });
    //},
    //enableEditcontentFlag: function () {
    //    var editConId = this.controlId;
    //    editConId = editConId.replace(/smv_/g, '');
    //    editConId = 'txtc_' + editConId;
    //    $('#' + editConId).removeClass('ai-editcontent-disable');
    //},
    destroyCKEditor: function () {
        var editConId = this.controlId.replace(/smv_/g, '');
        editConId = 'txtc_' + editConId;
        if (CKEDITOR.instances[editConId]) {
            CKEDITOR.instances[editConId].destroy();
        }
    },
    getCKEditor: function () {
        var editConId = this.controlId.replace(/smv_/g, '');
        editConId = 'txtc_' + editConId;
        if (CKEDITOR.instances[editConId]) {
            return CKEDITOR.instances[editConId];
        }
    },
    bindCustomEvents: function () {
        var style = this.$control.attr("cstyle");
        var editConId = this.controlId;
        editConId = editConId.replace(/smv_/g, '');
        var textAreaId = 'txtd_' + editConId;
        editConId = 'txtc_' + editConId;
        CKEDITOR.config.title = false;
        CKEDITOR.disableAutoInline = true;


        var currentHtml = "";
        $('#' + editConId).click(function (event) {
            currentHtml = $(event.currentTarget).html().trim();
        });
        $('#' + editConId).dblclick(function (event) {

            // AI小梦
            //if ($(this).hasClass('ai-editcontent-disable')) return;

            // 文本控件粘贴时会把控件粘贴上
            smartViewFactory.clearCopyCache();

            if (smartViewFactory.storage.tempData == null) {
                smartViewFactory.backupPage2Temp({ desc: "编辑", controlType: 'text', ctrlId: editConId });
            }
            var txtControlId = 'smv_' + $(this).attr('id').replace(/txtc_/g, '');
            var txtView = smartViewFactory.getSmartView(txtControlId, 'text');
            txtView.disableDrag();
            txtView.$control.data('inlinedbc', 1);
            var pvid = txtView.$control.attr('pvid');
            if (pvid !== '') {
                txtView.disableParentDrag(pvid);
            }
            $('body').enableSelection();
            var $this = $(this);
            var $cedit = $this.attr('contenteditable', true);


            if (!CKEDITOR.instances[editConId]) {
                var editor;
                if (style == "Style2") {
                    editor = CKEDITOR.inline(editConId,
                        {
                            toolbar: [],
                            allowedContent: ['span'],
                            extraAllowedContent: ['span'],
                            enableContextMenu: false,
                            toolbarCanCollapse: false,
                            enterMode: CKEDITOR.ENTER_BR,
                            on: {
                                change: function (event) {
                                    window.gtag && gtag('event', 'event_text_change', {
                                        'event_category': '文字控件',
                                        'event_action': '编辑',
                                        'event_label': '文字控件-PC'
                                    });
                                    $this.contents().each(function (index, item) {
                                        if (item.nodeName == '#text') {
                                            $(this).wrap('<span></span>')
                                        }
                                    })
                                },
                                blur: function (event) {
                                    var htmlAfterModify = $this.html().trim();
                                    if (currentHtml === htmlAfterModify || ("<p>" + currentHtml + "</p>" === htmlAfterModify)) {
                                        smartViewFactory.storage.tempData = null;
                                    }
                                    var data = event.editor.getData();
                                    var editorName = event.editor.name;
                                    var txtControlId = 'smv_' + editorName.replace(/txtc_/g, '');
                                    var wrapperView = smartViewFactory.getSmartView(txtControlId, 'text');
                                    wrapperView.setData("Content", data, false, null);
                                    wrapperView.$control.removeData('inlinedbc');
                                    //赋值给编辑面板
                                    if (window.parent.control_text_editPanel_editor != undefined && $("#pcontrolId", window.parent.document).val() == txtControlId) {
                                        // 如果AI正在修改，就不调用右侧面板, 右侧面板直接修改DOM导致选区丢失
                                        if (window.parent.wzAiHelp && window.parent.wzAiHelp.status === 'normal') {
                                            window.parent.control_text_editPanel_editor.setData(data);
                                        } else {
                                            console.log('忽略');
                                        }
                                    }
                                    wrapperView.enableDrag();
                                    var pvid = wrapperView.$control.attr('pvid');
                                    if (pvid !== '') {
                                        wrapperView.enableParentDrag(pvid);
                                    }
                                    $cedit.attr('contenteditable', false);

                                    setTimeout(function () {
                                        CKEDITOR.instances[editorName].destroy(true);
                                    });

                                    txtView.$control.contextMenu(true)

                                },
                                instanceReady: function (event) {
                                    $(this).focus();
                                    $(document.body).enableSelection();
                                    $('#cke_' + editConId).hide()

                                    txtView.$control.contextMenu(false)
                                },
                            },
                            // Allow some non-standard markup that we used in the introduction.
                            extraAllowedContent: 'a(documentation);abbr[title];code',
                            extraPlugins: 'image,lineheight,letterspacing,myColorbutton,myColordialog',
                            removePlugins: 'colorbutton,colordialog',
                            // Show toolbar on startup (optional).
                            startupFocus: true
                        });
                } else {
                    editor = CKEDITOR.inline(editConId,
                        {
                            // customConfig: '/config.js', //dev
                            toolbar: [//dev
                                { name: 'styles', items: ['Format',] },//dev
                                { name: 'styles', items: ['Font', 'FontSize'] },//dev
                                { name: 'colors', items: ['TextColor', 'BGColor'] },//dev
                                { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', "-", 'CopyFormatting', 'RemoveFormat', '-'] },//dev
                                '/',//dev
                                { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'lineheight', 'letterspacing'] },//dev
                                // { name: 'insert', items: ['ScdImage', 'Smiley'] },//dev
                                { name: 'insert', items: ['Smiley'] },//dev
                                { name: 'links', items: ['Link', 'Unlink', 'Anchor', 'Table'] },//dev
                                { name: 'tools', items: ['Fullpage'] }//dev
                            ],
                            on: {
                                change: function (event) {
                                    window.gtag && gtag('event', 'event_text_change', {
                                        'event_category': '文字控件',
                                        'event_action': '编辑',
                                        'event_label': '文字控件-PC'
                                    });
                                },
                                blur: function (event) {
                                    var htmlAfterModify = $this.html().trim();
                                    if (currentHtml === htmlAfterModify || ("<p>" + currentHtml + "</p>" === htmlAfterModify)) {
                                        smartViewFactory.storage.tempData = null;
                                    }
                                    var data = event.editor.getData();
                                    var editorName = event.editor.name;
                                    var txtControlId = 'smv_' + editorName.replace(/txtc_/g, '');
                                    var wrapperView = smartViewFactory.getSmartView(txtControlId, 'text');
                                    wrapperView.setData("Content", data, false, null);
                                    wrapperView.$control.removeData('inlinedbc');
                                    //赋值给编辑面板
                                    if (window.parent.control_text_editPanel_editor != undefined && $("#pcontrolId", window.parent.document).val() == txtControlId) {
                                        // 如果AI正在修改，就不调用右侧面板, 右侧面板直接修改DOM导致选区丢失
                                        if (window.parent.wzAiHelp && window.parent.wzAiHelp.status === 'normal') {
                                            window.parent.control_text_editPanel_editor.setData(data);
                                        } else {
                                            console.log('忽略');
                                        }
                                    }
                                    wrapperView.enableDrag();
                                    var pvid = wrapperView.$control.attr('pvid');
                                    if (pvid !== '') {
                                        wrapperView.enableParentDrag(pvid);
                                    }
                                    $cedit.attr('contenteditable', false);

                                    setTimeout(function () {
                                        console.log(editorName, "000")
                                        CKEDITOR.instances[editorName].focusManager.blur(true);
                                        CKEDITOR.instances[editorName].getSelection().removeAllRanges()
                                        CKEDITOR.instances[editorName].destroy(true);
                                        console.log(CKEDITOR.instances, "CKEDITOR.instances")
                                    });

                                    txtView.$control.contextMenu(true)

                                },
                                instanceReady: function (event) {
                                    $(this).focus();
                                    $(document.body).enableSelection();

                                    txtView.$control.contextMenu(false)
                                },
                            },
                            // Allow some non-standard markup that we used in the introduction.
                            extraAllowedContent: 'a(documentation);abbr[title];code;span{letter-spacing}',
                            extraPlugins: 'image,lineheight,letterspacing,myColorbutton,myColordialog,scdimage,fullpage',//dev
                            removePlugins: 'colorbutton,colordialog',
                            // Show toolbar on startup (optional).
                            startupFocus: true,
                            // forcePasteAsPlainText: true
                            // fontSize_defaultLabel: '20'
                        });
                    editor.on('paste', function (evt) {
                        // DEMO
                        var orginText = $(evt.editor.getData()).text().trim();

                        if (orginText.length != 0) {
                            var text = evt.data.dataTransfer.getData('text/plain')
                            evt.data.type = 'text';
                            evt.data.dataValue = text;
                        }

                    })
                }

                //editor.on('blur', function (evt) {
                //    // AI小梦
                //    window.parent.wzAiHelp.currentSelection = {
                //        type: 'editor',
                //        id: controlId,
                //        selection: evt.editor.getSelection(),
                //        editor: editor
                //    }

                //     window.parent.wzAiHelp.aiHelp?.aihelper

                //})
            }
            if (style == "Style2") {
                $('#cke_' + editConId).hide()
            }

            hideConFastPropPanel();
            window.parent.nsmart.hideCtrlTab()
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    }
});

cnsmart.controlResMap["banner"] = "自适应布局";
var BannerSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'banner', controlData);
    },
    smPositionCallBack: function (pt) {
        var fs = this.$control.find(">.yibuFrameContent>.w-banner>.fullcolumn-outer");
        if (fs.length > 0) {
            switch (pt) {
                case "absolute":
                    fs.css("left", "");
                    fs.fullScreen();
                    break;
                case "fixed":
                    break;
                // 选中上下
                default:
                    fs.css("left", "");
                    break;
            }
        }
    }
});


cnsmart.controlResMap["area"] = "容器";
var AreaSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'area', controlData);
    }
});

cnsmart.controlResMap["browserdevice"] = "终端切换";
var BrowserDeviceSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'browserdevice', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("height", height + "px");
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-pcmonile").height();
            var width = this.$control.find(".w-pcmonile").width();
            this._onResize(width, height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

var LanguagesSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'languages', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find(".w-language").css("width", width);
        if (this.$control.attr("cstyle") != "Style3") {
            this.$control.find(".w-language .w-language-inner").css({ "height": height, "line-height": height + "px" });
            this.$control.find(".w-language a").css({ "height": height, "line-height": height + "px" });
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

var SearchSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'search', controlData);
    },
    _onResize: function (width, height) {
        var style = this.$control.attr("cstyle");

        if (style == "Style1") {
            var inputtopborder = YibuTrimPx(this.getCss("$input-border-width"));
            var selecttopborder = YibuTrimPx(this.getCss("$select-border-width"));
            var btntopborder = YibuTrimPx(this.getCss("$btn-border-width"));
            var inputrealHeight = parseInt(height) - parseInt(inputtopborder) * 2;
            var selectrealHeight = parseInt(height) - parseInt(selecttopborder) * 2;
            var btnrealHeight = parseInt(height) - parseInt(btntopborder) * 2;
            var realHeight = Math.max(inputrealHeight, selectrealHeight, btnrealHeight)
            this.$control.find(".w-search").css({ "width": width, "height": realHeight });
            this.$control.find(".w-search .w-search-btn").css({ "height": btnrealHeight, "line-height": btnrealHeight + "px" });
            this.$control.find(".w-search .w-select .w-select-btn").css({ "height": selectrealHeight, "line-height": selectrealHeight + "px" });
            this.$control.find(".w-search .w-select .w-select-dropdow-item").css({ "height": selectrealHeight, "line-height": selectrealHeight + "px" });
            this.$control.find(".w-search .w-search-inner").css({ "height": inputrealHeight, "line-height": inputrealHeight + "px" });
            var inputHeight = this.$control.find(".w-search .w-search-inner").height();
            var fontHeight = +this.$control.find(".w-search-inner input").css('fontSize').replace('px', '') + 6;
            this.$control.find(".w-search-inner input").css({ height: fontHeight, lineHeight: fontHeight + 'px', marginTop: (inputHeight - fontHeight) / 2 });
        }
        else if (style == "Style2") {
            var topborder = YibuTrimPx(this.getCss("$input-border-width"));
            var realHeight = parseInt(height) - parseInt(topborder) * 2;
            this.$control.find(".w-search").css({ "width": width, "height": realHeight });
            this.$control.find(".w-search .w-search-main").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-search .w-search-btn").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-search .w-search-inner").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-search .w-searchkey .w-searchkey-item").css({ "height": realHeight, "line-height": realHeight + "px" });
            var inputHeight = this.$control.find(".w-search .w-search-inner").height();
            var fontHeight = +this.$control.find(".w-search-inner input").css('fontSize').replace('px', '') + 6;
            this.$control.find(".w-search-inner input").css({ height: fontHeight, lineHeight: fontHeight + 'px', marginTop: (inputHeight - fontHeight) / 2 });
        }
        else if (style == "Style3") {
            var topborder = YibuTrimPx(this.getCss("$input-border-width"));
            var realHeight = parseInt(height) - parseInt(topborder) * 2;
            this.$control.find(".w-search").css({ "width": width, "height": realHeight });
            this.$control.find(".w-search .w-search-btn").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-search .w-search-inner").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-search .w-select .w-select-btn").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-search .w-select .w-select-dropdow-item").css({ "height": selectrealHeight, "line-height": selectrealHeight + "px" });
            var inputHeight = this.$control.find(".w-search .w-search-inner").height();
            var fontHeight = +this.$control.find(".w-search-inner input").css('fontSize').replace('px', '') + 6;
            this.$control.find(".w-search-inner input").css({ height: fontHeight, lineHeight: fontHeight + 'px', marginTop: (inputHeight - fontHeight) / 2 });
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

var QrCodeSmartViewResizeObject = "none";
var QrCodeSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'qrcode', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css({ 'width': width + "px", 'height': height + "px" });
        this.$control.find('.w-qrcode').css({ 'width': width + "px", 'height': height + "px" });
        this.$control.find('.w-qrcode img').css({ 'width': width + "px", 'height': height + "px" });
    },
    onResize: function (event, ui) {
        if (QrCodeSmartViewResizeObject == "none") {
            var xchangenum = Math.abs(ui.originalSize.width - ui.size.width);
            var ychangenum = Math.abs(ui.originalSize.height - ui.size.height);
            if (xchangenum - ychangenum > 0) {
                QrCodeSmartViewResizeObject = "x";
            } else {
                QrCodeSmartViewResizeObject = "y";
            }
        }
        switch (QrCodeSmartViewResizeObject) {
            case "x":
                ui.size.height = ui.size.width;
                break;
            case "y":
                ui.size.width = ui.size.height;
                break;
        }
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    stopResize: function (event, ui) {
        QrCodeSmartViewResizeObject = "none";
        this._super(event, ui);
        this.refreshView();
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        this.refreshView();
    },
    onSmartViewThemeChanged: function () {
        this.refreshView();
    }
});

var CodeSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'code', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-code').css({ 'width': width + "px", 'height': height + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["video"] = "视频";
var VideoSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'video', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-video').css({ 'width': width + "px", 'height': height + "px", 'line-height': height + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

var SlideSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'slide', controlData);
    },
    _stopResize: function (width, height) {
        var style = this.$control.attr("cstyle");
        if (style == "Style3" || style == "Style5") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
            var thumListHeight = 0;
            var bigImgHeight = 0;
            //计算大图高度
            if (style == "Style3") {
                thumListHeight = $('#' + this.controlId).find(".w-thumblist").height();
                var bigImgHeight = parseInt(height) - thumListHeight;
                this.setCss("$thumbList-width", parseInt(width) - 84 + "px", null);
            } else {
                var thunHeight = $('#' + this.controlId).find(".w-thumb-t").height();
                thumListHeight = 20;
                var bigImgHeight = parseInt(height) - thumListHeight - thunHeight;
            }
            this.setCss("$bigImg-height", bigImgHeight + "px", null);
        } else if (style == "Style1") {
            this.setCss("$Img-height", height + "px", null);
        } else if (style == "Style4") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
        } else if (style == "Style6") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
        } else if (style == "Style7") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
        }
        this.refreshCss();
        this.refreshView();
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._stopResize(ui.size.width, ui.size.height);
    },
    refresh: function () {
        this._stopResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["slideset"] = "多图轮播";
var SlideSetSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'slideset', controlData);
    },
    _stopResize: function (width, height) {
        var style = this.$control.attr("cstyle");
        this.setCss("$slideset-height", height + "px", null);
        if (style == "Style2" || style == "Style4") {
            this.setCss("$slideset-width", width + "px", null);
        }
        //拖动后返回当前屏幕
        var controlId = this.controlId;
        var curPage = $("#" + controlId + " .page").html();
        this.refreshCss();
        this.refreshView();

        setTimeout(function () {
            var slide = $("#" + controlId).data('jssor_slide');
            slide.$GoTo(parseInt(curPage) - 1);
            $("#" + controlId + " .page").html(curPage);
            var $curBox = $("#" + controlId).find(".w-slide-inner:last .content-box:eq(" + (parseInt(curPage) - 1) + ")");
            $curBox.find(".smAreaC").css("display", "block");
            $curBox.find(".animated").css("opacity", 1);
        }, 280);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._stopResize(ui.size.width, ui.size.height);
    },
    refresh: function () {
        this._stopResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    smPositionCallBack: function (pt) {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style1":
            case "Style3":
                this._smPositionCallBack(pt);
                break;
            case "Style2":
            case "Style4":
                break;
        }
    },
    _smPositionCallBack: function (pt) {
        var fs = this.$control.find(">.yibuFrameContent>.w-slide");
        if (fs.length > 0) {
            switch (pt) {
                case "absolute":
                    fs.css({ "left": "", "width": "" });
                    fs.fullScreen();
                    break;
                case "fixed":
                    break;
                // 选中上下
                default:
                    fs.css("left", "");
                    break;
            }
        }
    }
});


cnsmart.controlResMap["fullpageSlide"] = "多图轮播（可加视频）";
var FullpageSlideSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'fullpageSlide', controlData);
    },
    _stopResize: function (width, height) {
        var style = this.$control.attr("cstyle");
        this.setCss("$slideset-height", height + "px", null);
        if (style == "Style2" || style == "Style4") {
            this.setCss("$slideset-width", width + "px", null);
        }
        //拖动后返回当前屏幕
        var controlId = this.controlId;
        var curPage = $("#" + controlId + " .page").html();
        this.refreshCss();
        this.refreshView();

        setTimeout(function () {
            var slide = $("#" + controlId).data('jssor_slide');
            slide.$GoTo(parseInt(curPage) - 1);
            $("#" + controlId + " .page").html(curPage);
            var $curBox = $("#" + controlId).find(".w-slide-inner:last .content-box:eq(" + (parseInt(curPage) - 1) + ")");
            $curBox.find(".smAreaC").css("display", "block");
            $curBox.find(".animated").css("opacity", 1);
        }, 280);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._stopResize(ui.size.width, ui.size.height);
    },
    refresh: function () {
        this._stopResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    smPositionCallBack: function (pt) {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style1":
            case "Style3":
                this._smPositionCallBack(pt);
                break;
            case "Style2":
            case "Style4":
                break;
        }
    },
    _smPositionCallBack: function (pt) {
        var fs = this.$control.find(">.yibuFrameContent>.w-slide");
        if (fs.length > 0) {
            switch (pt) {
                case "absolute":
                    fs.css({ "left": "", "width": "" });
                    fs.fullScreen();
                    break;
                case "fixed":
                    break;
                // 选中上下
                default:
                    fs.css("left", "");
                    break;
            }
        }
    }
});



cnsmart.controlResMap["flexiblePanel"] = "折叠面板";
var FlexiblePanelSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'flexiblePanel', controlData);
        // this.itemResizable();
        //debugger // refreshView
    },
    refreshView: function (callback) {
        this.clearEffect();
        this._super(callback);
    },
    //startResize: function (event, ui) {
    //    this.clearEffect();
    //    this._super(event, ui);
    //},
    onResize: function (event, ui) {
        //this._refresh(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        //this._refresh(ui.size.width, ui.size.height, true);
    },
    onContainerStopResize: function (event, ui) {
        var areaId = ui.element.parents(".w-label-item").attr("data-area");
        var listData = this.controlData.ListData;
        $.each(listData, function (index, value) {
            if (value.ItemId == areaId) {
                value.ContentHeight = ui.size.height;
            }
        })
        this.setListData("ListData", listData, false, null);
        ui.element.width("100%");
        var height = this.$control.find(".w-label").height();
        // this.$control.height(height);
        var origh = this.$control.attr("origh") || this._getControlHeight();
        this.$control.smrecompute("recomputeTo", parseInt(origh));
        this.$control.smrecompute("recomputeTo", height);
        //smartViewFactory.changeSmartViewData(this.controlId, "ListData", listData, false, null);


    },
    _refresh: function (width, height, isStop) {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style1":
                this._dorefreshStyle1(width, height);
                break;
            default:
        }
    },
    _dorefreshStyle1: function (width, height) {
        //var height = this.$control.find(".w-label").height();
        //this.setCss("$height", height + "px", null);
        //this.$control.height(height);
    },
    _getControlHeight: function () {
        var navList = this.controlData.ListData;
        var length = navList.length > 0 ? navList.length : 3;
        var lineHeight = YibuTrimPx(this.getCss("$title-line-height"));
        var borderTopWidth = YibuTrimPx(this.getCss("$title-border-top-width"));
        var borderBottomWidth = YibuTrimPx(this.getCss("$title-border-bottom-width"));
        var titlePaddingTop = YibuTrimPx(this.getCss("$title-padding-top"));
        var height = length * (lineHeight + borderBottomWidth + titlePaddingTop * 2) + borderTopWidth;
        return parseInt(height);
    },
    _recoverControlHeight: function () {
        var data = this.$control.data("smart.remcopute");
        if (data) {
            this.$control.find(".w-label-item.current").removeClass("current")
                .find(">.w-label-content").hide();
            //var height = this.getControlHeight();
            this.$control.smrecompute("recomputeTo", parseInt(this.$control.attr("origh")));
            this.$control.data("smart.remcopute", null);
            $(".expandFlag").removeClass("expandFlag");
        }
        this.setHeight(this._getControlHeight());
        //this.setCss('height', parseInt(height, 10), null);
        //this.setDataV2('height', parseInt(height, 10), false, null);
        //this.$control.height(height);
    },
    refresh: function () {
        this._refresh(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    fixControlPosition: function (pp) {
        //var style = this.$control.attr('cstyle');
        //switch (style) {
        //    case 'Style1':
        //}
        if (typeof pp.target !== 'undefined' && pp.target != null) {
            var current = this.$control.children().children().children('.w-label-item.current').children(".w-label-content");
            if (current.length == 1) {
                pp.y += parseInt(current.position().top);
            }
        }
    },
    onSmartViewDeleted: function () {
        this.clearEffect();
        this._super();
    },
    clearEffect: function () {
        this._recoverControlHeight();
    },
});


cnsmart.controlResMap["leaveword"] = "留言";
var LeavewordSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'leaveword', controlData);
    },
    _onResize: function (width, height) {
        if (this.$control.attr("cstyle") == "Style3") {
            this.$control.find(".w-guestbook-table").css("width", width);
        }
        if (this.$control.attr("cstyle") == "Style6") {
            this.$control.find(".w-guestbook").css("width", width);
            this.$control.css("width", width);
            this.$control.find(".w-guestbook").css("height", height);
        }
    },
    onResize: function (event, ui) {
        var uiwidth = ui.size.width;
        var min_width = parseInt(this.$control.find(".w-guestbook").css("min-width"));
        var currentWidth = this.$control.find(".w-guestbook-both-left").outerWidth() + parseInt(this.$control.find(".w-item-textarea").css("min-width")) + 10;
        if (uiwidth < min_width) {
            if (min_width < currentWidth) {
                ui.size.width = currentWidth;
            } else {
                ui.size.width = min_width;
            }
        } else if (uiwidth < currentWidth) {
            ui.size.width = currentWidth;
        }
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            if (this.$control.attr("cstyle") == "Style3") {
                var height = this.$control.find(".w-guestbook-table").height();
                var width = this.$control.find(".w-guestbook-table").width();
            }
            else {
                var height = this.$control.find(".w-guestbook").height();
                var width = this.$control.find(".w-guestbook").width();
            }
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

var NavSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'nav', controlData);
    },
    _onResize: function (width, height) {
        var nav = $('#' + this.controlId).find('.w-nav');
        var navItem = nav.find('li.w-nav-inner');//导航每一个li子项
        var navInnerDiv = nav.find('li.w-nav-inner > div.w-nav-item');//导航每一个li子项内div
        var navA = nav.find('a.w-nav-item-link');//导航内的a标签
        var navItemSliding = nav.find('li.sliding-box');//导航滑块li
        var navItemInnerSliding = nav.find('li.sliding-box>div'); //导航滑块li内div
        var navChildUl = nav.find('ul.w-subnav');//子导航ul
        var navChildLi = navChildUl.find('li.w-subnav-item');//子导航li
        var navChildLiA = navChildLi.find('a.w-subnav-link');

        var navStyle = nav.attr('navstyle');
        var itemCount = navItem.length;
        var leftborder = YibuTrimPx(this.getCss("$nav-border-left-width"));
        var rightborder = YibuTrimPx(this.getCss("$nav-border-right-width"));
        var topborder = YibuTrimPx(this.getCss("$nav-border-top-width"));
        var bottomborder = YibuTrimPx(this.getCss("$nav-border-bottom-width"));
        var rightborderstyle = this.getCss("$nav-border-right-style");
        //style7是根据文字自适应宽度的，不需要拉宽
        if (navStyle == 'style7') {
            nav.css({
                'height': height - topborder - bottomborder + "px",
                'width': ''
            });
        } else if (navStyle == 'style2') {
            nav.css({
                'width': width + "px",
                'height': height - 20 + "px"
            });
        } else if (navStyle == 'style3' || navStyle == 'style4' || navStyle == 'style9' || navStyle == 'style10' || navStyle == 'style13') {
            nav.css({
                'width': width + "px",
                'height': height + "px"
            });
        } else {
            nav.css({
                'width': width - leftborder - rightborder + "px",
                'height': height - topborder - bottomborder + "px"
            });
        }

        var childItemHeight = 'auto';
        var oldChildItemHeight = this.getCss("$subnav-height").replace('px', '').replace('px', '');
        if (oldChildItemHeight == "auto") {
            //取一级导航的值，注意不能取scss值，要取行业样式的值，因为scss值在拖动后已经不正确了
            //childItemHeight = this.getCss("$height").replace('px', '');
            childItemHeight = this.$control.find('li.w-nav-inner').css("height").replace('px', '');
        } else {
            childItemHeight = oldChildItemHeight;
        }
        navChildLiA.css({
            'height': childItemHeight + 'px',
            'line-height': childItemHeight + 'px',
        });

        //横向导航
        if (navStyle == 'style1' || navStyle == 'style2' || navStyle == 'style3' || navStyle == 'style4'
            || navStyle == 'style5' || navStyle == 'style6' || navStyle == 'style7' || navStyle == 'style13') {
            var itemWidth = width / itemCount;

            if (navStyle == 'style2') {
                //nav.css({
                //    'height': itemHeight + "px",
                //    'line-height': itemHeight + "px"
                //});
                $('#' + this.controlId).css({
                    'height': parseInt(height) + "px",
                });
                navInnerDiv.css({
                    'height': height - 20 - topborder - bottomborder + "px",
                    'line-height': height - 20 - topborder - bottomborder + "px"
                });
                navItem.css({
                    'height': height - 20 - topborder - bottomborder + "px",
                    'line-height': height - 20 - topborder - bottomborder + "px"
                });
            } else if (navStyle == 'style3' || navStyle == 'style4' || navStyle == 'style13') {
                navInnerDiv.css({
                    'height': height + "px",
                    'line-height': height + "px"
                });
                navItem.css({
                    'height': height + "px",
                    'line-height': height + "px"
                });
            } else {
                navInnerDiv.css({
                    'height': height - topborder - bottomborder + "px",
                    'line-height': height - topborder - bottomborder + "px"
                });
                navItem.css({
                    'height': height - topborder - bottomborder + "px",
                    'line-height': height - topborder - bottomborder + "px"
                });
            }

            if (navStyle == 'style3' || navStyle == 'style4' || navStyle == 'style13') {
                navItemSliding.css({
                    'width': width + 'px',
                    'height': height + "px",
                });

                if (navStyle == 'style3' || navStyle == 'style13') {
                    navItemInnerSliding.css({
                        'width': itemWidth + 'px'
                    });
                } else if (navStyle == 'style4') {
                    navItemInnerSliding.css({
                        'height': height + "px",
                    });
                }
            }

            if (navStyle == 'style5') {
                navA.css({
                    'height': height + "px",
                });
                var navA2 = nav.find('a.w-nav-item-link.hover');
                navA2.css({
                    'margin-top': -height + 'px',
                });
            }

            if (navStyle == 'style7') {
                navChildUl.css({
                    'top': height + "px",
                });
            }


            //如果子导航为自适应，就要计算拉大拉小后的大小，否则就使用用户自己设置的宽高
            //计算方式，如果scss变量为auto，则自适应，否则取行内样式的值
            var itemCount = navInnerDiv.length;
            var childItemWidth = "auto";
            var oldChildItemWidth = this.getCss("$subnav-width").replace('px', '');
            if (oldChildItemWidth == "auto") {
                childItemWidth = (width / itemCount);
            } else {
                childItemWidth = oldChildItemWidth;
            }

            //style7的宽度是自适应的
            if (navStyle != 'style7') {
                navChildUl.css({
                    'width': childItemWidth + "px",
                });
            }

            //style的html结构不一样，需要单独处理
            if (navStyle == 'style2') {
                var navChildDiv_s2 = nav.find('div.w-subnav');//子导航div
                var navChildUl_s2 = navChildDiv_s2.find('ul.w-subnav-inner');
                var navChildLi_s2 = navChildDiv_s2.find('li.w-subnav-item');//子导航li
                var navChildLiA_s2 = navChildLi_s2.find('a.w-subnav-link');
            }


            //reset(所有横向导航的UL都不需要设置高度)
            navChildUl.css({
                'height': "",
            });
        }

        //竖向导航
        if (navStyle == 'style8' || navStyle == 'style11') {
            var itemHeight = height / itemCount;
            navItem.css({
                'width': width - leftborder - rightborder + "px",
                'line-height': itemHeight + "px"
            });
            navInnerDiv.css({
                'width': width - leftborder - rightborder + "px",
                'line-height': itemHeight + "px"
            });

            //如果子导航为自适应，就要计算拉大拉小后的大小，否则就使用用户自己设置的宽高
            //计算方式，如果scss变量为auto，则自适应，否则取行内样式的值
            var childItemWidth = '100%';
            var oldChildItemWidth = this.getCss("$subnav-width").replace('px', '');
            if (oldChildItemWidth != "100%") {
                childItemWidth = oldChildItemWidth;
            }

            navChildUl.css({
                'left': width - leftborder - rightborder + "px",
                'width': childItemWidth + 'px'
            });
        }

        if (navStyle == 'style10' || navStyle == 'style9') {
            var itemHeight = height / itemCount;
            navItem.css({
                'width': width - leftborder - rightborder + "px",
                'line-height': itemHeight + "px"
            });
            navItemSliding.css({
                'top': "-" + topborder + "px",
                'left': "-" + leftborder + "px",
            });

            navItemSliding.css({
                'height': height + "px",
                'width': width + 'px',
            });

            navItemInnerSliding.css({
                'height': itemHeight + 'px'
            });

            navChildUl.css({
                'left': width + "px",
            });
        }

        if (navStyle == "style12") {
            var navHeight = nav.height();
            var navWidth = nav.width();

            var count = $('#' + this.controlId).find(".w-nav-item").length
            if (count > 0) {
                var liA = $('#' + this.controlId).find(".w-nav-item > a");
                //分割线宽度
                var borderLine = parseInt($(liA[1]).css("border-top-width"));
                if (rightborderstyle == "none") {
                    $('#' + this.controlId).width(navWidth);
                    $('#' + this.controlId).height(navHeight);
                } else {
                    $('#' + this.controlId).width(navWidth + parseInt(rightborder) + parseInt(leftborder));
                    $('#' + this.controlId).height(navHeight + parseInt(topborder) + parseInt(bottomborder));
                }

                var tItemHeight = navHeight - borderLine * (count - 1);
                var itemHeight = (tItemHeight / count).toFixed(2);
                $('#' + this.controlId).find(".w-nav-inner .w-nav-item span").css({
                    "height": itemHeight + "px",
                    "line-height": itemHeight + "px",
                });
            }
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    //onSmartViewCreated: function () {
    //    alert('nav');
    //}
});

cnsmart.controlResMap["navcontainer"] = "导航容器";
var NavContainerSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'navcontainer', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find(".nav-container").css("height", height + "px");
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    //onSmartViewCreated: function () {
    //    alert('nav');
    //}
});

cnsmart.controlResMap["multinav"] = "多级导航";
var MultiNavSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'multinav', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find(".nav-container").css("height", height + "px");
        this.$control.find("#smc_Area0").css("height", height + "px");
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
});

cnsmart.controlResMap["login"] = "登录";
var LoginSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'login', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-login').css({ 'width': width + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});


cnsmart.controlResMap["register"] = "注册";
var RegisterSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'register', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-register').css({ 'width': width + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["loginstatu"] = "登录状态";
var LoginStatuSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'loginstatu', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-login-status").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-login-status").height();
            var width = this.$control.find(".w-login-status").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["breadcrumb"] = "面包屑";
var BreadCrumbSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'breadcrumb', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-crumbs").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-crumbs").height();
            var width = this.$control.find(".w-crumbs").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemCrumbsBind"] = "文章所在位置&分类";
var NewsItemCrumbsBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemCrumbsBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-crumbs").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-crumbs").height();
            var width = this.$control.find(".w-crumbs").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemTitleBind"] = "文章标题";
var NewsItemTitleBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemTitleBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-title").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-title").height();
            var width = this.$control.find(".w-title").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemCreatedDatetimeBind"] = "文章创建时间";
var NewsItemCreatedDatetimeBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemCreatedDatetimeBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-createtime").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-createtime").height();
            var width = this.$control.find(".w-createtime").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemHitsBind"] = "文章浏览量";
var NewsItemHitsBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemHitsBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-pageviews").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-pageviews").height();
            var width = this.$control.find(".w-pageviews").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemFavoritesBind"] = "收藏文章";
var NewsItemFavoritesBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemFavoritesBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-collect").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-collect").height();
            var width = this.$control.find(".w-collect").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemSummaryBind"] = "文章简介";
var NewsItemSummaryBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemSummaryBind', controlData);
    },
    _onResize: function (width, height) {
        //this.$control.css("min-height", height + "px");
    }
});

cnsmart.controlResMap["newsItemContentBind"] = "文章详情";
var NewsItemContentBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemContentBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-detail").height();
            var width = this.$control.find(".w-detail").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemPreviousBind"] = "上一篇文章";
var NewsItemPreviousBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemPreviousBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("height", height + "px");
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-previous").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-previous").height();
            var width = this.$control.find(".w-previous").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["newsItemNextBind"] = "下一篇文章";
var NewsItemNextBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemNextBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("height", height + "px");
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-next").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-next").height();
            var width = this.$control.find(".w-next").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productCrumbsBind"] = "产品所在位置&分类";
var ProductCrumbsBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productCrumbsBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-crumbs").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-crumbs").height();
            var width = this.$control.find(".w-crumbs").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productTitleBind"] = "产品标题";
var ProductTitleBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productTitleBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-title").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-title").height();
            var width = this.$control.find(".w-title").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productCreatedDatetimeBind"] = "产品创建时间";
var ProductCreatedDatetimeBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productCreatedDatetimeBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-createtime").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-createtime").height();
            var width = this.$control.find(".w-createtime").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productHitsBind"] = "产品浏览量";
var ProductHitsBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productHitsBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-pageviews").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-pageviews").height();
            var width = this.$control.find(".w-pageviews").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productFavoritesBind"] = "收藏产品";
var ProductFavoritesBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productFavoritesBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-collect").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-collect").height();
            var width = this.$control.find(".w-collect").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productSummaryBind"] = "产品简介";
var ProductSummaryBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productSummaryBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    }
});

cnsmart.controlResMap["productContentBind"] = "产品详情";
var ProductContentBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productContentBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-detail").height();
            var width = this.$control.find(".w-detail").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productPreviousBind"] = "上一个产品";
var ProductPreviousBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productPreviousBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-previous").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-previous").height();
            var width = this.$control.find(".w-previous").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productNextBind"] = "下一个产品";
var ProductNextBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productNextBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-next").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-next").height();
            var width = this.$control.find(".w-next").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["listfile"] = "文件列表";
var ListFileSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listfile', controlData);
    },
    onSmartViewCreated: function () {
        if (smartViewFactory.storage.deviceMode !== 'Pc') {
            $("#sm_controlSetting li a[type='content']").click();
        }
    }
});

cnsmart.controlResMap["listproduct"] = "产品列表";
var ListProductSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listproduct', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style3":
            case "Style4":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    },
    onSmartViewCreated: function () {
        if (smartViewFactory.storage.deviceMode !== 'Pc') {
            $("#sm_controlSetting li a[type='content']").click();
        }
    }
});

cnsmart.controlResMap["music"] = "音乐";
var MusicSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'music', controlData);
    },
    _onResize: function (width, height) {
        var music = this.$control.find(".mw-music");
        var leftborder = YibuTrimPx(this.getCss("$border-left-width"));
        var realHeight = parseInt(height) - leftborder * 2;
        music.height(parseInt(realHeight));
        this.setCss("$copy-height", realHeight + "px", null);
        this.refreshCss();
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});
cnsmart.controlResMap["listproductsearch"] = "产品搜索结果列表";
var ListProductSearchSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listproductsearch', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style3":
            case "Style4":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    }
});
cnsmart.controlResMap["listproductcategory"] = "产品分类结果列表";
var ListProductCategorySmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listproductcategory', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style3":
            case "Style4":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    }
});

cnsmart.controlResMap["listnews"] = "文章列表";
var ListNewsSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listnews', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style2":
            case "Style3":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    },
    onSmartViewCreated: function () {
        if (smartViewFactory.storage.deviceMode !== 'Pc') {
            $("#sm_controlSetting li a[type='content']").click();
        }
    }
});
cnsmart.controlResMap["listnewssearch"] = "文章搜索结果列表";
var ListNewsSearchSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listnewssearch', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style2":
            case "Style3":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    }
});
cnsmart.controlResMap["listnewscategory"] = "文章分类结果列表";
var ListNewsCategorySmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'listnewscategory', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style2":
            case "Style3":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    }
});

cnsmart.controlResMap["altas"] = "多图列表";
var AltasSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'altas', controlData);
    },
    _onResize: function (width, height) {
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
});

cnsmart.controlResMap["productParameterBind"] = "产品参数";
var ProductParameterBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productParameterBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
        this.$control.find(".w-parameter .w-par-item .w-par-title .w-par-titlein").each(function () {
            var titleheight = $(this).height();
            $(this).parent().parent().css("min-height", titleheight + 16);
            $(this).parent().next().css("min-height", titleheight + 16);
        });
        this.$control.find(".w-parameter .w-par-item .w-par-values .w-par-valuesin").each(function () {
            var valuesheight = $(this).height();
            $(this).parent().prev().css("min-height", valuesheight);
        });
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-parameter").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-parameter").height();
            var width = this.$control.find(".w-parameter").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productSpecificationsBind"] = "产品规格";
var ProductSpecificationsBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productSpecificationsBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.css("min-height", height + "px");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-productattrs").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-productattrs").height();
            var width = this.$control.find(".w-productattrs").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["category"] = "分类";
var CategorySmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'category', controlData);
    },
    _onResize: function (width, height) {
        var $control = $('#' + this.controlId);
        var style = this.$control.attr("cstyle");

        switch (style) {
            case "Style1":
                var $list = $control.find(".w-category-list .w-category-list-item");
                var listCount = $list.length;
                if (listCount > 0) {
                    var topBorder = parseInt($control.find(".w-category").css("border-top-width"));
                    var leftBorder = parseInt($control.find(".w-category").css("border-left-width"));
                    var rightBorder = parseInt($control.find(".w-category").css("border-right-width"));
                    var bottomBorder = parseInt($control.find(".w-category").css("border-bottom-width"));
                    //分割线边框
                    var lineBoder = parseInt($list.css("border-bottom-width"));
                    //宽高综合边框和分割线的宽度
                    $control.css("height", parseInt(height) + "px");
                    $control.css("width", parseInt(width) + "px");
                    $control.find(".w-category").css("width", width - leftBorder - rightBorder + "px");
                    $control.find(".w-category-list").css("width", width - leftBorder - rightBorder + "px");
                    $control.find(".w-category").css("height", height - topBorder - bottomBorder + "px");
                    $control.find(".w-category-list").css("height", height - topBorder - bottomBorder + "px");
                    $control.find(".w-category-listsecond").css("width", width - leftBorder - rightBorder + "px").css("left", width - leftBorder - rightBorder + "px");
                    $control.find(".w-category-listthird").css("width", width - leftBorder - rightBorder + "px").css("left", width - leftBorder - rightBorder + "px");
                    var liHeight = 0;

                    //实际方块的高度总和为高度减去一级分类边框的值
                    var newheight = height - lineBoder * (listCount - 1) - topBorder - bottomBorder - 24 * listCount;
                    //每一块方块的高度
                    liHeight = (newheight / listCount).toFixed(3);
                    //减去24的 padding值
                    $control.find(".w-category a").css("line-height", liHeight + "px");

                    this.setCss("$copy-classify-width", width - leftBorder - rightBorder + "px", null);
                    this.setCss("$copy-line-height", liHeight + "px", null);
                    this.refreshCss();
                }
                break;
            case "Style2":
                var $list = $control.find(".w-category-list .w-category-list-item");
                var listCount = $list.length;
                var topBorder = parseInt($control.find(".w-category").css("border-top-width"));
                var leftBorder = parseInt($control.find(".w-category").css("border-left-width"));
                var rightBorder = parseInt($control.find(".w-category").css("border-right-width"));
                var bottomBorder = parseInt($control.find(".w-category").css("border-bottom-width"));
                //分割线边框
                var lineBoder = parseInt($list.css("border-bottom-width"));
                //宽高综合边框和分割线的宽度
                $control.css("height", parseInt(height) + topBorder + bottomBorder + "px");
                $control.css("width", parseInt(width) + leftBorder + rightBorder + "px");
                $control.find(".w-category").css("height", height + "px");
                $control.find(".w-category").css("width", width + "px");
                $control.find(".w-category-list-item").css("width", (100 / listCount) + "%");
                $control.find(".w-category a").css("line-height", height + "px").css("height", height + "px");
                this.setCss("$copy-height", height + "px", null);
                this.setCss("$copy-width", width + "px", null);
                this.refreshCss();
                break;
            case "Style3":
                var $list = $control.find(".w-classify-once");
                var listCount = $list.length;
                if (listCount > 0) {
                    if (height <= listCount * 25 + 34) {
                        return false;
                    }
                    var topBorder = parseInt($control.find(".w-classify").css("border-top-width"));
                    var leftBorder = parseInt($control.find(".w-classify").css("border-left-width"));
                    var bottomBorder = parseInt($control.find(".w-classify").css("border-bottom-width"));
                    //分割线边框
                    var newwidth = parseInt(width) + leftBorder;
                    var lineBoder = parseInt($control.find(".w-classify-once:last").css("border-top-width"));
                    //宽高综合边框和分割线的宽度
                    //$control.css("height", parseInt(height) + topBorder + bottomBorder + (listCount - 1) * lineBoder + "px");
                    $control.css("height", height + "px");
                    $control.css("width", width + "px");
                    $control.find(".w-classify").css("width", width - leftBorder + "px");
                    //$control.find(".w-classify").css("height", height - topBorder - bottomBorder + "px");
                    var liHeight = 0;
                    var titleHeight = $control.find(".w-classify-title").height();
                    //实际方块的高度总和为高度减去一级分类边框的值
                    var newheight = height - lineBoder * (listCount - 1) - topBorder - bottomBorder - titleHeight;
                    //每一块方块的高度
                    liHeight = (newheight / listCount).toFixed(3);
                    //减去24的 padding值
                    $control.find(".w-classify-once-item").css("line-height", liHeight + "px").css("height", liHeight + "px");
                    $control.find(".w-classify-once").css("height", liHeight + "px");
                    $control.find(".w-classify-once-inner").css("left", (parseInt(width) - leftBorder - 1) + "px");
                    this.setCss("$copy-classify-width", width + "px", null);
                    this.setCss("$copy-classify1-width", (width - 1) + "px", null);
                    this.setCss("$once-height", liHeight + "px", null);
                    this.refreshCss();
                }
                break;
            case "Style4":
                var $list = $control.find(".w-category .w-category-list-title");
                var listCount = $list.length;
                if (listCount > 0) {
                    if (height <= listCount * 25) {
                        return false;
                    }
                    var liwidth = $list.width();
                    var fontsize = parseInt($list.find("a").css("font-size"));
                    var spanwidth = liwidth - 55 - fontsize;
                    $list.find("span").width(spanwidth);

                    var topBorder = parseInt($control.find(".w-category").css("border-top-width"));
                    var leftBorder = parseInt($control.find(".w-category").css("border-left-width"));
                    var rightBorder = parseInt($control.find(".w-category").css("border-right-width"));
                    var bottomBorder = parseInt($control.find(".w-category").css("border-bottom-width"));
                    //分割线边框
                    var lineBoder = parseInt($list.css("border-bottom-width"));
                    //宽高综合边框和分割线的宽度
                    $control.css("height", parseInt(height) + topBorder + bottomBorder + "px");
                    $control.css("width", parseInt(width) + leftBorder + rightBorder + "px");
                    $control.find(".w-category").css("height", height + "px");
                    $control.find(".w-category").css("width", width + "px");

                    //实际方块的高度总和为高度减去一级分类边框的值
                    var newheight = height - lineBoder * (listCount - 1);
                    //每一块方块的高度
                    liHeight = (newheight / listCount).toFixed(3);
                    //减去24的 padding值
                    var alineHeight = liHeight - 24;

                    $control.find(".w-category a").css("line-height", alineHeight + "px");
                    this.setCss("$copy-line-height", alineHeight + "px", null);
                    this.setCss("$copy-width", width + "px", null);
                    this.refreshCss();
                }
                break;
            case "Style5":
                var $list = $control.find(".w-category .w-first-title,.w-category .w-second-title,.w-category .w-third-title");
                var listCount = $list.length;
                if (listCount > 0) {
                    if (height <= listCount * 25) {
                        return false;
                    }
                    var liwidth = $list.width();
                    var fontsize = parseInt($list.find("a").css("font-size"));
                    var spanwidth = liwidth - 55 - fontsize;
                    $list.find("span").width(spanwidth);

                    var topBorder = parseInt($control.find(".w-category").css("border-top-width"));
                    var leftBorder = parseInt($control.find(".w-category").css("border-left-width"));
                    var rightBorder = parseInt($control.find(".w-category").css("border-right-width"));
                    var bottomBorder = parseInt($control.find(".w-category").css("border-bottom-width"));

                    var lineBoder = 0;
                    $list.each(function () {
                        lineBoder = lineBoder + parseInt($(this).css("border-bottom-width"));
                    });

                    //实际方块的高度总和为高度减去一级分类边框的值
                    var spaceheight = height - topBorder - bottomBorder - lineBoder;

                    //每一块方块的高度
                    liHeight = (spaceheight / listCount).toFixed(3);

                    $control.find(".w-category a").css("line-height", liHeight + "px");
                    $control.find(".w-category a").css("height", liHeight + "px");

                    this.setCss("$copy-line-height", liHeight + "px", null);
                    this.setCss("$copy-width", width + "px", null);
                    this.refreshCss();
                }
                break;
            default:
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    onSmartViewCreated: function () {
        $("#sm_controlSetting li a[type='content']").click();
    }
});

cnsmart.controlResMap["cartQuantity"] = "购买数量";
var CartQuantitySmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'cartQuantity', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-number").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-number").height();
            var width = this.$control.find(".w-number").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});
cnsmart.controlResMap["productOriginalPriceBind"] = "产品原价";
var ProductOriginalPriceBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productOriginalPriceBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-coprice").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-coprice").height();
            var width = this.$control.find(".w-coprice").width();
            this._onResize(width, height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});


cnsmart.controlResMap["map"] = "地图";
var MapSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'map', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find(".MapItem").css("width", width);
        this.$control.find(".MapItem").css("height", height);
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },

});

cnsmart.controlResMap["cartSubmitButton"] = "购买按钮";
var CartSubmitButtonSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'cartSubmitButton', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find(".w-buybtn").css("width", width);
        this.$control.find(".w-buybtn").css("height", height);
        this.$control.find(".w-buybtn").css("line-height", height + "px");

        this.$control.find(".w-buybtn .w-buybtn-icon").css("height", height);
        this.$control.find(".w-buybtn .w-buybtn-icon").css("line-height", height + "px");

        this.$control.find(".w-buybtn .w-buybtn-text").css("height", height);
        this.$control.find(".w-buybtn .w-buybtn-text").css("line-height", height + "px");
    },
    onResize: function (event, ui) {
        if (ui.size.width >= 34 && ui.size.height >= 14) {
            this._onResize(ui.size.width, ui.size.height);
            this._super(event, ui);
        }
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-buybtn").height();
            var width = this.$control.find(".w-buybtn").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});

cnsmart.controlResMap["productCurrentPriceBind"] = "产品现价";
var ProductCurrentPriceBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productCurrentPriceBind', controlData);
    },
    _onResize: function (width, height) {
        this.$control.height(height);
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-cuprice").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-cuprice").height();
            var width = this.$control.find(".w-cuprice").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});


cnsmart.controlResMap["tab"] = "标签布局";
var TabSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'tab', controlData);
    },
    onResize: function (event, ui) {
        this._refresh(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh(ui.size.width, ui.size.height, true);
    },
    _refresh: function (width, height, isStop) {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style1":
                this._dorefreshStyle1(width, height);
                break;
            case "Style2":
                this._dorefreshStyle2(width, height);
                break;
            case "Style3":
                this._dorefreshStyle3(width, height);
                break;
            case "Style4":
                this._dorefreshStyle4(width, height);
                break;
            case "Style5":
                this._dorefreshStyle5(width, height);
                break;
            case "Style6":
                this._dorefreshStyle6(width, height, isStop);
                break;
            case "Style7":
                this._dorefreshStyle7(width, height);
                break;
            case "Style10":
                this._dorefreshStyle10(width, height);
                break;
            case "Style11":
                this._dorefreshStyle11(width, height);
                break;
            default:
        }
    },
    _dorefreshStyle1: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labels = innercontainer.find(">.w-label-tips > li.w-label-tips-item");
        var lineWidth = parseInt(this.getCss("$line-width"));
        var offset = (width - lineWidth) % labels.length;

        var labelWidth = parseInt((width - lineWidth) / labels.length) - lineWidth;
        var labelHeight = parseInt(this.getCss("$label-height"));
        var topHeight = parseInt(this.getCss("$label-border-top-width"));
        var bottomHeight = parseInt(this.getCss("$label-border-bottom-width"));
        var containerHeight = height - labelHeight - topHeight - bottomHeight;

        labels.css("width", labelWidth + "px");
        labels.eq(0).css("width", (labelWidth + offset) + "px");
        innercontainer.find(">.w-label-content>.w-label-content-item >.smAreaC").css("height", containerHeight + "px");
    },
    _dorefreshStyle2: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labelHeight = parseInt(this.getCss("$label-height"));
        var topHeight = parseInt(this.getCss("$label-border-top-width"));
        var bottomHeight = parseInt(this.getCss("$label-border-bottom-width"));
        var containerHeight = height - labelHeight - topHeight - bottomHeight;
        innercontainer.find(">.w-label-content>.w-label-content-item >.smAreaC").css("height", containerHeight + "px");
    },
    _dorefreshStyle3: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labels = innercontainer.find(">.w-label-tips > li.w-label-tips-item");
        var lineHeight = parseInt(this.getCss("$line-height"));
        var offset = (height - lineHeight) % labels.length;
        var labelHeight = parseInt((height - lineHeight) / labels.length) - lineHeight;
        labels.css("height", labelHeight + "px").find(">a").css({
            "height": labelHeight + "px",
            "line-height": labelHeight + "px"
        });
        labels.eq(0).css("height", (labelHeight + offset) + "px").find(">a").css({
            "height": (labelHeight + offset) + "px",
            "line-height": (labelHeight + offset) + "px"
        });
    },
    _dorefreshStyle4: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labels = innercontainer.find(">.w-label-tips > li.w-label-tips-item");
        var lineHeight = parseInt(this.getCss("$line-height"));
        var offset = (height - lineHeight) % labels.length;
        var labelHeight = parseInt((height - lineHeight) / labels.length) - lineHeight;
        labels.css("height", labelHeight + "px").find(">a").css({
            "height": labelHeight + "px",
            "line-height": labelHeight + "px"
        });
        labels.eq(0).css("height", (labelHeight + offset) + "px").find(">a").css({
            "height": (labelHeight + offset) + "px",
            "line-height": (labelHeight + offset) + "px"
        });
    },
    _dorefreshStyle5: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labels = innercontainer.find(">.w-label-tips > li.w-label-tips-item");
        var lineWidth = parseInt(this.getCss("$line-width"));
        var itemWidth = parseInt(this.getCss("$label-width"));
        //var leftWidth = parseInt(this.getCss("$label-border-left-width"));
        //var rightWidth = parseInt(this.getCss("$label-border-right-width"));
        //var topHeight = parseInt(this.getCss("$label-border-top-width"));
        //var bottomHeight = parseInt(this.getCss("$label-border-bottom-width"));
        //var cleftWidth = parseInt(this.getCss("$content-border-left-width"));
        //var crightWidth = parseInt(this.getCss("$content-border-right-width"));
        //var ctopHeight = parseInt(this.getCss("$content-border-top-width"));
        //var cbottomHeight = parseInt(this.getCss("$content-border-bottom-width"));
        //var liWidth = itemWidth - 10;
        //var liHeight = height;
        //var labelWidth = liWidth - leftWidth - rightWidth;
        //var labelHeight = liHeight - 10 - topHeight - bottomHeight;
        var containerWidth = width - (itemWidth + lineWidth) * labels.length - 2 * lineWidth;
        var containerHeight = height;

        //labels.find(">a").css({
        //    "height": labelHeight + "px",
        //    "width": labelWidth + "px"
        //});
        labels.find(">.w-label-content").css({
            "height": containerHeight + "px",
            "width": containerWidth + "px"
        });
    },
    _dorefreshStyle6: function (width, height, isStop) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        if (!innercontainer.find("> .w-label-content").is(':visible')) {
            return;
        } else {
            var labelHeight = parseInt(this.getCss("$label-height"));
            var topHeight = parseInt(this.getCss("$label-border-top-width"));
            var bottomHeight = parseInt(this.getCss("$label-border-bottom-width"));
            var labelLineHeight = labelHeight - topHeight - bottomHeight;
            var ctopHeight = parseInt(this.getCss("$content-border-top-width"));
            var cbottomHeight = parseInt(this.getCss("$content-border-bottom-width"));
            var containerHeight = height - labelHeight - ctopHeight - cbottomHeight;
            if (isStop) {
                var indexOf = innercontainer.find(">.w-label-content>.w-label-content-item.current").index();
                var listData = this.controlData.ListData;
                if (listData && listData.length > indexOf) {
                    listData[indexOf].ContentHeight = containerHeight + "";
                    smartViewFactory.changeSmartViewData(this.controlId, "ListData", listData, false, null);
                }
            }
            innercontainer.find(">.w-label-tips>.w-label-tips-item>a").css("line-height", labelLineHeight + "px");
            innercontainer.find(">.w-label-content>.w-label-content-item.current >.smAreaC").css("height", containerHeight + "px");
        }
    },
    _dorefreshStyle7: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labelHeight = parseInt(this.getCss("$label-height"));
        var topHeight = parseInt(this.getCss("$label-border-top-width"));
        var bottomHeight = parseInt(this.getCss("$label-border-bottom-width"));
        var containerHeight = height - labelHeight - topHeight - bottomHeight;
        innercontainer.find(">.w-label-content>.w-label-content-item >.smAreaC").css("height", containerHeight + "px");
    },
    _dorefreshStyle10: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labels = innercontainer.find(">.w-label-tips > li.w-label-tips-item");
        var lineWidth = parseInt(this.getCss("$line-width"));
        var labelWidth = parseInt((width - lineWidth) / labels.length) - lineWidth;
        var offset = width - ((labelWidth + lineWidth) * labels.length + lineWidth)
        var labelHeight = parseInt(this.getCss("$label-height"));
        var topHeight = parseInt(this.getCss("$content-border-top-width"));
        var bottomHeight = parseInt(this.getCss("$content-border-bottom-width"));
        var containerHeight = height - labelHeight - topHeight - bottomHeight;
        labels.css("width", labelWidth + "px");
        labels.eq(0).css("width", (labelWidth + offset) + "px");
        // innercontainer.find(">.w-label-content>.w-label-content-item").css("height", containerHeight + "px");
        innercontainer.find(">.w-label-content>.w-label-content-item >.smAreaC").css("height", containerHeight + "px");
    },
    _dorefreshStyle11: function (width, height) {
        var innercontainer = this.$control.find(">.yibuFrameContent>.w-label");
        var labels = innercontainer.find(">.w-label-tips > li.w-label-tips-item");
        /*      var tabsLineWidth = innercontainer.find(">.w-label-tips > li.w-label-tips-line");
              var tabsContent = innercontainer.find(">.w-label-content");
              var tabsTipsWidth = innercontainer.width() / 4 + "px";
              labels.css("width", tabsTipsWidth);
              tabsLineWidth.css("width", tabsTipsWidth)
              var tabsContentLeft = (300 + (innercontainer.width() / 4 - 300)) >= 300 ? 300 + (innercontainer.width() / 4 - 300) : 300
              tabsContent.css("left", tabsContentLeft + "px");*/
        var lineHeight = parseInt(this.getCss("$line-height"));
        var offset = (height - lineHeight) % labels.length;
        var labelHeight = parseInt((height - lineHeight) / labels.length) - lineHeight;
        labels.css("height", labelHeight + "px").find(">a").css({
            "height": labelHeight + "px",
            "line-height": labelHeight + "px"
        });
        labels.eq(0).css("height", (labelHeight + offset) + "px").find(">a").css({
            "height": (labelHeight + offset) + "px",
            "line-height": (labelHeight + offset) + "px"
        });
    },
    refresh: function () {
        this._refresh(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    fixControlPosition: function (pp) {
        var style = this.$control.attr('cstyle');
        switch (style) {
            case 'Style1':
            case 'Style2':
            case 'Style6':
            case 'Style7':
                this._fixStyle1Positon(pp);
                break;
            case 'Style3':
                this._fixStyle3Positon(pp);
                break;
            case 'Style4':
                break;
            case 'Style5':
                this._fixStyle5Positon(pp);
                break;
            case 'Style10':
                this._fixStyle10Positon(pp);
                break;
            case 'Style11':
                this._fixStyle11Positon(pp);
                break;
        }
    },

    _fixStyle1Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null) {
            var tabHeader = this.$control.children().children().children('.w-label-tips');
            pp.y += parseInt(tabHeader.height());
        }
    },
    _fixStyle3Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null) {
            var tabHeader = this.$control.children().children().children('.w-label-tips');
            pp.x += parseInt(tabHeader.width());
        }
    },
    _fixStyle5Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null) {
            pp.x += parseInt(pp.target.parent().position().left);
        }
    },
    _fixStyle10Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null) {
            var current = this.$control.children().children().children(".w-label-content");
            if (current.length == 1) {
                pp.y += parseInt(current.position().top);
            }
            // this.setData("", "", true, null);
        }
    },
    _fixStyle11Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null) {
            var current = this.$control.children().children().children(".w-label-content");
            if (current.length == 1) {
                pp.x += parseInt(current.position().left);
            }
            // this.setData("", "", true, null);
        }
    },
    changeStyleAfterCallback: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style10":
            case "Style11":
                this.setData("IsShowImage", 'on', true, null);
                break;
        }
    }
})


cnsmart.controlResMap["fullpage"] = "全屏排版";
var FullPageSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'fullpage', controlData);
    },
    onSmartViewDeleted: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style1":
                if ($.fn.fullpage) {
                    if ($.fn.fullpage.destroy != undefined) {
                        $.fn.fullpage.destroy('all');
                    }
                }
                break;
            case "Style2":
                if ($.fn.fullpage) {
                    if ($.fn.fullpage.destroy != undefined) {
                        $.fn.fullpage.destroy('all');
                    }
                }
                break;
            default:
        }
    }
})

cnsmart.controlResMap["productSlideBind"] = "产品幻灯";
var ProductSlideBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productSlideBind', controlData);
    },
    _stopResize: function (width, height) {
        var style = this.$control.attr("cstyle");
        if (style == "Style3" || style == "Style5") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
            var thumListHeight = 0;
            var bigImgHeight = 0;
            //计算大图高度
            if (style == "Style3") {
                thumListHeight = $('#' + this.controlId).find(".w-thumblist").height();
                var bigImgHeight = parseInt(height) - thumListHeight;
            } else {
                var thunHeight = $('#' + this.controlId).find(".w-thumb-t").height();
                thumListHeight = 20;
                var bigImgHeight = parseInt(height) - thumListHeight - thunHeight;
            }
            this.setCss("$bigImg-height", bigImgHeight + "px", null);
        } else if (style == "Style1") {
            this.setCss("$Img-height", height + "px", null);
        } else if (style == "Style4") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
        } else if (style == "Style6") {
            this.setCss("$slide-width", width + "px", null);
            this.setCss("$slide-height", height + "px", null);
        }
        this.refreshCss();
        this.refreshView();
    },
    stopResize: function (event, ui) {
        if (ui.size.width < 200) {
            ui.size.width = 200
        }
        if (ui.size.height < 100) {
            ui.size.height = 100
        }
        this._super(event, ui);
        this._stopResize(ui.size.width, ui.size.height);
    },
    refresh: function () {
        this._stopResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});


cnsmart.controlResMap["comment"] = "评论";
var CommentSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'comment', controlData);
    },
    _stopResize: function (width, height) {
        // this.$control.find(".w-comment").css("width", width);
        this.$control.css("min-height", height + "px");
    },
    stopResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-comment").height();
        var minWidth = this.$control.find(".w-comment").css("min-width");
        minWidth = YibuTrimPx(minWidth);
        if (minWidth > ui.size.width) {
            ui.size.width = minWidth;
            this.$control.width(minWidth);
        }
        this._super(event, ui);
        this._stopResize(ui.size.width, ui.size.height);
    },
    refresh: function () {
        var minWidth = this.$control.find(".w-comment").css("min-width");
        minWidth = YibuTrimPx(minWidth);
        var cssWidth = YibuTrimPx(this.getCss("width"));
        if (cssWidth < minWidth) {
            cssWidth = minWidth;
            this.$control.css("width", cssWidth);
            this.setWidth(minWidth);
        }
        this._stopResize(cssWidth, YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["productRelateBind"] = "相关产品";
var ProductRelateBindSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productRelateBind', controlData);
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this._refresh();
    },
    _refresh: function () {
        var style = this.$control.attr("cstyle");
        switch (style) {
            case "Style3":
            case "Style4":
                this._dorefresh();
                break;
            default:
        }
    },
    _dorefresh: function () {
        var timeout = this.$control.attr("timeout");
        if (timeout) {
            clearTimeout(parseInt(timeout));
        }
        var that = this;
        timeout = setTimeout(function () {
            that.refreshView();
        }, 500);
    },
    refresh: function () {
        this._refresh();
    }
});

cnsmart.controlResMap["qqservice"] = "客服";
var QQServiceSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'qqservice', controlData);
    },
    _onResize: function (width, height) {
        var controlId = this.controlId.replace("smv", "qqservice");
        var sumHeight = $('#' + controlId).height();
        var marginTop = -(sumHeight) / 2 + "px";
        $('#' + controlId).css("margin-top", marginTop);
        var style = this.$control.attr("cstyle");
        if (style == 'Style3' || style == 'Style4') {
            var leftborder = parseInt($('#' + controlId).find(".w-cs-list").css("border-left-width"));
            var rightborder = parseInt($('#' + controlId).find(".w-cs-list").css("border-right-width"));
            var topborder = parseInt($('#' + controlId).find(".w-cs-list").css("border-top-width"));
            var bottomborder = parseInt($('#' + controlId).find(".w-cs-list").css("border-bottom-width"));
            var realWidth = parseInt(leftborder) + parseInt(rightborder) + 60;
            var realHeight = parseInt(topborder) + parseInt(bottomborder) + 60;
            $('#' + controlId).css({ 'width': realWidth + "px" });
        }
    },
    onResize: function (event, ui) {
        //this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var controlId = this.controlId.replace("smv", "qqservice");
            var height = $('#' + controlId).height();
            var width = $('#' + controlId).width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    },
    onSmartViewDeleted: function () {
        var controlId = this.controlId.replace("smv", "qqservice");
        $('#' + controlId).remove();
    },
    onSmartViewCreated: function () {
        this.refreshView();
    }

});


cnsmart.controlResMap["cart"] = "购物车";
var Cart = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'cart', controlData);
    },
    _onResize: function (width, height) {
        if (this.$control.find(".w-shoppingcart-prompt").length > 0) {
            this.$control.find(".w-shoppingcart-inner").css("width", width);
            this.$control.find(".w-shoppingcart-inner").css("height", height);
            this.$control.find(".w-shoppingcart-inner").css("line-height", height + "px");

            this.$control.find(".w-shoppingcart-inner .w-shoppingcart-mine").css("height", height);
            this.$control.find(".w-shoppingcart-inner .w-shoppingcart-mine .w-shoppingcart-text").css("width", width - 22 - 45);
            this.$control.find(".w-shoppingcart-inner .w-shoppingcart-mine").css("line-height", height + "px");
        } else {
            this.$control.find(".w-shoppingcart-inner").css("width", width);
            this.$control.find(".w-shoppingcart-inner").css("height", height);
            this.$control.find(".w-shoppingcart-inner").css("line-height", height - 40 + "px");

            this.$control.find(".w-shoppingcart-inner .w-shoppingcart-mine").css("width", width - 45 - 15);
            this.$control.find(".w-shoppingcart-inner .w-shoppingcart-mine").css("line-height", height - 40 + "px");
            this.$control.find(".w-shoppingcart-amount").css("top", height / 2 - 33 + "px").css("left", width - 50);
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    onSmartViewDeleted: function () {
        var controlId = this.controlId.replace("smv", "cart");
        $('#' + controlId).remove();

    }

});

cnsmart.controlResMap["baiduBridge"] = "爱番番";
var BaiduBridgeSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'baiduBridge', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-chat').css({ 'width': width + "px", 'height': height + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["baiduMap"] = "百度地图";
var BaiduMapSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'baiduMap', controlData);
    },
    _onResize: function (width, height) {
        if (width >= 200 && height >= 150) {
            this.$control.find('.mapItem').css({ 'width': width + "px", 'height': height + "px" });
        }
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    stopResize: function (event, ui) {
        this._super(event, ui);
        this.$control.find('iframe')[0].contentWindow.moveToCenter();
    },
    bindCustomEvents: function () {
        var editConId = this.controlId;
    }
});
cnsmart.controlResMap["multicolumn"] = "多栏布局";
var MultiColumnSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'multicolumn', controlData);
    },
    refresh: function () {
        var spacing = YibuTrimPx(this.getCss("$columns-spacing"));
        this.$control.find(".w-columns").attr("data-spacing", spacing);
        var columns = this.$control.find(".w-columns-item");
        var pageWidth = parseInt(this.$control.find(".w-columns").attr("data-pagewidth"));
        pageWidth = pageWidth - (this.controlData.ListData.length - 1) * spacing;
        var totalWidth = 0;
        var mc = this.$control.find(".w-columns.fullScreen");
        var isFullScreen = mc.length != 0;
        var mcWidth = parseInt(mc.css("width"));
        mcWidth = mcWidth - (this.controlData.ListData.length - 1) * spacing;
        var mctotalWidth = 0;
        for (var i = 0; i < columns.length; i++) {
            var svCol = $(columns[i]);
            var perc = parseInt(this.controlData.ListData[i].Width);
            svCol.attr("data-width", perc);
            svCol.css("width", "");
            var itemWidth;
            var mcitemWidth;
            if (i == columns.length - 1) {
                itemWidth = pageWidth - totalWidth;
            } else {
                itemWidth = parseInt(pageWidth * perc / 100);
                totalWidth += itemWidth;
            }
            svCol.find(".w-columns-content-inner").css("width", itemWidth + "px");
            if (isFullScreen) {
                if (i == columns.length - 1) {
                    mcitemWidth = mcWidth - mctotalWidth;
                } else {
                    mcitemWidth = parseInt(mcWidth * perc / 100);
                    mctotalWidth += mcitemWidth;
                }
                svCol.css("width", (mcitemWidth + spacing) + "px");
            }
        }

    },
    fixControlPosition: function (pp) {
        var style = this.$control.attr('cstyle');
        switch (style) {
            case 'Style1':
                this._fixStyle1Positon(pp);
                break;
            case 'Style2':
                this._fixStyle2Positon(pp);
                break;
        }
    },
    _fixStyle1Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null && pp.target.hasClass("w-columns-content-inner")) {
            var marginleft = parseInt(pp.target.closest(".w-columns.fullScreen").css("left")) || 0;
            pp.x = pp.x + parseInt(pp.target.position().left) + parseInt(pp.target.css("margin-left")) + marginleft;
        }
    },
    _fixStyle2Positon: function (pp) {
        if (typeof pp.target !== 'undefined' && pp.target != null && pp.target.hasClass("w-columns-content-inner")) {
            var marginleft = parseInt(pp.target.closest(".w-columns.fullScreen").css("left")) || 0;
            pp.x = pp.x + parseInt(pp.target.closest(".w-columns-item").position().left) + parseInt(pp.target.closest(".w-columns-content").position().left) + parseInt(pp.target.css("margin-left")) + marginleft;
        }
    },
    smPositionCallBack: function (pt) {
        var fs = this.$control.find(">.yibuFrameContent>.fullScreen");
        if (fs.length > 0) {
            switch (pt) {
                case "absolute":
                    fs.css("width", parseInt(fs.attr("data-pagewidth")) + "px").css("left", "");
                    fs.fullScreen();
                    this.refresh();
                    break;
                case "fixed":
                    break;
                // 选中上下
                default:
                    fs.css("left", "");
                    break;
            }
        }
    }
});
cnsmart.controlResMap["share"] = "分享";
var ShareSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'share', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find(".w-share").css({ "width": width });//, "height": height, "min-height": height
        this.$control.css("min-height", "");
    },
    onResize: function (event, ui) {
        ui.size.height = this.$control.find(".w-share").height();
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    //refresh: function () {
    //    this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    //}

    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-share").height();
            var width = this.$control.find(".w-share").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});
cnsmart.controlResMap["favorites"] = "收藏夹";
var FavoritesSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'favorites', controlData);
    },
    _onResize: function (width, height) {
        var style = this.$control.attr("cstyle");
        if (style == "Style1") {
            var border = YibuTrimPx(this.getCss("$border-width"));
            var realWidth = parseInt(width) - parseInt(border) * 2;
            var realHeight = parseInt(height) - parseInt(border) * 2;
            this.$control.find(".w-collection").css({ "width": realWidth });
            this.$control.find(".w-collection .w-collection-inner").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-collection .w-collection-dropdown-item").css({ "height": realHeight, "line-height": realHeight + "px" });
            this.$control.find(".w-collection .w-collection-dropdown-item a").css({ "height": realHeight, "line-height": realHeight + "px" });
        }
        else if (style == "Style2") {
            this.$control.css("min-height", height + "px");
        }
    },
    onResize: function (event, ui) {
        var style = this.$control.attr("cstyle");
        if (style == "Style2") {
            ui.size.height = this.$control.find(".w-collection").height();
        }
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function (useElementSize) {
        if (useElementSize) {
            var height = this.$control.find(".w-collection").height();
            var width = this.$control.find(".w-collection").width();
            this._onResize(width, height);
            this.setHeight(height);
        }
        else {
            this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
        }
    }
});
cnsmart.controlResMap["codeCnzz"] = "Cnzz代码";
var CodeCnzzSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'codeCnzz', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-code').css({ 'width': width + "px", 'height': height + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});
cnsmart.controlResMap["formpanel"] = "表单";
var FormPanelSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'formpanel', controlData);
    },
    onSmartViewCreated: function () {
        var form = window.parent.xForm.dataLoader.getSelectedOnce();
        this.setData("FormId", form.Id, false, null);
        this.setData("FormTitle", form.Title, true, null);
        var formIdEl = window.parent.document.getElementById('formId');
        var formTitleEl = window.parent.document.getElementById('formTitle');
        if (formIdEl) {
            formIdEl.value = form.Id
        }
        if (formTitleEl) {
            formTitleEl.textContent = form.Title
        }
    }
});
cnsmart.controlResMap["dialog"] = "弹出窗口";
var DialogSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'dialog', controlData);
        this.disableDrag();
    },
    stopResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
        this.smPositionCallBack(this.controlData.Css.fixedPosition);
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    _onResize: function (width, height) {
        if (this.controlData.Css.fixedPosition == "None") {
            this.$control.css("left", "50%");
            this.$control.css("top", "50%");
            this.$control.css("margin-top", "-" + (height / 2) + "px");
            this.$control.css("margin-left", "-" + (width / 2) + "px");
            this.$control.css("position", "fixed");
            this.setCss('fixedPosition', "None");
            this.setCss('position', "fixed");
            this.refreshCss();
        }
    },
    onSmartViewCreated: function () {
        window.parent.toggleDialogModel();
        window.parent.showDialogDesigner(this.controlId);
        this.smPositionCallBack(this.controlData.Css.fixedPosition);
        window.parent.defaultFirstDialog();
    },
    onSmartViewDeleted: function () {
        window.parent.closeDialogDesigner();
        window.parent.toggleDialogModel();
    },
    smPositionCallBack: function (fixedPosition) {
        var width = this.$control.width();
        var height = this.$control.height();
        if (fixedPosition == "Center" || fixedPosition == "None") {
            this.$control.css("left", "50%");
            this.$control.css("top", "50%");
            this.$control.css("margin-top", "-" + (height / 2) + "px");
            this.$control.css("margin-left", "-" + (width / 2) + "px");
            this.setCss('fixedPosition', "None");
            this.refreshCss();
        }
        else if (fixedPosition == "TopLeft") {
            this.$control.css("left", "0");
            this.$control.css("right", "auto");
            this.$control.css("top", "0");
            this.$control.css("bottom", "auto");
            this.$control.css("margin-top", "0px");
            this.$control.css("margin-left", "0px");
        }
        else if (fixedPosition == "LeftCenter") {
            this.$control.css("left", "0");
            this.$control.css("right", "auto");
            this.$control.css("top", "50%");
            this.$control.css("bottom", "auto");
            this.$control.css("margin-left", "0px");
            this.$control.css("margin-top", "-" + (height / 2) + "px");
        }
        else if (fixedPosition == "BottomLeft") {
            this.$control.css("left", "0");
            this.$control.css("right", "auto");
            this.$control.css("top", "auto");
            this.$control.css("bottom", "0");
            this.$control.css("margin-top", "0px");
            this.$control.css("margin-left", "0px");
        }
        else if (fixedPosition == "TopRight") {
            this.$control.css("left", "auto");
            this.$control.css("right", "0");
            this.$control.css("top", "0");
            this.$control.css("bottom", "auto");
            this.$control.css("margin-top", "0px");
            this.$control.css("margin-left", "0px");
        }
        else if (fixedPosition == "RightCenter") {
            this.$control.css("left", "auto");
            this.$control.css("right", "0");
            this.$control.css("top", "50%");
            this.$control.css("bottom", "auto");
            this.$control.css("margin-left", "0px");
            this.$control.css("margin-top", "-" + (height / 2) + "px");
        }
        else if (fixedPosition == "BottomRight") {
            this.$control.css("left", "auto");
            this.$control.css("right", "0");
            this.$control.css("top", "auto");
            this.$control.css("bottom", "0");
            this.$control.css("margin-top", "0px");
            this.$control.css("margin-left", "0px");
        }
        else if (fixedPosition == "TopCenter") {
            this.$control.css("left", "50%");
            this.$control.css("right", "0");
            this.$control.css("top", "0");
            this.$control.css("bottom", "auto");
            this.$control.css("margin-top", "0px");
            this.$control.css("margin-left", "-" + (width / 2) + "px");
        }
        else if (fixedPosition == "BottomCenter") {
            this.$control.css("left", "50%");
            this.$control.css("right", "0");
            this.$control.css("top", "auto");
            this.$control.css("bottom", "0");
            this.$control.css("margin-top", "0px");
            this.$control.css("margin-left", "-" + (width / 2) + "px");
        }
    },
    bindCustomEvents: function () {
        var style = $('#' + this.controlId).attr("cstyle");
        if (style == "Style3") {
            $('#' + this.controlId).on("mouseup", function () {
                var controlId = $(this).attr("id");
                var $control = $(this);
                var scrollHeight = $control.find(".w-modal-content-inner")[0].scrollHeight;
                $control.css('height', scrollHeight);
                var dialogSmartView = smartViewFactory.getSmartView(controlId, 'dialog');
                dialogSmartView.setCss('$dialogHeight', scrollHeight + "px");
                dialogSmartView.refreshCss();
            });
        }
    },
    onSmartViewPasted: function () {
        window.parent.showDialogDesigner(this.controlId);
        if (this.controlData.Data.IsDefault == "true") {
            if (window.parent.hasDefaultDialog()) {
                window.parent.defaultDialogModel(this.controlId, false);
            }
        }
    }
});

cnsmart.controlResMap["mustache"] = {
    "ProductFilterX1": "筛选",
    "ProductFilterSearchX1": "筛选"
};
var MustacheSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'mustache', controlData);
    }
});

cnsmart.controlResMap["companyIntroduction"] = "公司介绍";
var CompanyIntroductionSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'companyIntroduction', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.w-info').css({ 'width': width + "px", 'height': height + "px" });
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});
cnsmart.controlResMap["companyinfo"] = "公司信息";
var CompanyInfoSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'companyinfo', controlData);
    },
    _onResize: function (width, height) {
        //this.$control.find(".MapItem").css("width", width);
        //this.$control.find(".MapItem").css("height", height);
    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
    onSetFullScreen: function () {
        this._onResize(320, YibuTrimPx(this.getCss("height")));
    },
    onCacnelFullScreen: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    },
});

cnsmart.controlResMap["alivideo"] = "阿里云视频";
var AliVideoSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'alivideo', controlData);
    },
    _onResize: function (width, height) {
        this.$control.find('.defaultTitle').css({ 'width': width + "px", 'height': height + "px", "line-height": height + "px" });

    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["newsItemCategoryCrumbs"] = "文章分类面包屑";
var NewsItemCategoryCrumbsSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'newsItemCategoryCrumbs', controlData);
    },
    _onResize: function (width, height) {

    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});

cnsmart.controlResMap["productCategoryCrumbs"] = "产品分类面包屑";
var ProductCategoryCrumbsSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'productCategoryCrumbs', controlData);
    },
    _onResize: function (width, height) {

    },
    onResize: function (event, ui) {
        this._onResize(ui.size.width, ui.size.height);
        this._super(event, ui);
    },
    refresh: function () {
        this._onResize(YibuTrimPx(this.getCss("width")), YibuTrimPx(this.getCss("height")));
    }
});


cnsmart.controlResMap["uetitle"] = "ue主标题";
var UeTitleSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'uetitle', controlData);
    },
    disableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", true);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.disableParentDrag(pvid);
        }
    },
    enableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", false);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.enableParentDrag(pvid);
        }
    },
    bindCustomEvents: function () {
        var editConId = this.controlId;
        editConId = editConId.replace(/smv_/g, '');
        var textAreaId = 'txtd_' + editConId;
        editConId = 'txtc_' + editConId;
        CKEDITOR.config.title = false;
        CKEDITOR.disableAutoInline = true;
        $('#' + editConId).dblclick(function (event) {
            var txtControlId = 'smv_' + $(this).attr('id').replace(/txtc_/g, '');
            var txtView = smartViewFactory.getSmartView(txtControlId, 'text');
            txtView.disableDrag();
            txtView.$control.data('inlinedbc', 1);
            var pvid = txtView.$control.attr('pvid');
            if (pvid !== '') {
                txtView.disableParentDrag(pvid);
            }
            $('body').enableSelection();
            var $this = $(this);
            var $cedit = $this.attr('contenteditable', true);
            if (!CKEDITOR.instances[editConId]) {
                CKEDITOR.inline(editConId,
                    {
                        toolbar: [
                            { name: 'styles', items: ['Format',] },
                            { name: 'styles', items: ['Font', 'FontSize'] },
                            { name: 'colors', items: ['TextColor', 'BGColor'] },
                            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', "-", 'CopyFormatting', '-'] },
                            '/',
                            { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'lineheight', 'letterspacing'] },
                            { name: 'insert', items: ['Smiley'] },
                            { name: 'links', items: ['Link', 'Unlink', 'Anchor', 'Table'] },
                        ],
                        on: {
                            change: function (event) {
                                // console.log(event);
                                window.gtag && gtag('event', 'event_text_change', {
                                    'event_category': '文字控件',
                                    'event_action': '编辑',
                                    'event_label': '文字控件-PC'
                                });
                            },
                            blur: function (event) {
                                var data = event.editor.getData();
                                var editorName = event.editor.name;
                                var txtControlId = 'smv_' + editorName.replace(/txtc_/g, '');
                                var wrapperView = smartViewFactory.getSmartView(txtControlId, 'text');
                                wrapperView.setData("Content", data, false, null);
                                wrapperView.$control.removeData('inlinedbc');
                                //赋值给编辑面板
                                if (window.parent.control_text_editPanel_editor != undefined && $("#pcontrolId", window.parent.document).val() == txtControlId) {
                                    window.parent.control_text_editPanel_editor.setData(data);
                                }
                                wrapperView.enableDrag();
                                var pvid = wrapperView.$control.attr('pvid');
                                if (pvid !== '') {
                                    wrapperView.enableParentDrag(pvid);
                                }
                                $cedit.attr('contenteditable', false);

                                //setTimeout(function () {
                                //    CKEDITOR.instances[editorName].destroy(true);
                                //}, 5);

                            },
                            instanceReady: function (event) {
                                $(this).focus();
                                $(document.body).enableSelection();
                            },
                        },
                        // Allow some non-standard markup that we used in the introduction.
                        extraAllowedContent: 'a(documentation);abbr[title];code',
                        extraPlugins: 'image,lineheight,letterspacing,myColorbutton,myColordialog',
                        removePlugins: 'colorbutton,colordialog',
                        // Show toolbar on startup (optional).
                        startupFocus: true
                    });
            }

            hideConFastPropPanel();
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    }
});


cnsmart.controlResMap["uesubtitle"] = "ue副标题";
var UeSubTitleSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'uesubtitle', controlData);
    },
    disableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", true);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.disableParentDrag(pvid);
        }
    },
    enableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", false);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.enableParentDrag(pvid);
        }
    },
    bindCustomEvents: function () {
        var editConId = this.controlId;
        editConId = editConId.replace(/smv_/g, '');
        var textAreaId = 'txtd_' + editConId;
        editConId = 'txtc_' + editConId;
        CKEDITOR.config.title = false;
        CKEDITOR.disableAutoInline = true;
        $('#' + editConId).dblclick(function (event) {
            var txtControlId = 'smv_' + $(this).attr('id').replace(/txtc_/g, '');
            var txtView = smartViewFactory.getSmartView(txtControlId, 'text');
            txtView.disableDrag();
            txtView.$control.data('inlinedbc', 1);
            var pvid = txtView.$control.attr('pvid');
            if (pvid !== '') {
                txtView.disableParentDrag(pvid);
            }
            $('body').enableSelection();
            var $this = $(this);
            var $cedit = $this.attr('contenteditable', true);
            if (!CKEDITOR.instances[editConId]) {
                CKEDITOR.inline(editConId,
                    {
                        toolbar: [
                            { name: 'styles', items: ['Format',] },
                            { name: 'styles', items: ['Font', 'FontSize'] },
                            { name: 'colors', items: ['TextColor', 'BGColor'] },
                            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', "-", 'CopyFormatting', '-'] },
                            '/',
                            { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'lineheight', 'letterspacing'] },
                            { name: 'insert', items: ['Smiley'] },
                            { name: 'links', items: ['Link', 'Unlink', 'Anchor', 'Table'] },
                        ],
                        on: {
                            change: function (event) {
                                // console.log(event);
                                window.gtag && gtag('event', 'event_text_change', {
                                    'event_category': '文字控件',
                                    'event_action': '编辑',
                                    'event_label': '文字控件-PC'
                                });
                            },
                            blur: function (event) {
                                var data = event.editor.getData();
                                var editorName = event.editor.name;
                                var txtControlId = 'smv_' + editorName.replace(/txtc_/g, '');
                                var wrapperView = smartViewFactory.getSmartView(txtControlId, 'text');
                                wrapperView.setData("Content", data, false, null);
                                wrapperView.$control.removeData('inlinedbc');
                                //赋值给编辑面板
                                if (window.parent.control_text_editPanel_editor != undefined && $("#pcontrolId", window.parent.document).val() == txtControlId) {
                                    window.parent.control_text_editPanel_editor.setData(data);
                                }
                                wrapperView.enableDrag();
                                var pvid = wrapperView.$control.attr('pvid');
                                if (pvid !== '') {
                                    wrapperView.enableParentDrag(pvid);
                                }
                                $cedit.attr('contenteditable', false);

                                //setTimeout(function () {
                                //    CKEDITOR.instances[editorName].destroy(true);
                                //}, 5);

                            },
                            instanceReady: function (event) {
                                $(this).focus();
                                $(document.body).enableSelection();
                            },
                        },
                        // Allow some non-standard markup that we used in the introduction.
                        extraAllowedContent: 'a(documentation);abbr[title];code',
                        extraPlugins: 'image,lineheight,letterspacing,myColorbutton,myColordialog',
                        removePlugins: 'colorbutton,colordialog',
                        // Show toolbar on startup (optional).
                        startupFocus: true
                    });
            }

            hideConFastPropPanel();
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    }
});


cnsmart.controlResMap["uecontent"] = "ue正文";
var UeContentSmartView = SmartViewBase.extend({
    init: function (id, controlData) {
        this._super(id, 'uecontent', controlData);
    },
    disableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", true);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.disableParentDrag(pvid);
        }
    },
    enableParentDrag: function (pid) {
        var $parent = $('#smv_' + pid);
        $parent.draggable("option", "disabled", false);
        var pvid = $parent.attr('pvid');
        if (pvid !== '') {
            this.enableParentDrag(pvid);
        }
    },
    bindCustomEvents: function () {
        var editConId = this.controlId;
        editConId = editConId.replace(/smv_/g, '');
        var textAreaId = 'txtd_' + editConId;
        editConId = 'txtc_' + editConId;
        CKEDITOR.config.title = false;
        CKEDITOR.disableAutoInline = true;
        $('#' + editConId).dblclick(function (event) {
            var txtControlId = 'smv_' + $(this).attr('id').replace(/txtc_/g, '');
            var txtView = smartViewFactory.getSmartView(txtControlId, 'text');
            txtView.disableDrag();
            txtView.$control.data('inlinedbc', 1);
            var pvid = txtView.$control.attr('pvid');
            if (pvid !== '') {
                txtView.disableParentDrag(pvid);
            }
            $('body').enableSelection();
            var $this = $(this);
            var $cedit = $this.attr('contenteditable', true);
            if (!CKEDITOR.instances[editConId]) {
                CKEDITOR.inline(editConId,
                    {
                        toolbar: [
                            { name: 'styles', items: ['Format',] },
                            { name: 'styles', items: ['Font', 'FontSize'] },
                            { name: 'colors', items: ['TextColor', 'BGColor'] },
                            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', "-", 'CopyFormatting', '-'] },
                            '/',
                            { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'lineheight', 'letterspacing'] },
                            { name: 'insert', items: ['Smiley'] },
                            { name: 'links', items: ['Link', 'Unlink', 'Anchor', 'Table'] },
                        ],
                        on: {
                            change: function (event) {
                                // console.log(event);
                                window.gtag && gtag('event', 'event_text_change', {
                                    'event_category': '文字控件',
                                    'event_action': '编辑',
                                    'event_label': '文字控件-PC'
                                });
                            },
                            blur: function (event) {
                                var data = event.editor.getData();
                                var editorName = event.editor.name;
                                var txtControlId = 'smv_' + editorName.replace(/txtc_/g, '');
                                var wrapperView = smartViewFactory.getSmartView(txtControlId, 'text');
                                wrapperView.setData("Content", data, false, null);
                                wrapperView.$control.removeData('inlinedbc');
                                //赋值给编辑面板
                                if (window.parent.control_text_editPanel_editor != undefined && $("#pcontrolId", window.parent.document).val() == txtControlId) {
                                    window.parent.control_text_editPanel_editor.setData(data);
                                }
                                wrapperView.enableDrag();
                                var pvid = wrapperView.$control.attr('pvid');
                                if (pvid !== '') {
                                    wrapperView.enableParentDrag(pvid);
                                }
                                $cedit.attr('contenteditable', false);

                                //setTimeout(function () {
                                //    CKEDITOR.instances[editorName].destroy(true);
                                //}, 5);

                            },
                            instanceReady: function (event) {
                                $(this).focus();
                                $(document.body).enableSelection();
                            },
                        },
                        // Allow some non-standard markup that we used in the introduction.
                        extraAllowedContent: 'a(documentation);abbr[title];code',
                        extraPlugins: 'image,lineheight,letterspacing,myColorbutton,myColordialog',
                        removePlugins: 'colorbutton,colordialog',
                        // Show toolbar on startup (optional).
                        startupFocus: true
                    });
            }

            hideConFastPropPanel();
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
    }
});

//override
smartViewFactory.afterAreaHeightChanged = function (area) {
    if (window.refreshBgScroll) {
        window.refreshBgScroll();
    }
};