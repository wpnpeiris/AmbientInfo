var app = app || {};

/**
 * 
 */
app.Product = Backbone.Model.extend({
	defaults: {
		brand: 'Unknown',
		productType: 'Unknown',
		modelCode: 'Unknown'
	} 
});
