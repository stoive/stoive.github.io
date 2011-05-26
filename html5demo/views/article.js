define(['text!views/article.htm!strip'], function(source) {
	// This of this file as a aspx.cs file - the codebehind
	// to the view. It's task is to handle events that affect
	// the view
	function show(el) {
		el.style.opacity = 1;
	}
	function hide(el) {
		el.style.opacity = 0;
	}
	var View = Backbone.View.extend({
		tagName: 'article',
		// consider this an OnInit event, it binds the view
		// to changes to the model that has been passed to it,
		// and pushes changes that the view causes to the model
		// back.
		initialize: function() {
			var self = this;
			this.model.bind("change:viewMode", function() {
				if (self.model.get("viewMode") == 'main') {
					self.$(".main").show();
					self.$(".source").hide();
					setTimeout(function() {
						show(self.$(".main")[0]);
						hide(self.$(".source")[0]);
					}, 0);
				}
				else if (self.model.get("viewMode") == 'source') {
					self.$(".main").hide();
					self.$(".source").show();
					setTimeout(function() {
						hide(self.$(".main")[0]);
						show(self.$(".source")[0]);
					}, 0);
				}
			});
			this.render();
			this.model.set({viewMode: 'main'});
			this.$(".source").hide();
			hide(this.$(".source")[0]);
		},
		// Similarly, here is an OnLoad-like event, which can be called
		// ad-hoc to re-render the view. Typically, you might bind this to
		// any of the change events on the model which would affect what the
		// view displays
		render:	function() {
			// IE <= 8 workaround, innerHTML parses html5 elements as singletons
			// when set via innerHTML where the element is already part of the
			// document 
			var parent = this.el.parentNode;
			if (parent) this.remove();
			this.el = document.createElement(this.tagName).cloneNode(true);
			if (parent) parent.appendChild(this.el);
			
			// This executes the Mustache template we had before.
			this.el.innerHTML = Mustache.to_html(
				source,
				{
					source: this.model.get("source")
				},
				{
					main: this.model.get("source")
				});
			// Script tags added via innerHTML don't get executed by default
			// Also, wait until the DOM has reloaded
			var self = this;
			setTimeout(function() {
				var scripts = self.el.getElementsByTagName('script');
				for (var i = 0; i < scripts.length; i++) {
					eval(scripts[i].innerHTML);
				}
			}, 0)
			return this;
		},
		events: {
			'click #refresh': 'refresh',
			'click #source': 'source',
			'click #return': 'return'
		},
		refresh: function() {
			this.model.set({viewMode: 'main'});
		},
		source: function() {
			this.model.set({viewMode: 'source'});
		},
		'return': function() {
			this.model.set({viewMode: 'main'});
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
