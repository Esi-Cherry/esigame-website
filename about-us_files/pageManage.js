/*
功能：页面管理相关功能
创建时间：2017/2/9
*/

var isSimpleViewString = '';
var pageManage = {
    currentPageId: $('#hid_currentPageId').val(),//当前所呈现页面的ID
    currentOperatePageId: 0,//当前操作页面的ID
    thirdPageDataList: [],//开发者页面数据数组
    translate_timer: null,//页面翻译轮询定时器
    GO_TARGET_PAGE_INTERVAL: null, // 页面翻译完成 倒计时
    currentPageLanuageId: $('#hid_header_currentLanId').val(),//当前页面语言Id
    init: function () {
        //初始化树
        $('#tree_contentPagelist').parent().lzTree('#tree-pageleft-set');
        $('#tree_headAndFootPagelist').parent().lzTree('#tree-pageleft08-set');
        $('#tree_sysPagelist').parent().lzTree('#tree-pageleft02-set');

        pageManage.page.init();
        pageManage.headerfooter.init();
        pageManage.sysPage.init();
        pageManage.search.init();
        //统一绑定删除事件
        $("#deletePageBtn").off('click').on('click', function () {
            pageManage.onDeletePage();
        });
        $("#noReferenceDeletePageBtn").off('click').on('click', function () {
            pageManage.onDeletePage();
        });
        $("#referenceDeletePageBtn").off('click').on('click', function () {
            if ($("#pageReferenceSwitch").hasClass("checked")) {
                $("#pageReferenceModel .referencePageList").html('')
                $("#pageReferenceModel .timeWrapper").html('预计剩余<span class="seconds"></span>s...');
                $("#pageReferenceModel").modal('show')
                var process = 1;
                var time = 30;
                var timer = setInterval(function () {
                    process += 3.3;
                    time -= 1;
                    if (process >= 100) {
                        process = 100
                        clearInterval(timer)
                        $("#pageReferenceModel .timeWrapper").html("正在检测页面引用");
                    }
                    $("#pageReferenceModel .m-process-percent").css('width', Math.round(process) + '%');
                    $("#pageReferenceModel .processPercentText").html(Math.round(process) + '%');
                    $("#pageReferenceModel .seconds").html(time);
                },1000)
                $.ajax({
                    cache: false,
                    url: "/Designer/Page/DeletePage",
                    data: {
                        pageIds: pageManage.currentOperatePageId,
                        referenceDetect: true
                    },
                    type: "post",
                    success: function (result) {
                        if (result.Data && result.Data.DetectResult) {
                            clearInterval(timer)
                            $("#pageReferenceModel .m-process-percent").css('width', '100%');
                            $("#pageReferenceModel .processPercentText").html('100%');
                            $("#pageReferenceModel .timeWrapper").html("正在检测页面引用");
                            if (result.Data.DetectResult.length > 0) {
                                result.Data.DetectResult.forEach(function (item, index) {
                                    $("#pageReferenceModel .referencePageList").append('<a href="' + location.origin + '/designer/index/' + item.Id + '?DetectResult=true" pageid="' + item.Id + '" target="_blank">' + item.Title + '</a>')
                                })
                                $("#pageReferenceModel .referencePageList a").on("click", function () {
                                    var that = this
                                    result.Data.DetectResult.forEach(function (item) {
                                        if (item.Id == $(that).attr('pageid')) {
                                            localStorage.setItem("DetectResult" + $(that).attr('pageId'), JSON.stringify(item));
                                        }
                                    })
                                })
                            } else {
                                $("#pageReferenceModel .referencePageList").html('无')
                            }
                        }
                        
                    },
                    error: function (e) {
                    }
                });
            } else {
                pageManage.onDeletePage();
            }
        }); 
        $('#pageReferenceModel').on('hide.bs.modal', function () {
            if (pageManage.currentOperatePageId != pageManage.currentPageId) {
                $('#pageList_li_' + pageManage.currentOperatePageId).remove();
            } else {
                var prevObj = $('#pageList_li_' + pageManage.currentOperatePageId).prev();
                var nextObj = $('#pageList_li_' + pageManage.currentOperatePageId).next();

                if (prevObj.length > 0) {
                    var prevId = prevObj.attr("id").split('_')[2];
                    window.location.href = "/Designer/Index/" + prevId;
                } else {
                    if (nextObj.length > 0) {
                        var nextId = nextObj.attr("id").split('_')[2];
                        window.location.href = "/Designer/Index/" + nextId;
                    } else {
                        window.location.href = "/Designer/Index";
                    }
                }
            }
        })
        if (location.href.indexOf("DetectResult=true") != -1 && localStorage.getItem('DetectResult' + pageManage.currentPageId)) {
            $("#detect-panel").show();
            $('#detect-layer-list li').removeClass('active').hide();
            $('#detect-panel .tab-content .tab-pane').removeClass('active');
            $("#title_QualityInspectionList").addClass("active");
            $("#pn_QualityInspectionList").addClass("active");
            $("#title_QualityInspectionList").show();
            $("#pn_QualityInspectionList").html('<ul class="u-layer"></ul>');
            var DetectResultList = JSON.parse(localStorage.getItem('DetectResult' + pageManage.currentPageId));
            if (!window.ctrlIgnoreList) {
                window.ctrlIgnoreList = {
                    IntersectionCtrlIdList: [],
                    MulitRowCtrlIdMap: {},
                    NotCenterCtrlInfoList: [],
                    OverflowCtrlIdList: [],
                    CtrlDetectList: []
                }
            }
            var num = 1;
            var ctrlDetectIgnoreNum = 0;
            DetectResultList.CtrlDetectList.forEach(function (item, index) {
                var click = `onclick="javascript: nsmart.selectSmartView('smv_` + item.CtrlId + `'); document.getElementById('mainFrame').contentWindow.$('.smart-resize').removeClass('smart-resize').children('.ui-resizable-handle').hide();document.getElementById('mainFrame').contentWindow.$('#smv_` + item.CtrlId + `').addClass('smart-resize').children('.ui-resizable-handle').show();"`;
                item.MsgList.forEach(function (el) {
                    var isIgnore = false;
                    if (window.ctrlIgnoreList.CtrlDetectList.length) {
                        window.ctrlIgnoreList.CtrlDetectList.forEach(function (ctrlIgnoreItem) {
                            if (item.CtrlId == ctrlIgnoreItem.ctrlId && el == ctrlIgnoreItem.msg) {
                                isIgnore = true;
                                ctrlDetectIgnoreNum++
                            }
                        })
                    }
                    $('<li class="u-layer-content ' + (isIgnore ? 'isIgnore' : '') + '" ' + click + '><div class="u-layer-item" style="padding-left: 15px;">' +
                        '<a class="layer-txt" href="javascript:;" style="padding:0">' +
                        '<span style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width:165px;display:inline-block"  title="' + item.Desc + el + '">【' + num + '】<strong style="color:orangered">' + item.Desc + '</strong>' + el + '</span>' +
                        '<div class="layer-btn ignoreBtn" style="margin-top: 8px;float:right;" ignoreCtrlId="' + item.CtrlId + '" ignoreMsg="' + el + '" >忽略</div> ' +
                        '</a></div></li>').appendTo($("#pn_QualityInspectionList .u-layer"));
                    num += 1;
                })
            })
            $('#title_QualityInspectionList .title_tips').html(num - 1 - ctrlDetectIgnoreNum);
            $("#pn_QualityInspectionList .ignoreBtn").on('click', function (e) {
                e.stopPropagation();
                window.ctrlIgnoreList['CtrlDetectList'].push({ ctrlId: $(this).attr('ignoreCtrlId'), msg: $(this).attr('ignoreMsg') })
                $(this).parents('.u-layer-content').addClass('isIgnore')
                $('#title_QualityInspectionList .title_tips').html($('#title_QualityInspectionList .title_tips').html() - 1)
            })
            localStorage.removeItem('DetectResult' + pageManage.currentPageId);
        }
        $("#contentPage_delete").off('click').on('click', function () {
            $.ajax({
                cache: false,
                url: "/Page/NeedDetectPageReference",
                type: "GET",
                success: function (result) {
                    if (result.Data.needShowDeleteMsg) {
                        if (result.Data.needDetectPageReference) {
                            $('#deletePageModel_NeedReference').modal('show')
                        } else {
                            $('#deletePageModel').modal('show')
                        }
                    } else {
                        $('#use-modal10').modal('show')
                    }
                },
                error: function (e) {
                }
            })
        })
        //统一绑定克隆事件
        $("#clonePageBtn").off('click').on('click', function () {
            pageManage.onClonePage();
        });
        $('#importLanBtn').off('click').on('click', pageManage.isImportOrTranslatePage);

        //页面搜索
        $('#header_pageTitleWrap').off('click').on('click', function () {
            $('#pageSearchPanel').addClass('f-hide');
            $('#pageSearch_input').val('');
        });

        // 翻译弹窗
        $('#translatePageModal .modal-close').off('click').on('click', function () {
            if ($('#translatePageModal .siteTranslating').is(':hidden')) {
                // 翻译完成
                clearInterval(pageManage.GO_TARGET_PAGE_INTERVAL);
                if (pageManage.currentPageId == pageManage.currentOperatePageId) {
                    window.location.href = '/designer/index/' + pageManage.currentOperatePageId  + isSimpleViewString;
                } else {
                    $('#translatePageModal').modal('hide');
                }
            } else {
                // 关闭翻译进度弹窗icon 事件
                var $cancelPageTranslateModal = $('#cancelPageTranslateModal');
                $cancelPageTranslateModal.modal('show');

                $cancelPageTranslateModal.find('.btn-resure').off('click').on('click', function () {
                    clearTimeout(pageManage.translate_timer);
                    $cancelPageTranslateModal.modal('hide');
                    $('#translatePageModal').modal('hide');
                })
            }

        })

        // 翻译完成 去编辑按钮
        $('#translatePageModal .goTargetLanguagePage').off('click').on('click', function () {
            window.location.href = '/designer/index/' + pageManage.currentOperatePageId  + isSimpleViewString;
        })

        //点击空白处让页面管理弹窗消失
        $(document).click(pageManage.hidePageTree);
    },
    onDeletePage: function () {
        $.ajax({
            cache: false,
            url: "/Designer/Page/DeletePage",
            data: {
                pageIds: pageManage.currentOperatePageId,
            },
            type: "post",
            success: function (result) {
                if (!result.IsSuccess) { showFailure(); return; }

                if (pageManage.currentOperatePageId != pageManage.currentPageId) {
                    $('#pageList_li_' + pageManage.currentOperatePageId).remove();
                    showSuccess();
                } else {
                    var prevObj = $('#pageList_li_' + pageManage.currentOperatePageId).prev();
                    var nextObj = $('#pageList_li_' + pageManage.currentOperatePageId).next();

                    if (prevObj.length > 0) {
                        var prevId = prevObj.attr("id").split('_')[2];
                        window.location.href = "/Designer/Index/" + prevId;
                    } else {
                        if (nextObj.length > 0) {
                            var nextId = nextObj.attr("id").split('_')[2];
                            window.location.href = "/Designer/Index/" + nextId;
                        } else {
                            window.location.href = "/Designer/Index";
                        }
                    }
                }

            },
            error: function (e) {
            }
        });
    },
    onClonePage: function () {
        $.ajax({
            cache: false,
            url: "/Designer/Page/ClonePage",
            data: {
                pageId: pageManage.currentOperatePageId,
            },
            type: "post",
            success: function (result) {
                if (result && result.IsSuccess) {
                    showSuccess('克隆成功！');
                    window.location.href = '/designer/index/' + result.Data  + isSimpleViewString;
                } else {
                    if (typeof result.message != 'undefined') {
                        showFailure(result.message);
                    }
                    else {
                        showFailure('克隆失败！');
                    }
                }
            },
            error: function (e) {
            }
        });
    },
    rendImportLanguagePanel: function () {
        $.ajax({
            cache: false,
            url: "/Designer/Page/GetImportLanguages",
            data: {},
            type: "post",
            success: function (result) {
                var $useModal11 = $('#use-modal11');
                $useModal11.modal('show');
                $('#importLanBtn').removeClass('disabled');

                if (result && result.IsSuccess) {
                    if (result.Data.length > 0) {
                        $useModal11.find('.modal-dialog').removeClass('onlyOneLanWrap');
                        $useModal11.find('.btn-info').text('确定');

                        $("#importLanPanel").html(template("temp-importLanguage", result));
                        pageManage.judgeIsNeedTranslate($('#hid_ImportLan_val').val());


                        $('#importLan_ul li').off('click').on('click', function () {
                            var name = $(this).attr('lname');
                            var id = $(this).attr('lid');

                            $('#importLan_showtext').html(name);
                            $('#hid_ImportLan_val').val(id);

                            pageManage.judgeIsNeedTranslate(id);
                        });
                    } else if (result.Data.length == 0) {
                        $useModal11.find('.modal-dialog').addClass('onlyOneLanWrap');
                        $useModal11.find('.btn-info').text('知道了');
                    }
                }
            },
            error: function (e) {
            }
        });
    },
    isInTranslateProcess: function () {
        $.ajax({
            cache: false,
            url: "/admin/translate/HasTranslateProcess",
            type: "get",
            success: function (data) {
                //data = {
                //        "HasProcess": true,
                //        "ProcessList": [
                //            { "TranslateType": 2, "TranslateId": "02cba793-99f6-4dc2-89f7-53976233596e" }
                //        ]
                //    }
                var hasProcess = data.HasProcess;
                var processList = data.ProcessList;
                if (hasProcess) {
                    $.each(processList, function (index, item) {
                        console.log(index, item);
                        var translateType = item.TranslateType;
                        if (translateType == 0 || translateType == 1 || translateType == 2) {
                            // 整站 or 产品 or 文章
                            showFailure('已存进行中的翻译任务，请等待翻译完成后重试');
                            return;
                        } else {
                            pageManage.getPageTranslateResult(pageManage.currentOperatePageId, pageManage.rendImportLanguagePanel);
                        }

                    });
                } else {
                    pageManage.rendImportLanguagePanel();
                }
            },
            error: function (e) {
            }
        });
    },
    judgeIsNeedTranslate: function (lid) {
        var currentPageLanuageId = pageManage.currentPageLanuageId;
        var $useModal11 = $('#use-modal11');
        if ((currentPageLanuageId != 1 && currentPageLanuageId != 2 && lid == 5) ||
            (currentPageLanuageId == 5 && (lid != 1 && lid != 2))) {
            $useModal11.find('.needTranslate').hide();
            $useModal11.find('.notTranslate').show();
        } else {
            $useModal11.find('.needTranslate').show();
            $useModal11.find('.notTranslate').hide();
        }
    },
    isImportOrTranslatePage: function () {
        $('#importLanBtn').addClass('disabled');
        if ($('#use-modal11').find('.notTranslate').is(':hidden')) {

            window.gtag && gtag('event', 'event_import_and_translate', {
                'event_category': '确定导入',
                'event_action': '点击确认导入按钮',
                'event_label': '导入并翻译'
            });

            pageManage.onImportAndTranslatePage();

        } else {

            window.gtag && gtag('event', 'event_import_only', {
                'event_category': '确定导入',
                'event_action': '点击确认导入按钮',
                'event_label': '仅导入'
            });

            pageManage.onImportLanguage();
        }
    },
    onImportAndTranslatePage: function () {
        $.ajax({
            cache: false,
            url: "/Designer/Page/Import2Page",
            data: {
                pageId: pageManage.currentOperatePageId,
                targetLanguageId: pageManage.currentPageLanuageId,
                sourceLanguageId: $('#hid_ImportLan_val').val()
            },
            type: "post",
            success: function (result) {
                console.log(result);
                if (result.ErrorMsg) {
                    showFailure(result.ErrorMsg);
                } else {
                    pageManage.getPageTranslateResult();
                }
            },
            error: function (e) {
            }
        });
    },
    onImportLanguage: function () {
        $.ajax({
            cache: false,
            url: "/Designer/Page/ImportData",
            data: {
                pageId: pageManage.currentOperatePageId,
                languageId: $('#hid_ImportLan_val').val()
            },
            type: "post",
            success: function (result) {
                if (result.IsSuccess) {
                    showSuccess('导入成功！');
                    if (pageManage.currentOperatePageId == pageManage.currentPageId) {
                        window.location.href = '/designer/index/' + pageManage.currentOperatePageId  + isSimpleViewString;
                    }
                } else {
                    showFailure();
                }
            },
            error: function (e) {
            }
        });
    },
    // 获取翻译进度
    getPageTranslateResult: function (pageId, cb) {
        $.ajax({
            cache: false,
            url: " /admin/translate/GetPageTranslateResult",
            type: "get",
            data: {
                pageId: pageId || pageManage.currentOperatePageId
            },
            success: function (result) {
                var pageTranslateStatus = result.PageTranslateStatus;
                var $translateSiteDone = $('#translatePageModal');

                switch (pageTranslateStatus) {
                    case 1://翻译中
                        var percent = result.Detail.ProcessStr;
                        pageManage.showWhichTranslateStatusModal('doing');
                        $translateSiteDone.find('.siteTranslating .translate-progress-percent').html(percent);
                        $translateSiteDone.find('.siteTranslating .translate-progress').css({ width: percent });

                        pageManage.translate_timer = setTimeout(function () {
                            clearTimeout(pageManage.translate_timer);
                            pageManage.getPageTranslateResult();
                        }, 2000)
                        break;
                    case 2:// 成功
                        clearTimeout(pageManage.translate_timer);
                        pageManage.showWhichTranslateStatusModal('finished');
                        break;
                    case 3://失败，显示部分成功
                        clearTimeout(pageManage.translate_timer);
                        pageManage.showWhichTranslateStatusModal('finished-half');
                        break;
                    case 4://不存在未显示的结果
                        clearTimeout(pageManage.translate_timer);
                        cb();
                        break;
                }
            },
            error: function (e) {
                //alert(e)
            }
        })
    },
    // 翻译状态弹窗 dom显示
    showWhichTranslateStatusModal: function (status) {
        var $cancelTranslateSite = $('#cancelPageTranslateModal');
        var $translateSiteDone = $('#translatePageModal');
        var $cancelPageTranslateModal = $('#cancelPageTranslateModal');
        switch (status) {
            case 'doing':
                $translateSiteDone.modal('show');
                $translateSiteDone.find('.siteTranslating').show();
                $translateSiteDone.find('.siteTranslateFinished').hide();
                break;
            case 'finished':
                isFinishedAll(true);
                break;
            case 'finished-half':
                isFinishedAll(false);
                break;
        }
        function isFinishedAll(all) {
            $cancelTranslateSite.hide();
            $translateSiteDone.modal('show');
            $translateSiteDone.find('.siteTranslating').hide();
            $translateSiteDone.find('.siteTranslateFinished').show();
            $translateSiteDone.find('.siteTranslating .translate-progress-percent').html('0%');
            $translateSiteDone.find('.siteTranslating .translate-progress').css({ width: 0 });
            $('#cancelPageTranslateModal').modal('hide');

            $translateSiteDone.find('.modal-close').show();
            $translateSiteDone.find('.count').html('5s');

            clearInterval(pageManage.GO_TARGET_PAGE_INTERVAL);
            pageManage.GO_TARGET_PAGE_INTERVAL = setInterval(function () {
                var count = $translateSiteDone.find('.count');
                var countNum = parseFloat(count.html());
                countNum--;
                if (countNum <= 0) {
                    clearInterval(pageManage.GO_TARGET_PAGE_INTERVAL);
                    $translateSiteDone.find('.goTargetLanguagePage').click();
                }
                count.html(countNum + 's');
            }, 1000);
            if (all) {
                $translateSiteDone.find('.siteTranslateFinished .siteTranslatedAll').show();
                $translateSiteDone.find('.siteTranslateFinished .siteTranslatedHalf').hide();
            } else {
                $translateSiteDone.find('.siteTranslateFinished .siteTranslatedAll').hide();
                $translateSiteDone.find('.siteTranslateFinished .siteTranslatedHalf').show();
            }
        }
    },
    hidePageTree: function (e) {
        var pageSelect = $('div.m-pageSelect');
        if (pageSelect.has(e.target).length > 0) {
            return;
        }

        var _con = $('div.m-opened-panels'); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('div.m-opened-panels').find("a.u-closePanels").click();
        }
    },
    clearPageCache: function () {
        $.ajax({
            cache: false,
            async: false,
            url: "/Designer/Page/ClearPageCache",
            data: {
                pageId: pageManage.currentPageId,
            },
            type: "post",
            success: function (result) {

            },
            error: function (e) {
            }
        });
    }
};

//页面管理
pageManage.page = {
    init: function () {
        pageManage.page.creat.init();
        pageManage.page.edit.init();
        pageManage.page.setPageSortable();

        //语言导入事件
        $('#page_setting_import').off('click').on('click', function () {
            window.gtag && gtag('event', 'event_import_icon', {
                'event_category': '导入',
                'event_action': '点击导入按钮',
                'event_label': '导入次数'
            });
            pageManage.isInTranslateProcess();
        });

        //页面跳转
        $('#tree_contentPagelist').on('click', "li:not(.thirdPage) a", function (e) {
            if (e && e.target && e.target.tagName == "UL") {
                // IE下内部li会cancel，但是外部嵌套li会触发点击事件，所以拦截
                return;
            }
            var pageId = $(this).closest("li").attr('pid');
            pageManage.getPageTranslateResult(pageId, function () {
                window.location.href = '/designer/index/' + pageId + isSimpleViewString;
            })
            if (e && e.stopPropagation) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
            return false;
        });

        //设置首页
        $('#tree_contentPagelist').on('click', "li i.icon-home", function () {
            // 如果是手机端自适应页面（设置首页）中间的提示文本突出显示，无其他点击效果
            if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                return;
            }
            pageManage.currentOperatePageId = $(this).closest("li").attr('pid');
            $('#modal-Forhome').modal('show');
            return false;
        });

        //设置首页确认按钮
        $('#setHomePageBtn').off('click').on('click', function () {
            pageManage.page.onSetHomePage();
        });

        pageManage.page.loadPage(0, 1, 1000);
    },
    creat: {
        init: function () {
            $('#createPageBtn').off('click').on('click', function () {
                // 如果是手机端自适应页面 中间的提示文本突出显示，无其他点击效果
                if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                    return;
                };
                $("#createPageBtn").addClass("disabled");
                $.post("/Designer/Page/IsCanCreatePage", function (result) {
                    if (result.IsSuccess && (typeof result.Data != 'undefined')) {
                        if (result.Data.CanCreatePage) {
                            $("#use-modal7").modal("show");
                            pageLibraries.getPagelibraries(0, 'create', null);
                        }
                        else {
                            showNormal(result.Message);
                        }
                    }
                    $("#createPageBtn").removeClass("disabled");
                });
            });
            $('#createPageSureBtn').off('click').on('click', function () {
                $('#createPageSubmitBtn').click();
            });
            $('#createPage_title').bind('input propertychange', function () {
                $('#createPage_url').val(__pinyin.getFirstLetter($(this).val()));
            });
            $('#createPage_ul_templateId li a').off('click').on('click', function () {
                $('#createPage_template_text').html($(this).html());
                $('#hid_createPage_TemplateId').val($(this).attr('tmpId'));
            });
            $('.clonePageBtn').off('click').on('click', function () {
                var me = this;
                $(this).addClass("disabled");
                $.post("/Designer/Page/IsCanCreatePage", function (result) {
                    if (result.IsSuccess && (typeof result.Data != 'undefined')) {
                        if (result.Data.CanCreatePage) {
                            $("#use-modal9").modal("show");
                        }
                        else {
                            showNormal(result.Message);
                        }
                    }
                    $(this).removeClass("disabled");
                });
            });
        },
        registValidate: function () {
            $("#frmCreatPage").validate({
                rules: {
                    Title: {
                        required: true,
                        maxlength: 40,
                        remote: {                                          //验证用户名是否存在
                            type: "POST",
                            url: "/Designer/Page/CheckPageTitleIsExist",
                            data: {
                                pageId: 0,
                                title: $('#createPage_title').val(),
                                deviceMode: 1,//1代表pc
                            }
                        }
                    },
                    Url: {
                        required: true,
                        maxlength: 40,
                    }
                },
                messages: {
                    Title: {
                        required: "标题不能为空",
                        maxlength: "长度不能超过{0}",
                        remote: "标题已存在，请重新输入"
                    },
                    Url: {
                        required: "Url不能为空",
                        maxlength: "长度不能超过{0}",
                    }
                },
                submitHandler: function (form) {
                    $.ajax({
                        cache: false,
                        url: "/Designer/Page/CheckPageUrlPart",
                        data: {
                            pageId: 0,
                            urlpart: $('#createPage_url').val(),
                            deviceMode: 1,//1代表pc
                        },
                        type: "post",
                        success: function (data) {
                            var tip = $('#createPage_url');
                            if (!data.IsSuccess) {
                                tip.parent().parent().removeClass("has-error");
                                tip.siblings('p').remove();

                                tip.after('<p class="has-error help-block">' + data.Message + '</p>');
                                tip.parent().parent().addClass("has-error");
                            } else {
                                var datastr = $("#frmCreatPage").serialize();
                                var pdata = {};
                                pdata.Id = 0;
                                pdata.LibraryTemplateId = $('#libraryPage_replace_libraryId').val();
                                pdata.TemplateVersion = $('#libraryPage_replace_version').val();
                                pdata.SinglePageTemplateId = $('#libraryPage_replace_templatecode').val();
                                pdata.PageSiteTemplateId = $('#libraryPage_replace_siteid').val();
                                pdata.PageTypeName = 'ContentPage';
                                datastr = datastr + "&" + $.param(pdata);
                                $.ajax({
                                    cache: false,
                                    url: "/Designer/Page/CreatePage",
                                    data: datastr,
                                    type: "post",
                                    success: function (result) {
                                        if (!result.error) {
                                            showSuccess('新增成功');
                                            $("#hid_createPage_TemplateId").val("0");
                                            $('#libraryPage_replace_libraryId').val("0"),
                                                $("#libraryPage_replace_version").val("");
                                            window.location.href = '/designer/index/' + result.data.BizId  + isSimpleViewString;
                                        } else {
                                            if (typeof result.message != 'undefined') {
                                                showFailure(result.message);
                                            }
                                            else {
                                                showFailure('新增失败');
                                            }
                                        }
                                    },
                                    error: function (e) {
                                        //alert(e)
                                    }
                                });
                            }
                        }
                    });
                },
                showErrors: function (map, list) {
                    this.currentElements.parents('label:first, div:first').find('.has-error').remove();
                    this.currentElements.parents('.form-group:first').removeClass('has-error');

                    $.each(list, function (index, error) {
                        var ee = $(error.element);
                        var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');

                        ee.parents('.form-group:first').addClass('has-error');
                        eep.find('.has-error').remove();
                        eep.append('<p class="has-error help-block">' + error.message + '</p>');
                    });
                }
            });
        }
    },
    edit: {
        init: function () {
            //设置
            $('#contentPage_setting').off('click').on('click', function () {
                pageManage.page.edit.rendEditContentPage();
            });
        },
        rendEditContentPage: function (isThirdPage, thirdPageDomainList) {
            $.ajax({
                cache: false,
                url: "/Designer/Page/GetPage",
                data: {
                    pageId: pageManage.currentOperatePageId,
                },
                type: "post",
                success: function (result) {
                    if (isThirdPage) {
                        result.thirdPageDomainList = thirdPageDomainList;
                        $("#editContentPageWrap").html(template("temp-contentThirdPageEdit", result));
                        $('#ch_urlList li a').each(function (index, item) {
                            $(item).off('click').on('click', function () {
                                $('#ch_template_url').text($(this).text());
                            });
                        });
                    } else {
                        $("#editContentPageWrap").html(template("temp-contentPageEdit", result));
                    }
                    $('#ch_Title').bind('input propertychange', function () {
                        // $('#ch_Url').val(__pinyin.getFirstLetter($(this).val()));
                        $('#ch_SeoTitle').val((result.Data.CompanyName ? (result.Data.CompanyName + "-"): "") + $(this).val());
                        $('#ch_MetaKey').val((result.Data.CompanyName ? result.Data.CompanyName  : "") );
                        $('#ch_Description').val((result.Data.CompanyName ? result.Data.CompanyName : ""));

                    });
                    // scroll
                    $(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                    scrollHeight();
                    lzslider('#editContentPageWrap div.m-lan-switchBox');
                    switchBtn();
                    pageManage.page.edit.registValidate(isThirdPage);
                    $('#updatePage').off('click').on('click', function () {
                        $('#contentPage_submit_btn').click();
                    });
                    $('#hid_contentPage_Id').val(pageManage.currentOperatePageId);
                    $('#hid_TemplateId').val(result.Data.TemplateId);
                    $('#hid_HistoryTemplateId').val(result.Data.TemplateId);
                    var templateName = result.Data.TemplateName == null ? "无" : result.Data.TemplateName;
                    $('#ch_template_text').text(templateName);
                    $('#ch_templateId li a').each(function (index, item) {
                        $(item).off('click').on('click', function () {
                            $('#hid_TemplateId').val($(this).attr('id').split('_')[2]);
                            $('#ch_template_text').text($(this).text());
                        });
                    });
                    $('#cn_ck_IsHomePage').off('click').on('click', function () {
                        if ($('#cn_IsHomePage').val() == '1') {
                            $('#cn_IsHomePage').val('0');
                        } else {
                            $('#cn_IsHomePage').val('1');
                        }
                    });
                    $.lzprompt()
                },
                error: function (e) {
                }
            });
        },
        registValidate: function (isThirdPage) {
            var rules = {};
            if (!isThirdPage) {
                rules.Title = {
                    required: true,
                    maxlength: 40,
                    remote: {                                          //验证标题是否存在
                        type: "POST",
                        url: "/Designer/Page/CheckPageTitleIsExist",
                        data: {
                            pageId: pageManage.currentOperatePageId,
                            title: $('#ch_Title').val(),
                            deviceMode: 1,//1代表pc
                        }
                    }
                }
            }
            rules.Url = {
                required: true,
                maxlength: 32,
            }
            $("#frmContentPageEdit").validate({
                rules: rules,
                messages: {
                    Title: {
                        required: "标题不能为空",
                        maxlength: "长度不能超过{0}",
                        remote: '标题已存在，请重新输入'
                    },
                    Url: {
                        required: "Url不能为空",
                        maxlength: "长度不能超过{0}",
                    }
                },
                submitHandler: function (form) {
                    $.ajax({
                        cache: false,
                        url: "/Designer/Page/CheckPageUrlPart",
                        data: {
                            pageId: pageManage.currentOperatePageId,
                            urlpart: $('#ch_Url').val(),
                            deviceMode: 1,//1代表pc
                        },
                        type: "post",
                        success: function (data) {
                            var tip = $('#ch_Url');
                            if (!data.IsSuccess) {
                                tip.parent().parent().removeClass("has-error");
                                tip.siblings('p').remove();

                                tip.after('<p class="has-error help-block">' + data.Message + '</p>');
                                tip.parent().parent().addClass("has-error");
                            } else {
                                var isThirdPage = false;
                                var thirdPageData = {};
                                pageManage.thirdPageDataList.forEach(function (item) {
                                    if (item.Id == pageManage.currentOperatePageId) {
                                        isThirdPage = true;
                                        thirdPageData = item;
                                    }
                                })
                                if (isThirdPage && thirdPageData.ThirdPageDomainList.length>1 &&thirdPageData.PageDomain != $("#ch_template_url").text()) {
                                    $.ajax({
                                        cache: false,
                                        url: "/Designer/Designer/ResetThirdPageDomain",
                                        data: {
                                            pageId: pageManage.currentOperatePageId,
                                            pageDomain: $("#ch_template_url").text(),
                                        },
                                        type: "post",
                                        success: function (data) {

                                        }
                                    })
                                }
                                $.ajax({
                                    cache: false,
                                    url: "/Designer/Page/UpdatePage",
                                    data: $('#frmContentPageEdit').serialize(),
                                    type: "post",
                                    success: function (data) {
                                        if (data.IsSuccess) {
                                            $('div.m-pageSet-panels').addClass("f-hide");
                                            showSuccess('保存成功');
                                            //修改列表上显示的名字
                                            $('#pageList_li_' + pageManage.currentOperatePageId).find('a.u-tree-txt').html(data.Data.Title);
                                            //如果改了主页，需要修改列表上的主页主页的图标
                                            if (data.Data.IsHomePage == 1) {
                                                pageManage.page._changeHomePageIcon();
                                            }
                                            if (pageManage.currentOperatePageId == pageManage.currentPageId) {
                                                window.location.reload();
                                            }
                                        } else {
                                            showFailure('保存失败');
                                        }
                                    },
                                    error: function (e) {
                                        //alert(e)
                                    }
                                });
                            }
                        },
                    });
                },
                showErrors: function (map, list) {
                    this.currentElements.parents('label:first, div:first').find('.has-error').remove();
                    this.currentElements.parents('.form-group:first').removeClass('has-error');

                    $.each(list, function (index, error) {
                        var ee = $(error.element);
                        var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');

                        ee.parents('.form-group:first').addClass('has-error');
                        eep.find('.has-error').remove();
                        eep.append('<p class="has-error help-block">' + error.message + '</p>');
                    });
                }
            });
        }
    },
    setPageSortable: function () {
        var removeShowOrHide = function () {
            $("#tree_contentPagelist li").each(function () {
                var parentId = $(this).attr("parentid");
                if (parentId == "0" || parentId == "-1") {
                    var licount = $(this).children("ul").children("li").length;
                    if (licount == 0 && $(this).children().first().children('.u-tree-drag').length <= 0) {
                        $(this).find('ul').remove();
                        $(this).removeClass('lz-unfold');

                        $(this).children().first().children('.u-tree-hasChild')
                            .removeClass('icon-rotate-90').addClass('icon hewi8');

                        $(this).children().first().children('.u-tree-hasChild').after('<span class="u-tree-drag"><i class="icon icon-drag-more hewi10"></i></span>');
                    }
                }
            })
        };

        var me = this;
        var refreshPageO_flag;
        $("#tree_contentPagelist").nestedSortable({
            debug: true,
            forcePlaceholderSize: true,
            handle: "div",
            helper: "clone",
            opacity: 0.6,
            items: "li",
            placeholder: "placeholder",
            revert: 150,
            tabSize: 25,
            listType: "ul",
            toleranceElement: "> div",
            maxLevels: 2,
            update: function (event, ui) {
                clearTimeout(refreshPageO_flag);
                var $selectedItem = $(ui.item[0]);
                if ($selectedItem.parent().parent().is("section")) {
                    $selectedItem.attr('parentid', '0');
                    $selectedItem.children().first().children().first().removeClass('icon-rotate-90');
                    $selectedItem.children().first().children().first().children().first().removeClass('icon-itemLine').addClass('icon-boder-right');
                    //处理当前元素
                    var licount = $selectedItem.children("ul").children("li").length;
                    if (licount == 0) {
                        $selectedItem.children().first().children().first().addClass('icon hewi8');
                        if (!$selectedItem.children().first().children('.u-tree-drag').length > 0) {
                            $selectedItem.children().first().children().first().before('<span class="u-tree-drag"><i class="icon icon-drag-more hewi10"></i></span>');
                        }
                    } else {
                        //托动带有二级页面的一级页面会触发这一步。
                        var liItem = $selectedItem.closest('li');
                        if (liItem.hasClass('lz-unfold')) {
                            $selectedItem.find('span.u-tree-hasChild').addClass('icon-rotate-90');
                        } else {

                        }
                    }
                    //处理当前元素被移出之前的父级元素
                    removeShowOrHide();
                } else {
                    var parentId = $selectedItem.parent().parent("li").attr("pid");
                    $selectedItem.attr('parentid', parentId);
                    //处理当前元素
                    $selectedItem.children().first().children('.u-tree-drag').remove();
                    $selectedItem.children().first().children('.u-tree-hasChild').children().first()
                        .removeClass('icon-boder-right').addClass('icon icon-itemLine');
                    $selectedItem.children().first().children().first()
                        .removeClass("icon hewi8").addClass('icon-rotate-90');
                    //处理父级元素
                    $selectedItem.parent().addClass('u-tree-item-box');
                    $selectedItem.parent().parent("li").children().first().children('.u-tree-drag').remove();
                    $selectedItem.parent().parent("li").addClass('lz-unfold');
                    $selectedItem.parent().parent("li").children().first().children('.u-tree-hasChild')
                        .removeClass('icon hewi8').addClass('icon-rotate-90');
                }

                refreshPageO_flag = setTimeout(function () {
                    var $items = $(event.target).find('li');
                    var sortItems = new Array();
                    $items.each(function (index) {
                        var $this = $(this);
                        var sortItem = {};
                        sortItem.pageid = $this.attr('pid');
                        sortItem.parentid = $this.attr('parentid');
                        sortItem.displayorder = index;
                        if (sortItem.parentid > 0) {
                            sortItem.level = 1;
                        } else {
                            sortItem.level = 0;
                        }
                        sortItems.push(sortItem);
                    });
                    var str = JSON.stringify(sortItems);
                    $.ajax({
                        url: '/Designer/Page/UpdatePageSort',
                        method: 'post',
                        data: { pages: sortItems },
                        dataType: 'json',
                        success: function (data) {
                            if (data.error) {
                                alert('保存失败!');
                            }
                        }
                    })
                }, 1500);
            }
        });
    },
    onSetHomePage: function () {
        $.ajax({
            cache: false,
            url: "/Designer/Page/SetHomePage",
            data: {
                pageId: pageManage.currentOperatePageId,
                pageType: 'ContentPage',
            },
            type: "post",
            success: function (result) {
                if (result && result.IsSuccess && result.Data) {
                    pageManage.page._changeHomePageIcon();
                } else {
                    showFailure();
                }
            },
            error: function (e) {
            }
        });
    },
    _changeHomePageIcon: function () {
        $("#tree_contentPagelist li").each(function (index, item) {
            if ($(item).attr('pid') == pageManage.currentOperatePageId) {
                $(item).children().first().children('.u-tree-pic').addClass('set-home');
                $(item).children().first().children('.u-tree-pic').children().first().removeClass('lzprompt-bottom lz-hidden');
                $(item).children().first().children('.u-tree-pic').children().first()
                    .removeAttr('data-lztitle').removeAttr('data-target').removeAttr('data-toggle');
            } else {
                $(item).children().first().children('.u-tree-pic').removeClass('set-home');
                $(item).children().first().children('.u-tree-pic').children().first().addClass('lzprompt-bottom lz-hidden');
                $(item).children().first().children('.u-tree-pic').children().first()
                    .attr('data-lztitle', '设为首页').attr('data-target', '#modal-Forhome').attr('data-toggle', 'modal');
            }
        });
    },
    loadPage: function (parentId, pageIndex, pageSize) {
        $.post("/Designer/Designer/LoadPageList", { parentId: parentId, pageIndex: pageIndex, pageSize: pageSize }, function (result) {
            if (result.IsSuccess && typeof result.Data != 'undefined') {
                var html = '';
                var currentPageId = pageManage.headerfooter.getCurrentPageId();
                var homePageId = result.Data.HomePageId;
                var thirdPageList = [];
                for (var i = 0; i < result.Data.PageData.length; i++) {
                    var item = result.Data.PageData[i];
                    if (item.IsThirdPage) {
                        thirdPageList.push(item)
                        continue
                    }
                    var currentClass = item.Id == currentPageId ? "z-current" : "";
                    html += $.format('<li id="pageList_li_{0}" pid="{1}" parentid="0" class="u-tree-item {2} {3}">', item.Id, item.Id, currentClass, "");
                    html += '    <div class="u-tree-item-inner f-clearfix" style="padding-left: 12px;">';
                    html += '        <span class="u-tree-hasChild f-left">';
                    html += $.format('            <i class="icon-boder-right" onclick="pageManage.page.getSelectPageId({0})"></i>', item.Id);
                    html += '        </span>';
                    html += $.format('        <a href="#" class="u-tree-txt f-left">{0}</a>', item.Title);
                    if (item.Id == homePageId) {
                        html += '        <span class="u-tree-pic set-home">';
                        html += $.format('            <i pageid="{0}" class="icon icon-home"></i>', item.Id);
                    }
                    else {
                        html += '        <span class="u-tree-pic">';
                        html += $.format('            <i pageid="{0}" class="icon icon-home  lzprompt-bottom lz-hidden" data-lztitle="设为首页" ></i>', item.Id);
                    }
                    html += $.format('            <i pageid="{0}" class="icon icon-more-doGray lztree-dropdown"  onclick="pageManage.page.getSelectPageId({0})"></i>', item.Id);
                    html += '        </span>';
                    html += '    </div>';
                    if (item.Children != undefined && item.Children.length > 0) {
                        html += '    <ul class="u-tree-item-box f-clearfix" style="display: none;">';
                        for (var j = 0; j < item.Children.length; j++) {
                            var child = item.Children[j];
                            html += $.format('        <li class="u-tree-item" id="pageList_li_{0}" pid="{1}" parentid="{2}">', child.Id, child.Id, item.Id);
                            html += '            <div class="u-tree-item-inner f-clearfix" style="padding-left: 32px;">';
                            html += '                <span class="u-tree-hasChild icon-rotate-90 f-left">';
                            html += '                    <i class="icon icon-itemLine"></i>';
                            html += '                </span>';
                            html += $.format('                <a href="#" class="u-tree-txt f-left">{0}</a>', child.Title);

                            if (child.Id == homePageId) {
                                html += '                <span class="u-tree-pic f-left set-home">';
                                html += $.format('                    <i pageid="{0}" class="icon icon-home"></i>', child.Id);
                            }
                            else {
                                html += '                <span class="u-tree-pic f-left">';
                                html += $.format('                    <i pageid="{0}" class="icon icon-home  lzprompt-bottom lz-hidden" data-lztitle="设为首页"></i>', child.Id);
                            }
                            html += $.format('                    <i pageid="{0}" class="icon icon-more-doGray lztree-dropdown" onclick="pageManage.page.getSelectPageId({0})"></i>', child.Id);
                            html += '                </span>';
                            html += '            </div>';
                            html += '        </li>';
                        }
                        html += '    </ul>';
                    }
                    html += '</li>';
                }
                var thirdHtml = `<div style="margin:12px;border-top:1px solid #EFF0F3;padding-top:24px;font-size: 14px;color: #231D0D;">${pageManage.__StandalonTitle}应用页面</div>`;
                thirdPageList.forEach(function (item) {
                    thirdHtml += `<li id="pageList_li_${item.Id}" pid="${item.Id}" parentid="0" class="u-tree-item thirdPage">
                                    <div class="u-tree-item-inner f-clearfix" style="padding-left: 12px;">
                                        <a href="/RunTime/RPreviewPage?pageId=${item.Id}" target="_blank" class="u-tree-txt f-left">${item.Title}</a>
                                        <span class="u-tree-pic ${item.Id == homePageId ?'set-home':''}">
                                            <i pageid="${item.Id}" class="icon icon-home ${item.Id == homePageId ? '' : 'lzprompt-bottom lz-hidden'}" ${item.Id == homePageId ? '':'data-lztitle="设为首页"'}></i>
                                            <i pageid="${item.Id}" class="icon icon-more-doGray lztree-dropdown"  onclick="pageManage.page.thirdPageEdit(${item.Id},'${item.ThirdPageDomainList.toString()}')"></i>
                                        </span>
                                    </div>
                                </li>`
                })
                $("#tree_contentPagelist").html(html);
                if (thirdPageList.length>0) {
                    pageManage.thirdPageDataList = thirdPageList;
                    $("#tree_contentPagelist").append(thirdHtml);
                }
                $('#tree_contentPagelist').parent().lzTree('#tree-pageleft-set');
            }
        });
    },
    getSelectPageId: function (pageId) {
        // 如果是手机端自适应页面 中间的提示文本突出显示，无其他点击效果
        if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
            $('#tree-pageleft-set').parent().css('display', 'none');
        } else {
            $('#tree-pageleft-set').parent().css('display', 'block');
        }
        pageManage.currentOperatePageId = pageId;
    },
    thirdPageEdit: function (pageId, thirdPageDomainList) {
        pageManage.currentOperatePageId = pageId;
        $('#tree-pageleft-set').parent().css('display', 'none');
        $(".m-pageSet-panels").removeClass("f-hide");
        $(".m-editSystem-panels,.m-eheadFoot-panels,.m-reheadFoot-panels").addClass("f-hide");
        pageManage.page.edit.rendEditContentPage(true, thirdPageDomainList.split(","));

    }
};

pageManage.page.creat.registValidate();

//页头页尾
pageManage.headerfooter = {
    init: function () {
        //语言导入事件
        $('#headAndFootPage_setting_import').off('click').on('click', function () {
            pageManage.isInTranslateProcess();
        });
        $('#tree_headAndFootPagelist i').on('click', function () {
            // 如果是手机端自适应页面 中间的提示文本突出显示，无其他点击效果
            if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                $('#tree-pageleft08-set').parent().css('display', 'none');
            } else {
                $('#tree-pageleft08-set').parent().css('display', 'block');
            }
            pageManage.currentOperatePageId = $(this).attr('pageid');
        });

        $('#tree_headAndFootPagelist li').off('click').on('click', function () {
            var pageId = $(this).attr('pid');
            window.location.href = '/designer/index/' + pageId  + isSimpleViewString;
        });
        pageManage.headerfooter.create.init();
        pageManage.headerfooter.edit.init();
    },
    create: {
        init: function () {
            pageManage.headerfooter.create.rendCreatePanel();
        },
        rendCreatePanel: function () {
            var bindStyleSwitch = function () {
                $('#edithfLan_style_ul li').off('click').on('click', function () {
                    var currentStyle = $(this).attr('stylename');
                    $('#edithfLan_style_ul li').each(function (index, item) {
                        if ($(item).attr('stylename') == currentStyle) {
                            $('#hid_creatHeadAndFoot_styleName').val(currentStyle);
                            $(item).addClass('z-current');
                        } else {
                            $(item).removeClass('z-current');
                        }
                    });
                });
            };
            $.ajax({
                cache: false,
                url: "/Designer/Page/GetPage",
                data: { pageId: 0, pgType: 'TemplatePage' },
                type: "post",
                success: function (result) {
                    if (result && result.IsSuccess) {
                        $("#createHeadAndFootPanel").html(template("temp-createHeadAndFoot", result));
                        $('#createHeadAndFootSubmitBtn').off('click').on('click', function () {
                            $('#HeadAndFoot_submit_btn').click();
                        });
                        $(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                        scrollHeight();
                        lzslider('#createHeadAndFootPanel div.m-lan-switchBox');
                        pageManage.headerfooter.create.registValidate();
                        bindStyleSwitch();
                    } else {
                        showFailure();
                    }
                },
                error: function (e) {
                }
            });
        },
        registValidate: function () {
            $("#frmCreateHeadAndFoot").validate({
                rules: {
                    Title: {
                        required: true,
                        maxlength: 40,
                        remote: {
                            type: "POST",
                            url: "/Designer/Page/CheckPageTitleIsExist",
                            data: {
                                pageId: 0,
                                title: $('#creatHeadAndFoot_title').val(),
                                deviceMode: 1,//1代表pc
                            }
                        }
                    },
                    Url: {
                        required: true,
                        maxlength: 40,
                    }
                },
                messages: {
                    Title: {
                        required: "标题不能为空",
                        maxlength: "长度不能超过{0}",
                        remote: "标题已存在，请重新输入"
                    },
                    Url: {
                        required: "Url不能为空",
                        maxlength: "长度不能超过{0}",
                    }
                },
                submitHandler: function (form) {
                    $.ajax({
                        cache: false,
                        url: "/Designer/Page/CreatePage",
                        data: $('#frmCreateHeadAndFoot').serialize(),
                        type: "post",
                        success: function (result) {
                            if (!result.error) {
                                $('div.m-reheadFoot-panels').hide();
                                showSuccess('新增成功');
                                window.location.href = '/designer/index/' + result.data.BizId  + isSimpleViewString;
                            } else {
                                if (typeof result.message != 'undefined') {
                                    showFailure(result.message);
                                }
                                else {
                                    showFailure('新增失败');
                                }
                            }
                        },
                        error: function (e) {
                        }
                    });
                },
                showErrors: function (map, list) {
                    this.currentElements.parents('label:first, div:first').find('.has-error').remove();
                    this.currentElements.parents('.form-group:first').removeClass('has-error');

                    $.each(list, function (index, error) {
                        var ee = $(error.element);
                        var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');

                        ee.parents('.form-group:first').addClass('has-error');
                        eep.find('.has-error').remove();
                        eep.append('<p class="has-error help-block">' + error.message + '</p>');
                    });
                }
            });
        }
    },
    edit: {
        init: function () {
            //设置
            $('#headAndFootPage_setting').off('click').on('click', function () {
                pageManage.headerfooter.edit.rendEditPanel();
            });
        },
        rendEditPanel: function () {
            var bindStyleSwitch = function () {
                $('#edithefoPage_style_ul li').off('click').on('click', function () {
                    var currentStyle = $(this).attr('stylename');
                    $('#edithefoPage_style_ul li').each(function (index, item) {
                        if ($(item).attr('stylename') == currentStyle) {
                            $('#hid_editHeadAndFoot_styleName').val(currentStyle);
                            $(item).addClass('z-current');
                        } else {
                            $(item).removeClass('z-current');
                        }
                    });
                });
            };

            $.ajax({
                cache: false,
                url: "/Designer/Page/GetPage",
                data: { pageId: pageManage.currentOperatePageId, pgType: 'TemplatePage' },
                type: "post",
                success: function (result) {
                    if (result && result.IsSuccess) {
                        $("#editHeadAndFootPanel").html(template("temp-editHeadAndFoot", result));
                        $('#editHeadAndFootSubmitBtn').off('click').on('click', function () {
                            $('#editHeadAndFoot_submit_btn').click();
                        });
                        $('#hid_editHeadAndFoot_Id').val(pageManage.currentOperatePageId);
                        $(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                        // scrollHeight
                        scrollHeight();
                        lzslider('#editHeadAndFootPanel div.m-lan-switchBox');
                        pageManage.headerfooter.edit.registValidate();
                        bindStyleSwitch();
                    } else {
                        showFailure();
                    }
                },
                error: function (e) {
                }
            });
        },
        registValidate: function () {
            $("#frmEditHeadAndFoot").validate({
                rules: {
                    Title: {
                        required: true,
                        maxlength: 40,
                        remote: {
                            type: "POST",
                            url: "/Designer/Page/CheckPageTitleIsExist",
                            data: {
                                pageId: pageManage.currentOperatePageId,
                                title: $('#editHeadAndFoot_title').val(),
                                deviceMode: 1,//1代表pc
                            }
                        }
                    },
                    Url: {
                        required: true,
                        maxlength: 40,
                    }
                },
                messages: {
                    Title: {
                        required: "标题不能为空",
                        maxlength: "长度不能超过{0}",
                        remote: "标题已存在，请重新输入"
                    },
                    Url: {
                        required: "Url不能为空",
                        maxlength: "长度不能超过{0}",
                    }
                },
                submitHandler: function (form) {
                    $.ajax({
                        cache: false,
                        url: "/Designer/Page/UpdatePage",
                        data: $('#frmEditHeadAndFoot').serialize(),
                        type: "post",
                        success: function (result) {
                            if (result.IsSuccess) {
                                $('div.m-eheadFoot-panels').addClass("f-hide");
                                showSuccess('保存成功');
                                //修改列表上显示的名字
                                $('#pageList_li_' + pageManage.currentOperatePageId).find('a.u-tree-txt').html(result.Data.Title);
                                if (result.Data.Id == pageManage.currentPageId) {
                                    window.location.reload();
                                }
                            } else {
                                showFailure('保存失败');
                            }
                        },
                        error: function (e) {
                        }
                    });
                },
                showErrors: function (map, list) {
                    this.currentElements.parents('label:first, div:first').find('.has-error').remove();
                    this.currentElements.parents('.form-group:first').removeClass('has-error');

                    $.each(list, function (index, error) {
                        var ee = $(error.element);
                        var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');

                        ee.parents('.form-group:first').addClass('has-error');
                        eep.find('.has-error').remove();
                        eep.append('<p class="has-error help-block">' + error.message + '</p>');
                    });
                }
            });
        },
        //对外提供的，直接弹出当前页头页尾的编辑页面
        openEditPanel: function (pageId) {
            pageManage.currentOperatePageId = pageId;

            $('#header_pageTitleWrap').click();
            $(".m-eheadFoot-panels").removeClass("f-hide");
            $('.m-menu-panels .pageNav-item').first().removeClass('active');
            $('.m-menu-panels .pageNav-item').last().addClass('active');
            $('.m-menu-panels .tab-pane').first().removeClass('active');
            $('.m-menu-panels .tab-pane').last().addClass('active');
            pageManage.headerfooter.edit.rendEditPanel();
        }
    },
    getCurrentPageId: function () {
        var currentPageId = 0;
        var arrayLocaltionHref = window.location.href.split('/');
        if (arrayLocaltionHref != undefined && arrayLocaltionHref.length > 0) {
            currentPageId = arrayLocaltionHref[arrayLocaltionHref.length - 1];
            if (currentPageId != undefined && currentPageId != "") {
                currentPageId = parseInt(currentPageId);
            }
        }
        return currentPageId;
    }
};

//系统页面
pageManage.sysPage = {
    currentOperatePageType: 'ProductContentPage',
    init: function () {
        //语言导入事件
        $('#sysPage_setting_import').off('click').on('click', function () {
            pageManage.isInTranslateProcess();
        });

        $('#tree_sysPagelist li').off('click').on('click', function () {
            var pageId = $(this).attr('pid');
            window.location.href = '/designer/index/' + pageId + isSimpleViewString;
        });
        $('#tree_sysPagelist i').on('click', function () {
            // 如果是手机端自适应页面 中间的提示文本突出显示，无其他点击效果
            if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                $('#tree-pageleft02-set').parent().css('display', 'none');
            } else {
                $('#tree-pageleft02-set').parent().css('display', 'block');
            }
            pageManage.currentOperatePageId = $(this).attr('pageid');
            pageManage.sysPage.currentOperatePageType = $(this).attr('pagetype');
            if ($(this).attr('isSystemPage') == '0') {
                $('#tree-pageleft02-set li').last().removeClass('f-hide');

            } else {
                $('#tree-pageleft02-set li').last().addClass('f-hide');
                $('#tree-pageleft02-set li').last().off('click');
            }
            $('a[data-isupgradebtn=\"true\"][data-upgraderole=\"clonepage\"][which=3]', "#tree-pageleft02-set").removeClass(' u-updatemark02').off('click')
                .attr('href', '#use-modal9').removeAttr('target', '_blank').attr('data-toggle', "modal");
            $.get("/designer/common/NeedUpgrade", { pageType: pageManage.sysPage.currentOperatePageType }, function (data) {
                if (data.Data) {
                    $('a[data-isupgradebtn=\"true\"][data-upgraderole=\"clonepage\"][which=3]', "#tree-pageleft02-set").addClass(' u-updatemark02').off('click')
                        .attr('href', '/Admin/home/upgradeversion').attr('target', '_blank').removeAttr('data-toggle').removeAttr('data-target');
                }
            }, "json");

        });
        pageManage.sysPage.edit.init();
    },
    edit: {
        init: function () {
            //设置
            $('#sysPage_setting').off('click').on('click', function () {
                pageManage.sysPage.edit.rendEditPanel();
            });
        },
        rendEditPanel: function () {
            $.ajax({
                cache: false,
                url: "/Designer/Page/GetPage",
                data: { pageId: pageManage.currentOperatePageId, pgType: pageManage.sysPage.currentOperatePageType },
                type: "post",
                success: function (result) {
                    if (result && result.IsSuccess) {
                        $("#editSysPagePanel").html(template("temp-editSysPage", result));
                        //if ('NewsContentPage' == pageManage.sysPage.currentOperatePageType) {
                        //    $('#lb_sysPage_defaultTemplate_text').text('设置为网站默认文章详情页');
                        //} else {
                        //    $('#lb_sysPage_defaultTemplate_text').text('设置为网站默认产品详情页');
                        //}
                        $('#editSysPageSubmitBtn').off('click').on('click', function () {
                            $('#editSysPage_submit_btn').click();
                        });
                        $('#hid_editSysPage_Id').val(pageManage.currentOperatePageId);
                        $('#hid_systPage_TemplateId').val(result.Data.TemplateId);
                        var templateName = result.Data.TemplateName == null ? "无" : result.Data.TemplateName;
                        $('#sysPage_template_text').text(templateName);
                        $('#sysPage_ul_templateId li a').each(function (index, item) {
                            $(item).off('click').on('click', function () {
                                $('#hid_systPage_TemplateId').val($(this).attr('id').split('_')[2]);
                                $('#sysPage_template_text').text($(this).text());
                            });
                        });
                        $('#hid_SysPage_PageTypeName').val(pageManage.sysPage.currentOperatePageType);
                        $(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
                        scrollHeight();
                        lzslider('#editSysPagePanel div.m-lan-switchBox');
                        switchBtn();
                        pageManage.sysPage.edit.registValidate();

                        //设置为默认详情页面
                        //$('#hid_ck_editSysPage_IsDefaultTemplate').off('click').on('click', function () {
                        //    if ($('#hid_editSysPage_IsDefaultTemplate').val() == '1') {
                        //        $('#hid_editSysPage_IsDefaultTemplate').val('0');
                        //    } else {
                        //        $('#hid_editSysPage_IsDefaultTemplate').val('1');
                        //    }
                        //});
                    } else {
                        showFailure();
                    }
                },
                error: function (e) {
                }
            });
        },
        registValidate: function () {
            $("#frmEditSysPage").validate({
                rules: {
                    Title: {
                        required: true,
                        maxlength: 40,
                        remote: {
                            type: "POST",
                            url: "/Designer/Page/CheckPageTitleIsExist",
                            data: {
                                pageId: pageManage.currentOperatePageId,
                                title: $('#editSysPage_title').val(),
                                deviceMode: 1,//1代表pc
                            }
                        }
                    }
                },
                messages: {
                    Title: {
                        required: "标题不能为空",
                        maxlength: "长度不能超过{0}",
                        remote: "标题已存在，请重新输入"
                    }
                },
                submitHandler: function (form) {
                    $.ajax({
                        cache: false,
                        url: "/Designer/Page/UpdatePage",
                        data: $('#frmEditSysPage').serialize(),
                        type: "post",
                        success: function (result) {
                            if (result.IsSuccess) {
                                $('div.m-editSystem-panels').addClass("f-hide");
                                showSuccess('保存成功');
                                //修改列表上显示的名字
                                $('#pageList_li_' + pageManage.currentOperatePageId).find('a.u-tree-txt').html(result.Data.Title);
                                if (pageManage.currentOperatePageId == pageManage.currentPageId) {
                                    window.location.reload();
                                }
                            } else {
                                showFailure('保存失败');
                            }
                        },
                        error: function (e) {
                        }
                    });
                },
                showErrors: function (map, list) {
                    this.currentElements.parents('label:first, div:first').find('.has-error').remove();
                    this.currentElements.parents('.form-group:first').removeClass('has-error');

                    $.each(list, function (index, error) {
                        var ee = $(error.element);
                        var eep = ee.parents('label:first').length ? ee.parents('label:first') : ee.parents('div:first');

                        ee.parents('.form-group:first').addClass('has-error');
                        eep.find('.has-error').remove();
                        eep.append('<p class="has-error help-block">' + error.message + '</p>');
                    });
                }
            });
        }
    },
};

//页面搜索
pageManage.search = {
    init: function () {
        $('#pageSearch_input').bind('input propertychange', function () {
            pageManage.search.clearBtnShowOrHide();
            pageManage.search.searchByTitle();
        });
        $('#pageSearch_clear').off('click').on('click', function () {
            $('#pageSearch_input').val('');
            pageManage.search.clearBtnShowOrHide();
        });
    },
    clearBtnShowOrHide: function () {
        if ($('#pageSearch_input').val() == '') {
            $('#pageSearch_clear').addClass('f-hide');
            $('#pageSearchPanel').addClass('f-hide');
        } else {
            $('#pageSearch_clear').removeClass('f-hide');
        }
    },
    searchByTitle: function () {
        var title = $.trim($('#pageSearch_input').val());
        var searchResult = {
            contentPage: [],
            headAndFoot: [],
            sysPage: []
        };
        if ('' == title || '搜索页面标题' == title) {
            return;
        }

        $('#pageSearchNoResultWrap').addClass('f-hide');
        $('#pageSearchResultWrap').addClass('f-hide');
        $('#pageSearchPanel').removeClass('f-hide');

        for (var i = 0; i < pageSearchJson.length; i++) {
            if (pageSearchJson[i][2].indexOf(title) != -1) {

                pageSearchJson[i].push(window._IsSimpleView ? 'true' : 'false')

                switch (pageSearchJson[i][1]) {
                    case 'ContentPage':
                        searchResult.contentPage.push(pageSearchJson[i]); break;
                    case 'TemplatePage':
                        searchResult.headAndFoot.push(pageSearchJson[i]); break;
                    default:
                        if (window._IsSimpleView) break;
                        searchResult.sysPage.push(pageSearchJson[i]); break;
                }
            }
        }
        if (searchResult.contentPage.length == 0 && searchResult.headAndFoot.length == 0 && searchResult.sysPage.length == 0) {
            $('#pageSearchNoResultWrap').removeClass('f-hide');
        } else {
            $('#pageSearchResultWrap').removeClass('f-hide');
            $("#pageSearchResultWrap").html(template("temp-pageSearch", searchResult));
            $(".f-scrollbar").lzscroll({ mode: 'hover', useMutation: false });
            
            scrollHeight();
            $(".tree-page").each(function () {
                var treepanel = $(this).data("content");
                $(this).lzTree(treepanel);
            });
            $('#pageSearchPanel').removeClass('f-hide');
        }
    }
};

$(function () {
    isSimpleViewString = window._IsSimpleView ? '?IsSimpleView=true': ''
    pageManage.init();
});

