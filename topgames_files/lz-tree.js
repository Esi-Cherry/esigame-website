;(function(){

	$.extend({

		isArray:function(v){

			return Object.prototype.toString.call(v) === '[object Array]';

		},

		isString:function(v){

			return Object.prototype.toString.call(v) === '[object String]';

		},

		isBool:function(v){

			return typeof(v) === 'boolean';
		},

	});

	var lzTreeTool = function(el){

		this.el = $(el);

		this._hover = 'z-tree-hover';

		this.currentHover = 'z-current-menushow';

		this.isSetSize = false; 

		this.treeSize = {

			boxWid:null,

			hasChildWid:null,

			imgWid:null,

			txtWid:null,

			picWid:null,

			innerWid:null,

			paddingLeft:null,

			paddingRight:null
		}

		this.widthArr = [];

		this.scroll = {

			x:0,

			y:0

		},

		this.cunrrentMax=null;

		this.toRight = 0;

		this.flag = null;

	}

	lzTreeTool.prototype.askSetSize = function(){
		
		this.el.data('lzsetsize') && (this.isSetSize = true);
	}

	lzTreeTool.prototype.lzfind = function(a){

		return this.el.find(a);
	}

	lzTreeTool.prototype.unfold = function(){

		this.lzfind('.lz-unfold').children().find('.u-tree-hasChild').addClass('icon-rotate-90')
	}

	lzTreeTool.prototype.getSize = function(el){

		var me = this,

			$el = $(el);

		me.treeSize.paddingRight = parseFloat($el.find('.u-tree-item-inner').css('paddingRight'));

		me.treeSize.imgWid = me.lzfind('.u-tree-image').outerWidth(true);

		me.treeSize.txtWid = me.lzfind('.u-tree-txt').outerWidth(true);

		me.treeSize.picWid = me.lzfind('.u-tree-pic').outerWidth(true);

		me.treeSize.hasChildWid = me.lzfind('.u-tree-hasChild').outerWidth(true);

		return me;
	}


	lzTreeTool.prototype.getBoxSize = function(){

		this.treeSize.boxWid = this.el.parent().width();
	}

	lzTreeTool.prototype.layout = function(q){

		var me = this;

		me.lzfind('.u-tree-item-box').each(function(indexs,el){

			var $el = $(el);

			me.getSize($el);

			_thePadding = $el.closest('.u-tree-item-box').parent().children('.u-tree-item-inner').css('paddingLeft');

			me.treeSize.paddingLeft = parseFloat(_thePadding) + me.treeSize.hasChildWid;

			isNaN(me.treeSize.paddingLeft) && (me.treeSize.paddingLeft = me.treeSize.paddingRight);

			$el.children().children('.u-tree-item-inner').css('paddingLeft', me.treeSize.paddingLeft);

			me.flag == false && (me.treeSize.picWid = 0);

			me.treeSize.innerWid = me.treeSize.hasChildWid + me.treeSize.imgWid + me.treeSize.txtWid + me.treeSize.picWid + me.treeSize.paddingLeft + me.treeSize.paddingRight + 1;

			me.widthArr.push(me.treeSize.innerWid);

		});

		me.maxWid = Math.max.apply(null,me.widthArr);

		return me;

	}

	lzTreeTool.prototype.setSize = function(){

		var me = this;

		me.maxWid <= me.treeSize.boxWid && (me.maxWid = me.treeSize.boxWid);

		me.lzfind('.u-tree-item-inner').css('width',me.maxWid);

		return this;
	}

	lzTreeTool.prototype.hasImg = function(){


		this.lzfind('.u-tree-item').each(function(indexs,el){

			var $el = $(el);

			$el.find('.u-tree-item-inner > .u-tree-txt').removeClass('u-tree-txt-haspic').removeClass('u-tree-txt-nopic').addClass( $el.find('.u-tree-item-inner').find('.u-tree-image>img').size() !=0 ? 'u-tree-txt-haspic' : 'u-tree-txt-nopic')

		});

		return this;
	}

	lzTreeTool.prototype.getLocation = function(){

		var me = this;

		me.scroll.x = me.el.parent().scrollLeft();

		me.toRight = me.maxWid - me.treeSize.boxWid - me.scroll.x;

		me.lzfind('.u-tree-pic').css('right',me.toRight);

		return me;
		
	}

	lzTreeTool.prototype.setLocation = function(){

		var me = this;

		me.el.parent().off('scroll.lztree').on('scroll.lztree',function(){

			me.getLocation();

		});

		return me;
		
	}


	lzTreeTool.prototype.itmeHover = function(){

		var me = this;

		me.lzfind('.u-tree-item-inner').off('mouseover.itemInner').on('mouseover.itemInner',function(){

			var $this = $(this);

			$this.addClass('z-hover-bgcolor')

			.children('.u-tree-pic').addClass(me._hover);

		}).off('mouseout.lztree').on('mouseout.lztree',function(){

			var $this = $(this);

			$this.removeClass('z-hover-bgcolor')

			.children('.u-tree-pic').removeClass(me._hover)

		});

		return me;
	}

	lzTreeTool.prototype.clickHasChild = function(){

		this.lzfind('.u-tree-hasChild').off('click.hasChild').on('click.hasChild',function(e){

			var $this = $(this),

			$itm = $this.closest('.u-tree-item').children('.u-tree-item-box');

			$this.toggleClass('icon-rotate-90');

			console.log($this);

			if($this.hasClass('icon-rotate-90')){

				$itm.slideDown("fast");

				$this.closest('.u-tree-item').addClass('lz-unfold')

			}else{

				$itm.slideUp("fast");

				$this.closest('.u-tree-item').removeClass('lz-unfold')

			}

			return false;

		});

		
	}

	lzTreeTool.prototype.hideMue = function($treeMenuAll,$treeMenu,$displayObj,$item,taget){

		var me = this;

		$treeMenuAll.hide();

		me.lzfind('.u-tree-pic i').data('lzclick-num',taget.init);

		taget.current = null;

		$('.u-tree-pic').css('display','');

		$('.u-tree-item-inner').removeClass(me.currentHover);

		return me;

	}

	lzTreeTool.prototype.clickPic = function(useId){

		useId == null && (useId = this);

		var me = this,

			flag = true,

			$treeMenu = $(useId),

			$treeMenuAll = $('.u-tree-menu');

			picObj = me.lzfind('.u-tree-pic'),

			$items = me.lzfind('.u-tree-item-inner'),

			position = {

				px: 0,

				py: 0,

				pw: 0,

				ph: 0,

				mw:0,

				mh:0,

				sx: 0,

				sy : 0
			},

			taget = {

				init: -1,

				current:null,

				last:0
			};

		$(window).off('scroll.bodyscroll').on('scroll.bodyscroll',function($this){

			$this = $(this);

			position.sx = $this.scrollLeft();

			position.sy = $this.scrollTop();
		});

		me.lzfind('.u-tree-pic i.lztree-dropdown').data('lzclick-num',taget.init).off('click.rightPic').on('click.rightPic',function(e,$this,itme){

			var $this = $(this),

				thisData = $this.data('lzclick-num');

			e.stopPropagation();

			$item = $this.closest('.u-tree-item-inner');

			position.pw = $this.width();

			position.ph = $this.height();

			position.mw = $treeMenu.outerWidth();

			position.mh = $treeMenu.outerHeight();

			position.px = $this.offset().left;

			position.py = $this.offset().top;

			$treeMenuAll.hide();

			$('.u-tree-pic i.lztree-dropdown').data('lzclick-num',-1);

			$treeMenu.css({

				left: position.px + position.pw/2 - position.mw/2 + position.sx,

				top: position.py + position.ph/2 + position.sy + 15,

			}).show();

			$this.data('lzclick-num',thisData);

			if($this.data('lzclick-num') != taget.current){

				me.lzfind('.u-tree-pic').css('display','');

				$this.parent().hide().show();

				$treeMenu.show();

				$('.u-tree-item-inner').removeClass(me.currentHover);

				($item.hasClass('z-current') || $item.hasClass('z-current-bgcolor')) ? null : $item.addClass(me.currentHover)

				me.lzfind('.u-tree-pic i').data('lzclick-num',taget.init);

				$this.data('lzclick-num',taget.last);

				taget.current = $this.data('lzclick-num');

			}else{

				me.hideMue($treeMenuAll,$treeMenu,$this,$item,taget)
			}

			
		});

		$(window).off('scroll.allScroll').on('scroll.allScroll',function(){

			me.hideMue($treeMenuAll,$treeMenu,picObj,$items,taget)
		});

		$('.hideTreeMenu-scroll').off('scroll.allScroll').on('scroll.allScroll',function(){

			me.hideMue($treeMenuAll,$treeMenu,picObj,$items,taget)
		});

		$('body,.u-tree-item-inner').off('click.allClick').on('click.allClick',function(){

			me.hideMue($treeMenuAll,$treeMenu,picObj,$items,taget);

		});

		$('.u-tree-menu').off('click.allClick').on('click.allClick',function(){

			me.hideMue($treeMenuAll,$treeMenu,picObj,$items,taget)

		});

		return me;
	}

	lzTreeTool.prototype.autoDo = function(el){

		var me = this,

			MutationObserver = MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;//浏览器兼容

		if(false){

			var config = { attributes: true, childList: true,characterData:true,subtree:true}//配置对象
			
			me.el.parent().each(function(){

					var _this = $(this);

				var observer = new MutationObserver(function() {//构造函数回调

				 	me.init();

					observer.disconnect();

					observer.observe(_this[0],config);

				});

				observer.observe(_this[0], config);
			});

		}else{

			me.isSetSize && setInterval(function(){me.init()},100)

		}

		return me;

	}

	lzTreeTool.prototype.event = function(c){

		var me = this;

		me.setLocation();

		me.itmeHover();

		me.clickHasChild();

		me.clickPic(c);

		return me;
	}

	lzTreeTool.prototype.init = function(){

		var me = this;

		me.layout();

		if(me.isSetSize && me.currentMax != me.maxWid){

			me.currentMax = me.maxWid

			me.getBoxSize();

			me.hasImg();

			me.setSize();

			me.getLocation();
		}

		me.widthArr = [];

		me.treeSize.paddingLeft = 0;

		me.el.show();

		return me;

	}

	$.fn.lzTree = function(c){

	    var me = $(this),
	        newTree;

		$.each(me,function(indexs,el){

			newTree = new lzTreeTool(el);

			newTree.askSetSize();

			newTree.init();

			newTree.unfold();

			newTree.event(c);

			newTree.autoDo(el);

		});

		return newTree

	}

})(jQuery);