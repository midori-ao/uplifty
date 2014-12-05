angular.module('MyApp')
  .factory('Status', function($http, $auth, $window) {
    return {
      getStatuses: function() {
        return $http.get('/api/statuses');
      },
      postStatus: function(statusData) {
        return $http.post('/api/postStatus', statusData);
      }
    };
  });