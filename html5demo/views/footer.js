define(['text!views/footer.htm!strip'], function(source) {
	var View = Backbone.View.extend({
		tagName: "footer",
		initialize: function() {
			var self = this;
			this.model.bind("change:currentPage", function() {
				self.render();
			});
			this.render();
		},
		render:	function() {
			var prev = "", 
				next = "", 
				curr = 0;
			curr = parseInt(this.model.get("currentPage").id, 10);
			if (curr > 0 && this.model.get("currentPage").get("hasPrev")) {
				prev = (curr - 1).toString();
				while (prev.length < 2) prev = "0" + prev;
				prev = "#pages/" + prev;
			}
			if (this.model.get("currentPage").get("hasNext")) {
				next = (curr + 1).toString();
				while (next.length < 2) next = "0" + next;
				next = "#pages/" + next;
			}
			this.el.innerHTML = Mustache.to_html(source, {
				prev: prev,
				next: next
			});
			if (!this.model.get("currentPage").get("hasPrev")) {
				this.$('#prev').hide();
			}
			if (!this.model.get("currentPage").get("hasNext")) {
				this.$('#next').hide();
			}
			return this;
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
