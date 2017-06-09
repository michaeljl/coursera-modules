(function () {
  'use strict';



  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
  .directive('foundItems', FoundItems);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.found = [];
    list.searchTerm = "";
    list.warning= "";

    list.isListEmpty = function () {
      if (list.found.length == 0 ) {
        return true;
      }
      return false;
    }

    list.foundItems = function() {
      //reset the list
      list.found = [];
      var foundItemsPromise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      foundItemsPromise.then(function (response) {
          var rawItems =response.data.menu_items;

          //check if there is a search term
          if (Object.keys(list.searchTerm).length == 0 ) {
            list.warning = "Nothing found";
            return;
          } else {
            list.warning="";
          }

          angular.forEach(rawItems, function(item){
              if (item.description.includes(list.searchTerm)) {
                var itemToInsert = {
                  description : item.description
                }
                list.found.push(itemToInsert);
              }
            });
            console.log("FoundItems: ", list.found);

            if (list.found.length == 0) {
              list.warning = "Nothing found";
            } else {
              list.warning = "";
            }

        })
        .catch(function (errorResponse) {
          console.log('Error: ', errorResponse.message);
        });
      }
  }

  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        foundList: '=',
        onRemove: '&'
      },
      transclude: true,
      controller: FoundItemsDirectiveController,
      controllerAs: 'items',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var items =this;

    console.log("FoundItemsDirectiveController: ", items.foundList);

    items.onRemove = function(itemIndex) {
      console.log("Removed item at ", itemIndex);
      items.foundList.splice(itemIndex, 1);
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
    }
})();
