Valid
=====

Validate entries is a recurring (and annoying) task to perform when implementing Web forms.

Here is how jquery.valid.js can help: first, **add a `data-valid` attribute** to inputs that need to be validated. You can use all kind of validation methods in that attribute (such as `isInteger` and `isDigit`) or define your own. Then, **call the `valid` method** on an `input` (`text`, `radio`, `checkbox`), a `textarea`, or an entire `form`. Note that you can override callbacks which will be called upon success, error, and completion.

Default validation
------------------

HTML:

	<input type="text" id="input" data-valid="isInteger(this.value)">
	<input type="button" value="Valid" onclick="$('#input').valid()">
	
Overrided callbacks
-------------------

HTML:

	<form>
		<input type="text" name="digit" data-valid="isDigit(this.value)">
		<input type="text" name="integer" data-valid="isInteger(this.value)">
		<input type="submit" value="Valid">
	</form>

JavaScript:

	$("form").submit(function(event) {
		$(this).valid({
			success: function(selector) { alert("Success: "+$(selector).attr("name")) },
			error: function(selector) { alert("Error: "+$(selector).attr("name")) },
			complete: function(validity) { alert("Complete: "+validity) }
		})
	})