angular.module('RecipeBoxApp')
	.directive('recipeCard', [function() {
		return {
			templateUrl: '/views/recipes/recipecard-small.html',
			restrict: 'E'
		};
	}]);