var app = app || {};

/**
 * 
 */
app.Reference = Backbone.Model.extend({
	defaults: {
		ref_id: 'Unknown',
		ref_desc: [],
		ref_uri: 'Unknown',
		ref_content: 'Unknown',		
		ref_lang: 'Unknown',		
		ref_content_type: 'Unknown',	
		rel_ref: 'Unknown',
		ref_type: 'Unknown',
		ref_category: [],
		rel_ref: [],
		
		apt_gender: 'Unknown',
		apt_region: [],
		apt_level: [],
		apt_age: [],
		
		tags: [],
		rank_score: 0
	},

	/**
	 * 
	 */
	parseRefDescription: function() {
		console.log("app.Reference parseRefDescription");
		return this.ref_desc;
	}
});
