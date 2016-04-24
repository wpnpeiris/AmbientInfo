var app = app || {};

/**
 * 
 */
app.MyProductView = Backbone.View.extend({
	tagName: 'div',
	className: 'item',
	template: _.template( $('#myProductTemplate').html() ),

	events: {
		'click #delete': 'deleteProduct'
	},

	/**
	 * 
	 */
	deleteProduct: function() {
		this.model.destroy();

		this.remove();
	},

	/**
	 * 
	 */
	render: function() {
		
		this.$el.html( this.template( this.model.toJSON() ));

		return this;
	}
});
