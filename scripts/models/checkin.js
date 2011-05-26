define(function(){

	var Checkin = Backbone.Model.extend({});
	var CheckinCollection = Backbone.Collection.extend({
		url: "/feeds/github",
		model: Checkin
	});
	return {
		Checkin: Checkin,
		CheckinCollection: CheckinCollection
	};
});
