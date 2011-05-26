require(["models/all", "controllers/pages", "views/header", "views/article", "views/footer"], function(model, controller, header, article, footer) {
	// Think of this as an asax.cs file. It sets up the MVC
	// container, and starts the application.
	require.ready(function() {
		// Some code to handle when the HTML5 Application Cache
		// object has been updated
		if (window.applicationCache) applicationCache.onupdateready = function() { applicationCache.swapCache() };
		
		var containerModel = new model.Container();
		var pagesController = new controller.Pages();
		
		var headerView = null;
		var articleView = null;
		var footerView = null;

		// Bind models to controller
		pagesController.bind("route:page", function(page) {
			containerModel.set({currentPageId: page});
		});
		// bind views to models
		containerModel.bind("change:currentPage", function() {
			// Create a view, and pass it the model (first parameter) that
			// it should bind to. Second parameter is where the view will draw
			// itself
			headerView = header.create(containerModel.get("currentPage"), headerView);
			articleView = article.create(containerModel.get("currentPage"), articleView);
			footerView = footer.create(containerModel, footerView);
			
			// Attach the view - since when the first load happens, there's
			// no elements to draw to. On subsequent view updates, the existing
			// element gets updated or replaced.
			if ($(document.body).has(headerView).length == 0) document.body.appendChild(headerView);
			if ($(document.body).has(articleView).length == 0) document.body.appendChild(articleView);
			if ($(document.body).has(footerView).length == 0) document.body.appendChild(footerView);
		});

		// Get this baby started, navigate to first page if no page specified
		Backbone.history.start();
		if (document.location.hash === "" || document.location.hash === "#") document.location.hash = "pages/01";
	});
});
