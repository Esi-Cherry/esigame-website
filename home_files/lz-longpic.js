; (function($) {

	$.extend({

		isNumber:function(v){

			return Object.prototype.toString.call(v) === '[object Number]';

		},

		isObject:function(v){

			return Object.prototype.toString.call(v) === '[object Object]';

		},

		isArray:function(v){

			return Object.prototype.toString.call(v) === '[object Array]';
		}

	});

	function lzlongPicTool(el){

		var me = this;

		this.ele = $(el);

		this.picSelect = this.ele.find('.lz-longImg');

		this.picTitleSelect = this.ele.find('.lz-longImgTitle');
	}

	lzlongPicTool.prototype.getIMG = function(){

		this.picSelect.get(0) == undefined && (this.picSelect = this.ele.find('img').parent());
	}

	lzlongPicTool.prototype.getTitleH = function(){

		return this.picTitleSelect.get(0) == undefined ? 0 : this.picTitleSelect.outerHeight()
	}

	lzlongPicTool.prototype.setPosition = function(){

		var $imgParent = this.picSelect.parent();

		$imgParent.css('position',$imgParent.css('position') == 'static' ? 'relative' : '' );

		this.picSelect.css({

			'position':'absolute',

			'top':0,

			'left':0

		});
	} 

	lzlongPicTool.prototype.getSize = function(){

		this.boxH = this.ele.height() - this.getTitleH();

		this.picW = this.picSelect.width();

		this.picH = this.picSelect.height();

	}

	lzlongPicTool.prototype.setMaxTop = function(){

		this.maxTop =  (this.picH - this.boxH >= 0) ? this.picH - this.boxH : 0;

	}

	lzlongPicTool.prototype.setSpeed = function(a,b){

		var me = this;

		function speedInFun(a){

			me.speedIn = me.maxTop * a / me.picW * 1000

		}

		function speedOutFun(b){


			b|0 == 0 && (b = parseFloat('0' + b));

			me.speedOut = b * 500
		}

		function isInTxtVal(){

			if(a == 'fast' || a.speedVal[0] == 'fast'){

				speedInFun(0.5)

			}else if(a == 'medium' || a.speedVal[0] == 'medium'){

				speedInFun(2)
			
			}else if(a == 'slow' || a.speedVal[0] == 'slow'){

				speedInFun(4)
			}

		}

		function isOutTxtVal(){

			if(b == 'fast' || a.speedVal[1] == 'fast'){

				this.speedOut = 48

			}else if(b == 'medium' || a.speedVal[1] == 'medium'){

				this.speedOut = 850
			
			}else if(b == 'slow' || a.speedVal[1] == 'slow'){

				this.speedOut = 2500
			}
		}

		if(a !=null && !$.isObject(a)){

			if( $.isNumber(a)){

				me.speedIn = a

			}else{

				isInTxtVal()
			} 

		}else if($.isObject(a)){

			if(a.speedType == 'number'){

				me.speedIn = a.speedVal[0];

				me.speedOut = a.speedVal[1];

			}else if(a.speedType == 'pointer'){

				speedInFun(a.speedVal[0]);

				speedOutFun(a.speedVal[1]);
			
			}else if(a.speedType == undefined || a.speedType == 'preset'){

				isInTxtVal();

				isOutTxtVal()

			}

			if(a.speedVal == null || !$.isArray(a.speedVal)){

				speedInFun(3.4);

			}

			b = null;

		}else{

			speedInFun(2.5)
		}
			

		if( b != null && !$.isObject(a)){

			if($.isNumber(b)){

				this.speedOut = b;
			
			}else{

				isOutTxtVal()
			}

		}else{

			this.speedOut = 100;
		}

	}

	lzlongPicTool.prototype.event = function(a,b){

		var me = this;

		me.ele.on('mouseenter.lzlongpic',function(){

			me.getSize();

			if((me.changepicH != me.picH) || (me.changeBoxH != me.boxH) || (me.changeBoxW != me.picW)){

				me.setMaxTop();

				me.setSpeed(a,b);

				me.changepicH = me.picH;

				me.changeboxH = me.boxH
			}

			me.picSelect.stop().animate({
			
				top: -me.maxTop

			},me.speedIn,'linear');

		}).on('mouseleave',function(){

			me.picSelect.stop().animate({
			
				top:0

			},me.speedOut,'linear');

		});
	}

	lzlongPicTool.prototype.init = function(a,b){

		var me = this;

		me.getIMG();

		me.setPosition();

		me.event(a,b);

	}

	$.fn.lzlongpic = function(a,b){

		var me = $(this);

		$.each(me,function(index,el){

			var newLongPic = new lzlongPicTool(el);

			newLongPic.init(a,b);

		})

	}

})(jQuery);