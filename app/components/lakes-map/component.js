import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lakes-map'],
	getLocation: function(){
		var currentPosition;
		var self = this;
		navigator.geolocation.getCurrentPosition(setPosition);
		function setPosition(position) {
			currentPosition = {};
			currentPosition.lat = position.coords.latitude;
			currentPosition.lng = position.coords.longitude;
			self.set('currentPosition', currentPosition);
		}
	}.on('init'),
	initMap: function(map){
		var self=this;
		setTimeout(function(){

			var coords = self.get('coords') ? self.get('coords') : self.get('currentPosition');	
			var el = document.getElementById('gmap-container');
			var options = {
							  center: {lat: coords.lat, lng: coords.lng},
							  zoom: 12
							};
			GoogleMapsLoader.key = 'AIzaSyCCPzv2FVkXMVLsppcE0GnTMACcx0bgUqA';
			GoogleMapsLoader.load(function(google) {
	    		var map = new google.maps.Map(el, options);
	    		var icon = '/assets/images/map-marker.png';
	    		var marker = new google.maps.Marker({
				    position: {lat: coords.lat, lng: coords.lng},
				    map: map,
				    icon: icon,
				    title: 'Hello World!'
				});

				google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
					self.set('mapIsLoading', false);
				});

				if(self.get('lakes')){
					var lakes = self.get('lakes');

					lakes.forEach(function(lake){
						var marker = new google.maps.Marker({
						    position: {lat: lake.geo.lat, lng: lake.geo.lng},
						    map: map,
						    title: lake.launchName
						});
					});
				};
			});
		}, 2000);
	}.on('init')

});
