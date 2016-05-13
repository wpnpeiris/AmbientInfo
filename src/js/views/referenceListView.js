var app = app || {};

/**
 * 
 */
app.ReferenceListView = Backbone.View.extend({
	
	initialize: function() {
		console.log('Initialize ReferenceList View' ); 
		this.collection = new app.ReferenceList();
		this.render();
	},
  
		
	/**
	 * 
	 */
	reset: function(refs) {
		console.log('Reset References'); 
		this.collection = new app.ReferenceList(refs);
		this.$el.empty();
		this.render();
	},
	
	/**
	 * 
	 */
	remove: function() {
		this.$el.empty();
	},
	
	/**
	 * 
	 */
	render: function() {
		this.collection.each(function( item ) {
			this.renderReference( item );
		}, this );
	},

	/**
	 * 
	 */
	renderReference: function( item ) {
		console.log('Render Reference'  + item); 
		var referenceView = new app.ReferenceView({
			model: item
		});
		this.$el.append( referenceView.render().el );
	}
	
});


