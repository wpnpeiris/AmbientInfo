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
		
		var refListView = app.TipsListView.getInstance();
		
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
		
		
		
		var inputQuery = this.genInputQuery();	
		this.triggerTips(inputQuery); 
		this.triggerTroubleshoot(inputQuery); 
		this.triggerInsightInfo(inputQuery);
		
	}
	
	this.triggerInsightInfo = function(inputQuery) {
		$.getJSON( app.SERVICE_ENPOINT + "/ambientinfo/sentiment?topic=" + inputQuery, function( data ) {
			app.InsightListView.getInstance().reset(data);
		});
	}
	
	this.triggerTips = function(inputQuery) {
		var request =  this.getQueryRequest(inputQuery + 'tips+tricks');
		this.listYoutubeRefs(request, app.TipsListView.getInstance());
	}
	
	
	this.triggerTroubleshoot = function(inputQuery) {
		var request =  this.getQueryRequest(inputQuery + 'trobleshooting+problem+how+to');
		this.listYoutubeRefs(request, app.TroubleshootListView.getInstance());
	}
	
	this.listYoutubeRefs = function(request, refListView) {
		request.execute(function(response) {
			
			var contents = new Object();
			
			var rank_endpoint = app.SERVICE_ENPOINT + "/ambientinfo/rank?userId=" + app.UserProfile.getInstance().getUserId();
			
			$.each( response.items, function( idx, obj ) {
				var content = new Object();
				content["ref_id"] = obj.id.videoId;
				content["ref_title"] = obj.snippet.title;
				content["ref_desc"] = obj.snippet.description;
				content["ref_uri"] = "https://www.youtube-nocookie.com/embed/" + obj.id.videoId;
				content["ref_thumbnails"] = obj.snippet.thumbnails.medium.url;
				
				contents[obj.id.videoId] = content;
				rank_endpoint += "&items=" + obj.id.videoId;
			});
			
			var refs = [];
			$.getJSON(rank_endpoint, function( data ) {
				console.log('Response ReferenceInput.updateViews: ' + data); 
				$.each( data, function( idx, obj ) {
					refs[idx] = contents[obj];
				});
				refListView.reset(refs);
			});
		});
	}
	
	this.getQueryRequest = function(query) {
		var lang = app.UserProfile.getInstance().getProperty('language') == undefined ? 'en' : app.UserProfile.getInstance().getProperty('language');
		
		var request = gapi.client.youtube.search.list({
			q: query,
			relevanceLanguage: lang,
			maxResults: 5,
		    part: 'snippet'
		});
		
		return request;
	}
	
//	this.updateViews = function(userid, refid) {
//		console.log('Call ReferenceInput.updateViews'); 
//		$.getJSON( app.SERVICE_ENPOINT + "/views/" + userid + "/" + refid, function( data ) {
//			console.log('Response ReferenceInput.updateViews: ' + data); 
//		});
//	}
	
	this.updateLike = function(userid, refid) {
		console.log('Call ReferenceInput.updateViews'); 
		var data = '{"userId": "' + userid + '", "itemId": "' + refid + '"}';
		$.ajax({
			 type: 'POST',
			 url: app.SERVICE_ENPOINT + '/ambientinfo/event',
			 data: data,
			 dataType: "json",
			 contentType: "application/json; charset=utf-8",
			 success: function(){
				 callback();
			  }, 
			  error: function() {
//				  alert('error', "Request Failed");
			  }
		});
		
//		$.getJSON( app.SERVICE_ENPOINT + "/preferences/" + userid + "/" + refid + "/like", function( data ) {
//			console.log('Response ReferenceInput.updateViews: ' + data); 
//		});
	}
	
	this.updateDislike = function(userid, refid) {
		console.log('Call ReferenceInput.updateViews'); 
//		$.getJSON( app.SERVICE_ENPOINT + "/preferences/" + userid + "/" + refid + "/dislike", function( data ) {
//			console.log('Response ReferenceInput.updateViews: ' + data); 
//		});
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

