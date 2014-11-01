'use strict';

/* Controllers */

angular.module('uplifty')
.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
}]);

angular.module('uplifty')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function(res) {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = "Failed to login";
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}]);

angular.module('uplifty')
.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                password: $scope.password,
                role: $scope.role
            },
            function() {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);

angular.module('uplifty')
.controller('StatusCtrl',
['$rootScope', '$scope', 'Statuses', function($rootScope, $scope, Statuses) {

    //get statuses
    $scope.loading = true;
    Statuses.getAll(function(res) {
        $scope.statuses = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch statuses.";
        $scope.loading = false;
    });

}]);

angular.module('uplifty')
.controller('StatusCreateCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

    $scope.user = Auth.user;
    $scope.categories = ['Daily Life','Relationships'];
    console.log(Auth.user);

    $scope.createStatus = function() {
        Auth.createStatus({
                username: $scope.user.username,
                id: $scope.user.id,
                category: $scope.category,
                text: $scope.text
            },
            function() {
                $location.path('/status/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);

angular.module('uplifty')
.controller('AdminCtrl',
['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function(err) {
        $rootScope.error = "Failed to fetch users.";
        $scope.loading = false;
    });

}]);

