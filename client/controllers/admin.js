angular.module('MyApp')
  .controller('AdminCtrl', function($scope, $auth, $alert, Account, Admin, $location) {

    $scope.loading = true;

    /**
     * Get all users in the DB
     */
    Admin.getUsers()
      .success(function(data) {
          $scope.users = data;
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
    $scope.createAccount = function() {
      Admin.createAccount({
        displayName: $scope.displayName,
        email: $scope.email,
        password: $scope.password,
        role: $scope.role
      })
      .then(function(){ //find a better way to refresh view after submission
        $location.path('/admin');
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

    /**
     * Update user's profile information.
     */
    $scope.updateProfile = function() {
      Account.updateProfile({
        displayName: $scope.user.displayName,
        email: $scope.user.email
      }).then(function() {
        $alert({
          content: 'Profile has been updated',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

  });