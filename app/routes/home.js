import Ember from 'ember';

export default Ember.Route.extend({
	lakesService: Ember.inject.service('lakes'),
	init: function(){

	},
	model: function(params){
		return this.get('lakesService').getLakesNearBy();
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('attrs', Ember.A(model));
		this.controllerFor('map').set('attrs', Ember.A(model));
  	}
});
