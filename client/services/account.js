angular.module('MyApp')
  .factory('Account', function($http, $auth, $window) {
    return {
      getProfile: function() {
        return $http.get('/api/me');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      },
      getPermission: function () {
        console.log('triggered');
        if ($window.localStorage['role']) {
          console.log('success'); 
          return $window.localStorage.getItem('role');
        }
        else
          console.log('fail');
          return false;
      }
    };
  });