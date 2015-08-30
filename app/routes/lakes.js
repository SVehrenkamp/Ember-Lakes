import Ember from 'ember';

export default Ember.Route.extend({
	lakesService: Ember.inject.service('lakes'),
	actions: {
		viewLake: function(lake){
			console.log('Viewing Lake: ', lake);
			this.transitionTo('lake', lake)
		}
	},
	model: function(params){
		return this.get('lakesService').getAllLakes();
	},
	setupController: function(controller, model) {
		console.log('Model', model);
		controller.set('model', model);
		controller.set('attrs', Ember.A(model));
  	}
});
