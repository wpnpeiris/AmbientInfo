var app = app || {};

/**
 * 
 */
app.InsightView = Backbone.View.extend({
	tagName: 'div',
	template: _.template( $('#insightTemplate').html() ),


	render: function() {
		//this.$el.html( this.template( JSON.stringify(this.model)));
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	}
});
