var app = app || {};

/**
 * 
 */
app.Insight = Backbone.Model.extend({
	defaults: {
		topic: 'Unknown',
		scorePercantage: [],
		veryNegative: 0,
		negative: 0,
		neutral: 0,
		positive: 0,
		veryPositive: 0
	}
});
