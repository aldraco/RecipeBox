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
				console.log("This was returned from the user service login.", success);
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
	.controller('ProfileCtrl', ['$routeParams', 'ProfileService', '$modal', '$log', function($routeParams, ProfileService, $modal, $log) {
		var self = this;
		self.profile = {};

		ProfileService.getProfile().then(function(success) {
			self.profile = success.data.profile;
		}, function(error) {
			self.errorMessage = error.data.msg;
		});

		self.askEditProfile = function(size) {
		    var modalInstance = $modal.open({
		      templateUrl: '/javascript/modals/incomplete-profile-modal.html',
		      controller: 'ModalInstanceCtrl',
		      scope: self,
		      size: size,
		      resolve: {
		        items: function () {
		          return "test";
		        }
		      }
		    });

		    modalInstance.result.then(function (newprofile) {
		      $log.info('Modal returned name: '+newprofile);
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};

		
		
	}]);