angular.module('MyApp', ['ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap', 'satellizer','angular-loading-bar'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl'
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          authenticated: function($location, $auth) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }
        }
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'partials/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          authenticated: function($location, $auth, $state) {
            if (!$auth.isAuthenticated()) {
              return $location.path('/login');
            }
          }
        },
        access: 'admin'
      });

    $urlRouterProvider.otherwise('/');

    $authProvider.facebook({
      clientId: '657854390977827'
    });

    $authProvider.linkedin({
      clientId: '77cw786yignpzj'
    });

    $authProvider.twitter({
      url: '/auth/twitter'
    });

  })
  .run(['$rootScope', 'Account', '$state', '$auth', function($rootScope, Account, $state, $auth){
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if (toState.access) { // check if the route has an access:something.
            if (!$auth.compareRole(toState.access)) {
                event.preventDefault();
                $state.go('login');
            }
        }
    })}
]);
