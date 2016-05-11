var app = app || {};


/**
 * 
 */
app.ReferenceInput = function() {
	this.refsInput = [];
	this.aptsInput = {};
	this.tagsInput = {};
	
	this.addAptInput =  function(key, val) {
		console.log( "Add Apt input " + key + " : " + val );
		this.aptsInput[key] = val;
	}
	
	this.addTag = function(tagVal){
		console.log('Add Tag input ' + tagVal); 
		this.tagsInput[tagVal] = tagVal;
	}
	
	this.removeTag = function(tagVal){
		console.log('Remove Tag input ' + tagVal); 
		delete this.tagsInput[tagVal];
	}
	
	this.resetTags = function() {
		this.tagsInput = {};
	}
	
	this.search = function() {
		console.log('Call ReferenceInput.search'); 
		var userProfile = app.UserProfile.getInstance();
		var userid = userProfile.getProperty('primaryEmail');
		
		var refListView = app.ReferenceListView.getInstance();
		
		var inputQuery = this.genInputQuery();	
		
		$.getJSON( app.SERVICE_ENPOINT + "/search?" + inputQuery, function( data ) {
			var hits = data.result;
		
			var refs = [];
			$.each( hits, function( idx, obj ) {
				refs[idx] = obj.fields;
			});

			refListView.reset(refs);
		}).done(function() { console.log('app.ReferenceInput.search succeeded'); })
		.fail(function() { 
			console.log('app.ReferenceInput.search Failed');
				
		});
		
	}
	
	this.trigger = function() {
		console.log('Call ReferenceInput.trigger'); 
		var userProfile = app.UserProfile.getInstance();
		var userid = userProfile.getProperty('primaryEmail');
		
		var refListView = app.ReferenceListView.getInstance();
		
		var inputQuery = this.genInputQuery();	
		var request = gapi.client.youtube.search.list({
			q: inputQuery,
		    part: 'snippet'
		});

		request.execute(function(response) {
			var refs = [];
			$.each( response.items, function( idx, obj ) {
//				alert(JSON.stringify(obj));
				var content = new Object();
				content["ref_id"] = obj.snippet.title;
				content["ref_desc"] = obj.snippet.description;
				content["ref_uri"] = "https://www.youtube-nocookie.com/embed/" + obj.id.videoId;
				content["ref_thumbnails"] = obj.snippet.thumbnails.medium.url;
				refs[idx] = content;
			});
			refListView.reset(refs);
		});
		  
		  
//		$.getJSON( app.SERVICE_ENPOINT + "/recommendation/" + userid + "?" + inputQuery, function( data ) {
//			var hits = data.result;
//		
//			var refs = [];
//			$.each( hits, function( idx, obj ) {
//				refs[idx] = obj.fields;
//			});
//
//			refListView.reset(refs);
//		}).done(function() { console.log('app.ReferenceInput.trigger succeeded'); })
//		.fail(function() { 
//			console.log('app.ReferenceInput.trigger Failed');
//				
//		});
		
	}
	
	this.updateViews = function(userid, refid) {
		console.log('Call ReferenceInput.updateViews'); 
		$.getJSON( app.SERVICE_ENPOINT + "/views/" + userid + "/" + refid, function( data ) {
			console.log('Response ReferenceInput.updateViews: ' + data); 
		});
	}
	
	this.updateLike = function(userid, refid) {
		console.log('Call ReferenceInput.updateViews'); 
		$.getJSON( app.SERVICE_ENPOINT + "/preferences/" + userid + "/" + refid + "/like", function( data ) {
			console.log('Response ReferenceInput.updateViews: ' + data); 
		});
	}
	
	this.updateDislike = function(userid, refid) {
		console.log('Call ReferenceInput.updateViews'); 
		$.getJSON( app.SERVICE_ENPOINT + "/preferences/" + userid + "/" + refid + "/dislike", function( data ) {
			console.log('Response ReferenceInput.updateViews: ' + data); 
		});
	}
	
	this.genInputQuery  = function() {
		console.log('Call ReferenceInput.genInputQuery ' ); 
		var inputQuery = "";
		if(Object.keys(this.tagsInput).length > 0) {
			for(prop in this.tagsInput) {
				inputQuery +=  this.tagsInput[prop];
				inputQuery += "+";
			}
		}
		
		return inputQuery;
//		var inputQuery = "query=(or ";
//		
//		if(Object.keys(this.aptsInput).length > 0) {
//			inputQuery += "(and ";
//			for(prop in this.aptsInput) {
//				inputQuery += prop;
//				inputQuery += ":'";
//				inputQuery += this.aptsInput[prop];
//				inputQuery += "' ";
//			}
//			inputQuery += " ) ";
//		}
//		
//		if(Object.keys(this.tagsInput).length > 0) {
//			inputQuery += "(or";		
//			for(prop in this.tagsInput) {
//				inputQuery += " tags:'";
//				inputQuery +=  this.tagsInput[prop];
//				inputQuery += "'"
//			}
//			inputQuery += ")";
//		}
//		
//		inputQuery += ")";
//		
//		inputQuery += "&size=20";
//		return inputQuery;
		
	}
};


app.ReferenceInput.instance = null;

app.ReferenceInput.getInstance = function(){
	console.log('Call app.ReferenceInput.getInstance'); 
	if(app.ReferenceInput.instance  == null) {	
		console.log('Initiate app.ReferenceInput'); 	
		app.ReferenceInput.instance = new app.ReferenceInput();		
	}
	
	return app.ReferenceInput.instance;
}; 

