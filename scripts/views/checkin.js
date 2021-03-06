define(["text!views/templates/checkin-small.txt", "text!views/templates/feed.txt"], function(checkinTemplate, feedTemplate) {

	var CheckinCollectionView = Backbone.View.extend({
		tagName: "section",
		id: "github-feed",
		render:	(function() {
			var existing = [];
			return function() {
				if (this.$('h2').length === 0) {
					this.el.innerHTML = Mustache.to_html(
						feedTemplate,
						{ heading: "github" }
					);
				}	
				
				// detect new items
				var additional = [], 
					feed = this.model.toJSON(),
					curr;
				while (!_.isEqual(curr = feed.shift(), existing[0])) additional.push(curr);
				
				// add new items to the top
				for (var i = additional.length - 1; i >=  0; --i) {
					this.$('h2').after(Mustache.to_html(
						checkinTemplate,
						additional[i]
					));
					// animate if this is a new item
					if (existing.length > 0) this.$('article').each(function(i, el) {
						$(el).addClass('new');
						setTimeout(function() { $(el).removeClass('new'); });
					});
				}
				
				// remove items which drop off the bottom of the screen
				while ($(this.el).children().length > 2 && $(document).height() > $(window).height())
				{
					$(this.el).children().last().remove()
				}

				existing = feed;
				return this;
			}
		})()
	});
	return CheckinCollectionView;
});
