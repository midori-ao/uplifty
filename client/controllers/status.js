angular.module('MyApp')
  .controller('StatusCtrl', function($scope, $auth, $alert, Account, Status, $location) {

    $scope.loading = true;

    /**
     * Get all users in the DB
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
     * Create user from Admin panel.
     */
    // $scope.createStatus = function() {
    //   Status.postStatus({
    //     displayName: $scope.displayName,
    //     email: $scope.email,
    //     password: $scope.password,
    //     role: $scope.role
    //   })
    //   .then(function(){ //find a better way to refresh view after submission
    //     $location.path('/statuses');
    //   })
    //   .catch(function(response) {
    //     $alert({
    //       content: response.data.message,
    //       animation: 'fadeZoomFadeDown',
    //       type: 'material',
    //       duration: 3
    //     });
    //   });
    // };

  });