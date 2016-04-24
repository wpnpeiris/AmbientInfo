var app = app || {};

/**
 * 
 */
app.ReferenceListView = Backbone.View.extend({
	el: $( '#referance' ),

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

app.ReferenceListView.instance = null;

app.ReferenceListView.getInstance = function(){
	console.log('Call app.ReferenceListView.getInstance'); 
	if(app.ReferenceListView.instance  == null) {	
		console.log('Initiate app.ReferenceListView'); 	
		app.ReferenceListView.instance = new app.ReferenceListView();		
	}
	
	return app.ReferenceListView.instance;
}; 

