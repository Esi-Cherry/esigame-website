/*
功能：模板库相关功能
创建时间：2017/2/23
*/

var pageLibraries = {
    //页面大小
    _pageSize: 6,
    //当前页码
    _currentPageIndex: 0,
    //页面总页数
    _totalPage: 1,
    //数据是否已经加载完成
    _isLoadOver: false,
    //是否刷新当前页
    _isRefreshPage: true,
    //操作方式（替换页、创建新页）
    _currentLoadType: "replace",
    init: function () {
        $('#pagelibrary_searchBtn').off('click').on('click', function () {
            pageLibraries.getPagelibraries(0, pageLibraries._currentLoadType);
        });
        $('#pagelibrary_searchInput').bind('keypress', function (event) {
            if (event.keyCode == '13') {
                pageLibraries.getPagelibraries(0, pageLibraries._currentLoadType);
            }
        });
        this.bindSceneUseSelectEvent();
        this.bindIndustrySelectEvent();
        this.bindColorSelectEvent();
        this.bindEnsureUseClick();
        this.bindPaginator();
        this.bindSingePageClickEvent();
        this.bindCreateBlankPage();
        this.productPage.init();
        pageLibraries.getPagelibraries(0, pageLibraries._currentLoadType);
    },
    //获取单页模板列表 loadType:加载方式 create/replace
    getPagelibraries: function (pageIndex, loadType, onLoadSuccess) {
        pageLibraries._currentLoadType = loadType;
        $("#pageLibraryLoading").show();
        $('#pageLibraryContainer').html('');
        $('#hid_currentPageIndex').val(pageIndex);
        var templateHtml = "";
        var importHtml = "";
        if (pageIndex == 0) {
            if (loadType == "replace") {
                templateHtml = '<li class="m-muban-item"><div class="muban-thumb-add"><a href="#" data-toggle="modal" class="muban-thumb-addLink"></a><div class="muban-thumb-addBtn"><i class="icon icon-clear-content"></i><div class="muban-add-title" data-target="#use-modal21">清空为空白页</div></div><div class="muban-thumb-addTip">点击将页面内容清空</div></div><div class="muban-thumb-title">空白页面</div></li>';
            } else {
                templateHtml = '<li class="m-muban-item"><div class="muban-thumb-add"><a id="openModalForCreatePageBtn" data-toggle="modal" class="muban-thumb-addLink"></a><div class="muban-thumb-addBtn"><i class="icon icon-addphoto"></i><div class="muban-add-title" data-target="#use-modal21">新建空白</div></div><div class="muban-thumb-addTip">点击新建空白页面</div></div><div class="muban-thumb-title">空白页面</div></li>';
                if (pageHeader && pageHeader._currentDevice == "pc") {
                    //内容导入  九云图下线
                    //importHtml = '<li class="m-muban-item"><div class="muban-thumb-add"><a id="openModalForImportFileBtn" class="muban-thumb-addLink"></a> <div class="muban-thumb-importBg"><img src="/Designer/Content/images/importContent/importFile.png"></div> <div class="muban-thumb-addTip">点击导入文件</div></div><div class="muban-thumb-title">生成页面</div></li>';
                }
            }
        }
        $.post('/Designer/GetPageLibraries', {
            sceneUse: $('#SceneUse_selectedItem').val(),
            industry: $('#Industry_selectedItem').val(),
            color: $('#Color_selectedItem').val(),
            name: $('#pagelibrary_searchInput').val(),
            pageIndex: pageIndex,
            pageSize: pageLibraries._pageSize
        }, function (result) {
            templateHtml = importHtml + templateHtml + template("temp-singlePageList", result);
            $('#pageLibraryContainer').html(templateHtml);
            pageLibraries.bindTempsClick(loadType);
            if (typeof onLoadSuccess == 'function') {
                onLoadSuccess();
            }
            pageLibraries._totalPage = result.TotalPage;
            if ((pageLibraries._totalPage < pageLibraries._currentPageIndex) || pageIndex == 0) {
                $('#pgList').jqPaginator('option', {
                    totalPages: pageLibraries._totalPage,
                    currentPage: 1
                });
            } else {
                $('#pgList').jqPaginator('option', {
                    totalPages: pageLibraries._totalPage
                });
            }
            pageLibraries.bindPreviewClick();
            pageLibraries.bindUseClick();
            pageLibraries.bindCreateBlankPage();
            $('.m-muban-longPic').lzlongpic({
                speedType: 'pointer',
                speedVal: [5.5, 0.5]
            });
            $("#pageLibraryLoading").hide();
        });
    },
    reSelectedTeplateStyle: function (pageId) {
        $.post('/Designer/GetPageUsingTemplateCode', { pageId: pageId }, function (result) {
            var templateCode = result.templateCode;
            $("#pageLibraryContainer li").removeClass("m-itemcheck");
            $('#pageLibraryContainer li').each(function (index, item) {
                if ($(this).attr("templatecode") == templateCode) {
                    $(this).addClass("m-itemcheck");
                }
            });
        });
    },
    bindSingePageClickEvent: function () {
        $('#li_bar_singePage').off('click').on('click', function () {
            if ($("#tree_sysPagelist li[class*='z-current']").length > 0) {
                $("#li_bar_singePage").attr("data-target", "#use-modal17");
                pageLibraries.productPage._isRefreshPage = true;
                var clickObj = $("#tree_sysPagelist li[class*='z-current']").find("i").last();
                pageLibraries.productPage._pageKey = clickObj.attr("pagetype");
                pageLibraries.productPage.getPagelibraries(0);
            }
            else {
                $("#li_bar_singePage").attr("data-target", "#use-modal7");
                pageLibraries._isRefreshPage = true;
                pageLibraries.getPagelibraries(0, 'replace');
            }
        });

        $("#tree-pageleft-set a[class='menu-setLink u-switch-singlPage']").off('click').on('click', function () {
            var isCurrentPage = ($('#hid_pageId').val() == pageManage.currentOperatePageId);
            if (isCurrentPage) {
                pageLibraries._isRefreshPage = true;
                pageLibraries.reSelectedTeplateStyle($('#hid_pageId').val());
            }
            else {
                pageLibraries._isRefreshPage = false;
                pageLibraries.reSelectedTeplateStyle(pageManage.currentOperatePageId);
            }
        });
    },
    //场景用途下拉框
    bindSceneUseSelectEvent: function () {
        $('#SceneUse_ul li').off('click').on('click', function () {
            pageLibraries.selectedItemsClickHandler($(this), "SceneUse_selectedItem");
        });
    },
    //行业下拉框
    bindIndustrySelectEvent: function () {
        $('#Industry_ul li').off('click').on('click', function () {
            pageLibraries.selectedItemsClickHandler($(this), "Industry_selectedItem", "Industry_displayName");
            $("#Industry_liPanel").hide();
        });
    },
    //色系下拉框
    bindColorSelectEvent: function () {
        $('#Color_ul li').off('click').on('click', function () {
            pageLibraries.selectedItemsClickHandler($(this), "Color_selectedItem", "Color_displayName");
            $("#Color_liPanel").hide();
        });
    },
    //点击Select选项切换样式（公用）
    selectedItemsClickHandler: function (clickObj, selectedItemId, displayNameId) {
        if (clickObj.children().first().hasClass("current")) return;
        clickObj.siblings().find("a").removeClass("current");
        clickObj.children().first().addClass("current");
        var searchKey = clickObj.attr("id").split('|')[2];
        searchKey = searchKey == 'all' ? '' : searchKey;
        $('#' + selectedItemId).val(searchKey);
        if (displayNameId) {
            var searchText = clickObj.attr("span-text");
            $('#' + displayNameId).html(searchText);
        }
        pageLibraries.getPagelibraries(0, pageLibraries._currentLoadType);
    },
    //绑定模板上按钮的事件
    bindTempsClick: function (loadType) {
        if (loadType == 'create') {
            //$('#pageLibraryContainer li').off('click').on('click', function () {
            //    var selectedTempId = $(this).find("a[usefor='preview']").attr('libraryId');
            //    if (!selectedTempId) {
            //        //$('#hid_selectedTempId,#hid_createPage_TemplateId').val("0");
            //        pageLibraries.showCreatePageModal();
            //    }
            //});
        } else {
            $('#pageLibraryContainer li').each(function (index, item) {
                var singlePageTemplateId = $('#mainFrame').contents().find("#hid_SinglePageTemplateId").first().val();
                if ($(this).attr("templatecode") == singlePageTemplateId) {
                    $(this).addClass("m-itemcheck");
                }
                $(item).find('a').first().attr('href', '#use-modal1');
                pageLibraries.clearTemplatePageTip();
            });
        }
    },
    bindCreateBlankPage: function () {
        //$("#pageLibraryContainer .muban-thumb-add").click(function () {
        //   // $('#hid_selectedTempId,#hid_createPage_TemplateId').val("0");
        //    if (pageLibraries._currentLoadType == 'create') {
        //        pageLibraries.hideTempsModal();
        //       pageLibraries.showCreatePageModal();
        //    } else {
        //        $('#libraryPage_replace_libraryId').val("0");
        //        $('#libraryPage_replace_version').val("");
        //    }
        //});

        // 新建页面空白入口
        $("#pageLibraryContainer #openModalForCreatePageBtn").off('click').click(function () {
            if (pageLibraries._currentLoadType == 'create') {
                pageLibraries.hideTempsModal();
                pageLibraries.showCreatePageModal();
            }
        });  

        // 新建页面导入入口
        $("#pageLibraryContainer #openModalForImportFileBtn").off('click').click(function () {
            if (pageLibraries._currentLoadType == 'create') {
                pageLibraries.hideTempsModal();
                $('#importFileImg').click();
                $('#importContent').attr('import-mode', 'createPage');
                window.gtag && gtag('event', 'event_import_content', {
                    'event_category': '导入页面',
                    'event_action': '点击生成页面',
                    'event_label': '点击生成页面'
                });
            }
        });    
    },
    hideTempsModal: function () {
        $('#use-modal7').modal('hide');
    },
    showCreatePageModal: function () {
        $('#use-modal21').modal('show');
    },
    closeTempsModal: function () {
        $('#use-modal7').on('hide.bs.modal', function () {
            if (pageLibraries._currentLoadType == "create")
                pageLibraries.showCreatePageModal();
        });
    },
    //绑定预览点击事件
    bindPreviewClick: function () {
        $('#pageLibraryContainer a[usefor="preview"]').off('click').on('click', function () {
            var previewUrl = $(this).attr('previewurl');
            var pageId = $(this).attr('pageId');
            var templatetype = $(this).attr('templatetype');
            var w = window.open();
            if (templatetype == "PC") {
                w.location.href = previewUrl + '/runtime/PreviewLibraryPage?pageId=' + pageId + "&deviceMode=" + templatetype;

            } else {
                w.location.href = previewUrl + '/runtime/PreviewLibraryMobilePage?pageId=' + pageId;
            }
        });
    },
    //绑定使用点击事件
    bindUseClick: function () {
        $('#pageLibraryContainer a[usefor="use"]').off('click').on('click', function () {
            var libraryId = $(this).attr('libraryId');
            var version = $(this).attr('version');
            var siteid = $(this).attr('siteid');
            var templatecode = $(this).attr('templatecode');

            $('#libraryPage_replace_libraryId').val(libraryId);
            $('#libraryPage_replace_version').val(version);
            $('#libraryPage_replace_siteid').val(siteid);
            $('#libraryPage_replace_templatecode').val(templatecode);

            if (pageLibraries._currentLoadType == "replace") {
                $('#a_use_modal').click();
            } else {
                var selectedTempId = $(this).attr('libraryId');
                $('#hid_selectedTempIbindCreateBlankPaged').val(selectedTempId);
                pageLibraries.showCreatePageModal();
            }
        });
    },
    //确定使用模板的点击事件
    bindEnsureUseClick: function () {
        $('#btn_sure_useModel').off('click').on('click', function () {
            var libraryId = $('#libraryPage_replace_libraryId').val();
            var version = $('#libraryPage_replace_version').val();
            var siteid = $('#libraryPage_replace_siteid').val();
            var templatecode = $('#libraryPage_replace_templatecode').val();
            var pageId;
            if (pageLibraries._isRefreshPage) {
                pageId = $('#hid_pageId').val();

            } else {
                pageId = pageManage.currentOperatePageId;
            }
            $.post('/Designer/ReplaceSettingBytes',
                { pageId: pageId, libraryId: libraryId, version: version, templateCode: templatecode, siteTemplateId: siteid },
                function (result) {
                    if (result.isSuccess) {
                        if (pageLibraries._isRefreshPage) {
                            window.location.reload();
                        } else {
                            showSuccess('替换成功');
                            pageLibraries.hideTempsModal();
                        }
                    }
                });
        });
    },
    //绑定分页控件
    bindPaginator: function () {
        $('#pgList').jqPaginator({
            totalPages: pageLibraries._totalPage,
            visiblePages: pageLibraries._pageSize,
            currentPage: 1,
            onPageChange: function (pageIndex, type) {
                if (type != "init") {
                    pageLibraries._currentPageIndex = pageIndex;
                    var pageNumber = pageIndex - 1;
                    pageLibraries.getPagelibraries(pageNumber, pageLibraries._currentLoadType);
                } else {
                    pageLibraries.clearTemplatePageTip();
                }
            }
        });
    },
    clearTemplatePageTip: function () {
        $('#libraryPage_replace_libraryId').val("0");
        $('#libraryPage_replace_version').val("");
        $('#libraryPage_replace_templatecode').val("");
        $('#libraryPage_replace_siteid').val("0");
    }
};


pageLibraries.productPage = {
    //页面种类（用途）
    _pageKey: '',
    //模板类型
    _currentKey: '',
    //是否需要刷新页面
    _isRefreshPage: false,
    //当前页码
    _currentPageIndex: 0,
    //页面总页数
    _totalPage: 1,
    init: function () {
        this.bindPagePaginator();
        this.bindSingePageClickEvent();
        this.bindEnsureUseClick();
    },
    getPagelibraries: function (pageIndex, onLoadSuccess) {
        if (pageLibraries.productPage._pageKey == '') return;

        $("#productPageLibraryTitle").text(pageLibraries.productPage.getPageTitle(pageLibraries.productPage._pageKey));

        $('#pageProductLibraryContainer').html('');
        $("#pageProductLibraryLoading").show();

        $.post('/Designer/GetPageProductLibraries', { pageKey: pageLibraries.productPage._pageKey, pageIndex: pageIndex, pageSize: pageLibraries._pageSize }, function (result) {
            var templateHtml = template("temp-singlePageList", result);
            if (pageIndex == 0) {
                templateHtml = '<li class="m-muban-item"><div class="muban-thumb-add"><a href="#" data-toggle="modal" class="muban-thumb-addLink"></a><div class="muban-thumb-addBtn"><i class="icon icon-clear-content"></i><div class="muban-add-title" data-target="#use-modal21">清空为空白页</div></div><div class="muban-thumb-addTip">点击将页面内容清空</div></div><div class="muban-thumb-title">空白页面</div></li>' + templateHtml;
            }
            $('#pageProductLibraryContainer').html(templateHtml);
            pageLibraries.productPage.bindTempsClick();
            if (typeof onLoadSuccess == 'function') {
                onLoadSuccess();
            }
            pageLibraries.productPage._totalPage = result.TotalPage;
            if ((pageLibraries.productPage._totalPage < pageLibraries.productPage._currentPageIndex) || pageIndex == 0) {
                $('#pgProductList').jqPaginator('option', { totalPages: pageLibraries.productPage._totalPage, currentPage: 1 });
            }
            else {
                $('#pgProductList').jqPaginator('option', { totalPages: pageLibraries.productPage._totalPage });
            }
            pageLibraries.productPage.bindPreviewClick();
            pageLibraries.productPage.bindUseClick();
            $('.m-muban-longPic').lzlongpic({ speedType: 'pointer', speedVal: [5.5, 0.5] });
            $("#pageProductLibraryLoading").hide();
        });
    },
    //绑定模板上按钮的事件
    bindTempsClick: function () {
        $('#pageProductLibraryContainer li').each(function (index, item) {
            var singlePageTemplateId = $('#mainFrame').contents().find("#hid_SinglePageTemplateId").first().val();
            if ($(this).attr("templatecode") == singlePageTemplateId) {
                $(this).addClass("m-itemcheck");
            }
            $(item).find('a').first().attr('href', '#use-modal55');
            pageLibraries.productPage.clearTemplatePageTip();
        });
    },
    //绑定分页控件
    bindPagePaginator: function () {
        $('#pgProductList').jqPaginator({
            totalPages: this._totalPage,
            visiblePages: pageLibraries._pageSize,
            currentPage: 1,
            onPageChange: function (pageIndex, type) {
                pageLibraries.productPage._currentPageIndex = pageIndex;
                var pageNumber = pageIndex - 1;
                pageLibraries.productPage.getPagelibraries(pageNumber);
            }
        });
    },
    //绑定使用点击事件
    bindUseClick: function () {
        $('#pageProductLibraryContainer a[usefor="use"]').off('click').on('click', function () {
            var libraryId = $(this).attr('libraryId');
            var version = $(this).attr('version');
            var siteid = $(this).attr('siteid');
            var templatecode = $(this).attr('templatecode');

            $('#librarySysPage_replace_libraryId').val(libraryId);
            $('#librarySysPage_replace_version').val(version);
            $('#librarySysPage_replace_siteid').val(siteid);
            $('#librarySysPage_replace_templatecode').val(templatecode);
            $('#a_use_SysModal').click();
        });
    },
    //确定使用模板的点击事件
    bindEnsureUseClick: function () {
        $('#btn_sure_useSysModel').off('click').on('click', function () {
            var libraryId = $('#librarySysPage_replace_libraryId').val();
            var version = $('#librarySysPage_replace_version').val();
            var siteid = $('#librarySysPage_replace_siteid').val();
            var templatecode = $('#librarySysPage_replace_templatecode').val();
            var pageId;
            if (pageLibraries.productPage._isRefreshPage) {
                pageId = $('#hid_pageId').val();
            } else {
                pageId = pageManage.currentOperatePageId;
            }
            $.post('/Designer/ReplaceSettingBytes',
                { pageId: pageId, libraryId: libraryId, version: version, templateCode: templatecode, siteTemplateId: siteid },
                function (result) {
                    if (result.isSuccess) {
                        if (pageLibraries.productPage._isRefreshPage) {
                            window.location.reload();
                        } else {
                            showSuccess('替换成功');
                            pageLibraries.productPage.hideTempsModal();
                        }
                    }
                });
        });
    },
    hideTempsModal: function () {
        $('#use-modal17').modal('hide');
    },
    //绑定预览点击事件
    bindPreviewClick: function () {
        $('#pageProductLibraryContainer a[usefor="preview"]').off('click').on('click', function () {
            var previewUrl = $(this).attr('previewurl');
            var pageId = $(this).attr('pageId');
            var templatetype = $(this).attr('templatetype');
            var w = window.open();
            if (templatetype == "PC") {
                w.location.href = previewUrl + '/runtime/PreviewLibraryPage?pageId=' + pageId + "&deviceMode=" + templatetype;

            } else {
                w.location.href = previewUrl + '/runtime/PreviewLibraryMobilePage?pageId=' + pageId;
            }
        });
    },
    bindSingePageClickEvent: function () {
        $("#tree-pageleft02-set a[class='menu-setLink u-switchSingl-system']").off('click').on('click', function () {
            var isCurrentPage = ($('#hid_pageId').val() == pageManage.currentOperatePageId);
            if (isCurrentPage)
                pageLibraries.productPage._isRefreshPage = true;
            else
                pageLibraries.productPage._isRefreshPage = false;

            pageLibraries.productPage.getPagelibraries(0);
        });

        $("#tree_sysPagelist i").off('click').on('click', function () {
            pageLibraries.productPage._pageKey = $(this).attr("pagetype");
            var pageId = $(this).attr("pageid");
            pageLibraries.productPage.reSelectedTeplateStyle(pageId);
        });
    },
    clearTemplatePageTip: function () {
        $('#librarySysPage_replace_libraryId').val("0");
        $('#librarySysPage_replace_version').val("");
        $('#librarySysPage_replace_templatecode').val("");
        $('#librarySysPage_replace_siteid').val("0");
    },
    getPageTitle: function (pageKey) {
        var title = "";
        switch (pageKey) {
            case "NewsContentPage":
                title = "选择文章详情页模板";
                break;
            case "ProductContentPage":
                title = "选择产品详情页模板";
                break;
            case "NewsSearchPage":
                title = "选择文章搜索结果页模板";
                break;
            case "NewsCategoryPage":
                title = "选择文章分类结果页模板";
                break;
            case "ProductSearchPage":
                title = "选择产品搜索结果页模板";
                break;
            case "ProductCategoryPage":
                title = "选择产品分类结果页模板";
                break;
            default:

        }
        return title;
    },
    reSelectedTeplateStyle: function (pageId) {
        $.post('/Designer/GetPageUsingTemplateCode', { pageId: pageId }, function (result) {
            var templateCode = result.templateCode;
            $("#pageProductLibraryContainer li").removeClass("m-itemcheck");
            $('#pageProductLibraryContainer li').each(function (index, item) {
                if ($(this).attr("templatecode") == templateCode) {
                    $(this).addClass("m-itemcheck");
                }
            });
        });
    }
};


$(function () {
    pageLibraries.init();
});



