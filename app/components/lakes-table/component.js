import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['lakes-table'],
	viewLake: 'viewLake',
	actions: {
		viewLake: function(lake){
			this.sendAction('viewLake', lake);
		}
	}
});
