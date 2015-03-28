angular.module('RecipeBoxApp')
	
	.controller('MainCtrl', ['UserService', function(UserService) {
		console.log("Main controller created");
		var self = this;
		
	}])

	.controller('NavCtrl', ['UserService', function(UserService) {
		console.log("Navigation control working");
		var self = this;
		self.UserService = UserService;
		UserService.session();
		console.log("navcontrol init:", UserService.isLoggedIn);
		
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
	.controller('ProfileCtrl', ['UserService', function(UserService) {
		var self = this;
		console.log("Profile Controller working.");
		var self = this;
		

}]);;