'use strict';

var app = angular.module('uplifty', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  });

var api = function($resource){
  this.emotions = $resource('http://localhost:8000/emotions/'); //node app port
};

app.service('Api', api);

app.factory('testResource', function ($resource) {
     return $resource('http://localhost:8000/createUser/');
});