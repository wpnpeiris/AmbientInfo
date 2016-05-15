var app = app || {};

/**
 * 
 */
app.InsightListView = Backbone.View.extend({
	el: $( '#insight-reference' ),
	
	reset: function(ref) {
		console.log('Reset References'); 
		this.collection = new app.InsightList([ref]);
		this.$el.empty();
		this.render();
	},
	
	render: function() {
		this.collection.each(function( item ) {
			this.renderInsight( item );
		}, this );
	},
	
	renderInsight: function( item ) {
		console.log('Render InsightView'  + item); 
		var insightView = new app.InsightView({
			model: item
		});
		this.$el.append( insightView.render().el );
	}
	
});

app.InsightListView.instance = null;

app.InsightListView.getInstance = function(){
	console.log('Call app.InsightListView.getInstance'); 
	if(app.InsightListView.instance  == null) {	
		console.log('Initiate app.InsightListView'); 	
		app.InsightListView.instance = new app.InsightListView();		
	}
	
	return app.InsightListView.instance;
}; 

