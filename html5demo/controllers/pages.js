define(function(){
	var Pages = Backbone.Controller.extend({
		routes: {
			// This will cause the Controller to
			// raise an event notifying that the user
			// has navigated to a different page, e.g. #pages/12.
			// On the left is the URL template, on the
			// right is the name of the event that will be raised.
			// The :page bit captures the part after the slash in the
			// hash and passes it as a parameter in the event object
			"pages/:page": "page"
		},
		page: function() {
		}
	});
	return {
		Pages: Pages
	}
});
