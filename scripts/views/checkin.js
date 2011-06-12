define(["text!views/templates/checkin-small.txt", "text!views/templates/feed.txt"], function(checkinTemplate, feedTemplate) {

	var CheckinCollectionView = Backbone.View.extend({
		tagName: "section",
		id: "twitter-feed",
		render:	function() {
			this.el.innerHTML = Mustache.to_html(
				feedTemplate,
				{
					heading: "github",
					items: this.model.toJSON(),
				},
				{
					item: checkinTemplate
				}
			);
			
			while ($(document).height() > 300 && $(document).height() > $(window).height())
			{
				$(this.el).children().last().remove()
			}
			
			return this;
		}
	});
	return CheckinCollectionView;
});
