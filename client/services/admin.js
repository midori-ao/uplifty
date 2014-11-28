angular.module('MyApp')
  .factory('Admin', function($http, $auth, $window,$location) {
    return {
      getUsers: function(success,error) {
        return $http.get('/api/users');
      },
      createAccount: function(user) {
        return $http.post('/auth/signup', user);
      }
    };
  });