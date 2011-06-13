define(function(){
	var LastFm = Backbone.Model.extend({});
	var LastFmCollection = Backbone.Collection.extend({
		url: "/feeds/lastfm",
		model: LastFm
	});
	return {
		LastFm: LastFm,
		LastFmCollection: LastFmCollection
	}
});

