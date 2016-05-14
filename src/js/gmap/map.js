var app = app || {};


app.GoogleMap = function() {

	
	this.init = function() {
		var MAP_DATA = new Object();
		MAP_DATA['atm'] = {type:SHIELD,  color: "#1998F7", icon: "map-icon-atm"};
		MAP_DATA['bank'] = {type:SHIELD,  color: "#1998F7", icon: "map-icon-bank"};
		MAP_DATA['cafe'] = {type:SQUARE_ROUNDED,  color: "#1998F7", icon: "map-icon-cafe"};
		MAP_DATA['dentist'] = {type:SHIELD,  color: "#1998F7", icon: "map-icon-dentist"};
		MAP_DATA['grocery_or_supermarket'] = {type:SQUARE_ROUNDED,  color: "#6331AE", icon: "map-icon-grocery-or-supermarket"};
		MAP_DATA['hospital'] = {type:SHIELD,  color: "#FA8072", icon: "map-icon-health"};
		MAP_DATA['park'] = {type:ROUTE,  color: "#1998F7", icon: "map-icon-parking"};
		MAP_DATA['parking'] = {type:ROUTE,  color: "#1998F7", icon: "map-icon-parking"};
		
		MAP_DATA['library'] = {type:SHIELD,  color: "#00CCBB", icon: "map-icon-library"};
		MAP_DATA['restaurant'] = {type:SQUARE_ROUNDED,  color: "#1998F7", icon: "map-icon-restaurant"};
		
		MAP_DATA['other'] = {type:MAP_PIN,  color: "#6331AE", icon: "map-icon-location-arrow"};
		
		
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
				radius : '2000',
				types: ['atm', 'bank', 'cafe', 'dentist', 'park', 'parking', 'grocery_or_supermarket', 'hospital', 'library', 'restaurant', 'university']
			};
			
			var infowindow = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);
			
			service.nearbySearch(request, function(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					results.forEach(function(place) {
						var photos = place.photos;
						var p_type = place.types[0];
						if(!MAP_DATA[p_type]) {
							p_type = 'other';
						}
						
						var marker = new Marker({
							map: map,
							position: place.geometry.location,
							icon: {
								path: MAP_DATA[p_type].type,
								fillColor: MAP_DATA[p_type].color,
								fillOpacity: 1,
								strokeColor: '',
								strokeWeight: 0,
								scale: 0.5
							},
							map_icon_label: '<span class="map-icon ' +  MAP_DATA[p_type].icon + '"></span>'
						});

						google.maps.event.addListener(marker, 'click',
								function() {
									var content = '<div><strong>'
										+ place.name + '</strong><br>';
									if(photos) {
										content += '<img src="'+ photos[0].getUrl({'maxWidth' : 60, 'maxHeight' : 60 }) + '" ><br>';
									}
									content += 'Type: ' + place.types[0] + '<br>';
									content += 'Location: ' + place.vicinity + '</div>';
										
									infowindow.setContent(content);
									infowindow.open(map, this);
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