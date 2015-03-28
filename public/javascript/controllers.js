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
	.controller('ProfileCtrl', ['$routeParams', 'ProfileService', function($routeParams, ProfileService) {
		var self = this;
		self.profile = {};

		ProfileService.getProfile().then(function(success) {
			self.profile = success.data;
		}, function(error) {
			self.errorMessage = error.data.msg;
		});
		

		console.log("profile controller: ", self.profile);
}]);