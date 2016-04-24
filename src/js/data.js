cco.predic.tags = cco.predic.tags || {};

//cco.predic.tags.MANUFACTURER = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: cco.predic.SERVICE_ENPOINT + '/contenttags/manufacturer/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

cco.predic.tags.MANUFACTURER = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: cco.predic.SERVICE_ENPOINT + '/contenttags/manufacturer'
});


//cco.predic.tags.PRODUCT = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: cco.predic.SERVICE_ENPOINT + '/contenttags/producttype/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

cco.predic.tags.PRODUCT = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: cco.predic.SERVICE_ENPOINT + '/contenttags/producttype'
});

//cco.predic.tags.MODELS = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: cco.predic.SERVICE_ENPOINT + '/contenttags/model/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

cco.predic.tags.MODELS = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: cco.predic.SERVICE_ENPOINT + '/contenttags/model'
});

//cco.predic.tags.OTHER = new Bloodhound({
//	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
//	  queryTokenizer: Bloodhound.tokenizers.whitespace,
//	  remote: {
//		    url: cco.predic.SERVICE_ENPOINT + '/contenttags/other/en',
//		    filter: function(list) {
//		      return $.map(list, function(tagvalue) {
//		        return { value: tagvalue }; });
//		   }
//	   }
//});

cco.predic.tags.OTHER = new Bloodhound({
	  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: cco.predic.SERVICE_ENPOINT + '/contenttags/other'
});


	
	 