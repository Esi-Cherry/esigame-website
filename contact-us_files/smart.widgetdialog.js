
/**
 * jQuery扩展方法
 */


$.fn.extend({
    // 给当前添加选中样式，同胞元素移除选中样式
    siblingsSelect: function (className, jqSelect) {
        $(this).addClass(className).siblings(jqSelect).removeClass(className);
    }
});

/**
 * 视频生成弹窗
 * @param {string} triggerId 触发弹窗的按钮ID
 * @param {function} successCallback 确认按钮回调函数
 */
(function (win) {

    //var generateVideoDialog = $('#generateVideoDialog');
    //var generateVideoForm = $('#generateVideoForm');
    //generate-video-btn
    win.AiForGenerateVideo = {
        triggerId: '',
        isShow: false,
        isSupport: false,
        toVideoCount: {
            totle: 0,
            useTotle: 0
        },
        getBannerImgToVods: function (done) {
            var $this = this;

            $.ajax({
                url: "/AliVideo/GetBannerImgToVods",
                type: "GET",
                dataType: "json"
            }).done(function (res) {
                if (res.IsSuccess) {
                    $this.toVideoCount = { totle: res.Data.Totle, useTotle: res.Data.UseTotle };
                    $this.isShow = res.Data.IsShow && !res.Data.IsHide
                    $this.isSupport = res.Data.IsSupport
                }

                $this.computeToVideoCount();

                done && done()
            });
        },
        ableToVideo: function () {
            return this.computeToVideoCount() > 0
        },
        
        computeToVideoCount: function () {
            var toVideoCount = this.toVideoCount;
            var count = toVideoCount.totle - toVideoCount.useTotle;
            if (!toVideoCount) {
                count = 0
            } else {
                count = toVideoCount.totle - toVideoCount.useTotle;
            }


            $('#generateVideoDialog').find('.toVideoCount').text('仅支持生成' + count + '次');

            if (count > 0) {
                $("#generate-video-btn").removeClass('disabled');
                $('#generateVideoDialog').find('#gvimg, #gvprompt, #gvConfirm').removeClass('disabled');
            } else {
                $("#generate-video-btn").addClass('disabled');
                $('#generateVideoDialog').find('#gvimg, #gvprompt, #gvConfirm').addClass('disabled');
            }

           
            return count;
        },
        binkGenerateVideo: function (triggerId, successCallback) {
            this.triggerId = triggerId;

            var $this = this;

            $this.getBannerImgToVods(function () {


                
                
                if ($this.isShow) {
                    $('#' + triggerId).show();
                } else {
                    $('#' + triggerId).hide();
                }

                if ($this.isSupport) {
                    $('#' + triggerId).on('click', function () {
                        $('#generateVideoDialog').modal('show');
                        $('#generateVideoDialog #gvConfirm').show() //.addClass('disabled');
                        $('#generateVideoDialog #gvLoader').hide() //.addClass('disabled');


                        $("#generateVideoForm").validate().resetForm()

                        $this._initConfirmEvent(successCallback);
                    })
                } else {
                    $('#' + triggerId).addClass('u-updatemark').on('click', function () {
                        showFailure('当前版本不支持')
                    })
                }

               

            });

            
            
        },
        getPictureInfo: function (imgs) {
            var img = imgs[0];

            var generateVideoDialog = $('#generateVideoDialog');
            this._handleImgInputChange(img);
        },

        cleanPictureInfo: function () {
            this._handleImgInputChange();
        },
        _handleImgInputChange: function (imgobj) {
            
            var generateVideoDialog = $('#generateVideoDialog');
            if (imgobj) {
                generateVideoDialog.find(".alyvideo-changeImages-list li:first").hide();
                generateVideoDialog.find(".alyvideo-changeImages-list li").eq(1).show();
                generateVideoDialog.find(".coverImg").attr("src", imgobj.PicUrl);
                generateVideoDialog.find(".coverImgInput").val(imgobj.PicUrl).blur();

                generateVideoDialog.find(".coverImgInput").data("imgobj", imgobj)
            } else {
                generateVideoDialog.find(".alyvideo-changeImages-list li:first").show();
                generateVideoDialog.find(".alyvideo-changeImages-list li").eq(1).hide();
                generateVideoDialog.find(".coverImg").attr("src", '');
                generateVideoDialog.find(".coverImgInput").removeData()
            }

            setTimeout(function () {
                generateVideoDialog.find(".coverImgInput").blur();
            })
        },
        _initConfirmEvent: function (successCallback) {

            var btn = $('#generateVideoDialog').find('#gvConfirm');
            btn.off('click').on('click', function () {
                

                //if ($("#generateVideoForm").valid()) {
                //    var prompt = $('#generateVideoDialog').find('#gvprompt').val();
                //    var imgUrl = $('#generateVideoDialog').find('#gvimg').attr('src');
                //    successCallback && successCallback(prompt, imgUrl);
                //    $('#generateVideoDialog').modal('hide');
                //}
                $("#generateVideoForm").submit();
            })
        },
        _initValidate: function () {
            var $this = this;
            
            addAalidatorMethod();

            $("#generateVideoForm").validate({
                ignore: [],
                errorElement: 'p',
                rules: {
                    gvimg: {
                        required: true,
                        checkImageSize: {
                            param: { min: 316, max: 2000 },
                        }
                    },
                    gvprompt: {
                        required: true,
                        maxlength: 800
                    }
                },
                messages: {
                    gvimg: {
                        required: "请选择图片",
                        checkImageSize: '图片尺寸要求：宽度和高度需在[360-2000]之间'
                    },
                    gvprompt: {
                        required: "请输入提示词",
                        maxlength: "提示词最长不能超过800个字符"
                    }
                },

                submitHandler: function () {
                    var btn = $('#generateVideoDialog').find('#gvConfirm');
                    btn.hide();

                    var loader = $('#generateVideoDialog').find('#gvLoader');
                    loader.show();

                    var form = $("#generateVideoForm");

                    var imgobj = form.find(".coverImgInput").data("imgobj");

                    $.ajax({
                        url: "/AliVideo/BannerImgToVod",
                        type: "Post",
                        data: {
                            "ImgUrl": imgobj.PicUrl,
                            "PictureId": imgobj.PictureId,
                            "prompt": form.find('#gvprompt').val()
                        },
                        dataType: "json"
                    }).done(function (res) {
                        if (res.IsSuccess) {
                            var taskId = res.Data.taskId;
                            setTimeout(function () {
                                $this.loopProgress(taskId);
                            }, 1000 * 30)
                        } else {
                            showFailure(res.Msg);
                        }

                        $this.getBannerImgToVods();
                    })
                },
                
                //showErrors: function () {
                //    this.defaultShowErrors();

                //    var result =0 ;

                //    $.each(this.elements(), function (index,el) {
                //        result += $(el).hasClass('valid') ? 1 : 0;
                //    })

                     
                //    var btn = $('#generateVideoDialog').find('#gvConfirm');
                //    if (result != 2) {
                //        btn.addClass('disabled');
                //    } else {
                //        btn.removeClass('disabled');
                //    } 
                //}
            })

            
        },

        loopProgress: function (taskId) {
            var $this = this;

            /**
             *   status	任务状态（0：进行中，1：成功，2：失败）
             *   percentage	任务进度（如：10、20、100）
             *   message	进度描述
             */
            $.ajax({
                url: "/AliVideo/BannerImgToVodProgress?taskId=" + taskId,
                type: "GET",
                dataType: "json"
            }).done(function (res) {

                var errDone = function () {
                    $('#generateVideoDialog #gvConfirm').show();
                    $('#generateVideoDialog #gvLoader').hide();
                }

                if (res.IsSuccess) {
                    if (res.Data.status == 1) {

                        setTimeout(function () {
                            $('#generateVideoDialog').modal('hide');
                            if (win.vod) {
                                vod._freemp.PageIndex = 0;
                                vod.initFreeList()
                            }
                        }, 1000);

                        showSuccess('视频已生成，请在视频列表查看')

                    } else if (res.Data.status == 2) {
                        showFailure(res.Data.message);
                        errDone();
                    } else {
                        setTimeout(function () {
                            $this.loopProgress(taskId);
                        }, 1000 * 15)
                    }
                } else {
                    showFailure(res.Msg);
                    errDone();
                }
            })
        }
    }

    $(function () {
        win/AiForGenerateVideo._initValidate();
    })

})(window)


function addAalidatorMethod() {
    if (!$.validator.methods.checkImageSize) {

        $.validator.addMethod('checkImageSize', function (value, element, param) {

            var validator = this;

            function getCheckImageSizeValue() {
                return $.data(element, "checkImageSizeValue") || $.data(element, "checkImageSizeValue", {
                    old: null,
                    valid: false,
                    message: validator.defaultMessage(element, "checkImageSize")
                })
            }


            if (this.optional(element)) return "dependency-mismatch";


            var sizeValue = getCheckImageSizeValue();

            if (this.pending[element.name]) {
                return "pending"
            }

            if (sizeValue.old === value) {
                return sizeValue.valid
            }

            sizeValue.old = value;

            this.startRequest(element);

            var img = new Image();
            img.src = value;
            img.onload = function () {

                var valid = false;
                if (
                    img.naturalWidth <= param.max
                    && img.naturalHeight <= param.max
                    && img.naturalWidth >= param.min
                    && img.naturalHeight >= param.min) {
                    valid = true
                }

                if (valid) {
                    validator.prepareElement(element);
                    validator.successList.push(element);
                    validator.showErrors()
                } else {
                    var errors = {};
                    var message = validator.defaultMessage(element, "checkImageSize");
                    errors[element.name] = message;
                    validator.showErrors(errors)
                }

                sizeValue.valid = valid;
                validator.stopRequest(element, valid)
            }

            img.onerror = function () {
                this.stopRequest(element);
            }

            return "pending"
        })
    }
}
