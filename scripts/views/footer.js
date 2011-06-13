define(["text!views/templates/lastfm.txt", "text!views/templates/lastfm-item.txt"], function(feedTemplate, itemTemplate) {
	var LastFmView = Backbone.View.extend({
		tagName: "footer",
		id: "lastfm-feed",
		render:	(function() {
			var existing = [];
			return function() {
				if (this.$('span.desc').length === 0) {
					this.el.innerHTML = feedTemplate;
				}
				
				// detect new items
				var additional = [], 
					feed = this.model.toJSON(),
					curr;
				while (!_.isEqual(curr = feed.shift(), existing[0])) additional.push(curr);
				
				// add new items to the top
				for (var i = additional.length - 1; i >=  0; --i) {
					this.$('span.desc').after(Mustache.to_html(
						itemTemplate,
						additional[i]		
					))
				}
			}
		})()
	});

	return LastFmView;
});
