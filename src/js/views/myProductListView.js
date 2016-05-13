var app = app || {};

/**
 * 
 */
app.MyProductListView = Backbone.View.extend({
	el: $( '#my-products' ),

	/**
	 * 
	 */
	init: function(initialProducts) {
		this.collection = new app.ProductList(initialProducts);
		this.renderAll();
		
		this.listenTo( this.collection, 'add', this.renderProduct );
		this.listenTo( this.collection, 'destroy', this.remove );
	},
	
	//events: {
	//	'click #add': 'addProduct'
	//},

	/**
	 * 
	 */
	addProduct: function( e ) {
		//e.preventDefault();

		var formData = {};
		
		$( '#addProduct div' ).children( 'select' ).each( function( i, el ) { 
			 formData[ el.name ] = $( el ).val();			
		});
		
		$( '#addProduct div' ).children( 'input' ).each( function( i, el ) { 
			 formData[ el.id ] = $( el ).val();			
		});
		
		this.collection.add( new app.Product( formData ) );
	}, 
	
	/**
	 * 
	 */
	remove: function(item) {
		console.log('MyProductListView.Remove Item ' + this.collection.size()); 
		var refInput = app.ReferenceInput.getInstance();
		for(attr in item.attributes){
			refInput.removeTag(item.attributes[attr]);
		}; 
		this.renderAll();
		//this.triggerReferences();
	},
	 
	/**
	 * 
	 */
	renderAll: function() {
		this.$el.empty();
		this.collection.each(function( item , index) {
			this.initProduct( item, index );
		}, this );
		
		this.updateRefInput(this.collection.at(0));
		//this.triggerReferences();
	},

	/**
	 * TODO: rename to renderProduct
	 */
	initProduct: function( item, index ) {
		var productView = new app.MyProductView({
			model: item
		});
		var content = productView.render().el;
		$(content).attr('id', 'item' + index);
		if(index == 0) {
			$(content).addClass("active");
		}
		
		this.$el.append(content);
		//this.updateRefInput(item);
	},
	
	/**
	 * 
	 */
	renderProduct: function( item) {
		var productView = new app.MyProductView({
			model: item
		});
		
		var content = productView.render().el;
		if(this.collection.size() > 1) {
			this.$el.find('.active').removeClass('active');
		}
		$(content).attr('id', 'item' + (this.collection.size() - 1));
		$(content).addClass("active");
			
		this.$el.append(content);
		
		this.updateRefInput(item);
		//this.triggerReferences();
	},
	
	/**
	 * 
	 */
	updateRefInput: function( item ) {
		console.log('MyProductListView.updateRefInput'); 
		var refInput = app.ReferenceInput.getInstance();
		refInput.resetTags();
		
		for(attr in item.attributes){
			refInput.addTag(item.attributes[attr]);
		}; 
		refInput.trigger();
	},
	
	/**
	 * 
	 */
	//triggerReferences: function() {
	//	console.log('Trigger References'); 
	//	var refInput = app.ReferenceInput.getInstance();
	//	refInput.trigger();
	//},
	
	viewItem: function(itemId) {
		console.log('View Item ' + itemId); 
		var itemIndex = itemId.split("item")[1];
		var item = this.collection.at(itemIndex);
		this.updateRefInput(item);
	}
});


app.MyProductListView.instance = null;

app.MyProductListView.getInstance = function(){
	console.log('Call app.MyProductListView.getInstance'); 
	if(app.MyProductListView.instance  == null) {	
		console.log('Initiate app.MyProductListView'); 	
		app.MyProductListView.instance = new app.MyProductListView();		
	}
	
	return app.MyProductListView.instance;
}; 
