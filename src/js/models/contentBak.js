ambient.predic.models = ambient.predic.models || {};

/**
 * 
 */
ambient.predic.models.Content = Backbone.Model.extend({
	defaults: {
		ref_id: 'Unknown',
		ref_desc: [],
		ref_uri: 'Unknown',
		ref_content: 'Unknown',		
		ref_lang: 'Unknown',		
		ref_content_type: 'Unknown',	
		ref_type: 'Unknown',
		ref_category: [],
		rel_ref: [],
		
		apt_gender: 'Unknown',
		apt_region: [],
		apt_level: [],
		apt_age: [],
		
		tags: []
	},
	
	url: "http://localhost:9000/contentrules/save",
	
	validation: {
		ref_id: {
            required: true
        },
        ref_uri: {
            required: true,
            pattern: 'url'
        }
	},
	 
	save: function(){
		console.log("Save Content ");
		
		$.post( this.url, {data: JSON.stringify(this.toJSON())}, function(data) {
			if(data == "SUCCESS") {
				alert("successfully saved");
			} else {
				alert("Error !!!");
			}
		});
	}
});
