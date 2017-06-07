(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  //search for the provided text
  function NarrowItDownController() {
    var menu = this;

    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      menu.categories = response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });



  }

  function FoundItemsDirective() {
    var ddo = ...,

    return ddo;
  }
}

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService() {
  var service = this;

  service.getMatchedMenuItems(searchTerm) {
    function () {
    var response = $http({
      method: "LIST",
      url: (ApiBasePath + "/categories.json"),
      params: searchTerm
    });

    service.getMatchedMenuItems = function (searchTerm) {
      return $http(
          method: "GET",
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
          params: {
            searchTerm: shortName
          }
        ).then(function (result) {
            // process result and only keep items that match
            var foundItems...

            // return processed items
            return foundItems;
          });
    }
  }
});
