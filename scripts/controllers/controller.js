define(function() {
	var HomeController = Backbone.Controller.extend({
		routes: {
			"": "home",
			"tweets/:id": "tweet",
			"blogs/:id": "blog",
			"checkins/:id": "checkin"
			
		},
		home: function() {
			// nothing?
		},
		tweet: function(id) {

		},
		blog: function(id) {

		},
		checkin: function(id) {

		}
	});
});
