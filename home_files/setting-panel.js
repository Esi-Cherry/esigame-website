
function sittingPanelInit($,id){
	// setHeight
    setRightPanelHeight(id);
	
	// 设置面板方法

	// title
	titleUnlock($,id,'解除固定','固定于屏幕');
	// button icon
	fontIcon($,id);
	
	// input-current
	inputCurrent($,id);


	$(id).find('.lz-style_tip').each(function(index,el){
		var select = $(id).find(el);
		// 边框切换
		//borderCurrent($,select);
		// border-current
		//borderBoxCurrent($,select);
		// font-algin-current
		fontAlgin($, select);
	    // show
		itmeShow($, select);
	});
	// animation switch
	animatSwitch($,id);
	animatRadio($,id + ' .m-radio-switch-box');
	// 位置偏移量选择
	locationOffset($,id);
	
	//切换按钮样式
	addSelectBtn($,id); 
	// 选择应用于页面
	addSelectBackground($,id);
	// 切换图标
	//addchangeIcon($,id);
	// 单选效果
	$.selectRadio(id);

}


