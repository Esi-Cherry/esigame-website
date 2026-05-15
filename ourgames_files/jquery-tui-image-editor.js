(function ($, window) {


    var Iframe;
    var hasIframe;

    // 关闭destroy
    function closeIframe() {
        hasIframe = false;
        if (!Iframe) {
            Iframe[0].contentWindow.imageEditorDestroy();
        };
        
        $('body').find('#tui-image-editor').remove();
    }

    // click事件
    function onClickHandle(imgSrc, saveCallBack) {
       
        if (hasIframe) return;
        hasIframe = true;
        var IframeStr = '<div id="tui-image-editor"><div class="tui-image-editor-mark"></div><div class="tui-image-editor-inner-wrapper"><div class="tui-image-editor-top">图片编辑<div class="tui-image-editor-close"></div></div><div class="tui-image-editor-btm"><iframe src="/admin/map/Meitu" id="image-editor-iframe"></iframe></div></div></div>'

        // 插入节点
        var IframeHtml = $.parseHTML(IframeStr);
        Iframe = $(IframeHtml[0]).find('#image-editor-iframe');
        $('body').append(IframeHtml);

       
        $('.tui-image-editor-close').off('click').click(closeIframe);

        // Iframe 加载完毕
        Iframe.load(function () {

            Iframe[0].contentWindow.saveCallBack = saveCallBack;
            Iframe[0].contentWindow.closeIframe = closeIframe;
            // 初始化，加载图片
            Iframe[0].contentWindow.imageEditorInit(imgSrc)
        })

        
    }
    jQuery.ToastUI = {
            ImageEditorOnClick: onClickHandle,
            ImageEditorClose: function () {
                $('.tui-image-editor-close').click();
            },
            updateImage: function (filedata, successCb, errorCb) {
                //$('#smartLoading').removeClass('f-hide').css({
                //    'z-index': 2000,
                //    position: 'fixed'
                //})
                //var filedata = new FormData();
                //filedata.append('file', file);
                // console.log(file)
                $.ajax({
                    cache: false,
                    // url: "/admin/Picture/PastePictureUploadBase64",
                    url: "/Admin/Picture/BatchUpload",
                    type: 'post',
                    data: filedata,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.IsSuccess) {
                            successCb && successCb(res);
                            showSuccess('图片保存成功')
                        } else {
                            errorCb && errorCb(res);
                            // showFailure(res.Msg);

                            if (res.HavePermission === false) {
                                showFailure("上传图片失败, 您的图片数量已到达上限, 请升级系统版本")
                            } else {
                                showFailure(res.Message);
                            }
                        }

                        

                        //if (res.HavePermission === false) {
                        //    window.open('/Admin/home/upgradeversion');
                        //    errorCb && errorCb(res);
                        //} else {
                        //    successCb && successCb(res);
                        //    //$('#smartLoading').addClass('f-hide').removeAttr('style');
                        //    showSuccess('图片保存成功')
                        //}
                    },
                    error: function (res) {
                        //$('#smartLoading').addClass('f-hide').removeAttr('style');
                        errorCb && errorCb(res);
                        showFailure('图片保存失败')
                    }
                })
            }
        }
    
}(jQuery, window))