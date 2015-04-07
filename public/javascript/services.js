angular.module('RecipeBoxApp')
	.factory('RecipeService', ['$resource', function($resource) { 
		return $resource('/recipes/:recipe_id');
	}])
	.factory('ProfileService', ['$http', 'UserService', '$modal', function($http, UserService, $modal) {
			return {
				getProfile: function() {
					var id = UserService.userID;
					return $http.get('/api/profile/'+id);
				}

			};
	}])
	.factory('UserService', ['$http', '$modal', function($http, $modal) {
	    var service = {
	      isLoggedIn: false,
	      userID: '',

	      session: function() {
	        return $http.get('/api/session')
	              .then(function(response) {
	          service.isLoggedIn = true;
	          service.userID = response.data.user._id;
	          console.log("this is the data from session: ", response.data.user);
	          console.log("This is the userID on service: "+service.userID);
	          return response;
	        });
	      },

	      login: function(user) {
	        return $http.post('/api/login', user)
	          .then(function(response) {
	            service.isLoggedIn = true;
	            return response;
	        });
	      },
	      signup: function(user) {
	      	return $http.post('/api/signup', user)
	      		.then(function(response) {
	      			service.isLoggedIn = true;
	      			return response;
	      		});
	      }
		  
    };
	    return service;
  }]);