/*
 * Valid - jQuery plugin
 * Author: Georges Duverger
 */

// Methods attached to the jQuery.fn object

jQuery.fn.valid = function(options) {
	var defaults = {
		success: function(selector) { $(selector).removeClass("invalid"); $(selector).addClass("valid") },
		error: function(selector, error) { $(selector).removeClass("valid"); $(selector).addClass("invalid") },
		complete: function(selector, validity) {}
	};
	var settings = $.extend({}, defaults, options);
	
	var validity = true;
	this.each(function(){
		// Mandatory double code to preserve the 'this' in the DOM
		if($(this).attr("data-valid")) {
			try {
				if(eval($(this).attr("data-valid"))) {
					settings["success"](this);
				} else {
					throw "Error";
				}
			} catch(error) {
				settings["error"](this, error);
				validity = false;
			}
		}
		$("[data-valid]", this).each(function() {
			try {
				if(eval($(this).attr("data-valid"))) {
					settings["success"](this);
				} else {
					throw "Error";
				}
			} catch(error) {
				settings["error"](this, error);
				validity = false;
			}
		})
	});
	
	settings["complete"](this, validity);
	return this;
};

// http://acmesoffware.com/acme/default.asp
function isInteger(s) {
	// console.log("s: "+s)
	var i;
	if (isEmpty(s))
	if (isInteger.arguments.length == 1) return 0;
	else return (isInteger.arguments[1] == true);
	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (!isDigit(c)) throw (s+" is not an integer");
	}
	return true;
};

function isEmpty(s) {
	return ((s == null) || (s.length == 0))
};

function isDigit(c) {
	return ((c >= "0") && (c <= "9"))
};