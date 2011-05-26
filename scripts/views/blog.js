define(["text!views/templates/blog-small.txt", "text!views/templates/feed.txt"], function(blogTemplate, feedTemplate) {

	
	var BlogCollectionView = Backbone.View.extend({
		tagName: "section",
		id: "twitter-feed",
		render:	function() {
			this.el.innerHTML = Mustache.to_html(
				feedTemplate,
				{
					heading: "blog",
					items: this.model.toJSON(),
				},
				{
					item: blogTemplate
				}
			);

			setTimeout(function() {
				this.$('p').each(function(i, e) {
					e.innerHTML.replace(/[\d%]+/g, "<span class='digits'>$&</span>");
				});
			}, 0);

			return this;
		}
	});
	
	return BlogCollectionView;
});
