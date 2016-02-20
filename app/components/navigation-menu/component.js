import Ember from 'ember';

export default Ember.Component.extend({
	
	classNames: ['top-nav'],
	classNameBindings: [
		'active:active'
	],
	active: true,
	actions: {

	}
});
