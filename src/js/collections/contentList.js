cco.predic.models = cco.predic.models || {};

/**
 * 
 */
cco.predic.models.ContentList = Backbone.Collection.extend({
	model: cco.predic.models.Content,
	url:  cco.predic.CONTENT_SERVICE_ENPOINT + "/contents", 
	
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
