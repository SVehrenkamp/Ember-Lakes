import Ember from 'ember';

export default Ember.Component.extend({
	
	classNames: ['top-nav'],
	classNameBindings: [
		'active:active'
	],
	active: true,
	listLakes: "listLakes",
	nearByLakes: "nearByLakes",
	actions: {
		listLakes: function(){
			this.sendAction('listLakes');
		},
		nearByLakes: function(){
			this.sendAction('nearByLakes');
		}
	}
});
