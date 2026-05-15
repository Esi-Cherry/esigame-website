
//追加弹出框

function addSelectBtn($,id){
}

function addSelectBackground($,id){

	$(id).find('.appliedTo').off('click.changeBtn').on('click.changeBtn',function(){

		if($('body').find('#layer-applied-page').get(0) == undefined){

			$.doAjaxInner({

				urlVal:'Setting-panel/pop-up-layer/layer-applied-page.html',
				dataFun: $.addInnerLayer,
				boxID:'#layer-applied-page',
				obj:'.layer-applied-page',
			})
		}else{

			$('#layer-applied-page').show();
		}
	})
	
}

//function addchangeIcon($,id){

//	$(id).find('#change-select-icon').off('click.changeIcon').on('click.changeIcon',function(){

//		if($('body').find('#layer-applied-page').get(0) == undefined){

//			$.doAjaxFix({
//				urlVal:'Setting-panel/pop-up-layer/layer-change-icon.html',
//				dataFun: $.addchangeIcons
//			})

//		}else{

//			$('#layer-change-icon').modal('show');
//		}

//	})
//}

function addlinkPage($,id){

	$(id).find('#link-select-page').off('click.linkPage').on('click.linkPage',function(){

		if($('body').find('#layer-link-page').get(0) == undefined){

			$.doAjaxFix({
				urlVal:'Setting-panel/pop-up-layer/layer-link-page.php',
				dataFun: $.addlinkPage
			})

		}else{

			$('#layer-link-page').modal('show');
		}
	})

}

function addArticle($,id){

	$(id).find('#link-select-article').off('click.linkPage').on('click.linkPage',function(){

		if($('body').find('#layer-link-article').get(0) == undefined){

			$.doAjaxFix({
				urlVal:'Setting-panel/pop-up-layer/layer-link-content.php',
				idVal:'article',
				boxID:'#layer-link-article',
				dataFun: $.addlinkContent
			})

		}else{

			$('#layer-link-article').modal('show');

		} 
	})
}

function addProduct($,id){

	$(id).find('#link-select-product').off('click.linkPage').on('click.linkPage',function(){

		if($('body').find('#layer-link-product').get(0) == undefined){

			$.doAjaxFix({
				urlVal:'Setting-panel/pop-up-layer/layer-link-content.php',
				idVal:'product',
				boxID:'#layer-link-product',
				dataFun: $.addlinkContent
			})

		}else{

			$('#layer-link-product').modal('show');
			

		} 
	})
}

function addFile($,id){

	$(id).find('#link-select-file').off('click.linkPage').on('click.linkPage',function(){

		if($('body').find('#layer-link-file').get(0) == undefined){

			$.doAjaxFix({
				urlVal:'Setting-panel/pop-up-layer/layer-link-content.php',
				idVal:'file',
				boxID:'#layer-link-file',
				dataFun: $.addlinkContent
			})

		}else{

			$('#layer-link-file').modal('show');
		} 
	})
}

;(function($){

	$.extend({

		doAjaxFix:function(stute){ 

			$.ajax({
				url: stute.urlVal,
				type: 'GET',
				dataType: 'html',
				data: {id: stute.idVal},
			})
			.done(function(data) {
				$('body script').eq(0).before(data);
				stute.dataFun(stute.boxID)
			})
		},

		doAjaxInner:function(stute){ 

			$.ajax({
				url: stute.urlVal,
				type: 'GET',
				dataType: 'html',
				data: {id: stute.idVal},
			})
			.done(function(data) {
				$(stute.obj).append(data);
				stute.dataFun(stute.boxID)
			})
		},

		linkItmeAffter:function(id){

			$(id + ' .radio-itme label').off('click.lz-link').on('click.lz-link',function(){

				var $this = $(this);

				if($this.find('input[type="radio"]').prop('checked')){

					if(!$this.closest('.radio-itme').hasClass('current')){

						$this.closest('.u-link-box').find('.radio-itme').removeClass('current');

						$this.closest('.radio-itme').addClass('current')
					};
				}
			})
		},

		// 无分类单选弹窗
		addlinkPage:function(){

			$('#layer-link-page').modal('show');

			$('#layer-link-page .fixation-scroll').lzscroll({mode:'hover',listenChange:false,speed:30});

			$.selectRadio('#layer-link-page');

			$.linkItmeAffter('#layer-link-page')

		},

		// 有分类单选弹窗
		addlinkContent:function($id){

			$($id).modal('show');

			$($id + ' .fixation-scroll').lzscroll({mode:'hover',speed:30});

			$($id + '.list-scroll').lzscroll({mode:'hover',listenChange:false,speed:30});

			$.selectRadio($id);

			$.linkItmeAffter($id)

		},

		addchangeIcons:function($id){

			$('#layer-change-icon').modal('show');

			$('#layer-change-icon .fixation-scroll').lzscroll({mode:'hover',listenChange:false,speed:30});


		},

		addInnerLayer:function(select){
			$(select).show();
			var changemodalSscroll = $(window).height() - 90;
			$(select + ' .changemodal-scroll').css('height',changemodalSscroll);
			$(window).resize(function(event) {
				var changemodalSscroll = $(window).height() - 90;
				$(select + ' .changemodal-scroll').css('height',changemodalSscroll);
			});

			sideWinClose(select)
		}

	});

})(jQuery);



