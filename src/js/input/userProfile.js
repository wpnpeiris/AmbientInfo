var app = app || {};

/**
 * 
 */
app.UserProfile = function() {
	this.userProp = {};
	
	this.init  = function(inputStr) {
		console.log('Call UserProfile.init '  + inputStr); 
		var params = inputStr.split('&');
		
		var keypair;
    	for (var i = 0; i < params.length; i++) {
    		keypair = params[i].split('=');
    		this.userProp[keypair[0]] = keypair[1];
		}	
	}
	
	this.getProperty = function(key) {
		return this.userProp[key];
	}
	
	this.isValid = function() {
		if(this.userProp['primaryEmail'] == undefined) {
			return false;
		} else {
			return true;
		}
	}
};


app.UserProfile.instance = null;

app.UserProfile.getInstance = function(){
	console.log('Call app.UserProfile.getInstance'); 
	if(app.UserProfile.instance  == null) {	
		console.log('Initiate app.UserProfile'); 	
		app.UserProfile.instance = new app.UserProfile();		
	}
	
	return app.UserProfile.instance;
}; 

