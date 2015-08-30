import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('home', {path: '/'});
  this.resource('lakes', {path: '/lakes'});
  this.resource('lake', {path: '/lakes/:lakeID'});
});

export default Router;
