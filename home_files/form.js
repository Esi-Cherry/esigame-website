//form
function switchBtn(v, className,callback) {
    var $switchSelect = $.switchSelect();

    // m-switch
    $switchSelect.off('click').on("click", function () {
        var $other = $(this).closest(className).find(v);
        if ($(this).closest(className).size()) {
            if (!$(this).hasClass('chacked')) {
                $other.removeClass('checked')
            }
        }
        $(this).toggleClass("checked");
        if (typeof (callback) == "function") {
            callback();
        }
    });
}; 


(function(){
    $(".formshow-info").each(function(){
		var titleWidth= $(this).next().width();
		$(this).css("padding-left",titleWidth);
    });
})(jQuery);


(function($){

	$.extend({
		switchSelect:function(v){

			if(v != null){

				return $(v).find('.m-switch');
			}else{

				return $('.m-switch');
			}

		},

		isWin:function(v){
			return v && typeof v === 'object' && 'setInterval' in v; 
		},
		selectRadio:function(v){
			$.isWin(v) && (me = 'body');
			$(v).find('.radio-custom > input[type=radio]').each(function () {
				var $this = $(this);
				if ($this.data('radio')) return;
				$this.radio($this.data());
			});
		},
		selectCheckBox:function(v){
			$.isWin(v) && (me = 'body');
			$(v).find('.checkbox-custom > input[type=checkbox]').each(function () {
				var $this = $(this);
				if ($this.data('checkbox')) return;
				$this.checkbox($this.data());
			});
		}
	})

})(jQuery);

/*
 * Fuel UX Checkbox
 */
(function($){

	var old = $.fn.checkbox;

	// CHECKBOX CONSTRUCTOR AND PROTOTYPE

	var Checkbox = function (element, options) {

		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkbox.defaults, options);

		// cache elements
		this.$label = this.$element.parent();
		this.$icon = this.$label.find('i');
		this.$chk = this.$label.find('input[type=checkbox]');

		// set default state
		this.setState(this.$chk);

		// handle events
		this.$chk.on('change', $.proxy(this.itemchecked, this));
	};

	Checkbox.prototype = {

		constructor: Checkbox,

		setState: function ($chk) {
			$chk = $chk || this.$chk;

			var checked = $chk.is(':checked');
			var disabled = !!$chk.prop('disabled');

			// reset classes
			this.$icon.removeClass('checked disabled');
			this.$label.removeClass('checked disabled');

			// set state of checkbox
			if (checked === true) {
				this.$icon.addClass('checked');
				this.$label.addClass('checked');
			}
			if (disabled === true) {
				this.$icon.addClass('disabled');
				this.$label.addClass('disabled');
			}
		},

		enable: function () {
			this.$chk.attr('disabled', false);
			this.$icon.removeClass('disabled');
			this.$label.removeClass('disabled');
		},

		disable: function () {
			this.$chk.attr('disabled', true);
			this.$icon.addClass('disabled');
			this.$label.addClass('disabled');
		},

		toggle: function () {
			this.$chk.click();
		},

		itemchecked: function (e) {
			var chk = $(e.target);
			this.setState(chk);
		},
		
		check: function () {
			this.$chk.prop('checked', true);
			this.setState(this.$chk);
		},
		
		uncheck: function () {
			this.$chk.prop('checked', false);
			this.setState(this.$chk);
		},
		
		isChecked: function () {
			return this.$chk.is(':checked');
		}
	};


	// CHECKBOX PLUGIN DEFINITION

	$.fn.checkbox = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data('checkbox');
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('checkbox', (data = new Checkbox(this, options)));
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.checkbox.defaults = {};

	$.fn.checkbox.Constructor = Checkbox;

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	};


	// CHECKBOX DATA-API

	$(function () {
		$(window).on('load', function () {
			$.selectCheckBox(this)
		});
	});
})(jQuery);

/*
 * Fuel UX Radio
 */
(function($){
	var old = $.fn.radio;

	// RADIO CONSTRUCTOR AND PROTOTYPE

	var Radio = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.radio.defaults, options);

		// cache elements
		this.$label = this.$element.parent();
		this.$icon = this.$label.find('i');
		this.$radio = this.$label.find('input[type=radio]');
		this.groupName = this.$radio.attr('name');

		// set default state
		this.setState(this.$radio);

		// handle events
		this.$radio.on('change', $.proxy(this.itemchecked, this));
	};

	Radio.prototype = {

		constructor: Radio,

		setState: function ($radio) {
			$radio = $radio || this.$radio;

			var checked = $radio.is(':checked');
			var disabled = !!$radio.prop('disabled');

			this.$icon.removeClass('checked disabled');
			this.$label.removeClass('checked');

			// set state of radio
			if (checked === true) {
				this.$icon.addClass('checked');
				this.$label.addClass('checked');
			}
			if (disabled === true) {
				this.$icon.addClass('disabled');
			}
		},

		resetGroup: function () {
			var group = $('input[name="' + this.groupName + '"]');

			// reset all radio buttons in group
			group.next().removeClass('checked');
			group.parent().removeClass('checked');
		},

		enable: function () {
			this.$radio.attr('disabled', false);
			this.$icon.removeClass('disabled');
		},

		disable: function () {
			this.$radio.attr('disabled', true);
			this.$icon.addClass('disabled');
		},

		itemchecked: function (e) {
			var radio = $(e.target);

			this.resetGroup();
			this.setState(radio);
		},

		check: function () {
			this.resetGroup();
			this.$radio.prop('checked', true);
			this.setState(this.$radio);
		},

		uncheck: function () {
			this.$radio.prop('checked', false);
			this.setState(this.$radio);
		},

		isChecked: function () {
			return this.$radio.is(':checked');
		}
	};


	// RADIO PLUGIN DEFINITION

	$.fn.radio = function (option) {
		var args = Array.prototype.slice.call( arguments, 1 );
		var methodReturn;

		var $set = this.each(function () {
			var $this   = $( this );
			var data    = $this.data( 'radio' );
			var options = typeof option === 'object' && option;

			if( !data ) $this.data('radio', (data = new Radio( this, options ) ) );
			if( typeof option === 'string' ) methodReturn = data[ option ].apply( data, args );
		});

		return ( methodReturn === undefined ) ? $set : methodReturn;
	};

	$.fn.radio.defaults = {};

	$.fn.radio.Constructor = Radio;

	$.fn.radio.noConflict = function () {
		$.fn.radio = old;
		return this;
	};

	// RADIO DATA-API

	$(function () {
		$(window).on('load', function () {
			$.selectRadio(this);
		});
	});
})(jQuery);

