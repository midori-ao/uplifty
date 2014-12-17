angular.module('MyApp')
  .controller('StatusCtrl', function($scope, $rootScope, $auth, $alert, Account, Status, $location, $window) {

    var user = JSON.parse($window.localStorage.user);
    $scope.currentUserId = user.id;
    $scope.username = user.displayName;
    $scope.loading = true;

    /**
     * Get all statuses from the DB
     */
    Status.getStatuses()
      .success(function(data) {
          $scope.statuses = data;
          console.log(data);
          $scope.loading = false;
      })
      .error(function(error) {
        $alert({
          content: error.message,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
        $scope.loading = false;
      });


    /**
     * Create status
     */
    $scope.createStatus = function() {
      Status.postStatus({
        displayName: user.displayName,
        category: $scope.status.category,
        text: $scope.status.text
      })
      .success(function(data){ //find a better way to refresh view after submission
        $scope.statuses = data;
      })
      .catch(function(response) {
        $alert({
          content: response.data.message,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

    $scope.addLike = function(statusId, type){
      Status.addLike({
        id: statusId,
        type: type
      })
      .success(function(data){
        angular.forEach($scope.statuses, function(value, key, object) {
          if (value._id === statusId) {
            console.log(value);
            $scope.statuses[key] = data;
          }
        });
      })
      .catch(function(response) {
        $alert({
          content: response.data.message,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

    $scope.removeLike = function(statusId, type){
      Status.removeLike({
        id: statusId,
        type: type
      })
      .success(function(data){
        angular.forEach($scope.statuses, function(value, key, object) {
          if (value._id === statusId) {
            console.log(value);
            $scope.statuses[key] = data;
          }
        });
      })
      .catch(function(response) {
        $alert({
          content: response.data.message,
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

  });