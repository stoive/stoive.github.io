define(['text!views/header.htm!strip'], function(source) {
	var View = Backbone.View.extend({
		tagName: 'header',
		initialize: function() {
			var self = this;
			this.model.bind('change:viewMode', function() {
				if (self.model.get('viewMode') === 'main') {
					self.$('a').removeClass('selected');
					self.$('#view').addClass('selected');
				}
				else if (self.model.get('viewMode') === 'source') {
					self.$('a').removeClass('selected');
					self.$('#source').addClass('selected');
				}
				else if (self.model.get('viewMode') === 'support') {
					self.$('a').removeClass('selected');
					self.$('#support').addClass('selected');
				}
			});
			this.render();
			self.$('#view').addClass('selected');
		},
		render:	function() {
			this.el.innerHTML = source;
			return this;
		},
		events: {
			'click #view': 'main',
			'click #source': 'source',
			'click #support': 'support'
		},
		main: function() {
			this.model.set({viewMode: 'main'});
		},
		support: function() {
			this.model.set({viewMode: 'support'});
		},
		source: function() {
			this.model.set({viewMode: 'source'});
		}
	});
	return {
		create: function(model, el) {
			var view = new View({
				model: model,
				el: el
			});
			return view.el;
		}
	}
});
