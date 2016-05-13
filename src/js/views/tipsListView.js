var app = app || {};

/**
 * 
 */
app.TipsListView = app.ReferenceListView.extend({
	el: $( '#tips-referance' )

	
	
});

app.TipsListView.instance = null;

app.TipsListView.getInstance = function(){
	console.log('Call app.TipsListView.getInstance'); 
	if(app.TipsListView.instance  == null) {	
		console.log('Initiate app.TipsListView'); 	
		app.TipsListView.instance = new app.TipsListView();		
	}
	
	return app.TipsListView.instance;
}; 

