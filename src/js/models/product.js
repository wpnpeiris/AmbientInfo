var app = app || {};

/**
 * 
 */
app.Product = Backbone.Model.extend({
	defaults: {
		manufacturer: 'Unknown',
		type: 'Unknown',
		model: 'Unknown'
	} 
});
