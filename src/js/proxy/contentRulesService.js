ambient.predic.proxy = ambient.predic.proxy || {};

ambient.predic.proxy.ContentRulesService = function() {
	
	this.load = function() {
		console.log('Call ContentRulesInput.load'); 
		
		var ruleListView = ambient.predic.views.ContentRuleListView.getInstance();
		$.getJSON( ambient.predic.SERVICE_ENPOINT + "/contentrules/load", function( data ) {
			ruleListView.load(data.result);
		});
	}
	
};

ambient.predic.proxy.ContentRulesService.instance = null;

ambient.predic.proxy.ContentRulesService.getInstance = function(){
	console.log('Call ambient.predic.proxy.ContentRulesService.getInstance'); 
	if(ambient.predic.proxy.ContentRulesService.instance  == null) {	
		console.log('Initiate ambient.predic.proxy.ContentRulesService'); 	
		ambient.predic.proxy.ContentRulesService.instance = new ambient.predic.proxy.ContentRulesService();		
	}
	
	return ambient.predic.proxy.ContentRulesService.instance;
}; 