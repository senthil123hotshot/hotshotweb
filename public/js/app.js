// Declares the initial angular module "meanMapApp". Module grabs other controllers and services. Note the use of ngRoute.
var app = angular.module('meanMapApp', ['addCtrl','queryCtrl', 'geolocation', 'gservice','groundCtrl','userCtrl' ,'adminCtrl','homeCtrl','ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Join Team Control Panel
        $routeProvider.when('/join', {
            controller: 'addCtrl',
            templateUrl: 'partials/addForm.html',

            // Find Teammates Control Panel
        }).when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

            // All else forward to the Join Team Control Panel
        }).when('/groundlist', {
            controller: 'groundCtrl',
            templateUrl: 'partials/groundlist.html',

        }).when('/login', {
            controller: 'userCtrl',
            templateUrl: 'partials/userlist.html',

        }).when('/admin', {
            controller: 'adminCtrl',
            templateUrl: 'partials/admin.html',

        }).when('/', {
            controller: 'homeCtrl',
            templateUrl: 'partials/home.html',

        }).otherwise({redirectTo:'/'})
    });
