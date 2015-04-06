angular.module('RecipeBoxApp', ['ngRoute', 'ui.bootstrap'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/views/main.html'
		}).
		when('/login', {
			templateUrl: '/views/login.html',
			controller: 'LoginCtrl',
			controllerAs: 'LoginCtrl'
		}).
		when('/signup', {
			templateUrl: '/views/signup.html',
			controller: 'SignupCtrl',
			controllerAs: 'SignupCtrl'
		}).
		when('/profile', {
			templateUrl: '/views/user-views/recipebox.html',
			controller: 'ProfileCtrl',
			controllerAs: 'profileCtrl',
			resolve: {
				auth: ['$q', '$location', 'UserService', function($q, $location, UserService) {
					return UserService.session().then(
						function(success) {
							console.log("successful auth");
						},
						function(err) {
							$location.path('/login');
							$location.replace();
							return $q.reject(err);
						});
				}]
			}
		}).
		otherwise({redirectTo: '/'});
	}]);

	