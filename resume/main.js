require(['jquery-1.8.0.min', 'underscore-min'], function() {
	$(function() {
		$('button.get-email').click(function() {
			var a = document.createElement('a');
			a.href = "m1a2i3l4t5o6:7s8t9e0v1e2n3@4s5t6h7u8r9l0o1w2.3c4o5m6";
			a.href = a.href.replace(/\d/g, '');
			$(a).text(a.href.replace('mailto:', ''));
			$(this).replaceWith(a);
		});
	});
});
