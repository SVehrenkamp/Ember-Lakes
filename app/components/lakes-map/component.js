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
		var zoom = this.get('zoom') || 12;
		setTimeout(function(){

			var coords = self.get('coords') ? self.get('coords') : self.get('currentPosition');	
			var el = document.getElementById('gmap-container');
			var options = {
							  center: {lat: coords.lat, lng: coords.lng},
							  zoom: zoom
							};
			GoogleMapsLoader.key = 'AIzaSyCCPzv2FVkXMVLsppcE0GnTMACcx0bgUqA';
			GoogleMapsLoader.load(function(google) {
	    		window.map = new google.maps.Map(el, options);
	    		var icon = '/assets/images/map-marker.png';
	    		var marker = new google.maps.Marker({
				    position: {lat: coords.lat, lng: coords.lng},
				    map: window.map,
				    icon: icon
				});

				google.maps.event.addListenerOnce(window.map, 'tilesloaded', function(){
					self.set('mapIsLoading', false);
					self.set('mapIsReady', true);
				});
			});
		}, 1000);
	}.on('init'),
	addMarkers: function(){
		console.log('setting markers');
		if(this.get('mapIsReady')){
			var lakes = this.get('lakes');
			lakes.forEach(function(lake){
				//create marker
				if (lake.acres > 50) {
					var icon = '/assets/images/map-marker-partially-offline.png';
				}
				if (lake.acres > 100) {
					var icon = '/assets/images/map-marker-online.png';
				}
				if (lake.acres < 50) {
					var icon = '/assets/images/map-marker-offline.png';
				}
				var marker = new google.maps.Marker({
				    position: {lat: lake.geo.lat, lng: lake.geo.lng},
				    map: window.map,
				    title: lake.launchName,
				    icon: icon
				});
				//Add Listeners
				marker.addListener('click', function(){
					console.log('MARKER CLICKED');
					window.map.setCenter({lat: lake.geo.lat, lng:lake.geo.lng});
					window.map.setZoom(18);
				});
			});
		};
	}.observes('mapIsReady').on('didInsertElement')
});
