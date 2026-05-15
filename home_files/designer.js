//表单面板Ajax加载
var xForm;
(function (xForm) {
    var dataLoader = (function () {
        var dataLoader = function () {
        }
        dataLoader.isLoad = false;
        dataLoader._currentFormId = {};
        dataLoader.getSelectedOnce = function () {
            var currentForm = dataLoader._currentForm;
            dataLoader.currentForm = {};
            return currentForm;
        }
        dataLoader.queryForm = function () {
            var currentPageIndex = parseInt($("#form-formpagelist").attr("data-cpage"));
            var pageIndex = parseInt($("#form-formpagelist").find("a.current").parent().attr("data-page") || 0);
            $("#form-formpagelist").find(".current").removeClass("current");
            $("#form-formpagelist").find(".x-normal[data-page='" + pageIndex + "']").find("a").addClass("current");
            if (currentPageIndex == pageIndex) {
                return;
            }
            var pageSize = 10;
            $.ajax({
                cache: false,
                url: "/FormDesigner/LoadUseFormPageList",
                data: {
                    searchKey: "",
                    pageIndex: pageIndex,
                    pageSize: pageSize
                },
                type: "post",
                success: function (data) {
                    if (!data.Error) {
                        var html = "";
                        if (data.TotalCount == 0) {
                            $("#noSearchFormPicture").show();
                        } else {
                            $("#noSearchFormPicture").hide();
                        }
                        for (var i = 0; i < data.FormPageList.length; i++) {
                            var item = data.FormPageList[i];
                            html += (
                                '<li class="u-foitem f-clearfix form-pagelist-item" data-formId=' + item.Id + '>'
                                + '<div class="u-fotlang">'
                                + $(".m-chen-text").html()
                                + '</div>'
                                + '<div class="u-fotitle">'
                                + item.Title
                                + '</div>'
                                + '<div class="u-fomask">'
                                + '<a class="btn btn-info">选择</a>'
                                + '</div>'
                                + '</li>');
                        }
                        $("#form-pagelist").html(html);
                        var pageCount = Math.max(parseInt((data.TotalCount - 1) / pageSize), 0); // 0,1,2,3,4 startwith 0
                        $("#form-formpagelist").find("a.Link-disabled").removeClass("Link-disabled");
                        $("#form-formpagelist").find(".x-firstpage")
                            .attr("data-page", 0)
                            .find("a").toggleClass("Link-disabled", 0 == pageIndex);
                        $("#form-formpagelist").find(".x-prevpage")
                            .attr("data-page", Math.max(pageIndex - 1, 0))
                            .find("a").toggleClass("Link-disabled", 0 == pageIndex);
                        $("#form-formpagelist").find(".x-lastpage")
                            .attr("data-page", pageCount)
                            .find("a").toggleClass("Link-disabled", pageCount == pageIndex);
                        $("#form-formpagelist").find(".x-nextpage")
                            .attr("data-page", Math.min(pageIndex + 1, pageCount))
                            .find("a").toggleClass("Link-disabled", pageCount == pageIndex);
                        var startNum = Math.max(pageIndex - 2, 0);
                        $("#form-formpagelist").find(".x-0").attr("data-page", startNum).find("a").html(startNum + 1);
                        $("#form-formpagelist").find(".x-1").attr("data-page", startNum + 1).toggle(startNum + 1 <= pageCount).find("a").html(startNum + 2);
                        $("#form-formpagelist").find(".x-2").attr("data-page", startNum + 2).toggle(startNum + 2 <= pageCount).find("a").html(startNum + 3);
                        $("#form-formpagelist").find(".x-3").attr("data-page", startNum + 3).toggle(startNum + 3 <= pageCount).find("a").html(startNum + 4);
                        $("#form-formpagelist").find(".x-4").attr("data-page", startNum + 4).toggle(startNum + 4 <= pageCount).find("a").html(startNum + 5);

                        $("#form-formpagelist").find(".current").removeClass("current");
                        $("#form-formpagelist").find(".x-normal[data-page='" + pageIndex + "']").find("a").addClass("current");
                        $("#form-formpagelist").attr("data-cpage", pageIndex);
                    }
                },
                error: function (f) {
                }
            });
        }
        dataLoader.loadForm = function () {
            if (dataLoader.isLoad) {
                console.log("loadcache");
                return;
            }
            dataLoader.isLoad = true;
            dataLoader.queryForm();
        }
        dataLoader.reloadForm = function () {
            dataLoader.isLoad = false;
            dataLoader.loadForm();
        }
        dataLoader.bindEvent = function () {
            // 表单展示区
            $("#li_bar_formpage").bind("click", function () {
                // 如果是手机端自适应页面左侧（表单）中间的提示文本突出显示，无其他点击效果
                if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                    return;
                }
                if ($(this).hasClass("z-current")) {
                    $("#m-widgetItem-box-left .m-widgetItem").removeClass("z-current");
                } else {
                    $("#m-widgetItem-box-left .m-widgetItem").removeClass("z-current");
                    $(this).addClass("z-current");
                }
                $("#m-formShow").toggleClass("f-hide");
                $("#m-widgetShow-left .m-widgetShow-mask").removeClass("f-hide");
                $("#m-widgetShow-left").addClass('f-hide');
                $("#li_bar_dialog").removeClass("z-current");
                $("#m-dialogShow").addClass("f-hide");
                dataLoader.loadForm();
            });
            $("#m-formShow .u-close-widgetShow").bind("click", function () {
                $("#m-formShow").addClass("f-hide");
                $("#li_bar_formpage").removeClass("z-current");
                $("#m-formShow .m-widgetShow-mask").addClass("f-hide");
            });
            $("#m-formShow .m-widgetShow-mask").bind("click", function () {
                $("#m-formShow").addClass("f-hide");
                $("#li_bar_formpage").removeClass("z-current");
                $(this).addClass("f-hide");
            });
            $("#form-pagelist").on("click", ".form-pagelist-item", function () {
                if ($("#mainFrame").contents().find(".esmartMargin[ctype=formpanel]").not(".smart-deleted").length == 1) {
                    return alert("页面只能添加一个表单！");
                }
                dataLoader._currentForm = { Id: $(this).attr("data-formId"), Title: $(this).find(".u-fotitle").text() };
                $('#mainFrame')[0].contentWindow.smartViewFactory.setWaitAddView("formpanel", "Style1", "Item0");
                $(".u-close-widgetShow").click();
            });
            $("#form-formpagelist").on("click", ".page-item", function () {
                $("#form-formpagelist").find(".current").removeClass("current");
                $(this).find("a").addClass("current");
                dataLoader.queryForm();
            });
        }
        return dataLoader;
    }());
    xForm.dataLoader = dataLoader;
})(xForm || (xForm = {}));



//designer
(function () {
    // m-tool-collect
    $(".m-tool-collect").hover(function () {
        $(this).find(".dropdown-menu").stop().fadeIn("1000");
        $(this).find(".tool-itemLink").addClass("current");
    }, function () {
        $(this).find(".dropdown-menu").stop().fadeOut("fast");
        $(this).find(".tool-itemLink").removeClass("current");
    });



    $(".morewrap-btn01").bind("click", function () {
        $(".m-widget-morewrap").animate({ bottom: "0", top: "0" }, "fast");
        $(this).next().next(".widgeTitle-template-scroll").removeClass("f-hide");
        $(this).parent().prev().addClass("f-hide");
        $(this).addClass("f-hide");
        $(".morewrap-btn02").removeClass("f-hide");

        var $target = $(".widgetShow-link:visible:first");
        var widgetShow = $target.attr("data-content");
        $(".m-widgetShow-list .widgetShow-item .widgetShow-link").removeClass("z-current")
        $target.addClass("z-current");
        $(".m-widgetShow-right>div").hide();
        InitialSelectPanel($(widgetShow));
    });

    $(".morewrap-btn02").bind("click", function () {
        $(".m-widget-morewrap").animate({ bottom: "-45px", top: "100%" }, "fast");
        $(this).addClass("f-hide");
        $(this).parent().prev().removeClass("f-hide");
        $(".morewrap-btn01").removeClass("f-hide");
        $(this).next(".widgeTitle-template-scroll").addClass("f-hide");

        var $target = $(".widgetShow-link:visible:first");
        var widgetShow = $target.attr("data-content");
        $(".m-widgetShow-list .widgetShow-item .widgetShow-link").removeClass("z-current")
        $target.addClass("z-current");
        $(".m-widgetShow-right>div").hide();
        InitialSelectPanel($(widgetShow));
    });

    // m-mobfra-item
    $(".m-mobfra-setul .m-mobfra-item").hover(function () {
        $(this).find(".dropdown-menu").stop().fadeIn("1000");
        $(this).find(".m-mobfra-link").addClass("z-current");
    }, function () {
        $(this).find(".dropdown-menu").stop().fadeOut("fast");
        $(this).find(".m-mobfra-link").removeClass("z-current");
    });



})(jQuery);


(function () {
    // m-business-choose
    $(".m-business-choose").hover(function () {
        $(this).find(".dropdown-menu").stop().fadeIn("1000");
        $(this).find(".u-little-choose").addClass("current");
    }, function () {
        $(this).find(".dropdown-menu").stop().fadeOut("fast");
        $(this).find(".u-little-choose").removeClass("current");
    });

    // 页面选择 m-menu-panels  m-pageSet-panels   m-editSystem-panels  m-eheadFoot-panels   m-reheadFoot-panels
    $(".m-opened-mask").bind("click", function () {
        $(".m-opened-panels,.m-menu-panels").addClass("f-hide");
        $(".m-pageSet-panels,.m-eheadFoot-panels,.m-eheadFoot-panels").addClass("f-hide");
        $(".m-pageSelect-top").animate({ width: "200px" }, "fast");
        $(".m-page-search").animate({ width: "200px", left: "-200px" }, "fast");
    });
    $(".m-page-current").bind("click", function () {
        $(".m-opened-panels,.m-menu-panels,.m-opened-mask").removeClass("f-hide");
        $(this).parent(".m-pageSelect-top").animate({ width: "260px" }, "fast");
        $(this).next(".m-page-search").animate({ width: "260px", left: "0" }, "fast");

        $("#m-widgetShow-left").addClass("f-hide");
        $("#m-widgetItem-box-left .m-widgetItem").removeClass("z-current");
        $(".m-widgetShow-mask").addClass("f-hide");
    });
    $(".u-closePanels").bind("click", function (e) {
        e.stopPropagation();
        $(".m-opened-panels,.m-menu-panels,.m-opened-mask").addClass("f-hide");
        $(".m-pageSelect-top").animate({ width: "200px" }, "fast");
        $(".m-page-search").animate({ width: "200px", left: "-200px" }, "fast");
    });
    $(".u-setPage").bind("click", function () {
        $(".m-pageSet-panels").removeClass("f-hide");
        $(".m-editSystem-panels,.m-eheadFoot-panels,.m-reheadFoot-panels").addClass("f-hide");
    });
    $(".u-closePageset").bind("click", function () {
        $(".m-pageSet-panels").addClass("f-hide");
    });
    $(".u-re-hefoPage").bind("click", function () {
            // 如果是手机端自适应页面 中间的提示文本突出显示，无其他点击效果
        if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                return;
            }
        $(".m-reheadFoot-panels").removeClass("f-hide");
        $(".m-eheadFoot-panels,.m-editSystem-panels,.m-pageSet-panels").addClass("f-hide");
    });
    $(".u-closeReheadFoot").bind("click", function () {
        $(".m-reheadFoot-panels").addClass("f-hide");
    });
    $(".u-closeitheadFoot").bind("click", function () {
        $(".m-eheadFoot-panels").addClass("f-hide");
    });
    $(".u-edit-hefoPage").bind("click", function () {
        $(".m-eheadFoot-panels").removeClass("f-hide");
        $(".m-editSystem-panels,.m-pageSet-panels,.m-reheadFoot-panels").addClass("f-hide");
    });
    $(".u-closeEditPage").bind("click", function () {
        $(".m-editSystem-panels").addClass("f-hide");
    });
    $(".u-openSysManage").bind("click", function () {
        $(".m-systemPage-manage").removeClass("f-hide");
        $(".m-systemPage-manage").animate({ top: "0" }, "fast");
        $(".m-systemPage-manage").addClass("animatetop");
        $(this).parent().prev().parent().find(".m-page-tree").addClass("f-hide");
    });
    $(".u-closeSysManage").bind("click", function () {
        $(".m-systemPage-manage").addClass("f-hide");
        $(".m-systemPage-manage").animate({ top: "100%" }, "fast");
        $(".m-systemPage-manage").removeClass("animatetop");
        $(this).parent().parent().prev().find(".m-page-tree").removeClass("f-hide");
    });
    $(".u-setSysManage").bind("click", function () {
        $(".m-editSystem-panels").removeClass("f-hide");
        $(".m-pageSet-panels,.m-eheadFoot-panels,.m-reheadFoot-panels").addClass("f-hide");
    });

    // 切换单页
    $(".u-switch-singlPage,.u-switchSingl-system").bind("click", function () {
        $(".m-opened-panels").addClass("f-hide");
        $(".m-pageSelect-top").animate({ width: "200px" }, "fast");
        $(".m-page-search").animate({ width: "200px", left: "-200px" }, "fast");
    });

    // 组件展示区
    $('#m-widgetItem-box-left').on('click', 'li', function (e) {
        // 如果是手机端自适应页面左侧（内容、功能、设计、高级、表单）中间的提示文本突出显示，无其他点击效果
        if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
            return;
        }
        //debugger
        //var curDevice = $("#header_switchDevice_ul a.current").parent().attr("device");

        var $this = $(this);
        var targetCategoryType = $this.attr('data-category');
        // 分类的小三角 top值
        var droprightTriangleTop = $this.offset().top - $this.height() / 2;

        // 关闭展开样式
        $('#widgetpanellist-left .widgetpanellist-left__expand').hide().trigger('close')

        if (targetCategoryType) {
            if (targetCategoryType === 'content') {
                $("#useControlList").html($("#contentCategoryControl").html());
                if (pageTypeName === 'ContentPage' || pageTypeName === 'TemplatePage') {
                    droprightTriangleTop = 28;
                } else {
                    droprightTriangleTop = 90;
                }
            } else if (targetCategoryType === 'function') {
                $("#useControlList").html($("#functionCategoryControl").html());
                if (pageTypeName === 'ContentPage' || pageTypeName === 'TemplatePage') {
                    droprightTriangleTop = 90;
                } else {
                    droprightTriangleTop = 152;
                }
            } else if (targetCategoryType === 'design') {
                $("#useControlList").html($("#designCategoryControl").html());
                if (pageTypeName === 'ContentPage' || pageTypeName === 'TemplatePage') {
                    droprightTriangleTop = 152;
                } else {
                    droprightTriangleTop = 214;
                }
            } else if (targetCategoryType === 'high') {
                $("#useControlList").html($("#advancedCategoryControl").html());
                if (pageTypeName === 'ContentPage' || pageTypeName === 'TemplatePage') {
                    droprightTriangleTop = 214;
                } else {
                    droprightTriangleTop = 276;
                }
            } else if (targetCategoryType === 'system') {
                if (pageTypeName === 'ContentPage' || pageTypeName === 'TemplatePage') {
                    droprightTriangleTop = 276;
                } else {
                    droprightTriangleTop = 28;
                }
                switch (pageTypeName) {
                    case "NewsContentPage":
                        $("#useControlList").html($("#newsControl").html());
                        break;
                    case "ProductContentPage":
                        $("#useControlList").html($("#productControl").html());
                        break;
                    case "NewsSearchPage":
                        $("#useControlList").html($("#newsSearchControl").html());
                        break;
                    case "ProductSearchPage":
                        $("#useControlList").html($("#productSearchControl").html());
                        break;
                    case "NewsCategoryPage":
                        $("#useControlList").html($("#newsCategoryControl").html());
                        break;
                    case "ProductCategoryPage":
                        $("#useControlList").html($("#productCategoryControl").html());
                        break;
                }
            } else if (targetCategoryType === 'source') {
                // 点击素材
                $("#useControlList").html($("#sourceCategoryControl").html());
                $('#widgetpanellist-left .widgetpanellist-left__expand').show().trigger('open')
                if (pageTypeName === 'ContentPage' || pageTypeName === 'TemplatePage') {
                    droprightTriangleTop = 276;
                } else {
                    droprightTriangleTop = 330;
                }
            }
            
            // 分类弹窗 左侧小三角 设置top
            $('#droprightTriangle').css({ 'top': droprightTriangleTop + 'px' });

            // 组件面板切换--hover切换
            var tool_Panel_SwitchFlag;
            $("#widgetlist-left .m-widgetShow-list .widgetShow-item .widgetShow-link").hover(function () {
                clearTimeout(tool_Panel_SwitchFlag);
                var $this = $(this);
                tool_Panel_SwitchFlag = setTimeout(function () {
                    var widgetShow = $this.attr("data-content");
                    $("#widgetlist-left .m-widgetShow-list .widgetShow-item .widgetShow-link").removeClass("z-current");
                    $this.addClass("z-current");
                    $(".m-widgetShow-right>div").hide();
                    InitialSelectPanel($(widgetShow));
                    layoutPullorStatic($(widgetShow))
                }, 300);

                return false;
            }, function () {
                clearTimeout(tool_Panel_SwitchFlag);
            });
            // 分类按钮选中样式 设置
            if ($this.hasClass('z-current')) {
                $(".m-widgetItem").removeClass("z-current");
                $("#m-widgetShow-left").addClass("f-hide");
            } else {
                $(".m-widgetItem").removeClass("z-current");
                $this.addClass("z-current");
                $("#m-widgetShow-left").removeClass("f-hide");
            }

            $(".m-widgetShow-mask").removeClass("f-hide");
            $("#li_bar_dialog").removeClass("z-current");
            $("#m-dialogShow").addClass("f-hide");
            $("#m-formShow").addClass("f-hide");
            //关闭页面弹框
            if ($(".u-closePanels").length > 0) {
                $(".u-closePanels").click();
            }
            var $curlink = $(".widgetShow-link:visible.z-current");
            var curIndex = $curlink.parent().index();
            if (curIndex === 0 || curIndex == -1) {
                var $target = $(".widgetShow-link:visible:first");
                var widgetShow = $target.attr("data-content");
                $(".m-widgetShow-list .widgetShow-item .widgetShow-link").removeClass("z-current")
                $target.addClass("z-current");
                $(".m-widgetShow-right>div").hide();
                InitialSelectPanel($(widgetShow));
                $(widgetShow).find("img").each(function () {
                    $(this).attr("src", $(this).attr("data-original"));
                })
            } else {
                $(".m-widgetShow-right>div").hide();
                var curTarget = $curlink.attr("data-content");
                InitialSelectPanel($(curTarget));
                $("#widgetpanellist-left " + curTarget).show();
            }
        }
    })
    //$("#m-widgetItem01").bind("click", function () {
    //    //debugger;
    //    $(this).toggleClass("z-current");
    //    $("#m-widgetShow-left").toggleClass("f-hide");
    //    $(".m-widgetShow-mask").removeClass("f-hide");

    //    $("#li_bar_dialog").removeClass("z-current");
    //    $("#m-dialogShow").addClass("f-hide");
    //    //关闭页面弹框
    //    if ($(".u-closePanels").length > 0) {
    //        $(".u-closePanels").click();
    //    }
    //    var $curlink = $(".widgetShow-link:visible.z-current");
    //    var curIndex = $curlink.parent().index();
    //    if (curIndex === 0 || curIndex == -1) {
    //        var $target = $(".widgetShow-link:visible:first");
    //        var widgetShow = $target.attr("data-content");
    //        $(".m-widgetShow-list .widgetShow-item .widgetShow-link").removeClass("z-current")
    //        $target.addClass("z-current");
    //        $(".m-widgetShow-right>div").hide();
    //        InitialSelectPanel($(widgetShow));
    //        $(widgetShow).find("img").each(function () {
    //            $(this).attr("src", $(this).attr("data-original"));
    //        })
    //    } else {
    //        $(".m-widgetShow-right>div").hide();
    //        var curTarget = $curlink.attr("data-content");
    //        InitialSelectPanel($(curTarget));
    //        $("#widgetpanellist-left " + curTarget).show();
    //    }
    //});
    //$(".u-close-widgetShow").bind("click", function () {
    //    $("#m-widgetShow-left").addClass("f-hide");
    //    $(".m-widgetItem").removeClass("z-current");
    //    $(".m-widgetShow-mask").addClass("f-hide");
    //});
    //$(".m-widgetShow-mask").bind("click", function () {
    //    $("#m-widgetShow-left").addClass("f-hide");
    //    $(".m-widgetItem[data-category]").removeClass("z-current");
    //    $(this).addClass("f-hide");
    //});

    //绑定表单事件
    xForm.dataLoader.bindEvent();

    //// 组件面板切换
    //var tool_Panel_SwitchFlag;
    //console.log($(".m-widgetShow-list .widgetShow-item .widgetShow-link"))
    //$(".m-widgetShow-list .widgetShow-item .widgetShow-link").hover(function () {
    //    debugger
    //    clearTimeout(tool_Panel_SwitchFlag);
    //    var $this = $(this);
    //    tool_Panel_SwitchFlag = setTimeout(function () {
    //        var widgetShow = $this.attr("data-content");
    //        $("#widgetlist-left .m-widgetShow-list .widgetShow-item .widgetShow-link").removeClass("z-current")
    //        $this.addClass("z-current");
    //        $(".m-widgetShow-right>div").hide();
    //        InitialSelectPanel($(widgetShow));
    //    }, 300);

    //    return false;
    //}, function () {
    //    clearTimeout(tool_Panel_SwitchFlag);
    //});

    // 图片素材管理
    $(".pic-paixu-btn.icon-xu-down-info").click(function () {
        $(this).toggleClass("icon-rotate-180");
    });
    // 选中图片
    $(".picbox-content-list .picbox-pic .picbox-pic-in").click(function () {
        $(this).parent().parent(".picbox-content-item").toggleClass("current");
    });
    // 预览大图
    $(".picbox-modal").hide();
    $(".picbox-modal-close").click(function () {
        $(".picbox-modal").hide();
    });
    $(".picbox-pic .picbox-view .icon-see-current").click(function () {
        $(".picbox-modal").fadeIn();
    });
    $(".picbox-btn-cancel").click(function () {
        $(".picbox-modal").hide();
    });

})(jQuery);

(function () {
    //弹框显示区
    $("#li_bar_dialog").bind("click", function () {
        if ($(this).hasClass("z-current")) {
            $("#m-widgetItem-box-left .m-widgetItem").removeClass("z-current");
        } else {
            $("#m-widgetItem-box-left .m-widgetItem").removeClass("z-current");
            $(this).addClass("z-current");
        }
        $("#m-dialogShow").toggleClass("f-hide");
        $("#m-widgetShow-left .m-widgetShow-mask").removeClass("f-hide");
        $("#m-widgetShow-left").addClass("f-hide");
        $("#m-formShow").addClass("f-hide");
        showDialogModal();
    });
    $("#m-dialogShow .u-close-widgetShow").bind("click", function () {
        $("#m-dialogShow").addClass("f-hide");
        $("#li_bar_dialog").removeClass("z-current");
        $("#m-formShow .m-widgetShow-mask").addClass("f-hide");
    });
    $("#m-dialogShow .m-widgetShow-mask").bind("click", function () {
        $("#m-dialogShow").addClass("f-hide");
        $("#li_bar_dialog").removeClass("z-current");
        $(this).addClass("f-hide");
    });
    $("#btnShowDialogPanel").bind("click", function () {
        showDialogPanel();
    });
})(jQuery);

// scroll
function scrollHeight() {
    $(".pageSet-scroll").height($(window).height() - 219);
    $(".sysPage-scroll").height($(window).height() - 228);
    $(".pageTab-scroll").height($(window).height() - 270);
    $('.ue-box-scroll-height').height($(window).height() - 315);
    $('.ue-box-pageTab-scroll').height($(window).height() - 200);
    $(".theme-pageTab-scroll").height($(window).height() - 110);
    $(".searchPage-scroll").height($(window).height() - 178);
    $(".widget-template-scroll").height($(window).height() - 127);
    $(".widgeTitle-template-scroll").height($(window).height() - 106);
    $(".picbox-scroll").height($(window).height() - 295);
    $(".picbox-sc-scroll").height($(window).height() - 244);
    // $(".m-widgetShow-he").height($(window).height() - 61);

    $(window).bind("resize", function () {
        $(".pageSet-scroll").height($(window).height() - 219);
        $(".sysPage-scroll").height($(window).height() - 228);
        $(".pageTab-scroll").height($(window).height() - 270);
        $('.ue-box-scroll-height').height($(window).height() - 315);
        $('.ue-box-pageTab-scroll').height($(window).height() - 200);
        $(".theme-pageTab-scroll").height($(window).height() - 110);
        $(".searchPage-scroll").height($(window).height() - 178);
        $(".widget-template-scroll").height($(window).height() - 127);
        $(".widgeTitle-template-scroll").height($(window).height() - 106);
        $(".picbox-scroll").height($(window).height() - 295);
        $(".picbox-sc-scroll").height($(window).height() - 244);
        $(".m-widgetShow-he").height($(window).height() - 61);
    });
}





//modal 操作短提示
function modalShot(tips) {
    tips.animate({ top: '60px', opacity: '1' }, "fast");
    tips.animate({ top: '60px', opacity: '1' }, 1800);
    tips.animate({ top: '-34px', opacity: '0' }, "fast");
};

function showSuccess(msg) {
    var tips = $(".modal-xshot-success");
    if ('' != msg) {
        tips.find('span.modal-xshot-text').html(msg);
    }
    modalShot(tips);
}
function showWarning(msg) {
    var tips = $(".modal-xshot-warning");
    if ('' != msg) {
        tips.find('span.modal-xshot-text').html(msg);
    }
    modalShot(tips);
}
function showFailure(msg) {
    var tips = $(".modal-xshot-failure");
    if ('' != msg) {
        tips.find('span.modal-xshot-text').html(msg);
    }
    modalShot(tips);
}
function showNormal(msg) {
    var tips = $(".modal-xshot-normal");
    if ('' != msg) {
        tips.find('span.modal-xshot-text').html(msg);
    }
    modalShot(tips);
}

// lzslider
function lzslider(lzParcel) {
    var current = '<i class="icon icon-pic-checked"></i>';
    // 调用lzslider
    var $itme = $(lzParcel).find('.u-inner-box'),
        $corrow = $(lzParcel).find('.u-slider-btn > li'),
        $corrowL = $(lzParcel).find('.u-slider-btn > li.u-arrow-left'),
        $corrowR = $(lzParcel).find('.u-slider-btn > li.u-arrow-right'),

        sliderTool = $(lzParcel).find('.u-slider').lzslider({
            cycle: false,
            auto: false,
            arrowStyle: false,
            event: false,
            num: 1,
        });

    // 自定义控制箭头
    $corrow.off('click').on('click', function () {
        var $this = $(this);
        $this.hasClass('u-arrow-left') && sliderTool.prev();
        $this.hasClass('u-arrow-right') && sliderTool.next();
    });

    sliderTool.on('last', function () {
        $corrowR.addClass('disabled');
        $corrowL.removeClass('disabled');
    });

    sliderTool.on('switch', function () {
        sliderTool.index() == 1 && ($corrowR.removeClass('disabled'), $corrowL.addClass('disabled'))
    })

    // 选中效果
    $itme.each(function (index, el) {
        $(el).hasClass('current') && $(el).append(current)
    });

    $itme.off('click').on('click', function () {
        var $this = $(this);
        $itme.removeClass('current');
        $this.addClass('current');
        if ($this.hasClass('current')) {
            $itme.find('.icon-pic-checked').remove();
            $this.append(current)
        }
    })

};

function InitialSelectPanel(widget) {
    var anchors = widget.find(".m-widget-template").find(".u-widget-temTitle[data-title]").not(".f-hide");
    var navanchors = $("#nav-anchors");
    if (anchors.length > 1) {
        var anchorshtml = '';
        for (var i = 0; i < anchors.length; i++) {
            var cur = $(anchors[i]);
            var aid = cur.attr("id");
            if (typeof (aid) == "undefined") {
                aid = trimguid();
                cur.attr("id", aid);
            }
            var title = cur.data("title");
            var curClass = i == 0 ? " z-current" : "";
            anchorshtml += '<li class="m-sections-item">' +
                '<a href="#' + aid + '" class="m-sections-link' + curClass + '">' +
                '<div class="m-sections-pin lzprompt-right" data-lztitle="' + title + '" data-lzclass="lzprompt-white"></div>' +
                '</a>' +
                '</li>';

        }
        navanchors.find(".m-anchors-sections").html(anchorshtml);
        $.lzprompt();
        var scrollOff = true;
        navanchors.find("a[href*=#]").off("click").on("click", function () {
            scrollOff = false;
            navanchors.find(".z-current").removeClass("z-current");
            $(this).addClass("z-current");
            var target = $($(this).attr("href"));
            if (target.length) {
                var scrollbar = target.closest(".f-scrollbar");
                var targetOffSet = scrollbar.scrollTop() + (target.offset().top - 94);
                var sbtool = scrollbar.scrollTool();
                sbtool.refresh().scrollTop(targetOffSet, 500, function () {
                    scrollOff = true;
                });
            }
            return false;
        });
        var targetArr = [];
        targetArr.push(navanchors.find("a[href*=#]"));
        var targetBoxArr = [];
        for (var i = 0; i < targetArr[0].length; i++) {
            targetBoxArr.push($($(targetArr[0][i]).attr('href')));
        }
        var scrollbar = $(targetBoxArr[0]).closest(".f-scrollbar");
        var sbtool = scrollbar.scrollTool();
        var scrollFlag = true;
        sbtool.scroll(function (data) {
            var me = sbtool;
            var targetOffSet = [];
            $(targetBoxArr).each(function (index, el) {
                targetOffSet[index] = $(el).offset().top;
            });
            if (scrollFlag && scrollOff) {
                scrollFlag = false
                var xxx = setTimeout(function () {
                    scrollFlag = true;
                    for (i in targetOffSet) {

                        if (targetOffSet[i] < 250 && (targetOffSet[i] >= -50)) {
                            navanchors.find("a[href*=#]").removeClass('z-current').eq(i).addClass('z-current');
                        }
                    }
                    clearTimeout(xxx);
                    xxx = null;
                }, 150);
            }
        })
        navanchors.show();
    } else {
        navanchors.find(".m-anchors-sections").html("");
        navanchors.hide();
    }

    widget.find("img").each(function () {
        $(this).attr("src", $(this).attr("data-original"));
    })
    widget.show();

    widget.addClass('current').siblings().removeClass('current');
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
function trimguid() {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

function showDialogModal() {
    var smartArray = nsmart.childContent().find(".smartAbs[ctype='dialog']");//.smvContainer 
    var html = "";
    smartArray.each(function () {
        if (!$(this).hasClass("smart-deleted")) {
            var controlId = $(this).attr("id");
            var controlTitle = $(this).find(".w-modal-data").attr("data-title");
            var isDefault = $(this).find(".w-modal-data").attr("data-isdefault");
            if (isDefault == "1") {
                html = html + '<li class="u-foitem bf-clearfix" data-controlId="' + controlId + '"> <div class="u-fotbtn"><div class="btn btn-borinfo cancelDilogDefault">取消默认</div></div><div class="u-fotitle" style="float:none;width:auto;">' + controlTitle + '<span data-lztitle="访问该页面时，该弹窗自动展示在页面之上" class="btn btn-borinfo  lzprompt-bottom" style="display:inline;padding: 0 8px; margin-top: -3px; margin-left: 5px;border-color: #ddd; color: #aaa;font-size: 12px;">默认</span></div></li>';
            }
            else {
                html = html + '<li class="u-foitem bf-clearfix" data-controlId="' + controlId + '"><div class="u-fotbtn"><div class="btn btn-borinfo default">设为默认的打开弹窗</div></div><div class="u-fotitle" style="float:none;width:auto;">' + controlTitle + '</div></li>';
            }
        }
    });

    $("#m-dialogShow .m-folist").html(html);
    $.lzprompt();
    $("#m-dialogShow").off("click");
    $("#m-dialogShow").on("click", ".m-folist li", function () {
        var controlId = $(this).attr("data-controlId");
        showDialogDesigner(controlId);
        $(this).closest(".m-formsel").addClass("f-hide");
        return false;
    });
    $("#m-dialogShow").on("click", ".m-folist li .cancelDilogDefault", function () {
        var controlId = $(this).closest("li").attr("data-controlId");
        defaultDialogModel(controlId, false);
        return false;
    });
    $("#m-dialogShow").on("click", ".m-folist li .default", function () {
        var controlId = $(this).closest("li").attr("data-controlId");
        defaultDialogModel(controlId, true);
        return false;
    });
}

function toggleDialogModel() {
    var smartArray = nsmart.childContent().find(".smartAbs[ctype='dialog']");
    var exists = false;
    if (smartArray.length > 0) {
        smartArray.each(function () {
            if (!$(this).hasClass("smart-deleted")) {
                exists = true;
            }
        });
    }
    if (exists) {
        $("#li_bar_dialog").removeClass("f-hide");
        $("#m-dialogShow").addClass("f-hide");
    }
    else {
        $("#li_bar_dialog").addClass("f-hide");
        $("#m-dialogShow").addClass("f-hide");
    }
}
function showDialogDesigner(controlId) {
    if (controlId == "") {
        return false;
    }
    var selectedControlId = dialogHeader.currentDialogControlId;
    if (selectedControlId != undefined && selectedControlId != "") {
        var $control = nsmart.childContent().find("#" + selectedControlId);
        var $mask = nsmart.childContent().find("#" + selectedControlId + "_dialog_modal_mask");
        $control.hide();
        $mask.hide();
    }
    if (controlId == selectedControlId && nsmart.childContent().find("#" + controlId).is(':visible')) {
        return;
    }
    nsmart.selectSmartView(controlId);
    // var $mainFrame = $("#mainFrame").contents();
    // let isMobile = $mainFrame.find("#mobileDesign_scrollbar").length > 0;
    // if(!isMobile) {
    //     nsmart.hideCtrlTab()
    // }
    setTimeout(function () {
        var $control = nsmart.childContent().find("#" + controlId);
        var $mask = nsmart.childContent().find("#" + controlId + "_dialog_modal_mask");
        $mask.show();
        $control.show();
        $control.addClass("dialogshowed");
        $("#btnDesignPageList").addClass("f-hide");
        $("#btnDesignDialog").removeClass("f-hide");
        dialogHeader.currentDialogControlId = controlId;
        borderDialogModel();
        fixedDialogPosition(controlId);
    }, 200);
    
    // setTimeout(function () {
    //     if(!isMobile) { 
    //         var $control = nsmart.childContent().find("#" + controlId);
    //         $control.click()
    //     }
    // }, 200)

    var $mainFrame = $("#mainFrame").contents();
    if ($mainFrame.find("#mobileDesign_scrollbar").length > 0) {
        $("#mainFrame")[0].contentWindow.xwezhan.disabledMobileDesignerScoll()
    }
    else {
        var mainFrameScrollTop = $mainFrame.scrollTop();
        $mainFrame.on('scroll.modalStopScroll', function () {
            var $this = $(this);
            $this.scrollTop(mainFrameScrollTop);
        });
    }

    /**
     *  显示时候去掉外层的zindex
     */
    var mainContentLayout = $mainFrame.contents().find('#mainContentWrapper > div');
    mainContentLayout.each(function () {
        var item = $(this)
        var zIndex = item.css('z-index');
        item.attr('data-z-index', zIndex)
        item.css('z-index','auto')
    })
}
function closeDialogDesigner() {
    var controlId = dialogHeader.currentDialogControlId;
    if (controlId != "") {
        var $control = nsmart.childContent().find("#" + controlId);
        var $mask = nsmart.childContent().find("#" + controlId + "_dialog_modal_mask");
        $control.hide();
        $mask.hide();
        $control.removeClass("dialogshowed");
    }
    $("#btnDesignPageList").removeClass("f-hide");
    $("#btnDesignDialog").addClass("f-hide");
    var $mainFrame = $("#mainFrame").contents();
    if ($mainFrame.find("#mobileDesign_scrollbar").length > 0) {
        $("#mainFrame")[0].contentWindow.xwezhan.enabledMobileDesignerScoll()
    }
    else {
        $mainFrame.off('scroll.modalStopScroll');
    }

    /**
     *  关闭时候去掉外层的zindex
     */
    var mainContentLayout = $mainFrame.contents().find('#mainContentWrapper > div');
    mainContentLayout.each(function () {
        var item = $(this)
        var zIndex = item.attr('data-z-index');
        item.css('z-index', zIndex)
    })
}
function resizeDialogModel() {
    var controlId = dialogHeader.currentDialogControlId;
    if (controlId == undefined || controlId == "") {
        return;
    }
    borderDialogModel();
}
function borderDialogModel() {
    return;
}
function defaultDialogModel(controlId, flag) {
    var $control = nsmart.childContent().find("#" + controlId);
    var smartArray = nsmart.childContent().find(".smartAbs[ctype='dialog']");
    smartArray.each(function () {
        var cId = $(this).attr("id");
        if (cId == controlId) {
            $(this).find(".w-modal-data").attr("data-isdefault", (flag ? "1" : "0"));
            nsmart.changeViewData(cId, "IsDefault", flag, false, null);
        }
        else {
            if (flag) {
                $(this).find(".w-modal-data").attr("data-isdefault", "0");
                nsmart.changeViewData(cId, "IsDefault", false, false, null);
            }
        }
    });
    showDialogModal();
}
function showDialogPanel() {
    closeDialogDesigner();
    //$("#m-widgetItem01").click();
    var curDevice = $("#header_switchDevice_ul a.current").parent().attr("device");
    $('#m-widgetItem-box-left .m-widgetItem[data-category="design"]').click();
    var $dialogLink = $("#widgetlist-left a[data-content='.m-widgetShow-layout']");
    if ($dialogLink.length > 0) {
        //if (!$dialogLink.is(":visible")) {
        //    $(".morewrap-btn01").click();
        //}
        $dialogLink.mouseover();
        setTimeout(function () {
            if (curDevice === 'mobile') {
                $('#nav-anchors').find(".m-anchors-sections li a").eq(5).click();
            } else {
                $('#nav-anchors').find(".m-anchors-sections li a").eq(6).click();
            }
        }, 500)
    }
}
function defaultFirstDialog() {
    var smartArray = nsmart.childContent().find(".smartAbs[ctype='dialog']");
    var length = 0;
    var controlId = "";
    if (smartArray.length > 0) {
        smartArray.each(function () {
            if (!$(this).hasClass("smart-deleted")) {
                length++;
                controlId = $(this).attr("Id");
            }
        });
    }
    if (length == 1) {
        var $control = nsmart.childContent().find("#" + controlId);
        $control.find(".w-modal-data").attr("data-isdefault", (true ? "1" : "0"));
        nsmart.changeViewData(controlId, "IsDefault", true, false, null);
    }

}

function hasDefaultDialog() {
    var smartArray = nsmart.childContent().find(".smartAbs[ctype='dialog']");
    var isExists = false;
    var controlId = "";
    if (smartArray.length > 0) {
        smartArray.each(function () {
            if (!$(this).hasClass("smart-deleted")) {
                controlId = $(this).attr("Id");
                var $control = nsmart.childContent().find("#" + controlId);
                if ($control.find(".w-modal-data").attr("data-isdefault") == "1") {
                    isExists = true;
                }

            }
        });
    }
    return isExists;
}

function cancelMultipleDefaultDialog() {
    var smartArray = nsmart.childContent().find(".smartAbs[ctype='dialog']");
    var length = 0;
    var controlId = "";
    if (smartArray.length > 0) {
        smartArray.each(function () {
            if (!$(this).hasClass("smart-deleted")) {
                if ($(this).find(".w-modal-data").attr("data-isdefault") == "1") {
                    if (controlId == "") {
                        controlId = $(this).attr("id");
                    }
                    else {
                        var $control = nsmart.childContent().find("#" + $(this).attr("id"));
                        $control.find(".w-modal-data").attr("data-isdefault", "0");
                        nsmart.changeViewData(controlId, "IsDefault", false, false, null);
                    }
                }
            }
        });
    }
}

function fixedDialogPosition(controlId) {
    var $control = nsmart.childContent().find("#" + controlId);
    var fixedPosition = $control.find(".w-modal-data").attr("data-position");
    if (fixedPosition == undefined || fixedPosition == "") return;
    var width = $control.width();
    var height = $control.height();
    if (fixedPosition == "Center" || fixedPosition == "None") {
        $control.css("left", "50%");
        $control.css("top", "50%");
        $control.css("margin-top", "-" + (height / 2) + "px");
        $control.css("margin-left", "-" + (width / 2) + "px");
    }
    else if (fixedPosition == "TopLeft") {
        $control.css("left", "200px");
        $control.css("right", "auto");
        $control.css("top", "0");
        $control.css("bottom", "auto");
        $control.css("margin-top", "0px");
        $control.css("margin-left", "0px");
    }
    else if (fixedPosition == "LeftCenter") {
        $control.css("left", "200px");
        $control.css("right", "auto");
        $control.css("top", "50%");
        $control.css("bottom", "auto");
        $control.css("margin-left", "0px");
        $control.css("margin-top", "-" + (height / 2) + "px");
    }
    else if (fixedPosition == "BottomLeft") {
        $control.css("left", "200px");
        $control.css("right", "auto");
        $control.css("top", "auto");
        $control.css("bottom", "0");
        $control.css("margin-top", "0px");
        $control.css("margin-left", "0px");
    }
    else if (fixedPosition == "TopRight") {
        $control.css("left", "auto");
        $control.css("right", "200px");
        $control.css("top", "0");
        $control.css("bottom", "auto");
        $control.css("margin-top", "0px");
        $control.css("margin-left", "0px");
    }
    else if (fixedPosition == "RightCenter") {
        $control.css("left", "auto");
        $control.css("right", "200px");
        $control.css("top", "50%");
        $control.css("bottom", "auto");
        $control.css("margin-left", "0px");
        $control.css("margin-top", "-" + (height / 2) + "px");
    }
    else if (fixedPosition == "BottomRight") {
        $control.css("left", "auto");
        $control.css("right", "200px");
        $control.css("top", "auto");
        $control.css("bottom", "0");
        $control.css("margin-top", "0px");
        $control.css("margin-left", "0px");
    }
    else if (fixedPosition == "TopCenter") {
        $control.css("left", "50%");
        $control.css("right", "0");
        $control.css("top", "0");
        $control.css("bottom", "auto");
        $control.css("margin-top", "0px");
        $control.css("margin-left", "-" + (width / 2) + "px");
    }
    else if (fixedPosition == "BottomCenter") {
        $control.css("left", "50%");
        $control.css("right", "0");
        $control.css("top", "auto");
        $control.css("bottom", "0");
        $control.css("margin-top", "0px");
        $control.css("margin-left", "-" + (width / 2) + "px");
    }
}

/* design upload content */

(function ($) {

    var $s_upfilecount = 0;//添加文件个数
    var $s_uploadcount = 0;//已上传文件个数
    var $s_uploadFailCount = 0;//上传失败个数

    var total = 0;// 当前文件一共有几页
    var curpage = 1;
    var $importContent = $('#importContent');
    $(function () {
        var BASE_URL = window.applicationPath === "" ? "" : window.applicationPath || "../..";
        var PAGE_NUMBERS = [],
            FILE_ID;
        var VERSION = "";
        //最大附件大小
        var MAX_SIZE = 1024 * 1024 * 100;
        //缓冲区大小
        var BUFFER_SIZE = 1024 * 1024 * 8;
        var fileMd5 = {}
        var fileId = {}

        // 内容导入中 再次进入浏览器时请求内容导入状态
        var _paddingPageFileId = localStorage.getItem('paddingPageFileId');
        var _paddingPagePageNumbers = JSON.parse(localStorage.getItem('paddingPagePageNumbers'));
        if (_paddingPageFileId && _paddingPagePageNumbers && _paddingPagePageNumbers.length > 0) {
        }

        // 获取内容导入状态-定时器
        var GetPaddingPageStatusTimer;
        // 获取文件解析状态-定时器
        var prevResolveTimer;
        // 获取缩略图解析状态-定时器
        var getFileThumbnailTimer;
        // 导入按钮防抖--定时器
        var delayEmitPaddingPageFlag = true;

        var uploader = {};
   
        // 内容导入
        function emitPaddingPage(PageNumbers, FileId) {

            var NeedCreatePage = $('#importContent').attr('import-mode') === 'createPage' ? true : false;

            $.ajax({
                url: BASE_URL + '/Designer/PaddingPage',
                data: {
                    PageId: NeedCreatePage ? '0' : window.pageManage.currentPageId,
                    PageNumbers: PageNumbers,
                    FileId: FileId,
                    Version: VERSION,
                    timestamp: new Date().getTime(),
                    NeedCreatePage: NeedCreatePage
                },
                type: "post",
                success: function (data) {
                    if (data.IsSuccess) {

                    } else {
                        showFailure(data.Message);
                        $('#importContentProgress').hide();
                        $('#importContentFail').hide();
                        localStorage.removeItem("paddingPageFileId");
                        localStorage.removeItem("paddingPagePageNumbers");
                        clearTimeout(GetPaddingPageStatusTimer);
                    }
                },
                error: function (f) {
                    $('#importContentProgress').hide();
                    $('#importContentFail').hide();
                    showFailure('操作失败！');
                    localStorage.removeItem("paddingPageFileId");
                    localStorage.removeItem("paddingPagePageNumbers");
                    clearTimeout(GetPaddingPageStatusTimer);
                }
            });
        }

    }, 300);
})(jQuery);

// 打开文件导入弹窗
function onClickToShowImoprtFileDialog() {
   // $('importContent').click();
    //$('upload_smv_Main').click();
    $("#modal-mapdepot-pic").modal("hide");
    
    $("#importContent").show();
}

// 打开图片导入弹窗
function onClickToShowImoprtPictureDialog(obj) {
    
    $('#importContent').hide();

    var callback = function (imags) {
        $('#importContentProgress').show();

        var resultList = [];
        var count = 0;
        var isAllOnload = function () {
            setTimeout(function () {
                if (count < imags.length) {
                    isAllOnload();
                } else {
                    // 接口参数
                    var params = {};
                    var smartViewFactory = $('#mainFrame')[0].contentWindow.smartViewFactory;

                    // 导入方式 新建页面/当前页面
                    var importMode = $('#importContent').attr('import-mode');

                    nsmart.savePage(
                        '保存成功',
                        function () {
                            var successFn = function (res) {
                                if (res.Error) {
                                    showFailure('操作失败');
                                } else {

                                    window.onbeforeunload = null;
                                    if (importMode === 'createPage') {

                                        window.location.href = '/designer/index/' + res;
                                    } else {

                                        // 记录滚动位置
                                        localStorage.setItem("importContentSuccess", true);

                                        if ($("#mainFrame") != undefined && $("#mainFrame").contents().length == 1) {
                                            var smvMain = $("#mainFrame").contents().eq(0).find("#smv_Main");
                                            if (smvMain != undefined) {
                                                var pageHeight = smvMain.height();
                                                var clientHeight = $("#mainFrame")[0].clientHeight;
                                                if (pageHeight < clientHeight) {
                                                    pageHeight = 10;
                                                }
                                                if (pageHeight > 0) {
                                                    localStorage.setItem("ImportContent_PageOldHeight", pageHeight);
                                                }
                                            }
                                        }

                                        window.location.reload();
                                    }
                                    
                                }
                                $('#importContentProgress').hide();

                            }

                            var errorFn = function (err) {
                                showFailure('操作失败');
                                $('#importContentProgress').hide();
                            }

                            var queryUrl = importMode === 'createPage' ? '/Designer/CreateNewPageAndImportImg' : '/Designer/AddImgList';

                            if (importMode === 'createPage') {
                               
                                var name = resultList[0].Name;
                                params = {
                                    pageTitle: name,
                                    ImgList: resultList
                                }
                            } else {
                                params = {
                                    pageId: window.pageManage.currentPageId,
                                    TempPageId: smartViewFactory.getLastTempPageId(),
                                    DeviceMode: 1,
                                    LanguageCulture: smartViewFactory.storage.languageCulture,
                                    ImgList: resultList
                                }
                            }

                            $.ajax({
                                url: queryUrl,
                                type: 'POST',
                                contentType: 'application/json',
                                data: JSON.stringify(params),
                                success: successFn,
                                error: errorFn
                            })
                        },
                        '',
                        function () {
                            $('#importContentProgress').hide();
                        }
                    );
                    
                    
                }
            })
        }

        var getImageWH = function (imgData) {
            var image = new Image();
            image.onload = function () {
                resultList.push({
                    PictureUrl: imgData.PicUrl,
                    PictureId: imgData.PictureId,
                    MimeType: imgData.MimeType,
                    Height: image.naturalHeight,
                    Width: image.naturalWidth,
                    Name: imgData.Name
                })
                count += 1;
            }

            image.onerror = function () {
                count += 1;
            }

            image.src = imgData.PicUrl
        }


        var i = 0;
        while (i < imags.length) {
            getImageWH(imags[i])
            i++;
        }

        isAllOnload();
       
    }
    
    ShowImoprtPictureDialog(20, callback, false, this);


    // GA-导入图片
    var type = $(obj).attr('data-clicktype');
    var event_action = '';
    if (type === 'main') {
        event_action = '点击导入图片按钮';
    }
    if (type === 'title') {
        event_action = '点击导入图片';
    }

    window.gtag && gtag('event', 'event_import_images', {
        'event_category': '导入图片',
        'event_action': event_action,
        'event_label': '导入图片'
    });
    
}

