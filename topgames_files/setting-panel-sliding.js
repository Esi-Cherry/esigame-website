// 滑块公共方法
function clickArrowToSliding($sliding){

	var me = $sliding,

		max = me.getData().max,

		min = me.getData().min;

	$(me.ele).find('.input-arrow-up,.input-arrow-down').off().on('click',function(val){

		var $this = $(this),

			$input = me.getInput();

			val =  me.filter($input);

		if($this.hasClass('input-arrow-up')){

			val < max ? val++ : max;

			me.value(val);

		}else{

			val > min ? val-- : min;

			me.value(val);
		}
	})
}

// 各种滑块
function slidingBgcolor($){

	var $sliding = $('#sliding-bgcolor').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	// 如果有关联自定义操作通过以下内部方法监听

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01

		this.lzfind('.u-sliding-effect').css('backgroundColor','rgba(0,0,0,'+ theVal +')')

		// $sliding.lzfind('.effect') 在当前对象下查找选择器
	});
}
function slidingBgcolor2($){

	var $sliding = $('#sliding-bgcolor2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	// 如果有关联自定义操作通过以下内部方法监听

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01

		this.lzfind('.u-sliding-effect').css('backgroundColor','rgba(0,0,0,'+ theVal +')')

		// $sliding.lzfind('.effect') 在当前对象下查找选择器
	});
}

function slidingBgimg($){

	var $sliding = $('#sliding-bgimg').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01;

		$('.change-bgimg-box').find('.change-bgimg-inner').css({
			'-webkit-opacity':theVal,
			'-moz-opacity':theVal,
			'-ms-opacity':theVal,
			'opacity':theVal
		});

	});

	clickArrowToSliding($sliding);
}
function slidingBgimg2($){

	var $sliding = $('#sliding-bgimg2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01;

		$('.change-bgimg-box').find('.change-bgimg-inner').css({
			'-webkit-opacity':theVal,
			'-moz-opacity':theVal,
			'-ms-opacity':theVal,
			'opacity':theVal
		});

	});

	clickArrowToSliding($sliding);
}

function slidingBorder1($){

	var $sliding = $('#sliding-border1').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false,
		
	});

	clickArrowToSliding($sliding);
}
function slidingBorder2($){

	var $sliding = $('#sliding-border2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	clickArrowToSliding($sliding);
}

function slidingBorder3($){

	var $sliding = $('#sliding-border3').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false,
		
	});

	clickArrowToSliding($sliding);
}
function slidingBorder4($){

	var $sliding = $('#sliding-border4').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	clickArrowToSliding($sliding);
}

function shadowFuzzy($){

	var $sliding = $('#sliding-shadow-fuzzy').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false
		
	});

	clickArrowToSliding($sliding);
}
function shadowFuzzy2($){

	var $sliding = $('#sliding-shadow-fuzzy2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false
		
	});

	clickArrowToSliding($sliding);
}

function shadowSize($){

	var $sliding = $('#sliding-shadow-size').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false
		
	});

	clickArrowToSliding($sliding);
}
function shadowSize2($){

	var $sliding = $('#sliding-shadow-size2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false
		
	});

	clickArrowToSliding($sliding);
}	

function shadowDirection($){

	var $sliding = $('#sliding-shadow-direction').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'°'],
		
	});
}
function shadowDirection2($){

	var $sliding = $('#sliding-shadow-direction2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'°'],
		
	});
}


function shadowOpictyAndColor($){

	var $sliding = $('#sliding-shadow-opicty').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	// 如果有关联自定义操作通过以下内部方法监听

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01

		this.lzfind('.u-sliding-effect').css('backgroundColor','rgba(0,0,0,'+ theVal +')')

		// $sliding.lzfind('.effect') 在当前对象下查找选择器
	});

	clickArrowToSliding($sliding);
}
function shadowOpictyAndColor2($){

	var $sliding = $('#sliding-shadow-opicty2').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'%'],
		
	});

	// 如果有关联自定义操作通过以下内部方法监听

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01

		this.lzfind('.u-sliding-effect').css('backgroundColor','rgba(0,0,0,'+ theVal +')')

		// $sliding.lzfind('.effect') 在当前对象下查找选择器
	});

	clickArrowToSliding($sliding);
}

function slidingDelay($){

	var $sliding = $('#sliding-delay').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false,
		
	});

	// 如果有关联自定义操作通过以下内部方法监听

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01

		this.lzfind('.u-sliding-effect').css('backgroundColor','rgba(0,0,0,'+ theVal +')')

		// $sliding.lzfind('.effect') 在当前对象下查找选择器
	});

	clickArrowToSliding($sliding);

}
function slidingDuration($){

	var $sliding = $('#sliding-duration').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:false,
		
	});

	// 如果有关联自定义操作通过以下内部方法监听

	$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

		var theVal = this.value();	// 获取滑块当前值

		theVal = theVal * 0.01

		this.lzfind('.u-sliding-effect').css('backgroundColor','rgba(0,0,0,'+ theVal +')')

		// $sliding.lzfind('.effect') 在当前对象下查找选择器
	});

	clickArrowToSliding($sliding);

}

function slidingrRotating($){

	var $sliding = $('#sliding-rotating').lzsliding({

		ctrlSelect:{

			box:'.u-sliding',

			bar:'.u-sliding-inner',

			point:'.u-sliding-bar'
		},

		valSelect:{val:'.txt-num'},

		fixed:0,

		openUnit:[true,'°'],
		
	});
}