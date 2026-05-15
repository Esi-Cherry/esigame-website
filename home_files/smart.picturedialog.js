$(function () {
    window.LemonPluginTree = function (parms) {
        this.p = {
            treeContainer: '',
            json: {},
            languageId: "",
            showBtns: true,
            showSelectedStyle: false,//点击行是否显示当前行高亮样式
            deskTree: true,//如果树是显示在div里面, 就是false,
            showTreeLevel: 5,
            itemClick: null //数据行点击事件
            , editClick: null,
            deleteClick: null,
            showCheckbox: false,
            checkboxClick: null
        }
        for (var i in parms) {
            this.p[i] = parms[i];
        }
    }
    LemonPluginTree.prototype.Build = function () {
        var This = this;
        var json = this.p.json;
        var languageId = this.p.languageId;
        var ul = "<ul class=\"u-tree-item-box\">";


        var htmls = "";
        var htmlAll = "";
        function createHtml(json, level) {
            var htmlStr = "";
            htmlStr += "<li class=\"u-tree-item\" categoryid=\"" + json.Id + "\" pid=\"" + json.PId + "\" name=\"" + json.Name + "\" englishName=\"" + json.EnglishName + "\"level=\"" + json.Level + "\">" +
                "<div class=\"u-tree-item-inner f-clearfix\"style=\"padding-left: " + (15 + 16 * level) + "px;\">" +
                "<span class=\"u-tree-hasChild icon icon-rotate-90 hewi8 f-left\">" +
                "<i class=\"icon-boder-right\"></i>" +
                "</span>" +
                "<span class=\"u-tree-txt f-left\">" + (languageId == 2 ? json.Name : json.EnglishName == "" ? json.Name : json.EnglishName) + "</span>" +
                ((This.p.showBtns && level > 0 && json.Name != "未分类") ?
                    "<span class=\"u-tree-pic f-right\">" +
                    "<a href=\"javascript:void(0)\" data-toggle=\"modal\"group=\"a_delete\" class=\"icon icon-delete f-mr5\"></a>" +
                    "<a href=\"javascript:void(0)\" data-toggle=\"modal\" group=\"a_edit\"class=\"icon icon-pencil\"></a>" +
                    "</span>" : "") +
                "</div>";
            if (json.Children.length > 0 && This.p.showTreeLevel > level) {
                level++;
                htmlStr += ul;
                for (var i in json.Children) {
                    if (This.p.deskTree == false && json.Children[i].Name == "未分类")//未分类在选择树的时候不显示
                    { htmlStr += ""; } else {
                        if (typeof json.Children[i] == "object") {
                            htmlStr += arguments.callee(json.Children[i], level);
                        }
                    }

                }
                htmlStr += "</ul>";
            }
            htmlStr += "</li>";

            return htmlStr;
        }

        htmls += ul + createHtml(json, 0) + "</ul>";

        $('#' + This.p.treeContainer).html(htmls);
        if (This.p.showSelectedStyle)
            $(".u-tree-item:first .u-tree-item-inner:first", '#' + This.p.treeContainer).addClass("current");

        $(".tree-classfly").lzTree();

        _initTreeClick(This);
        return This;
    }

    function _initTreeClick(tag) {
        var This = tag;
        //点击树
        $("li[categoryid]", '#' + This.p.treeContainer).unbind("click").click(function () {
            if (This.p.itemClick)
                This.p.itemClick.call(this, This.p.treeContainer);
            return false;//阻止冒泡
        })
        $("a[group=a_edit]", '#' + This.p.treeContainer).click(function () {
            if (This.p.editClick)
                This.p.editClick.apply($(this).parent().parent().parent()[0]);
            return false;//阻止冒泡
        })
        $("a[group=a_delete]", '#' + This.p.treeContainer).click(function () {
            if (This.p.deleteClick)
                This.p.deleteClick.apply($(this).parent().parent().parent()[0]);
            return false;//阻止冒泡
        })
    }

    LemonPluginTree.prototype.GetChildrenIds = function (id) {
        var This = this;
        function children(id) {
            var str = "";
            var lis = $("li[pid=" + id + "]", '#' + This.p.treeContainer);
            for (var i = 0; i < lis.length; i++) {
                str = str + $(lis[i]).attr('categoryid') + ",";
                str = str + arguments.callee($(lis[i]).attr('categoryid'));
            }
            return str;
        }

        var ids = id + "," + children(id);
        return ids;
    }
    LemonPluginTree.prototype.GetChidrenLevels = function (id) {
        var This = this;
        var lv = 0;
        function children(id) {
            lv++;
            var lis = $("li[pid=" + id + "]", '#' + This.p.treeContainer);
            for (var i = 0; i < lis.length; i++) {
                arguments.callee($(lis[i]).attr('categoryid'));
            }
        }

        children(id);
        return lv;
    }
    LemonPluginTree.prototype.GetAncestorsLevels = function (id) {
        var This = this;
        var lv = 0;
        function Ancestors(id) {
            lv++;
            var li = $("li[categoryid=" + id + "]", '#' + This.p.treeContainer);
            if (li.parents("li[categoryid]:first").length > 0) {
                arguments.callee(li.parents("li[categoryid]:first").attr('categoryid'));
            }
        }

        Ancestors(id);
        return lv;
    }
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    // 图片素材管理
    $(".pic-paixu-btn.icon-xu-down-info").click(function () {
        $(this).toggleClass("icon-rotate-180");
    });
    // 选中图片
    $(".picbox-content-list .picbox-pic .picbox-pic-in").click(function () {
        var $ul = $(this).closest(".picbox-content-list");
        var liLength = $ul.find("li.current").length;
        if (_PluginTree_Parms.maxSelectNum === 1) {
            if (liLength === _PluginTree_Parms.maxSelectNum && !$(this).closest("li").hasClass("current")) {
                $ul.find("li.current").removeClass("current");
                $(this).closest("li").addClass("current");
                return false;
            }
        }
        $(this).parent().parent(".picbox-content-item").toggleClass("current");
    });
    $("#input_addPluginCategoryName").bind("input", function () {
        if ($.trim(this.value).length > 0) {
            $('a[name=a_submit]', '#add-pic-classify').removeClass("disabled");
        }
        else {
            $('a[name=a_submit]', '#add-pic-classify').addClass("disabled");
        }
    });
    $("#input_editPluginCategoryName").bind("input", function () {
        if ($.trim(this.value).length > 0)
            $('a[name=a_submit]', '#edit-pic-classify').removeClass("disabled");
        else
            $('a[name=a_submit]', '#edit-pic-classify').addClass("disabled");
    });
    // tooltip
    $.lzprompt();
})
var _PluginTree_Parms = {
    deletingCategory: { ID: 0, Name: '', PID: 0, Level: 0 },
    editingCategory: { ID: 0, Name: '', PID: 0, Level: 0 },
    addingCategory: { ID: 0, Name: '', PID: 0, Level: 0 },
    moveTree: null,
    languageId: 2,
    batchmoveTree: null,
    leftTree: null,
    addTree: null,
    editTree: null,
    uploadTree: null,
    maxSelectNum: 1
}

/**
 * 显示我的图片
 * @param {any} maxSelectNum
 * @param {any} callBack
 * @param {any} hideMyPic 旧值为true或false ，新增importPicture，导入图片复用弹窗
 * @param {any} target
 */
function ShowImoprtPictureDialog(maxSelectNum, callBack, target) {
    // 图片导入复用
    $('#modal-mapdepot-pic [data-type="default"]').hide();
    $('#modal-mapdepot-pic [data-type="import-image"]').show();

    _PluginTree_Parms.maxSelectNum = maxSelectNum;
    if ($("#pictureCol .picbox-content-list li").length == 0) {
        //获取分类数据
        LoadCategoryJson();
        //上传图片初始化
        $("#firstOperate #addPicturePic").unbind("click").click(function () {
            var $currentli = $("#plugin_leftTree .u-tree-item-inner.current").parent();
            var $uploadSpan = $('span[group=span_selectedCategory]', '#u-upload-pic');
            var categoryId = $currentli.attr("categoryid");
            var categoryName = $currentli.attr("name");
            $uploadSpan.attr("categoryid", categoryId).html(categoryName);
            $("#u-upload-pic").modal("show");
            //$("#addPictureAgain input").click();
        });
    } else {
        quitOperate();
        var hasSelected = $("#mypicture01 .hasSelected");
        if (!hasSelected.hasClass("f-hide")) {
            hasSelected.addClass("f-hide");
        }
        var hasSelected2 = $("#mypicture02 .hasSelected");
        if (!hasSelected2.hasClass("f-hide")) {
            hasSelected2.addClass("f-hide");
        }

    }
    //选取图片
    $(".submitImg").unbind("click").click(function () {

        var tabId = $(".tab-content .tabPanel.active").attr("id");
        var checkImg = $(".picbox-content-list li.current", "#" + tabId);
        if (checkImg.length > _PluginTree_Parms.maxSelectNum) {
            showWarning("最多只能选取" + _PluginTree_Parms.maxSelectNum + "张图片！");
            return false;
        }
        if (checkImg.length == 0) {
            $("#modal-mapdepot-pic").modal("hide");
            return true;
        }
        var imgs = new Array();
        checkImg.each(function (i) {
            var img = new Object();
            img.PicThumUrl = $(this).attr("data-picThumUrl");
            img.PicUrl = $(this).attr("data-Url");
            img.MimeType = $(this).attr("data-mineType");
            img.PictureTitle = '';
            img.PictureId = $(this).attr("data-id");
            img.Width = $(this).attr("data-width");
            img.Height = $(this).attr("data-height");
            img.Name = $(this).find('.pic-edit').attr('title');
            imgs[i] = img;
        });
        if (typeof callBack == "function") {
            callBack.call(target, imgs);
        }
        $("#modal-mapdepot-pic").modal("hide");
    });

    $("#materialList li").show();
    $('li[categoryid=0]', '#plugin_leftTree').click();

    $("#modal-mapdepot-pic").modal("show");
};

function ShowPictureDialog(maxSelectNum, callBack, hideMyPic, target) {
    _PluginTree_Parms.maxSelectNum = maxSelectNum;
    // 图片导入复用
    $('#modal-mapdepot-pic [data-type="default"]').show();
    $('#modal-mapdepot-pic [data-type="import-image"]').hide();
    if ($("#pictureCol .picbox-content-list li").length == 0) {
        //获取分类数据
        LoadCategoryJson();

        //上传图片初始化
        $("#firstOperate #addPicturePic").unbind("click").click(function () {
            var $currentli = $("#plugin_leftTree .u-tree-item-inner.current").parent();
            var $uploadSpan = $('span[group=span_selectedCategory]', '#u-upload-pic');
            var categoryId = $currentli.attr("categoryid");
            var categoryName = $currentli.attr("name");
            $uploadSpan.attr("categoryid", categoryId).html(categoryName);
            $("#u-upload-pic").modal("show");
            //$("#addPictureAgain input").click();
        });
    } else {
        quitOperate();
        var hasSelected = $("#mypicture01 .hasSelected");
        if (!hasSelected.hasClass("f-hide")) {
            hasSelected.addClass("f-hide");
        }
        var hasSelected2 = $("#mypicture02 .hasSelected");
        if (!hasSelected2.hasClass("f-hide")) {
            hasSelected2.addClass("f-hide");
        }
        //模拟点击全部分类
        if (hideMyPic) {
            $("#materialList li").hide();
            $("#materialList li").removeClass('active');
            $("#materialList li[name='小程序导航图标']").addClass('active');
            $("#materialList li[name='小程序导航图标']").show();
            $("#materialList li[name='小程序导航图标']").click();
        } else {
            //$('li[categoryid=0]', '#plugin_leftTree').click();
        }
    }
    //选取图片
    $(".submitImg").unbind("click").click(function () {
        
        var tabId = $(".tab-content .tabPanel.active").attr("id");
        var checkImg = $(".picbox-content-list li.current", "#" + tabId);
        if (checkImg.length > _PluginTree_Parms.maxSelectNum) {
            showWarning("最多只能选取" + _PluginTree_Parms.maxSelectNum + "张图片！");
            return false;
        }
        if (checkImg.length == 0) {
            $("#modal-mapdepot-pic").modal("hide");
            return true;
        }
        var imgs = new Array();
        checkImg.each(function (i) {
            var img = new Object();
            img.PicThumUrl = $(this).attr("data-picThumUrl");
            img.PicUrl = $(this).attr("data-Url");
            img.MimeType = $(this).attr("data-mineType");
            img.PictureTitle = '';
            img.PictureId = $(this).attr("data-id");
            imgs[i] = img;
            
            //if (!window._imgClipControlId) {
            
            //    window['oMaskClipTool'] && window['oMaskClipTool'].resetHTML();
            //};

            if (document.getElementById('mainFrame') !== null && typeof (document.getElementById('mainFrame').contentWindow) !== "undefined" && typeof (document.getElementById('mainFrame').contentWindow.smartViewFactory) !== "undefined") {
                var smf = document.getElementById('mainFrame').contentWindow.smartViewFactory;
                if (smf.storage.tempData === null) {
                    if(!window.isOemSimple && !['listnews', 'listproduct'].includes($("#" + window._imgClipControlId).attr('ctype'))){
                        smf.beforeModify({ desc: "设置", controlType: $("#" + window._imgClipControlId).attr('ctype'), suffix: "高级属性", ctrlId: window._imgClipControlId })
                    }
                }
            }
        });
        if (typeof callBack == "function") {
            callBack.call(target, imgs);
        }
        $("#mainFrame").contents().find("#smv_Main").css("background-image", "");  //add by Huangyi 选择的新的背景在父元素上 要删除子元素的背景 否则看不到选择的效果
        $("#modal-mapdepot-pic").modal("hide");
    });

    if (hideMyPic) {
        $("#modal-mapdepot-pic a[href='#mypicture01']").parent().removeClass('active').hide();
        $("#modal-mapdepot-pic a[href='#mypicture02']").parent().addClass('active');
        $("#mypicture01").removeClass('active');
        $("#mypicture02").addClass('active');

    } else {
        $("#modal-mapdepot-pic a[href='#mypicture02']").parent().removeClass('active');
        $("#modal-mapdepot-pic a[href='#mypicture01']").parent().addClass('active').show();
        $("#mypicture02").removeClass('active');
        $("#mypicture01").addClass('active');
        $("#materialList li").show();
        $('li[categoryid=0]', '#plugin_leftTree').click();
    }
    $("#modal-mapdepot-pic").modal("show");
};

function ShowXiuXiu(controlId) {
    var loadphotoUrl = $("#mainFrame", window.parent.document).contents().find('#' + controlId + " img").attr("src");
    if (loadphotoUrl.substr(0, 4).toLowerCase() != 'http')
        loadphotoUrl = "https:" + loadphotoUrl;

    $("#xiuxiuFrame", window.parent.document).attr("src", "/admin/map/Meitu?imgUrl=" + encodeURIComponent(loadphotoUrl));
    $("#modal-mapdepot-xiupic").modal("show");
}

function HideXiuXiu() {
    $("#modal-mapdepot-xiupic").modal("hide");
}

function ShowCategory() {
    setTimeout(function () {
        $("#pn_Data  .n-select").click();
    }, 1500);
}


function ShowListSelect() {
    setTimeout(function () {
        $("#pn_Data  .n-select").click();
    }, 2000);
}

//加载树形结构
function LoadCategoryJson(categoryId) {
    $.get("/admin/picture/JsonCategoryTree", { stamp: Math.random() }, function (data) {
        if (data.json == null) {
            if (data.IsLogin != null && data.IsLogin != undefined && !data.IsLogin) {
                alert("请先登录");
                return false;
            }
            if (data.HavePermission != null && data.HavePermission != undefined && !data.HavePermission) {
                alert("你没有上传图片管理的权限");
                return false;
            }
            return false;
        }
        var CategoryJson = eval("(" + data.json + ")");
        _PluginTree_Parms.languageId = data.languageId;
        //初始化树形结构
        _PluginTree_Parms.leftTree = new LemonPluginTree({
            treeContainer: 'plugin_leftTree', json: CategoryJson, languageId: data.languageId, showSelectedStyle: true, editClick: showPluginEdit, deleteClick: showPluginDelete, itemClick: loadPluginDataTable
        });
        _PluginTree_Parms.leftTree.Build();//左侧树

        window.setTimeout(function () {
            _PluginTree_Parms.addTree = (new LemonPluginTree({
                treeContainer: 'plugin_addCategory', json: CategoryJson, languageId: data.languageId, showBtns: false,
                deskTree: false, itemClick: clickTreeSetInputValue, showTreeLevel: 2
            }));
            _PluginTree_Parms.addTree.Build();//添加分类树
            _PluginTree_Parms.editTree = (new LemonPluginTree({
                treeContainer: 'plugin_editCategory', json: CategoryJson, languageId: data.languageId, showBtns: false,
                deskTree: false, itemClick: clickTreeSetInputValue, showTreeLevel: 2
            }));
            _PluginTree_Parms.editTree.Build();//编辑分类树
            _PluginTree_Parms.moveTree = (new LemonPluginTree({
                treeContainer: 'plugin_moveTree', json: CategoryJson, languageId: data.languageId,
                showBtns: false, deskTree: false, showCheckbox: false, itemClick: clickCallback
            }));
            _PluginTree_Parms.moveTree.Build();//转移树
            _PluginTree_Parms.batchmoveTree = (new LemonPluginTree({
                treeContainer: 'plugin_batchmoveTree', json: CategoryJson, languageId: data.languageId,
                showBtns: false, deskTree: false, showCheckbox: false, itemClick: batchclickCallback
            }));
            _PluginTree_Parms.batchmoveTree.Build();//转移树
            _PluginTree_Parms.uploadTree = (new LemonPluginTree({
                treeContainer: 'plugin_uploadTree', json: CategoryJson, languageId: data.languageId, showBtns: false,
                deskTree: false, showTreeLevel: 3, showCheckbox: false, itemClick: clickUploadTree
            }));
            _PluginTree_Parms.uploadTree.Build();//上传选择分类树
            if (!categoryId)
                $("li[categoryid=0]", '#plugin_leftTree').click();//初始化模拟点击全部分类触发右侧表格加载
            else
                $("li[categoryid=" + categoryId + "]", '#plugin_leftTree').click();//初始化模拟点击全部分类触发右侧表格加载

        }, 100)


    }, "json");
}

var _mp = {
    PageNumber: 1,
    PageSize: 24,
    CategoryId: 0,
    SearchWords: ""
}

//初始化素材库分类点击
function _initMaterialLi(hideMyPic) {
    $("#materialList li").unbind("click").click(function () {
        _mp.CategoryId = $(this).find("a").attr("categoryid");
        $("#materialList li").removeClass("active");
        $(this).addClass("active");
        $("#matcategoryName").html($(this).text());
        _loadMaterialImg(true);
        $("#material_pager li:eq(2)").click();
    });
    if (hideMyPic) {
        $("#materialList li").hide();
        $("#materialList li").removeClass('active');
        $("#materialList li[name='小程序导航图标']").addClass('active');
        $("#materialList li[name='小程序导航图标']").show();
        $("#materialList li[name='小程序导航图标']").click();
        return false;
    } else {

        $("#materialList li:first").click();
    }
}

//初始化素材库图片加载    
function _loadMaterialImg(isfresh) {
}

function _getImgStr(data, isfresh) {
    var models = data.list;
    var str = "";
    if (models.length > 0) {
        $("#noSearchMaPicture").hide();
        for (var i = 0; i < models.length; i++) {
            var pictureName = models[i].PictureName//(models[i].PictureName == "" || models[i].PictureName == null) ? models[i].SeoFileName : models[i].Name;
            str += "<li class=\"picbox-content-item\"data-id=\"" + models[i].Id + "\"data-title=\"" + pictureName + "\"data-mineType=\"" + models[i].MimeType +
                "\"data-url=\"" + models[i].PictureFullUrl + "\"data-picThumUrl=\"" + models[i].PictureFullUrl + "\">" +
                " <i class=\"icon icon-pic-checked picbox-pic-checked\"></i>" +
                " <div class=\"picbox-pic\">" +
                //"   <span onclick=\"DialogShowXiuXiu('" + models[i].PictureFullUrl + "')\"  class=\"u-picmagic lzprompt-bottom lz-hidden\" data-lztitle=\"图片加工\">" +
                //"        <i class=\"icon icon-magic hewi14\"></i>" +
                //"    </span >" +
                "<div class=\"picbox-pic-in\"><img src=\"" + models[i].PictureFullUrl + "?x-oss-process=image/resize,m_lfit,h_200,w_200&v="+ Date.now()+"\" /></div>" +
                " <ul class=\"picbox-view clearfix\">" +
                "  <li class=\"f-inlineblock f-no-float\">" +
                "     <a class=\"icon icon-see-current lzprompt-bottom lz-hidden\" data-title=\"" + pictureName + "\"data-size=\"" + models[i].PictureFileSize +
                "\" data-url=\"" + models[i].PictureFullUrl + "\" data-lztitle=\"预览\"></a>" +
                "  </li></ul> </div>" +
                "<div class=\"picbox-picinfo pic-edit\" title=\"" + pictureName + "\"><input readonly style='background-color:#fff' type=\"text\"data-id=\"" + models[i].Id +
                "\" onblur=\"editMaterialTitle(this)\" value=\"" + pictureName + "\" class=\"form-control\"> </div>" +
                "</li>";
        }

    } else {
        //$("#pictureList").hide();
        //$("#noSearchMaPicture .primary-color").html(_mp.SearchWords);
        //$("#noSearchMaPicture").show();
        if (_mp.SearchWords.length == 0) {
            str += '<div class="u-searchResult-page" style="">' +
                '<img src="/Administration/content/images/pic-zwtp.png" width="167" height="124">' +
                '<p class="u-searchResult-title">您还没有上传图片</p>' +
                '</div>';
            $("#noSearchMaPicture .primary-color").html(_mp.SearchWords);
            $("#noSearchMaPicture").hide();
        }
        else {
            $("#noSearchMaPicture .primary-color").html(_mp.SearchWords);
            $("#noSearchMaPicture").show();
        }
    }
    $("#pictureList").html(str);
    $("#pictureList").show();


    initPicbox();
    initImgClick();
    buildPluginPager(_mp, "material_pager", data.pageCount, data.itemCount, _loadMaterialImg, isfresh);
}

function searchMatrialTitle() {
    _mp.PageNumber = 1;
    _loadMaterialImg(true);
}

function searchMatrrialTitle(e) {
    var e = e || window.event;
    if (e.keyCode == 13) {
        _mp.PageNumber = 1;
        _loadMaterialImg(true);
    }
}

/*------------------------------------分类树点击事件 ------------------------------*/
function clickUploadTree() {
    var categoryId = $(this).attr("categoryid");
    var categoryName = $(this).attr("name");
    var $uploadSpan = $('span[group=span_selectedCategory]', '#u-upload-pic');
    $uploadSpan.html(categoryName);
    $uploadSpan.attr("categoryId", categoryId);
    $uploadSpan.parent().click();
}

function AddCategoryPluginDialog() {
    $('span[group=span_selectedCategory]', '#add-pic-classify').attr('categoryid', 0).text('全部分类');
    $('#input_addPluginCategoryName').val('');
    $('#input_addPluginCategoryName').parent().removeClass('has-error')
    $('#input_addPluginCategoryName').next().hide();
    var addButton = $("a[name=a_submit]", "#add-pic-classify");
    //提交按钮灰态
    if (!addButton.hasClass("disabled")) {
        addButton.addClass("disabled");
    }
    $("#add-pic-classify").modal("show");
}

function clickTreeSetInputValue(container) {//点击树给输入框赋值
    var li = $(this);//
    container = container == "plugin_addCategory" ? "add-pic-classify" : "edit-pic-classify";
    if (container == "edit-pic-classify") {//如果是编辑分类的情况, 那么不运行选择自己和自己的下级作为上级分类
        var ids = "," + _PluginTree_Parms.editTree.GetChildrenIds(_PluginTree_Parms.editingCategory.ID)
        if (ids.indexOf(',' + li.attr('categoryid') + ',') > -1) {
            alert('不能选择自己和自己的下级分类');
            return;
        }
        var levelcount = _PluginTree_Parms.editTree.GetAncestorsLevels(li.attr('categoryid')) + _PluginTree_Parms.editTree.GetChidrenLevels(_PluginTree_Parms.editingCategory.ID) - 1;
        if (levelcount > 4) {
            alert('不能把当前分类移到目标分类下, 系统只支持四级分类(包括根分类"全部分类")');
            return;
        }
    }
    $('span[group=span_selectedCategory]', '#' + container).attr('categoryid', li.attr('categoryid')).html(li.attr('name'));
    $('input', '#' + container).click();
}

function clickCallback(checked) {
    var li = $(this);
    var txt = $('span[group=span_selectedCategory]', '#move-classify');
    txt.html(li.attr("name"));
    txt.attr("categoryid", li.attr("categoryid"));
    txt.click();
}

function batchclickCallback(checked) {
    var li = $(this);
    var txt = $('span[group=span_selectedCategory]', '#batchmove-classify');
    txt.html(li.attr("name"));
    txt.attr("categoryid", li.attr("categoryid"));
    txt.click();
}

function showPluginEdit() {//左侧树点击编辑
    $('#input_editPluginCategoryName').parent().removeClass('has-error')
    $('#input_editPluginCategoryName').next().hide();
    _PluginTree_Parms.editingCategory.ID = $(this).attr("categoryid");
    var name = $(this).attr("name");
    $("input", "#edit-pic-classify").val(name);
    var parentLi = $(this).parents("li:first");
    var pid = parentLi.length == 0 ? 0 : parentLi.attr('categoryid');
    var pname = parentLi.length == 0 ? '全部分类' : parentLi.attr('name');
    $('span[group=span_selectedCategory]', '#edit-pic-classify').attr('categoryid', pid).html(pname);
    $("a[name=a_submit]", "#edit-pic-classify").removeClass("disabled");
    $("#edit-pic-classify").modal("show");

    //$('#editCategoryName').parent().removeClass('has-error')
    //$('#editCategoryName').next().hide();
}

function showPluginDelete() {
    _PluginTree_Parms.deletingCategory.ID = $(this).attr("categoryid");
    //alert(_PluginTree_Parms.deletingCategory.ID)
    $("#modal-delete-classfly").modal();
}
/*------------------------------------分类树操作 ------------------------------*/
function ajaxdelPluginCategory(btn) {
    //alert(_PluginTree_Parms.leftTree.GetChildrenIds(_PluginTree_Parms.deletingCategory.ID));
    $.post('/admin/picture/ajaxdeleteCategory', { ids: _PluginTree_Parms.leftTree.GetChildrenIds(_PluginTree_Parms.deletingCategory.ID) }, function (data) {
        //$(btn).removeClass("disabled");
        //$("#deleteCategory").modal("hide");

        if (data.IsSuccess) {
            $("#modal-delete-classfly").modal("hide");
            showSuccess('删除成功');
            LoadCategoryJson();
            if (_mp.currentLeftTreeCategoryid == _PluginTree_Parms.deletingCategory.ID)//如果当前选中的分类被删掉. 就应该点中"全部分类"
            {
                window.setTimeout(function () {
                    $('li[categoryid=0]', '#plugin_leftTree').click();
                })
            }
        } else {
            showFailure(data.Message);
        }
    }, "json")
}

function ajaxaddPluginCategory(btn) {
    var newName = $.trim($('#input_addPluginCategoryName').val());
    if (newName == "") {
        $('#input_addPluginCategoryName').parent().addClass('has-error');
        $('#input_addPluginCategoryName').next().text("请输入分类名");
        $('#input_addPluginCategoryName').next().show();
        return;
    }
    if (newName == "未分类") {
        $('#input_addPluginCategoryName').parent().addClass('has-error');
        $('#input_addPluginCategoryName').next().text("分类名不合法");
        $('#input_addPluginCategoryName').next().show();
        return;
    }
    if (newName.match("((?=[\x21-\x7e]+)[^A-Za-z0-9])")) {
        $('#input_addPluginCategoryName').parent().addClass('has-error');
        $('#input_addPluginCategoryName').next().text("分类名存在非法字符，请重新输入");
        $('#input_addPluginCategoryName').next().show();
        return;
    }
    if ($('li[categoryid][name="' + newName + '"]', '#plugin_addCategory').length > 0) {
        $('#input_addPluginCategoryName').parent().addClass('has-error');
        $('#input_addPluginCategoryName').next().text("已存在相同的分类名称");
        $('#input_addPluginCategoryName').next().show();
        return;
    }

    $(btn).addClass("disabled");
    var span = $('span[group=span_selectedCategory]', '#add-pic-classify');
    _PluginTree_Parms.addingCategory.PID = span.attr('categoryid');
    _PluginTree_Parms.addingCategory.Name = $.trim($('#input_addPluginCategoryName').val());
    _PluginTree_Parms.addingCategory.displayorder = $("li[pid=" + _PluginTree_Parms.addingCategory.PID + "]", '#add-pic-classify').length + 1;
    $.post('/admin/picture/ajaxAddCategory', _PluginTree_Parms.addingCategory, function (data) {
        $(btn).removeClass("disabled");
        $("#add-pic-classify").modal("hide");
        if (data.IsSuccess) {
            showSuccess('添加成功');
            LoadCategoryJson();
        } else {
            showFailure(data.Message);
        }
    }, "json")
}

function ajaxeditPluginCategory(btn) {

    var newName = $.trim($("input", "#edit-pic-classify").val());
    if (newName == "未分类") {
        showFailure("分类名不合法");
        return;
    }
    if ($('li[categoryid!=' + _PluginTree_Parms.editingCategory.ID + '][name="' + newName + '"]', '#plugin_editCategory').length > 0) {
        $('#input_editPluginCategoryName').parent().addClass('has-error');
        $('#input_editPluginCategoryName').next().show();
        return;
    }

    $(btn).addClass("disabled")
    var span = $('span[group=span_selectedCategory]', '#edit-pic-classify');
    _PluginTree_Parms.editingCategory.PID = span.attr('categoryid');
    _PluginTree_Parms.editingCategory.Name = newName;
    $.post('/admin/picture/ajaxeditCategory', _PluginTree_Parms.editingCategory, function (data) {
        $(btn).removeClass("disabled");
        if (data.IsSuccess) {
            $("#edit-pic-classify").modal("hide");
            showSuccess('编辑成功');
            LoadCategoryJson();
        } else {
            showFailure(data.Message);
        }
    }, "json")
}

function searchButtonTitle() {
    _mp.PageIndex = 0;
    ShowPluginDataTable(true);
}

function searchTitle(e) {
    var key = window.event ? e.keyCode : e.which;
    if (key == 13) {
        _mp.PageIndex = 0;
        ShowPluginDataTable(true);
    }
}

var _pluginParam = {
    PageIndex: 0,
    PictureTitle: "",
    PageSize: 24,
    totalpage: 0,
    CategoryId: 0,
    OrderField: "CreateDate",
    OrderType: "DESC"
}

//加载右侧图片列表
function loadPluginDataTable() {
    var li = $(this);//
    _pluginParam.currentLeftTreeCategoryid = categoryid;
    var categoryid = li.attr('categoryid');
    _pluginParam.CategoryId = categoryid;
    _pluginParam.PageIndex = 0;
    li.parents(".m-tree").find(".u-tree-item-inner").removeClass("current");
    li.find(".u-tree-item-inner:first").addClass("current");
    var currentCategory = li.attr("name");
    if (currentCategory.length > 11) {
        currentCategory = currentCategory.substring(0, 11) + "..."
    }
    $("#imgcategoryName").html(currentCategory);
    $("#firstOperate").removeClass("f-hide");
    $("#secondOperate").addClass("f-hide");
    ShowPluginDataTable(true);
    //$("#pic_pager li:eq(2)").click();
    return false;
}

function ShowPluginDataTable(isfresh) {

    _pluginParam.PictureTitle = $.trim($("#firstOperate #pictureTitle").val());
    $("#rightLoading").removeClass("f-hide");
    $.post('/admin/picture/GetPictureListV2', _pluginParam, function (data) {
        $("#imgCount").html("(" + data.totalCount + ")");
        $("#rightLoading").addClass("f-hide");
        buildPluginDataTable(data, isfresh);
        var hasSelected = $("#mypicture01 .hasSelected");
        if (!hasSelected.hasClass("f-hide")) {
            hasSelected.addClass("f-hide");
        }
        quitOperate();

    }, "json")
    return false;
}

function buildPluginDataTable(data, isfresh) {
    var str = "";
    for (var i = 0; i < data.data.length; i++) {
        var row = data.data[i];
        str += "<li class=\"picbox-content-item\"data-id=\"" + row.PictureId + "\"category=\"" + row.CategoryId + "\"data-title=\"" + row.Name + "\"data-mineType=\"" + row.MimeType + "\"data-url=\"" + row.Url + "\"data-picThumUrl=\"" + row.ThumbnailUrl + 
            "\"data-width=\"" + row.Width + 
            "\"data-height=\"" + row.Height +
            "\">" +
            "<i class=\"icon icon-pic-checked picbox-pic-checked\"></i>" +
            "<div class=\"picbox-pic\">" +
            //"   <span onclick=\"DialogShowXiuXiu('" + row.Url + "')\"  class=\"u-picmagic lzprompt-bottom lz-hidden\" data-lztitle=\"图片加工\">" +
            //"        <i class=\"icon icon-magic hewi14\"></i>" +
            //"    </span >" +
        /*    "   <span onclick=\"DialogShowToastUI('" + row.Url + "')\"  class=\"u-picmagic lzprompt-bottom lz-hidden\" data-lztitle=\"编辑图片\">" +
            "        <i class=\"icon icon-magic hewi14\"></i>" +
            "    </span >" +*/
            "<span onclick=\"DialogShowToastUI('" + row.Url + "')\" class=\"u-picmagic\"> 编辑</span>" +
            " <div class=\"picbox-pic-in\"><img id=\"pic_" + row.PictureId + "\" src=\"" + row.ThumbnailUrl + "\" onerror = \"javascript:this.src='/Administration/Content/images/errorImage.png'\"/></div>" +
            " <ul class=\"picbox-view clearfix\">" +
            "<li>" +
            "<a class=\"icon icon-see-current lzprompt-bottom lz-hidden\" data-title=\"" + row.Name + "\"data-size=\"" + row.PicSize + "\" data-url=\"" + row.Url + "\" data-lztitle=\"预览\"></a>" +
            "</li><li>" +
            "<a href=\"#\" data-toggle=\"modal\"data-id=\"" + row.PictureId + "\" category=\"" + row.CategoryId + "\"class=\"icon icon-move-info lzprompt-bottom lz-hidden\" data-lztitle=\"移动\"></a>" +
            "</li>" +
            //"<li> <a href=\"javascript:void(0)\" onclick=\"replacePictureDialog(" + row.PictureId + ")\" data-toggle=\"modal\" class=\"icon icon-synchronize lzprompt-bottom\" data-lztitle=\"更换\"></a> </li> " +
            "<li>" +
            "<a href=\"#\" data-toggle=\"modal\"data-id=\"" + row.PictureId + "\" class=\"icon icon-delete lzprompt-bottom lz-hidden\" data-lztitle=\"删除\"></a>" +
            "</li>" +
            "</ul></div>" +
            "<div class=\"picbox-picinfo pic-edit\" title=\"" + row.Name + "\"><input type=\"text\"data-id=\"" + row.PictureId + "\" onblur=\"editTitle(this)\" value=\"" + row.Name + "\" class=\"form-control\"> </div>" +
            "<input type=\"hidden\" data-picRealUrl=\"" + row.Url + "\">" +
            " </li>";
    }
    if (data.data.length == 0) {
        $("#pictureCol .picbox-content").hide();
        if (_pluginParam.PictureTitle == "") {
            $("#pictureCol #noPicture").show();
            $("#pictureCol #noSearchPicture").hide();
        } else {
            $("#pictureCol #noPicture").hide();
            $("#pictureCol #noSearchPicture").show();
            $("#noSearchPicture .primary-color").html(_pluginParam.PictureTitle);
        }
        $("#pic_pager").hide();
        return;
    } else {
        $("#pictureCol .picbox-content").show();
        $("#pictureCol #noPicture").hide();
        $("#pictureCol #noSearchPicture").hide();
    }

    $("#pictureCol .picbox-content-list").html(str);
    initImgClick();
    initPicbox();
    initMove();
    initOrderType();
    initDelete();
    buildPluginPager(_pluginParam, "pic_pager", data.totalPage, data.totalCount, ShowPluginDataTable, isfresh);
    //inittip();
    //$("#pager").show();
}

function editTitle(tag) {
    var title = $(tag).val();
    if (title.length > 20) {
        title = title.substring(0, 19);
        $(tag).val(title);
    }
    var oldTitle = $(tag).parent().attr("title");
    var pictureId = $(tag).attr("data-id");
    $.post("/admin/picture/AjaxUpdatePictureTitle", { picId: pictureId, title: title }, function (data) {
        if (data.IsSuccess) {
            $(tag).parent().attr("title", title);
        } else {
            $(tag).html(oldTitle);
        }
    })
}

function editMaterialTitle(tag) {
    var title = $(tag).val();
    if (title.length > 20) {
        title = title.substring(0, 19);
        $(tag).val(title);
    }
    var oldTitle = $(tag).parent().attr("title");
    var pictureId = $(tag).attr("data-id");
    $.post("/admin/picture/AjaxUpdateMatrialPictureTitle", { picId: pictureId, title: title }, function (data) {
        if (data.IsSuccess) {
            $(tag).parent().attr("title", title);
        } else {
            $(tag).html(oldTitle);
        }
    })
}

// 选择图片时触发的事件
function onSelectPicForBtn(liLength) {
    var btn = $('#modal_importImageBtn');
    if (liLength === 0) {
        btn.addClass('disabled')
    } else {
        btn.removeClass('disabled')
    }
}


//初始化图片点击
function initImgClick() {
    $(".picbox-content-list .picbox-pic .picbox-pic-in").unbind("click").click(function () {
        var item = $(this).parent().parent(".picbox-content-item");
        var $ul = $(this).parents(".picbox-content-list");
        var liLength = $ul.find("li.current").length;
        if (_PluginTree_Parms.maxSelectNum === 1) {
            if (liLength === _PluginTree_Parms.maxSelectNum && !$(this).closest("li").hasClass("current")) {
                $ul.find("li.current").removeClass("current");
                $(this).closest("li").addClass("current");
                return false;
            }
        }
        item.toggleClass("current");
        liLength = $ul.find("li.current").length;
        if (liLength > 0) {
            $("#firstOperate").addClass("f-hide");
            $("#secondOperate").removeClass("f-hide");
            $(".tabPanel.active").find(".hasSelected").removeClass("f-hide");
            $(".tabPanel.active").find(".hasSelected .text-primary").html(liLength);
        } else {
            $("#firstOperate").removeClass("f-hide");
            $("#secondOperate").addClass("f-hide");
            $(".tabPanel.active").find(".hasSelected").addClass("f-hide");
        }
        if (onSelectPicForBtn) {
            onSelectPicForBtn(liLength)
        };
        return false;
    });
}

function initPicbox() {
    // 预览大图
    $(".picbox-modal").hide();
    $(".picbox-modal-close").unbind("click").click(function () {
        $("#big-pocture img").attr("src", "");
        $(".picbox-modal").hide();
    });
    $(".picbox-pic .picbox-view .icon-see-current").unbind("click").click(function () {
        var tag = $(this);
        $("#picTitle").html(tag.attr("data-title"));
        var tabId = $(".tab-content .tabPanel.active").attr("id");
        var picId = tag.parents(".picbox-content-item").attr("data-id");
        $.post('/admin/picture/GetCategoryNameByPicId', { picId: picId }, function (data) {
            $("#picCategory span").html(data.data);
        }, "json");

        $("#big-pocture img").attr("onerror", "javascript:this.src='/Administration/Content/images/errorImage.png'").attr("src", $(this).attr("data-url"));
        $("#big-pocture img").load(function () {
            var imgWidth = $('#big-pocture img')[0].naturalWidth;
            var imgHeight = $('#big-pocture img')[0].naturalHeight;
            $("#picSize span").html(imgWidth + "*" + imgHeight);
        });
        $(".picbox-modal").fadeIn();
    });
}

/*------------------------------------图片操作 ------------------------------*/

function initMove() {
    $(".picbox-pic .picbox-view .icon-move-info").unbind("click").click(function () {
        var $currentli = $("#plugin_leftTree .u-tree-item-inner.current").parent();
        var $uploadSpan = $('span[group=span_selectedCategory]', '#move-classify');
        $uploadSpan.attr("categoryid", $currentli.attr("categoryid"));
        $uploadSpan.html($currentli.attr("name"));
        $uploadSpan.attr("imgId", $(this).attr("data-id"));
        $("#move-classify").modal("show");
    });
}

function batchMove() {
    var $currentli = $("#plugin_leftTree .u-tree-item-inner.current").parent();
    var $uploadSpan = $('span[group=span_selectedCategory]', '#batchmove-classify');
    $uploadSpan.attr("categoryid", $currentli.attr("categoryid"));
    $uploadSpan.html($currentli.attr("name"));
    var currentItem = $("#pictureCol .picbox-content-item.current");

    var idStr = "";
    currentItem.each(function () {
        id = $(this).attr("data-id");
        idStr += id + ",";
    });

    $uploadSpan.attr("imgId", idStr);
    $("#batchmove-classify").modal("show");
}

function initDelete() {
    $(".picbox-pic .picbox-view .icon-delete").unbind("click").click(function () {
        var categoryId = $(this).attr("data-id");
        $("#deleteImg").val(categoryId);
        $("#modal-deletepic").modal("show");
    });
}

function batchDelete() {
    var currentItem = $("#pictureCol .picbox-content-item.current");
    var idStr = "";
    currentItem.each(function () {
        id = $(this).attr("data-id");
        idStr += id + ",";
    });
    $("#batchdeleteImg").val(idStr);
    $("#modal-batchdeletepic").modal("show");
}

function delImgConfirm() {
    var categoryId = $("#deleteImg").val();
    $.post('/admin/picture/ajaxdeletePicture', { id: categoryId }, function () {
        $("#modal-deletepic").modal('hide');
        showSuccess('删除成功');
        ShowPluginDataTable(true);
    }, "json");
}

function batchdelImgConfirm() {
    var categoryIds = $("#batchdeleteImg").val();
    $.post('/admin/picture/ajaxdeletePicture', { id: categoryIds }, function () {
        $("#modal-batchdeletepic").modal('hide');
        showSuccess('删除成功');
        ShowPluginDataTable(true);
    }, "json");
}

function quitOperate() {
    $("#pictureCol .picbox-content-item.current").removeClass("current");
    $("#pictureList .picbox-content-item.current").removeClass("current");
    $("#firstOperate").removeClass("f-hide");
    $("#secondOperate").addClass("f-hide");
    $('#modal_importImageBtn').addClass('disabled');
}

function moveComfirm() {
    var $uploadSpan = $('span[group=span_selectedCategory]', '#move-classify');
    $.post('/admin/picture/ajaxMovePictures', {
        id: $uploadSpan.attr("imgId"),
        targetCategoryId: $uploadSpan.attr("categoryid")
    }, function () {
        $("#move-classify").modal('hide');
        showSuccess('移动成功');
        ShowPluginDataTable(true);
        return;
    }, "json");
}

function batchMoveComfirm() {
    var $uploadSpan = $('span[group=span_selectedCategory]', '#batchmove-classify');
    $.post('/admin/picture/ajaxBatchMovePictures', {
        ids: $uploadSpan.attr("imgId"),
        targetCategoryId: $uploadSpan.attr("categoryid")
    }, function () {
        $("#batchmove-classify").modal('hide');
        showSuccess('移动成功');
        ShowPluginDataTable(true);
        return;
    }, "json");
}

/*------------------------------------初始化分页及排序 ------------------------------*/
//初始化排序
function initOrderType() {
    $(".pic-paixu-btn.icon-xu-down-info").unbind("click").click(function () {
        $(this).toggleClass("icon-rotate-180");
        var orderType = "DESC";
        if ($("a.icon-rotate-180").length > 0) {
            orderType = "ESC";
        }
        _pluginParam.OrderType = orderType;
        _pluginParam.PageIndex = 0;
        ShowPluginDataTable(true);
    });
    $("#orderField li").unbind("click").click(function () {
        var orderField = $(this).attr("data-name");
        var text = $(this).text();
        $("#orderField").find("a").removeClass("current");
        $(this).find("a").addClass("current");
        _pluginParam.OrderField = orderField;
        $("#orderTypeSpan").html(text);
        ShowPluginDataTable(true);
    });
}

function buildPluginPager(param, tag, totalPage, totalCount, callBack, isfresh) {
    var $div = $("#" + tag);
    param.totalpage = totalPage;
    if (isfresh) {
        $("#" + tag + " .firstPage").html("1");
        $("#" + tag + " .secondPage").html("2");
        $("#" + tag + " .thirdPage").html("3");
        $("#" + tag + " .forthPage").html("4");
        $("#" + tag + " .fivthPage").html("5");
        $("#" + tag + " a").removeClass("current");
        $("#" + tag + " .firstPage").addClass("current");
    }
    if (totalPage == 1 || totalPage == 0) {
        $div.hide();
        return false;
    } else if (totalPage <= 5 && totalPage > 1) {
        $div.find("li:lt(" + (totalPage + 2) + "):gt(1)").show();
        $div.find("li:lt(2)").hide();
        $div.find("li:gt(" + (totalPage + 1) + ")").hide();
        $div.find("li").unbind("click").click(function () {
            var pageIndex = $(this).find("a").html();
            $div.find("a").removeClass("current");
            $(this).find("a").addClass("current");
            param.PageIndex = pageIndex - 1;
            param.PageNumber = pageIndex;
            callBack(false);
        });
    } else {
        $div.find("li").show();
        $div.find("li").unbind("click").click(function () {
            var clickId = $(this).find("a");
            if (clickId.hasClass("goFirst")) {
                param.PageIndex = 0;
                param.PageNumber = 1;
                $("#" + tag + " .firstPage").html("1");
                $("#" + tag + " .secondPage").html("2");
                $("#" + tag + " .thirdPage").html("3");
                $("#" + tag + " .forthPage").html("4");
                $("#" + tag + " .fivthPage").html("5");
                $div.find("a.current").removeClass("current");
                $("#" + tag + " .firstPage").addClass("current");
            } else if (clickId.hasClass("goPre")) {
                var pageIndex = param.PageIndex + 1;
                if (pageIndex > 3 && pageIndex <= totalPage - 4) {
                    $("#" + tag + " .firstPage").html(pageIndex - 3);
                    $("#" + tag + " .secondPage").html(pageIndex - 2);
                    $("#" + tag + " .thirdPage").html(pageIndex - 1);
                    $("#" + tag + " .forthPage").html(pageIndex);
                    $("#" + tag + " .fivthPage").html(pageIndex + 1);
                    $div.find("a.current").removeClass("current");
                    $("#" + tag + " .thirdPage").addClass("current");
                } else {
                    if ((pageIndex > 1 && pageIndex <= 3) || pageIndex > totalPage - 4) {
                        var $current = $div.find("a.current");
                        $current.removeClass("current");
                        $current.parent().prev().find("a").addClass("current");
                    } else {
                        return false;
                    }
                }
                param.PageIndex = param.PageIndex - 1;
                param.PageNumber = param.PageIndex;
            } else if (clickId.hasClass("goNext")) {
                var pageIndex = param.PageIndex + 1;
                if (pageIndex < totalPage - 2 && pageIndex >= 5) {
                    $("#" + tag + " .firstPage").html(pageIndex - 1);
                    $("#" + tag + " .secondPage").html(pageIndex);
                    $("#" + tag + " .thirdPage").html(pageIndex + 1);
                    $("#" + tag + " .forthPage").html(pageIndex + 2);
                    $("#" + tag + " .fivthPage").html(pageIndex + 3);
                    $div.find("a.current").removeClass("current");
                    $("#" + tag + " .thirdPage").addClass("current");
                } else {
                    if ((pageIndex >= totalPage - 2 && pageIndex < totalPage) || pageIndex < 5) {
                        var $current = $div.find("a.current");
                        $current.removeClass("current");
                        $current.parent().next().find("a").addClass("current");
                    } else {
                        return false;
                    }
                }
                param.PageIndex = pageIndex;
                param.PageNumber = pageIndex - 1;
            } else if (clickId.hasClass("goEnd")) {
                param.PageIndex = totalPage - 1;
                param.PageNumber = totalPage;
                $("#" + tag + " .firstPage").html(totalPage - 4);
                $("#" + tag + " .secondPage").html(totalPage - 3);
                $("#" + tag + " .thirdPage").html(totalPage - 2);
                $("#" + tag + " .forthPage").html(totalPage - 1);
                $("#" + tag + " .fivthPage").html(totalPage);
                $div.find("a.current").removeClass("current");
                $div.find(".fivthPage").addClass("current");
            } else {
                var pageNumber = parseInt($(this).find("a").html());
                param.PageIndex = pageNumber - 1;
                param.PageNumber = pageNumber;
                if (pageNumber <= 2 || pageNumber > totalPage - 2) {
                    if (pageNumber <= 2) {
                        $("#" + tag + " .firstPage").html("1");
                        $("#" + tag + " .secondPage").html("2");
                        $("#" + tag + " .thirdPage").html("3");
                        $("#" + tag + " .forthPage").html("4");
                        $("#" + tag + " .fivthPage").html("5");
                    } else {
                        $("#" + tag + " .firstPage").html(totalPage - 4);
                        $("#" + tag + " .secondPage").html(totalPage - 3);
                        $("#" + tag + " .thirdPage").html(totalPage - 2);
                        $("#" + tag + " .forthPage").html(totalPage - 1);
                        $("#" + tag + " .fivthPage").html(totalPage);
                    }
                    $div.find("a.current").removeClass("current");
                    $(this).find("a").addClass("current");
                } else {
                    $("#" + tag + " .firstPage").html(pageNumber - 2);
                    $("#" + tag + " .secondPage").html(pageNumber - 1);
                    $("#" + tag + " .thirdPage").html(pageNumber);
                    $("#" + tag + " .forthPage").html(pageNumber + 1);
                    $("#" + tag + " .fivthPage").html(pageNumber + 2);
                    $div.find("a.current").removeClass("current");
                    $("#" + tag + " .thirdPage").addClass("current")
                }
            }
            callBack(false);
        });
    }
    $div.show();
}


function dealSize(filesize) {
    var size = filesize / 1024;
    if (size >= 1024) {
        size = (Math.round((size / 1024) * 10) / 10) + "mb";
    } else {
        size = (Math.round((size) * 10) / 10) + "kb";
    }
    return size;
}


/*------------------------------------上传图片块 ------------------------------*/

$(function () {
    var BASE_URL = window.applicationPath === "" ? "" : window.applicationPath || "../../..";
    //最大附件大小
    var MAX_SIZE = 1024 * 1024 * 10;
    var thumbnailWidth = 104, thumbnailHeight = 104;
    //缓冲区大小
    var BUFFER_SIZE = MAX_SIZE;
    var maxPicTip = false;
    var maxSizeTip = false;
    var uploader;
    setTimeout(function () {
        uploader = WebUploader.create({

            // swf文件路径
            swf: BASE_URL + '/Administration/Content/_v2/plugins/webuploader/Uploader.swf',

            // 文件接收服务端。
            server: BASE_URL + '/Admin/Picture/BatchUpload',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#addPictureAgain',
            accept: {
                extensions: 'gif,jpg,jpeg,bmp,png',
            },
            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            //是否使用分块上传
            chunked: false,
            //缓冲区大小
            chunkSize: BUFFER_SIZE,
            //同时开几个线程
            threads: 1,
            //验证单个文件大小是否超出限制, 超出则不允许加入队列。
            fileSingleSizeLimit: MAX_SIZE,
            //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
            duplicate: true,
            compress: {
                // 单位字节，如果图片大小小于此值，不会采用压缩。
                compressSize: MAX_SIZE
            },
            formData: {
                //上传至文件分类的Id
                categoryId: 0,
                waterPos: "0",
                waterUrl: "",
            }

        });
        window.webUploaderPlugin = uploader;
        var $list = $("#filelist");
        var jsonData = [];
        WebUploader.FinalJsonData = jsonData;
        uploader.on('beforeFileQueued', function (file) {
            $("#addPictureAgain").removeClass("disabled");
            if (file.size > MAX_SIZE && !maxSizeTip) {
                showWarning("单个文件不允许超过10M");
                maxSizeTip = true;
            }
        });
        uploader.on("ready", function () {
            $("#addPictureAgain div").eq(1).css({ "width": "130", height: "34" });
            $("#addPictureAgain input[type=file]").hide();
            $("#addPictureAgain").click(function () {
                $("#addPictureAgain").addClass("disabled");
                setTimeout(function () {
                    $("#addPictureAgain").removeClass("disabled");
                }, 3000)
            });
            $('#addPictureAgain input[type=file]').attr('accept', 'image/*');
        });
        uploader.on('filesQueued', function (file) {
            maxPicTip = false;
            maxSizeTip = false;
        });
        //加入上传队列事件
        uploader.on('fileQueued', function (file) {
            if (!$("#u-upload-pic").is(":visible")) {
                $("#u-upload-pic").modal('show');
            }
            $("#nouploadPicture").hide();
            var fileStr = _getUploadStr(file);
            $("#uploadList").append(fileStr);
            var $li = $('#' + file.id, "#uploadList");
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    return;
                }
                $li.find("img").attr('src', src);
            }, thumbnailWidth, thumbnailHeight);
            //只提示一次
            if ($("#uploadList .picbox-content-item").length > 20 && window.uploadStyle == "single") {
                $li.remove();
                uploader.removeFile(file.id, true);
                if (!maxPicTip) {
                    showWarning("您一次最多上传20张图片");
                    maxPicTip = true;
                }
            }

            if (window.uploadStyle == 'folder' && $("#thunPics li").length > 80) {
                $li.remove();
                uploader.removeFile(file.id, true);
            }

            $("#uploadList .formpic-edit-link").unbind("click").click(function () {
                var $item = $(this).parents(".picbox-content-item");
                var id = $item.attr("id");
                $item.remove();
                uploader.removeFile(id, true);
                if ($("#uploadList li").length == 0) {
                    $("#nouploadPicture").show();
                }
            });
        });

        function _getUploadStr(file) {
            var fileName = file.name;
            var str = "<li class=\"picbox-content-item\" filesize='" + file.size + "' id=\"" + file.id + "\">" +
                "<div class=\"picbox-pic\">" +
                "<div class=\"picbox-pic-in\">" +
                "<div class=\"u-formpic-edit f-relative\">" +
                "<div class=\"formpic-edit-in\">" +
                "<a name='adeletepicture' class=\"formpic-edit-link f-mt18\"><span class=\"icon icon-delete-white\"></span>删除</a>" +
                "</div></div>" +
                "<img src=\"\"></div>" +
                "<div class=\"m-picload-loadbar\" style=\"display:none\">" +
                "<span class=\"m-picload-num\"></span>" +
                "<span class=\"m-picload-text\" >上传中...</span>" +
                " </div></div>" +
                "<div class=\"picbox-picinfo\" style=\"word-break: break-all; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;\">" + fileName + "</div>" +
                "</li>";
            return str;
        }

        $('#uploadPicture').unbind("click").click(function () {
            var flag = false;
            var aDeletePics = [];
            var len = $("#uploadList>li").each(function () {
                if (parseInt($(this).attr('filesize')) > (3 * 1024 * 1024)) {
                    flag = true;
                    aDeletePics.push($('a[name=adeletepicture]', this));
                }
            }).length;

            if (!len)
                return;

            window.pluginUploadFolderToCategoryId
            var _do = function () {

                var categoryId = $('span[group=span_selectedCategory]', '#u-upload-pic').attr("categoryid");
                window.pluginUploadFolderToCategoryId = categoryId;
                uploader.options.formData.categoryId = categoryId;
                //开启上传事件
                uploader.upload();
                $("#uploadPicture").addClass("disabled");
                $("#uploadList .u-formpic-edit").addClass("f-hide");
                $("#uploadPicture").html("上传中");
            }
            if (flag) {
                $('#confirmCompressDialog').modal().find("span[name=spanZhang]").html(aDeletePics.length);
                $('#confirmCompressDialog a[name=asubmit]').off('click').click(function () {
                    $('#confirmCompressDialog').modal('hide');
                    _do();
                })
                $('#confirmCompressDialog a[name=acancel]').off('click').click(function () {
                    for (var i = 0; i < aDeletePics.length; i++) {
                        aDeletePics[i].click()
                    }
                    if (len > aDeletePics.length)
                        _do();
                })
            } else
                _do();
        });

        //更新进度条事件
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id, "#uploadList");
            $li.find(".m-picload-loadbar").show();
            $li.find(".m-picload-num").css("width", percentage * 100 + '%');
        });
        uploader.on('uploadSuccess', function (file, response) {
            var $li = $('#' + file.id, "#uploadList");
            $li.find(".m-picload-text").html("上传完成");
        });

        uploader.on('uploadError', function (file) {
            alert('上传失败');
        });

        uploader.on('uploadFinished', function (type) {
            $.getScript("/home/VersionControlJS");

            $("#u-upload-pic").modal("hide");
            $("#uploadPicture").removeClass("disabled");
            $("#uploadPicture").html("上传图片");
            showSuccess("上传成功");
            $("#uploadList li").remove();
            uploader.reset();
            ShowPluginDataTable(true);
            if (window.uploadStyle == "folder")
                LoadCategoryJson(window.pluginUploadFolderToCategoryId);
        });

        $("#selWaterImg").unbind("click").click(function () {
            $("#uploadWater").get(0).click();
        });
        $("#EmptyWater").click(function () {
            var formData = uploader.options.formData;
            formData.waterPos = "0";
            formData.waterUrl = "";
            $("#selectWater").html("设置水印");
            $(this).hide();
        });

        $("#waterNine li").click(function () {
            var dataPos = $(this).attr("data-pos");
            uploader.options.formData.waterPos = dataPos;
            $("#waterNine li").removeClass("current");
            $(this).addClass("current");
        });

        $("#waterImg a:last").click(function () {
            $("#waterImg img").attr("src", "");
            $("#waterImg").addClass("f-hide")
            $("#selWaterImg").removeClass("f-hide");
            $("#uploadWater").val("");
        });

        $("#selectWater").click(function () {
            var formData = uploader.options.formData;
            var waterPos = formData.waterPos;
            var waterUrl = formData.waterUrl;
            $("#waterNine li").removeClass("current");
            $("#waterNine li[data-pos='" + waterPos + "']").addClass("current");
            if (waterUrl == "") {
                $("#waterImg").addClass("f-hide");
                $("#selWaterImg").removeClass("f-hide");
            } else {
                $("#selWaterImg").addClass("f-hide");
                $("#waterImg").removeClass("f-hide")
            }
            $("#picset-watermark").modal("show");
        });
        $("#uploadWater").change(function () {
            var url = "/admin/picture/UploadWaterPic";
            var ajax_option = {
                url: url,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data.IsSuccess) {
                        var url = data.url;
                        uploader.options.formData.waterUrl = url;
                        var file = document.getElementById("uploadWater").files[0];
                        var img = document.createElement("img");
                        img.classList.add("obj");
                        img.file = file;
                        $("#waterImg img").remove();
                        $("#waterImg").append(img);
                        $("#selWaterImg").addClass("f-hide");
                        $("#waterImg").removeClass("f-hide")
                        var reader = new FileReader();
                        reader.onload = (function (aImg) {
                            return function (e) {
                                aImg.src = e.target.result;
                            };
                        })(img);
                        reader.readAsDataURL(file);
                        $("#confirmWater").removeClass("disabled");
                        $("#confirmWater").bind("click", function () {
                            var waterPos = $("#waterNine li.current").attr("data-pos");
                            uploader.options.formData.waterPos = waterPos;
                            $("#picset-watermark").modal("hide");
                            $("#uploadWater").val("");
                            $("#selectWater").html("修改水印");
                            $("#EmptyWater").show();
                        });
                    } else {
                        $("#confirmWater").addClass("disabled");
                        $("#confirmWater").unbind("click");
                    }
                }
            }
            $('#waterForm').ajaxSubmit(ajax_option);
        });
        //将byes格式化显示
        function renderSize(value, p, record) {
            if (null == value || value == '') {
                return "0 B";
            }
            var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
            var index = 0;

            var srcsize = parseFloat(value);
            var quotient = srcsize;
            while (quotient >= 1000) {
                index += 1;
                quotient = quotient / 1024;
            }
            return roundFun(quotient, 2) + unitArr[index];
        }
        //处理小数点
        function roundFun(numberRound, roundDigit) {
            if (numberRound >= 0) {
                var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
                return tempNumber;
            } else {
                numberRound1 = -numberRound
                var tempNumber = parseInt((numberRound1 * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
                return -tempNumber;
            }
        }
        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
            return currentdate;
        }
    }, 1000)
});


function DialogShowXiuXiu(url) {
    url = url.substr(0, 4).toLowerCase() == "http" ? url : ("https:" + url);

    var dialoghtml =
        "<div class=\"m-modal m-modal-large modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" id=\"modal-pictureDialog-xiupic\" style=\";z-index: 1310;\">" +
        "    <div class=\"modal- dialog\" style=\"width: 940px; transform: none; position: relative; margin:100px auto 0 auto;\">" +
        "        <div class=\"modal- content\">" +
        "            <div class=\"tab- pane active tabPanel\">" +
        "        <iframe id=\"xiuxiuFrame_pictureDialog\" frameborder=\"0\" height=\"566\" width=\"940\" style=\"border: none; margin: 0; \"></iframe>" +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";

    if ($('#modal-pictureDialog-xiupic').length > 0)
        $('#modal-pictureDialog-xiupic').remove();

    $(document.body).append(dialoghtml);

    $("#xiuxiuFrame_pictureDialog").attr("src", "/admin/map/Meitu?imgUrl=" + encodeURIComponent(url));
    $('#modal-pictureDialog-xiupic').modal("show");
}

// 点击“我的图片”里美化图片按钮
function DialogShowToastUI(url) {
    window.$.ToastUI.ImageEditorOnClick(
        url,
        function (res) {
            // 模拟查询全部分类
            $('#modal-mapdepot-pic li[categoryid="0"][pid="0"]').click(); 

        }
    )
}

function replacePictureDialog(id) {
    $('#modal-replacePicture').modal();
    $('a[name=aSubmit]', "#modal-replacePicture").off().click(function () {
        $('#BeReplacedPictureId', "#modal-replacePicture").val(id);
        $('#ReplacePictureFile', "#modal-replacePicture").click();

        $("#ReplacePictureFile", "#modal-replacePicture").off('change').on("change", function () {
            $('#modal-replacePicture').modal('hide');
            //if (uploading) {
            //    alert("文件正在上传中，请稍候");
            //    return false;
            //}
            $.ajax({
                url: "/admin/picture/replacePicture/" + id,
                type: 'POST',
                cache: false,
                data: new FormData($('#FormReplacePicture')[0]),
                processData: false,
                contentType: false,
                dataType: "json",
                beforeSend: function () {
                    //uploading = true;
                },
                success: function (data) {
                    var src = $('#pic_' + id)[0].src;
                    if (src.indexOf('?') > -1)
                        $('#pic_' + id)[0].src = src + "&refresh=" + Math.random();
                    else
                        $('#pic_' + id)[0].src = src + "?refresh=" + Math.random();
                    if (typeof showModalTips == "function")
                        showModalTips('替换成功')
                    else
                        showSuccess('替换成功');
                }
            });
        });
    });


}





//---------------------------------------------上传文件夹
$(function () {
    $.getScript("/home/VersionControlJS", function () {
        if (typeof CurrentWezhanVersion != "undefined" && CurrentWezhanVersion.LimitPicturesCount < 200)
            $('#addFolderPicture').hide();
    });
    if (!Browser.client.isWebkit) {
        $('#addFolderPicture').hide();
    }
    $('#addFolderPicture').click(function () { $('#pictureFolder').click() })

    $('#addPictureAgain').bind('click', function () {
        window.uploadStyle = "single";
    })

    $('#pictureFolder').change(function (e) {
        window.uploadStyle = "folder";

        var folderLevel = {};
        var maxLevel = 0;
        var imageTypeCount = 0;
        for (var i = 0; i < e.target.files.length; i++) {
            if (e.target.files[i].type.indexOf('image') == -1) {
                continue;
            }
            imageTypeCount++;
            var arr = e.target.files[i].webkitRelativePath.split('/')
            maxLevel = arr.length - 1 > maxLevel ? arr.length - 1 : maxLevel;
            if (arr.length > 1) {
                for (var j = 0; j < arr.length - 1; j++) {
                    if (!folderLevel[arr[j]]) {
                        folderLevel[arr[j]] = j + 1;
                    }
                }
            }
        }
        if (imageTypeCount == 0) {
            showPictureUploadErrorTips('当前文件夹没有任何图片');
            return;
        }
        if (imageTypeCount > 60) {
            showPictureUploadErrorTips('文件夹最多包含60张图片');
            return;
        }

        var nowLevel = _PluginTree_Parms.uploadTree.GetAncestorsLevels($('span[group=span_selectedCategory]', '#u-upload-pic').attr('categoryid'))
        if (nowLevel == 4) {
            $('#pictureFolder').val('')
            showWarning('当前层级(第4级)的分类下不支持上传文件夹');
            return;
        }
        var levelcount = nowLevel + maxLevel;
        if (levelcount > 4) {
            //showFailureModalTips('上传失败，当前文件夹层级超出限制（最多支持3层文件夹）'); 
            $('#divUploadFolderAsk').css('zIndex', 130050).modal().find('span[name=spanMsg]').text('当前最多支持' + (4 - nowLevel) + '层文件夹的上传，继续上传将不会上传超过' + (4 - nowLevel) + '层的文件夹，是否继续？')
            $('#divUploadFolderAsk').find('a[name=asubmit]').off('click').click(function () {
                var couldUploadLevel = 4 - nowLevel;
                for (var i = 0; i < e.target.files.length; i++) {
                    if (e.target.files[i].type.indexOf('image') == -1) {
                        continue;
                    }
                    var file = e.target.files[i];
                    if (file.webkitRelativePath.split('/').length - 1 <= couldUploadLevel)
                        window.webUploaderPlugin.addFiles(file);
                }

                $('#pictureFolder').val('')

            }).parent().find('a[name=acancel]').off('click').click(function () {
            })
        } else
            _do(e.target.files)

        function _do(files) {
            for (var i = 0; i < e.target.files.length; i++) {
                if (e.target.files[i].type.indexOf('image') == -1) {
                    continue;
                }
                var file = e.target.files[i];
                window.webUploaderPlugin.addFiles(file);
            }


            $('#pictureFolder').val('')
        }
    })
})
