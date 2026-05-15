(function ($) {
    var widgets = function () { };
    widgets.prototype = {
        constructor: widgets,
        layout: function (data, isDirectSelling, themeType) {
            var json = data.layout;
            var widgetpanelItems = [];
            $("#widgetpanellist").html("");
            $.each(json, function (i) {
                var isDirect = $("#isDirectSelling").val();
                json[i].isDirectSelling = isDirect;
                //针对深色和浅色取对应的色值
                if (typeof (themeType) !== "undefined") {
                    $.each(json[i].data, function (i, item) {
                        item.widgets = data.data.filter(function (value) {
                            if (value.area) {
                                return "x-" + value.type + "-" + value.area == item.type;
                            }
                            return "x-" + value.type == item.type;
                        });
                        if (item.widgets.length > 0) {
                            item.type = item.widgets[0].type;
                        }
                        $.each(item.widgets, function (i, widget) {
                            if (themeType === "light") {
                                widget.themeColor = widget.lightThemeColor;
                            } else {
                                widget.themeColor = widget.darkThemeColor;
                            }
                        });
                    });
                }
                widgetpanelItems.push(kino.razor($("#widgetpanelItem").html(), {
                    data: json[i]
                }));
            });
            $("#widgetpanellist").append(widgetpanelItems);
            $(".widget-template-scroll.f-scrollbar").lzscroll();
            $(".u-close-widgetShow").click(function () {
                $("#m-widgetShow").addClass("f-hide");
            });
            $(window).trigger("resize");
        },
        setTheme: function (themeVal, urlVal) {
            var device = "form";
            var scene = $("#header_switchDevice_ul a.current").parent();
            if (scene.length > 0) {
                device = scene.attr("device");
            }
            urlVal === undefined && (urlVal = '/static/sitetheme/themeimg/');
            var me = this;
            $('#widgetpanellist').find('.u-colimg-item').each(function (index, el) {
                $(el).css('backgroundImage', 'url("' + urlVal + themeVal + '/' + device + "/" + $(el).data('widget') + '.png")');
            });
        }
    }
    window.widgets = new widgets();
})(jQuery)