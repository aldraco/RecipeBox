angular.module('RecipeBoxApp')
	
	.controller('MainCtrl', ['UserService', function(UserService) {
		console.log("Main controller created");
		var self = this;
		
	}])

	.controller('NavCtrl', ['UserService', function(UserService) {
		var self = this;
		self.UserService = UserService;
		UserService.session();
				
	}])

	.controller('LoginCtrl', ['UserService', '$location', function(UserService, $location) {
		var self = this;
		console.log("Login Controller working.");
		self.user = {email: '', password: ''};
		self.login = function() { 
			UserService.login(self.user).then(function(success) {
              $location.path('/profile');
			}, function(error) { 
				self.errorMessage = error.data.msg;
			}) 
		};
	}])
	.controller('SignupCtrl', ['UserService', '$location', function(UserService, $location) {
		var self = this;
		console.log("Signup Controller working.");
		self.user = {email: '', password: ''};
		self.signUp = function() { 
			console.log("signup function");
			UserService.signup(self.user).then(function(success) {
              $location.path('/profile');
			}, function(error) { 
				self.errorMessage = error.data.msg;
			}) 
		};
	}])
	.controller('ProfileCtrl', ['$routeParams', 'ProfileService', '$modal', function($routeParams, ProfileService, $modal) {
		var self = this;
		self.profile = {};

		ProfileService.getProfile().then(function(success) {
			self.profile = success.data;
			console.log(self.profile);
		}, function(error) {
			self.errorMessage = error.data.msg;
		});

		if (!self.profile.profile.username) {
			console.log("no username: ", self.profile.profile.username);
		}
		
	}]);