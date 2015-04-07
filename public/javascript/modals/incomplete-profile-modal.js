angular.module('RecipeBoxApp')


.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

  $scope.newprofile = "test";

  $scope.ok = function () {
    $modalInstance.close($scope.newprofile);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);


