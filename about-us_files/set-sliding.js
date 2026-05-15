// 滑块公共方法
function clickArrowToSliding($sliding) {
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

$.extend({

	sliding:function (slidingId,bool,unit){

		return $(slidingId).lzsliding({

			ctrlSelect:{

				box:'.u-sliding',

				bar:'.u-sliding-inner',

				point:'.u-sliding-bar'
			},

			valSelect:{val:'.txt-num'},

			fixed:0,

			openUnit:[bool,unit],
			
		}); 

	},

	slidingResponse: function (response,$sliding,fun){

		// 如果有关联自定义操作通过以下内部方法监听

		$sliding.on('effect',function(){ // 内部方法‘effect’监听值改变,通过on绑定

			var theVal = this.value();	// 获取滑块当前值

			theVal = theVal * 0.01;

			fun(response,$sliding,theVal);

			// $sliding.lzfind('.effect') 在当前对象下查找选择器
		});
	}
});
// 响应层函数
function doSth1(response,$sliding,theVal){

	$sliding.lzfind(response + ' .sp-preview-inner').css('backgroundColor','rgba(0,0,0,'+ theVal +')')
}

function doSth2(response,$sliding,theVal){

	$($sliding.ele).parent().find('.change-bgimg-box .change-bgimg-inner').css({
		'-webkit-opacity':theVal,
		'-moz-opacity':theVal,
		'-ms-opacity':theVal,
		'opacity':theVal
	});
}

function slidingObj(lzselect, operation, $sliding, response, dataArr, unit, hasArrow, flag, arrFlag, callback) {
    return;
	$(lzselect).each(function(index, el) {
		response = $(el).data('lzresponse');

		response==null && (response = '.sp-preview');

		operation = $(el).data('lzselect');

		arrFlag = $(el).find('.lz-form').data('lzunit');

		dataArr = arrFlag != false && arrFlag != undefined  ? $(el).find('.lz-form').data('lzunit').split(" ") : ['false']; 

		unit = dataArr[0] === 'true' ? dataArr[1] : null;

		hasArrow = $(el).find('.u-input-arrow').get(0) != undefined;

		flag = response != undefined ;

		flag && (callback = $(el).find(response).get(0)!= undefined ?  doSth1 : doSth2 );

		el.sliding = $.sliding(el,dataArr[0],unit);

		flag && $.slidingResponse(response,el.sliding,callback);

		hasArrow && clickArrowToSliding(el.sliding);

	});

$('.lz-sliding').lzslidingTool();


}

