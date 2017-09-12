
    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var gridApp = angular.module('gridApp', ['ngRoute']);

    // configure our routes
    gridApp.config(function($routeProvider) {
        $routeProvider
            
            .when('/', {
                templateUrl : 'index.html',
                controller  : 'mainController'
            })
            .when('/view', {
                templateUrl : 'app/views/view.html',
                controller  : 'viewController'
            })
            .when('/delete', {
                templateUrl : 'app/views/delete.html',
                controller  : 'deleteController'
            });
          
    });

    // create the controller and inject Angular's $scope
    gridApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.msg = 'Everyone come and see how good I look!';
    });

    gridApp.controller('addController', function($scope) {
        $scope.msg = 'Look! add ';
    });

    gridApp.controller('viewController', function($scope) {
        $scope.msg = 'Contact us! View';
    });

    gridApp.controller('deleteController', function($scope) {
        $scope.msg = 'Contact us! delete';
    });


