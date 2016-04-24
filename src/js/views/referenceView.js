var app = app || {};

/**
 * 
 */
app.ReferenceView = Backbone.View.extend({
	tagName: 'div',
	template: _.template( $('#referenceTemplate').html() ),


	render: function() {
		
		this.$el.html( this.template( this.model.toJSON() ));

		return this;
	}
});
