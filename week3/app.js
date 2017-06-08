(function () {
  'use strict';



  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
  .directive('foundItems', FoundItems)
  .directive('listItemDescription', ListItemDescription);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.found = [];
    //get the search term
    list.searchTerm = "tofu";

    list.foundItems = function() {

      //reset the list
      list.found = [];

      var foundItemsPromise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

      foundItemsPromise.then(function (response) {

          var rawItems =response.data.menu_items;

          angular.forEach(rawItems, function(item){
              if (item.description.includes(list.searchTerm)) {
                var itemToInsert = {
                  description : item.description
                }
                list.found.push(itemToInsert);
              }
            });
            console.log("FoundItems: ", list.found);

        })
        .catch(function (errorResponse) {
          console.log('Error: ', errorResponse.message);
        });
      }
  }

function ListItemDescription() {
  var ddo = {
    template: '{{ item.description }}'
  };

  return ddo;
}


  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '=',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'items',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController(MenuSearchService) {
    var items =this;

    console.log("FoundItemsDirectiveController: ", items.found);

    items.onRemove = function(itemIndex) {
    //  MenuSearchService.removeItem(itemIndex);
      items.found.pop(itemIndex);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        console.log("In call: ", searchTerm);
        var response = $http(
          {
            method: 'GET',
            url: (ApiBasePath + 'menu_items.json')
          });
          return response;
        };

  //     service.removeItem = function (itemIndex) {
  //       console.log("Removing: ", itemIndex);
  // //          items.splice(itemIndex, 1);
  //     };

    }
})();
