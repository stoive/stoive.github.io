define(function(){
	var Blog = Backbone.Model.extend({});
	var BlogCollection = Backbone.Collection.extend({
		url: "/feeds/blog",
		model: Blog
	});
	return {
		Blog: Blog,
		BlogCollection: BlogCollection
	}
});
