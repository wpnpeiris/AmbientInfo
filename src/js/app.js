var app = app || {};




app.load = function() {
//	alert(navigator.userAgent);
	
	app.GoogleMap.getInstance().init();
	
	//Initiate User Profile
	var userProfile = app.UserProfile.getInstance();
	userProfile.init(window.location.search.substring(1));
	if(!userProfile.isValid()) {
		window.location.replace('login.html');
	}
	
	//Set Profile Attributes
	//TODO: Handle in a Model/View
	var displayName = userProfile.getProperty('displayName').replace("+", " ");
	$("#displayName").prepend("<li><a href='#displayName'>" + displayName + "</a></li>");
	$("#displayName").prepend("<li><img class='img-circle' src='" + decodeURIComponent(userProfile.getProperty('image')) + "&sz=45' alt='Generic placeholder image' ></li>");
	$("#ref_lang").val(userProfile.getProperty('language'));
	
	
	
	//Listen on Sign out
	$('#logout').on('click', function () {
		gapi.auth.signOut();
		window.location.replace('login.html');
	});
	 
	//Listen on Reference Model (Popup window for reference URL container)
	$('#refModal').on('show.bs.modal', function (event) {
		var refid = $(event.relatedTarget).data('refid');
		var refdesc = $(event.relatedTarget).data('refdesc');
		var refuri = $(event.relatedTarget).data('refuri');
		
		var modal = $(this);
		modal.find('.modal-title').text(refid );
		modal.find('.modal-body iframe').attr("src", refuri);
		modal.find('.modal-body iframe').attr("height", ($( window ).height() - 300));

		
		
		var refInput = app.ReferenceInput.getInstance();
		var userProfile = app.UserProfile.getInstance();
		var userid = userProfile.getProperty('primaryEmail');
		
		modal.find('#refId').val(refid);
		modal.find('#userId').val(userid);
				
		refInput.updateViews(userid, refid);
	});
	
	var modal = $('#refModal');
	modal.find('#likebtn').on('click', function(event) {
		var refInput = app.ReferenceInput.getInstance();
		refInput.updateLike(modal.find('#userId').val(), modal.find('#refId').val());
	});
	
	modal.find('#dislikebtn').on('click', function(event) {
		var refInput = app.ReferenceInput.getInstance();
		refInput.updateDislike(modal.find('#userId').val(), modal.find('#refId').val());
	});
	
	modal.find('#closebtn').on('click', function(event) {
		modal.find('.modal-body iframe').removeAttr('src');
	});
	
	
	//Initial Applicable References
	var refInput = app.ReferenceInput.getInstance();
  	refInput.addAptInput('apt_region', $("#apt_region").val());
  	refInput.addAptInput('apt_level', $("#apt_level").val());
  	refInput.addAptInput('apt_gender', $("#apt_gender").val());
  	refInput.addAptInput('apt_age', $("#apt_age").val());
	
	//Listen on Applicable Reference Inputs
	$( "#apt_region" ).change(function() {
  		var refInput = app.ReferenceInput.getInstance();
  		refInput.addAptInput('apt_region', $(this).val());
  		refInput.trigger();
	});
	
	$( "#apt_level" ).change(function() {
  		var refInput = app.ReferenceInput.getInstance();
  		refInput.addAptInput('apt_level', $(this).val());
  		refInput.trigger();
	});

	$( "#apt_gender" ).change(function() {
  		var refInput = app.ReferenceInput.getInstance();
  		refInput.addAptInput('apt_gender', $(this).val());
  		refInput.trigger();
	});
	
	$( "#apt_age" ).change(function() {
  		var refInput = app.ReferenceInput.getInstance();
  		refInput.addAptInput('apt_age', $(this).val());
  		refInput.trigger();
	});

	//Start with the following Product list
	var products = [
            { manufacturer: 'Samsung', type: 'Mobile', model: 'S7 Edge'},
            { manufacturer: 'Apple', type: 'iPad', model: 'Air 2'}
	];
	
	
	//Listen on Add Products
	$('#addToProductList').on('click', function () {
		var productView = app.MyProductListView.getInstance();
		productView.addProduct();
	});
	
	var productView = app.MyProductListView.getInstance();
	productView.init(products);
	
	$('#myCarousel').carousel('pause');
	
	$('#myCarousel').on('slid.bs.carousel', function (e) {
		 var productView = app.MyProductListView.getInstance();
		 productView.viewItem($(this).find('.active').attr('id'));		 
	});
	
	//Tips Search
	$('#search-btn').on('click', function () {
		var searchText = $("#search-text").val();
		if(searchText != '') {
			var refInput = app.ReferenceInput.getInstance();
			refInput.addTag(searchText);
			refInput.search();
		}

	});
	
	
	
};
