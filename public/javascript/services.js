angular.module('RecipeBoxApp')
	.factory('RecipeService', ['$http', function($http) { 
		return {
			getRecipes: function() {
				return $http.get('/api/team');
			},
			getRecipeDetails: function(code) {
				return $http.get('/api/team/' + code);
			} 
		}
	}])
	.factory('UserService', ['$http', function($http) {
	    var service = {
	      isLoggedIn: false,

	      session: function() {
	        return $http.get('/api/session')
	              .then(function(response) {
	          service.isLoggedIn = true;
	          return response;
	        });
	      },

	      login: function(user) {
	        return $http.post('/api/login', user)
	          .then(function(response) {
	            service.isLoggedIn = true;
	            return response;
	        });
	      }
	    };
	    return service;
  }]);