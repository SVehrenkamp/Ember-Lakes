import Ember from 'ember';

export default Ember.Route.extend({
	lakesService: Ember.inject.service('lakes'),
	actions: {
		viewLake: function(lake){
			console.log('Viewing Lake: ', lake);
			this.transitionTo('lake', lake)
		}
	},
	init: function(){

	},
	model: function(params){
		return this.get('lakesService').getLakesNearBy();
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('attrs', Ember.A(model));
  	}

});
