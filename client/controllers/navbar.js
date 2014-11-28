angular.module('MyApp')
  .controller('NavbarCtrl', function($scope, $auth) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.isAdmin = function() {
    	var payload = $auth.getPayload();
    	// console.log('trigger'); triggers 3 times fix
    	return $auth.isAdmin(payload.role);
    };

  });