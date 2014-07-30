var myModule = angular.module('app', ['ngResource', 'ngRoute']).
	config(function($routeProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider.when('/', {templateUrl: '/partials/main', controller: 'mainCtrl'});
});

myModule.controller('mainCtrl', function($scope){
	$scope.myVar = "Hello Angular";
});