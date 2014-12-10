angular.module('MyApp')
  .factory('Status', function($http, $auth) {
    return {
      getStatuses: function() {
        return $http.get('/api/statuses');
      },
      postStatus: function(statusData) {
        return $http.post('/api/postStatus', statusData);
      },
      addLike: function(data){
        return $http.put('/api/addLike', data);
      },
      removeLike: function(data){
        return $http.put('/api/removeLike', data);
      }
    };
  });