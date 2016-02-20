import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement: function(){
		console.log('INSERTING MAP MARKER');
		var markerData = {};
		markerData.position = {};
		markerData.position.lat = this.get('lat');
		markerData.position.lng = this.get('lng');
		markerData.map = window.map;
		markerData.title = this.get('title');

		//return new window.google.maps.Marker(markerData);
	}.on('init')
});
