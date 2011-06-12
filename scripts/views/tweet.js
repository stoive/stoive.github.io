define(["text!views/templates/tweet.txt", "text!views/templates/feed.txt"], function(tweetTemplate, feedTemplate) {
	
	var TweetCollectionView = Backbone.View.extend({
		tagName: "section",
		id: "twitter-feed",
		render:	function() {
			this.el.innerHTML = Mustache.to_html(
				feedTemplate,
				{
					heading: "twitter",
					items: this.model.toJSON(),
				},
				{
					item: tweetTemplate
				}
			);

			while ($(this.el).children().length > 2 && $(document).height() > $(window).height())
			{
				$(this.el).children().last().remove()
			}

			return this;
		}
	});
	return TweetCollectionView;
});
