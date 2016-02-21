import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lakes-map'],
	markers: Ember.A(),
	mapIsLoading: false,
	viewLake: 'viewLake',
	actions: {
		clearMarkers: function(){
			console.log('markers cleared!');
			var markers = this.get('markers');
			markers.forEach(function(marker){
				marker.setMap(null);
			});
			markers.set(Ember.A())
		}
	},
	isAlive: function(){
		if (window.google !== undefined){
			console.log('map loaded', this.get('mapIsLoading'));
			if (this.get('mapIsLoading')) {
				this.set('mapIsLoading', false);
			}
		} else {
			console.log('map not loaded');
		}
	}.observes('mapIsLoading').on('didInsertElement'),
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
			GoogleMapsLoader.key = 'AIzaSyCCPzv2FVkXMVLsppcE0GnTMACcx0bgUqA';
			GoogleMapsLoader.load(function(google) {
				var coords = self.get('coords') ? self.get('coords') : self.get('currentPosition');	
				var el = document.getElementById('gmap-container');
				var options = {
					  center: {lat: coords.lat, lng: coords.lng},
					  zoom: zoom,
					  mapTypeId: google.maps.MapTypeId.SATELLITE
					};

	    		window.map = new google.maps.Map(el, options);

				google.maps.event.addListenerOnce(window.map, 'tilesloaded', function(){
					self.set('mapIsLoading', false);
					self.set('mapIsReady', true);
				});
			});
		}, 1000);
	}.on('init'),
	addMarkers: function(){
		var self = this;
		this.send('clearMarkers');
		console.log('setting markers');

		if(this.get('mapIsReady')){
			var markers = this.get('markers');
			var marker;
			var lakes = this.get('lakes');
			var lake = this.get('lake');
			console.log('THIS:::', this);
			if (!lakes.forEach) {
				console.log('yeah,', lake, lakes);
				lake = lake ? lake : lakes;
				window.map.setCenter({lat: lake.geo.lat, lng:lake.geo.lng});
				window.map.setZoom(16);

				var icon = '/assets/images/map_marker_online.svg';
				marker = new google.maps.Marker({
				    position: {lat: lake.geo.lat, lng: lake.geo.lng},
				    map: window.map,
				    title: lake.launchName,
				    animation: google.maps.Animation.DROP,
				    icon: icon
				});
				markers.pushObject(marker);
				return;
			}

			window.map.setZoom(8);
			lakes.forEach(function(lake){
				//create marker
				if (lake.acres > 50) {
					var icon = '/assets/images/map_marker_semi_offline.svg';
				}
				if (lake.acres > 100) {
					var icon = '/assets/images/map_marker_online.svg';
				}
				if (lake.acres < 50) {
					var icon = '/assets/images/map_marker_offline.svg';
				}
				marker = new google.maps.Marker({
				    position: {lat: lake.geo.lat, lng: lake.geo.lng},
				    map: window.map,
				    title: lake.launchName,
				    animation: google.maps.Animation.DROP,
				    icon: icon
				})
				//add listeners
				marker.addListener('click', function(){
					console.log('MARKER CLICKED');
					//window.map.setCenter({lat: lake.geo.lat, lng:lake.geo.lng});
					//window.map.setZoom(18);
					self.sendAction('viewLake', lake);
				});
				//store
				markers.pushObject(marker);
			});
		};
	}.observes('mapIsReady', 'lakes', 'lake').on('didInsertElement'),
	currentModel: function(){
		console.log('MODEL CHANGED: ', this.get('lakes'));
	}.observes('lakes', 'lake').on('didInsertElement')
});
