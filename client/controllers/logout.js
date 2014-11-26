angular.module('MyApp')
  .controller('LogoutCtrl', function($auth, $alert,$window) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout()
      .then(function(){
        delete $window.localStorage['role'];
      })
      .then(function() {
        $alert({
          content: 'You have been logged out',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
  });