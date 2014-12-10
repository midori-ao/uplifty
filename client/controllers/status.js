angular.module('MyApp')
  .controller('StatusCtrl', function($scope, $rootScope, $auth, $alert, Account, Status, $location, $window) {

    var user = JSON.parse($window.localStorage.user);

    $scope.username = user.displayName;
    $scope.loading = true;

    /**
     * Get all statuses from the DB
     */
    Status.getStatuses()
      .success(function(data) {
          $scope.statuses = data;
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
        id: user.id,
        displayName: user.displayName,
        category: $scope.status.category,
        text: $scope.status.text
      })
      .success(function(){ //find a better way to refresh view after submission
        if(!$rootScope.$$phase) {
        $rootScope.$apply();
        }
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

    $scope.addLike = function(statusId, userId, type){
      console.log(statusId + userId + type);
      // Status.addLike({
      // })
      // .catch(function(response) {
      //   $alert({
      //     content: response.data.message,
      //     animation: 'fadeZoomFadeDown',
      //     type: 'material',
      //     duration: 3
      //   });
      // });
    };

    $scope.removeLike = function(data){
      console.log(data);
      // Status.removeLike({
      // })
      // .catch(function(response) {
      //   $alert({
      //     content: response.data.message,
      //     animation: 'fadeZoomFadeDown',
      //     type: 'material',
      //     duration: 3
      //   });
      // });
    };

  });