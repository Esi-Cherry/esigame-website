"use strict";
//支持 transparent
(function () {
    Caman.Filter.register("fillColor2", function () {
        if (arguments[0] === 'transparent') {
            return this.process("fillColor", function (rgba) {
                rgba.r = 0;
                rgba.g = 0;
                rgba.b = 0;
                rgba.a = 0;
                return rgba;
            });
        } else {
            return this.fillColor.apply(this, arguments)
        }
    });
})(window.Caman);

//线性渐变
(function () {
    // 填充线性渐变
    var getLinearGradientMap = function (width, height, x1, y1, startColor, lastColor) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        var gradient = context.createLinearGradient(0, 0, x1, y1);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, lastColor);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        return context.getImageData(0, 0, width, height);
    };
    // 扩展
    Caman.Layer.prototype.fillLinearGradient = function (direction, startColor, lastColor) {
        var x1, y1;
        if (direction === 'top') {
            x1 = 0;
            y1 = this.canvas.height;
        }
        if (direction === 'left') {
            x1 = this.canvas.width;
            y1 = 0;
        }
        var imageData = getLinearGradientMap(this.canvas.width, this.canvas.height, x1, y1, startColor, lastColor);
        this.pixelData = imageData.data;
    };
})(window.Caman);

//径向渐变
(function () {
    // 填充径向渐变
    var getRadialGradientMap = function (width, height, r1, startColor, lastColor) {
         var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        var centerX = width / 2;
        var centerY = height / 2;
        var gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, r1);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, lastColor);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        return context.getImageData(0, 0, width, height);
    };

    // 扩展
    Caman.Layer.prototype.fillRadialGradient = function (startColor, lastColor) {
        // 勾股定理 c? = a? + b?
        var r1 = Math.sqrt(Math.pow(this.canvas.width, 2) + Math.pow(this.canvas.height, 2)) / 2;

        var imageData = getRadialGradientMap(this.canvas.width, this.canvas.height, r1, startColor, lastColor);
        this.pixelData = imageData.data;
    };
})(window.Caman);

// Caman.Filter.register
(function () {
    Caman.Filter.register("common", function () {
        this.brightness(8);
        this.contrast(6);
        return this.saturation(30);
    });

      Caman.Filter.register("oldBoot", function() {
    this.saturation(-20);
    this.vibrance(-50);
    this.gamma(1.1);
    this.sepia(30);
    this.channels({
      red: -10,
      blue: 30
    });
    this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
    return this.vignette("60%", 30);
  });
})(window.Caman);

// UseCaman
(function () {
    var uuid = 0;
    var getFilterCss = function () {
        return {
            '$filter-preset': 'none',
            '$filter-custom': 'off',
            '$filter-layer': 'off',
            '$brightness': 0,
            '$contrast': 0,
            '$saturation': 0,
            '$hue': 0,
            '$sharpen': 0,
            '$stackBlur': 0,
            '$layer-gradient-type': 'color',
            '$layer-gradient-direction': 'left',
            '$layer-color': 'transparent',
            '$layer-start-color': 'transparent',
            '$layer-last-color': 'transparent',
            '$layer-opacity': 100
        }
    }
    var getMimetype = function (url) {
        if (/^\.jpe?g$/.test(url.substr(url.lastIndexOf('.')))) {
            return 'image/jpeg';
        } 
        return 'image/png';
    }
    var UseCaman = function (pictureUrl, cb) {
        var _this = this;
        this.UseCaman = UseCaman;
        this.pictureUrl = pictureUrl;
        this.filterCss = getFilterCss();
        this.drawId = "filter-demo-img-" + uuid++;
        this.mimetype = getMimetype(pictureUrl);
        var img = new Image();
        img.id = this.drawId ;
        img.crossOrigin = 'anonymous';
        
        img.onload = function () {
            var ratioW = this.naturalWidth / 2000;
            var ratioH = this.naturalHeight / 2000;
            var ratio = Math.max(ratioW, ratioH);
            console.log(ratioW, ratioH, this.naturalWidth*this.naturalHeight > 2000*2000);
            if (ratio > 1 && (this.naturalWidth*this.naturalHeight > 2000*2000)) {
                var canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth / ratio;
                canvas.height = this.naturalHeight / ratio;
                var context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                _this.canvas = Caman(canvas, function () {
                    cb.call(_this);
                });
            } else {
                _this.canvas = Caman(img, function () {
                    cb.call(_this);
                });
            }
            
        }
        img.src = this.pictureUrl;
        //$(img).css({
        //        position: 'absolute',
        //        left: 0,
        //        right: 0,
        //        visibility: 'hidden',
        //        display: 'none',
        //        'z-index': -1000
        //    })
        //$(img).appendTo('body');
        
    }
    UseCaman.getDefaultFilterCss = UseCaman.prototype.getDefaultFilterCss = getFilterCss;
    UseCaman.prototype.getFilterPresetName = function (key) {
        var keyAname = [
                {
                    key: 'none',
                    name: '无'
                },
                {
                    key: 'common',
                    name: '通用色调'
                },
                 {
                    key: 'clarity',
                    name: '商务办公'
                },
                 {
                    key: 'hazyDays',
                    name: '人像摄影'
                },
                  {
                    key: 'concentrate',
                    name: '医药保健'
                },
                   {
                    key: 'oldBoot',
                    name: '科技网络'
                },
                   {
                    key: 'jarques',
                    name: '建筑设备'
                },
                   {
                    key: 'crossProcess',
                    name: '宠物林牧'
                },
                   {
                    key: 'herMajesty',
                    name: '美容护肤'
                },
                   {
                    key: 'sunrise',
                    name: '服装饰品'
                },
                    {
                    key: 'orangePeel',
                    name: '家居电器'
                },
                  {
                    key: 'love',
                    name: '广告传媒'
                },
                 {
                    key: 'lomo',
                    name: '风景旅游'
                },
                {
                    key: 'vintage',
                    name: '教育组织'
                },
               {
                    key: 'glowingSun',
                    name: '食物餐饮'
                },
                {
                    key: 'hemingway',
                    name: '货物物流'
                },
                 {
                    key: 'nostalgia',
                    name: '机械五金'
                },
                 {
                    key: 'pinhole',
                    name: '黑白灰调'
                }

        ];
        var name;
        for (var i = 0; i < keyAname.length; i++) {
            var item = keyAname[i];
            if (item.key === key) {
                name = item.name;
                break;
            }
        }
        return name;
    }
    UseCaman.prototype.setFilterCss = function (cssData) {
        for (var css in cssData) {
            this.filterCss[css] = cssData[css]
        }
        return this;
    } 
    UseCaman.prototype.getFilterCss = function (cssData) {
        return this.filterCss;
    } 
    UseCaman.prototype.resetFilterCss = function () {
        this.filterCss = UseCaman.getDefaultFilterCss();
    }
    //useCaman.proptype.draw = function (cb) {

    //    //var caman = this.caman;
    //    //$filter-preset

    //    //var img = $this.$control.find('img');
    //    //img.src = result.caman.toBase64()
    //    return this;
    //}
    UseCaman.prototype.destroy = function () {
        $('#' + this.drawId).remove();
        this.canvas = null;
        }

    UseCaman.prototype.render = function (cb) {
        var load = $('#smartLoading', window.top.document).clone()
        load.appendTo('body');
        if (this._timer) {
            clearTimeout(this._timer);
        }
        //var $this = this;
        var render = function () {
            var $this = this;
            var filterPresetName = [];
            var canvas = this.canvas;
            var $filterPreset = this.filterCss['$filter-preset'];
            var $filterCustom = this.filterCss['$filter-custom'];
            var $filterLayer = this.filterCss['$filter-layer'];

            if ($filterPreset == 'none' && $filterCustom === 'off' && $filterLayer === 'off') {
                cb(this.pictureUrl);
                return;
            }

            // 重置
            canvas.revert(false);
             if ($filterPreset !== 'none') {
                canvas[$filterPreset](false);
                filterPresetName.push( this.getFilterPresetName($filterPreset));
            }  else if ($filterCustom === 'on') {
                $.each(['brightness', 'contrast', 'saturation', 'hue', 'sharpen', 'stackBlur'], function (i, key) {
                    var val = $this.filterCss['$' + key];
                    canvas[key](val);
                })
                filterPresetName.push('自定义');
            }
            if ($filterLayer === 'on') {
                var css = $this.filterCss;
                canvas.newLayer(function () {
                    this.opacity(css['$layer-opacity']);
                    switch (css['$layer-gradient-type']) {
                        case 'color':
                            this.filter.fillColor2(css['$layer-color'],)
                            break;
                        case 'linear':
                            this.fillLinearGradient(
                                css['$layer-gradient-direction'],
                                css['$layer-start-color'],
                                css['$layer-last-color']
                            );
                            break;
                        case 'radial':
                            this.fillRadialGradient(
                                css['$layer-start-color'],
                                css['$layer-last-color']
                            )
                            break;
                    }
            
                })
                filterPresetName.push('蒙层');
            }
            canvas.render(function () {
                var base64 = this.canvas.toDataURL($this.mimetype, 1);
                cb(base64, filterPresetName.length > 0 ? filterPresetName.join('-'): undefined);
             });
        }
        this._timer = setTimeout(render.bind(this), 300)

    }

    //var $event = {};

    //var $on = function (eventKey, fn) {
    //    if (!$event[eventKey]) {
    //        $event[eventKey] = []
    //    }
    //    $event[eventKey].push(fn);
    //}
    //var $emit = function () {

    //}

    window.UseCaman = UseCaman;
})(window)