
function Record() {
    var recordApiList = ["https://vm-auth.hnxmjf.com/CdnAuth/Ping", "https://cdn-auth.hnxmjf.com/CdnAuth/Ping", "https://vm-auth.wanwang.xin/CdnAuth/Ping", "https://cdn-auth.wanwang.xin/CdnAuth/Ping", "https://vm.auth.wezhan.cn/CdnAuth/Ping", "https://cdn.auth.wezhan.cn/CdnAuth/Ping"];
    for (var i = 0; i < recordApiList.length; i++) {
        $.ajax({ url: recordApiList[i] });
    }
}


function InIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
function ForceRedirect() {
    if (!InIframe()) {
        //app管理页面直连portainer可以节省打包上传的流量消耗以及提升性能,
        //但是不能每个portainer域名都开https,
        //因为一个域名一周只能开50个免费证书, 
        //所以这个路径就强制重定向到http,
        //否则无法在https页面访问http的接口
        if (location.href.toLowerCase().indexOf("/admin/extensionmgr/myapp")!==-1) {
            if (location.protocol === "https:") {
/*                location.href = location.href.replace("https:", "http:");*/
            }
        }
        else {
            var enableHttpsSuffixList = [".scd.wezhan.cn", ".scd.hkwezhan.cn", ".scd.wanwang.xin", ".scd.website.xin"];
            var hostname = location.hostname;
            var hostSuffix = hostname.substr(hostname.indexOf('.'))
            if (location.protocol === "http:") {
                for (var x = 0; x < enableHttpsSuffixList.length; x++) {
                    var item = enableHttpsSuffixList[x];
                    if (item == hostSuffix) {
                        //只会替换第一个http:
                        location.href = location.href.replace("http:", "https:");
                        break;
                    }
                }
            }
        }        
        console.log("检测是否需要跳转至Https");
    }
}

ForceRedirect();
Record();