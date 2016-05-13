ambient.predic.models = ambient.predic.models || {};

/**
 * 
 */
ambient.predic.models.ContentList = Backbone.Collection.extend({
	model: ambient.predic.models.Content,
	url:  ambient.predic.CONTENT_SERVICE_ENPOINT + "/contents", 
	
	/**
	 * Overwrite Backbone.Collection.fetch function
	 */
	fetch: function() {
		console.log('Fetch ContentList' ); 
		var thisCollection = this;
		$.getJSON( this.url, function( data ) {
			thisCollection.reset(data);
		});
	},
	
	clearAll: function() {
		 this.models = [];
	}
	
});
