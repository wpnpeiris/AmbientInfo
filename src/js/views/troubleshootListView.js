var app = app || {};

/**
 * 
 */
app.TroubleshootListView = app.ReferenceListView.extend({
	el: $( '#troubleshoot-referance' )
	
});

app.TroubleshootListView.instance = null;

app.TroubleshootListView.getInstance = function(){
	console.log('Call app.TroubleshootListView.getInstance'); 
	if(app.TroubleshootListView.instance  == null) {	
		console.log('Initiate app.TroubleshootListView'); 	
		app.TroubleshootListView.instance = new app.TroubleshootListView();		
	}
	
	return app.TroubleshootListView.instance;
}; 

