(function () {
'use strict';

angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.userMessage = "";

  $scope.checkIfTooMuch  = function () {

    if ($scope.menuSelection) {
      var selectionStrings = $scope.menuSelection.split(',');
      if (selectionStrings.length <= 3) {
        $scope.userMessage = "Enjoy!";
      } else {
        $scope.userMessage = "Too much!";
      }
    } else {
      $scope.userMessage = "Please enter data first!"
    }
  };
}

})();
