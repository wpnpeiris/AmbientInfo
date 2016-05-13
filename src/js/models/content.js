ambient.predic.models = ambient.predic.models || {};

/**
 * 
 */
ambient.predic.models.Content = Backbone.Model.extend({
	defaults: {
		id: 'Unknown',
//		ref_desc: [],
//		ref_uri: 'Unknown',
//		ref_content: 'Unknown',		
//		ref_lang: 'Unknown',		
//		ref_content_type: 'Unknown',	
//		ref_type: 'Unknown',
//		ref_category: [],
//		rel_ref: [],
//		
//		apt_gender: 'Unknown',
//		apt_region: [],
//		apt_level: [],
//		apt_age: [],
//		
//		tags: [],
		version: 0
	},
	
	url:  ambient.predic.CONTENT_SERVICE_ENPOINT + "/contents",
	
	validation: {
		ref_id: {
            required: true
        },
        ref_uri: {
            required: true,
            pattern: 'url'
        }
	},
	 
	save: function(isnew){
		console.log("Save Content " + JSON.stringify(this.toJSON()));
		var method = 'POST';
		if(isnew) {
			method = 'POST';
		} else {
			method = 'PUT';
		}
		
		$.ajax({
			 type: method,
			 url: this.url,
			 data: JSON.stringify(this.toJSON()),
			 dataType: "json",
			 contentType: "application/json; charset=utf-8",
			 success: function(){
				 $.notifyDefaults({
					type: 'success',
					placement: {
						from: "top"
					},
					animate:{
						enter: "animated fadeInUp",
						exit: "animated fadeOutDown"
					}
				 });
				 
				 $.notify('Content updated successfully', {
					placement: {
						align:"center"
					}
				 });
				 
//				 Render Content Table
				 ambient.predic.views.ContentRuleListView.getInstance().refreshView();
				 
			  }, 
			  error: function() {
				  $.notifyDefaults({
						type: 'danger',
						placement: {
							from: "top"
						},
						animate:{
							enter: "animated fadeInUp",
							exit: "animated fadeOutDown"
						}
				  });
				  
				  $.notify('Request Failed', {
						placement: {
							align:"center"
						}
				  });
			  }
		});
	}
});
