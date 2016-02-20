import Ember from 'ember';

export default Ember.Route.extend({
	lakesService: Ember.inject.service('lakes'),	
	model: function(params){
		console.log(params);
		return this.get('lakesService').getLakeByID(params.lakeID);
	},
	setupController: function(controller, model) {
		controller.set('model', model);
		controller.set('attrs', Ember.A(model));
  	}
});
