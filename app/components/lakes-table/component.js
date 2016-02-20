import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lakes-table'],
	viewLake: 'viewLake',
	actions: {
		viewLake: function(lake){
			this.sendAction('viewLake', lake);
		},
		setCenter: function(coords){
			console.log(coords);
			window.map.setCenter({lat: coords.lat, lng:coords.lng});
			window.map.setZoom(12);
		}
	}
});
