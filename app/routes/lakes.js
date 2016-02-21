import Ember from 'ember';

export default Ember.Route.extend({
	lakesService: Ember.inject.service('lakes'),
	model: function(params){
		return this.get('lakesService').getAllLakes();
	},
	setupController: function(controller, model) {
		console.log('Model', model);
		controller.set('model', model);
		controller.set('attrs', Ember.A(model));
		this.controllerFor('map').set('attrs', Ember.A(model));
  	},  	
  	renderTemplate: function(){
  		this.render();

  		this.render('lakes', {
  			into: 'application',
  			outlet: 'main'
  		});
  	}

});
