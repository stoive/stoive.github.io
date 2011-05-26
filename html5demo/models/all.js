define(function() {
	// An unused model.
	// SKIP!
	var Support = Backbone.Model.extend({
		defaults: {
			IE: [5.5,6,7,8,9],
			Firefox: [1,2,3,4],
			Chrome: [3,4,5,6,7,8,9,10,11,12],
			Safari: [2,3,4,5],
			Opera: [8,9],
			MobileSafari: [3,4,5],
			MobileChrome: [8,9,10,11,12]
		}
	});
	
	// You create a backbone model object by extending the Backbone.Model
	// prototype.
	var Page = Backbone.Model.extend({
		// Provide a bunch of default public properties
		defaults: {
			source: "",
			support: new Support(),
			viewMode: 'main',
			hasNext: true,
			hasPrev: true
		},
		// This is run on object creation. Think of it as a
		// pre-constructor. In this case, this line is here
		// because we're not binding to a REST service, but
		// rather a static file, so we need to add the index.js
		// bit at the end. Normally, the framework would configure
		// the URL of the resource using the Controller.
		initialize: function() {
			this.url = "pages/" + this.id + "/index.js";
		},
		// This is run every time the controller detects that
		// the model at the end of the  REST service has changed.
		// Think of it as the constructor proper, but is run in-place
		// to replace an existing object.
		parse: function(response) {
			response.support = new Support(response.support);
			var self = this;
			require([response.source], function(source) {
				// since the model in index.js contains only
				// a RequireJS module reference, we must resolve
				// this. 
				self.set({source: source});
			});
			// ...and for now, we don't want to trigger the 'change'
			// event on the source property. Everything else that is
			// returned (that causes a value change) triggers the 'change'
			// event
			delete response.source;
			return response;
		}
	});
	
	var PageCollection = Backbone.Collection.extend({
		model: Page
	});
	
	var Container = Backbone.Model.extend({
		defaults: {
			pages: new PageCollection(),
			currentPage: null,
			currentPageId: "00"
		},
		initialize: function() {
			var self = this;
			
			// The controller tells the model that the user has selected
			// a new current page by updating the currentPageId
			// property. So for the currentPageId property, the
			// data source is the browser's location.hash value
			this.bind("change:currentPageId", function() {
				var currentPageId = this.get("currentPageId");
				var page = this.get("pages").get(currentPageId);
				if (!page) {
					page = new Page({id: currentPageId});
					this.get("pages").add(page);
					function callback() {
						// We want to wait until the Page object
						// has resolved its source property before
						// triggering the event that tells the world
						// that the current page being displayed has
						// changed. Then we clean up after ourselves
						// by removing the event listener
						self.set({currentPage: page});
						page.unbind("change:source", callback);
					}
					page.bind("change:source", callback);
					page.fetch();
				}
				else {
					this.set({currentPage: page});
				}
			});
		}
	});
	
	return {
		Support: Support,
		Page: Page,
		PageCollection: PageCollection,
		Container: Container
	};
});
