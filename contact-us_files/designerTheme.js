
/*
功能：站点主题左侧弹框相关功能
创建时间：2019/1/3
*/

var siteTheme = {
    _hasSiteTheme: 0,
    init: function () {
        var g = this;
        $.ajax({
            cache: false,
            url: "/Designer/GetSiteColorTheme",
            type: "get",
            success: function (result) {
                if (result.IsSuccess) {
                    var siteTheme = result.data.SiteTheme;
                    var colorSystems = result.data.ColorSystems;
                    if (colorSystems !== null && colorSystems.length > 0) {
                        var siteThemes = result.data.SiteThemes;
                        $.each(colorSystems, function (i) {
                            $("#color_ul").append(kino.razor($("#colorItem").html(), {
                                data: colorSystems[i]
                            }));
                        });
                        if ($("#color_ul li").length > 0) {
                            g.colorClick();
                        }
                        $.each(siteThemes, function (i) {
                            $("#theme_ul").append(kino.razor($("#themeItem").html(), {
                                data: siteThemes[i]
                            }));
                        });
                        if ($("#theme_ul li").length > 0) {
                            g.themeClick();
                            g.themeHover();
                        }
                    }
                    if (siteTheme !== null) {
                        var themeId = siteTheme.ThemeId;
                        var colorSystemId = siteTheme.ColorSystemId;
                        $("#color_ul li[color_Id=" + colorSystemId + "]").addClass("current");
                        $("#theme_ul li[theme_Id=" + themeId + "]").addClass("current");
                        $("#theme_ul li[theme_Id=" + themeId + "] .theme-item-color-name").show();
                        $("#cur_ColorId").val(colorSystemId);
                        $("#cur_ThemeId").val(themeId);
                        $("#cur_SiteThemeId").val(siteTheme.Id);
                        $("#cur_Theme").val(JSON.stringify(siteTheme));
                    }
                    else {
                        $("#color_ul li:first").addClass("current");
                    }

                }
            },
            error: function (e) {
                //alert(e)
            }
        });
    },
    //色系点击事件
    colorClick: function () {
        var g = this;
        $("#color_ul li").unbind("click").click(function () {
            var colorId = $(this).attr("color_id");
            var cur_ColorId = $("#cur_ColorId").val();
            var cur_ThemeId = $("#cur_ThemeId").val();
            $("#color_ul li").removeClass("current");
            $(this).addClass("current");
            $.ajax({
                cache: false,
                url: "/Designer/GetThemesByColorId?colorId=" + colorId,
                type: "get",
                success: function (result) {
                    if (result.IsSuccess) {
                        $("#theme_ul").html("");
                        $.each(result.data, function (i) {
                            $("#theme_ul").append(kino.razor($("#themeItem").html(), {
                                data: result.data[i]
                            }));
                        });
                        if ($("#theme_ul li").length > 0) {
                            g.themeClick();
                            g.themeHover();
                        }
                        if (colorId === cur_ColorId) {
                            $("#theme_ul li[theme_Id=" + cur_ThemeId + "]").addClass("current");
                            $("#theme_ul li[theme_Id=" + cur_ThemeId + "] .theme-item-color-name").show();
                        }
                    }
                },
                error: function (e) {
                    //alert(e)
                }
            });
        });
    },
    //主题点击事件
    themeClick: function () {
        $("#theme_ul li").unbind("click").click(function () {
            var g = this;
            $("#theme_ul li").removeClass("current");
            $(g).addClass("current");
            var themeId = $(this).attr("theme_Id");
            if (themeId === $("#cur_ThemeId").val()) {
                return false;
            }
            nsmart.savePage(null, siteTheme.themeChangeCallBack, null);
        });
    },
    themeChangeCallBack: function () {
        var $li = $("#theme_ul li.current");
        var colorId = $("#color_ul li.current").attr("color_id");
        var themeId = $li.attr("theme_Id");
        var siteThemeId = $("#cur_SiteThemeId").val();
        var curTheme = {
            Id: siteThemeId,
            ColorSystemId: colorId,
            ThemeId: themeId,
            ThemeName: $li.attr("theme_Name"),
            ThemeCode: $li.attr("theme_Code"),
            ThemeType: $li.attr("theme_Type"),
            Zs1: $li.attr("theme_Zs1"),
            Zs2: $li.attr("theme_Zs2"),
            Zxs1: $li.attr("theme_Zxs1"),
            Zxs2: $li.attr("theme_Zxs2"),
            Zxs3: $li.attr("theme_Zxs3"),
            Zxs4: $li.attr("theme_Zxs4"),
            Zxs5: $li.attr("theme_Zxs5"),
            Zs1Hover1: $li.attr("theme_Zs1Hover1"),
            Zs1Hover2: $li.attr("theme_Zs1Hover2"),
            Zs1Hover3: $li.attr("theme_Zs1Hover3"),
            Zs1Bg: $li.attr("theme_Zs1Bg"),
            Zs2Hover1: $li.attr("theme_Zs2Hover1"),
            Zs2Bg: $li.attr("theme_Zs2Bg")
        };
        $.ajax({
            cache: false,
            url: "/Designer/SetSiteTheme",
            data: curTheme,
            type: "post",
            success: function (result) {
                if (result.IsSuccess) {

                    $("#cur_ColorId").val(colorId);
                    $("#cur_ThemeId").val(themeId);
                    $("#cur_SiteThemeId").val(result.Id);
                    $("#cur_Theme").val(JSON.stringify(curTheme));
                    //刷新Iframe
                    document.getElementById('mainFrame').contentWindow.location.reload(true);
                    //判断右侧面板是否为打开状态
                    if ($("#rightEditContainer").css("display") === "block") {
                        //刷新当前控件的色系
                        nsmart.bindThemeSelectItems();
                        //获取当前色系
                        if (typeof (nsmart.getCurSmartView()) !== "undefined") {
                            nsmart.closeDialog();
                        }
                    }
                    siteTheme.initThemeControl(curTheme.ThemeCode, $("#isSumei").val() === "false", curTheme.ThemeType);
                }
            },
            error: function (e) {
                //alert(e)
            }
        });
    },
    //主题悬停事件
    themeHover: function () {
        $("#theme_ul li").hover(function () {
            if (!$(this).hasClass("current")) {
                $(this).find(".theme-item-color-name").show();
            }
        }, function () {
            if (!$(this).hasClass("current")) {
                $(this).find(".theme-item-color-name").hide();
            }
        });
    },
    getCurTheme: function () {
        var curtheme = $("#cur_Theme").val();
        if (curtheme) {
            try {
                return JSON.parse(curtheme);
            } catch (e) {
                console.log(e);
            }
        }
        return null;
    },
    //初始化主题控件 含组合控件
    //isDirectSelling  是否直销  用来加载帮助文档
    //themeType  主题类型 深/浅  用来区分选择json中的哪个色值
    initThemeControl: function (themeCode, isDirectSelling, themeType) {
        var g = this;
        //先屏蔽组建按钮点击
        $("#m-widgetItem01").css("pointer-events", "none");
        $("#m-widgetShow").addClass("f-hide");
        var curDevice = $("#header_switchDevice_ul a.current").parent().attr("device");
        var url = '/static/sitetheme/designerPanel.json';
        //移动端json
        if (curDevice === "mobile") {
            url = '/static/sitetheme/designerPanel_mobile.json';
        }
        $.ajax({
            cache: false,
            url: url,
            dataType: 'json'
        }).done(function (control) {
            //组合控件
            $.ajax({
                cache: false,
                url: '/Designer/GetLibControl',
                type: "get",
                dataType: 'json'
            }).done(function (data) {
                if (!data.IsSuccess) {
                    console.log(data.message);
                    return false;
                }
                var libControl = data.data;
                if (libControl.length > 0) {
                    var areastrip = [];
                    var multicolumnstrip = [];
                    var slidesetstrip = [];
                    var tabstrip = [];
                    var bannerstrip = [];
                    var dialogstrip = [];
                    var popupstrip = [];
                    $.each(libControl, function (i, item) {
                        if (item.ControlTypeName === "area" || item.ControlTypeName === "arealimit") {
                            var areaobj = g.generateObj(item);
                            areastrip.push(areaobj);
                        }
                        if (item.ControlTypeName === "multicolumn" || item.ControlTypeName === "multicolumnlimit") {
                            var multiobj = g.generateObj(item);
                            multicolumnstrip.push(multiobj);
                        }
                        if (item.ControlTypeName === "slideset" || item.ControlTypeName === "slidesetlimit") {
                            var slidesetobj = g.generateObj(item);
                            slidesetstrip.push(slidesetobj);
                        }
                        if (item.ControlTypeName === "tab" || item.ControlTypeName === "tablimit") {
                            var tabobj = g.generateObj(item);
                            tabstrip.push(tabobj);
                        }
                        if (item.ControlTypeName === "banner" || item.ControlTypeName === "bannerlimit") {
                            var bannerobj = g.generateObj(item);
                            bannerstrip.push(bannerobj);
                        }
                        if (item.ControlTypeName === "dialog" || item.ControlTypeName === "dialoglimit") {
                            var dialogobj = g.generateObj(item);
                            dialogstrip.push(dialogobj);
                        }
                        if (item.ControlTypeName === "popup" || item.ControlTypeName === "popuplimit") {
                            var popupobj = g.generateObj(item);
                            popupstrip.push(popupobj);
                        }
                    });
                    $.each(control.layout, function (i, item) {
                        $.each(item.data, function (i, itemDetail) {
                            if (itemDetail.type === "x-area") {
                                areastrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(areastrip);
                            }
                            if (itemDetail.type === "x-multicolumn") {
                                multicolumnstrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(multicolumnstrip);
                            }
                            if (itemDetail.type === "x-slideset") {
                                slidesetstrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(slidesetstrip);
                            }
                            if (itemDetail.type === "x-tab") {
                                tabstrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(tabstrip);
                            }
                            if (itemDetail.type === "x-banner") {
                                bannerstrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(bannerstrip);
                            }
                            if (itemDetail.type === "x-dialog") {
                                dialogstrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(dialogstrip);
                            }
                            if (itemDetail.type === "x-popup") {
                                popupstrip.sort(g.sortDisplayId);
                                itemDetail.libWidgets = itemDetail.libWidgets.concat(popupstrip);
                            }
                        });
                    });
                }
                //未选择主题时会渲染左侧图标面板，选择后则不重新渲染
                widgets.layout(control, isDirectSelling, themeType);
                //点击空白区域关闭列表框
                $(document).click(function (e) {
                    var _box = $("#themeBox");
                    if (_box.css("display") === "block") {
                        var _headerTheme = $("#headerTheme");
                        var closeTheme = $("#themeBox .u-closePanels");
                        var inHeaderTheme = _headerTheme.is(e.target) || _headerTheme.has(e.target).length > 0;
                        var inPannel = _box.is(e.target) || _box.has(e.target).length > 0;

                        if (closeTheme.is(e.target) || closeTheme.has(e.target).length > 0) {
                            _box.hide(200);
                        }
                        if (!(inHeaderTheme || inPannel)) {
                            if (_box.css("display") === "block") {
                                _box.hide(200);
                            };
                        }
                    }
                });

                widgets.setTheme(themeCode);
                initControlKey();
                $("#m-widgetItem01").css("pointer-events", "all");
            });
        });
    },
    sortDisplayId: function(a,b){
        return a.displayOrder - b.displayOrder;  
    },
    generateObj: function (item) {
        return {
            layout: item.Col,
            tag: "strip",
            version: item.Version,
            libraryId: item.LibraryId,
            isPrepared: item.IsPrepared,
            displayOrder: item.DisplayOrder,
            thumbnailUrl: item.ThumbnailUrl
        };
    }
}