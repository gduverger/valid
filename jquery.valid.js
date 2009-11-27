/*
 * Valid - jQuery plugin
 * jQuery plugin to validate forms
 * Author: Georges Duverger
 */

// Methods attached to the jQuery.fn object

// Validate one input or an entire form
// ex.: $("input#example").valid()
// ex.: $("form#example").vaild()
//
// With or without callbacks
// ex.: $("input#example").valid({
//	success: function(selector) { … },
//	error: function(selector, error) { … },
//	complete: function(selector, validity) { … }
// })

jQuery.fn.valid = function(options) {
	// Declare the default callabacks
	var defaults = {
		success: function(selector) { $(selector).removeClass("invalid"); $(selector).addClass("valid") },
		error: function(selector, error) { $(selector).removeClass("valid"); $(selector).addClass("invalid") },
		complete: function(selector, validity) {}
	};
	var settings = $.extend({}, defaults, options);
	
	var validity = true;
	this.each(function(){
		// Mandatory double code to preserve the 'this' in the DOM
		// If the current event as a data-valid attribute
		if($(this).attr("data-valid")) {
			try {
				// Evaluate the method in the data-valid attribute
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
		// Otherwise, we look for descendants with a data-valid attribute
		$("[data-valid]", this).each(function() {
			try {
				// Evaluate the method in the data-valid attribute
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

// Source: http://acmesoffware.com/acme/default.asp
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