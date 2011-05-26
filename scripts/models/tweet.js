define(function(){
	var Tweet = Backbone.Model.extend({});
	var TweetCollection = Backbone.Collection.extend({
		url: "/feeds/twitter",
		model: Tweet
	});
	
	return {
		Tweet: Tweet,
		TweetCollection: TweetCollection
	};
});
