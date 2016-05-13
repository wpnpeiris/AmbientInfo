ambient.predic.tags = ambient.predic.tags || {};

//ambient.predic.tags.MANUFACTURER = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: ambient.predic.SERVICE_ENPOINT + '/contenttags/manufacturer/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

ambient.predic.tags.MANUFACTURER = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: ambient.predic.SERVICE_ENPOINT + '/contenttags/manufacturer'
});


//ambient.predic.tags.PRODUCT = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: ambient.predic.SERVICE_ENPOINT + '/contenttags/producttype/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

ambient.predic.tags.PRODUCT = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: ambient.predic.SERVICE_ENPOINT + '/contenttags/producttype'
});

//ambient.predic.tags.MODELS = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: ambient.predic.SERVICE_ENPOINT + '/contenttags/model/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

ambient.predic.tags.MODELS = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: ambient.predic.SERVICE_ENPOINT + '/contenttags/model'
});

//ambient.predic.tags.OTHER = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: ambient.predic.SERVICE_ENPOINT + '/contenttags/other/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

ambient.predic.tags.OTHER = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: ambient.predic.SERVICE_ENPOINT + '/contenttags/other'
});


	
	 