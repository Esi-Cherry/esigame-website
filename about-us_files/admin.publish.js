window.WzPublishSucessCaller = []

window.mobileAndAutoResponsive = window.mobileAndAutoResponsive || false;

function switchPublishDetectBtn() {
    window.hasLastOneHourBackup = window.hasLastOneHourBackup || false;
    var btnEle = $("#publishDetectBtn");
    var enable = !btnEle.hasClass("checked");
    btnEle.toggleClass("checked", enable);

    localStorage.setItem("publishDetectBtnStatus", enable.toString());
    $("#backUpMsg").html(window.hasLastOneHourBackup ? "当前网站1小时内已进行整站备份" : "当前网站1小时内未进行整站备份,请备份后发布");
    if (window.hasLastOneHourBackup) {
        $("#oneKeyPublishBtn").attr("disabled", false);
    }
    else {
        $("#oneKeyPublishBtn").attr("disabled", enable);
    }


}


function switchPublishEnableAgentBtn() {
    var btnEle = $("#publishSwitchEnableAgent");
    var enable = !btnEle.hasClass("checked");
    btnEle.toggleClass("checked", enable);
}

function getPublishEnableAgent() {

    var btnEle = $("#publishSwitchEnableAgent");
    return btnEle.hasClass("checked") && $('#publishAgent').is(':visible');
}



var publish = {
    _host: '',
    isBindDomain: false,
    init: function () {
        
        $('#use-modal5 a.btn-info.publish').off('click').on('click',
            function () {
                publish._onPublish();
            });
        $('#use-modal5 a.btn-info.oneKeyPublish').off('click').on('click',
            function () {
                publish._onOneKeyPublish();
                // GA-发布网站
                window.gtag &&
                    gtag('event',
                        'event_onekey_publish',
                        {
                            'event_category': '一键发布',
                            'event_action': '点击一键发布按钮',
                            'event_label': '一键发布-设计器'
                        });
            });

        $('#use-modal-failure a.btn-success').off('click').on('click',
            function () {
                $('#use-modal-failure').modal('hide');
                publish._onPublish();
            });

        this._bindPublishEvent();
    },
   _bindPublishEvent: function () {

        $("#btnPublishButton, a[name=btnPublishButton], #header_publish_btn")
            .off('click')
            .on('click',
                function () {
                    // 如果是手机端自适应页面（发布）中间的提示文本突出显示，无其他点击效果
                    if (mobileAndAutoResponsive && mobileAndAutoResponsive(true)) {
                        return;
                    }

                    publish._loadDomain();

                    // GA-发布网站
                    window.gtag && gtag('event',
                        'event_publish',
                        {
                            'event_category': '发布网站',
                            'event_action': '点击发布按钮',
                            'event_label': '发布-设计器'
                        });


                });
    },
    _loadDomain: function () {
        $.ajax({
            cache: false,
            url: "/Admin/SiteAdmin/LoadPublishInfo",
            type: "post",
            success: function (data) {
                window.hasLastOneHourBackup = data.hasLastOneHourBackup;

                if (data.needShowCheckBtn) {
                    var publishDetectBtnStatus = localStorage.getItem("publishDetectBtnStatus")
                    publishDetectBtnStatus = publishDetectBtnStatus === null ? 'true' : publishDetectBtnStatus; // 默认开启
                    $("#publishDetectBtn").toggleClass("checked", publishDetectBtnStatus === 'true');
                    if (!window.hasLastOneHourBackup && publishDetectBtnStatus === 'true') {
                        $("#oneKeyPublishBtn").attr("disabled", true);
                    }
                    $("#backUpMsg").html(window.hasLastOneHourBackup ? "当前网站1小时内已进行整站备份" : "当前网站1小时内未进行整站备份,请备份后发布");
                } else {
                    $("#publishDetectBtn").parent().hide();
                }


                if (data != undefined && data.total != undefined && data.total > 0) {
                    var html = '';
                    for (var i = 0; i < data.rows.length; i++) {
                        if (i == 0) {
                            publish._host = data.rows[i].Hosts;
                            $('#hid_modal_publish_selectedDomain').val(data.rows[i].Hosts);
                            $('#use-modal5 span.showtext').html(data.rows[i].Hosts);
                        }
                        html += '<li><a href="#" class="dropLink">' + data.rows[i].Hosts + '</a></li>';
                    }
                    $('#use-modal5 ul.dropdown-list').html(html);
                    publish._bindClickEvents();
                    publish.isBindDomain = true;
                }
                $('#use-modal5').modal('show');
            },
            error: function (e) {
            }
        });
        $.ajax({
            cache: false,
            url: "/admin/UltronAgent/GetStatus",
            type: 'get',
            success: function (res) {
                var btnEle = $("#publishSwitchEnableAgent");

                if (res.isSuccess) {

                    if (res.data.shouldDisplay) {
                        $('#publishAgent').show();
                    }

                    if (res.data.enableUltronAgent) {
                        btnEle.addClass("checked", true);
                    } else if (!res.data.enableUltronAgent) {
                        btnEle.removeClass("checked");
                    }
                }

            
                
                
            }
        })
    },
    _bindClickEvents: function () {
        $('#use-modal5 ul.dropdown-list>li').off('click').on('click',
            function () {
                var domain = $(this).find('a').html();
                $('#use-modal5 span.showtext').html(domain);
                $('#hid_modal_publish_selectedDomain').val(domain);
                publish._host = domain;
            });
    },
    _onPublish: function () {
        //$('#use-modal5').modal('hide');

        //$.ajax({
        //    cache: false,
        //    url: "/Admin/SitePublish/PublishSitePages",
        //    data: { publishAllFiles: true, host: publish._host },
        //    type: 'post',
        //    dataType: "json",
        //    success: function (data) {
        //        if (data.status == 0) {
        //            $('#use-modal4').modal('show');
        //            $("#publishWebsite").modal("hide");
        //            $("#publishProcessing").modal("show");
        //            publish._getPublishStaus();
        //        } else {
        //            if (!data.IsAuthorize) {
        //                alert("您没有发布站点权限,请联系管理员");
        //                return;
        //            } else {
        //                alert(data.message);
        //            }
        //        }
        //    },
        //    error: function (e) { alert("发布失败"); }
        //});
        this._onOneKeyPublish()
    },
    _onOneKeyPublish: function () {
        $('#use-modal5').modal('hide');
        $('#use-modal4').modal('show');
       
        $.ajax({
            cache: false,
            url: "/Admin/SitePublish/PublishSitePages",
            type: 'post',
            dataType: "json",
            data: {
                enableUltronAgent: getPublishEnableAgent(),
            },
            success: function (data) {
                if (data.status == 0) {
                    
                    $("#publishWebsite").modal("hide");
                    //$("#publishProcessing").modal("show");
                    setTimeout(function () {
                        publish._getPublishStaus();
                    }, 1000)
                } else {
                    if (!data.IsAuthorize) {
                        alert("您没有发布站点权限,请联系管理员");
                        return;
                    } else {
                        alert(data.message);
                    }
                }
            },
            error: function (e) { alert("发布失败"); }
        });
        $.ajax({
            cache: false,
            url: "/Admin/SiteAdmin/NeedStandardDetect",
            type: "get",
            success: function (f) {
                publish.needStandardDetectStatus = f;
                if (f) {
                    $.ajax({
                        cache: false,
                        url: "/Admin/SitePublish/SiteStandardDetect",
                        type: 'get',
                        success: function (data) {
                            publish.StandardDetectStatus = true;
                            publish.SiteStandardDetect = data;
                        },
                        error: function (e) { }
                    });
                    $('#use-modalStandardDetectEnd').on('hide.bs.modal', function () {
                        if (!publish.isBindDomain) {
                            $('#use-modal3').modal('show');
                        }
                    });
                }
            },
            error: function (f) { }
        });
        if (window.isNeedShowEvaluate) {
            //判断是否显示评价
            $.ajax({
                cache: false,
                url: "/Admin/SiteAdmin/JudgeIsEvaluateFromWz",
                type: 'get',
                data: {
                    secondDomain: location.host
                },
                success: function (data) {
                    var res = JSON.parse(data.data)
                    if (!res.data) {
                        $('.evaluateText').show()
                    } else {
                        $('.evaluateText').hide()
                    }
                }
            })
        }
    },
    _getPublishStaus: function () {
        $.ajax({
            cache: false,
            url: "/Designer/SitePublish/GetPublishStatus",
            type: 'post',
            dataType: "json",
            success: function (data) {
                if (data.Status == 0) {
                    $('#use-modal4 .m-process-percent').css('width', data.CompletePercentage + "%");
                    setTimeout(function () { publish._getPublishStaus(); }, 2000);
                } else if (data.Status == 1) {
                    $("#use-modal4").modal("hide");
                    //$("#use-modal6 a[name='publishHost']").text(publish._host);
                    //$("#use-modal6 a[name='publishHost']").attr("href", "http://" + publish._host);
                    $.ajax({
                        cache: false,
                        url: "/admin/SiteAdmin/ShowBindInfo",
                        type: 'get',
                        dataType: "json",
                        success: function (res) {
                            if (res.data.IsShowCrmBind == "1" && QRCode) {
                                $("#designQrCode").children().remove();
                                new QRCode(document.querySelector("#designQrCode"), {
                                    text: res.data.WxQRUrl,
                                    width: 108,
                                    height: 108
                                })
                                
                                $("#showCrmBind .QRCodeContent").show();
                                //$("#use-modal6").find(".row").hide();
                            } else {
                                $("#showCrmBind .QRCodeContent").hide();
                                //$("#use-modal6").find(".row").show();
                            }
                            $("#use-modal6").modal("show");


                        },
                        error: function (e) { }
                    })
                    $('#use-modal6').on('hide.bs.modal', function () {
                        if (publish.needStandardDetectStatus) {
                            publish.GetStandardDetectStatus()
                            return;
                        }
                        if (!publish.isBindDomain) {
                            $('#use-modal3').modal('show');
                        }

                        // 发布成功之后 其他地方注入
                        if (window.WzPublishSucessCaller && window.WzPublishSucessCaller.length > 0) {
                            window.WzPublishSucessCaller.forEach(function (caller) {
                                if (typeof caller === 'function') {
                                    caller();
                                }
                            } )
                        }
                    });
                    // GA-发布成功
                    window.gtag &&
                        gtag('event',
                            'event_publish_success',
                            {
                                'event_category': '发布成功',
                                'event_action': '点击发布成功',
                                'event_label': '发布-设计器'
                            });
                } else {
                    $("#use-modal4").modal("hide");
                    $("#use-modal-failure a[name='publishHost']").text(publish._host);
                    $("#use-modal-failure a[name='publishHost']").attr("href", "http://" + publish._host);
                    $("#use-modal-failure span.text-middle").text(data.ExecuteMessage);
                    $("#use-modal-failure").modal("show");
                }
            },
            error: function (e) { }
        });
    },
    needStandardDetectStatus: false,
    StandardDetectStatus: false,
    StandardDetectProgress: 0,
    SiteStandardDetect: {},
    GetStandardDetectStatus: function () {
        if (publish.StandardDetectStatus) {
            publish.StandardDetectProgress = 100;
            $("#use-modalStandardDetect").modal("hide");
            if (!publish.SiteStandardDetect.IsPass) {
                var siteNoPassText = '';
                if (!publish.SiteStandardDetect.BackupDetect.IsPass) {
                    publish.SiteStandardDetect.BackupDetect.MsgList.forEach(function (item) {
                        siteNoPassText = siteNoPassText + item + '、';
                    })
                }
                if (!publish.SiteStandardDetect.CompanyInfoDetect.IsPass) {
                    publish.SiteStandardDetect.CompanyInfoDetect.MsgList.forEach(function (item) {
                        siteNoPassText = siteNoPassText + item + '、';
                    })
                }
                if (siteNoPassText) {
                    siteNoPassText = siteNoPassText.substring(0, siteNoPassText.length - 1);
                    $('#use-modalStandardDetectEnd .siteProblemContent').html(siteNoPassText);
                } else {
                    $('#use-modalStandardDetectEnd .siteProblemWrapper').hide();
                }

                var pcNoPassText = '';
                var mobileNoPassText = '';
                publish.SiteStandardDetect.PagesDetect.forEach(function (item) {
                    if (!item.IsPass) {
                        //DeviceMode:0手机,1电脑
                        if (item.DeviceMode) {
                            pcNoPassText = pcNoPassText + '<a target="_self" href="' + location.origin + '/designer/index/' + item.Id + '">' + item.Title + '</a>、';
                        } else {
                            mobileNoPassText = mobileNoPassText + '<a target="_self" href="' + location.origin + '/designer/index/' + item.Id + '">' + item.Title + '</a>、';
                        }
                    }
                })
                if (pcNoPassText) {
                    pcNoPassText = pcNoPassText.substring(0, pcNoPassText.length - 1);
                    $('#use-modalStandardDetectEnd .pcProblemContent').html(pcNoPassText);
                } else {
                    $('#use-modalStandardDetectEnd .pcProblemWrapper').hide();
                }
                if (mobileNoPassText) {
                    mobileNoPassText = mobileNoPassText.substring(0, mobileNoPassText.length - 1);
                    $('#use-modalStandardDetectEnd .mobileProblemContent').html(mobileNoPassText);
                } else {
                    $('#use-modalStandardDetectEnd .mobileProblemWrapper').hide();
                }
                $("#use-modalStandardDetectEnd").modal("show");
            }
        } else {
            $("#use-modalStandardDetect").modal("show");
            if (publish.StandardDetectProgress >= 99) {
                publish.StandardDetectProgress = 99
            } else {
                publish.StandardDetectProgress += 3;
            }
            $('#use-modalStandardDetect .m-process-percent').css('width', publish.StandardDetectProgress + "%");
            setTimeout(publish.GetStandardDetectStatus, 1000);
        }
    }
};


var deploy = {
    _ecsModal: null,
    _userChooseDeploymenMode: 0,
    init: function () {
        deploy._ecsModal = $('#ECS-modal').lzmodal({
            'title': '发布网站',
            'top': '100px'
        })
        var modal = deploy.getDeployModal();
        modal.find('.deploy-panel').click(function () {
            $(this).attr('data-checked', true);
            $(this).siblings().attr('data-checked', false);
            modal.find('.error-container').hide();
            modal.find('#onekeyDeployBtn').removeAttr('disabled')
        })

    },

    goPublishOrDeploy() {
        if (deploy._userChooseDeploymenMode == 0) {
            this.openDeployModal()
        }
        else {
            publish._loadDomain();
        }
    },

    getUserDeployType: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: '/Admin/ExtensionMgr/GetChooseDeploymenMode',
                type: "get",
                success: function (res) {
                    if (res.IsSuccess) {
                        //0 = 未选择，1 = 集群部署，2 = 独立部署
                        deploy._userChooseDeploymenMode = res.Data
                        resolve(res.Data)
                    } else {
                        deploy.deployFail(res.Msg)
                        reject()
                    }
                },
                error: function (e) {
                    deploy.deployFail(e.message);
                    reject()
                }
            })
        })
    },
    getDeployModal: function () {
        return $('#use-deploy-choose-modal');
    },
    cancelDeployType: function () {
        this.getDeployModal().find('.deploy-panel').attr('data-checked', false)
    },
    openDeployModal: function (isCancel) {
        // 每次打开时取消选中
        //$('#use-deploy-choose-modal').on('show.bs.modal', function () {
        //})

        if (isCancel) {
            deploy.cancelDeployType();
        }

        var modal = deploy.getDeployModal();

        modal.modal('show')
        modal.find('.error-container').hide();

        // 点击一键部署
        modal.find('#onekeyDeployBtn').click(function () {
            var deployType = $('#use-deploy-choose-modal').find('.deploy-panel[data-checked="true"]').attr('data-value');

            if (!deployType) {
                modal.find('.error-container').show();
                return;
            }
            deploy.askDeployType({
                deployType,
                onClose: deploy.openDeployModal,
                onSubmit: function () {
                    deploy.submitDeployType(deployType)
                }
            })
            modal.modal('hide')
        })
    },
    askDeployType: function (params) {
        var deployTypeName = params.deployType == '2' ? '独立ECS' : '共享云资源';

        deploy._ecsModal.lzmodal('setModal', {
            'no-cancel': false,
            'no-submit': false,
            'no-close': false,
            'no-event': false,
            'content': '您确定选择<strong class="text-info"> “' + deployTypeName + '” </strong>作为网站部署方式吗？',
            'cancel-btn': '返回修改',
            'submit-btn': '确认'
        }).lzmodal('show');

        deploy._ecsModal.lzmodal('onClose', params.onClose)
        deploy._ecsModal.lzmodal('onSubmit', params.onSubmit)
    },
    getDeploypPocess() {
        if ($('#_deploying-modal-content').length === 0) {
            var content = $.parseHTML($.trim($('#__deploying-template').text()));
            deploy._ecsModal.lzmodal('setModal', {
                'no-cancel': true,
                'no-submit': true,
                'no-close': true,
                'no-event': true,
                'content': content
            }).lzmodal('show');
        }
        
        (function loadDeploymenPercentageStatus () {
            $.ajax({
                url: '/Admin/ExtensionMgr/DeploymenPercentageStatus',
                type: "get",
                success: function (res) {
                    if (res.IsSuccess && res.Data) {
                        // 执行状态：0=正在执行，1=执行完成，2=执行错误

                        if (res.Data == 0) {
                            setTimeout(function () {
                                loadDeploymenPercentageStatus()
                            }, 3000)
                            $('#__deploying-modal-content').find('.m-process-percent').css('width', res.Data.CompletePercentage + '%');
                        } else if (res.Data == 1) {
                            deploy.deploySuccess()
                        } else {
                            deploy.deployFail(res.Data.ExecuteMessage)
                        }

                    } else {
                        deploy.deployFail(res.Msg)
                    }
                },
                error: function (e) {
                    deploy.deployFail(e.message);
                }
            })
        })()

       
    },
    submitDeployType: function (deployType) {

        
        if (deploy.pocessing) {
            return;
        }
        deploy.pocessing = true;
        //1=Cluster(集群模式) 2=Standalone（ECS）
        $.ajax({
            url: '/Admin/ExtensionMgr/ChooseDeploymen',
            type: "post",
            data: {
                mode: deployType
            },
            success: function (res) {
                if (res.IsSuccess && res.Data) {
                    deploy.getDeploypPocess()
                } else {
                    deploy.deployFail(res.Msg)
                }
                deploy.pocessing = false;
            },
            error: function (e) {
                deploy.deployFail(e.message);
                deploy.pocessing = false;
            }
        }) 
    },
    deploySuccess: function () {

        var isInMyapp = '/admin/extensionmgr/myapp' == window.location.pathname;

        deploy._ecsModal.lzmodal('setModal', {
            'no-cancel': false,
            'no-submit': !!isInMyapp,
            'no-close': false,
            'no-event': false,
            'cancel-btn': '稍后操作',
            'submit-btn': '进入我的应用',
            'submit-link': '/admin/extensionmgr/myapp',
            'content': $.parseHTML($.trim($('#__deploySuccess-template').text()))
        }).lzmodal('show');

        deploy._ecsModal.lzmodal('onClose', function () { })
        deploy._ecsModal.lzmodal('onSubmit', function () { })
    },
    deployFail: function (msg) {
        msg = msg || '抱歉，出现错误，请稍后重试！'
        var content = $.parseHTML($.trim($('#__deployFail-template').text()));

        $(content).find('.msg').text(msg);

        deploy._ecsModal.lzmodal('setModal', {
            'no-cancel': true,
            'no-submit': false,
            'no-close': false,
            'no-event': false,
            'submit-btn': '确认',
            'content': content
        }).lzmodal('show');

        

        deploy._ecsModal.lzmodal('onClose', function () { })
        deploy._ecsModal.lzmodal('onSubmit', function () { })
    }

}

$(function () {
    deploy.init();
    publish.init();
})