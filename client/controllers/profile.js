angular.module('MyApp')
  .controller('ProfileCtrl', function($rootScope, $scope, $auth, $alert, Account, $window, $upload) {

    var currentUserId = JSON.parse($window.localStorage.user);

    /**
     * Get user's profile information.
     */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          console.log(data);
          $scope.user = data;
        })
        .error(function(error) {
          $alert({
            content: error.message,
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


    $scope.onFileSelect = function(image) {
      $scope.uploadInProgress = true;
      $scope.uploadProgress = 0;

      if (angular.isArray(image)) {
        image = image[0];
      }

      $scope.upload = $upload.upload({
        url: '/api/upload/image',
        method: 'POST',
        data: {
          type: 'profile',
          userId: currentUserId
        },
        file: image
      }).progress(function(event) {
        $scope.uploadProgress = Math.floor(event.loaded / event.total);
        $scope.$apply();
      }).success(function(data, status, headers, config) {
        AlertService.success('Photo uploaded!');
      }).error(function(err) {
        $scope.uploadInProgress = false;
        AlertService.error('Error uploading file: ' + err.message || err);
      });
    };


    /**
     * Link third-party provider.
     */
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({
            content: 'You have successfully linked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
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
     * Unlink third-party provider.
     */
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({
            content: 'You have successfully unlinked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    $scope.getProfile();

  });