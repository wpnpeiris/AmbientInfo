cco.predic.views = cco.predic.views || {};

/**
 * 
 */
cco.predic.views.ContentRuleView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template( $('#contentRuleTemplate').html() ),

	render: function() {
		
		this.$el.html( this.template( this.model.toJSON() ));

		return this;
	}
});
