var app = app || {};


app.GoogleMap = function() {

	this.init = function() {
		navigator.geolocation.getCurrentPosition(function(location) {
			var lat = location.coords.latitude;
			var lng = location.coords.longitude;
			var location = new google.maps.LatLng(lat,lng); 
			var map = new google.maps.Map(document.getElementById('gmap'), {
			    center: location,
			    scrollwheel: false,
			    zoom: 15	
			});
			

			var request = {
				location : location,
				radius : '1000',
				types: ['restaurant', 'store', 'parking']
			};

			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, function(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					results.forEach(function(place) {
						place.name;
						new google.maps.Marker({
							map : map,
							icon : {
								url: place.icon,
								anchor: new google.maps.Point(10, 10),
								scaledSize: new google.maps.Size(12, 12)
								},
							title : place.name,
							position : place.geometry.location
						});
					});
				}
			});
		});
		
		
	}
	
};

app.GoogleMap.instance = null;

app.GoogleMap.getInstance = function(){
	console.log('Call app.GoogleMap.getInstance'); 
	if(app.GoogleMap.instance  == null) {	
		console.log('Initiate app.GoogleMap'); 	
		app.GoogleMap.instance = new app.GoogleMap();		
	}
	
	return app.GoogleMap.instance;
}; 