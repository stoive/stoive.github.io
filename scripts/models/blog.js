define(function(){
	var Blog = Backbone.Model.extend({});
	var BlogCollection = Backbone.Collection.extend({
		url: "/feeds/stackoverflow",
		model: Blog
	});
	return {
		Blog: Blog,
		BlogCollection: BlogCollection
	}
});
