import Ember from 'ember';

export default Ember.Service.extend({
	lakes: [],
	
	getAllLakes(limit) {
		limit = limit || 25;
		return $.ajax({
			url: 'http://spothoppers.com/api/lakes?filter[limit]='+limit,
			type: 'get',
		})
		.done(function(data) {
			console.log("success", data);
		})
		.fail(function(err) {
			console.log("error", err);
		})
		.always(function() {
			console.log("complete");
		});
		
	},

	getLakeByID(id) {
		return $.ajax({
			url: 'http://spothoppers.com/api/lakes/'+id,
			type: 'GET',
		})
		.done(function(data) {
			console.log("success", data);
		})
		.fail(function(err) {
			console.log("error", err);
		})
		.always(function() {
			console.log("complete");
		});
		
	},

	getLakesNearBy() {

		var currentPosition;
		var self = this;
		
			return $.ajax({
				url: 'http://spothoppers.com/api/lakes?filter[where][geo][near]=44.0780552,-92.5098914&filter[limit]=10',
				type: 'GET'
			});
	}
});
