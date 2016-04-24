cco.predic.proxy = cco.predic.proxy || {};

cco.predic.proxy.ContentRulesService = function() {
	
	this.load = function() {
		console.log('Call ContentRulesInput.load'); 
		
		var ruleListView = cco.predic.views.ContentRuleListView.getInstance();
		$.getJSON( cco.predic.SERVICE_ENPOINT + "/contentrules/load", function( data ) {
			ruleListView.load(data.result);
		});
	}
	
};

cco.predic.proxy.ContentRulesService.instance = null;

cco.predic.proxy.ContentRulesService.getInstance = function(){
	console.log('Call cco.predic.proxy.ContentRulesService.getInstance'); 
	if(cco.predic.proxy.ContentRulesService.instance  == null) {	
		console.log('Initiate cco.predic.proxy.ContentRulesService'); 	
		cco.predic.proxy.ContentRulesService.instance = new cco.predic.proxy.ContentRulesService();		
	}
	
	return cco.predic.proxy.ContentRulesService.instance;
}; 