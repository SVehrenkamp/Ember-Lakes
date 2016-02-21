import Ember from 'ember';

export default Ember.Route.extend({
	lakesService: Ember.inject.service('lakes'),
	actions: {
		viewLake: function(lake){
			console.log('Viewing Lake: ', lake);
			console.log(this.controllerFor('map'));
			this.transitionTo('lake', lake.id);
			//this.controllerFor('map').set('attrs', lake);
		},
		listLakes: function(){
			this.transitionTo('lakes');
		},
		nearByLakes: function(){
			this.transitionTo('home');
		},
		updateMap: function(markers){
			this.updateMap(markers);
		}
	},
	init: function(){
		console.log('this is the application route');
	},
	model: function(params){
	},
	setupController: function(controller, model) {
		// controller.set('model', model);
		// controller.set('attrs', Ember.A(model));
  	},
  	renderTemplate: function(){
  		this.render();

  		//nav
  		this.render('navigation', {
  			into: 'application',
  			outlet: 'nav'
  		});

  		//map
  		this.render('map', {
  			into: 'application',
  			outlet: 'map',
  			controller: 'map'
  		});
  	},
  	updateMap: function(){
  		console.log('updating Map!!');
  		controllerFor('map').set('currentMarkers', this.get('currentMarkers'));
  	}

});
